const mutations = {
  addCart(state, info) {
    const oldInfo = state.cartList.find(item => {
      return item.iid === info.iid;
    });
    if (oldInfo) {
      oldInfo.count += 1;
    } else {
      info.count = 1;
      state.cartList.push(info);
    }
  }
};

export default mutations;
