const server = require("./app") // load up the web server
const port = 3000 // the port to listen to for incoming requests
// call express's listen function to start listening to the port
const listener = server.listen(port, function () {
  console.log(`Server running on port: ${port}`)
})
// Stop listening to the port
const close = () => {
  listener.close()
}
module.exports = {
  close: close,
}