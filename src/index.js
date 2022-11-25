const express=require("express");
const path=require("path");
const http=require("http")
const Filter=require("bad-words")  // it is a function with methods in it
const socketio=require("socket.io")
const app=express();
const server=http.createServer(app);
const io=socketio(server);
const {generateMessage, generatelocationMessage}=require("./message")
const {addUser,removeUser,getUser,getUserinroom}=require("./user.js");
const { Socket } = require("dgram");


const publicdirectory=path.join(__dirname,"../public")
app.use(express.static(publicdirectory))



 // THE ON METHOD TAKES 2 ARGUMENTS(NAME OF ANY event,(any object name))
 // THE EMIT METHOD TAKES 2 ARGUMENTS(name of event, the message to sent)


 io.on('connection',(socket)=>{       
    console.log("NEW CONNECTION FORMED")

socket.on("join",({username,room},callback)=>{

const {error,user}=addUser({id:socket.id,username,room})

if(error)
{
return  callback(error)
}
socket.join(room)

socket.emit("message",generateMessage(user.username,'WELCOME'))
socket.broadcast.to(user.room).emit("message",generateMessage(user.username,`${user.username} HAS JOINED`)) 


/*
socket.broadcast.to(user.room).emit("roomdata",{
    room:user.room,
    users:getUserinroom(user.room)
})*/


})

socket.on("disconnect",()=>{
  const user = removeUser(socket.id)
  if(user)
  {
   socket.broadcast.to(user.room).emit("message",generateMessage(user.username,`${user.username} HAS LEFT`))
   io.to(user.room).emit("roomdata",{
    room:user.room,
    users:getUserinroom(user.room)
})
}
})


const filter=new Filter();
socket.on("sendMessage",(message,callback)=>{
  const user=getUser(socket.id)
    if(filter.isProfane(message))
    {
        return callback("PROFINE WORDS ARE NOT ALLOWED")
    }
    socket.broadcast.to(user.room).emit("message",generateMessage(user.username,message));
    callback()
})


socket.on("location",(coords,callback)=>{
  const user=getUser(socket.id)
  socket.broadcast.to(user.room).emit("locationmsg",generatelocationMessage(user.username,`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
    callback();
})


 // IO IS USED TO SEND TO ALL USERS AND SOCKET TO A PARTICULAR USER


})


server.listen(3000,()=>{
    console.log("SERVER IS UP AT PORT 3000");
})













3
/*
let count=0
socket.emit("countupdate",count)

socket.on("increment",()=>{
    count++;
    io.emit("countupdate",count);
})
*/