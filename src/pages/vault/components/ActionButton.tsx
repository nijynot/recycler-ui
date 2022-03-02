import { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';

import RecyclerVaultV1 from '../../../constants/abis/RecyclerVaultV1.json';
import ERC20 from '../../../constants/abis/ERC20.json';
import { useGlobalContext } from '../../../contexts/GlobalContext';
import { getAddressList } from '../../../constants';
import { VaultData } from '../../../hooks/useVaultData';
import { constants } from 'ethers';

const Button = styled.button({
  border: 0,
  boxShadow: `
    rgba(0, 0, 0, 0.35) 0px -0.5px 0px 0px inset,
    rgba(255, 255, 255, 0.1) 0px 0.5px 0px 0px inset,
    rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset`,
  borderRadius: 8,
  fontSize: 14,
  fontWeight: 450,
  padding: 17,
  marginBottom: 4,
  width: '100%',

  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.3,
  }
});

const BlueButton = styled(Button)({
  background: '#0a70ff',
});

const GreyButton = styled(Button)({
  background: 'rgba(255, 255, 255, 0.1)',
  boxShadow: 'none',
  color: 'rgba(255, 255, 255, 0.5)',
  cursor: 'not-allowed',
});

const GreenButton = styled(Button)({
  background: '#25a948',
});

// const RedButton = styled(Button)({
//   background: 'rgb(255, 59, 48)',
// });

type ActionButtonProps = {
  data?: VaultData;
};

