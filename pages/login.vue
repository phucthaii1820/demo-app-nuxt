<template>
  <v-container
    fluid
    class="fill-height d-flex justify-center align-center"
    style="min-height: 90vh;"
  >
    <v-card class="pa-6 rounded-xl shadow-lg" max-width="420" width="100%">
      <v-card-title class="text-h5 font-weight-bold text-center mb-4">
        Log in to your account
      </v-card-title>

      <v-form @submit.prevent="submit" ref="formRef">
        <v-text-field
          v-model="form.email"
          label="Email address"
          type="email"
          variant="outlined"
          density="comfortable"
          prepend-inner-icon="mdi-email-outline"
          class="mb-3"
          :rules="rules.email"
          required
        />

        <v-text-field
          v-model="form.password"
          label="Password"
          type="password"
          variant="outlined"
          density="comfortable"
          prepend-inner-icon="mdi-lock-outline"
          class="mb-3"
          autocomplete="off"
          :rules="rules.password"
          required
        />

        <v-btn
          type="submit"
          block
          color="primary"
          size="large"
          class="rounded-lg mb-3"
        >
          Log in
        </v-btn>

        <div class="text-center">
          <NuxtLink :to=path.forgotPassword class="text-decoration-none text-body-2">
            Forgot password?
          </NuxtLink>
        </div>
       
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import {useAuth} from '@/composables/useAuth'
  const { $toast } = useNuxtApp();
  

  const toast = useToast()
  const formRef = ref()

  const form = ref({
    email: '',
    password: '',
  })

  const rules = {
    email: [
      (v: string) => !!v || 'Email is required.',
      (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid.',
    ],
    password: [
      (v: string) => !!v || 'Password is required.',
      (v: string) => v.length >= 6 || 'Password must be at least 6 characters long.',
    ],
  }

  const submit = async () => {
    const isValid = await formRef.value?.validate()

    if (!isValid.valid) {
      return
    }

    const { email, password } = form.value
    const { login } = useAuth()
    const result = await login(email, password)
    
    if (result.success) {
      $toast.success('Login successful!')
      navigateTo({ path: '/' })
    } else {
      $toast.error(result.message || 'Login failed. Please try again.')
    }
  }
</script>
