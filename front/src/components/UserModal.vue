<template>
<div class="modal__wrapper">
    <div class="modal">
        <p class="modal__text">Login</p>
        <p class="email">Email</p>
        <input type="text" v-model="email" tabindex="1">
        <p class="password">Password</p>
        <input type="password" v-model="password" @keypress.enter="enterName" tabindex="2">
        <button @click="enterName">Enter Name</button>
        <p class="error" v-if="isFound">User not found</p>
    </div>
</div>
</template>

<script setup>
import { defineModel, ref, defineEmits } from 'vue'
const emit = defineEmits(['log'])
const email = ref('')
const password = ref('')
const isFound = ref(false)
async function enterName(){
    try{
    if (email.value === '' || password.value === '') throw new Error('Empty inputs')    
    const data = await fetch(`${import.meta.env.VITE_SERVER}/users/${email.value}`, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:
            JSON.stringify({password: password.value})
        })
    if (data.status === 404) throw new Error('Not found')
    const clearData = await data.json()
    emit('log', clearData.email, clearData.nickname)
    }
    catch(e)
    {
        if(e.message === 'Not found') isFound.value = true
    }
}


</script>

<style scoped>
.error{
    color: red;
    font-size: 14px;
}
.modal__wrapper{
    margin-top: 150px;
    display: flex;
    justify-content: center;
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
}

p{
    font-size: 16px;
    font-weight: 600;
}

.email{
    align-self: flex-start;
}

.password{
    align-self: flex-start;
}

.modal input{
    width: 250px;
    font-size: 14px;
    padding: 4px;
    border-radius: 4px;
    border: 2px solid black
}

.modal button{
    font-size: 14px;
    font-weight: 700;
    width: 100px;
    height: 50px;
    border-radius: 10px;
    background-color: white;
    border: 2px solid black;
    transition: 0.2s;
}

.modal button:hover{
    background-color: black;
    color:white;
    border: 2px solid black;
}
</style>
