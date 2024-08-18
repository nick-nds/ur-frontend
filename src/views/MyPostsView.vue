<script setup>
    import { onMounted, watch, watchEffect, ref, reactive, computed } from 'vue';
    import { useRouter } from 'vue-router'
    import { useUserStore } from '@/stores/user'
    import { api } from '@/ky'
    import Posts from '../components/Posts.vue'

    const user = useUserStore()

    const router = useRouter()

    const posts = ref([])

    const paginate = reactive({
        currentPage: 1,
        perPage: 10,
        totalItems: 100,
        totalPages: 0,
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

    const isLoggedIn = computed(() => user.loggedIn)

    watchEffect(() => {
        if(isLoggedIn.value) {
            api.get('api/posts/user/' + user.user.id).then(response => response.json())
            .then(data => {
                posts.value = data.map(p => {
                    p['user'] = user.user
                    return p
                });
                paginate.totalPages = Math.ceil(data.length / paginate.perPage);
            })
        }
        if(user.user !== undefined && !isLoggedIn.value) {
            router.push('/unauthorized')
        }
    });

</script>

<template>
  <main>
    <h1 class="text-2xl font-bold text-blue-500 mt-10">My Posts</h1>
    <Posts 
        :posts="paginatedPosts"
        :paginate="paginate"
        @nextPage="nextPage"
        @prevPage="prevPage"
    />
  </main>
</template>
