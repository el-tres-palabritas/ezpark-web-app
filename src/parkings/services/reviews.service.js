import axios from 'axios'

class ReviewService {
  /** @type {import('axios').AxiosInstance} */
  axiosInstance

  constructor() {
    const BASE_URL = 'https://localhost:3000/api/v1/reviews'

    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  async getReviewsByParkingId(id) {
    const response = await this.axiosInstance.get(`/parkingid/${id}`)

    return response.data
  }

  async createReview({ rating, parkingId, userId, comment }) {
    const response = await this.axiosInstance.post('/', { rating, parkingId, userId, comment })

    return response.data
  }
}

export default ReviewService
