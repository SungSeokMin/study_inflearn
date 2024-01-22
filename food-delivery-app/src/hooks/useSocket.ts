import { useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

import Config from 'react-native-config';

let socket: Socket | undefined;

type useSocketReturnType = [typeof socket, () => void];

const useSocket = (): useSocketReturnType => {
  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      socket = undefined;
    }
  }, []);

  if (!socket) {
    socket = io(Config.API_URL as string, {
      transports: ['websocket']
    });
  }

  return [socket, disconnect];
};

export default useSocket;
