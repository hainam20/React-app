import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'

import Relay from './Relay';
import ModalInfo from './ModalInfo';

import { ReactComponent as IconControl } from '../../assets/iconControl.svg';
import { Table } from 'antd';

import "./Control.css";
import moment from 'moment';
import axios from 'axios';

const socket = io("localhost:5000/", {
    transports: ["websocket"],
    cors: {
      origin: "http://localhost:3000/",
    },
});

const columns = [
    {
        title: 'Relay',
        dataIndex: 'ID',
        key: 'ID',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text) => <a>{text === true ? "On" : "OFF"}</a>
    },
    {
        title: 'Time',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text) => <a>{moment(text).format('h:mm a, MMMM Do YYYY')}</a>,
    },
];


const Control = () => {

    const relayData = [
        { title: 'Relay 1', status: false, id: 0},
        { title: 'Relay 2', status: false, id: 1},
        { title: 'Relay 3', status: false, id: 2},
    ];

    const [modal, setModal] = useState({
        ID: "",
        tempState: {
            state: true,
            value: 25,
        },
        soilState: {
            state: false,
            value: 20,
        },
        waterState: {
            state: false,
            value: 20,
        },
    })
    const [relay, setRelay] = useState(relayData);
    const [isShowModalInfo, setisShowModalInfo] = useState(false);
    const [relayHistory, setRelayHistory] = useState([]);
    const [state, setState] = useState({
        tempState: {
            state: true,
            value: 25,
        },
        soilState: {
            state: false,
            value: 20,
        },
        waterState: {
            state: false,
            value: 20,
        },
    });

// New Update
    useEffect(() => {
        relay.forEach((relayItem) => {
            if (relayItem.status !== relayItem.prevStatus) {
                socket.emit('status_Relay', { "ID": relayItem.id, "status": relayItem.status });
                relayItem.prevStatus = relayItem.status;
            }
        });
    }, [relay]);
    useEffect((() => {
        socket.on('relay_data', (data) => {
            setRelayHistory(data);
        });
    }))
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

    const handleModalInfo = async (index) => {  
        setModal(prev => ({...prev, ID: index}));
        if(isShowModalInfo === true)
        {
            try {
                const response = await axios.get(`http://localhost:5000/api/condition/getcondition`);
                console.log("response data: ", response.data);
              } catch (error) {
                console.log(error);
              }
        }
        setisShowModalInfo(!isShowModalInfo);
    };
    
    const handleSaveCondition = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/condition/store`,modal);
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
          console.log({ID:modal.ID,state});
          console.log(modal.ID);
          handleModalInfo();
        
    }

    // const handleModalInfo = (index) => {
    //     setModalInfo(prev => ({...prev, isShowModalInfo: !prev.isShowModalInfo}));
    //     console.log(index)
    // };


    const handleModalChange = (type, isState, value) => {
        if (isState) {
            setState(prev => ({...prev, [type]: {value: prev[type].value, state: !prev[type].state}}));
        } else {
            setState(prev => ({...prev, [type]: {value: Number(value), state: prev[type].state}}));
        }
        setModal(prev => ({...prev, data: state}));
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

                    </div>
                </div>
                {relay.map((item, index) => {
                    return (
                        <div className='py-1 px-4' key={`relay-${index}`}>
                            <Relay data={item} index = {index} handleChangeStatus={() => handleChangeStatus(index)} handleModalInfo={handleModalInfo}/>
                        </div>
                    )
                })}
                {isShowModalInfo && (
                                <ModalInfo
                                    handleModalInfo={handleModalInfo}
                                    handleModalChange={handleModalChange}
                                    tempState={state.tempState}
                                    waterState={state.waterState}
                                    soilState={state.soilState}
                                    handleSaveCondition={handleSaveCondition}
                                />
                            )}
                <div className='w-full flex flex-col mt-4'>
                    {/* <div className='mb-4'>History: </div> */}
                    <div className='w-full flex'>
                        {/* <Empty /> */}
                        <Table 
                            dataSource={relayHistory} 
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