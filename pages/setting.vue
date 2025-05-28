<template>
  <v-container class="mt-10" max-width="600px">
    <v-card class="pa-6">
      <v-card-title class="text-h5">My Profile</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="onSubmit" ref="formRef">
          <v-text-field
            label="Name"
            variant="outlined"
            density="comfortable"
            prepend-inner-icon="mdi-account"
            class="mb-3"
            v-model="form.name"
            :rules="[rules.name]"
            required
          ></v-text-field>

          <v-text-field
            label="Email"
            variant="outlined"
            density="comfortable"
            prepend-inner-icon="mdi-email-outline"
            class="mb-3"
            v-model="form.email"
            type="email"
            disabled
          ></v-text-field>

          <v-btn
            class="mb-3"
            color="secondary"
            variant="outlined"
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? 'Hide' : 'Change password' }}
          </v-btn>

          <v-text-field
            v-if="showPassword"
            v-model="form.oldPassowrd"
            label="Old password"
            type="password"
            variant="outlined"
            density="comfortable"
            prepend-inner-icon="mdi-lock-outline"
            class="mb-3"
            :rules="rules.password"
            required
          ></v-text-field>
          <v-text-field
            v-if="showPassword"
            v-model="form.password"
            label="New Password"
            type="password"
            variant="outlined"
            density="comfortable"
            prepend-inner-icon="mdi-lock-outline"
            class="mb-3"
            :rules="rules.password"
            required
            />
            <v-text-field
            v-if="showPassword"
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
            class="rounded-lg mb-3">Update</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const form = ref({
  name: '',
  email: '',
  oldPassowrd: '',
  password: '',
  confirmPassword: ''
})

const authStore = useAuthStore()
authStore.loadAuthFromCookies()
const { updateProfile } = useUser()
const { $toast } = useNuxtApp()

const showPassword = ref(false)
const formRef = ref(null)

const rules = {
name: [
    (v) => !!v || 'Name is required.',
    (v) => v.length >= 2 || 'Name must be at least 2 characters.',
],
email: [
    (v) => !!v || 'Email is required.',
    (v) => /.+@.+\..+/.test(v) || 'Email must be valid.',
],
password: [
    (v) => !!v || 'Password is required.',
    (v) => v.length >= 6 || 'Password must be at least 6 characters.',
],
confirmPassword: [
    (v) => !!v || 'Confirmation is required.',
    (v) => v === form.value.password || 'Passwords do not match.',
],
}

onMounted(() => {
    form.value.name = authStore.user.name
    form.value.email = authStore.user.email
})

const onSubmit = async () => {
  const { valid } = await formRef.value.validate()

  if (!valid) return

  const result = await updateProfile({
    name: form.value.name,
    isUpdatePassword: showPassword.value,
    currentPassword: form.value.oldPassowrd,
    newPassword: form.value.password
  })
  if (result.success) {
    authStore.setUser(result.data.data)
    $toast.success('Profile updated successfully')

    setTimeout(() => {
      window.location.reload()
    }, 500)
  } else {
    $toast.error(result.message)
  }
}
</script>
