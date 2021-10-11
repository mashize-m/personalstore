<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.image" class="recommend_item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {

    };
  },

}
</script>
<style lang='css' scoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}
.recommend_item {
  flex: 1;
}
.recommend_item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>