var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')

var serve = serveStatic('../frontend/dist/example-content/browser', {
    index: false,
    setHeaders: setHeaders
})

// Set header to force download
function setHeaders (res, path) {
    res.setHeader('Access-Control-Allow-Origin', '*')
}

// Create server
var server = http.createServer(function onRequest (req, res) {
    serve(req, res, finalhandler(req, res))
})

// Listen
let PORT = process.env.PORT || 8080;
server.listen(PORT)
console.log(`Server listening on port ${PORT}`)