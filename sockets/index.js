import openSocket from 'socket.io-client'

import socketEndpoint from '../settings'


let io = null

export const socket = {
    init: (token) => {
        io = openSocket(
            socketEndpoint,
            { transports: ['websocket'] }
        )
        io.emit('join', { token })
        return io
    },

    getIO: () => {
        return io
    },

    disconnect: () => {
        io.disconnect()
        io = null
    },
}