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
  key?: string|number;

  constructor(key?: string|number) {
    this.key = key;
  }
}

export class DWebsocketSubscribeToLatestWall extends DWebsocketSubscribe {
  event = WS_SUBSCRIBE_EVENTS.TO_LATEST_WALL;
}

export class DWebsocketSubscribeToHashtagWall extends DWebsocketSubscribe {
  event = WS_SUBSCRIBE_EVENTS.TO_HASHTAG_WALL;
}

export class DWebsocketSubscribeToCharacterWall extends DWebsocketSubscribe {
  event = WS_SUBSCRIBE_EVENTS.TO_CHARACTER_WALL;
}

export class DWebsocketSubscribeToCorporationWall extends DWebsocketSubscribe {
  event = WS_SUBSCRIBE_EVENTS.TO_CORPORATION_WALL;
}

export class DWebsocketSubscribeToAllianceWall extends DWebsocketSubscribe {
  event = WS_SUBSCRIBE_EVENTS.TO_ALLIANCE_WALL;
}

export class DWebsocketSubscribeToPostComment extends DWebsocketSubscribe {
  event = WS_SUBSCRIBE_EVENTS.TO_POST_COMMENTS;
}
