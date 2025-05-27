<template>
  <v-container>
    <v-card>
      <v-sheet class="d-flex justify-space-between align-center pa-4">
        <h3 class="text-h5">
         My Posts
        </h3>
        <v-btn append-icon="mdi-plus" @click="createPost">Add new post</v-btn>
      </v-sheet>
      <v-data-table
        :headers="headers"
        :items="posts.data"
        v-model:page="page"
        :items-per-page=10
      >
        <template #item.edit="{ item }">
          <v-menu offset-y>
            <template #activator="{ props }">
              <v-btn icon v-bind="props">
                <v-icon size="24">mdi-pencil</v-icon>
              </v-btn>
            </template>

            <v-list style="min-width: 180px">
              <v-list-item prepend-icon="mdi-pencil" title="Edit" @click="editPost(item)" />
              <v-list-item prepend-icon="mdi-delete" title="Delete" @click="confirmDelete(item.id)" />
            </v-list>
          </v-menu>
        </template>
         <template v-slot:bottom>
          <div class="text-center pt-2">
            <v-pagination
              v-model="page"
              :length="total_pages"
              :total-visible="5"
              rounded="circle"
            ></v-pagination>
          </div>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Are you sure?</v-card-title>
        <v-card-text>
          This action will permanently delete the post.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" variant="text" @click="dialog = false">Cancel</v-btn>
          <v-btn color="red" variant="text" @click="handleDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <EditPostDialog
      v-model="dialogEdit"
      :post="selectedPostEdit"
      :categories="listCategories"
      @update:modelValue="dialogEdit = false"
      :fetchPosts="fetchPosts"
    />
    <CreatePostDialog
      v-model="dialogCreate"
      :categories="listCategories"
      @update:modelValue="dialogCreate = false"
      :fetchPosts="fetchPosts"
    />
  </v-container>
</template>

<script setup>
import EditPostDialog from '~/components/posts/EditPostDialog.vue'
import CreatePostDialog from '~/components/posts/CreatePostDialog.vue'

const { $toast } = useNuxtApp();
const { getAllCategories } = useCategory()


const posts = ref([])
const loading = ref(true)
const { getMyPost, deletePostbyId } = usePost()
const total_pages = ref(0)
const page = ref(1)
const dialog = ref(false)
const dialogEdit = ref(false)
const dialogCreate = ref(false)
const selectedPostEdit = ref(null)
const selectedPostId = ref(null)
const listCategories = ref([])


const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Title', value: 'title' },
  { title: 'Content', value: 'content' },
  { title: 'Category', value: 'category.name' },
  { title: '', value: 'edit', sortable: false },
]

const getCategories = async () => {
  const response = await getAllCategories()
  if (response.success) {
    listCategories.value = response.data
  } else {
    console.error('Error fetching categories:', response.error)
  }
}

function createPost() {
  dialogCreate.value = true
}

const fetchPosts = async () => {
  loading.value = true
  posts.value = await getMyPost()
  if (posts.value.success) {
    total_pages.value = posts.value.meta.total_pages || 0
  } else {
    console.error('Error fetching posts:', posts.value.error)
  }

}

const deletePost = async (id) => {
  const response = await deletePostbyId(id)
  if (response.success) {
    $toast.success('Post deleted successfully!')
    await fetchPosts()
  } else {
    console.error('Error deleting post:', response.error)
  }
}

function confirmDelete(itemId) {
  selectedPostId.value = itemId
  dialog.value = true
}

async function handleDelete() {
  dialog.value = false
  if (selectedPostId.value) {
    await deletePost(selectedPostId.value)
    selectedPostId.value = null
  }
}

function editPost(item) {
  selectedPostEdit.value = item
  dialogEdit.value = true
}

onMounted(() => {
  fetchPosts()
  getCategories()
})
</script>