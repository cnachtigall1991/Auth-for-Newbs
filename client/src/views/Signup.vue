<template>
  <section>
    <h1>Sign Up</h1>
    <div v-if="signingUp">
      <img src="../assets/pacman_loading.svg" alt="loading_svg" />
    </div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <form v-if="!signingUp" @submit.prevent="signup()">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          v-model="user.username"
          type="text"
          class="form-control"
          id="username"
          aria-describedby="usernameHelp"
          placeholder="Enter username" required>
        <small id="usernameHelp" class="form-text text-muted">
          Username can contain: 2-30 characters | ( a - z ) ( A - Z ) ( 0 - 9 ) ( _ - )
        </small>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="password">Password</label>
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            id="password"
            aria-describedby="passwordHelp"
            placeholder="Password" required>
          <small id="passwordHelp" class="form-text text-muted">
            Password must contain:
          </small>
          <small id="passwordHelp" class="form-text text-muted">
            8+ characters and at least 1 uppercase letter, 1 lowercase letter, 1 number
            and 1 special characters
          </small>
        </div>
        <div class="form-group col-md-6">
          <label for="confirmPassword">Confirm Password</label>
          <input
            v-model="user.confirmPassword"
            type="password"
            class="form-control"
            id="confirmPassword"
            aria-describedby="confirmPasswordHelp"
            placeholder="Confirm Password" required>
          <small id="passwordHelp" class="form-text text-muted">
            Please confirm your password
          </small>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Sign Up</button>
    </form>
  </section>
</template>

<script>
import Joi from 'joi';

const SIGNUP_URL = 'http://localhost:5000/auth/signup';

const schema = Joi.object().keys({
  username: Joi.string().regex(/^[a-zA-Z][a-zA-Z0-9-_]{2,30}$/).required(),
  password: Joi.string().regex(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/).required(),
  confirmPassword: Joi.string().regex(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/).required(),
});

export default {
  data: () => ({
    signingUp: false,
    errorMessage: '',
    user: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  }),
  watch: {
    user: {
      handler() {
        this.errorMessage = '';
      },
      deep: true,
    },
  },
  methods: {
    signup() {
      this.errorMessage = '';
      if (this.validUser()) {
        const body = {
          username: this.user.username,
          password: this.user.password,
        };
        this.signingUp = true;
        fetch(SIGNUP_URL, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(body),
        }).then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }).then((result) => {
          localStorage.token = result.token;
          setTimeout(() => {
            this.signingUp = false;
            this.$router.push('/dashboard');
          }, 1000);
        }).catch((error) => {
          setTimeout(() => {
            this.signingUp = false;
            this.errorMessage = error.message;
          }, 1000);
        });
      }
    },
    validUser() {
      if (this.user.password !== this.user.confirmPassword) {
        this.errorMessage = 'Passwords must match!';
        return false;
      }

      const result = Joi.validate(this.user, schema);
      if (result.error === null) {
        return true;
      }

      if (result.error.message.includes('username')) {
        this.errorMessage = 'Username is invalid.';
      } else {
        this.errorMessage = 'Password is invalid.';
      }

      return false;
    },
  },
};
</script>

<style>

</style>
