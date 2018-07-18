import { WS_EVENT_AUTHENTICATION, WS_SUBSCRIBE_EVENTS } from './websocket.constants';

export class DWebsocketAuthentication {
  event = WS_EVENT_AUTHENTICATION;
  token: string;

  constructor(token) {
    this.token = token;
  }
}

export abstract class DWebsocketSubscribe {
  event: WS_SUBSCRIBE_EVENTS;
  key?: string;

  constructor(key?: string) {
    this.key = key;
  }
}

export class DWebsocketSubscribeToLatestWall extends DWebsocketSubscribe {
  event = WS_SUBSCRIBE_EVENTS.TO_LATEST_WALL;
}
