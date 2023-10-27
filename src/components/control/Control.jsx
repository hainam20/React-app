import React, { useState } from 'react';

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

const tableData = [
    {
      key: '1',
      time: '2038-01-19 03:14:07',
      status: 'on',
    },
    {
      key: '2',
      time: '2100-12-31 23:59:59',
      status: 'off',
    },
    {
      key: '3',
      time: '275760-09-13 00:00:00',
      status: 'on',
    },
];

const Control = (props) => {

    const { RangePicker } = DatePicker;

    const [state, setState] = useState({
        isChecked: false,
    });

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

    return (
        <div className='bg-white w-full h-full p-3 rounded-md shadow-xl relative'>
            <div className='w-full flex items-center mb-3'>
                <IconControl className='mr-4'/>
                <div className='text-lg font-semibold'>Control</div>
            </div>
            <div className='w-full flex items-center mb-3'>
                <div className='text-md font-normal mr-4'>Status: </div>
                <div className=''>
                    <Switch
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
                    />
                </Space>
            </div>
            <div className='w-full flex flex-col'>
                <div className='mb-4'>History: </div>
                <div className='w-full flex'>
                    {/* <Empty /> */}
                    <Table 
                        dataSource={tableData} 
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