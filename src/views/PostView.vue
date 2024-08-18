<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import { api } from '@/ky'
    import { useUserStore } from '@/stores/user'

    const user = useUserStore()

    const route = useRoute()

    const postId = route.params.id

    const post = ref({})

    onMounted(() => {
        api.get('api/posts/' + postId).then(response => response.json())
        .then(data => {
            post.value = data
        })        
    })

</script>

<template>
    <section v-if="Object.keys(post).length > 0" class="container mx-auto mt-5">
      <h2 class="text-2xl font-bold text-blue-600">{{ postId }}. {{ post.title }}</h2>
      <p class="text-gray-600 mt-5">{{ post.content }}</p>
      <div v-if="post.user.id == user.user.id" class="flex mt-10">
          <button class="px-6 py-2 border border-2 border-blue-500 rounded-md mr-4 flex group hover:bg-blue-500 hover:border-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-4 fill-blue-700 cursor-pointer group-hover:fill-white" fill="currentColor" viewBox="0 0 512 512">
                  <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/>
              </svg>
              <span class="font-medium text-blue-500 group-hover:text-white">Edit</span>
          </button>
          <button class="px-6 py-2 border border-2 border-red-700 rounded-md flex group hover:bg-red-700 hover:border-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-4 fill-red-700 cursor-pointer group-hover:fill-white" fill="currentColor" viewBox="0 0 448 512">
                  <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
              </svg>
              <span class="font-medium text-red-700 group-hover:text-white">Delete</span>
          </button>
      </div>
  </section>
</template>

