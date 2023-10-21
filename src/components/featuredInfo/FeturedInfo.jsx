import "./featuredInfo.css"
import io from 'socket.io-client'
import React , {useState, useEffect} from 'react'

const socket = io("localhost:5000/", {
    transports: ["websocket"],
    cors: {
      origin: "http://localhost:3000/",
    },
  });
    export default function FeturedInfo() {
    const [data, setData] = useState([])
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
    <div className="featured">
        <div className="featuredItem">
            <span className="featuredTitle">Temperature</span>
            <div className="featuredTemperatureContainer">
                <span className="featuredTemperature">{data.temp} °C</span>
            </div>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Humidity</span>
            <div className="featuredTemperatureContainer">
                <span className="featuredTemperature">{data.hum}%</span>
            </div>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Soil Measure</span>
            <div className="featuredTemperatureContainer">
                <span className="featuredTemperature">{data.adc_val}%</span>
        
            </div>
        </div>
    </div>
  )
}
