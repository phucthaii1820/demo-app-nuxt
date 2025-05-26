<template>
  <v-container
    fluid
    class="fill-height d-flex justify-center align-center"
    style="min-height: 90vh;"
  >
    <v-card class="pa-6 rounded-xl shadow-lg" max-width="500" width="100%">
      <v-card-title class="text-h5 font-weight-bold text-center mb-4">
        Create your account
      </v-card-title>

      <v-form @submit.prevent="submit" ref="formRef">
        <v-text-field
          v-model="form.name"
          label="Full Name"
          variant="outlined"
          density="comfortable"
          prepend-inner-icon="mdi-account"
          class="mb-3"
          :rules="rules.name"
          required
        />

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
          :rules="rules.password"
          required
        />

        <v-text-field
          v-model="form.confirmPassword"
          label="Confirm Password"
          type="password"
          variant="outlined"
          density="comfortable"
          prepend-inner-icon="mdi-lock-check"
          class="mb-3"
          :rules="rules.confirmPassword"
          required
        />

        <v-btn
          type="submit"
          block
          color="primary"
          size="large"
          class="rounded-lg mb-3"
        >
          Sign up
        </v-btn>

        <div class="text-center">
          <NuxtLink :to=path.login class="text-decoration-none text-body-2">
            Already have an account? Sign in
          </NuxtLink>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const { $toast } = useNuxtApp();


  const formRef = ref()

  const form = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const rules = {
    name: [
      (v: string) => !!v || 'Name is required.',
      (v: string) => v.length >= 2 || 'Name must be at least 2 characters.',
    ],
    email: [
      (v: string) => !!v || 'Email is required.',
      (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid.',
    ],
    password: [
      (v: string) => !!v || 'Password is required.',
      (v: string) => v.length >= 6 || 'Password must be at least 6 characters.',
    ],
    confirmPassword: [
      (v: string) => !!v || 'Confirmation is required.',
      (v: string) => v === form.value.password || 'Passwords do not match.',
    ],
  }

  const submit = async () => {
    const isValid = await formRef.value?.validate()

    if (!isValid.valid) return

    const { name, email, password } = form.value
    const { register } = useAuth()
    const result = await register( email, password, name)
    if (result.success) {
      $toast.success('Registration successful!')
      navigateTo('/')
    } else {
      $toast.error(result.message || 'Registration failed. Please try again.')
    }
  }
</script>
