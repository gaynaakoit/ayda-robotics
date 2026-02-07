  export class BoundingBoxDto {
    x!: number;
    y!: number;
    width!: number;
    height!: number;
  }
  
  export class FaceDto {
    personId!: string;
    confidence!: number;
    timestamp!: string; 
    image?: string;   
    box!: BoundingBoxDto;
  }
  
  export class FaceDetectedDto {
    faces!: FaceDto[];
  }
  
  // src/events/dto/event.dto.ts
  export class EventDto {
    id!: string;
    timestamp!: string;
    type!: string;            // ex: FACE_DETECTED, OBJECT_PICKED
    source!: 'UNITY' | 'AI' | 'SYSTEM';    // ex: AI, Unity
    //position?: { x: number; y: number; z: number };
    //action?: string;
    payload?: FaceDetectedDto;
    snapshot?: string;
    audit?: { hash: string; meta?: string };
  }

  // src/actions/dto/action.dto.ts
  export class ActionDto {
    id!: string;
    type!: string;           // ex: MOVE, PICK_OBJECT
    target?: any;            // position ou objet cible
    timestamp!: string;
  }

  // src/logs/dto/log.dto.ts
  export class LogDto {
    id!: string;
    timestamp!: string;
    message!: string;
  }

  export interface LogEntry {
    id: string;
    timestamp: string;
    message: string;
  }