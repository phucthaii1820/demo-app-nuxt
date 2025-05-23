<template>
  <v-app-bar flat color="white" elevation="1">
    <v-container class="d-flex justify-space-between align-center">
      <NuxtLink to="/" class="text-h6 font-weight-bold text-decoration-none text-primary">
        NuxtApp
      </NuxtLink>

      <v-row class="d-none d-md-flex" no-gutters>
        <v-btn variant="text" to="/about" class="text-capitalize">About us</v-btn>
      </v-row>

      <div class="d-flex align-center gap-2">
        <template v-if="user">
          <v-menu offset-y>
            <template #activator="{ props }">
              <v-btn icon v-bind="props">
                <v-icon size="32">mdi-account-circle</v-icon>
              </v-btn>
            </template>

            <v-list style="min-width: 250px">
              <v-list-item :title=user?.email disabled />
              <v-divider />
              <v-list-item to="/profile/edit" prepend-icon="mdi-pencil" title="Edit Profile" />
              <v-list-item to="/settings" prepend-icon="mdi-cog" title="Settings" />
              <v-list-item to="/help" prepend-icon="mdi-help-circle" title="Help & FAQ" />
              <v-list-item to="/posts/my_posts" prepend-icon="mdi-chat" title="My Posts" />
              <v-divider />
              <v-list-item @click="logout" prepend-icon="mdi-logout" title="Log out" class="text-error" />
            </v-list>
          </v-menu>
        </template>

        <template v-else>
          <v-row class="d-none d-md-flex" no-gutters>
            <v-btn to="/login" class="text-capitalize">Login</v-btn>
            <v-btn to="/register" class="text-capitalize">Sign up</v-btn>
        </v-row>
        </template>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { watch } from 'vue'

const route = useRoute()
const authStore = useAuthStore()
authStore.loadAuthFromCookies()
const user = ref(authStore.user)

watch(
  () => route.path,
  () => {
    authStore.loadAuthFromCookies()
    user.value = authStore.user
  }
)

const logout = async () => {
  await authStore.logout()
  user.value = null
  navigateTo('/')
}
</script>

<style scoped>
.text-decoration-none {
  text-decoration: none;
}
</style>