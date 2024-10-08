import React, { useEffect } from 'react'

import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation';

import notificationSound from "../assets/sounds/livechat-129007.mp3"

const useListenMessages = () => {

    const {socket} = useSocketContext();
    const {messages, setMessages} = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {

            newMessage.shouldShake = false;
            const sound = new Audio(notificationSound);
            sound.play();

            setMessages([...messages, newMessage]);
        });

        //this return statement is necessary AND IMPORTANT
        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages]);
}

export default useListenMessages
