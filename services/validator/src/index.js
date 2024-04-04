const express   = require('express');
const env       = require('./env');
const routes    = require('./routes');

const app = express();
app.use(express.json());
app.use('/', routes);

app.listen(env.port, () => {
    console.log(`Listening on port ${env.port}`)
});

// ...
// Sigterm handling only

process.on('SIGTERM', () => {
    console.log('The service is about to shut down! (not really)');
    //server.closeAllConnections();
    
    });