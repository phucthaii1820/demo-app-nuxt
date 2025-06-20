<template>
  <div class="d-flex justify-center h-screen ">
    <div class="d-flex flex-row justify-center align-center w-100">
      <div class="w-50 d-flex justify-center align-center bg-image position-relative">
        <v-btn
          class="position-absolute right-0 top=0 "
          color="error"
          @click="isError = true"
          style="z-index: 10; pointer-events: auto;"
        >
          Simulate Error
        </v-btn>
        <div class="w-100 h-100 d-flex justify-center align-center" style="background-color: rgba(0, 0, 0, 0.5);">
          <v-img
          :width="300"
          :height="200"
          :src="logoBear"
          />
        </div>
       
      </div>
      <div class="w-50 d-flex flex-column justify-center align-center h-100 position-relative" style="background-color: #bd0f71;">
        <DotLottieVue v-if="!isError" class="position-absolute bottom-50 right-50" style="height: 400px; width: 400px;transform: translate(0%, -20%);" autoplay loop :src=loadingAnimation />
        <DotLottieVue v-else class="position-absolute bottom-50 right-50" style="height: 200px; width: 200px;transform: translate(0%, -25%);" autoplay loop src="https://lottie.host/63d6e6fd-a2e1-4c82-9344-c6cdcc6f0d9a/x8BCHIrjGa.lottie" />

        <p v-if="!isError" class="" style="font-size: 16px; font-weight: bold; color: white; margin-top: 180px;">Exporting Data, please wait...</p>
        <p v-else class="" style="font-size: 16px; font-weight: bold; color: white; margin-top: 180px;">Error encountered, please report to BEAR Team.</p>

        <p v-if="!isError" class="" style="font-size: 24px; color: white;font-weight: bold">BEAR with us while we are preparing the data.</p>
        <v-btn v-else class="mt-4" @click="isError = false">Close tab</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import logoBear from '/logo-bear.png'
import loadingAnimation from '/loading-animation.lottie'

const isError = ref(false)

definePageMeta({
  layout: false
})
</script>


<style scoped>
.bg-image {
  background-image: url('/bg-bear.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  
}
</style>
