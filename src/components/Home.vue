<template>
  <v-container style="max-width: 1000px">
    <!--Move style to stylesheet-->

    <!-- <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify
        </h1>

        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br>please join our online
          <a
            href="https://community.vuetifyjs.com"
            target="_blank"
          >Discord Community</a>
        </p>
      </v-col>
    </v-row> -->
  <v-spacer class="pt-5"></v-spacer>
  
  <v-row>
    <v-col
      :cols="7"
    >
    <Article :articleData="article"/>
  </v-col>
  <v-col
      :cols="5"
    >
    <Sidebar/>
    </v-col>
  </v-row>

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
     article:
            {
            "id": 1,
            "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            "body": [
                {
                "type": "heading",
                "model": {
                    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                }
                },
                {
                "type": "paragraph",
                "model": {
                    "text": "Etiam ornare nulla in sem pharetra, vel varius magna tempus. Praesent pulvinar eget dolor vitae elementum. Donec id velit at sem gravida tristique non vitae lorem."
                }
                },
                {
                "type": "image",
                "model": {
                    "url": "https://picsum.photos/640/420/?random",
                    "altText": "Vestibulum pellentesque laoreet urna, eget dignissim lorem maximus vel",
                    "height": "420",
                    "width": "640"
                }
                },
                {
                "type": "paragraph",
                "model": {
                    "text": "Nulla tortor nunc, posuere eu purus eget, ultricies ullamcorper sapien. Duis viverra lectus eget dolor gravida rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce molestie, odio at mattis auctor, mauris lectus luctus risus, eget pulvinar tortor erat a est."
                }
                },
                {
                "type": "paragraph",
                "model": {
                    "text": "Mauris accumsan maximus enim, eleifend consectetur turpis molestie malesuada. Proin vulputate dui non mattis venenatis. Nam ornare sapien eget nibh placerat, faucibus dapibus lacus consectetur."
                }
                },
                {
                "type": "list",
                "model": {
                    "type": "unordered",
                    "items": [
                    "Vestibulum viverra viverra ullamcorper",
                    "Aenean ut felis hendrerit, scelerisque est sed, rhoncus sem"
                    ]
                }
                }
            ]
        },      
    }),
  }
</script>
