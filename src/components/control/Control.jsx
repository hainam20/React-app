import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'

import { ReactComponent as IconControl } from '../../assets/iconControl.svg';
import { Switch, DatePicker, Space, Empty, Table } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

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

const Control = (props) => {

    const { data } = props;

    const { RangePicker } = DatePicker;

    const [state, setState] = useState({
        isChecked: false,
    });

    

    const handleChangeStatus = (event) => {
        socket.emit('status_Relay', event);
        setState(prev => ({...prev, isChecked: event}));
    };

    const onChangeTime = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    };

    const onOk = (value) => {
        console.log('onOk: ', value);
    };

    return (
        <div className='bg-white w-full h-full p-3 rounded-md shadow-xl relative'>
            <div className='w-full flex justify-between items-center mb-3'>
                <div className=''>
                    <IconControl className='mr-4'/>
                    <div className='text-lg font-semibold'>Control</div>
                </div>
                <div className='text-lg font-bold tracking-widest text-green-400'>
                    {data?.name}
                </div>
            </div>
            <div className='w-full flex items-center mb-3'>
                <div className='text-md font-normal mr-4'>Status: </div>
                <div className=''>
                    <Switch
                        checked={data?.status}
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        onChange={(event) => handleChangeStatus(event)}
                    />
                </div>
            </div>
            <div className='w-full flex items-center mb-4'>
                <div className='mr-3 text-md'>Timer: </div>
                <Space direction="vertical" size={12}>
                    <RangePicker
                        showTime={{
                            format: 'HH:mm',
                        }}
                        format="YYYY-MM-DD HH:mm"
                        onChange={onChangeTime}
                        onOk={onOk}
                        defaultValue={data?.time}
                    />
                </Space>
            </div>
            <div className='w-full flex flex-col'>
                <div className='mb-4'>History: </div>
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
    );
};

export default Control;