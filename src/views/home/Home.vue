<template>
  <div id="home">
    <nav-bar class="home_nav">
      <div slot="center">个人网店</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class=" tab_control"
      v-show="isTabFixed">
    </tab-control>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true"
      @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2">
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from 'components/common/navbar/NavBar';
import TabControl from "components/content/tabControl/TabControl"
import GoodsList from "components/content/goods/GoodsList"
import Scroll from "components/common/scroll/Scroll"
import BackTop from "components/content/backtop/BackTop"

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "@/common/utils";
import { itemListenerMixin, backTopMixin } from 'common/mixin';
export default {
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] },
      },
      currentType: 'pop',
      // isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,

    }
  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list;
    }
  },
  created () {
    // created 一般只写主要逻辑，所以具体的执行都封装到methods里面
    // 1.请求多个数据（轮播图和推荐）
    this.getHomeMultidata()

    // 2.请求商品goods数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted () {

    // 通过混入方式添加

    // 监听事件总线（item中图片加载完成）
    // this.$bus.$on('itemImageLoad', () => {
    //   console.log('------');
    //   this.$refs.scroll && this.$refs.scroll.refresh()
    // })
    // 1. 图片加载完成的事件监听
    // const refresh = debounce(this.$refs.scroll.refresh, 300)
    // 2. 对监听的事件进行保存
    // this.itemImgListener = () => {
    //   refresh()
    // }
    // 3.监听事件总线中的函数
    // this.$bus.$on('itemImageLoad', itemImgListener)

  },
  destroyed () {
    console.log('home销毁了');
  },
  activated () {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 1)
  },
  deactivated () {
    // 1.保存滚动Y值
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY);

    // 2.取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {

    // 网络请求相关方法
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // res 是局部变量，先进行保存数据
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    },
    // 事件监听相关方法
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // backClick () {
    //   // 获取scroll组件下的scrollTo方法
    //   this.$refs.scroll.scrollTo(0, 0, 500)
    // },
    contentScroll (position) {
      // 1. 判断backtop是否显示
      // console.log(position);
      this.isShowBackTop = (-position.y) > 1000

      // 2. 决定tabControl是否吸顶（position:fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore () {
      console.log('加载更多');
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.finishPullUp()
    },
    swiperImageLoad () {
      // 2. 获取tabControl 的 offsetTop
      // 所有的组件都有一个属性 $el：用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }
  }
}
</script>
<style lang='css' scoped>
#home {
  /* padding-top: 44px; */
  position: relative;
  /* vh 是视口高度 */
  height: 100vh;
}
.home_nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 浏览器原生滚动时，为了让导航不跟随一起滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99; */
}
.tab_control {
  position: relative;
  z-index: 9;
}
/* .fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
/* .tab_control {
  position: sticky;
  top: 43px;
  z-index: 98;
} */
.content {
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* 第一种方案 */
/* home 加上视口高度 */
/* .content { */
/* calc */
/* height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px; */
/* } */
</style>