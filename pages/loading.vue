<template>
  <div class="d-flex justify-center h-screen " style="user-select: none; pointer-events: none;">
    <div class="d-flex flex-row justify-center align-center w-100">
      <div class="w-50 d-flex justify-center align-center bg-image">
        <div class="w-100 h-100 d-flex justify-center align-center" style="background-color: rgba(0, 0, 0, 0.5);">
          <v-img
          :width="300"
          :height="200"
          :src="logoBear"
          />
        </div>
       
      </div>
      <div class="w-50 d-flex flex-column justify-center align-center h-100 position-relative" style="background-color: #bd0f71;">
        <DotLottieVue class="position-absolute bottom-50 right-50" style="height: 400px; width: 400px;transform: translate(0%, -10%);" autoplay loop src="https://lottie.host/560d935a-b1d0-4ee4-86a1-62dcf2f78bf0/7Uqo75nMQO.lottie" />
        <p class="" style="font-size: 16px; font-weight: bold; color: white; margin-top: 180px;">Exporting Data, please wait...</p>
        <p class="" style="font-size: 24px; color: white;font-weight: bold">BEAR with us while we are preparing the data.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import logoBear from '~/public/logo-bear.png'

definePageMeta({
  layout: false
})
</script>


<style scoped>
.bg-image {
  background-image: url('/public/bg.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  
}
</style>
