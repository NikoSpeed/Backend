import express from 'express'
import router from './router/index.js'

let server = express()

let PORT = 8080
let ready = ()=>console.log('server ready on port: '+PORT)

server.listen(PORT,ready)
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use('/',router)
