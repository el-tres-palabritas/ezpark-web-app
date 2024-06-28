import axios from 'axios'

export class UserService {
  constructor() {
    this.http = axios.create({
      baseURL: 'https://ez-park-api20240627213353.azurewebsites.net/api/v1/users'
    })
  }

  async getUserById(id) {
    const response = await this.http.get(`/${id}`)

    return response.data
  }
}
