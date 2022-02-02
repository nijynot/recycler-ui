import { useEffect } from 'react';
import { useState } from 'react';
import { useProvider } from 'wagmi';

export const useChainId = () => {
  const provider = useProvider();
  const [chainId, setChainId] = useState<number>(0);

  useEffect(() => {
    (async () => {
      if (provider) {
        setChainId((await provider.getNetwork()).chainId);
      }
    })();
  }, [provider]);

  return chainId;
}
