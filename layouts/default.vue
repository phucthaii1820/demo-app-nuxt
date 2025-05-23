<template>
    <v-app>
        <Header />
        <v-main>
        <v-container fluid>
            <slot />
        </v-container>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import Header from '~/layouts/header.vue'
</script>