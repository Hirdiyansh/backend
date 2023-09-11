const connectToMongo=require('./db')
const express = require('express')
var cors = require("cors")
connectToMongo()
const app = express()
const port = 7000


app.use(cors())
app.use(express.json())
//Avilable routes
//Api for showing differnt forms of yoga
 app.use("/addpostures",require("./routes/posture"));
 app.use("/newuser",require("./routes/register"));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
