import { useState } from 'react';
import {
  useConnect,
  useConnectors,
  useDisconnect,
  useIsConnected,
} from '@fuel-wallet/react';

export const Connect = () => {
  const [connector, setConnector] = useState('');
  const { connectors } = useConnectors();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected } = useIsConnected();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: 10,
        maxWidth: 300,
      }}
    >
      <select
        onChange={(e) => {
          console.log(e.target.value);
          setConnector(e.target.value);
        }}
      >
        <option value=''>Select a connector</option>
        {connectors.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      <button disabled={!connector} onClick={() => connect(connector)}>
        Connect to {connector}
      </button>
      <button disabled={!connector} onClick={() => disconnect()}>
        Disconnect from {connector}
      </button>
      <p>{isConnected ? 'Connected' : ''}</p>
    </div>
  );
};
