https://dansup.github.io/bulma-templates/templates/login.html

<template>
  <div class="section container has-text-centered">
    <div class="column is-4 is-offset-4">
      <h3 class="title">Login</h3>
      <p class="subtitle">Please login to proceed.</p>
      <div class="box">
        <form>
          <div class="field">
            <div class="control">
              <input class="input is-large" type="email" placeholder="Your Email" autofocus>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input class="input is-large" type="password" placeholder="Your Password" autofocus>
            </div>
          </div>
          <div class="field">
            <label class="checkbox">
              <input type="checkbox">
              Remember me
            </label>
          </div>
          <button class="button is-block is-info is-large is-fullwidth">Login</button>
        </form>
      </div>
      <p class="has-text-grey">
        <a href="../">Sign Up</a> &nbsp;·&nbsp;
        <a href="../">Forgot Password</a> &nbsp;·&nbsp;
        <a href="../">Need Help?</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  components: {},
  data() {
    return {};
  },
  computed: {},
};
</script>
<style scoped>
</style>
