<script setup>
    import { reactive, ref } from 'vue';
    import { useUserStore } from '@/stores/user';
    import { useRouter } from 'vue-router';

    const userStore = useUserStore();

    const router = useRouter();

    if(userStore.isLoggedIn) {
        router.push('/');
    }

    const credentials = reactive({
        email: 'test@example.com',
        password: 'secret',
    })

    const errorMsg = ref()

    const login = (e) => {
        e.preventDefault();
        userStore.login(credentials).then(response => {
            if(response.status == 204) {
                router.push('/');
            }
        })
        .catch(error => {
            errorMsg.value = error.data.message
        })
    }
</script>

<template>
    <div class="w-full mt-20 mx-auto max-w-sm overflow-hidden bg-white rounded-lg shadow-md">
        <div class="px-6 py-4">
            <div class="flex justify-center mx-auto">
                <img class="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="">
            </div>

            <h3 class="mt-3 text-xl font-medium text-center text-gray-600">Welcome Back</h3>

            <p class="mt-1 text-center text-gray-500">Login or create account</p>

            <form @submit="login">
                <div class="w-full mt-4">
                    <input v-model="credentials.email" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email Address" aria-label="Email Address" />
                </div>

                <div class="w-full mt-4">
                    <input v-model="credentials.password" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" />
                </div>

                <div class="flex items-center justify-between mt-4">
                    <a href="#" class="text-sm text-gray-600 hover:text-gray-500">Forget Password?</a>

                    <button class="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        Sign In
                    </button>
                </div>
            </form>
            <p class="text-red-700 text-sm mt-2 text-center">{{ errorMsg }}</p>
        </div>

        <div class="flex items-center justify-center py-4 text-center bg-gray-50">
            <span class="text-sm text-gray-600">Don't have an account? </span>

            <a href="#" class="mx-2 text-sm font-bold text-blue-500 hover:underline">Register</a>
        </div>
    </div>
</template>
