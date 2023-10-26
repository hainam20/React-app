import io from 'socket.io-client';
import React , {useState, useEffect} from 'react';

import "./featuredInfo.css";

const socket = io("localhost:5000/", {
    transports: ["websocket"],
    cors: {
      origin: "http://localhost:3000/",
    },
});

export default function FeturedInfo() {

    const [data, setData] = useState([]);

    useEffect(() => {
        socket.on("connect", () => {
            console.log('Connected to Flask server');
        });

        socket.on('mqtt_data', (data) => {
            console.log('Received new data:', data);
            setData(data);
        });

        return () => {
            socket.off();
        };
    }, []);

  return (
    <div className="featured mb-4">
        <div className="featuredItem bg-white hover:scale-105 hover:transition-all">
            <span className="featuredTitle text-blue-400">Temperature</span>
            <div className="featuredTemperatureContainer">
                <span className="featuredTemperature">{data.temp || '_'} °C</span>
            </div>
        </div>
        <div className="featuredItem bg-white hover:scale-105 hover:transition-all">
            <span className="featuredTitle text-blue-400">Humidity</span>
            <div className="featuredTemperatureContainer">
                <span className="featuredTemperature">{data.hum || '_'}%</span>
            </div>
        </div>
        <div className="featuredItem bg-white hover:scale-105 hover:transition-all">
            <span className="featuredTitle text-blue-400">Soil Measure</span>
            <div className="featuredTemperatureContainer">
                <span className="featuredTemperature">{data.adc_val || '_'}%</span>
        
            </div>
        </div>
    </div>
  );
};
