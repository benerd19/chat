<template>
  <UserModal v-if="!isLogIn" @log="LogIn"/>
  <div class="chat__wrapper" v-else>
    <div class="chat">
        <div v-for="message in messages" :key="message.id" :class="['message__wrapper', {'message__wrapper--self': user === message.user}]">
          <div class="message">{{ message.text }}</div>
        </div>
      <div class="send">
        <input type="text" v-model="message">
        <button @click="sendMessage" v-if="user">Send</button>
        <button @click="sendName" v-else>Enter name</button>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { io } from 'socket.io-client'
import UserModal from './components/UserModal.vue'
import { ref, defineModel } from 'vue'
const isLogIn = ref(false)
const nickName = ref()
let id = 0
const user = ref()
const message = defineModel()
const messages = ref([])
//const socket = io('http://26.114.49.113:3000/')

// socket.on('message', (mess) => {
//   mess.id = id
//   messages.value.push(mess)
// })
function LogIn(email, nickname){
  user.value = email
  nickName.value = nickname
  isLogIn.value = true
}

function sendName(){
  if(message.value) user.value = message.value
  message.value = ''
}

function sendMessage(){
    if (message.value && message.value !== ''){
      const msg = {user: user.value, text: message.value}
      socket.emit('message', msg)
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