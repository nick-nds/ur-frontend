<script setup>
    import { onMounted, ref, reactive, computed } from 'vue';
    import Posts from '../components/Posts.vue'

    const posts = ref([])

    const paginate = reactive({
        currentPage: 1,
        perPage: 10,
        totalItems: 100,
        totalPages: 0,
    });

    onMounted(() => {
        fetch('https://backend.test/api/posts', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        }).then(response => response.json())
        .then(data => {
            posts.value = data;
            paginate.totalPages = Math.ceil(data.length / paginate.perPage);
        })
    });

    const paginatedPosts = computed(() => {
        if(posts.value.length === 0) return [];
        const start = (paginate.currentPage - 1) * paginate.perPage;
        const end = paginate.currentPage * paginate.perPage;
        return posts.value.slice(start, end);
    })

    const nextPage = () => {
        if (paginate.currentPage < paginate.totalPages) paginate.currentPage++;
    }
    const prevPage = () => {
        if(paginate.currentPage > 1) paginate.currentPage--;
    }
</script>

<template>
  <main>
    <h1 class="text-2xl font-bold text-blue-500 mt-10">All Posts</h1>
    <Posts 
        :posts="paginatedPosts"
        :paginate="paginate"
        @nextPage="nextPage"
        @prevPage="prevPage"
    />
  </main>
</template>
