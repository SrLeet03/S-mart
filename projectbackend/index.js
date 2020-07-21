const express = require('express');

const app = express();

const port = 8000 ;

app.get("/" , (req , res) => (
    res.send("hey there !")
))
app.listen(port , (req , res) =>{
    console.log('server is runnuing at '+port);
})