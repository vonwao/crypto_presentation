# Crypto Fundamentals - Interactive Presentation

A visual, interactive presentation explaining the building blocks of blockchain technology.

## Features
- 🎯 Projector-optimized (1920x1080)
- ⚡ Auto-cycling animations
- 🎮 Keyboard navigation
- 📱 Responsive design
- 🚀 Zero-dependency deployment

## Usage
- **Space/Right Arrow**: Next slide
- **Left Arrow**: Previous slide  
- **Home**: First slide
- **End**: Last slide
- **Escape**: Back to intro

## Local Development
```bash
npm run dev
# Visit http://localhost:3000
```

## Deployment
- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop entire folder
- **GitHub Pages**: Push to repo with GitHub Pages enabled

## File Structure
```
crypto-presentation/
├── index.html              # Main entry point
├── styles/
│   ├── common.css          # Shared styles & variables
│   └── slides.css          # Slide-specific styles
├── js/
│   ├── utils.js            # Shared utilities
│   ├── animation-controller.js
│   ├── presentation.js     # Main presentation logic
│   └── slides/
│       ├── intro.js
│       ├── hash-demo.js
│       ├── digital-signatures.js
│       ├── merkle-trees.js
│       └── blockchain-integration.js
└── assets/                 # Any images/icons (optional)
```
