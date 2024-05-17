<template>
  <UserModal v-if="!isLogIn" @log="LogIn"/>
  <div class="chat__wrapper" v-else>
    <div class="chat">
        <div v-for="message in messages" :key="message.id" :class="['message__wrapper', {'message__wrapper--self': user === message.users_email}]">
          <div class="message">{{ message.text }}</div>
        </div>
      <div class="send">
        <input type="text" v-model="message">
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { io } from 'socket.io-client'
import UserModal from './components/UserModal.vue'
import { ref, defineModel } from 'vue'
const isLogIn = ref(false)
let id = 0
const user = ref()
const message = defineModel()
const messages = ref([])
const socket = io(`${import.meta.env.VITE_SERVER}`)

socket.on('message', (mess) => {
  messages.value.push(mess)
})
async function LogIn(email, nickname){
  user.value = email
  isLogIn.value = true
  const fetchData = await fetch(`${import.meta.env.VITE_SERVER}/messages`)
  const data = await fetchData.json()
  data.forEach((e) => {
    messages.value.push(e)
  })
}

async function sendMessage(){
    if (message.value && message.value !== ''){
      const msg = {user: user.value, text: message.value}
      const fetchData = await fetch(`${import.meta.env.VITE_SERVER}/messages`, {
        method: 'POST',
        body: JSON.stringify({email: user.value, text: message.value}),
        headers:{ 'Content-Type':'application/json'}, 
      })
      const data = await fetchData.json()
      messages.value.push(data)
      socket.emit('message', {id:data.id, text:data.text, users_email:data.users_email})
      message.value = ''
    } 
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
*{
  font-family: 'Roboto';
  padding: 0;
  margin: 0;
}

.chat__wrapper{
  display: flex;
  justify-content: center;
}

.chat{
  margin-top: 20px;
  width: 80%;
  max-height: 800px;
  overflow: auto;
  overflow-x:hidden;
  display: flex;
  flex-direction: column;
  gap:10px
}

.send{
  position:fixed;
  bottom: 0;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:left; 
  gap: 20px;
  width: 80%;
  height: 100px;
}

.send input{
  width: 90%;
  font-size: 20px;
  padding: 4px;
  border-radius: 4px;
  border: 2px solid black
}

.send button{
  font-size: 20px;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  background-color: white;
  border: 2px solid black;
  transition: 0.2s;
}

.send button:hover{
  background-color: black;
  color:white;
  border: 2px solid black;
}

.send button:active{
  background-color: rgb(49, 49, 49);
  color:white;
  border: 2px solid rgb(49, 49, 49);
}

.message__wrapper{
  display: block;
}

.message__wrapper--self{
  align-self: flex-end;
}

.message{
  display: inline-block;
  font-size: 20px;
  color:white;
  background-color: black;
  border-radius: 10px;
  padding: 10px;
  max-width: 1536px;
  word-break: break-all
}
</style>