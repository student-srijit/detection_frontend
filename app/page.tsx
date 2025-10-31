'use client';

import { useState, useEffect } from 'react';
import FileUpload from '@/components/FileUpload';
import ResultsDisplay from '@/components/ResultsDisplay';
import { detectionAPI, DetectionResult } from '@/lib/api';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    // Check server status on mount and periodically
    const checkHealth = async () => {
      console.log('Checking server health...');
      const isHealthy = await detectionAPI.healthCheck();
      console.log('Server healthy:', isHealthy);
      setServerStatus(isHealthy ? 'online' : 'offline');
    };
    
    checkHealth();
    
    // Check every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const detectionResult = await detectionAPI.detectThreats(file);
      setResult(detectionResult);
    } catch (err: any) {
      setError(err.message || 'An error occurred during detection');
      console.error('Detection error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">MarEye</h1>
                <p className="text-sm text-gray-600">AI-Powered Marine Threat Detection</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                serverStatus === 'online' ? 'bg-green-100 text-green-800' :
                serverStatus === 'offline' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  serverStatus === 'online' ? 'bg-green-500 animate-pulse' :
                  serverStatus === 'offline' ? 'bg-red-500' :
                  'bg-gray-500 animate-pulse'
                }`}></div>
                <span className="text-xs font-medium">
                  {serverStatus === 'online' ? 'Server Online' :
                   serverStatus === 'offline' ? 'Server Offline' :
                   'Checking...'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        {!result && !error && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Detect Marine Threats in Seconds
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload your marine images or videos to detect potential threats using our advanced AI model.
              Supports mines, submarines, divers, AUVs, and more.
            </p>
          </div>
        )}

        {/* Upload Section */}
        {!result && (
          <div className="max-w-3xl mx-auto">
            <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} />
            
            {/* Features */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Detection</h3>
                <p className="text-sm text-gray-600">
                  Get results in seconds with our optimized AI model
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">High Accuracy</h3>
                <p className="text-sm text-gray-600">
                  Trained on specialized marine threat datasets
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Support</h3>
                <p className="text-sm text-gray-600">
                  Analyze both images and video files seamlessly
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-800 mb-1">Error</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Results Display */}
        {result && (
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <button
                onClick={handleReset}
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Upload New File</span>
              </button>
            </div>
            <ResultsDisplay result={result} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              Powered by YOLOv11 • Built with Next.js & Tailwind CSS
            </p>
            <p className="text-xs mt-2 text-gray-500">
              © 2025 MarEye Threat Detection System
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

