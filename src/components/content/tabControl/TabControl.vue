<template>
  <div class="tab_control">
    <div v-for="(item,index) in titles" :key="item" class="tab_control_item" :class="{active:index === currentIndex}"
      @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick (index) {
      this.currentIndex = index;
      this.$emit('tabClick', index);
    }
  },

}
</script>
<style lang='css' scoped>
.tab_control {
  display: flex;
  text-align: center;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.tab_control_item {
  flex: 1;
}
.tab_control_item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 2px solid var(--color-tint);
}
</style>