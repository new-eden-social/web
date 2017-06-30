import { ICharacterResponse } from '../character/character.interface';

export interface IPostResponse {
  id: string,
  title: string,
  content: string,
  previewUrl?: string,
  previewImage?: string,
  previewTitle?: string,
  previewDescription?: string,

  character?: ICharacterResponse,
}

export interface IPostState {
  all: IPostResponse[]
}
