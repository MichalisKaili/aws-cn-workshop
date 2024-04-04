const express   = require('express');
const env       = require('./env');
const routes    = require('./routes');

const app = express();
app.use(express.json());
app.use('/', routes);

// ...
// Healthcheck
app.get('/healthz', (req, res) => {
    res.send('Service is healthy');
});

const server = app.listen(env.port, () => {
    console.log(`Listening on port ${env.port}`)
});

// ...
// Shut down gracefully

process.on('SIGTERM', () => {
    console.log('The service is about to shut down!');
    //server.closeAllConnections();
    server.close(() => {
        console.log("server is closing");  
        process.exit(0); 
    });
    // Finish any outstanding requests, then...
   
  });