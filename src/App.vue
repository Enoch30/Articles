<template>
  <v-app>
    <v-app-bar
      app
      color="#191919"
      dark
    >
      <div class="d-flex align-center">
        <h3>
          Articles Feed
        </h3>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <Home/>
    </v-content>
  </v-app>
</template>

<script>
import Home from './components/Home';

export default {
  name: 'App',
  components: {
    Home,
  },
};
</script>
