<template>
  <div>
    <form @submit.prevent="submitHandler" class="card auth-card">
      <div class="card-content">
        <span class="card-title">User account</span>
        <div class="input-field">
          <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{
              invalid:
                ($v.email.$dirty && !$v.email.required) ||
                ($v.email.$dirty && !$v.email.email),
            }"
          />
          <label for="email">Email</label>
          <small
            class="helper-text invalid"
            v-if="$v.email.$dirty && !$v.email.required"
            >Field email mustn't be empty</small
          >
          <small
            class="helper-text invalid"
            v-if="$v.email.$dirty && !$v.email.email"
            >Enter the correct email</small
          >
        </div>
        <div class="input-field">
          <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{
              invalid:
                ($v.password.$dirty && !$v.password.required) ||
                ($v.password.$dirty && !$v.password.minLength),
            }"
          />
          <label for="password">Password</label>
          <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.required"
            >Enter password</small
          >
          <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.minLength"
            >Min. length - {{ $v.password.$params.minLength.min }}. Max. length
            - {{ $v.password.$params.maxLength.max }}. Now -
            {{ password.length }} characters.</small
          >
        </div>
      </div>
      <div class="card-action">
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            Login
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Don't have an account?
          <router-link to="/register">Register</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import messages from '@/utils/messages.js'
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6), maxLength: maxLength(40) },
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
      }
      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/home')
      } catch (error) {}
    },
  },
}
</script>
