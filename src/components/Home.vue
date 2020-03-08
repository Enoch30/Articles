<template>
  <v-container style="max-width: 1100px">
    <!--Move style to stylesheet-->

  <v-spacer class="pt-5"></v-spacer>
  <div v-if="loading">
    Loading data
  </div>
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

  <v-alert
      v-if="noArticles"
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
      noArticles: false,
      loading: true,
    }),

    created:function(){
      window.axios.get('http://localhost:3000/articles')
        .then((response) => {
            this.articles = response.data
            this.notseen = [...Array(this.articles.length).keys()]
            this.nextPost()
            this.loading = false
        })
        .catch((error) => {
            console.log(error)
            this.noArticles = true
            this.loading = false
            window.alert("Could retrieve posts. Is server running?")
        });
    },

    methods: {
      nextPost: function () {
         var next = Math.floor(Math.random() * this.notseen.length)
         this.seen.push(this.notseen[next])
         this.notseen.splice(next, 1)
         //dont change the current title if currently ranking
         if(this.notseen.length >= 0){
           this.currentArticle = this.articles[this.seen[this.seen.length-1]]
         }
      },

      changeRank: function (evt) {
          var temp =  this.articles[evt.oldIndex]
          this.articles.splice(evt.oldIndex, 1);
          this.articles.splice(evt.newIndex, 0, temp);
      }
    },

   
  }
</script>
