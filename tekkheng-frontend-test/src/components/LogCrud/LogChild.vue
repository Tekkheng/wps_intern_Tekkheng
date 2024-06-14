<script setup>
import { onMounted, ref } from 'vue'
import { useLogsStore } from '@/stores/LogsStore'
import DataTable from 'primevue/datatable'
import TableColumn from 'primevue/column'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
// import useTruckStore from '@/stores/truckStore'
const LogsStore = useLogsStore()
const isVisible = ref(false)
const status = ref('')
// const truckStore = useTruckStore()
const showModal = () => {
  isVisible.value = true
}

const removedItem = (noItem) => {
  LogsStore.deleteItemLogs(noItem)
}

const toggleDriverStatus = (noItem) => {
  console.log(noItem, status.value)
  LogsStore.updateLogStatus(noItem, status.value)
  isVisible.value = false
  status.value = ''
}

onMounted(async () => {
  //   await truckStore.fetchItems()
  await LogsStore.fetchItemsLogs()

  console.log(LogsStore.Logs)
  //   console.log(truckStore.truck[0].tipe_truck)

  //   const tipe_driver_truck_string = truckStore.truck.find(
  //     (truck) => truck.tipe_truck == LogsStore.driver.tipe_driver_truck
  //   )
  //   console.log(tipe_driver_truck_string)
})
</script>

<template>
  <div class="container-fluid p-3">
    <div class="row d-flex justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header d-flex justify-content-between">
            <h4 class="text-primary">Logs Data</h4>
            <RouterLink :to="{ name: 'add_log' }" class="nav-link">
              <button class="btn btn-outline-primary">
                <i class="pi pi-plus p-2 fw-bold"></i>Add Log
              </button>
            </RouterLink>
          </div>
          <!-- <div v-for="(d, index) in LogsStore.Logs" :key="index">
            <h1>{{ d.log }}</h1>
          </div> -->
          <DataTable
            :value="LogsStore.Logs"
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            stripedRows
            showGridlines
            tableStyle="min-width: 50rem"
          >
            <TableColumn
              field="id"
              header="No"
              bodyStyle="overflow: visible"
              :headerStyle="{ backgroundColor: 'lightblue', color: 'white' }"
            ></TableColumn>
            <TableColumn
              field="user_data.nama"
              header="Nama"
              bodyStyle="overflow: visible"
              :headerStyle="{ backgroundColor: 'lightblue', color: 'white' }"
            ></TableColumn>
            <TableColumn
              field="user_data.email"
              header="Email"
              bodyStyle="overflow: visible"
              :headerStyle="{ backgroundColor: 'lightblue', color: 'white' }"
            ></TableColumn>
            <TableColumn
              field="user_data.role"
              header="Role"
              bodyStyle="overflow: visible"
              :headerStyle="{ backgroundColor: 'lightblue', color: 'white' }"
            ></TableColumn>
            <TableColumn
              field="log"
              header="Log"
              bodyStyle="overflow: visible"
              :headerStyle="{ backgroundColor: 'lightblue', color: 'white' }"
            ></TableColumn>
            <TableColumn
              field="status"
              header="Status"
              bodyStyle="overflow: visible"
              :headerStyle="{ backgroundColor: 'lightblue', color: 'white' }"
            ></TableColumn>

            <TableColumn
              header="Status"
              bodyStyle="overflow: visible;"
              :headerStyle="{ backgroundColor: 'lightblue', color: 'white' }"
            >
              <template #body="{ data }">
                <span
                  class="bg bg-warning text-light rounded p-2"
                  v-if="data.status == 'Pending'"
                  >{{ data.status }}</span
                >
                <span
                  class="bg bg-success text-light rounded p-2"
                  v-else-if="data.status == 'Approved'"
                  >{{ data.status }}</span
                >
                <span
                  class="bg bg-danger text-light rounded p-2"
                  v-else-if="data.status == 'Rejected'"
                  >{{ data.status }}</span
                >
              </template>
            </TableColumn>

            <TableColumn
              bodyStyle="overflow: visible"
              header="Action"
              class="d-flex"
              :headerStyle="{ backgroundColor: 'lightblue', color: 'white' }"
            >
              <template #body="{ data }">
                <RouterLink
                  :to="{ name: 'edit_log', params: { id: data.id } }"
                  class="nav-link me-2"
                >
                  <button class="btn btn-outline-primary d-block">
                    <i class="pi pi-pen-to-square"></i>
                  </button>
                </RouterLink>

                <button class="btn btn-outline-secondary d-block me-2" @click.prevent="showModal()">
                  <i :class="data.status !== 'Disetujui' ? 'pi pi-check' : 'pi pi-times'"></i>
                </button>

                <button
                  class="btn btn-outline-danger d-block me-2"
                  @click.prevent="removedItem(data.id)"
                >
                  <i class="pi pi-trash"></i>
                </button>

                <Dialog
                  closable="bg bg-info"
                  v-model:visible="isVisible"
                  modal
                  header="Input Status"
                  :style="{ width: '25rem' }"
                >
                  <span class="p-text-secondary block mb-5">Ganti Status</span>
                  <div class="flex align-items-center gap-3 mb-5 mt-3">
                    <label for="status" class="font-semibold w-6rem me-2">Status</label>
                    <InputText
                      id="status"
                      class="flex-auto"
                      autocomplete="off"
                      v-model="status"
                      placeholder="Isi Status"
                    />
                  </div>
                  <div class="flex justify-content-end gap-2">
                    <Button
                      type="button"
                      label="Cancel"
                      severity="secondary"
                      @click="isVisible = false"
                    ></Button>
                    <Button
                      type="button"
                      label="Send"
                      @click="toggleDriverStatus(data.id)"
                    ></Button>
                  </div>
                </Dialog>
              </template>
            </TableColumn>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
