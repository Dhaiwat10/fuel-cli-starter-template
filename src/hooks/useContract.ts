import { Contract, JsonAbi } from 'fuels';
import { useEffect, useState } from 'react';
import { useWallet } from './useWallet';

export const useContract = (
  contractId: string,
  abi: JsonAbi
): [Contract | undefined, boolean] => {
  const [wallet] = useWallet();
  const [contract, setContract] = useState<Contract>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (wallet) {
      const contract = new Contract(contractId, abi, wallet);
      setContract(contract);
      setLoading(false);
    }
  }, [wallet, abi, contractId]);

  return [contract, loading];
};
