import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { api } from '@/ky'

export const useUserStore = defineStore('user', () => {

    const loggedIn = ref(false)

    const route = useRouter()

    const user = ref(undefined)
    
    const login = async (credentials) => {
        const { email, password, rememberme } = credentials
        return api.get('sanctum/csrf-cookie').then(r => {

            return api.post('login', {
                json: {
                    email,
                    password
                }
            }).then(response => {
                if(response.status === 204) {
                    attempt()
                    return response
                }
            })
            .catch(error => {
                return error.response.json().then(data => {
                    const e = new Error(data.message)
                    e.data = data
                    throw e
                })
            })
        })
    }

    const attempt = async () => {
        return api.get('sanctum/csrf-cookie').then(r => {
            return api.get('api/user').then(response => {
                if(response.status === 200) {
                    response.json().then(data => {
                        user.value = data
                        loggedIn.value = true
                    })
                }
            })
            .catch(() => {
                loggedIn.value = false
                user.value = {}
            })
        })
    }

    const logout = async () => {
        return api.post('logout').then(response => {
            if(response.status === 204) {
                loggedIn.value = false
                user.value = {}
                return response
            }
        })
    }

  return {
      loggedIn,
      login,
      user,
      attempt,
      logout,
  }
})

