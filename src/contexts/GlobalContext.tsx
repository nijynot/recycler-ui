import React, { useContext, useReducer } from 'react';

type State = {
  // tab
  tab: number;
  // tx hash for etherscan modal
  txHash: number;

  // modals
  isWalletModalOpen: boolean;
  isTransactionSentModalOpen: boolean;

  // amounts
  mintAmount: string;
  burnAmount: string;
};

const defaultState: State = {
  // tab
  tab: 0,
  // tx hash for etherscan modal
  txHash: 0,

  // modals
  isWalletModalOpen: false,
  isTransactionSentModalOpen: false,

  // amounts
  mintAmount: '',
  burnAmount: '',
};

type Action =
  | { type: 'tab', value: number }
  | { type: 'txHash', value: string }
  | { type: 'isWalletModalOpen', value: boolean }
  | { type: 'isTransactionSentModalOpen', value: boolean }
  | { type: 'mintAmount', value: string }
  | { type: 'burnAmount', value: string };

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
