<template>
  <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" max-width="600">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">
        {{ post?.title }} - {{ post?.category?.name }}
      </v-card-title>
      <v-card-subtitle class="text-subtitle-2">
        {{ post?.user?.name }}
      </v-card-subtitle>
      <v-card-text style="white-space: pre-line;">
        {{ post?.content }}
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn text @click="$emit('update:modelValue', false)">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
  post: any
}>()

defineEmits(['update:modelValue'])
</script>