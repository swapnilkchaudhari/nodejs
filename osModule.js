const os= require('os')
//log('cpus',os.cpus())
log('platform',os.platform())
log('tmpdilor',os.tmpdir())
log('totalmem',os.totalmem())
log('uptime',os.uptime())


function log(tag,value){
    console.log(tag,value)
}