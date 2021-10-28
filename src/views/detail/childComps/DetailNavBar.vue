<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" class="title-item" :class="{active:index === currentIndex}"
          @click="itemClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue';

export default {
  components: {
    NavBar,
  },
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
    }
  },
  methods: {
    itemClick (index) {
      this.currentIndex = index;
      this.$emit('itemClick', index);
    },
    backClick () {
      // 返回
      this.$router.back()
      // this.$router.go(-1);
    }
  },
}
</script>

<style lang="css" scoped>
.back img {
  margin-top: 12px;
}
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
</style>