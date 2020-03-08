<template>
  <v-card
    class="mx-auto"
    max-width="600"
  >
      <v-card-title class="article-count">Currently reading Article {{data.seen[data.seen.length-1]+1}}
           <v-spacer></v-spacer>
        <v-btn
            text
            color="red light"
            id="next-post"
            v-on:click="nextPost"
            v-if="data.notseen.length > 0"
            >
            Next post
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
        <a href="https://www.freepik.com/free-photos-vectors/business" class="pl-4 reference">Business vector created by pikisuperstar - www.freepik.com</a>
         <v-divider></v-divider>
    </div>
       

    <template  v-if="data.notseen.length > 0">
        <v-card-subtitle class="font-weight-bold">{{data.notseen.length}} unseen posts left</v-card-subtitle>
    </template>
    <template  v-else>
        <v-card-text class="text-primary font-weight-bold pa-0 pl-4 pt-4 pb-1 rank-header">
            <v-icon small>mdi-chevron-triple-up</v-icon>
            Rank posts <span class="text--disabled font-weight-regular"> (drag to rearrange)</span>
        </v-card-text>
        <template>
            <draggable v-model="rank" @end="onEnd">
                <transition-group id="rank-list">
                    <v-card outlined class="ma-3 article-card" v-for="article in data.articles" :key="article.title">
                        <v-list-item>
                            <div class="article-title">
                                {{article.title}}
                            </div>
                        </v-list-item>
                    </v-card>
                </transition-group>
            </draggable>
        </template>
        <v-card-actions class="justify-center">
           <v-btn
                id="submit-btn"
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
        <br>
    </template>
  </v-card>
</template>


<script>

import draggable from 'vuedraggable'
import { uuid } from 'vue-uuid'; //uuid to store ranks. - normally handled in the backend.

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
        // tell parent to change post
        this.$emit('changePost');
      },
      submitRank: function() {

        // In a prod, uuid would be used throught (i.e. for the articles as well). and the rank would be store using article.id and index.
        let rank = {
            "id": uuid.v4(),
            //extract the title and rank from article list
            "data": this.data.articles.map((article, index) => {
                        return [ article.title, index];
                    })
        }
        
        // send rank to server. saved in 𝒔𝒆𝒓𝒗𝒆𝒓->𝒅𝒃.𝒋𝒔𝒐𝒏->𝒓𝒂𝒏𝒌
        window.axios.post('http://localhost:3000/rank', rank)
        .then(() => {
            window.alert("Your rank has been saved to 𝒔𝒆𝒓𝒗𝒆𝒓->𝒅𝒃.𝒋𝒔𝒐𝒏->𝒓𝒂𝒏𝒌.\n\nYour highest ranked was\n" + rank.data[0][0] + "\n\nThe program will now reload")
            location.reload();
        }).catch((error) => {
            console.log(error)
            window.alert("Could send rank. Is server running?")
        });

      },
      onEnd(evt) {
        //tell the parent to change the order of articles i.e. the rank  
        this.$emit('changeOrder', evt);
      },
    },
  }
</script>