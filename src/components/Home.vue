<template>
  <v-container id="home-container">
  <v-spacer class="pt-5"></v-spacer>

  <!--loading-->
  <v-layout justify-center v-if="loading">
    <div  class="center-block mx-0 text-xs-center justify-center">
      Loading articles
      <v-progress-circular
        class="ml-2"
        :width="2"
        :size="25"
        color="red"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-layout>
 
  <v-row v-if="currentArticle">
    <v-col
      md="5"
      class="hidden-lg-and-up"
    >
      <Sidebar :data="{seen, notseen, articles}" v-on:changePost="nextPost" v-on:changeOrder="changeRank"/>
    </v-col>
    <v-col
      md="7"
    >
      <Article :data="{articleData: currentArticle, notseen}" v-on:changePost="nextPost"/>
    </v-col>
    <v-col
      md="5"
      class="hidden-md-and-down"
    >
      <Sidebar :data="{seen, notseen, articles}" v-on:changePost="nextPost" v-on:changeOrder="changeRank"/>
    </v-col>
  </v-row>

  <!--Couldnt retreive any article, empty database or couldn't connect-->
  <v-alert
      v-if="noArticle"
      :value="true"
      type="error"
    >
      There are no posts to show
    </v-alert>

  </v-container>
</template>
<script>
  import Article from './Article';
  import Sidebar from './Sidebar';

  export default {
    name: 'Home',

    components: {
      Article,
      Sidebar,
    },

     data: () => ({
      canRank: false,
      notseen: [],
      seen: [],
      currentArticle: null,
      articles:[],
      noArticle: false,
      loading: true,
    }),

    created:function(){
      //get all articles
      window.axios.get('http://localhost:3000/articles')
        .then((response) => {
            this.articles = response.data
            this.notseen = [...Array(this.articles.length).keys()]
            this.nextPost()
            this.loading = false //remove loading spinner
            if (window.Cypress) {
              window.articles = response.data
            }
        })
        .catch((error) => {
            console.log(error)
            this.noArticle = true
            this.loading = false
            window.alert("Could retrieve posts. Is server running?")
        });
    },

    methods: {
      nextPost: function () {
         //randomly select a post from the posts not seen previously
         var next = Math.floor(Math.random() * this.notseen.length)
         this.seen.push(this.notseen[next])
         //remove current post from not seen list
         this.notseen.splice(next, 1)
         //dont change the current title if currently ranking
         if(this.notseen.length >= 0){
           this.currentArticle = this.articles[this.seen[this.seen.length-1]]
         }
      },

      changeRank: function (evt) {
          //change the article's index.
          //index are used to track the ranks
          var temp =  this.articles[evt.oldIndex]
          this.articles.splice(evt.oldIndex, 1);
          this.articles.splice(evt.newIndex, 0, temp);
      }
    },

   
  }
</script>
