export type EventType =
  | 'FACE_DETECTED'
  | 'ALERT'
  | 'INFO'
  | 'SYSTEM'
  | 'ACTION'
  | 'NOTIFICATION'

export type EventSource =
  | 'CAMERA'
  | 'AI'
  | 'USER'
  | 'SYSTEM';

  export interface BoundingBox {
    x: number; // 0..1
    y: number; // 0..1
    width: number;
    height: number;
  }
  
  export interface FaceDetectedPayload {
    personId: string;
    confidence: number;
    box: BoundingBox;
  }

export interface NotificationPayload {
    message: string;
    time: Date;
}

export interface SocketEvent<T = any> { 
  id: string;
  type: EventType;
  source: EventSource;
  timestamp: string; // ISO
  payload: T; 
  acknowledged?: boolean;
}
