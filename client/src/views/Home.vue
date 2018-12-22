<template>
  <div class="home text-center">
    <div class="jumbotron">
      <h1 class="display-3">Auth for Newbs</h1>
      <p class="lead">
        Learing Auth is fun!
      </p>
      <hr class="my-4">
      <p>
        CJ and Tony are a great team (most days...)
      </p>
      <p class="lead">
        <router-link 
          class="btn btn-primary btn-lg"
          :to="{ name: 'signup' }"
          role="button">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
};
</script>
