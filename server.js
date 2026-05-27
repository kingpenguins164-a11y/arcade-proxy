const cors_proxy = require('cors-anywhere');

const host = '0.0.0.0';
const port = process.env.PORT || 8080;

cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: [],
    removeHeaders: [
        'cookie',
        'cookie2',
        'x-request-start',
        'x-request-id',
        'via',
        'connect-time',
        'total-route-time'
    ],
    // This is the magic sauce that intercepts the website response 
    // and deletes the iframe blocking headers before sending it to you
    handleInitialRequest: (req, res, location) => {
        res.oldWriteHead = res.writeHead;
        res.writeHead = function(statusCode, headers) {
            if (headers) {
                // Delete headers that stop the site from loading in an iframe
                delete headers['x-frame-options'];
                delete headers['content-security-policy'];
                delete headers['content-security-policy-report-only'];
                
                // Allow cross-origin requests
                headers['access-control-allow-origin'] = '*';
            }
            res.oldWriteHead(statusCode, headers);
        };
        return false; 
    }
}).listen(port, host, () => {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});
