const http=require('http')

const server=http.createServer((request,response)=>{
    console.log('requst:',request.body)
    console.log('requst:',request.url)
})
server.listen(2000)