<template>
  <div id="home">
    <nav-bar class="home_nav">
      <div slot="center">个人网店</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab_control" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </div>
</template>

<script>

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from 'components/common/navbar/NavBar';
import TabControl from "components/content/tabControl/TabControl"
import GoodsList from "components/content/goods/GoodsList"

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
  },
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
    }

  }
}
</script>
<style lang='css' scoped>
#home {
  padding-top: 44px;

  /* height: 10000px; */
}
.home_nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
}
.tab_control {
  position: sticky;
  top: 43px;
  z-index: 98;
}
</style>