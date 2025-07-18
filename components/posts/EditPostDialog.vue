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

const { updatePostbyId } = usePost()
const { $toast } = useNuxtApp()

const props = defineProps<{
  modelValue: boolean
  post: any
  categories: Array<{ id: number; name: string }>
  fetchPosts: () => void
}>()

const emit = defineEmits(['update:modelValue', 'submit'])

const form = ref({
  title: '',
  content: '',
  category_id: null,
})

const rules = {
  required: (value: any) => !!value || 'This field is required',
}

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

const submitEdit = async () => {
  if (formRef.value.validate()) {
    const res = await updatePostbyId(props.post.id, {
      title: form.value.title,
      content: form.value.content,
      category_id: form.value.category_id,
    })

    if (res.success) {
      $toast.success('Post updated successfully')
      props.fetchPosts()
      emit('update:modelValue', false)
    } else {
      $toast.error(res.message ||'Failed to update post')
    }
  } else {
    $toast.error('Please fill in all required fields')
  }
}
</script>
