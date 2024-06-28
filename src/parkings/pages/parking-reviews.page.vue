<script>
import VBaseLayout from '@/public/layout/base.layout.vue'
import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'
import PvDivider from 'primevue/divider'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ReviewService from '../services/reviews.service'
import { UserService } from '@/auth/services/user.service'

export default {
  name: 'parking-reviews-page',
  components: {
    VBaseLayout,
    PvDataTable,
    PvColumn,
    PvDivider
  },
  setup() {
    const reviewService = new ReviewService()
    const userService = new UserService()

    const route = useRoute()

    const parkingId = route.params.id

    const loading = ref(false)
    const reviews = ref([])

    reviewService
      .getReviewsByParkingId(parkingId)
      .then((data) => {
        reviews.value = data
        return Promise.all(reviews.value.map((review) => userService.getUserById(review.userId)))
      })
      .then((dataArr) => {
        reviews.value = reviews.value.map((review, index) => ({
          ...review,
          user: dataArr[index].fullName
        }))
      })
      .catch(console.error)
      .finally(() => (loading.value = false))

    return { loading, reviews }
  }
}
</script>

<template>
  <v-base-layout>
    <section class="main-section">
      <template v-if="loading">
        <div class="loading-container">
          <div>
            <i class="pi pi-spin pi-spinner loading-icon"></i>
          </div>
          <p class="loading-complement">Loading parking, please wait a few seconds</p>
        </div>
      </template>
      <template v-else>
        <header class="section-header">
          <h1 class="section-title">Reviews</h1>
          <p class="section-subtitle">
            Check the reviews of the parking lot and see what other users think about it.
          </p>
        </header>
        <pv-divider />
        <pv-data-table v-if="reviews.length" :value="reviews">
          <pv-column field="user" header="Name"></pv-column>
          <pv-column field="rating" header="Rating"></pv-column>
          <pv-column field="description" header="Comment"></pv-column>
        </pv-data-table>
        <template v-else>
          <p class="empty-message">There are no reviews for this parking lot yet.</p>
        </template>
      </template>
    </section>
  </v-base-layout>
</template>
