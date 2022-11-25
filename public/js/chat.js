const socket=io();
//socket.on("countupdate",(count)=>{
  //  console.log("THE UPDATED COUNT IS",count);
//})




const $messageform=document.querySelector("#form");

const $inputtag=$messageform.querySelector("#input1")

const $buttton=$messageform.querySelector("#SUBMIT")

const $renderdestinhtml=document.querySelector("#rendermessage")




const autoscroll = () => {
    // New message element
    const $newMessage = $messages.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visible height
    const visibleHeight = $messages.offsetHeight

    // Height of messages container
    const containerHeight = $messages.scrollHeight

    // How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}


$messageform.addEventListener("submit",(e)=>{

    e.preventDefault();


$messageform.setAttribute("disabled","disabled");

const message1=$inputtag.value

socket.emit("sendMessage",message1,(error)=>{
    if(error)
    {
        console.log(error)
    }
    console.log("MESSAGE RECIEVED")

    $messageform.removeAttribute("disabled");
    $inputtag.value=" ";
    $inputtag.focus()

});

})

// TEMPLATES FOR LOCATION  and text

const $location=document.querySelector("#location")
const $locationsrc=document.querySelector("#mylocation").innerHTML
const {username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true})
const textsrc=document.querySelector("#messages-template").innerHTML

socket.on("message", (message) => {
    const html = Mustache.render(textsrc, {
        usernames: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm A')
    })
    $renderdestinhtml.insertAdjacentHTML('beforeend', html)
})



socket.on("locationmsg",(objectoflocation)=>{

    const locationhtml=Mustache.render($locationsrc,{

        username:objectoflocation.username,

       url:objectoflocation.url,

       createdAt:moment(objectoflocation.createdAt).format("h:mm A")
    })
    $renderdestinhtml.insertAdjacentHTML('beforeend',locationhtml)
    
    console.log("LOCATION: "+coords)
    })





$location.addEventListener("click",()=>{

    if(!navigator.geolocation)
    {
        return alert("BROWSER DO NOT SUPPORT");
    }

$location.setAttribute("disabled","disabled")

navigator.geolocation.getCurrentPosition((position)=>{
socket.emit("location",{
    latitude:position.coords.latitude,
    longitude:position.coords.longitude},()=>{
    
    console.log("DELIVERED");
    $location.removeAttribute("disabled")        
    })
})
})


socket.emit("join",{username,room},(error)=>{
    if(error)
    {
        alert(error)
        location.href="/"
    }
})







    
    /*
// TEMPLATES FOR ROOMS
const sidebarTemplate=document.querySelector("#sidebar-template").innerHtml
const outputhtml=document.querySelector("#sidebar").innerHTML
socket.on("roomdata",({room,users})=>{
const html=Mustache.render(sidebarTemplate,{
    room,
    users
})
outputhtml=html
})
*/