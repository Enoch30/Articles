<template>
  <v-card
    class="mx-auto"
    max-width="600"
  >
    <!-- <v-img
      class="white--text align-end"
      height="200px"
      src="https://wiwibloggs.com/wp-content/uploads/2014/05/bbc-logo-red.jpg"
    > -->
      <v-card-title>Currently viewing {{selected}} of 5 
           <v-spacer></v-spacer>
        <v-btn
            text
            color="red light"
            class="ma-2 white--text"
            >
            Next
            <v-icon right dark>mdi-arrow-right</v-icon>
        </v-btn>
        
      </v-card-title>

       <v-divider></v-divider>

    <v-card-subtitle class="pb-0">Up Next: </v-card-subtitle>
    <!--Move the header to v-card-subtitle-->

    <v-card-text class="text-primary">
      The da shfs ji afi aiaj ji
    </v-card-text>

  </v-card>
</template>


<script>

  export default {
    name: 'Article',
    props: ['data'],

    // components: {
    //   Article,
    // },

    data: () => ({
          icon: "mdi-rowing",
          //change icon
    }),
  }
</script>