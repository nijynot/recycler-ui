import { BigNumber, constants, utils } from 'ethers';
import styled from 'styled-components';
import { useAccount } from 'wagmi';
import { getAddressList } from '../../../constants';

import { useGlobalContext } from '../../../contexts/GlobalContext';
import { useMutation } from '../../../hooks/useMutation';
import { useQuery } from '../../../hooks/useQuery';

const BlueButton = styled.button({
  background: '#0a70ff',
  border: 0,
  boxShadow: `
    rgba(0, 0, 0, 0.35) 0px -0.5px 0px 0px inset,
    rgba(255, 255, 255, 0.1) 0px 0.5px 0px 0px inset,
    rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset`,
  borderRadius: 4,
  fontSize: 14,
  fontWeight: 450,
  padding: '14px 16px',
  width: 328,

  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.3,
  }
});

const GreyButton = styled(BlueButton)({
  background: 'rgba(255, 255, 255, 0.1)',
  boxShadow: 'none',
  color: 'rgba(255, 255, 255, 0.5)',
  cursor: 'not-allowed',
});

const GreenButton = styled(BlueButton)({
  background: '#25a948',
});

type AllowanceQuery = {
  erc20: {
    allowance: BigNumber,
  },
};

const query = `query ($erc20: String!, $owner: String! $spender: String!, $connected: Boolean!) {
  erc20(address: $erc20) @include(if: $connected) {
    allowance(owner: $owner, spender: $spender)
  }
}`;

const mutationApprove = `mutation ($address: String!, $spender: String!, $amount: BigNumber!) {
  tx: approve(address: $address, spender: $spender, amount: $amount) {
    hash
  }
}`;

const mutationDeposit = `mutation ($amount: BigNumber!) {
  tx: deposit(amount: $amount) {
    hash
  }
}`;

export default function Button() {
  const { state, dispatch } = useGlobalContext();

  const openWalletModal = () => {
    dispatch({ type: 'isWalletModalOpen', value: true });
  };
  
  const openTranasctionSentModel = (data: any) => {
    dispatch({ type: 'depositAmount', value: '' });
    dispatch({ type: 'isTransactionSentModalOpen', value: true });
    dispatch({ type: 'txHash', value: data?.tx?.hash });
  };

  const [{ data: account }] = useAccount({ fetchEns: false });
  const { data, refetch } = useQuery<AllowanceQuery>(query, {
    erc20: getAddressList().TokeVotePool,
    owner: account?.address ? account?.address : '',
    spender: getAddressList().RecyclerManager,
    connected: (account?.address) ? true : false,
  }, { watch: true });
  const [approve, { loading }] = useMutation(mutationApprove, {
    address: getAddressList().TokeVotePool,
    spender: getAddressList().RecyclerManager,
    amount: constants.MaxUint256,
  }, { wait: true, final: refetch });
  const [deposit] = useMutation(mutationDeposit, {
    amount: state.depositAmount ? utils.parseUnits(state.depositAmount, 18) : '',
  }, { after: openTranasctionSentModel, final: refetch });

  let render: JSX.Element = <BlueButton>-</BlueButton>;

  if (loading) {
    render = <GreyButton>Waiting for confirmation...</GreyButton>;
  } else if (!account) {
    render = <BlueButton onClick={() => openWalletModal()}>Sign in with ETH</BlueButton>;
  } else if (state.tab === 0) {
    if (!state.depositAmount) {
      render = <GreyButton>Enter an amount</GreyButton>;
    } else if (data?.erc20?.allowance.lt(utils.parseUnits(state.depositAmount, 18))) {
      render = <BlueButton onClick={() => approve()} disabled={!state.depositAmount}>Approve</BlueButton>;
    } else {
      render = <GreenButton onClick={() => deposit()} disabled={!state.depositAmount}>Deposit</GreenButton>;
    }
  } else if (state.tab === 1) {
    if (!state.withdrawAmount) {
      render = <GreyButton>Enter an amount</GreyButton>;
    } else if (!data?.erc20?.allowance.eq(constants.MaxUint256)) {
      render = <BlueButton disabled={!state.withdrawAmount}>Approve</BlueButton>;
    } else {
      render = <GreenButton onClick={() => {}} disabled={!state.withdrawAmount}>Withdraw</GreenButton>;
    }
  } else {
    render = <BlueButton>-</BlueButton>;
  }

  return (
    <>
      {render}
    </>
  );
}
