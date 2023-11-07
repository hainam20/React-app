import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

import Device from '../../components/device';
import Chart from '../../components/chart/Chart';
import OverlayBlock from '../../components/OverlayBlock';
import Control from '../../components/control/Control';

import dayjs from 'dayjs';

import "./home.css";



const socket = io("localhost:5000/", {
    transports: ["websocket"],
    cors: {
      origin: "http://localhost:3000/",
    },
  });


export default function Home() {

   /* const testData = [
        {
            "name": "Device 1",
            "temparature": 18,
            "humidity": 70,
            "soil": 40,
            "status": true,
            "timer": [],
            "history": [
                { "time": "2038-01-19 03:14:07", "status": "on", "key": 1 },
                { "time": "2100-12-31 23:59:59", "status": "off", "key": 2 },
                { "time": "275760-09-13 00:00:00", "status": "on", "key": 3 },
            ],
            "chart": [
                { name: 'day 1', Temparature: 18, Humidity: 90, Soil: 20 },
                { name: 'day 2', Temparature: 19, Humidity: 60, Soil: 10 },
                { name: 'day 3', Temparature: 20, Humidity: 80, Soil: 90 },
                { name: 'day 4', Temparature: 18, Humidity: 66, Soil: 10 },
                { name: 'day 5', Temparature: 16, Humidity: 12, Soil: 34 },
                { name: 'day 6', Temparature: 22, Humidity: 14, Soil: 15 },
                { name: 'day 7', Temparature: 19, Humidity: 15, Soil: 90 },
            ]
        },
        {
            "name": "Device 2",
            "temparature": 18,
            "humidity": 70,
            "soil": 40,
            "status": false,
            "timer": ['2023-10-03 12:03', '2023-10-11 12:03'],
            "history": [
                { "time": "2011-02-23 03:14:07", "status": "off", "key": 1 },
                { "time": "2012-02-12 23:59:59", "status": "on", "key": 2 },
                { "time": "2013-02-26 00:00:00", "status": "off", "key": 3 },
            ],
            "chart": [
                { name: 'day 1', Temparature: 12, Humidity: 45, Soil: 34 },
                { name: 'day 2', Temparature: 21, Humidity: 23, Soil: 45 },
                { name: 'day 3', Temparature: 12, Humidity: 54, Soil: 65 },
                { name: 'day 4', Temparature: 14, Humidity: 34, Soil: 45 },
                { name: 'day 5', Temparature: 15, Humidity: 65, Soil: 34 },
                { name: 'day 6', Temparature: 18, Humidity: 34, Soil: 23 },
                { name: 'day 7', Temparature: 12, Humidity: 34, Soil: 12 },
            ]
        },
        {
            "name": "Device 3",
            "temparature": 18,
            "humidity": 70,
            "soil": 40,
            "status": true,
            "timer": ['2023-10-17 16:07', '2023-10-19 13:06'],
            "history": [
                { "time": "2013-02-23 03:14:07", "status": "off", "key": 1 },
                { "time": "2014-03-24 23:59:59", "status": "on", "key": 2 },
                { "time": "2015-04-25 00:00:00", "status": "off", "key": 3 },
            ],
            "chart": [
                { name: 'day 1', Temparature: 13, Humidity: 43, Soil: 34 },
                { name: 'day 2', Temparature: 14, Humidity: 12, Soil: 23 },
                { name: 'day 3', Temparature: 23, Humidity: 56, Soil: 34 },
                { name: 'day 4', Temparature: 14, Humidity: 34, Soil: 23 },
                { name: 'day 5', Temparature: 19, Humidity: 65, Soil: 34 },
                { name: 'day 6', Temparature: 12, Humidity: 76, Soil: 45 },
                { name: 'day 7', Temparature: 22, Humidity: 45, Soil: 14 },
            ]
        },
        {
            "name": "Device 4",
            "temparature": 18,
            "humidity": 70,
            "soil": 40,
            "status": true,
            "timer": ['2023-10-23 19:10', '2023-10-25 13:07'],
            "history": [
                { "time": "2016-05-23 03:34:07", "status": "on", "key": 1 },
                { "time": "2017-06-24 23:21:59", "status": "off", "key": 2 },
                { "time": "2019-07-25 00:22:00", "status": "on", "key": 3 },
            ],
            "chart": [
                { name: 'day 1', Temparature: 13, Humidity: 34, Soil: 34 },
                { name: 'day 2', Temparature: 12, Humidity: 65, Soil: 12 },
                { name: 'day 3', Temparature: 21, Humidity: 51, Soil: 65 },
                { name: 'day 4', Temparature: 12, Humidity: 54, Soil: 43 },
                { name: 'day 5', Temparature: 14, Humidity: 52, Soil: 34 },
                { name: 'day 6', Temparature: 25, Humidity: 34, Soil: 65 },
                { name: 'day 7', Temparature: 13, Humidity: 56, Soil: 90 },
            ]
        },
        {
            "name": "Device 5",
            "temparature": 18,
            "humidity": 70,
            "soil": 40,
            "status": false,
            "timer": ['2023-10-28 21:12', '2023-10-30 12:07'],
            "history": [
                { "time": "2020-08-23 04:34:07", "status": "on", "key": 1 },
                { "time": "2021-09-24 05:21:59", "status": "off", "key": 2 },
                { "time": "2022-10-25 07:22:00", "status": "on", "key": 3 },
            ],
            "chart": [
                { name: 'day 1', Temparature: 15, Humidity: 34, Soil: 56 },
                { name: 'day 2', Temparature: 13, Humidity: 54, Soil: 45 },
                { name: 'day 3', Temparature: 22, Humidity: 65, Soil: 34 },
                { name: 'day 4', Temparature: 13, Humidity: 23, Soil: 12 },
                { name: 'day 5', Temparature: 15, Humidity: 12, Soil: 56 },
                { name: 'day 6', Temparature: 26, Humidity: 54, Soil: 34 },
                { name: 'day 7', Temparature: 12, Humidity: 64, Soil: 34 },
            ]
        },
        {
            "name": "Device 6",
            "temparature": 18,
            "humidity": 70,
            "soil": 40,
            "status": false,
            "timer": [],
            "history": [
                { "time": "2023-11-14 04:34:07", "status": "off", "key": 1 },
                { "time": "2024-12-13 05:21:59", "status": "on", "key": 2 },
                { "time": "2025-01-12 07:22:00", "status": "off", "key": 3 },
                { "time": "2025-02-11 07:22:00", "status": "on", "key": 4 },
            ],
            "chart": [
                { name: 'day 1', Temparature: 15, Humidity: 34, Soil: 34 },
                { name: 'day 2', Temparature: 14, Humidity: 23, Soil: 32 },
                { name: 'day 3', Temparature: 22, Humidity: 12, Soil: 52 },
                { name: 'day 4', Temparature: 11, Humidity: 14, Soil: 52 },
                { name: 'day 5', Temparature: 13, Humidity: 15, Soil: 62 },
                { name: 'day 6', Temparature: 25, Humidity: 56, Soil: 62 },
                { name: 'day 7', Temparature: 16, Humidity: 76, Soil: 42 },
            ]
        },
    ];*/

    /**
     * Socket.io
     */
    const [testData, setData] = useState([]);

    useEffect(() => {
        socket.on("connect", () => {
            console.log('Socket Connect:', socket.connected);
        });
        socket.on('mqtt_data', (testData) => {
            console.log('Received new data:', testData);
            setData(testData);
        });
        return () => {
            socket.off();
        };
    }, []);

    /**
     * 
     */
    const [state, setState] = useState({
        isVisibleChart: false,
        controlData: {},
        chartData: [],
    });

    const handleVisibleChart = (data) => {
        console.log(data);
        setState(prev => ({...prev, isVisibleChart: true, chartData: data}));
    };

    const handleCloseChart = () => {
        setState(prev => ({...prev, isVisibleChart: false}));
    };

    const handleControlData = (data) => {
        // const { status, timer, history, name } = data;

        // const time = [
        //     dayjs(timer?.[0]),
        //     dayjs(timer?.[1]),
        // ];

        // const controlData = {
        //     name,
        //     status,
        //     time,
        //     history,
        // };

        // setState(prev => ({...prev, controlData: controlData}));
    };

    // useEffect(() => {
    //     handleControlData(testData[0]);
    // },[]);

    return (
        <div className='home bg-[rgb(245,246,250)] w-full h-full flex'>
            <div className='h-full overflow-y-auto no-scrollbar p-5 w-[50%]'>
                {testData?.map((item, index) => {
                    return (
                        <div className="mb-3 device" key={index} onClick={() => handleControlData(item)}>
                            <Device data={item} handleVisibleChart={handleVisibleChart} />
                        </div>
                    )
                })}
            </div>
            <div className='w-[50%] h-full p-5'>
                <Control data={state.controlData} />
            </div>
            {state.isVisibleChart && (
                <OverlayBlock>
                    <Chart handleCloseChart={handleCloseChart} data={state.chartData}/>
                </OverlayBlock>
            )}
        </div>
    );
};
