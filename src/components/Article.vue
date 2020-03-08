<template>
<v-lazy
    v-model="isActive"
    :options="{
        threshold: .5
    }"
    min-height="200"
    transition="fade-transition"
    >
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
    <v-card-title id="title" class="pt-3 white--text">{{data.articleData.title}}</v-card-title>

    <v-card-text class="text-primary">
      <div v-for="section in data.articleData.body" :key="section.title">
           <div v-if="section.type === 'heading'" class="pt-5">
              <h4>{{section.model.text}}</h4>
          </div>
          <div v-if="section.type === 'paragraph'" class="pt-5">
              {{section.model.text}}
          </div>
           <div v-if="section.type === 'image'" class="pt-5">
               <!--Ideally, the lazy src below would be a nice local image-->
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
                 <v-icon small v-text="icon" class="pr-2"></v-icon> {{item}}
              </p>
          </div>
      </div>
    </v-card-text>

    <v-card-actions class="right float-right">
      <v-btn
        color="red"
        text
        v-on:click="reloadPage"
      >
        Start over
      </v-btn>

      <v-btn
        color="red"
        text
        v-on:click="nextPost"
        v-if="data.notseen.length > 0"
      >
        Next post
         <v-icon right small dark>mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</v-lazy>
</template>


<script>

  export default {
    name: 'Article',
    props: ['data'],

    data: () => ({
          icon: "mdi-radius-outline",
          isActive: false
    }),

    methods: {
     
      nextPost: function () {
         // tell parent to change post
         this.$emit('changePost');
      },
      reloadPage: function (){
          location.reload();
      }
    },

  }
</script>