import axios from 'axios';

const API_BASE_URL = 'https://detection-mereye.onrender.com';

export interface ThreatDetection {
  class: string;
  confidence: number;
  bbox: number[];
}

export interface ImageDetectionResult {
  success: boolean;
  type: 'image';
  filename: string;
  threat_count: number;
  overall_threat_level: string;
  threats: ThreatDetection[];
  annotated_image?: string;
  error?: string;
}

export interface VideoFrameResult {
  frame_number: number;
  timestamp: number;
  threats: ThreatDetection[];
  threat_count: number;
  threat_level: string;
}

export interface VideoDetectionResult {
  success: boolean;
  type: 'video';
  filename: string;
  total_detections: number;
  total_threats: number;
  overall_threat_level: string;
  frames_with_threats: VideoFrameResult[];
  video_metadata: {
    duration_seconds: number;
    fps: number;
    total_frames: number;
    processed_frames: number;
    frame_interval: number;
    resolution: string;
  };
  summary: {
    frames_analyzed: number;
    frames_with_detections: number;
    detection_rate: number;
  };
  error?: string;
}

export type DetectionResult = ImageDetectionResult | VideoDetectionResult;

export class DetectionAPI {
  private static instance: DetectionAPI;

  private constructor() {}

  static getInstance(): DetectionAPI {
    if (!DetectionAPI.instance) {
      DetectionAPI.instance = new DetectionAPI();
    }
    return DetectionAPI.instance;
  }

  async detectThreats(file: File): Promise<DetectionResult> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post<DetectionResult>(
        `${API_BASE_URL}/api/detect`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 120000, // 2 minutes timeout for video processing
        }
      );

      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.error || 'Detection failed');
      } else if (error.request) {
        throw new Error('No response from server. Please check your connection.');
      } else {
        throw new Error('Error uploading file: ' + error.message);
      }
    }
  }

  async getModelInfo(): Promise<any> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/model/info`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch model info:', error);
      return null;
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      return response.data.status === 'healthy';
    } catch (error) {
      return false;
    }
  }
}

export const detectionAPI = DetectionAPI.getInstance();

