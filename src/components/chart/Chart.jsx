import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

import "./chart.css";

const socket = io("localhost:5000/", {
    transports: ["websocket"],
    cors: {
        origin: "http://localhost:3000/",
    },
});

export default function Chart() {

    const [chartData, setChartData] = useState([]);
    const MAX_DATA_POINTS = 20;

    useEffect(() => {
        socket.on("connect", () => {
            console.log('Connected to Flask server');
        });

        socket.on('mqtt_data', (data) => {
            console.log('Received data from server', data);
            setChartData((prevData) => {
                const newData = [...prevData, data];

                if (newData.length > MAX_DATA_POINTS) {
                    newData.shift(); 
                }

                return newData;
            });
        });

        return () => {
            socket.off();
        };

    }, []);
    
    return (
        <div className="chart">
            <h3 className="chartTitle">Data Analys</h3>
            <ResponsiveContainer width="100%" aspect={3 / 1}>
                <LineChart data={chartData}>
                <XAxis dataKey="createdAt" stroke="#5550bd" angle={0} tickFormatter={(createdAt) => format(new Date(createdAt), 'HH:mm:ss') }/>
                <YAxis domain={[0,100]} type= "number"/>
                <Line type="monotone" dataKey="temp" stroke="red" strokeWidth={3}/>
                <Line type="monotone" dataKey="hum" stroke="blue" strokeWidth={3}/>
                <Line type="monotone" dataKey="adc_val" stroke="gray" strokeWidth={3}/>
                <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"/>
                <Legend verticalAlign="top" layout="horizontal"/>
                <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

