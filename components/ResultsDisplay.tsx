'use client';

import { DetectionResult, ImageDetectionResult, VideoDetectionResult } from '@/lib/api';
import Image from 'next/image';

interface ResultsDisplayProps {
  result: DetectionResult;
}

const getThreatLevelColor = (level: string) => {
  switch (level.toUpperCase()) {
    case 'CRITICAL':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'HIGH':
      return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'MEDIUM':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'LOW':
    case 'MINIMAL':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    default:
      return 'bg-green-100 text-green-800 border-green-300';
  }
};

const getThreatLevelIcon = (level: string) => {
  switch (level.toUpperCase()) {
    case 'CRITICAL':
    case 'HIGH':
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      );
    case 'MEDIUM':
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      );
    default:
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
  }
};

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  if (!result.success) {
    return (
      <div className="w-full bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <div className="flex items-center space-x-3">
          <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <h3 className="text-lg font-semibold text-red-800">Detection Failed</h3>
            <p className="text-red-600">{result.error || 'Unknown error occurred'}</p>
          </div>
        </div>
      </div>
    );
  }

  if (result.type === 'image') {
    return <ImageResults result={result as ImageDetectionResult} />;
  } else {
    return <VideoResults result={result as VideoDetectionResult} />;
  }
}

function ImageResults({ result }: { result: ImageDetectionResult }) {
  return (
    <div className="w-full space-y-6">
      {/* Threat Level Summary */}
      <div className={`rounded-xl p-6 border-2 ${getThreatLevelColor(result.overall_threat_level)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {getThreatLevelIcon(result.overall_threat_level)}
            <div>
              <h3 className="text-2xl font-bold">Threat Level: {result.overall_threat_level}</h3>
              <p className="text-sm opacity-80">
                {result.threat_count} threat{result.threat_count !== 1 ? 's' : ''} detected
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Annotated Image */}
      {result.annotated_image && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">Detection Visualization</h4>
          <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={result.annotated_image}
              alt="Annotated detection"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}

      {/* Threats List */}
      {result.threats && result.threats.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">
            Detected Threats ({result.threats.length})
          </h4>
          <div className="space-y-3">
            {result.threats.map((threat, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 capitalize">{threat.class}</p>
                    <p className="text-sm text-gray-500">
                      Position: [{threat.bbox.map(n => n.toFixed(0)).join(', ')}]
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                    {(threat.confidence * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function VideoResults({ result }: { result: VideoDetectionResult }) {
  return (
    <div className="w-full space-y-6">
      {/* Threat Level Summary */}
      <div className={`rounded-xl p-6 border-2 ${getThreatLevelColor(result.overall_threat_level)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {getThreatLevelIcon(result.overall_threat_level)}
            <div>
              <h3 className="text-2xl font-bold">Threat Level: {result.overall_threat_level}</h3>
              <p className="text-sm opacity-80">
                {result.total_threats} threat{result.total_threats !== 1 ? 's' : ''} detected across {result.total_detections} frame{result.total_detections !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Metadata */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h4 className="text-lg font-semibold mb-4 text-gray-800">Video Information</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Duration</p>
            <p className="text-xl font-bold text-gray-800">{result.video_metadata.duration_seconds.toFixed(1)}s</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">FPS</p>
            <p className="text-xl font-bold text-gray-800">{result.video_metadata.fps}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Resolution</p>
            <p className="text-xl font-bold text-gray-800">{result.video_metadata.resolution}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Detection Rate</p>
            <p className="text-xl font-bold text-gray-800">{result.summary.detection_rate.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {/* Frames with Threats */}
      {result.frames_with_threats && result.frames_with_threats.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">
            Frames with Threats ({result.frames_with_threats.length})
          </h4>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {result.frames_with_threats.map((frame, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-800">
                      Frame {frame.frame_number} (@ {frame.timestamp.toFixed(2)}s)
                    </p>
                    <p className="text-sm text-gray-500">
                      {frame.threat_count} threat{frame.threat_count !== 1 ? 's' : ''} detected
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getThreatLevelColor(frame.threat_level)}`}>
                    {frame.threat_level}
                  </span>
                </div>
                <div className="space-y-2">
                  {frame.threats.map((threat, tIndex) => (
                    <div key={tIndex} className="flex items-center justify-between text-sm bg-white p-2 rounded">
                      <span className="font-medium capitalize">{threat.class}</span>
                      <span className="text-gray-600">{(threat.confidence * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

