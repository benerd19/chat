<template>
  <div>
      <div class="message">
        <p class="message__user">{{ props.user }}</p>
        <div :class="['message__wrapper', {'message__wrapper--another' : !props.isAnother}]">
          <div class="message__text">{{ props.text }}</div>
        </div>
      </div>
  </div>
</template>

<script setup>
const props = defineProps(['text', 'user', 'isAnother'])
console.log(props.isAnother)
</script>

<style scoped>

p{
    margin-bottom: 4px;
}

.message__wrapper{
  display: block;
  align-self:flex-end;
}

.message__wrapper--another{
  align-self: flex-start;
}

.message{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.message__user{
  font-size: 16px;
  font-weight: 600;
}

.message__text{
  display: inline-block;
  font-size: 20px;
  color:white;
  justify-self:flex-end;
  background-color: black;
  border-radius: 10px;
  padding: 10px;
  max-width: 1536px;
  word-break: break-all
}
</style>