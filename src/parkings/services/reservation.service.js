import axios from 'axios'

class ReservationService {
  /** @type {import('axios').AxiosInstance} */
  axiosInstance

  constructor() {
    const BASE_URL = 'https://localhost:3000/api/v1/reservations'

    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  async getReservations() {
    const response = await this.axiosInstance.get('/')

    return response.data
  }

  async getReservationsByUserId(id) {
    const response = await this.axiosInstance.get(`/userid/${id}`)

    return response.data
  }
}

export default ReservationService
