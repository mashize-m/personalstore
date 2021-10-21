<template>
  <!-- ref/children  组件课程讲过 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false,

    }
  },
  mounted () {
    // 1. 创建BScroll 对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // click 限制的是 除了button 之外其他的标签需要点击的，例如div啥的
      click: true,
      // probeType 属性，滚动监听的类型，3是实时监听滚动
      // 不直接写死成 3 的原因，是考虑后续组件应用场景，可能有的不需要实时监听，有的需要实时监听，所以搞成一个变量
      // probeType: 3,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    })

    // 2.监听滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        // console.log(positon);
        this.$emit('scroll', position)
      })
    }

    // 3. 监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载更多');
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    // 滚动到指定位置。time是执行的时长，time=300 是设置默认值
    scrollTo (x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp () {
      // 当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载
      this.scroll.finishPullUp()
    },
    refresh () {
      // 重新计算 better-scroll
      this.scroll && this.scroll.refresh()
    },
    getScrollY () {
      // 获取scroll 纵轴坐标
      return this.scroll ? this.scroll.y : 0
    }
  },


}
</script>
<style lang='css' scoped>
</style>