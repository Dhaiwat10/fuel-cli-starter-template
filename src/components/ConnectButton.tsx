import { useFuel } from '@/hooks/useFuel';
import { useIsConnected } from '@/hooks/useIsConnected';

export const ConnectButton = () => {
  const [isConnected] = useIsConnected();
  const [fuel, fuelError, fuelLoading] = useFuel();

  const onConnect = async () => {
    const connected = await fuel.connect();
    if (!connected) {
      alert('Failed to connect to Fuel Wallet');
    }
  };

  const onDisconnect = async () => {
    const disconnected = await fuel.disconnect();
    if (!disconnected) {
      alert('Failed to disconnect from Fuel Wallet');
    }
  };

  return (
    <>
      <button
        onClick={() => {
          if (isConnected) {
            onDisconnect();
          } else {
            onConnect();
          }
        }}
      >
        {fuelLoading
          ? 'Loading...'
          : fuelError
          ? 'Error'
          : isConnected
          ? 'Disconnect'
          : 'Connect'}
      </button>
    </>
  );
};
