import { ContractorsProps, GoodProps, ShopsProps } from "redux/reducer";

export const login = (isLogin: boolean) => {
  return {
    type: "LOGIN",
    payload: isLogin,
  };
};

export const saveGoods = (payload: GoodProps[]) => {
  return {
    type: "SAVE_GOODS",
    payload,
  };
};

export const saveContractors = (payload: ContractorsProps[]) => {
  return {
    type: "SAVE_CONTRACTORS",
    payload,
  };
};

export const saveShops = (payload: ShopsProps[]) => {
  return {
    type: "SAVE_SHOPS",
    payload,
  };
};
