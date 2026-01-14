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
  