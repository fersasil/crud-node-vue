<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand :to="'home'">CRUD</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="!userLoggedIn">
          <b-nav-item active-class="active"  :to="{name: 'login'}">Login</b-nav-item>
          <b-nav-item active-class="active" :to="{name: 'register'}">Register</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav v-if="userLoggedIn">
          <b-nav-item active-class="active"  :to="{name: 'allUsers'}">All Users</b-nav-item>
          <b-nav-item active-class="active" :to="{name: 'register'}">Test</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="userLoggedIn" right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="signOut" href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { EventBus as global} from '@/store/EventBus';


export default {
  computed: {
    userLoggedIn(){
      return global.userLoggedIn;
    }
  },
  methods: {
    signOut(){
      global.userLoggedIn = false;
      global.userInfo = [];
      this.$router.push({name: 'home'});
    }
  }
};
</script>

<style>
</style>