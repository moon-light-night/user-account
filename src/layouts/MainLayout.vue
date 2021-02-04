<template>
  <div>
    <div class="app-main-layout">
      <Navbar @click="isOpen = !isOpen"></Navbar>
      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar.vue'
export default {
  data() {
    return {
      isOpen: true,
    }
  },
  components: {
    Navbar,
  },
}
</script>
