// 导入封装的常量
import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // payload 新添加的商品
      // 第一种查询方式
      // let oldProduct = null;
      // for (let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item;
      //   }
      // }
      // 第二种查询方式
      let oldProduct = context.state.cartList.find(
        item => item.iid === payload.iid
      );
      // 判断oldProduct
      if (oldProduct) {
        // s数量+1
        // oldProduct.count += 1;
        context.commit(ADD_COUNTER, oldProduct);
        resolve("当前的商品数量+1");
      } else {
        // 添加新的商品
        payload.count = 1;
        // context.state.cartList.push(payload);
        context.commit(ADD_TO_CART, payload);
        resolve("添加了新的商品");
      }

      // console.log(state.cartList);
    });
  }
};
