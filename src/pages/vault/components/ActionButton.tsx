import { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';

import RecyclerABI from '../../../constants/abis/Recycler.json';
import RecyclerManagerABI from '../../../constants/abis/RecyclerManager.json';
import TokeVotePoolABI from '../../../constants/abis/TokeVotePool.json';
import { useGlobalContext } from '../../../contexts/GlobalContext';
import { getAddressList } from '../../../constants';
import { VaultData } from '../../../hooks/useVaultData';
import { constants, ContractInterface } from 'ethers';

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
      addressOrName: getAddressList().TokeVotePool,
      contractInterface: TokeVotePoolABI,
    },
    'allowance',
    {
      args: useMemo(() => (
        [account?.address, getAddressList().RecyclerManager]
      ), [account?.address]),
      watch: true,
    },
  );

  /**
   * write
   */

  const [{ data: approveData, error: approveError }, approve] = useContractWrite(
    {
      addressOrName: getAddressList().TokeVotePool,
      contractInterface: TokeVotePoolABI,
    },
    'approve',
    {
      args: useMemo(() => ([getAddressList().RecyclerManager, constants.MaxUint256]), []),
    },
  );
  const [{ data: mintData, error: mintError }, mint] = useContractWrite(
    {
      addressOrName: getAddressList().RecyclerManager,
      contractInterface: RecyclerManagerABI,
    },
    'mint',
    {
      args: useMemo(() => (
        [account?.address, state.parameters.mintbn]
      ), [account?.address, state.parameters.mintbn]),
    },
  );
  const [{ data: burnData, error: burnError }, burn] = useContractWrite(
    {
      addressOrName: getAddressList().Recycler,
      contractInterface: RecyclerABI as ContractInterface,
    },
    'burn',
    {
      args: useMemo(() => (
        [account?.address, account?.address, state.parameters.burnbn]
      ), [account?.address, state.parameters.burnbn]),
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
      dispatch({ type: 'parameters.burn', value: '' });
    }

    dispatch({ type: 'modals.isSuccessModalOpen', value: true });
    dispatch({ type: 'txHash', value: txHash });
  }, [dispatch]);

  const openErrorModal = useCallback((errorMsg: any) => {
    dispatch({ type: 'parameters.mint', value: '' });
    dispatch({ type: 'parameters.burn', value: '' });
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
   * mint
   */

  useEffect(() => {
    if (mintData?.hash) {
      openTranasctionSentModel(mintData?.hash, true)
    }
  }, [mintData?.hash, openTranasctionSentModel]);

  useEffect(() => {
    if (mintError) {
      openErrorModal(String(JSON.stringify(mintError, null, 2)));
    }
  }, [mintError, openErrorModal]);

  /**
   * burn
   */

  useEffect(() => {
    if (burnData?.hash) {
      openTranasctionSentModel(burnData?.hash, true)
    }
  }, [burnData?.hash, openTranasctionSentModel]);

  useEffect(() => {
    if (burnError) {
      openErrorModal(String(JSON.stringify(burnError, null, 2)));
    }
  }, [burnError, openErrorModal]);

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
      if (data && data?.vault.rotating) {
        button = <GreyButton>Cycle Rollover (Inactive)</GreyButton>;
      } else if (!state.parameters.mint) {
        button = <GreyButton>Enter an amount</GreyButton>;
      } else if (data && state.parameters.mintbn.gt(data?.account.balanceOftTOKE)) {
        button = <GreyButton>Insufficient tTOKE balance</GreyButton>;
      } else if (data && data?.account.queuedOftTOKE.gt(0) && !data?.account.epoch.eq(data?.vault.cursor)) {
        button = <GreyButton>You already have queued tTOKE</GreyButton>;
      } else if (data && (state.parameters.mintbn.eq(0) || state.parameters.mintbn.lt(data?.vault.dust))) {
        button = <GreyButton>Amount too low</GreyButton>;
      } else if (data && (state.parameters.mintbn.add(data?.vault.totalSupply)).gt(data?.vault.capacity)) {
        button = <GreyButton>Amount exceeds capacity</GreyButton>;
      } else if (allowance && state.parameters.mintbn.gt(allowance)) {
        button = <BlueButton onClick={() => approve()}>Approve tTOKE</BlueButton>;
      } else {
        button = <GreenButton onClick={() => mint()}>Deposit tTOKE</GreenButton>;
      }
    }

    if (state.tab === 1) {
      if (!state.parameters.burn) {
        button = <GreyButton>Enter an amount</GreyButton>;
      } else if (data?.account.balanceOfretTOKE && state.parameters.burnbn.gt(data?.account.balanceOfretTOKE)) {
        button = <GreyButton>Insufficient (re)tTOKE balance</GreyButton>;
      } else if (state.parameters.burnbn.eq(0)) {
        button = <GreyButton>Amount too low</GreyButton>;
      } else {
        button = <GreenButton onClick={() => burn()}>Withdraw tTOKE</GreenButton>;
      }
    }
  }

  return (
    <>
      {button}
    </>
  );
}
