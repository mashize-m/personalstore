<template>
  <div id="detail">
    <!-- 1.导航 -->

    <detail-nav-bar class="detail-nav" @itemClick="itemClick" ref="nav"></detail-nav-bar>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="centerntScroll">
      <!-- <ul>
        <li v-for=" item in $store.state.cartList">{{item}}</li>
      </ul> -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>

    </scroll>

    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
import DetailShopInfo from './childComps/DetailShopInfo.vue';
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailParamInfo from './childComps/DetailParamInfo';
import DetailCommentInfo from './childComps/DetailCommentInfo';
import DetailBottomBar from './childComps/DetailBottomBar';

import Scroll from 'components/common/scroll/Scroll';
import GoodsList from 'components/content/goods/GoodsList'
// import BackTop from "components/content/backtop/BackTop"

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'
import { debounce } from 'common/utils';
import { itemListenerMixin, backTopMixin } from 'common/mixin';

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    // BackTop,

  },
  mixins: [itemListenerMixin, backTopMixin],
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      // isShowBackTop: false,

    };
  },
  created () {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    // console.log(this.iid);

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res);
      // 1.获取数据
      const data = res.result;

      // 2.获取轮播图数据
      this.topImages = data.itemInfo.topImages

      // 3.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 4.获取店铺信息
      this.shop = new Shop(data.shopInfo)

      // 5.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 6.获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 7.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      // this.$nextTick(() => {
      // 根据最新的数据，对应的DOM是已经被渲染出来了，
      // 但是图片仍然没有加载完，offsetTop不包含图片
      // offsetTop值不对的时候，都是因为图片的问题
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs);

      // })

    });

    // 3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })
  },
  mounted () {

  },
  destroyed () {
    this.$bus.$off('itemImageLoad', this.itemImgListener);
  },
  // 第一种方法：弹幕提示--通过这个方式也可以实现重新计算高度
  // updated () {
  //   this.$ref.scroll.refresh()
  // },
  // 第二种方法：通过防抖函数--参考之前home的内容
  // 第三种方法：通过监听detailInfo数据变化，当图片加载全部加载完后，发出emit请求
  methods: {
    // 图片加载后进行刷新
    imageLoad () {
      this.$refs.scroll.refresh()
      // console.log('--');

      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs);
    },
    itemClick (index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      // console.log(this.$refs.params);
    },
    centerntScroll (position) {
      // console.log(position);
      // 1. 获取Y值
      const positionY = -position.y;
      // 2.positionY 和 themeTopY 做对比
      const length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      // 普通方法
      // for (let i = 0; i < length; i++) {
      //   // console.log(i);
      //   if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
      //     // console.log(i);
      //     this.currentIndex = i;
      //     // console.log(this.currentIndex);
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // };

      // 3. 判断backtop是否显示
      // console.log(position);
      this.isShowBackTop = (-position.y) > 1000


    },
    // backClick () {
    //   // 获取scroll组件下的scrollTo方法
    //   this.$refs.scroll.scrollTo(0, 0, 500);
    // }
    addToCart () {
      // console.log('加入购物车');
      // 1.获取购物车需要展示的信息（图片，标题，描述，价格，数量）
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // console.log(product);

      // 2.将商品添加到购物车中
      // this.$store.cartList.push(product)  --> 不能直接添加
      // this.$store.commit('addCart', product)  --> 先提交到actions
      this.$store.dispatch('addCart', product)

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
  /* calc有bug 能把顶部的导航栏也滑动起来 */
  /* height: calc(100% - 45px - 32px); */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.detail-nav {
  position: relative;
  /* right: 0;
  left: 0;
  top: 0; */
  z-index: 9;
  background-color: #fff;
}
</style>