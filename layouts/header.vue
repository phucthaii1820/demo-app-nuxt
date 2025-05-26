<template>
  <v-app-bar flat color="white" elevation="1">
    <v-container class="d-flex justify-space-between align-center">
      <NuxtLink :to=path.home class="text-h6 font-weight-bold text-decoration-none text-primary">
        NuxtApp
      </NuxtLink>

      <v-row class="d-none d-md-flex" no-gutters>
        <v-btn variant="text" :to=path.about class="text-capitalize">About us</v-btn>
      </v-row>
      
      <v-row class="d-none d-md-flex" no-gutters>
        <v-text-field
        append-inner-icon="mdi-magnify"
        density="compact"
        label="Search templates"
        variant="outlined"
        hide-details
        single-line
        v-model="searchValue"
        @keydown.enter="onSearch"
      ></v-text-field>
      </v-row>

      <v-row class="d-none d-md-flex" no-gutters>
      </v-row>

      

      <div class="d-flex align-center gap-2 justify-end" style="min-width: 180px;">
        <template v-if="user">
          <v-menu offset-y>
            <template #activator="{ props }">
              <v-btn icon v-bind="props">
                <v-icon size="32">mdi-account-circle</v-icon>
              </v-btn>
            </template>

            <v-list style="min-width: 220px">
              <v-list-item :title=user?.email disabled />
              <v-divider />
              <v-list-item :to=path.profile prepend-icon="mdi-pencil" title="Edit Profile" />
              <v-list-item :to=path.myPost prepend-icon="mdi-chat" title="My Posts" />
              <v-divider />
              <v-list-item @click="logout" prepend-icon="mdi-logout" title="Log out" class="text-error" />
            </v-list>
          </v-menu>
        </template>

        <template v-else>
          <v-row class="" no-gutters>
            <v-btn :to=path.login class="text-capitalize mx-1">Login</v-btn>
            <v-btn :to=path.register class="text-capitalize mx-1">Sign up</v-btn>
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
const searchValue = ref<string>('');

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

const onSearch = () => {
  navigateTo(`/search?q=${searchValue.value}`)
}
</script>

<style scoped>
.text-decoration-none {
  text-decoration: none;
}
</style>