import { graphql } from 'graphql';
import { useEffect, useState } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { useAccount, useProvider, useSigner, useWaitForTransaction } from 'wagmi';

import schema from '../schema/Schema';

type Result<T> = [Function, {
  data: T;
  loading: boolean;
}];

type Transaction = {
  tx: { hash: string; };
};

type Options = {
  wait?: boolean;
  after?: Function;
  final?: Function;
};

export function useMutation<T extends Transaction>(
  source: string,
  args: any,
  opts?: Options
): Result<T> {
  const provider = useProvider();
  const [{ data: account }] = useAccount();
  const [{ data: signer }] = useSigner();
  const [{ data: waited }, wait] = useWaitForTransaction();

  const [call, setCall] = useState(() => () => {});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>();

  useEffect(() => {
    console.log(waited);
    if (waited) {
      setLoading(false);
    }
  }, [waited]);
    
  useDeepCompareEffect(() => {
    if (!signer?.getAddress())
      return;

    (async () => {
      const mutation = async () => {
        try {
          const result = await graphql({
            schema,
            source,
            variableValues: args,
            contextValue: {
              account: account,
              provider: provider,
              signer: signer,
            },
          });
          setLoading(true);

          if (result.errors)
            throw result.errors;
          
          setData(result.data as unknown as T);

          if (opts?.after)
            opts?.after(result.data);

          if (opts?.wait) {
            const hash = (result.data as unknown as T).tx?.hash;
            const { data, error } = await wait({ hash });

            if (opts?.final)
              opts?.final(result.data);

            if (data || error)
              setLoading(false);
          } else {
            setLoading(false);
          }
        } catch (e) {
          console.error(e);
          setLoading(false);
        }
      };

      setCall(() => mutation);
    })();
  }, [source, args, account?.address, signer?.getAddress()]);

  return [call, { data: data as T, loading }];
}
