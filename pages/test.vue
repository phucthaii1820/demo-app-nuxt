<template>
  <v-container>
    <v-combobox
      variant="outlined"
      append-inner-icon="mdi-magnify"
      v-model="valueSearch"
      :items="dataSearch"
      @update:model-value="onInputChange"
      @keydown.enter="onSearch"
    >
    </v-combobox>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const { searchPost } = usePost();
const valueSearch = ref<string>('');
const dataSearch = ref<string[]>([]);

// Debounce setup
let timeout: ReturnType<typeof setTimeout>;

const onInputChange = () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    fetchPosts();
  }, 1000);
};

const fetchPosts = async () => {
  try {
    const posts = await searchPost(valueSearch.value, 1, 10);
    dataSearch.value = posts?.data?.map((item: { title: string }) => item?.title) || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

const onSearch = async ()=> {
  console.log(valueSearch.value)
}
</script>