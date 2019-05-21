const EventEmitter=require('events')
var emitter=new EventEmitter()
emitter.on('logging',message=>{
    console.log('emitter',message.data)
}) 
emitter.emit('logging',{data:'myEvent for logging'})
