<script>
import VBaseLayout from '@/public/layout/base.layout.vue'
import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'
import PvDivider from 'primevue/divider'
import PvDialog from 'primevue/dialog'
import PvButton from 'primevue/button'
import PvTextarea from 'primevue/textarea'
import PvRating from 'primevue/rating'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ReviewService from '../services/reviews.service'
import { UserService } from '@/auth/services/user.service'
import useAuth from '@/store/useAuth'

export default {
  name: 'parking-reviews-page',
  components: {
    VBaseLayout,
    PvDataTable,
    PvColumn,
    PvDivider,
    PvDialog,
    PvTextarea,
    PvButton,
    PvRating
  },
  setup() {
    const reviewService = new ReviewService()
    const userService = new UserService()
    const authStore = useAuth()

    const route = useRoute()

    const parkingId = route.params.id

    const loadingFetch = ref(false)
    const reviews = ref([])

    const visibleDialog = ref(false)
    const comment = ref('')
    const rating = ref(5)
    const loading = ref(false)

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
      .finally(() => (loadingFetch.value = false))

    const handleAddComment = async () => {
      loading.value = true
      try {
        const review = await reviewService.createReview({
          userId: authStore.user.id,
          parkingId,
          rating: rating.value,
          comment: comment.value
        })
        review.user = authStore.user.fullName
        reviews.value = [...reviews.value, review]

        visibleDialog.value = false
      } catch (err) {
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    return { loadingFetch, reviews, visibleDialog, comment, rating, handleAddComment, loading }
  }
}
</script>

<template>
  <v-base-layout>
    <section class="main-section">
      <template v-if="loadingFetch">
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
          <p class="section-subtitle" style="margin-bottom: 12px">
            Check the reviews of the parking lot and see what other users think about it.
          </p>
          <pv-button label="Add a comment" @click="visibleDialog = true" />
          <pv-dialog :visible="visibleDialog" modal header="Add a new comment">
            <div class="form-field" style="margin-bottom: 12px">
              <label for="rating">Rating</label>
              <pv-rating v-model="rating" :stars="5" />
            </div>
            <div class="form-field">
              <label for="comment">Comment</label>
              <pv-textarea autocomplete="off" size="large" v-model="comment" rows="5" cols="30" />
            </div>
            <div class="dialog-buttons-container">
              <pv-button
                type="button"
                label="Cancel"
                severity="secondary"
                @click="visibleDialog = false"
              ></pv-button>
              <pv-button type="button" label="Save" @click="handleAddComment"></pv-button>
            </div>
          </pv-dialog>
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

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.dialog-buttons-container {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
}
</style>
