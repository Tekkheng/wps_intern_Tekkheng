import axios from 'axios'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import router from '@/router'

export const useLogsStore = defineStore('LogsStore', {
  state: () => ({
    Logs: []
  }),
  getters: {},
  actions: {
    async fetchItemsLogs() {
      const response = await axios.get('log')
      this.Logs = response.data
    },
    async addItemLogs(newItem) {
      try {
        const response = await axios.post(`log`, JSON.stringify(newItem), {
          headers: { 'Content-type': 'application/json' }
        })
        if (response.status === 200) {
          this.Logs.push(response.data.data)
          Swal.fire({
            title: 'Success!',
            text: 'Add Data Success!',
            icon: 'success',
            confirmButtonText: 'Okay',
            timer: 1500
          })
          setTimeout(() => {
            router.push('/log')
          }, 1500)
        } else {
          Swal.fire({
            title: 'Failed',
            text: 'Add Data Failed!',
            icon: 'error',
            confirmButtonText: 'Okay',
            timer: 1500
          })
        }
      } catch (err) {
        console.log(err)
        Swal.fire({
          title: 'Add Data Failed!',
          text: err.response.data,
          icon: 'error',
          confirmButtonText: 'Okay',
          timer: 1500
        })
      }
    },

    //   deleteLocalCalendar.remove()
    async deleteItemLogs(noItem) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(`log/${noItem}`)
            if (response.status === 200) {
              console.log('Events:', this.Logs)
              console.log('No item:', noItem)
              const index = this.Logs.findIndex((_event) => _event.id == noItem)
              console.log('Index:', index)

              this.Logs.splice(index, 1)

              Swal.fire({
                title: 'Success!',
                text: 'Remove Data Success!',
                icon: 'success',
                confirmButtonText: 'Okay',
                timer: 1500
              })
            } else {
              Swal.fire({
                title: 'Failed',
                text: 'Remove Data Failed!',
                icon: 'error',
                confirmButtonText: 'Okay',
                timer: 1500
              })
            }
          } catch (err) {
            Swal.fire({
              title: 'Failed',
              text: err.response,
              icon: 'error',
              confirmButtonText: 'Okay',
              timer: 1500
            })
            console.log(err)
          }
          Swal.fire({
            title: 'Deleted!',
            text: 'Remove Data Log Success',
            icon: 'success'
          })
        }
      })
    },
    async updateItemLogs(payload) {
      const { id, newEditData } = payload
      try {
        const response = await axios.put(`log/${id}`, newEditData)
        if (response.status === 200) {
          Swal.fire({
            title: 'Success',
            text: 'Edit Data Success',
            icon: 'success',
            confirmButtonText: 'Okay',
            timer: 1500
          })
          //   console.log(response)
          const index = this.Logs.findIndex((_event) => _event.id == id)
          this.Logs.splice(index, 1, response.data.data)
          setTimeout(() => {
            router.push('/log')
          }, 1500)
        } else {
          Swal.fire({
            title: 'Failed!',
            text: 'Edit Data Failed',
            icon: 'error',
            confirmButtonText: 'Okay',
            timer: 1500
          })
        }
      } catch (err) {
        console.log(err)
        Swal.fire({
          title: 'Failed',
          text: err,
          icon: 'error',
          confirmButtonText: 'Okay',
          timer: 1500
        })
      }
    },
    async updateLogStatus(idItem, status) {
      try {
        console.log(idItem, status)
        const response = await axios.put(`logStatus/${idItem}`, { status: status })
        if (response.status === 200) {
          Swal.fire({
            title: 'Success',
            text: 'Edit Status Success',
            icon: 'success',
            confirmButtonText: 'Okay',
            timer: 1500
          })
          const Logs = this.Logs.find((Logs) => Logs.id === idItem)
          if (Logs) {
            Logs.status = status
          }
        } else {
          Swal.fire({
            title: 'Failed!',
            text: 'Edit Data Failed',
            icon: 'error',
            confirmButtonText: 'Okay',
            timer: 1500
          })
        }
      } catch (err) {
        console.log(err)
        Swal.fire({
          title: 'Failed',
          text: err,
          icon: 'error',
          confirmButtonText: 'Okay',
          timer: 1500
        })
      }
    }
  }
})
