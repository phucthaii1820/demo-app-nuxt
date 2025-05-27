<template>
  <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" max-width="600">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">
        Create Post
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="submitCreate" ref="formRef" lazy-validation>
          <v-text-field
            v-model="form.title"
            label="Title"
            required
            :rules="[rules.required]"
          />
          <v-textarea
            v-model="form.content"
            label="Content"
            rows="5"
            auto-grow
            required
            :rules="[rules.required]"
          />
          <v-select
            v-model="form.category_id"
            :items="categories"
            item-title="name"
            item-value="id"
            label="Category"
            required
            :rules="[rules.required]"
          />
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn text @click="$emit('update:modelValue', false)">Cancel</v-btn>
        <v-btn color="primary" @click="submitCreate">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { createPost } = usePost()
const { $toast } = useNuxtApp()

const props = defineProps<{
  modelValue: boolean
  categories: Array<{ id: number; name: string }>
  fetchPosts: () => void
}>()

const emit = defineEmits(['update:modelValue', 'created'])

const form = ref({
  title: '',
  content: '',
  category_id: null,
})

const formRef = ref()

const rules = {
  required: (value: any) => !!value || 'This field is required',
}

const resetForm = () => {
  form.value = {
    title: '',
    content: '',
    category_id: null,
  }
}

const submitCreate = async () => {
  if (formRef.value && await formRef.value.validate()) {
    try {
      const res = await createPost(form.value)
      if (res.success) {
        $toast.success('Post created successfully')
        resetForm()
        emit('update:modelValue', false)
        emit('created')
        props.fetchPosts()
      } else {
        $toast.error(res.message || 'Failed to create post')
      }
    } catch (error: any) {
      $toast.error(error.message || 'Error occurred')
    }
  } else {
    $toast.error('Please fill in all required fields')
  }
}
</script>
