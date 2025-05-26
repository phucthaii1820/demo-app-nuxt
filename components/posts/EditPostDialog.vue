<template>
  <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" max-width="600">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">
        Edit Post
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="submitEdit" ref="formRef" lazy-validation>
          <v-text-field
            v-model="form.title"
            label="Title"
            required
          />
          <v-textarea
            v-model="form.content"
            label="Content"
            rows="5"
            auto-grow
            required
          />
          <v-select
            v-model="form.category_id"
            :items="categories"
            item-title="name"
            item-value="id"
            label="Category"
            required
          />
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn text @click="$emit('update:modelValue', false)">Cancel</v-btn>
        <v-btn color="primary" @click="submitEdit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  post: any
  categories: Array<{ id: number; name: string }>
}>()

const emit = defineEmits(['update:modelValue', 'submit'])

const form = ref({
  title: '',
  content: '',
  category_id: null,
})

const formRef = ref()

watch(
  () => props.post,
  (newPost) => {
    if (newPost) {
      form.value = {
        title: newPost.title || '',
        content: newPost.content || '',
        category_id: newPost.category?.id || null,
      }
    }
  },
  { immediate: true }
)

const submitEdit = () => {
  emit('submit', { ...form.value, id: props.post.id })
  emit('update:modelValue', false)
}
</script>
