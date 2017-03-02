const cluster = require('cluster');

if(cluster.isMaster){
    require('os').cpus().forEach(() => cluster.fork());

    cluster.on('exit', (worker, code, signal) => {
        console.log(`#${worker.id}: died (${signal || code})`);
        cluster.fork();
    });
    return;
}

const id = cluster.worker.id;
console.log(`#${id}: Created`);

const http = require('http');
const path = require('path');
const express = require('express');

const app = express();
app.set('port', process.env.PORT || '6060');

const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');
app.use(require('./util/logger')());
app.use(express.static(path.join(__dirname, 'static')));
app.use('/bower', express.static(path.join(__dirname, 'bower_components')));

const server = http.Server(app);
server.listen(app.get('port'), () => console.log(`#${id}: Listening on port ${app.get('port')}`));

require('./routes')(app);
require('./app/socket')(server);
