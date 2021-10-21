<template>
  <div id="detail">
    <!-- 1.导航 -->
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
import DetailShopInfo from './childComps/DetailShopInfo.vue';

import Scroll from 'components/common/scroll/Scroll';

import { getDetail, Goods, Shop } from 'network/detail'


export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
  },
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
    };
  },
  created () {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    console.log(this.iid);

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 1. 获取顶部的轮播图
      console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo)
    });

  },

}
</script>
<style lang='css' scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  /* 所以需要对于父元素设置一个  视图高度 */
  height: 100vh;
}
.content {
  /* 100% 是相对于父元素的高度 */
  height: calc(100% - 44px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>