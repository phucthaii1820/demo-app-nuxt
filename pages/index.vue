<template>
  <v-container>
    <v-row>
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
            <v-btn>More</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  
    <v-sheet class="flex justify-center mt-4 d-sm-flex">
      <v-btn @click="fetchMorePosts"class="mt-4 btn btn-primary" v-if="posts?.meta?.current_page < posts?.meta?.total_pages" prepend-icon="mdi-plus">
        Load More
      </v-btn>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
  const { getAllPost } = usePost();
  const posts = ref([] as any)
  const error = ref(null) as any
  const loading = ref(true)

  const fetchPosts = async () => {
    loading.value = true
    posts.value = await getAllPost()
  }

  const fetchMorePosts = async () => {
    loading.value = true
    const page = posts.value.meta.current_page + 1
    const newPosts = await getAllPost(page)
    posts.value.data.push(...newPosts.data)
    posts.value.meta = newPosts.meta
    loading.value = false
  }

  onMounted(() => {
    fetchPosts()
  })

  watch(posts, (newPosts) => {
    loading.value = false
    if (!newPosts.data || newPosts.data.length === 0) {
      error.value = 'No posts found'
    } else {
      error.value = null
    }
  })
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