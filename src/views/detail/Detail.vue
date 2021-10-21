<template>
  <div id="detail">
    <!-- 1.导航 -->
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @image-load="imageLoad"></detail-goods-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
import DetailShopInfo from './childComps/DetailShopInfo.vue';
import DetailGoodsInfo from './childComps/DetailGoodsInfo';

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
    DetailGoodsInfo,
  },
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
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

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
    });
  },
  // 第一种方法：弹幕提示--通过这个方式也可以实现重新计算高度
  // updated () {
  //   this.$ref.scroll.refresh()
  // },
  // 第二种方法：通过防抖函数--参考之前home的内容
  // 第三种方法：通过监听detailInfo数据变化，当图片加载全部加载完后，发出emit请求
  methods: {
    imageLoad () {
      this.$ref.scroll.refresh()
    }
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