export default function ActionButton({ data }: ActionButtonProps) {
  const { state, dispatch } = useGlobalContext();

  /**
   * read
   */

  const [{ data: account }] = useAccount({ fetchEns: false });
  const [{ data: allowance }, read] = useContractRead(
    {
      addressOrName: getAddressList().Toke,
      contractInterface: ERC20,
    },
    'allowance',
    {
      args: useMemo(() => (
        [account?.address, getAddressList().RecyclerProxy]
      ), [account?.address]),
      watch: true,
    },
  );

  /**
   * write
   */

  const [{ data: approveData, error: approveError }, approve] = useContractWrite(
    {
      addressOrName: getAddressList().Toke,
      contractInterface: ERC20,
    },
    'approve',
    {
      args: useMemo(() => ([getAddressList().RecyclerProxy, constants.MaxUint256]), []),
    },
  );
  const [{ data: depositData, error: depositError }, deposit] = useContractWrite(
    {
      addressOrName: getAddressList().RecyclerProxy,
      contractInterface: RecyclerVaultV1,
    },
    'deposit',
    {
      args: useMemo(() => (
        [state.parameters.mintbn, account?.address]
      ), [state.parameters.mintbn, account?.address]),
    },
  );
  const [{ data: requestData, error: requestError }, request] = useContractWrite(
    {
      addressOrName: getAddressList().RecyclerProxy,
      contractInterface: RecyclerVaultV1,
    },
    'request',
    {
      args: useMemo(() => (
        [state.parameters.requestbn, account?.address]
      ), [state.parameters.requestbn, account?.address]),
    },
  );
  const [{ data: withdrawData, error: withdrawError }, withdraw] = useContractWrite(
    {
      addressOrName: getAddressList().RecyclerProxy,
      contractInterface: RecyclerVaultV1,
    },
    'withdraw',
    {
      args: useMemo(() => (
        [state.parameters.withdrawbn, account?.address, account?.address]
      ), [state.parameters.withdrawbn, account?.address]),
    },
  );

  /**
   * wait
   */

  const [{
    data: approveWaitData,
    error: approveWaitError,
    loading: approveWaitLoading,
  }, wait] = useWaitForTransaction();

  /**
   * triggers
   */
  
  const openWalletModal = () => {
    dispatch({ type: 'modals.isWalletModalOpen', value: true });
  };

  const openTranasctionSentModel = useCallback((txHash: string, reset?: boolean) => {
    if (reset) {
      dispatch({ type: 'parameters.mint', value: '' });
      dispatch({ type: 'parameters.request', value: '' });
      dispatch({ type: 'parameters.withdraw', value: '' });
    }

    dispatch({ type: 'modals.isSuccessModalOpen', value: true });
    dispatch({ type: 'txHash', value: txHash });
  }, [dispatch]);

  const openErrorModal = useCallback((errorMsg: any) => {
    dispatch({ type: 'parameters.mint', value: '' });
    dispatch({ type: 'parameters.request', value: '' });
    dispatch({ type: 'parameters.withdraw', value: '' });
    dispatch({ type: 'modals.isErrorModalOpen', value: true });
    dispatch({ type: 'error', value: errorMsg });
  }, [dispatch]);

  /**
   * approve
   */

  useEffect(() => {
    if (approveData?.hash) {
      wait({ hash: approveData?.hash });
    }
  }, [approveData?.hash, wait]);

  useEffect(() => {
    if (approveWaitData) {
      read();
    }
  }, [approveWaitData, read]);

  useEffect(() => {
    if (approveError) {
      openErrorModal(String(JSON.stringify(approveError, null, 2)));
    }
  }, [approveError, openErrorModal]);

  useEffect(() => {
    if (approveWaitError) {
      openErrorModal(String(JSON.stringify(approveWaitError, null, 2)));
    }
  }, [approveWaitError, openErrorModal]);

  /**
   * deposit
   */

  useEffect(() => {
    if (depositData?.hash) {
      openTranasctionSentModel(depositData?.hash, true)
    }
  }, [depositData?.hash, openTranasctionSentModel]);

  useEffect(() => {
    if (depositError) {
      openErrorModal(String(JSON.stringify(depositError, null, 2)));
    }
  }, [depositError, openErrorModal]);

  /**
   * request effects
   */

  useEffect(() => {
    if (requestData?.hash) {
      openTranasctionSentModel(requestData?.hash, true)
    }
  }, [requestData?.hash, openTranasctionSentModel]);

  useEffect(() => {
    if (requestError) {
      openErrorModal(String(JSON.stringify(requestError, null, 2)));
    }
  }, [requestError, openErrorModal]);

  /**
   * withdraw
   */

  useEffect(() => {
    if (withdrawData?.hash) {
      openTranasctionSentModel(withdrawData?.hash, true)
    }
  }, [withdrawData?.hash, openTranasctionSentModel]);

  useEffect(() => {
    if (withdrawError) {
      openErrorModal(String(JSON.stringify(withdrawError, null, 2)));
    }
  }, [withdrawError, openErrorModal]);

  /**
   * UI
   */

  let button: JSX.Element = <GreyButton>-</GreyButton>;

  if (approveWaitLoading) {
    button = <GreyButton>Waiting for confirmation...</GreyButton>;
  } else if (!account) {
    button = <BlueButton onClick={() => openWalletModal()}>Connect Wallet</BlueButton>;;
  } else {
    if (state.tab === 0) {
      if (data && data?.vault.status) {
        button = <GreyButton>Cycle Rollover (Inactive)</GreyButton>;
      } else if (!state.parameters.mint) {
        button = <GreyButton>Enter an amount</GreyButton>;
      } else if (data && state.parameters.mintbn.gt(data?.account.balanceOfToke)) {
        button = <GreyButton>Insufficient TOKE balance</GreyButton>;
      } else if (data && (state.parameters.mintbn.eq(0))) {
        button = <GreyButton>Amount too low</GreyButton>;
      } else if (data && (state.parameters.mintbn.add(data?.vault.totalAssets)).gt(data?.vault.capacity)) {
        button = <GreyButton>Amount exceeds capacity</GreyButton>;
      } else if (allowance && state.parameters.mintbn.gt(allowance)) {
        button = <BlueButton onClick={() => approve()}>Approve TOKE</BlueButton>;
      } else {
        button = <GreenButton onClick={() => deposit()}>Deposit TOKE</GreenButton>;
      }
    }

    if (state.tab === 1) {
      if (!state.parameters.request) {
        button = <GreyButton>Enter an amount</GreyButton>;
      } else if (data && state.parameters.requestbn.gt(data?.account.maxRequest)) {
        button = <GreyButton>Request amount too high</GreyButton>;
      } else if (data && state.parameters.requestbn.eq(0)) {
        button = <GreyButton>Amount too low</GreyButton>;
      } else {
        button = <GreenButton onClick={() => request()}>Request Withdrawal</GreenButton>;
      }
    }

    if (state.tab === 2) {
      if (!state.parameters.withdraw) {
        button = <GreyButton>Enter an amount</GreyButton>;
      } else if (data && state.parameters.withdrawbn.gt(data?.account.maxWithdraw)) {
        button = <GreyButton>Withdraw amount too high</GreyButton>;
      } else if (state.parameters.withdrawbn.eq(0)) {
        button = <GreyButton>Amount too low</GreyButton>;
      } else {
        button = <GreenButton onClick={() => withdraw()}>Withdraw TOKE</GreenButton>;
      }
    }
  }

  return (
    <>
      {button}
    </>
  );
}
