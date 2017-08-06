//import modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactlist',{
   useMongoClient: true
})

//on connection
mongoose.connection.on('connected', ()=>{
  console.log('Connected to database mongodb @ 27017');
})

mongoose.connection.on('error', (err)=>{
  if(err){
    console.log('Error in Database Connection:' + err);
  }
})

//port number
const port = 3000;

//adding middleWare
app.use(cors());

//body - parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname,'public')));

app.use('/api/', route);

//testing Server
app.get('/', (req,res)=>{
  res.send('foobar');
});

app.listen(port,()=>{
  console.log('Server started at port: '+ port)
});
