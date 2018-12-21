<template lang="pug">
  #app
    h1 Welcome to vue-linklist
    input(type="range" min="50" max="300" v-model="width")
    input(type="range" min="30" max="100" v-model="height")
    input(type="range" min="10" max="100" v-model="margin")
    input(type="range" min="50" max="300" v-model="space")
    br
    button(@click="setPresetPairs") update pairs
    Linklist(:source="source" ref="linklist" :defaultPairs="defaultPairs" @updatedList="showList" @updatedSource="showSource" width="800" height="400" :box="box")
      span.text(slot-scope="list") {{ list.element.name }}({{ list.categoryIndex }},{{ list.elementIndex }})
    p {{ result }}
</template>

<script>
import Linklist from 'vue-linklist';
// import Linklist from '../../src/';    // if you wanna develop

export default {
  name: 'app',
  components: {
    Linklist
  },
  data() {
    return {
      width: 150,
      height: 50,
      margin: 10,
      space: 80,
      source: [{
        category: 'students',
        elements: [{
          name: 'bob'
        }, {
          name: 'alice'
        }, {
          name: 'test'
        }, {
          name: 'tes'
        }, {
          name: 'te'
        }, {
          name: 't'
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
      result: [],
      defaultPairs: [{
        start: {
          category: 'students',
          name: 'bob'
        },
        end: {
          category: 'fruit',
          name: 'apple'
        }
      }]
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
    },
    showSource(source) {
      this.source = source;
    },
    setPresetPairs() {
      const pairs = [{
        start: {
          category: 'fruit',
          name: 'banana',
          categoryIndex: 1,
          nameIndex: 1
        },
        end: {
          category: 'animal',
          name: 'dog',
          categoryIndex: 2,
          nameIndex: 0
        }
      }];
      this.$refs.linklist.updatePairs(pairs)
    }
  }
}
</script>

<style lang="scss">
.text {
  position: relative;
  left: 20px;
  top: 15px;
}

svg {
  .circle {
    fill: #333;
    transition: all 0.4s cubic-bezier(.17,.67,.88,1.74);
    stroke: rgb(119, 0, 255);
    stroke-width: 1px;
  }
  circle.hover {
    fill: rgb(159, 100, 255);
    transition: none;
  }
  circle.active {
    fill: white;
    stroke: rgb(119, 0, 255);
    stroke-width: 5px;
  }
  line:hover {
    stroke: rgb(159, 100, 255);
  }
  foreignObject {
    user-select: none
  }
}
</style>