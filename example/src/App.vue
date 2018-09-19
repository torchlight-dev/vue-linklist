<template lang="pug">
  #app
    h1 Welcome to vue-linklist
    Linklist(:source="source" @updatedList="showList")

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
  methods: {
    showList(pairs) {
      this.result = pairs;
    }
  }
}
</script>