<template>
  <div class="cart-list">
    <scroll ref="scroll">
      <!-- <li v-for="item in cartList">{{item}}</li> -->
      <cart-list-item v-for="(item, index) in cartList" :item-info="item" :key="index"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from 'components/common/scroll/Scroll.vue';
import CartListItem from './CartListItem.vue';

export default {
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated () {
    console.log('-----');
    this.$refs.scroll.refresh()
  },
}
</script>

<style lang="css" scoped>
.cart-list {
  /* position: relative; */
  height: calc(100vh - 44px - 49px - 44px);
}
.wrapper {
  /* height: 300px; */
  overflow: hidden;
  /* position: absolute;
  top: 44px;
  bottom: 0px;
  left: 0;
  right: 0; */
  height: 100%;
}
</style>