import { createServer } from 'http';
import { Server } from 'socket.io';
import { Redis } from 'ioredis';
import jwt from 'jsonwebtoken';

const server = createServer();
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Authorization'],
        credentials: true
    }
});

const redis = new Redis();

const jwtSecret = process.env.JWT_SECRET;

io.use((socket, next) => {
    const token = socket.handshake.auth.token || socket.handshake.headers.authorization;
    if (!token) return next(new Error('Authentication error'));

    jwt.verify(token.replace('Bearer ', ''), jwtSecret, (err, decoded) => {
        if (err) return next(new Error('Error de Autenticación'));
        socket.user = decoded;
        next();
    });
});

redis.on('message', (channel, message) => {
    message = JSON.parse(message);
    io.to(`user.${message.data.user_id}`).emit(channel + ':' + message.event, message.data);
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Servidor de Socket.io corriendo en el puerto: ${PORT}`);
});
