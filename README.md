# MarEye Threat Detection Frontend

A modern, responsive web application for detecting marine threats in images and videos using AI.

## Features

- 🎨 Beautiful, modern UI with Tailwind CSS
- 📤 Drag-and-drop file upload
- 🖼️ Image detection with visual annotations
- 🎥 Video analysis with frame-by-frame threat detection
- ⚡ Real-time results display
- 📊 Comprehensive threat level indicators
- 🌊 Marine-themed design

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Backend API**: https://detection-mereye.onrender.com

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
detection_frontend/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main detection page
│   └── globals.css      # Global styles
├── components/
│   ├── FileUpload.tsx   # File upload component
│   └── ResultsDisplay.tsx # Results display component
├── lib/
│   └── api.ts           # API client and types
├── public/              # Static assets
└── package.json
```

## API Integration

The frontend connects to the MarEye backend API at:
- **Production**: https://detection-mereye.onrender.com
- **Endpoints**: 
  - `/api/detect` - Upload and detect threats
  - `/health` - Check API status
  - `/api/model/info` - Get model information

## Deployment

### Deploy to Vercel

1. Push your code to GitHub

2. Import the repository in Vercel

3. Deploy with default settings

### Environment Variables

No environment variables are required. The API URL is hardcoded to the production backend.

## Usage

1. **Upload a file**: Drag and drop or click to browse for an image or video
2. **Wait for processing**: The AI model will analyze your file
3. **View results**: See detected threats with confidence scores and threat levels
4. **Upload another**: Click "Upload New File" to analyze another file

## Supported File Types

### Images
- JPG/JPEG
- PNG
- BMP
- TIFF
- WebP

### Videos
- MP4
- AVI
- MOV
- MKV
- WebM

## License

MIT

## Author

Built for MarEye Marine Threat Detection System

