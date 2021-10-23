<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class=" goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    };
  },
  props: {
    goodsItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    showImage () {
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods: {
    imageLoad () {
      // console.log('imageLoad')
      // this.$bus.$emit --> 事件总线（类似于Vuex的一个东西，他是监听事件的）
      this.$bus.$emit('itemImageLoad')
      // console.log(this.$bus);   ----> undifind
    },
    itemClick () {
      // console.log('跳转到详情页');
      // 动态路由的方式，在index.js文件中提前设置 :id
      this.$router.push("/detail/" + this.goodsItem.iid);
      // query 方式传递参数
      // this.$router.push({
      //   path:'/detail',
      //   query:{
      //     id:"1111"
      //   }
      // })
    }
  },

}
</script>
<style lang='css' scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  /* 超出部分文字隐藏 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>