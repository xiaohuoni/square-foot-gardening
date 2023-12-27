export interface IMessage {
  role: 'system' | 'user' | 'assistant' | 'instructions';
  name?: 'system' | 'user' | 'assistant' | 'instructions';
  content: string;
}

export interface IChatGPTResponse {
  error?: {
    type: string;
    code: string;
    message: string;
  };
  created: number;
  choices: {
    index: number;
    message: IMessage;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  // TODO: error
}
export interface IChatGPTStreamChunk {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    delta: {
      role?: IMessage['role'];
      content?: string;
    };
    index: number;
    finish_reason: null | 'stop';
  }[];
}

export interface ICharacter {
  title: string;
  description: string;
  bgColor: string;
  id: string;
  instruction: string;
}

export interface IHighlightText {
  highlighted?: boolean;
  text: string;
}

export interface IHint {
  type: 'title' | 'content';
  chatId: string;
  line: number;
  priority: number;
  highlightTitleTexts: IHighlightText[];
  highlightTexts: IHighlightText[];
}

export interface IChat {
  id: string;
  createdAt: number;
  title: string;
  messages: IMessage[];
  systemMessage: string;
  hint: IHint | null;
  character: ICharacter | null;
}

export type IChatIds = string[];

export type IChatsById = { [key: string]: IChat };
