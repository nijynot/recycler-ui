import React, { useState } from 'react';
import styled from 'styled-components';

// import RecyclerABI from '../abi/Recycler.json';
import { useContract, useSigner } from 'wagmi';

const Label = styled.div({
  opacity: 0.75,
  marginBottom: 6,
});

const Input = styled.input({
  background: 'transparent',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 4,
  color: 'white',
  padding: 10,
  outline: 0,
  marginBottom: 6,
});

const Button = styled.button({
  background: 'transparent',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 4,
  color: 'white',
  display: 'block',
  padding: 10,
  outline: 0,
  marginBottom: 24,
});

export default function DevTools() {
  const [deadline, setDeadline] = useState('');

  // const [{ data: signer }] = useSigner();
  // const recycler = useContract({
  //   addressOrName: Recycler,
  //   contractInterface: RecyclerABI,
  //   signerOrProvider: signer,
  // });

  return (
    <div>
      <Label>...</Label>
      <Input />
      <Button>Call</Button>

      {/* <Label>Create next epoch</Label>
      <Input defaultValue={Math.floor(Date.now() / 1000)} onChange={(e) => setDeadline(e.target.value)} />
      <Button onClick={() => recycler.next(deadline)}>Call</Button> */}
    </div>
  );
}
