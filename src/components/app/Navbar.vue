<template>
  <nav class="navbar blue">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <span class="black-text">{{ date | date('datetime') }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            USER
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <a class="black-text">
                <i class="material-icons">account_circle</i>
              </a>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a @click.prevent="logout" href="#" class="black-text">
                <i class="material-icons">assignment_return</i>Signout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      interval: null,
      dropdown: null,
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true,
    })
  },
  beforeDestroy() {
    console.log('before destroy')
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/?message=logout')
    },
  },
}
</script>
