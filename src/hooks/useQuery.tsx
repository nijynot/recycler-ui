import { graphql } from 'graphql';
import { useState } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { useProvider } from 'wagmi';

import schema from '../schema/Schema';
import { useChainId } from './useChainId';

type Result<T> = {
  loading: boolean;
  data: T;
};

export function useQuery<T>(source: string, args?: any): Result<T> {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T>();
  const provider = useProvider();
  const chainId = useChainId();

  useDeepCompareEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await graphql({
          schema,
          source,
          variableValues: args,
          contextValue: {
            provider: provider,
            chainId: chainId,
          },
        });

        if (result.errors) {
          throw result.errors;
        }

        setData(result.data as unknown as T);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [source, args]); // `provider cannot be included`

  return { loading, data: data as T };
}
