const users=[]

// ADDING AN USER
const addUser=({id,username,room})=>{

    username=username.trim().toLowerCase();
    room=room.trim().toLowerCase();

 // IF USERNAME OR ROOM IS AN EMPTY STRING   
if(!username ||!room)
{
    return {
        error:"USERNAME AND ROOM ARE REQUIRED"
    }
}

// CHECK FOR EXISTING  USER
const existingUser=users.find((user)=>{
    return user.username===username && user.room===room
})
if(existingUser){
    return {
        error:"THE USERNAME IS ALREADY IN USE"
    }
}
 // STORE AN USER
const user={id,username,room}
users.push(user);
return {user}
}

const removeUser=(id)=>{

const index=users.findIndex((user)=>{
return user.id===id
})

if(index!=-1)
{
return users.splice(index,1)[0];

}
}


const getUser=(id)=>{

     return users.find((user)=>user.id===id)

}

const getUserinroom=(room)=>{

   return users.filter((user)=> user.room==room )
    
}














addUser({
    id:22,
    username:"yug",
    room:"suraty"
})
addUser({
    id:25,
    username:"AAGNA",
    room:"SURATy"
})

addUser({
    id:36,
    username:"rajubhai",
    room:"surat"
})

addUser({
    id:20,
    username:"sangitaben",
    room:"surat"
})


console.log(users)

//const User=removeUser(25)
//console.log(User)

console.log(getUser(22))

console.log(getUserinroom("suraty"))

























module.exports={
    addUser,removeUser,getUser,getUserinroom
}


















