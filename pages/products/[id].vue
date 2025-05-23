<template>
   <div>
        <h1>Product Details</h1>
        <p>This is the details page for product with ID: {{ id }}</p>
        <NuxtLink to="/">Go back to Home</NuxtLink>
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router'
    const route = useRoute()
    const id = route.params.id
</script>
