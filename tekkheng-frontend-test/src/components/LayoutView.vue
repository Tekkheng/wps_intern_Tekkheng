<script setup>
import Sidebar from '@/components/SideBar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app" class="w-100">
    <Sidebar />
    <div id="main-content" class="justify-content-center align-items-center w-100">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
#app {
  display: flex;
}

#main-content {
  flex: 1;
  padding: 20px;
}

#sidebar {
  width: 250px;
  background: #f4f4f4;
  padding: 20px;
}
</style>
