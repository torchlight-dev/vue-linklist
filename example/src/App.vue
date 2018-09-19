<template lang="pug">
  #app
    h1 Welcome to vue-linklist
    input(type="range" min="50" max="300" v-model="width")
    input(type="range" min="30" max="100" v-model="height")
    input(type="range" min="10" max="100" v-model="margin")
    input(type="range" min="50" max="300" v-model="space")
    Linklist(:source="source" @updatedList="showList" width="800" height="400" :box="box")
    p {{ result }}
</template>

<script>
import Vue from 'vue';
import Linklist from 'vue-linklist';
// import Linklist from '../../src/';    // if you wanna develop

export default {
  name: 'app',
  components: {
    Linklist
  },
  data() {
    return {
      width: 100,
      height: 50,
      margin: 10,
      space: 80,
      source: [{
        category: 'students',
        elements: [{
          name: 'bob'
        }, {
          name: 'alice'
        }]
      }, {
        category: 'fruit',
        elements: [{
          name: 'apple'
        }, {
          name: 'banana'
        }]
      }, {
        category: 'animal',
        elements: [{
          name: 'dog'
        }, {
          name: 'cat'
        }]
      }],
      result: []
    };
  },
  computed: {
    box() {
      return {
        width: Number(this.width),
        height: Number(this.height),
        margin: Number(this.margin),
        space: Number(this.space)
      }
    }
  },
  methods: {
    showList(pairs) {
      this.result = pairs;
    }
  }
}
</script>