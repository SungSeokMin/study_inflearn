import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatsGateway {
  @SubscribeMessage('new_user')
  handleMessage(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.emit('hello_user', `hello ${username}`);
  }
}
