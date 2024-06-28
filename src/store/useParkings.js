import ParkingApiService from '@/parkings/services/parkingApi.service'
import { defineStore } from 'pinia'

const parkingService = new ParkingApiService()

const useParkings = defineStore('parkings', {
  state: () => ({
    parkings: [],
    yourParkings: []
  }),
  actions: {
    async loadParkings() {
      this.parkings = await parkingService.getParkings()
    },
    async createParking(parking) {
      await parkingService.postParking(parking)
      this.parkings.push(parking)
      this.yourParkings.push(parking)
    }
  }
})

export default useParkings
