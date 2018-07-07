export interface IWebsocketState {
  connected: boolean;
  authenticated: boolean;
}

export interface IAuthenticationResponse {
  success: boolean;
}

export interface IWebsocketException {
  status: string,
  message: string,
}
