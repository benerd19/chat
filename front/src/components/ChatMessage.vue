<template>
  <div>
      <div class="message">
        <p>{{ props.user }}</p>
        <div class="message__wrapper">
          <div class="message__text">{{ props.text }}</div>
        </div>
      </div>
  </div>
</template>

<script setup>
const props = defineProps(['text', 'user'])

</script>

<style scoped>

p{
    margin-bottom: 4px;
}

.message__wrapper{
  display: block;
}
.message{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.message__text{
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