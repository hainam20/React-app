import React, { useEffect, useState } from 'react';

import { ReactComponent as IconControl } from '../../assets/iconControl.svg';
import { Switch, DatePicker, Space, Empty, Table } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

import "./Control.css";

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
        isChecked: data?.status,
    });

    useEffect(() => {
        setState(prev => ({...prev, isChecked: data?.status}));
    },[data]);

    const handleChangeStatus = (event) => {
        setState(prev => ({...prev, isChecked: event}));
    };

    const onChangeTime = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    };

    const onOk = (value) => {
        console.log('onOk: ', value);
    };

    const handleSwitch = (event) => {
        setState(prev => ({...prev, isChecked: event}));
        console.log(event); 
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
                        checked={state.isChecked}
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        onChange={(event) => handleChangeStatus(event)}
                        onClick={(event) => handleSwitch(event)}
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