<script setup>
// import imageSrc from '@/assets/pt_rimba.png'
import { reactive, ref } from 'vue'
import useUsersStore from '@/stores/UsersStore'
import InlineMessage from 'primevue/inlinemessage'
import Swal from 'sweetalert2'

let isPasswordVisible = ref(false)
let isLoading = ref(false)
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
  console.log(isPasswordVisible.value)
}

const handleInput = reactive({
  email: '',
  password: '',
  msg_password: '',
  msg_email: '',
  msg_err: ''
})

const authStore = useUsersStore()

const showInput = async () => {
  isLoading.value = true
  const { email, password } = handleInput
  if (!email) {
    handleInput.msg_email = 'Email tidak boleh kosong!'
    handleInput.msg_err = ''
    isLoading.value = false
    return
  } else if (!password) {
    handleInput.msg_password = 'kata sandi tidak boleh kosong!'
    handleInput.msg_err = ''
    isLoading.value = false
    return
  }
  const data = {
    email: email,
    password: password
  }

  const error = await authStore.LoginUser(data)
  if (error) {
    handleInput.msg_err = error
    handleInput.msg_email = ''
    handleInput.msg_password = ''
    isLoading.value = false
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Login Berhasil',
      text: 'Anda telah berhasil login!',
      timer: 1500
    })
    isLoading.value = false
    Object.assign(handleInput, {
      password: '',
      email: '',
      msg_err: '',
      msg_email: '',
      msg_password: ''
    })
  }
}
</script>

<template>
  <form class="d-flex justify-content-center align-items-center w-100" style="height: 100vh">
    <div
      class="card mt-5 p-5 border border-gray p-5 rounded-2 shadow d-flex justify-content-center align-items-center"
      style="width: 350px"
    >
      <InlineMessage
        severity="error"
        class="position-absolute"
        style="bottom: 24rem"
        v-if="handleInput.msg_err.length > 0"
        >{{ handleInput.msg_err }}</InlineMessage
      >
      <div class="d-flex flex-row mt-5 mb-2">
        <h1 class="fs-5 fw-bold text-center">Form Login</h1>
        <!-- <img :src="imageSrc" class="mb-4" alt="" width="40" style="border: 0px solid transparent" /> -->
      </div>

      <div class="mb-4">
        <label for="email" class="form-label">Email: </label>
        <span class="icon-email">
          <i class="pi pi-envelope"></i>
        </span>
        <input
          type="email"
          id="email"
          name="email"
          class="form-control input-login"
          placeholder="isi Email"
          v-model="handleInput.email"
          required
          :class="[handleInput.msg_email.length > 0 ? 'is-invalid form-control' : 'form-control']"
        />
        <span
          v-if="handleInput.msg_email.length > 0"
          class="invalid-feedback position-absolute"
          v-html="handleInput.msg_email"
        ></span>
      </div>
      <div class="mb-5 mt-2">
        <label for="password" class="form-label">Password: </label>
        <input
          :type="isPasswordVisible ? 'text' : 'password'"
          id="password"
          name="password"
          class="form-control input-login"
          placeholder="isi Password"
          v-model="handleInput.password"
          required
          :class="[
            handleInput.msg_password.length > 0 ? 'is-invalid form-control' : 'form-control'
          ]"
        />
        <span class="logoKey">
          <i class="pi pi-key"></i>
        </span>
        <span class="password-toggle" v-show="handleInput.msg_password === ''">
          <i
            @click="togglePasswordVisibility"
            :class="isPasswordVisible ? 'pi pi-eye-slash' : 'pi pi-eye'"
            id="togglePassword"
          ></i>
        </span>
        <span
          v-if="handleInput.msg_password.length > 0"
          class="invalid-feedback position-absolute"
          v-html="handleInput.msg_password"
        ></span>
      </div>
      <button
        :disabled="(!handleInput.email && !handleInput.password) || isLoading"
        class="btn btn-primary text-light btn-block w-100 mt-3"
        type="submit"
        @click.prevent="showInput()"
      >
        Login
      </button>
    </div>
  </form>
</template>

<style>
.password-toggle {
  position: absolute;
  top: 18rem;
  right: 3.9rem;
  transform: translateY(-50%);
  cursor: pointer;
  color: #999;
}

.logoKey {
  position: absolute;
  top: 18rem;
  left: 3.8rem;
  transform: translateY(-50%);
  cursor: pointer;
  color: #999;
}

.icon-email {
  position: absolute;
  top: 11.7rem;
  left: 3.8rem;
  transform: translateY(-50%);
  cursor: pointer;
  color: #999;
}

.input-login {
  padding-left: 2rem;
  padding-right: -5rem;
  width: 15rem;
}

.password-toggle.active i {
  color: #007bff;
}
</style>
