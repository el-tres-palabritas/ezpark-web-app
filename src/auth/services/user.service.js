import axios from 'axios'

export class UserService {
  constructor() {
    this.http = axios.create({
      baseURL: 'http://localhost:3000/api/v1/users'
    })
  }

  async getUserById(id) {
    const response = await this.http.get(`/${id}`)

    return response.data
  }
}
