import { debounce } from "common/utils";
import BackTop from "components/content/backtop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    };
  },
  mounted() {
    // 1. 图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 300);
    // 2. 对监听的事件进行保存
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
    // 测试
    // console.log("混入内容添加成功");
  }
};

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    };
  },
  methods: {
    // 可以抽取整个函数，但不要抽取函数的部分代码，到时候会产生覆盖
    backClick() {
      // 获取scroll组件下的scrollTo方法
      this.$refs.scroll.scrollTo(0, 0, 500);
    }
  }
};
