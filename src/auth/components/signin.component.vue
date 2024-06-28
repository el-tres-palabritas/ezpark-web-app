<script>
import PvInputText from 'primevue/inputtext'
import PvPassword from 'primevue/password'
import PvButton from 'primevue/button'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AuthService } from '../services/auth.service'
import useAuth from '@/store/useAuth'

export default {
  name: 'sign-in-component',
  components: {
    PvInputText,
    PvPassword,
    PvButton
  },
  setup() {
    const router = useRouter()
    const storeAuth = useAuth()

    const authService = new AuthService()
    const email = ref('')
    const password = ref('')
    const error = ref('')

    async function handleLogin() {
      try {
        await storeAuth.login(email.value, password.value)
        error.value = ''
        router.push('/find-your-park')
      } catch (err) {
        error.value = 'User not found. Please check your credentials.'
        console.error('Error logging in:', err)
      }
    }

    return { authService, email, password, error, handleLogin }
  }
}
</script>

<template>
  <section class="form-container">
    <form class="form" @submit.prevent="handleLogin()">
      <div class="form-item">
        <div class="logo-container">
          <img alt="Logo" class="logo" src="../../assets/logo.svg" />
        </div>
        <h1 class="form-title">Sign In</h1>
      </div>
      <div class="form-item">
        <label class="form-label" for="email">E-mail</label>
        <pv-input-text
          id="email"
          class="form-input"
          v-model="email"
          aria-describedby="email-help"
        />
      </div>
      <div class="form-item">
        <label class="form-label" for="password">Password</label>
        <pv-password
          id="password"
          class="form-input"
          v-model="password"
          :feedback="false"
          toggleMask
        />
      </div>
      <div v-if="error">{{ error }}</div>
      <div class="form-item">
        <pv-button class="form-btn" type="submit" id="submit" label="Login" />
      </div>
      <router-link class="forgot-password-link" to="/recovery">Forgot password?</router-link>
      <p class="signup-link">
        Don't have an account yet?
        <router-link to="/signup">Sign up</router-link>
      </p>
      <router-link to="/find-your-park"> Continue to the app </router-link>
    </form>
  </section>
</template>

<style scoped>
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

  width: 80%;
}

.form .form-item:not(:last-of-type) {
  margin-bottom: 20px;
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
.form-input.p-inputtext {
  width: 100%;
  background-color: #f7f7f7;
  color: #000;
}
.form-input :deep(.p-inputtext):focus,
.form-input.p-inputtext:focus {
  outline: 2px solid #ef6c42;
}

.forgot-password-link {
  font-family: 'Rubik', sans-serif;
  display: block;
  width: 80%;
  text-align: end;
  margin-top: 12px;
  color: inherit;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.4;
  text-decoration: none;
}
.forgot-password-link:hover {
  text-decoration: underline;
}

.signup-link {
  display: block;
  width: 80%;
  text-align: center;
  margin-block: 2.5rem 0.25rem;
}
.signup-link a {
  color: #ef6c42;
  text-decoration: none;
}
.signup-link a:hover {
  text-decoration: underline;
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
</style>
