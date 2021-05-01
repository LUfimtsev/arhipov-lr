interface ActionProps {
  type: string;
  payload: any;
}

export interface GoodProps {
  _id: string;
  name: string;
  unit: string;
  cost: number;
}

export interface ContractorsProps {
  _id: string;
  name: string;
}

export interface ShopsProps {
  _id: string;
  name: string;
}

export interface StateProps {
  isLoggedIn: boolean;
  goods: GoodProps[];
  contractors: ContractorsProps[];
  shops: ShopsProps[];
  data: null;
}

const initialState: StateProps = {
  isLoggedIn: false,
  goods: [],
  contractors: [],
  shops: [],
  data: null,
};

export const rootReducer = (
  state = initialState,
  action: ActionProps
): StateProps => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case "SAVE_GOODS":
      return {
        ...state,
        goods: action.payload,
      };
    case "SAVE_CONTRACTORS":
      return {
        ...state,
        contractors: action.payload,
      };
    case "SAVE_SHOPS":
      return {
        ...state,
        shops: action.payload,
      };
    default:
      return state;
  }
};
