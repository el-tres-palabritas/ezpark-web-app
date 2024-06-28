import axios from 'axios'

export class AuthService {
  constructor() {
    this.http = axios.create({
      baseURL: 'https://ez-park-api20240627213353.azurewebsites.net/api/v1/users'
    })
  }

  async signIn(email, password) {
    const response = await this.http.post(`/login`, { email, password })

    return response.data
  }

  async signUp({ firstName, lastName, email, password, dni, phone }) {
    const response = await this.http.post('/', {
      email,
      password,
      firstName,
      lastName,
      dni,
      phone,
      dateOfBirth: '2024-06-28T04:57:09.137Z'
    })

    return response.data
  }
}
