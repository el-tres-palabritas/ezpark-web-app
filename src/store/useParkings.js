import { defineStore } from 'pinia'

const useParkings = defineStore('parkings', {
  state: () => ({
    locations: []
  })
})

export default useParkings
