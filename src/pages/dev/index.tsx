import { BigNumber, Contract, ContractInterface } from 'ethers';
import { useState } from 'react';
import styled from 'styled-components';
import { useAccount, useProvider } from 'wagmi';

import RecyclerVaultV1 from '../../constants/abis/RecyclerVaultV2.json';
import { getAddressList } from '../../constants';
import { useVaultData } from '../../hooks/useVaultData';

const Button = styled.button({
  background: 'transparent',
  border: '1px solid rgba(255, 255, 255, 0.17)',
  borderRadius: 8,
  color: 'rgba(255, 255, 255, 0.75)',
  display: 'block',
  padding: 8,
  marginBottom: 8,
  width: 150,
});

const Title = styled.div({
  background: '#222',
  border: '1px solid #303030',
  borderRadius: 8,
  fontFamily: 'iA Writer Mono',
  fontWeight: 500,
  padding: 8,
  marginBottom: 8,
  width: 300,
});

const Input = styled.input({
  background: 'transparent',
  border: '1px solid rgba(255, 255, 255, 0.17)',
  borderRadius: 8,
  color: 'rgba(255, 255, 255, 0.88)',
  display: 'block',
  fontFamily: 'iA Writer Mono',
  padding: 8,
  marginBottom: 8,
  width: 300,
});

