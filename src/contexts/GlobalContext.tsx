import React, { useContext, useReducer } from 'react';

type State = {
  // tab
  tab: number;

  // modals
  isWalletModalOpen: boolean;

  // amounts
  depositAmount: string;
  withdrawAmount: string;
};

const defaultState: State = {
  // tab
  tab: 0,

  // modals
  isWalletModalOpen: false,

  // amounts
  depositAmount: '',
  withdrawAmount: '',
};

type Action =
  | { type: 'tab', value: number }
  | { type: 'isWalletModalOpen', value: boolean }
  | { type: 'depositAmount', value: string }
  | { type: 'withdrawAmount', value: string };

const defaultDispatch: React.Dispatch<Action> = () => {
  return defaultState;
}

export const GlobalContext = React.createContext({
  state: defaultState,
  dispatch: defaultDispatch,
});

export const useGlobalContext = () => useContext(GlobalContext);

function reducer(state: State, action: Action): State {
  const { type, value } = action;

  if (type) {
    return { ...state, [type]: value };
  } else {
    return state;
  }
}

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, defaultState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
};
