import openSocket from 'socket.io-client'


let io = null

export const socket = {
    init: (token) => {
        io = openSocket(
            `http://localhost:8000`,
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