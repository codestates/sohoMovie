// action types
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SET_QUANTITY = "SET_QUANTITY";
export const NOTIFY = "NOTIFY";
export const ENQUEUE_NOTIFICATION = "ENQUEUE_NOTIFICATION";
export const DEQUEUE_NOTIFICATION = "DEQUEUE_NOTIFICATION";

// actions creator functions
//* 장바구니 목록에 상품 추가(동일한 상품이 없다는 전제)
export const addToCart = (itemId) => {
  return {
    type: ADD_TO_CART,
    payload: {
      quantity: 1,
      itemId,
    },
  };
};
//* 장바구니 목록에서 삭제 버튼을 클릭한 상품을 삭제
export const removeFromCart = (itemId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: {
      //* 삭제할 아템 정보
      itemId,
    },
    //TODO
  };
};
//* 장바구니 목록에서 이미 같은 상품이 추가되어 있을 경우, payload의 정보되로 증가시킨다.
export const setQuantity = (itemId, quantity) => {
  return {
    //TODO
    type: SET_QUANTITY,
    payload: {
      itemId,
      quantity,
    },
  };
};

export const notify =
  (message, dismissTime = 5000) =>
  (dispatch) => {
    const uuid = Math.random();
    dispatch(enqueueNotification(message, dismissTime, uuid));
    setTimeout(() => {
      dispatch(dequeueNotification());
    }, dismissTime);
  };

export const enqueueNotification = (message, dismissTime, uuid) => {
  return {
    type: ENQUEUE_NOTIFICATION,
    payload: {
      message,
      dismissTime,
      uuid,
    },
  };
};

export const dequeueNotification = () => {
  return {
    type: DEQUEUE_NOTIFICATION,
  };
};
