import React, { useState } from 'react'

import Device from '../../components/device';
import FeaturedInfo from "../../components/featuredInfo/FeturedInfo";
import Chart from '../../components/chart/Chart';
import OverlayBlock from '../../components/OverlayBlock';

import "./home.css";


export default function Home() {

    const testData = [
        {
            "name": "Device 1",
            "temparature": 18,
            "humidity": 70,
            "soil": 40,
            "status": true
        },
        {
            "name": "Device 2",
            "temparature": 18,
            "humidity": 70,
            "soil": 40,
            "status": false
        },
        {
            "name": "Device 3",
            "temparature": 18,
            "humidity": 70,
            "soil": 40,
            "status": true
        },
        {
            "name": "Device 4",
            "temparature": 18,
            "humidity": 70,
            "soil": 40,
            "status": true
        },
        {
            "name": "Device 5",
            "temparature": 18,
            "humidity": 70,
            "soil": 40,
            "status": false
        },
        {
            "name": "Device 6",
            "temparature": 18,
            "humidity": 70,
            "soil": 40,
            "status": false
        },
    ];

    const [state, setState] = useState({
        isVisibleChart: false,
    });

    const handleVisibleChart = () => {
        setState(prev => ({...prev, isVisibleChart: true}));
    };

    const handleCloseChart = () => {
        setState(prev => ({...prev, isVisibleChart: false}));
    };

    return (
        <div className='home bg-[rgb(245,246,250)]'>
            <div className='h-full overflow-y-auto no-scrollbar p-5'>
                {testData?.map((item, index) => {
                    return (
                        <div className="mb-3" key={index} onClick={handleVisibleChart}>
                            <Device data={item} />
                        </div>
                    )
                })}
            </div>
            {state.isVisibleChart && (
                <OverlayBlock>
                    <Chart handleCloseChart={handleCloseChart}/>
                </OverlayBlock>
            )}
        </div>
    );
};
