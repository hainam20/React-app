import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'

import Relay from './Relay';
import ModalInfo from './ModalInfo';

import { ReactComponent as IconControl } from '../../assets/iconControl.svg';
import { Table } from 'antd';

import "./Control.css";

const socket = io("localhost:5000/", {
    transports: ["websocket"],
    cors: {
      origin: "http://localhost:3000/",
    },
});

const columns = [
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
];

const relayData = [
    { title: 'Relay 1', status: true },
    { title: 'Relay 2', status: true },
    { title: 'Relay 3', status: false },
];

const Control = (props) => {

    const { data } = props;

    const [state, setState] = useState({
        isChecked: data?.status,
        isShowModalInfo: false,
    });
// New Update
    useEffect(() => {
        setState(prev => ({...prev, isChecked: data?.status}));
    },[data]);

    const handleChangeStatus = (event) => {
        socket.emit('status_Relay', event);
        setState(prev => ({...prev, isChecked: event}));
    };

    const handleModalInfo = () => {
        setState(prev => ({...prev, isShowModalInfo: !prev.isShowModalInfo}));
    };

    return (
        <>
            <div className='bg-white w-full h-full p-3 rounded-md shadow-xl relative overflow-y-auto'>
                <div className='w-full flex justify-between items-center mb-3'>
                    <div className='flex items-center'>
                        <IconControl className='mr-4'/>
                        <div className='text-lg font-semibold text-[rgb(23,24,59)]'>Control</div>
                    </div>
                    <div className='text-lg font-bold tracking-widest text-green-400'>
                        {data?.name}
                    </div>
                </div>

                {relayData.map((item, index) => {
                    return (
                        <div className='py-1 px-4' key={`relay-${index}`}>
                            <Relay data={item} handleModalInfo={handleModalInfo} />
                        </div>
                    )
                })}
                <div className='w-full flex flex-col mt-4'>
                    {/* <div className='mb-4'>History: </div> */}
                    <div className='w-full flex'>
                        {/* <Empty /> */}
                        <Table 
                            dataSource={data?.history} 
                            columns={columns} 
                            pagination={false}
                            className='w-full'
                        />
                    </div>
                </div>
            </div>
            {state.isShowModalInfo && (
                <ModalInfo handleModalInfo={handleModalInfo}/>
            )}
        </>
    );
};

export default Control;