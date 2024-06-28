import axios from 'axios'

class ParkingApiService {
  /** @type {import('axios').AxiosInstance} */
  axiosInstance

  constructor() {
    const BASE_URL = 'https://ez-park-api20240627213353.azurewebsites.net/api/v1/parkings'

    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  async getParkings() {
    const response = await this.axiosInstance.get('/')
    return response.data
  }

  async getParkingsById(id) {
    const response = await this.axiosInstance.get(`/${id}`)
    return response.data
  }

  async getParkingByUserId(id) {
    const response = await this.axiosInstance.get(`/userid/${id}`)
    return response.data
  }

  async postParking(data) {
    const response = await this.axiosInstance.post('/', data)

    return response.data
  }
}

export default ParkingApiService
