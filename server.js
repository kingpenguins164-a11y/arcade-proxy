const cors_proxy = require('cors-anywhere');
const host = '0.0.0.0';
const port = process.env.PORT || 8080;

cors_proxy.createServer({
    originWhitelist: [], 
    requireHeader: [],
    removeHeaders: ['cookie', 'cookie2', 'x-frame-options', 'content-security-policy']
}).listen(port, host, () => {
    console.log('Proxy running on ' + host + ':' + port);
});
