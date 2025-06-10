import express from 'express'
const http = require('http')
const app = express();
const PORT = 8080;



app.listen(PORT, ()=> console.log(`Server on port: ${PORT}`));