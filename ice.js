
let uniqueId = -1;
const rooms = [];

function createUnique(){
    uniqueId++;
    return uniqueId;
}
const express = require('express')
const cors = require('cors');
const router = express.Router();
const app = express()
const PORT = process.env.PORT || 80;
app.use("/",router);
app.use(cors())
app.use(express.json());
app.use(express.static('public'))


app.post('/openRoom', (req, res) => {
    const id = createUnique();
    const sdp = req.body;
    rooms[id] = [{sdp: sdp, port: req.connection.remotePort, address: req.connection.remoteAddress}];
    res.send(id.toString())
})

app.get('/joinRoom/:roomId', (req, res) => {
    const roomId = req.params.roomId;
    res.json({room: rooms[roomId]});
})

app.post('/answer/:roomId', (req, res) => {
    const roomId = req.params.roomId;
    const sdp = req.body;
    rooms[roomId].push({sdp: sdp, port: req.connection.remotePort, address: req.connection.remoteAddress});
    res.json({room: rooms[roomId]});
})

app.listen(PORT, () => {
  console.log(`ICE app listening on port ${PORT}`)
})
