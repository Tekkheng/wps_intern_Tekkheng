<script setup>
import { ref, onMounted } from 'vue'
import { useLogsStore } from '@/stores/LogsStore'
import useUsersStore from '@/stores/UsersStore'

import Textarea from 'primevue/textarea'

import Calendar from 'primevue/calendar'

const LogsStore = useLogsStore()
const usersStore = useUsersStore()

const log = ref('')
const nama = ref('')
const email = ref('')
const status = ref('')
const userId = ref('')
const dateInput = ref('')

const formatDate = (tgl) => {
  const tahun = tgl.getFullYear()
  const bulan = (tgl.getMonth() + 1).toString().padStart(2, '0')
  const tanggalBulan = tgl.getDate().toString().padStart(2, '0')
  const stringTanggal = `${tahun}-${bulan}-${tanggalBulan}`
  return stringTanggal
}

console.log(dateInput.value)
const addNewItem = () => {
  console.log(dateInput.value)
  const formattedDate = formatDate(dateInput.value)
  console.log(dateInput.value)
  console.log(typeof dateInput.value)
  const newData = {
    log: log.value,
    status: status.value,
    user_id: userId.value,
    date: formattedDate
  }
  LogsStore.addItemLogs(newData)
  log.value = ''
  status.value = ''
  nama.value = ''
  email.value = ''
  userId.value = ''
  dateInput.value = ''
}

onMounted(async () => {
  await usersStore.fetchUser()
  console.log(usersStore.userLoggedin)
  if (usersStore) {
    nama.value = usersStore.userLoggedin.nama
    email.value = usersStore.userLoggedin.email
    userId.value = usersStore.userLoggedin.id
  }
})
</script>

<template>
  <div class="container-fluid">
    <div class="row justify-content-center align-items-center bg bg-white p-3 m-3 rounded">
      <RouterLink
        class="pi pi-arrow-left text-decoration-none text-dark fw-bold me-3"
        :to="{ name: 'log' }"
        ><span class="ms-3 fs-5">Back</span></RouterLink
      >
      <h4 class="mb-5 text-center">ADD LOG</h4>

      <div class="col-md-6">
        <div class="mb-4 d-flex flex-column justify-content-center align-items-center">
          <form>
            <div class="mb-3 row">
              <div class="col-sm-2 form-label">Log</div>
              <div class="col-sm-8">
                <Textarea v-model="log" rows="5" cols="30" />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="tgl_berangkat" class="col-sm-2 col-form-label pe-5">Date</label>
              <div class="col-sm-10">
                <Calendar
                  v-model="dateInput"
                  showIcon
                  :showOnFocus="true"
                  id="tgl_berangkat"
                  dateFormat="yy-mm-dd"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <div class="col-sm-2 form-label">Status</div>
              <div class="col-sm-8">
                <input
                  type="text"
                  placeholder="Pending,Rejected,Approved"
                  v-model="status"
                  class="form-control"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <div class="col-sm-2 form-label">Nama User</div>
              <div class="col-sm-8">
                <input
                  type="text"
                  placeholder="Nama"
                  v-model="nama"
                  class="form-control"
                  disabled
                />
              </div>
            </div>
            <div class="mb-3 row">
              <div class="col-sm-2 form-label">Email User</div>
              <div class="col-sm-8">
                <input
                  type="text"
                  placeholder="Email"
                  v-model="email"
                  class="form-control"
                  disabled
                />
              </div>
            </div>
            <div class="mb-3 row">
              <div class="col-sm-10 offset-sm-2">
                <button type="submit" class="btn btn-primary" @click.prevent="addNewItem">
                  Add Log
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
