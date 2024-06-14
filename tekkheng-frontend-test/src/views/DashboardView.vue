<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useLogsStore } from '@/stores/LogsStore'

import listPlugin from '@fullcalendar/list'

const LogsStore = useLogsStore()

let eventHandler = ref(null)
let isAdd = ref(null)

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
  headerToolbar: {
    left: 'prev today next',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  },
  //// ubah language
  // locale: 'fr',

  //// ubah text button
  // buttonText: {
  //   today: 'hai',
  //   month: 'he',
  //   week: 'hi',
  //   day: 'ho'
  // },
  initialView: 'dayGridMonth',
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  events: [], // Initialize events array
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventResize: handlerEventDrop,
  eventDrop: handlerEventDrop
  // eventsSet: handleEvents
})

// const currentEvents = ref([])

// function handleEvents(events) {
//   currentEvents.value = events
//   console.log(events)
//   console.log(currentEvents)
// }

// const eventGuid = ref(0)
// function createEventId() {
//   return String(eventGuid.value++)
// }

function handleWeekendsToggle() {
  calendarOptions.value.weekends = !calendarOptions.value.weekends // update a property
}

function deleteHandler() {
  // closeModal()
  // const clickInfo = eventHandler.value
  // const current_id = clickInfo.event.id
  // schedulesStore.deleteItemSchedule(current_id, clickInfo.event)
  // isAdd.value = null
  // eventHandler.value = null
}

// update ui calendar event
const isUpdate = ref(null)
function handlerEventDrop(clickInfo) {
  // eventHandler.value = clickInfo
  // isAdd.value = false
  // isUpdate.value = true
  // openModal()
}

function handleEventClick(clickInfo) {
  // set eventHandler && isAdd untuk kondisi if add atau show
  // eventHandler.value = clickInfo
  // isAdd.value = false
  // openModal()
}

// handle add data
function handleDateSelect(selectInfo) {
  // set eventHandler && isAdd untuk kondisi if add atau show
  // eventHandler.value = selectInfo
  // isAdd.value = true
  // openModal()
}
const isModalOpened = ref(false)
const openModal = () => {
  isModalOpened.value = true
}
const closeModal = () => {
  if (isUpdate.value) {
    eventHandler.value.revert()
  }
  isModalOpened.value = false
  isUpdate.value = null
}

const clearValue = () => {
  eventHandler.value = null
  isAdd.value = null
  isUpdate.value = null
}

watchEffect(() => {
  console.log(LogsStore.logs)
  if (LogsStore.logs) {
    const events = LogsStore.logs
      .filter((log) => log.status)
      .map((log) => ({
        id: '2',
        title: 'title',
        start: new Date('2024-01-17' + 'T09:00:00'),
        end: new Date('2024-01-18' + 'T16:00:00'),
        backgroundColor: 'green',
        // textColor: 'white',
        extendedProps: {
          nama: 'nama',
          email: 'email'
        }
      }))
    calendarOptions.value.events = events
  }
})

onMounted(async () => {
  // let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
  await LogsStore.fetchItemsLogs()
})
</script>

<template>
  <div class="demo-app rounded" style="margin: 0rem 2rem -5rem 2rem; width: 65%">
    <div class="demo-app-main">
      <label class="">
        <input type="checkbox" :checked="calendarOptions.weekends" @change="handleWeekendsToggle" />
        toggle weekends
      </label>
      <FullCalendar class="demo-app-calendar" :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <div class="fc-content">
            <i>{{ arg.event.title }} - </i>
            <i>{{ arg.event.extendedProps.email }}</i>
            <span v-if="arg.event.extendedProps && arg.event.extendedProps.nama">
              - Nama {{ arg.event.extendedProps.nama }}</span
            >
          </div>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<style lang="css">
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family:
    Arial,
    Helvetica Neue,
    Helvetica,
    sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc {
  max-width: 1100px;
  margin: 0 auto;
}

/* style warna text event yg hanya 1 hari*/
.fc-event {
  /* background-color: rgb(255, 179, 0) !important; */
  /* border: 1px solid green; */
  color: black !important;
}

.fc-daygrid-more-link {
  text-decoration: none;
  color: green;
}

.fc-daygrid-day-number {
  color: black !important;
  text-decoration: none !important;
}

/* .fc-daygrid-day.fc-day-today {
  background-color: red !important;
} */

.fc-col-header-cell-cushion {
  color: black;
  text-decoration: none;
  font-weight: normal;
}

/* list edit */
.fc-list-day-text {
  color: #333;
  text-decoration: none;
}

.fc-list-day-side-text {
  color: black;
  text-decoration: none;
}

/* .fc-list-day-number {
  color: #666;
} */

/* .fc-list-item-title {
  color: #007bff;
} */

/* for modal */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-container {
  width: 300px;
  margin: 150px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
</style>
