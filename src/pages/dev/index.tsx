import { BigNumber, Contract, ContractInterface } from 'ethers';
import { useState } from 'react';
import styled from 'styled-components';
import { useAccount, useProvider } from 'wagmi';

import RecyclerABI from '../../constants/abis/Recycler.json';
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

  /**
   * read
   */
  
  const [{ data: account }] = useAccount();
  const provider = useProvider();
  const { data } = useVaultData();
  
  /**
   * write
   */

  const recycler = new Contract(getAddressList().Recycler, RecyclerABI as ContractInterface, provider);

  const vote = async () => {
    try {
      const signer = await account?.connector?.getSigner();

      if (signer) {
        const tx = await recycler.connect(signer).vote([
          getAddressList().Recycler,
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
          }}>{data && data?.vault.totalSupply.toString()}</div>
        </div>

        <div style={{
          background: '#222',
          border: '1px solid #303030',
          borderRadius: 8,
          fontFamily: 'iA Writer Mono',
          fontWeight: 500,
          padding: 8,
          marginBottom: 8,
          width: 300,
        }}>
          `vote()`
        </div>
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
      </div>
    </>
  )
}
