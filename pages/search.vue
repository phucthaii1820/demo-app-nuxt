<template>
  <v-container>
    <v-row style="min-height: 80vh;">
      <v-col v-if="loading" class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
      <v-col v-else-if="error" class="text-center">
        <p class="text-error

          text-h6 font-weight-bold">
          {{ error }}
        </p>
      </v-col>
      <v-col v-else v-for="post in posts.data" :key="post.id" cols="12" md="3">
        <v-card variant="tonal">
          <template #title>
            <div class="text-truncate">{{ post.title }}</div>
          </template>


          <template #subtitle>
            <div class="text-truncate">{{ post.user.name }}</div>
          </template>

          <template #text>
            <div class="text-truncate-multiline">{{ post.content }}</div>
          </template>

          <v-card-actions class="justify-end">
            <v-btn @click="openDialog(post)">More</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  
    <v-sheet class="flex justify-center mt-4 d-sm-flex">
      <v-pagination
        v-model="page"
        :length="total_pages"
        :total-visible="5"
        rounded="circle"
      ></v-pagination>
    </v-sheet>
    <PostDetailDialog
    v-model="dialog"
    :post="selectedPost"
    />
  </v-container>
</template>
<script setup lang="ts">
import PostDetailDialog from '~/components/posts/PostDetailDialog.vue'

import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const { searchPost } = usePost();

const route = useRoute()

const query = ref(
  Array.isArray(route.query.q) ? route.query.q[0] || '' : route.query.q || ''
)
const results = ref([])
const posts = ref([] as any)
const error = ref(null) as any
const loading = ref(true)
const total_pages = ref(0)
const page = ref(1)
const dialog = ref(false)
const selectedPost = ref<any>(null) 

const fetchPosts = async (dataPage: number = 1) => {
    loading.value = true
    await new Promise((resolve) => setTimeout(resolve, 1000))
    posts.value = await searchPost(query.value, dataPage)

    if (!posts.value.data || posts.value.data.length === 0) {
        error.value = posts.value.message || 'No posts found'
        loading.value = false
    } else {
        error.value = null
        loading.value = false
    }

    total_pages.value = posts.value.meta.total_pages || 0
}

onMounted(() => {
    fetchPosts()
})

watch(posts, (newPosts) => {
    // loading.value = false
})

watch(() => route.query.q, (newQ) => {
    if (newQ) {
      query.value = Array.isArray(newQ) ? newQ[0] || '' : newQ as string
      posts.value = []
      
      fetchPosts()
    } else {
      results.value = []
    }
})

watch(page, async (newPage) => {
    await fetchPosts(newPage)
})

const openDialog = (post: any) => {
    selectedPost.value = post
    dialog.value = true
}
</script>
<style scoped lang="css">
.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text-truncate-multiline {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>