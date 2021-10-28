// 导入封装的常量
import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";

export default {
  // mutations唯一的目的就是修改state中的状态
  // mutations中每个方法尽可能完成的事件 比较单一点
  // addCounter(state, payload) {
  //   payload.count++;
  // },
  // addCart(state, payload) {
  //   state.cartList.push(payload);
  // },
  // 使用常量，等效于上面
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
  }
};
