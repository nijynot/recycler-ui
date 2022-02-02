import { graphql } from 'graphql';
import { useState } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { useProvider, useBlockNumber } from 'wagmi';

import schema from '../schema/Schema';

type Result<T> = {
  data: T;
  loading: boolean;
  refetch: Function;
};

type Options = {
  watch?: boolean,
};

export function useQuery<T>(source: string, args?: any, opts?: Options): Result<T> {
  const provider = useProvider();
  const [{ data: blockNumber }] = useBlockNumber({ skip: true, watch: opts?.watch });

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T>();

  const fetch = async () => {
    try {
      setLoading(true);
      const result = await graphql({
        schema,
        source,
        variableValues: args,
        contextValue: {
          provider: provider,
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
  };

  useDeepCompareEffect(() => {
    (async () => {
      fetch();
    })();
  }, [source, args, blockNumber]); // `provider cannot be included`

  return { data: data as T, loading, refetch: fetch };
}
