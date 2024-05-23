<template>
  <div v-if="isLogIn !== undefined">
    <UserModal v-if="!isLogIn" @log="LogIn"/>
    <div class="chat__wrapper" v-else>
      <div class="chat" id="chat">
          <chatMessage v-for="message in messages" 
          :key="message.id" 
          :class="{'message__wrapper--self': user === message.users_email}" 
          :user="message.nickname" 
          :text="message.text"
          :isAnother="user === message.users_email" />
        <div class="send">
          <input type="text" v-model="message" @keypress.enter="sendMessage">
          <button @click="sendMessage">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import chatMessage from './components/ChatMessage.vue'
import { io } from 'socket.io-client'
import UserModal from './components/UserModal.vue'
import { ref, defineModel, onMounted } from 'vue'
const isLogIn = ref()
const user = ref()
const nickname = ref()
const message = defineModel()
const messages = ref([])
const socket = io(`${import.meta.env.VITE_SERVER}`)

onMounted( async () => {
  if (localStorage.getItem('token'))
  {
    const checkFetch = await fetch(`${import.meta.env.VITE_SERVER}/users/check/token`, {
      headers: { 'Authorization' : localStorage.getItem('token') }
    })
    const checkData = await checkFetch.json()
    nickname.value = checkData.nickname
    const fetchData = await fetch(`${import.meta.env.VITE_SERVER}/messages/all`, {
    headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
    }
    })
    const data = await fetchData.json()
    data.forEach((e) => {
      messages.value.push(e)
    })
    const fetchEmail = await fetch(`${import.meta.env.VITE_SERVER}/users/email`, {
    headers: { 'Authorization' : localStorage.getItem('token') }
  } )  
    const emailData = await fetchEmail.json()
    user.value = emailData.email
    isLogIn.value = true
  }
  else isLogIn.value = false
})

socket.on('message', (mess) => {
  messages.value.push(mess)
})

async function LogIn(nick){
  nickname.value = nick
  const fetchData = await fetch(`${import.meta.env.VITE_SERVER}/messages/all`, {
    headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
    }
  })
  const data = await fetchData.json()
  data.forEach((e) => {
      messages.value.push(e)
    })
  const fetchEmail = await fetch(`${import.meta.env.VITE_SERVER}/users/email`, {
    headers: { 'Authorization' : localStorage.getItem('token') }
  })  
  const emailData = await fetchEmail.json()
  user.value = emailData.email
  isLogIn.value = true
}

async function sendMessage(){
    if (message.value && message.value !== ''){
      socket.emit('message', {text:message.value, email:user.value})
      message.value = ''
    } 
}

</script>

<style >

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
  align-items: flex-start;
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

</style>