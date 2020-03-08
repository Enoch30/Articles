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
      <v-card-title style="color: dimgrey; font-size: 1rem">Currently reading article {{data.seen[data.seen.length-1]+1}}
           <v-spacer></v-spacer>
        <v-btn
            text
            color="red light"
          
            v-on:click="nextPost"
            v-if="data.notseen.length > 0"
            >
            Next
            <v-icon right small dark>mdi-arrow-right</v-icon>
        </v-btn>
        
      </v-card-title>

    <div class="">
         <v-img
            class="white--text align-end ma-4"
            height="200px"
            src="../assets/news.jpg"
         >
         </v-img>
        <!-- <a href="https://www.freepik.com/free-photos-vectors/business" class="pl-4" style="font-size: .8em; text-decoration: none; ">Business vector created by pikisuperstar - www.freepik.com</a> -->
         <v-divider></v-divider>
    </div>
       

    <template  v-if="data.notseen.length > 0">
        <v-card-subtitle class="font-weight-bold">{{data.notseen.length}} unseen posts left</v-card-subtitle>
    </template>
    <template  v-else>
        <v-card-text class="text-primary font-weight-bold pa-0 pl-4 pt-4 pb-1">
            <v-icon small>mdi-chevron-triple-up</v-icon>
            Rank posts
        </v-card-text>
        <template>
            <draggable v-model="rank" @end="onEnd">
                <transition-group>
                    <v-card outlined class="ma-3" v-for="article in data.articles" :key="article.title">
                        <v-list-item>
                            <div style="font-size: 0.9rem; color: dimgrey">
                                {{article.title}}
                            </div>
                        </v-list-item>
                    </v-card>
                </transition-group>
            </draggable>
        </template>
        <v-card-actions class="justify-center">
           <v-btn
                small
                text
                color="red dark dark"
                class="white--text center-block center text-xs-center"
                v-on:click="submitRank"
                >
                Submit
                <v-icon right small dark>mdi-send</v-icon>
            </v-btn>
        </v-card-actions>
    </template>
   
    <!--Move the header to v-card-subtitle-->
    
    
 <br>
  </v-card>
</template>


<script>

 import draggable from 'vuedraggable'

  export default {
    name: 'Article',
    props: ['data'],

    components: {
       draggable,
    },

    data: () => ({
        rank: null,
    }),

     methods: {
      nextPost: function () {
        this.$emit('changePost');
      },
      submitRank: function() {
       //temporary solution to show the rank is tracked
       var response = "The order is \n\n";

       this.data.articles.forEach((article)=>{
           response += article.title + "\n"
       })

       window.alert(response)

      },
      onEnd(evt) {
        this.$emit('changeOrder', evt);
      },
    },
  }
</script>