import Echo from 'laravel-echo';
import io from 'socket.io-client';

const EchoInstance = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':3001',
    auth: {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token');
        }
    },
    client: io
});

export default EchoInstance;
