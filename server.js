import Redis from 'ioredis';
import LaravelEchoServer from 'laravel-echo-server';
import dotenv from 'dotenv';
dotenv.config();

export const REDIS_PORT = process.env.VITE_REDIS_PORT;
export const AUTH_HOST = process.env.VITE_AUTH_HOST;
export const LISTENER_PORT = process.env.VITE_LISTENER_PORT;

const redis = new Redis({
    port: REDIS_PORT,
    host: '127.0.0.1'
});

LaravelEchoServer.run({
    authHost: AUTH_HOST,
    authEndpoint: '/broadcasting/auth',
    devMode: true,
    port: LISTENER_PORT,
    database: 'redis',
    databaseConfig: {
        redis: {
            host: '127.0.0.1',
            port: REDIS_PORT
        }
    },
    apiGateway: true,
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
