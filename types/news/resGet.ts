// Limited info
export interface OneNewsLInfo {
  id: number;
  img: string;
  title: string;
}
export interface ResGetNews {
  newsRes: OneNewsLInfo[];
}

// Full info
export interface OneNewsFInfo extends OneNewsLInfo {
  body: string;
}

export interface ResGetNewsFInfo {
  result: OneNewsFInfo[];
}
