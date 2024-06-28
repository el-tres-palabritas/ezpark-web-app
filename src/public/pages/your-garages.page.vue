<script>
import VBaseLayout from '@/public/layout/base.layout.vue'
import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'
import PvDivider from 'primevue/divider'
import { ref } from 'vue'
import useAuth from '@/store/useAuth'
import useParkings from '@/store/useParkings'
import ParkingApiService from '@/parkings/services/parkingApi.service'

export default {
  name: 'your-garages-page',
  components: {
    VBaseLayout,
    PvDataTable,
    PvColumn,
    PvDivider
  },
  setup() {
    const loading = ref(false)

    const authStore = useAuth()
    const parkingStore = useParkings()
    const parkingService = new ParkingApiService()

    if (!parkingStore.yourParkings.length) {
      loading.value = true

      parkingService
        .getParkingByUserId(authStore.user.id)
        .then((data) => (parkingStore.yourParkings = data))
        .finally(() => (loading.value = false))
    }

    return {
      parkingStore,
      loading
    }
  }
}
</script>

<template>
  <v-base-layout>
    <section class="main-section">
      <div class="section-header">
        <h2 class="section-title">Your garages</h2>
        <p class="section-subtitle">Here you can see all your garages and manage them.</p>
      </div>
      <pv-divider />
      <template v-if="loading">
        <div class="loading-container">
          <div>
            <i class="pi pi-spin pi-spinner loading-icon"></i>
          </div>
          <p class="loading-complement">Loading parking, please wait a few seconds</p>
        </div>
      </template>
      <template v-else-if="!loading && parkingStore.yourParkings.length">
        <pv-data-table :value="parkingStore.yourParkings">
          <pv-column field="address" header="Address"></pv-column>
          <pv-column field="price" header="Pricing">
            <template #body="{ data }"> S/ {{ data.price.toFixed(2) }} </template>
          </pv-column>
          <pv-column field="latitude" header="Latitude"></pv-column>
          <pv-column field="longitude" header="Longitude"></pv-column>
        </pv-data-table>
      </template>
      <template v-else>
        <p>
          It seems you don't have any garages yet. Please create a parking in
          <router-link to="/register-park">rent parking</router-link>
        </p>
      </template>
    </section>
  </v-base-layout>
</template>

<style>
.main-section {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.section-title {
  font-size: 48px;
  font-family: 'Rubik', sans-serif;
  color: #3c4e67;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-block: 0 12px;
}
.section-subtitle {
  font-size: 16px;
  margin-block: 0;
}
.section-header + .p-divider {
  margin-bottom: 24px;
}

@media screen and (max-width: 1080px) {
  .section-title {
    font-size: 32px;
    margin-bottom: 8px;
  }
  .section-subtitle {
    font-size: 14px;
  }
}
</style>
