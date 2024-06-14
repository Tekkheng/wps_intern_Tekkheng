<script setup>
import Swal from 'sweetalert2'
import { RouterLink } from 'vue-router'
import useUsersStore from '@/stores/UsersStore'
import imgProfile from '@/assets/profile.png'
import { computed, onMounted } from 'vue'

const UsersStore = useUsersStore()
const userData = computed(() => UsersStore.userLoggedin)

const LogOut = async () => {
  const msg = await UsersStore.Logout()
  if (!msg) {
    Swal.fire({
      icon: 'success',
      title: 'Logout Berhasil',
      text: 'Anda telah berhasil logout!',
      timer: 1500
    })
  }
}

onMounted(async () => {
  await UsersStore.fetchUser()
  console.log(userData.value)
})
</script>
<template>
  <div id="sidebar">
    <ul class="text-center" style="height: 100%">
      <div>
        <img :src="imgProfile" class="rounded w-50" alt="profile" />
        <h6>{{ userData.nama }}</h6>
      </div>
      <div class="d-flex flex-column mt-5">
        <li><RouterLink class="nav-link" :to="{ name: 'dashboard' }">Dashboard</RouterLink></li>
        <li><RouterLink class="nav-link" :to="{ name: 'log' }">Log Harian</RouterLink></li>
        <li>
          <RouterLink class="nav-link" to="/logout" @click.prevent="LogOut()">Logout</RouterLink>
        </li>
      </div>
      <!-- <li>
        <RouterLink class="nav-link" :to="{ name: 'InputLog' }"
          >log harian sementara input</RouterLink
        >
      </li> -->
    </ul>
  </div>
</template>

<style scoped>
#sidebar {
  width: 170px;
  background: #333;
  color: #fff;
  height: 100vh;
  padding: 20px;
}

#sidebar ul {
  list-style: none;
  padding: 0;
}

#sidebar ul li {
  margin: 10px 0;
}

.router-link-active {
  color: rgb(98, 103, 234);
}

.nav-link:hover {
  color: rgb(98, 103, 234);
}
</style>
