<script setup>
    import { defineProps, onMounted, ref, reactive, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import dayjs from 'dayjs';

    const router = useRouter();

    const props = defineProps(['posts', 'paginate'])


    const viewPost = (id) => {
        console.log(id);
    }

</script>

<template>
    <div class="px-1">
        <section class="container px-4 mx-auto">
            <div class="sm:flex sm:items-center sm:justify-between">
                <div class="flex items-center mt-4 gap-x-3">
                </div>
            </div>

            <div class="flex flex-col mt-6">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div class="overflow-hidden border border-gray-200 md:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                            ID
                                        </th>

                                        <th scope="col" class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                            Title
                                        </th>

                                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                            Author
                                        </th>

                                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                            Created At
                                        </th>

                                        <!--th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                            Actions
                                        </th-->
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr class="hover:bg-gray-200 group" v-for="post in props.posts" :key="post.id">
                                        <td @click="router.push('/posts/' + post.id)" class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap cursor-pointer group-hover:text-blue-500">{{ post.id }}</td>
                                        <td @click="router.push('/posts/' + post.id)" class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap cursor-pointer group-hover:text-blue-500">{{ post.title }}</td>
                                        <td class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{{ post.user.name }}</td>
                                        <td class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{{ dayjs(post.created_at).format('DD-MMM-YYYY') }}</td>
                                        <!--td class="flex px-4 py-4 text-sm text-gray-500 whitespace-nowrap z-20">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-4 hover:fill-blue-700 cursor-pointer" fill="currentColor" viewBox="0 0 512 512">
                                                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/>
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 hover:fill-red-700 cursor-pointer" fill="currentColor" viewBox="0 0 448 512">
                                                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                                            </svg>
                                        </td-->
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-between mt-6">
                <span 
                    @click="prevPage" 
                    class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
                    :class="props.paginate.currentPage == 1 ? 'cursor-not-allowed' : 'cursor-pointer'"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>

                    <span>
                        previous
                    </span>
                </span>

                <div class="items-center hidden md:flex gap-x-3">
                    <span 
                        @click="props.paginate.currentPage = link"
                        v-for="link in props.paginate.totalPages" 
                        class="cursor-pointer px-2 py-1 text-sm rounded-md"
                        :class="props.paginate.currentPage == link ? 'bg-blue-100/60 text-blue-500' : 'text-gray-500 hover:bg-gray-100'"
                    >{{ link }}</span>
                </div>

                <span 
                    @click="nextPage" 
                    class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
                    :class="props.paginate.currentPage == props.paginate.totalPages ? 'cursor-not-allowed' : 'cursor-pointer'"
                >
                    <span>
                        Next
                    </span>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </span>
            </div>
        </section>
    </div>
</template>
