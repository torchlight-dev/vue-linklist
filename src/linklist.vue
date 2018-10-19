<template lang="pug">
-
  const base = {
    x: 20,
    y: 20,
  };
  const baseTransform = `translate(${base.x}, ${base.y})`;
svg(:width="width" :height="height" xmlns="http://www.w3.org/2000/svg" @mouseup="onDropped()" @mousemove="onDragging" @mouseleave="onMouseLeft()")
  g(transform=baseTransform)
    line(
      v-for="line in lines"
      :x1="categoryX(line.start.categoryIndex) + box.width"
      :y1="elementY(line.start.nameIndex) + box.height / 2"
      :x2="categoryX(line.end.categoryIndex)"
      :y2="elementY(line.end.nameIndex) + box.height / 2"
      stroke-width="10"
      stroke="rgb(119, 0, 255)"
      @click="onLineClicked(line)"
    )
    g(v-for="(category, categoryIndex) in source" :transform="categoryTransform(categoryIndex)")
      line(
        v-if="dragCategoryIndex === categoryIndex"
        :x1="-20"
        :y1="dragLineY"
        :x2="box.width + 20"
        :y2="dragLineY"
        stroke-width="2"
        stroke="rgb(100, 0, 255)"
      )
      template(v-for="(element, index) in category.elements")
        g(:transform="elementTransform(index)")
          g(@mousedown="onDragStarted(categoryIndex, index, $event)")
            rect(
              x=0
              y=0
              :height="box.height"
              :width="box.width"
              stroke-width="1.5"
              :stroke="dragCategoryIndex === categoryIndex && dragIndex === index ? 'rgb(100, 0, 255)' : '#000'"
              :fill="dragCategoryIndex === categoryIndex && dragIndex === index ? 'rgb(100, 0, 255)' : '#fff'"
            )
            foreignObject(:width="box.width" :height="box.height")
              slot(:element="element" :categoryIndex="categoryIndex" :elementIndex="index" xmlns="http://www.w3.org/1999/xhtml")
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
import { moveAt } from './utils';
export default {
  props: {
    source: {
      type: Array,
      required: true
    },
    width: {
      type: [Number, String],
      default: 640
    },
    height: {
      type: [Number, String],
      default: 480
    },
    box: {
      type: Object,
      default() {
        return {
          width: 100,
          height: 50,
          margin: 10,
          space: 80
        }
      }
    },
    defaultPairs: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      active: {},
      pairs: [],
      dragIndex: null,
      dragCategoryIndex: null,
      dragY: 0
    };
  },
  updated() {
    if (Array.isArray(this.defaultPairs) && this.pairs.length === 0) {
      this.pairs = this.defaultPairs;
    }
  },
  computed: {
    lines() {
      return this.pairs.map(pair => {
        return {
          start: Object.assign(pair.start, this.findElementIndex(pair.start)),
          end: Object.assign(pair.end, this.findElementIndex(pair.end))
        };
      });
    },
    dropIndex() {
      return Math.floor(this.dragY / (this.box.height + this.box.margin));
    },
    dragLineY() {
      return (this.box.height + this.box.margin) * this.dropIndex - this.box.margin / 2;
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
    hasConnected({ start, end }) {
      return !!this.pairs.find(pair => {
        return pair.start.category === start.category && pair.start.name === start.name &&
               pair.end.category === end.category && pair.end.name === end.name;
      });
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

      // 既に結線されてたらキャンセル
      if (this.hasConnected({
        start: this.active,
        end: { category, name }
      })) return;

      // 結線データを格納
      this.pairs.push({
        start: {
          category: this.active.category,
          name: this.active.name
        },
        end: { category, name }
      });
      this.active = {};
      this.noticeToParent();
    },
    onLineClicked(line) {
      this.removeLine(line);
    },
    onDragStarted(categoryIndex, index, e) {
      this.dragCategoryIndex = categoryIndex;
      this.dragIndex = index;
      this.dragY = e.layerY;
    },
    onDragging(e) {
      if (this.dragCategoryIndex === null) return;
      this.dragY = e.layerY;
    },
    onDropped() {
      if (this.dragCategoryIndex === null) return;
      this.source[this.dragCategoryIndex].elements = moveAt({
        array: this.source[this.dragCategoryIndex].elements,
        index: this.dragIndex,
        at: this.dropIndex - (this.dragIndex < this.dropIndex ? 1 : 0)
      });
      this.onMouseLeft();
    },
    onMouseLeft() {
      this.dragCategoryIndex = null;
      this.dragIndex = null;
    },
    removeLine(line) {
      this.pairs = this.pairs.filter(pair => {
        return pair.start.category !== line.start.category || pair.start.name !== line.start.name ||
               pair.end.category !== line.end.category || pair.end.name !== line.end.name;
      });
      this.noticeToParent();
    },
    noticeToParent() {
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
line:hover {
  stroke: rgb(159, 100, 255);
}
foreignObject {
  user-select: none
}
</style>
