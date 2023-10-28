import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

import { ReactComponent as IconClose } from '../../assets/iconClose.svg';

import "./chart.css";

const socket = io("localhost:5000/", {
    transports: ["websocket"],
    cors: {
        origin: "http://localhost:3000/",
    },
});

const testChartData = [
    {
      name: 'Page A',
      Temparature: 4000,
      Humidity: 2400,
      Soil: 1400,
    },
    {
      name: 'Page B',
      Temparature: 3000,
      Humidity: 1398,
      Soil: 1200,
    },
    {
      name: 'Page C',
      Temparature: 2000,
      Humidity: 9800,
      Soil: 1230,
    },
    {
      name: 'Page D',
      Temparature: 2780,
      Humidity: 3908,
      Soil: 1450,
    },
    {
      name: 'Page E',
      Temparature: 1890,
      Humidity: 4800,
      Soil: 1560,
    },
    {
      name: 'Page F',
      Temparature: 2390,
      Humidity: 3800,
      Soil: 1120,
    },
    {
      name: 'Page G',
      Temparature: 3490,
      Humidity: 4300,
      Soil: 1345,
    },
];

export default function Chart(props) {

    const { handleCloseChart, data } = props;

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

    console.log(data);
    
    return (
        <div className="chart bg-white rounded-md w-[600px] h-[400px] relative">
            <IconClose 
                className='absolute top-2 right-2 cursor-pointer icon-close'
                onClick={handleCloseChart}
            />
            <h3 className="text-center mb-5">Data Analys</h3>
            {/* <ResponsiveContainer width="100%" aspect={3 / 1}>
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
            </ResponsiveContainer> */}
            <ResponsiveContainer width='100%' height='85%'>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Temparature" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Humidity" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="Soil" stroke="#2da7e4" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

