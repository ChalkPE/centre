module.exports = server => {
    const io = require('socket.io')(server);
    const redis = require('socket.io-redis');

    io.adapter(redis({ host: 'localhost', port: 6379 }));

    require('./chat')(io.of('/chat'));
    // require('./game')(io.of('/game'));
};