export default function Dev() {
  const [voteSessionKey, setVoteSessionKey] = useState('');
  const [nonce, setNonce] = useState('');
  const [chainId, setChainId] = useState('');
  const [totalVotes, setTotalVotes] = useState('');
  const [reactorKey, setReactorKey] = useState('');
  const [reactorVotes, setReactorVotes] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');
  const [giveAmount, setGiveAmount] = useState('');
  const [capacityAmount, setCapacityAmount] = useState('');
  // core
  const [coreTarget, setCoreTarget] = useState('');
  // compound vars
  const [compoundChainId, setCompoundChainId] = useState('');
  const [compoundCycle, setCompoundCycle] = useState('');
  const [compoundWallet, setCompoundWallet] = useState('');
  const [compoundAmount, setCompoundAmount] = useState('');
  const [compoundV, setCompoundV] = useState('');
  const [compoundR, setCompoundR] = useState('');
  const [compoundS, setCompoundS] = useState('');

  /**
   * read
   */
  
  const [{ data: account }] = useAccount();
  const provider = useProvider();
  const { data } = useVaultData();
  
  /**
   * write
   */

  const recycler = new Contract(getAddressList().RecyclerProxy, RecyclerVaultV1 as ContractInterface, provider);

  const initialize = async () => {
    try {
      const signer = await account?.connector?.getSigner();
      if (signer) {
        const tx = await recycler.connect(signer).initialize(
          '0x2e9d63788249371f1DFC918a52f8d799F4a38C94',
          '0x96F98Ed74639689C3A11daf38ef86E59F43417D3',
          '0x43094eD6D6d214e43C31C38dA91231D2296Ca511',
          '0x79dD22579112d8a5F7347c5ED7E609e60da713C5',
          '0xA86e412109f77c45a3BC1c5870b880492Fb86A14',
          BigNumber.from('1000000000000000000000'),
        );
        console.log(tx);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const migrate = async () => {
    try {
      const signer = await account?.connector?.getSigner();
      if (signer) {
        const tx = await recycler.connect(signer).migrate();
        console.log(tx);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const setCapacity = async () => {
    try {
      const signer = await account?.connector?.getSigner();
      if (signer) {
        const tx = await recycler.connect(signer).setCapacity(BigNumber.from(capacityAmount));
        console.log(tx);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const setDeadline = async () => {
    try {
      const signer = await account?.connector?.getSigner();
      if (signer) {
        const tx = await recycler.connect(signer).setDeadline(BigNumber.from(deadlineTime));
        console.log(tx);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const give = async () => {
    try {
      const signer = await account?.connector?.getSigner();
      if (signer) {
        const tx = await recycler.connect(signer).give(BigNumber.from(giveAmount));
        console.log(tx);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const vote = async () => {
    try {
      const signer = await account?.connector?.getSigner();
      if (signer) {
        const tx = await recycler.connect(signer).vote([
          getAddressList().RecyclerProxy,
          voteSessionKey,
          BigNumber.from(nonce),
          BigNumber.from(chainId),
          BigNumber.from(totalVotes),
          [
            [reactorKey, BigNumber.from(reactorVotes)],
          ],
        ]);

        console.log(tx);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const compound = async () => {
    try {
      const signer = await account?.connector?.getSigner();
      if (signer) {
        const tx = await recycler.connect(signer).compound(
          BigNumber.from(compoundChainId),
          BigNumber.from(compoundCycle),
          compoundWallet,
          BigNumber.from(compoundAmount),
          BigNumber.from(compoundV),
          compoundR,
          compoundS,
        );

        console.log(tx);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const core = async () => {
    try {
      const signer = await account?.connector?.getSigner();
      if (signer) {
        const tx = await recycler.connect(signer).core(
          coreTarget,
          [
            getAddressList().RecyclerProxy,
            voteSessionKey,
            BigNumber.from(nonce),
            BigNumber.from(chainId),
            BigNumber.from(totalVotes),
            [
              [reactorKey, BigNumber.from(reactorVotes)],
            ],
          ]
        );

        console.log(tx);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div style={{}}>
        <div style={{ marginBottom: 32 }}>
          <div style={{
            opacity: 0.5,
            fontWeight: 450,
            marginBottom: 4,
            fontSize: 16,
          }}>Vault Balance</div>
          <div style={{
            fontFamily: 'iA Writer Mono',
            fontSize: 16,
          }}>{data && data?.vault.totalAssets.toString()}</div>
        </div>
      </div>

      <Title>`setCapacity(uint256 capacity)`</Title>
      <Input
        value={capacityAmount}
        onChange={e => setCapacityAmount(e.target.value)}
        placeholder="capacity"
      />
      <Button onClick={() => setCapacity()}>Set Capacity</Button>

      <br />
      <br />

      <Title>`setDeadline(uint256 deadline)`</Title>
      <Input
        value={deadlineTime}
        onChange={e => setDeadlineTime(e.target.value)}
        placeholder="deadline"
      />
      <Button onClick={() => setDeadline()}>Set Deadline</Button>

      <br />
      <br />

      <Title>`give(uint256 assets)`</Title>
      <Input
        value={giveAmount}
        onChange={e => setGiveAmount(e.target.value)}
        placeholder="give"
      />
      <Button onClick={() => give()}>Give Approve</Button>

      <br />
      <br />

      <Title>`vote()`</Title>
      <Input
        value={voteSessionKey}
        onChange={e => setVoteSessionKey(e.target.value)}
        placeholder="voteSessionKey"
      />
      <Input
        value={nonce}
        onChange={e => setNonce(e.target.value)}
        placeholder="nonce"
      />
      <Input
        value={chainId}
        onChange={e => setChainId(e.target.value)}
        placeholder="chainId"
      />
      <Input
        value={totalVotes}
        onChange={e => setTotalVotes(e.target.value)}
        placeholder="totalVotes"
      />
      <Input
        value={reactorKey}
        onChange={e => setReactorKey(e.target.value)}
        placeholder="allocations[0].reactorKey"
      />
      <Input
        value={reactorVotes}
        onChange={e => setReactorVotes(e.target.value)}
        placeholder="allocations[0].amount"
      />
      <Button onClick={() => vote()}>Vote on Reactor</Button>

      <br />
      <br />

      <Title>`initialize(...)`</Title>
      <Button onClick={() => initialize()}>Initialize</Button>

      <br />
      <br />

      <Title>`migrate()`</Title>
      <Button onClick={() => migrate()}>Migrate</Button>

      <br />
      <br />

      <Title>`compound(uint256 chainId, uint256 cycle, address wallet, uint256 amount, uin8 v, bytes32 r, bytes32 s)`</Title>
      <Input
        value={compoundChainId}
        onChange={e => setCompoundChainId(e.target.value)}
        placeholder="chainId"
      />
      <Input
        value={compoundCycle}
        onChange={e => setCompoundCycle(e.target.value)}
        placeholder="cycle"
      />
      <Input
        value={compoundWallet}
        onChange={e => setCompoundWallet(e.target.value)}
        placeholder="wallet"
      />
      <Input
        value={compoundAmount}
        onChange={e => setCompoundAmount(e.target.value)}
        placeholder="amount"
      />
      <Input
        value={compoundV}
        onChange={e => setCompoundV(e.target.value)}
        placeholder="v"
      />
      <Input
        value={compoundR}
        onChange={e => setCompoundR(e.target.value)}
        placeholder="r"
      />
      <Input
        value={compoundS}
        onChange={e => setCompoundS(e.target.value)}
        placeholder="s"
      />
      <Button onClick={() => compound()}>Compound Vault</Button>

      <br />
      <br />

      <Title>`core()`</Title>
      <Input
        value={coreTarget}
        onChange={e => setCoreTarget(e.target.value)}
        placeholder="target"
      />
      <Input
        value={voteSessionKey}
        onChange={e => setVoteSessionKey(e.target.value)}
        placeholder="voteSessionKey"
      />
      <Input
        value={nonce}
        onChange={e => setNonce(e.target.value)}
        placeholder="nonce"
      />
      <Input
        value={chainId}
        onChange={e => setChainId(e.target.value)}
        placeholder="chainId"
      />
      <Input
        value={totalVotes}
        onChange={e => setTotalVotes(e.target.value)}
        placeholder="totalVotes"
      />
      <Input
        value={reactorKey}
        onChange={e => setReactorKey(e.target.value)}
        placeholder="allocations[0].reactorKey"
      />
      <Input
        value={reactorVotes}
        onChange={e => setReactorVotes(e.target.value)}
        placeholder="allocations[0].amount"
      />
      <Button onClick={() => core()}>Vote on Reactor</Button>
    </>
  )
}
