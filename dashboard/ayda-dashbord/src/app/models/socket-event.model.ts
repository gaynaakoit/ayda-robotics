export type EventType =
  | 'FACE_DETECTED'
  | 'ALERT'
  | 'INFO'
  | 'SYSTEM'
  | 'ACTION';

export type EventSource =
  | 'CAMERA'
  | 'AI'
  | 'USER'
  | 'SYSTEM';

export interface SocketEvent<T = any> {
  id: string;
  type: EventType;
  source: EventSource;
  timestamp: string; // ISO
  payload: T;
  acknowledged?: boolean;
}
