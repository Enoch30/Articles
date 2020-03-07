<template>
  <v-card
    class="mx-auto"
    max-width="600"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://wiwibloggs.com/wp-content/uploads/2014/05/bbc-logo-red.jpg"
    >
      <v-card-title>{{articleData.title}}</v-card-title>
    </v-img>

    <!-- <v-card-subtitle class="pb-0">Number 10</v-card-subtitle> -->
    <!--Move the header to v-card-subtitle-->

    <v-card-text class="text-primary">
      <!-- <div>Whitehaven Beach</div>

      <div>Whitsunday Island, Whitsunday Islands</div> -->

      <div v-for="section in articleData.body" :key="section.id">
           <div v-if="section.type === 'heading'" class="pt-5">
              <h3>{{section.model.text}}</h3>
          </div>
          <div v-if="section.type === 'paragraph'" class="pt-5">
              {{section.model.text}}
          </div>
           <div v-if="section.type === 'image'" class="pt-5">
               <v-img
                    v-bind:src="section.model.url"
                    lazy-src="https://www.telegraph.co.uk/content/dam/women/2017/03/08/red_trans_NvBQzQNjv4BqVdTKv7s_pHOjygWVCEdXn_whuBm_mX9zX6zuvkZ-Nrw.JPG?imwidth=450"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    max-width="600"
                    max-height="300"
                    >
                    <template v-slot:placeholder>
                        <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                        >
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                    </template>
              </v-img>
          </div>
           <div v-if="section.type === 'list'" class="pt-5">
               <p  v-for="item in section.model.items" :key = item>
                 <v-icon small v-text="icon"></v-icon> {{item}}
              </p>
          </div>
      </div>
    </v-card-text>

    <v-card-actions class="right float-right">
      <v-btn
        color="red"
        text
      >
        Do something
      </v-btn>

      <v-btn
        color="red"
        text
      >
        Next post
      </v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>

  export default {
    name: 'Article',
    props: ['articleData'],

    // components: {
    //   Article,
    // },

    data: () => ({
          icon: "mdi-rowing",
          //change icon
    }),
  }
</script>