import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

const useUsersStore = defineStore('usersStore', {
  state: () => ({
    userLoggedin: []
  }),
  getters: {
    favorite: (state) => state.userLoggedin.filter((user) => user.isFav),
    favCount: (state) =>
      state.userLoggedin.reduce(
        (currentValue, user) => (user.isFav ? currentValue + 1 : currentValue),
        0
      ),
    totalCount: (state) => state.userLoggedin.length
  },
  actions: {
    async fetchUser() {
      try {
        const response = await axios.get('profile')
        if (response.status === 200) {
          this.userLoggedin = response.data.data
        } else {
          console.log('Failed get user')
        }
      } catch (err) {
        console.log('user token berubah!')
        console.log(err)
        localStorage.removeItem('user')
      }
    },
    async LoginUser(user) {
      try {
        const response = await axios.post('login', user)
        console.log(response)
        if (response.data.status === 200) {
          localStorage.setItem('user', response.data.token)
          //   localStorage.setItem('dataUser', response.data)
          setTimeout(() => {
            router.push('/dashboard')
          }, 2000)
        } else {
          return response.data.message
        }
      } catch (err) {
        console.log(err)
        return err
      }
    },
    async Logout() {
      try {
        const response = await axios.delete('logout')
        console.log('proses logout', response)
        if (response.status === 200) {
          localStorage.removeItem('user')
          setTimeout(() => {
            router.push({ name: 'login' })
          }, 2000)
        } else {
          return response.data.message
        }
      } catch (err) {
        console.log('hhehe', err)
        return err
      }
    },
    addUser(newUser) {
      this.userLoggedin.push(newUser)
    }
  }
})

export default useUsersStore
