import { REMOVE_FROM_CART, ADD_TO_CART, SET_QUANTITY } from "../actions/index";
import { initialState } from "./initialState";

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    //* 장바구니 목록에 상품 추가(동일한 상품이 없다는 전제)
    case ADD_TO_CART:
      //TODO : Object.assign(), ...state
      return Object.assign({}, state, {
        //* 새로 업데이트 할 내용 : cartItems에 액션의 payload
        cartItems: [...state.cartItems, action.payload],
      });

      break;
    //* 장바구니 목록에서 삭제 버튼을 클릭한 상품을 삭제
    case REMOVE_FROM_CART:
      //TODO : filter
      //* state 객체의 cartItems 프로퍼티의 value Array의 모든 요소를 순회하며,
      //* 액션 객체의 payload 값과 다른 요소로 구성된 배열(removeFilter)을 리턴한다.
      const removeFilter = state.cartItems.filter(
        (el) => el.itemId !== action.payload.itemId
      );
      return Object.assign({}, state, {
        cartItems: removeFilter,
      });

      break;
    //* 장바구니 목록에서 이미 같은 상품이 추가되어 있을 경우, 수량만 1 증가시킨다.
    case SET_QUANTITY:
      //* cartItems 프로퍼티의 value Array의 요소 중, 추가 상품과 동일한 상품의 인덱스
      let idx = state.cartItems.findIndex(
        (el) => el.itemId === action.payload.itemId
      );
      //* 상태 불변성 유지를 위해, 복제된 state 선언
      const copiedState = [...state.cartItems];
      //* copiedState에서 idx에 위치한 상품의 정보를 액션의 payload 값으로 대체 한다.
      copiedState[idx] = {
        itemId: action.payload.itemId,
        quantity: action.payload.quantity,
      };
      return Object.assign({}, state, {
        cartItems: copiedState,
      });

      break;
    default:
      return state;
  }
};

export default itemReducer;
