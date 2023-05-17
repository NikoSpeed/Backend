import express from 'express'
import router from './router/index.js'
import { engine } from 'express-handlebars'

let server = express()

let PORT = 8080
let ready = ()=>console.log('server ready on port: '+PORT)

server.engine('handlebars',engine)
server.use(engine)
server.listen(PORT,ready)
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use('/',router)
