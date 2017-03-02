module.exports = nsp => {
    nsp.on('connection', socket => console.log(`socket ${socket.id} connected!`));
};
