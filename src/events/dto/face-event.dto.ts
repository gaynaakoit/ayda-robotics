export class FaceEventDto {
    person_id!: string;      // "unknown" | "user_123"
    confidence!: number;     // 0.0 → 1.0
    timestamp!: string;      // ISO format
    image?: string;         // Base64 optional
  }
  