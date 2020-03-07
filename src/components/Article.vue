<template>
  <v-card
    class="mx-auto"
    max-width="600"
  >
    <v-img
      class="white--text align-end"
      height="150px"
      src="https://wiwibloggs.com/wp-content/uploads/2014/05/bbc-logo-red.jpg"
    >
    </v-img>
    <v-card-title style="background-color: #dd170a" class="pt-3 white--text">{{articleData.title}}</v-card-title>
    <!--Move style to global-->

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
               <!--Change the lazy src to be just color black-->
               <v-img
                    v-bind:src="section.model.url"
                    lazy-src="https://upload.wikimedia.org/wikipedia/commons/6/68/Solid_black.png" 
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

    methods: {
      nextPost: function () {
         this.$emit('changedPost');
      }
    },

  }
</script>