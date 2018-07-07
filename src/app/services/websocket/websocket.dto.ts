import { WS_EVENT_AUTHENTICATION } from './websocket.constants';

export class DWebsocketAuthentication {
  event = WS_EVENT_AUTHENTICATION;
  token: string;

  constructor(token) {
    this.token = token;
  }
}
