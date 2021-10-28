<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list></cart-list>

    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CartList from './childComps/CartList.vue';
import CartBottomBar from './childComps/CartBottomBar.vue';

// mapGetters 辅助函数：仅仅是将store中的getter 映射到局部计算属性
// 使用说明：第一步导入
import { mapGetters } from 'vuex';

export default {
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    // 第二步：使用对象展开运算符，将 getter 混入 computed 对象中
    // 两种写法
    // ...mapGetters([
    //   'cartLength', 'cartList'
    // ])
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  }
}
</script>
<style lang='css' scoped>
.nav-bar {
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0; */
  /* height: 100vh; */
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>