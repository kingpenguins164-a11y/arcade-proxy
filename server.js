const cors_proxy = require('cors-anywhere');

const proxyServer = cors_proxy.createServer({
    originWhitelist: [], // Allows all origins
    requireHeader: [],
    removeHeaders: ['cookie', 'cookie2', 'x-frame-options', 'content-security-policy']
});

module.exports = (req, res) => {
    // Reroute the serverless request through the proxy engine
    req.url = req.url.replace(/^\/api/, ''); 
    proxyServer.emit('request', req, res);
};
