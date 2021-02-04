<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Registration</span>
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
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
          >Enter password</small
        >
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.minLength"
          >Min. length - {{ $v.password.$params.minLength.min }} characters. Now
          - {{ password.length }}</small
        >
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: $v.password.$dirty && !$v.password.required }"
        />
        <label for="name">Name</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >Enter your name</small
        >
      </div>
      <div class="input-field">
        <input
          id="tel"
          type="text"
          v-model.trim="tel"
          :class="{ invalid: $v.password.$dirty && !$v.password.required }"
        />
        <label for="name">Phone number</label>
        <small
          class="helper-text invalid"
          v-if="$v.tel.$dirty && !$v.tel.required"
          >Enter your phone number</small
        >
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>Accept the rules</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Login
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Already have an account?
        <router-link to="/">Login</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
      tel: '',
      agree: false,
    }
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6), maxLength: maxLength(40) },
    name: { required },
    tel: { required },
    agree: { checked: (v) => v },
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
        name: this.name,
        tel: this.tel,
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/home')
      } catch (error) {}
    },
  },
}
</script>

<style lang="scss" scoped></style>
