import { BigNumber, utils } from 'ethers';
import React, { useContext, useReducer } from 'react';

type State = {
  tab: number;
  txHash: number;
  error: any;

  modals: {
    isWalletModalOpen: boolean;
    isSuccessModalOpen: boolean;
    isErrorModalOpen: boolean;
  },
  parameters: {
    mint: string;
    request: string;
    withdraw: string;
    mintbn: BigNumber;
    requestbn: BigNumber;
    withdrawbn: BigNumber;
  },
  user?: {
    allowance?: BigNumber;
  },
};

const defaultState: State = {
  tab: 0,
  txHash: 0,
  error: '',

  modals: {
    isWalletModalOpen: false,
    isSuccessModalOpen: false,
    isErrorModalOpen: false,
  },
  parameters: {
    mint: '',
    request: '',
    withdraw: '',
    mintbn: BigNumber.from(0),
    requestbn: BigNumber.from(0),
    withdrawbn: BigNumber.from(0),
  },
};

type Action =
  | { type: 'tab', value: number }
  | { type: 'txHash', value: string }
  | { type: 'error', value: string }
  | { type: 'modals.isWalletModalOpen', value: boolean }
  | { type: 'modals.isSuccessModalOpen', value: boolean }
  | { type: 'modals.isErrorModalOpen', value: boolean }
  | { type: 'parameters.mint', value: string }
  | { type: 'parameters.request', value: string }
  | { type: 'parameters.withdraw', value: string }
  | { type: 'user.allowance', value: BigNumber };

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

  if (type === 'modals.isWalletModalOpen') {
    let next = { ...state };
    next.modals.isWalletModalOpen = value as boolean;

    return next;
  } else if (type === 'modals.isSuccessModalOpen') {
    let next = { ...state };
    next.modals.isSuccessModalOpen = value as boolean;

    return next;
  } else if (type === 'modals.isErrorModalOpen') {
    let next = { ...state };
    next.modals.isErrorModalOpen = value as boolean;

    return next;
  } else if (type === 'parameters.mint') {
    let next = { ...state };
    next.parameters.mint = value as string;
    next.parameters.mintbn = value ? utils.parseUnits(value as string, 18) : BigNumber.from(0);

    return next;
  } else if (type === 'parameters.request') {
    let next = { ...state };
    next.parameters.request = value as string;
    next.parameters.requestbn = value ? utils.parseUnits(value as string, 18) : BigNumber.from(0);

    return next;
  } else if (type === 'parameters.withdraw') {
    let next = { ...state };
    next.parameters.withdraw = value as string;
    next.parameters.withdrawbn = value ? utils.parseUnits(value as string, 18) : BigNumber.from(0);

    return next;
  } else if (type) {
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
