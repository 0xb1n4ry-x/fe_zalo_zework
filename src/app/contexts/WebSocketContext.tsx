'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

const WebSocketContext = createContext(null)


export function WebSocketProvider({ }) {

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:3000')

        newSocket.onopen = () => {
            console.log('Connected to WebSocket server.')
        };

        newSocket.onclose = () => {
            console.log('WebSocket closed!')
        };

        newSocket.onerror = (err) =>{
            console.log('WebSocket error:', err)
        };



        return () => newSocket.close()
    }, [])

    return (
        WebSocketContext.Provider
    )
}

export function useWebSocket() {
    return useContext(WebSocketContext)
}

