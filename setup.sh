#!/bin/bash

# Create Crypto Presentation File Structure
echo "🚀 Creating Crypto Presentation file structure..."

# Create main directory
mkdir -p crypto-presentation
cd crypto-presentation

# Create subdirectories
mkdir -p styles
mkdir -p js/slides
mkdir -p assets

# Create main HTML file
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crypto Fundamentals - Interactive Presentation</title>
    <link rel="stylesheet" href="styles/common.css">
    <link rel="stylesheet" href="styles/slides.css">
</head>
<body>
    <div class="presentation-container">
        <!-- Slides will be loaded here -->
        <div id="slides-container"></div>
    </div>

    <!-- Navigation -->
    <div class="nav-indicator" id="navIndicator"></div>
    
    <div class="nav-controls">
        <span>Use ← → arrow keys or spacebar to navigate</span>
    </div>

    <!-- Load scripts -->
    <script src="js/utils.js"></script>
    <script src="js/animation-controller.js"></script>
    <script src="js/slides/intro.js"></script>
    <script src="js/slides/hash-demo.js"></script>
    <script src="js/slides/digital-signatures.js"></script>
    <script src="js/slides/merkle-trees.js"></script>
    <script src="js/slides/blockchain-integration.js"></script>
    <script src="js/presentation.js"></script>
</body>
</html>
EOF

# Create package.json for deployment
cat > package.json << 'EOF'
{
  "name": "crypto-presentation",
  "version": "1.0.0",
  "description": "Interactive Crypto Fundamentals Presentation",
  "main": "index.html",
  "scripts": {
    "dev": "python3 -m http.server 3000",
    "preview": "python3 -m http.server 8080",
    "build": "echo 'No build step needed - static files ready for deployment'"
  },
  "keywords": ["crypto", "blockchain", "presentation", "education"],
  "author": "Your Name",
  "license": "MIT"
}
EOF

# Create deployment files
cat > vercel.json << 'EOF'
{
  "version": 2,
  "builds": [
    {
      "src": "**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
EOF

cat > netlify.toml << 'EOF'
[build]
  publish = "."
  command = "echo 'Static site - no build needed'"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
EOF

# Create README
cat > README.md << 'EOF'
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
EOF

echo "✅ File structure created!"
echo ""
echo "📁 Created directories:"
echo "  - crypto-presentation/"
echo "  - styles/"
echo "  - js/slides/"
echo "  - assets/"
echo ""
echo "📄 Created files:"
echo "  - index.html (main entry point)"
echo "  - package.json (deployment config)"
echo "  - vercel.json (Vercel deployment)"
echo "  - netlify.toml (Netlify deployment)"
echo "  - README.md (documentation)"
echo ""
echo "🚀 Next steps:"
echo "  1. cd crypto-presentation"
echo "  2. Get the individual CSS/JS files from Claude"
echo "  3. Run: npm run dev (for local testing)"
echo "  4. Deploy to Vercel: vercel --prod"
echo ""
echo "💡 The presentation will be modular - each slide is a separate JS file!"