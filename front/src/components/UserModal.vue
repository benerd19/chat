<template>
<div class="modal__wrapper">
    <div class="modal" v-if="status === 'login'">
        <div class="modal__buttons">
            <button class="modal__change-buttons" @click="status='login'; isError = false">Login</button>
            <button class="modal__change-buttons" @click="status='create'; isError = false">Create</button>
        </div>
        <p class="email">Email</p>
        <input type="text" v-model="email" tabindex="1">
        <p class="password">Password</p>
        <input type="password" v-model="password" tabindex="2">
        <button @click="logIn" class="modal__button">Enter</button>
        <p class="error" v-if="isError">{{ errorMessage }}</p>
    </div>
    <div class="modal" v-if="status === 'create'">
        <div class="modal__buttons">
            <button class="modal__change-buttons" @click="status='login'; isError = false">Login</button>
            <button class="modal__change-buttons" @click="status='create'; isError = false">Create</button>
        </div>
        <p class="email">Email</p>
        <input type="text" v-model="email" tabindex="1">
        <p class="password">Password</p>
        <input type="password" v-model="password" tabindex="2">
        <p class="name">Name</p>
        <input type="text" v-model="nickname" tabindex="3">        
        <button @click="createUser" class="modal__button">Enter</button>
        <p class="error" v-if="isError">{{ errorMessage }}</p>
    </div>
</div>
</template>

<script setup>
import { defineModel, ref } from 'vue'
const emit = defineEmits(['log'])
const status = ref('login')
const nickname = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('Error')
const isError = ref(false)
async function createUser(){
    try{
        isError.value = false
        if (email.value === '' || password.value === '' || nickname.value === '') throw new Error('Empty fields')
        const fetchData = await fetch(`${import.meta.env.VITE_SERVER}/users`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({email: email.value, password: password.value, nickname:nickname.value})
        })
        if (fetchData.status === 400) throw new Error('User exists')
        const data = await fetchData.json()
        localStorage.setItem('token', data.token)
        // console.log(data)
    }
    catch(e){
        isError.value = true
        errorMessage.value = e.message 
    }
}

async function logIn(){
    try{
        isError.value = false
        if (email.value === '' || password.value === '') throw new Error('Empty fields')    
        const data = await fetch(`${import.meta.env.VITE_SERVER}/users/${email.value}`, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:
                JSON.stringify({password: password.value})
            })
        if (data.status === 403) throw new Error('Not found')
        const clearData = await data.json()
        localStorage.setItem('token', clearData.token)
        //console.log(clearData)
        emit('log', clearData.nickname)
    }
    catch(e){
        isError.value = true
        errorMessage.value = e.message
        console.log(e)
    }
}


</script>

<style scoped>
.modal__buttons{
    display: flex;
    justify-content: center;
    gap: 20px;
}

.modal__change-buttons{
    font-size: 16px;
    font-weight: 700;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: white;
    border: 2px solid transparent;
    transition: 0.2s;
}

.modal__change-buttons:hover{
    background-color: black;
    color:white;
    border: 2px solid black;
}


.error{
    color: red;
    font-size: 14px;
}
.modal__wrapper{
    margin-top: 150px;
    display: flex;
    justify-content: center;
    transition: 0.2s;
}
.modal{
    padding: 30px;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-direction: column;
    width: auto;
    border: 2px solid black;
    border-radius: 10px;
    transition: 0.2s;
}

p{
    font-size: 16px;
    font-weight: 600;
}

.email, .password, .name{
    align-self: flex-start;
}

.modal input{
    width: 250px;
    font-size: 14px;
    padding: 4px;
    border-radius: 4px;
    border: 2px solid black
}

.modal__button{
    font-size: 14px;
    font-weight: 700;
    width: 100px;
    height: 50px;
    border-radius: 10px;
    background-color: white;
    border: 2px solid black;
    transition: 0.2s;
}

.modal__button:hover{
    background-color: black;
    color:white;
    border: 2px solid black;
}
</style>
