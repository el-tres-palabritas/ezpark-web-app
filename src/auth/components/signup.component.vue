<script>
import PvInputText from 'primevue/inputtext'
import PvPassword from 'primevue/password'
import PvCheckbox from 'primevue/checkbox'
import PvButton from 'primevue/button'
import { reactive } from 'vue'
import useAuth from '@/store/useAuth'
import { useRouter } from 'vue-router'

import LogoIcon from '@/assets/svg/logo.svg?component'

export default {
  name: 'sign-up-component',
  components: {
    PvInputText,
    PvPassword,
    PvCheckbox,
    PvButton,
    LogoIcon
  },
  setup() {
    const router = useRouter()
    const authStore = useAuth()
    const formData = reactive({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      dni: '',
      newsCheck: false,
      privacyCheck: false
    })

    const verifyPassword = () => formData.password !== formData.confirmPassword

    const verifyEmptyFields = () => {
      return (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword ||
        !formData.phone ||
        !formData.dni
      )
    }

    const handleSubmit = async () => {
      if (verifyEmptyFields()) return

      if (verifyPassword()) return

      try {
        await authStore.signUp({
          dni: formData.dni,
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone
        })

        router.push('/find-your-park')
      } catch (err) {
        console.error(err)
      }
    }

    return { handleSubmit, formData }
  }
}
</script>

<template>
  <section class="form-container">
    <form class="form" @submit.prevent="handleSubmit">
      <div class="form-item">
        <div class="logo-container">
          <div class="logo">
            <logo-icon />
          </div>
        </div>
        <h1 class="form-title">Sign Up</h1>
      </div>

      <div class="form-item">
        <label class="form-label" for="fullname">First Name</label>
        <pv-input-text
          id="firstName"
          class="form-input"
          v-model="formData.firstName"
          aria-describedby="fullname-help"
        />
      </div>

      <div class="form-item">
        <label class="form-label" for="fullname">Last Name</label>
        <pv-input-text
          id="lastName"
          class="form-input"
          v-model="formData.lastName"
          aria-describedby="fullname-help"
        />
      </div>

      <div class="form-item">
        <label class="form-label" for="email">E-mail</label>
        <pv-input-text
          id="email"
          class="form-input"
          v-model="formData.email"
          aria-describedby="email-help"
        />
      </div>
      <div class="duo-container">
        <div class="form-item">
          <label class="form-label" for="phone">DNI</label>
          <pv-input-text
            class="form-input"
            v-model="formData.dni"
            :useGrouping="false"
            inputId="withoutgrouping"
          />
        </div>
        <div class="form-item">
          <label class="form-label" for="phone">Phone Number</label>
          <pv-input-text
            class="form-input"
            v-model="formData.phone"
            :useGrouping="false"
            inputId="withoutgrouping"
          />
        </div>
      </div>
      <div class="duo-container">
        <div class="form-item">
          <label class="form-label" for="password">Password</label>
          <pv-password
            class="form-input"
            v-model="formData.password"
            :feedback="false"
            toggleMask
          />
        </div>
        <div class="form-item">
          <label class="form-label" for="password">Confirm Password</label>
          <pv-password
            class="form-input"
            v-model="formData.confirmPassword"
            :feedback="false"
            toggleMask
          />
        </div>
      </div>
      <div class="form-item">
        <div class="conditions-container">
          <div class="condition-item">
            <pv-checkbox
              class="checkbox"
              v-model="formData.newsCheck"
              inputId="condition1"
              :binary="true"
            />
            <label for="condition1">I want to receive news from EzPark via email</label>
          </div>
          <div class="condition-item">
            <pv-checkbox
              class="checkbox"
              v-model="formData.privacyCheck"
              inputId="condition1"
              :binary="true"
            />
            <label for="condition2">I have read and agree with the Privacy Policy</label>
          </div>
        </div>
      </div>
      <div class="form-item">
        <pv-button id="submit" type="submit" class="form-btn" label="Sign Up" />
      </div>
      <p class="login-link">
        Already have an account? <router-link to="/login">Sign in</router-link>
      </p>
    </form>
  </section>
</template>

<style scoped>
a {
  text-decoration: none;
  color: #ef6c42;
}

.form {
  display: flex;
  align-items: center;
  background-color: white;
  flex-direction: column;
  font-family: 'Mulish', 'Inter var', sans-serif;

  padding: 20px;
  width: 500px;
  border-radius: 20px;
}

.form-title {
  font-family: 'Rubik', sans-serif;
  color: #212529;
  margin-block: 0.75rem 0;
  font-size: 1.75rem;

  font-weight: 700;
  line-height: 1.2;
}
.logo {
  width: 160px;
}

.form-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: inherit;

  margin-bottom: 20px;
  color: black;
  width: 80%;
}

.duo-container {
  display: flex;
  gap: 2em;
  flex-direction: row;
  font-family: inherit;

  width: 80%;
}

.form-label {
  width: 100%;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.form-input {
  width: 100%;
}

.form-input :deep(.p-inputtext),
.form-input.p-inputtext,
.form-select {
  width: 100%;
  background-color: #f7f7f7;
  color: #000;
}
.form-input :deep(.p-inputtext):focus,
.form-input.p-inputtext:focus {
  outline: 2px solid #ef6c42;
}
.form-select {
  outline-color: #ef6c42;
  outline-width: 2px;
}

.conditions-container {
  display: inherit;
  flex-wrap: wrap;

  width: 368px;
}

.condition-item {
  display: inherit;
  gap: 1em;
  font-size: smaller;

  margin-top: 5px;
}

.checkbox {
  color: red;
}

.form-btn {
  font-family: 'Rubik', sans-serif;
  color: #fff;
  background: #000;
  padding-block: 0.625rem;
  width: 100%;
  border: none;
  outline: none;
  box-shadow: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
