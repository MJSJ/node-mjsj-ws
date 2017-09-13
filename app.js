const Koa = require( 'koa' )
const IO = require( 'koa-socket' )

const app = new Koa()

var allowedOrigins = "localhost:*";
const io = new IO({
    namespace: 'ws',
    ioOptions:{
        origins:allowedOrigins
    }
})
io.attach( app )


io.on('connection', sock => {
    io.on('disconnect', function () {
        console.log("connected")
    });
    
    io.on('message', ctx => {
        console.log( ctx.data )
        io.broadcast( 'response', "you just said"+ctx.data )
    })
})

// app.listen is mapped to app.server.listen, so you can just do:
app.listen( process.env.PORT || 7000 )

// *If* you had manually attached an `app.server` yourself, you should do:
app.server.listen( process.env.PORT || 7000 )