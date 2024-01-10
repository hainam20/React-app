import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'

import Relay from './Relay';
import ModalInfo from './ModalInfo';

import { ReactComponent as IconControl } from '../../assets/iconControl.svg';
import { Table } from 'antd';

import "./Control.css";
import { ConsoleSqlOutlined } from '@ant-design/icons';
import { IndeterminateCheckBoxOutlined } from '@mui/icons-material';

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


const Control = () => {

    const relayData = [
        { title: 'Relay 1', status: false, id: 0},
        { title: 'Relay 2', status: false, id: 1},
        { title: 'Relay 3', status: false, id: 2},
    ];

    const initialmodalInfo = [
        { id: 0, isShowModalInfo: false, card1: { value1: 25, toggle1: false }, card2: {value2: 20, toggle2: false}, card3: {value3: 20, toggle3: false} },
        { id: 1, isShowModalInfo: false, card1: { value1: 25, toggle1: false }, card2: {value2: 25, toggle2: false}, card3: {value3: 20, toggle3: false} },
        { id: 2, isShowModalInfo: false, card1: { value1: 25, toggle1: false }, card2: {value2: 20, toggle2: false}, card3: {value3: 20, toggle3: false} }
    ];
    const [relay, setRelay] = useState(relayData);
    const [modalInfo, setModalInfo] = useState(initialmodalInfo);
    // const [state, setState] = useState([{
    //     isChecked: false,
    //     relay: 0,
    //     isShowModalInfo: false,
    // }]);

    // const [relay, setRelay] = useState({
    //     isChecked: false,
    // })
// New Update
    useEffect(() => {
        relay.forEach((relayItem) => {
            // Check if the status of the relay has changed
            if (relayItem.status !== relayItem.prevStatus) {
                socket.emit('status_Relay', { "relay": relayItem.id, "status": relayItem.status });
                // Update the previous status to the current status
                relayItem.prevStatus = relayItem.status;
            }
        });
    }, [relay]);

    const handleChangeStatus = (index) => {
        const updatedRelay  = relay.map(obj => {
            try {
                if (obj.id === index){
                    return {...obj, status: !relay[index].status}
                }
                return obj;              
            } catch (error) {
                console.log(error);
            }
        })
        setRelay(updatedRelay)
        //socket.emit('status_Relay', index);
    };

    const handleModalInfo = (index) => {
        const updatedModalInfo = modalInfo.map(obj => {
            try {
                if (obj.id === index){
                    return {...obj, isShowModalInfo : !modalInfo[index].isShowModalInfo}
                    
                }
                return obj;
            } catch (error) {
                console.log(error);
            }
        })
        setModalInfo(updatedModalInfo);
    };
    


    // const handleModalInfo = (index) => {
    //     setModalInfo(prev => ({...prev, isShowModalInfo: !prev.isShowModalInfo}));
    //     console.log(index)
    // };

    console.log(modalInfo);

    return (
        <>
            <div className='bg-white w-full h-full p-3 rounded-md shadow-xl relative overflow-y-auto'>
                <div className='w-full flex justify-between items-center mb-3'>
                    <div className='flex items-center'>
                        <IconControl className='mr-4'/>
                        <div className='text-lg font-semibold text-[rgb(23,24,59)]'>Control</div>
                    </div>
                    <div className='text-lg font-bold tracking-widest text-green-400'>

                    </div>
                </div>
                {relay.map((item, index) => {
                    return (
                        <div className='py-1 px-4' key={`relay-${index}`}>
                            <Relay data={item} index = {index} handleChangeStatus={() => handleChangeStatus(index)} handleModalInfo={handleModalInfo}/>
                            {modalInfo[index].isShowModalInfo && (
                                <ModalInfo handleModalInfo={handleModalInfo} modalInfo={modalInfo} setModalInfo={setModalInfo} index={index}/>
                            )}
                        </div>
                    )
                })}
                <div className='w-full flex flex-col mt-4'>
                    {/* <div className='mb-4'>History: </div> */}
                    <div className='w-full flex'>
                        {/* <Empty /> */}
                        <Table 
                            // dataSource={data?.history} 
                            columns={columns} 
                            pagination={false}
                            className='w-full'
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Control;