<template lang="pug">
-
  const base = {
    x: 20,
    y: 20,
  };
  const text = {
    x: 20,
    y: 30
  };
  const baseTransform = `translate(${base.x}, ${base.y})`;
svg(width="640" height="480" xmlns="http://www.w3.org/2000/svg")
  g(transform=baseTransform)
    title linklist
    line(
      v-for="line in lines"
      stroke-linecap="null"
      stroke-linejoin="null"
      :x1="categoryX(line.start.categoryIndex) + box.width"
      :y1="elementY(line.start.nameIndex) + box.height / 2"
      :x2="categoryX(line.end.categoryIndex)"
      :y2="elementY(line.end.nameIndex) + box.height / 2"
      fill-opacity="null"
      stroke-opacity="null"
      stroke-width="10"
      stroke="rgb(119, 0, 255)"
      fill="none"
    )
    g(v-for="(category, categoryIndex) in source" :transform="categoryTransform(categoryIndex)")
      template(v-for="(element, index) in category.elements")
        g(:transform="elementTransform(index)")
          rect(:height="box.height" :width="box.width" x=0 y=0 stroke-width="1.5" stroke="#000" fill="#fff")
          text(
            x=text.x y=text.y
            xml:space="preserve"
            text-anchor="start"
            font-family="Helvetica, Arial, sans-serif"
            font-size="18"
            stroke-width="0"
            stroke="#000"
            fill="#000000"
          ) {{ element.name }}
          circle(
            v-if="categoryIndex !== source.length - 1"
            :cx="box.width" :cy="box.height / 2" r="10"
            @click="onStartClicked(category.category, element.name)"
            :class="{'active': active.category === category.category && active.name === element.name}"
          )
          circle(
            v-if="categoryIndex !== 0"
            :cx="0" :cy="box.height / 2" r="10"
            @click="onEndClicked(category.category, element.name)"
            :class="{'active': false}"
          )
</template>

<script>
export default {
  props: {
    source: Array
  },
  data() {
    return {
      active: {},
      pairs: []
    };
  },
  computed: {
    box() {
      return {
        width: 100,
        height: 50,
        margin: 10,
        space: 80
      };
    },
    lines() {
      return this.pairs.map(pair => {
        return {
          start: this.findElementIndex({
            category: pair.start.category,
            name: pair.start.name
          }),
          end: this.findElementIndex({
            category: pair.end.category,
            name: pair.end.name
          })
        };
      });
    }
  },
  methods: {
    findElementIndex({ category, name }) {
      const categoryIndex = this.source.findIndex(source => {
        return source.category === category;
      });
      const nameIndex = this.source[categoryIndex].elements.findIndex(element => {
        return element.name === name;
      });
      return { categoryIndex, nameIndex };
    },
    onStartClicked(category, name) {
      this.$set(this.active, 'category', category);
      this.$set(this.active, 'name', name);
    },
    onEndClicked(category, name) {
      if (!this.active.category || !this.active.name) return;

      // 隣同士でない線は結べない
      const startIndex = this.findElementIndex({
        category: this.active.category,
        name: this.active.name
      });
      const endIndex = this.findElementIndex({ category, name });
      if (endIndex.categoryIndex - startIndex.categoryIndex !== 1) return;

      // 結線データを格納
      this.pairs.push({
        start: {
          category: this.active.category,
          name: this.active.name
        },
        end: { category, name }
      });
      this.active = {};

      // 親に伝達
      this.$emit('updatedList', this.pairs);
    },
    categoryX(index) {
      const margin = this.box.width + this.box.space;
      return margin * index;
    },
    elementY(index) {
      const elementSize = this.box.height + this.box.margin;
      return elementSize * index;
    },
    elementTransform(index) {
      return `translate(0, ${this.elementY(index)})`;
    },
    categoryTransform(index) {
      return `translate(${this.categoryX(index)}, 0)`;
    }
  }
};
</script>

<style lang="scss" scoped>
circle {
  fill: #333;
  transition: all 0.4s cubic-bezier(.17,.67,.88,1.74);
  stroke: rgb(119, 0, 255);
  stroke-width: 1px;
}
.active {
  fill: white;
  stroke-width: 5px;
}
</style>