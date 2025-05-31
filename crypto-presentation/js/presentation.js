/**
     * Sets up keyboard navigation
     */
    setupKeyboard() {
        document.addEventListener('keydown', (e) => {
            // Prevent navigation during transitions
            if (this.isTransitioning) {
                e.preventDefault();
                return;
            }

            switch(e.key) {
                case 'ArrowRight':
                case ' ':
                case 'PageDown':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'ArrowLeft':
                case 'PageUp':
                    e.preventDefault();
                    this.prevSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides - 1);
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'p':
                case 'P':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.togglePerformanceMonitor();
                    }
                    break;
            }
        });
    }

    /**
     * Handles initial URL hash
     */
    handleInitialHash() {
        const hash = window.location.hash.slice(1);
        if (hash) {
            const slideIndex = this.slideDefinitions.findIndex(slide => slide.id === hash);
            if (slideIndex !== -1) {
                this.currentSlide = slideIndex;
            }
        }
    }

    /**
     * Navigates to the next slide
     */
    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    /**
     * Navigates to the previous slide
     */
    prevSlide() {
        if (this.currentSlide > 0) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    /**
     * Navigates to a specific slide
     * @param {number} index - Target slide index
     */
    async goToSlide(index) {
        if (index === this.currentSlide || 
            index < 0 || 
            index >= this.totalSlides || 
            this.isTransitioning) {
            return;
        }

        this.isTransitioning = true;
        
        try {
            PresentationUtils.debug(`Transitioning to slide ${index} (${this.slideDefinitions[index].id})`);

            // Deactivate current slide
            await this.deactivateSlide(this.currentSlide);

            // Update slide classes with animation
            this.updateSlideClasses(index);

            // Update navigation
            this.updateNavigation(index);

            // Update URL
            this.updateURL(index);

            // Update current slide index
            this.currentSlide = index;

            // Activate new slide after transition
            setTimeout(async () => {
                await this.activateSlide(index);
                this.isTransitioning = false;
            }, 300); // Wait for CSS transition

        } catch (error) {
            console.error('Error during slide transition:', error);
            this.isTransitioning = false;
        }
    }

    /**
     * Updates slide CSS classes for transition
     * @param {number} targetIndex - Target slide index
     */
    updateSlideClasses(targetIndex) {
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            
            if (index === targetIndex) {
                slide.classList.add('active');
            } else if (index < targetIndex) {
                slide.classList.add('prev');
            }
        });
    }

    /**
     * Updates navigation indicators
     * @param {number} activeIndex - Active slide index
     */
    updateNavigation(activeIndex) {
        if (!this.navIndicator) return;
        
        const dots = this.navIndicator.querySelectorAll('.nav-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }

    /**
     * Updates browser URL
     * @param {number} index - Slide index
     */
    updateURL(index) {
        const slideId = this.slideDefinitions[index].id;
        const newURL = `${window.location.pathname}#${slideId}`;
        window.history.replaceState(null, null, newURL);
    }

    /**
     * Activates animations for a slide
     * @param {number} index - Slide index
     */
    async activateSlide(index) {
        const slideId = this.slideDefinitions[index].id;
        const animation = this.slideAnimations[slideId];
        
        if (animation && typeof animation.activate === 'function') {
            try {
                await animation.activate();
                PresentationUtils.debug(`Activated animations for slide: ${slideId}`);
            } catch (error) {
                console.error(`Error activating slide ${slideId}:`, error);
            }
        }
    }

    /**
     * Deactivates animations for a slide
     * @param {number} index - Slide index
     */
    async deactivateSlide(index) {
        const slideId = this.slideDefinitions[index].id;
        const animation = this.slideAnimations[slideId];
        
        if (animation && typeof animation.deactivate === 'function') {
            try {
                await animation.deactivate();
                PresentationUtils.debug(`Deactivated animations for slide: ${slideId}`);
            } catch (error) {
                console.error(`Error deactivating slide ${slideId}:`, error);
            }
        }
    }

    /**
     * Handles browser back/forward navigation
     */
    handleHashChange() {
        const hash = window.location.hash.slice(1);
        const slideIndex = this.slideDefinitions.findIndex(slide => slide.id === hash);
        
        if (slideIndex !== -1 && slideIndex !== this.currentSlide) {
            this.goToSlide(slideIndex);
        }
    }

    /**
     * Gets current presentation status
     * @returns {Object} - Status information
     */
    getStatus() {
        const currentSlideDef = this.slideDefinitions[this.currentSlide];
        
        return {
            currentSlide: this.currentSlide,
            totalSlides: this.totalSlides,
            currentSlideId: currentSlideDef?.id || null,
            currentSlideTitle: currentSlideDef?.title || null,
            isTransitioning: this.isTransitioning,
            performance: this.performanceMonitor.getStats()
        };
    }

    /**
     * Toggles performance monitoring display
     */
    togglePerformanceMonitor() {
        const stats = this.performanceMonitor.getStats();
        
        if (stats.isMonitoring) {
            console.table(stats);
        } else {
            this.performanceMonitor.start();
            console.log('Performance monitoring started. Press Ctrl+P again to see stats.');
        }
    }

    /**
     * Resets presentation to initial state
     */
    reset() {
        this.goToSlide(0);
        PresentationUtils.debug('Presentation reset to initial state');
    }

    /**
     * Destroys the presentation and cleans up resources
     */
    destroy() {
        // Stop all animations
        Object.values(this.slideAnimations).forEach(animation => {
            if (animation && typeof animation.deactivate === 'function') {
                animation.deactivate();
            }
        });

        // Stop performance monitoring
        this.performanceMonitor.stop();

        // Remove event listeners
        document.removeEventListener('keydown', this.setupKeyboard);
        window.removeEventListener('hashchange', this.handleHashChange);

        PresentationUtils.debug('Presentation destroyed');
    }
}

// Default slide animations for slides without custom controllers
class IntroAnimations {
    constructor() {
        this.cards = [];
        this.currentIndex = 0;
        this.animationController = new AnimationController(3000);
        this.isActive = false;
    }

    activate() {
        if (this.isActive) return;
        this.isActive = true;
        
        // Get card elements
        this.cards = document.querySelectorAll('.concept-card');
        
        if (this.cards.length > 0) {
            this.animationController.addCallback(() => this.highlightNext());
            this.animationController.start();
        }
    }

    deactivate() {
        if (!this.isActive) return;
        this.isActive = false;
        
        this.animationController.stop();
        this.cards.forEach(card => card.classList.remove('highlight'));
    }

    highlightNext() {
        if (!this.isActive || this.cards.length === 0) return;
        
        this.cards.forEach(card => card.classList.remove('highlight'));
        this.cards[this.currentIndex].classList.add('highlight');
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
    }
}

class HashDemo {
    constructor() {
        this.inputs = ['Hello', 'Hello!', 'Blockchain', 'Bitcoin', 'Crypto', 'Hash123'];
        this.currentIndex = 0;
        this.elements = {};
        this.animationController = new AnimationController(6000);
        this.isActive = false;
    }

    activate() {
        if (this.isActive) return;
        this.isActive = true;
        
        this.elements = {
            inputValue: document.getElementById('inputValue'),
            hashValue: document.getElementById('hashValue'),
            blender: document.getElementById('blender'),
            particleContainer: document.getElementById('particleContainer'),
            beforeInput: document.getElementById('beforeInput'),
            afterInput: document.getElementById('afterInput'),
            beforeHash: document.getElementById('beforeHash'),
            afterHash: document.getElementById('afterHash')
        };

        // Only start if elements exist
        if (this.elements.inputValue && this.elements.blender) {
            this.animationController.addCallback(() => this.runHashAnimation());
            this.animationController.start();
            this.updateDisplay();
        }
    }

    deactivate() {
        if (!this.isActive) return;
        this.isActive = false;
        this.animationController.stop();
        
        // Clean up animations
        if (this.elements.blender) {
            this.elements.blender.classList.remove('processing');
        }
    }

    runHashAnimation() {
        if (!this.isActive || !this.elements.inputValue) return;
        
        this.currentIndex = (this.currentIndex + 1) % this.inputs.length;
        const currentInput = this.inputs[this.currentIndex];
        
        this.elements.inputValue.textContent = currentInput;
        this.elements.blender.classList.add('processing');
        
        PresentationUtils.createParticles(this.elements.particleContainer, 10, 2500);
        PresentationUtils.createRipple(this.elements.blender, 'var(--primary-gold)');
        
        setTimeout(() => {
            if (!this.isActive) return;
            
            const hash = PresentationUtils.simpleHash(currentInput);
            this.elements.hashValue.textContent = PresentationUtils.formatHash(hash);
            this.updateComparison(currentInput, hash);
            
            setTimeout(() => {
                this.elements.blender.classList.remove('processing');
            }, 1000);
            
        }, 2000);
    }

    updateComparison(input, hash) {
        const modifiedInput = input + '!';
        const modifiedHash = PresentationUtils.simpleHash(modifiedInput);
        
        this.elements.beforeInput.textContent = input;
        this.elements.afterInput.innerHTML = input + '<span style="color: var(--alert-red); font-weight: bold;">!</span>';
        this.elements.beforeHash.textContent = hash;
        this.elements.afterHash.textContent = modifiedHash;
    }

    updateDisplay() {
        const currentInput = this.inputs[this.currentIndex];
        const hash = PresentationUtils.simpleHash(currentInput);
        
        this.elements.inputValue.textContent = currentInput;
        this.elements.hashValue.textContent = PresentationUtils.formatHash(hash);
        this.updateComparison(currentInput, hash);
    }
}

// Global initialization
let presentationInstance = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    try {
        PresentationUtils.debug('DOM loaded, initializing presentation...');
        
        // Initialize slide classes registry if not exists
        if (typeof window.slideClasses === 'undefined') {
            window.slideClasses = {};
        }
        
        // Register default slide classes
        window.slideClasses['intro'] = IntroAnimations;
        window.slideClasses['hash'] = HashDemo;
        
        // Create and initialize presentation
        presentationInstance = new Presentation();
        await presentationInstance.init();
        
        // Handle hash changes for browser navigation
        window.addEventListener('hashchange', () => {
            if (presentationInstance) {
                presentationInstance.handleHashChange();
            }
        });

        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause animations when tab is not visible
                Object.values(presentationInstance.slideAnimations).forEach(animation => {
                    if (animation && animation.animationController && animation.animationController.pause) {
                        animation.animationController.pause();
                    }
                });
            } else {
                // Resume animations when tab becomes visible
                Object.values(presentationInstance.slideAnimations).forEach(animation => {
                    if (animation && animation.animationController && animation.animationController.resume) {
                        animation.animationController.resume();
                    }
                });
            }
        });

        // Global error handler for animations
        window.addEventListener('error', (event) => {
            if (event.error && event.error.message.includes('animation')) {
                console.error('Animation error caught:', event.error);
                // Try to recover by resetting current slide
                if (presentationInstance) {
                    const currentSlide = presentationInstance.currentSlide;
                    setTimeout(() => {
                        presentationInstance.goToSlide(currentSlide);
                    }, 1000);
                }
            }
        });

        // Expose presentation to global scope for debugging
        window.presentation = presentationInstance;
        
        PresentationUtils.debug('Presentation fully initialized and ready');
        
    } catch (error) {
        console.error('Failed to initialize presentation:', error);
        
        // Show error message to user
        document.body.innerHTML = `
            <div style="
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background: var(--bg-dark);
                color: var(--text-primary);
                font-family: 'Segoe UI', sans-serif;
                text-align: center;
                padding: 2rem;
            ">
                <div>
                    <h1 style="color: var(--alert-red); margin-bottom: 1rem;">
                        🚨 Presentation Failed to Load
                    </h1>
                    <p style="margin-bottom: 1rem;">
                        There was an error initializing the presentation.
                    </p>
                    <p style="color: var(--text-secondary); font-size: 0.9rem;">
                        Please check the console for more details and try refreshing the page.
                    </p>
                    <button onclick="window.location.reload()" style="
                        margin-top: 2rem;
                        padding: 1rem 2rem;
                        background: var(--primary-blue);
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 1rem;
                    ">
                        Refresh Page
                    </button>
                </div>
            </div>
        `;
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (presentationInstance) {
        presentationInstance.destroy();
    }
});

// Development helpers
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Add debug commands to console
    console.log(`
🎯 Crypto Presentation Debug Commands:
  
• presentation.getStatus() - Get current status
• presentation.goToSlide(index) - Jump to slide
• presentation.togglePerformanceMonitor() - Monitor FPS
• PresentationUtils.debug() - Toggle debug mode
• presentation.reset() - Reset to first slide

Press Ctrl+P to toggle performance monitoring
Use arrow keys or spacebar to navigate
    `);
}// js/presentation.js - Main presentation controller

class Presentation {
    constructor() {
        this.slides = [];
        this.currentSlide = 0;
        this.totalSlides = 0;
        this.slideAnimations = {};
        this.isTransitioning = false;
        this.slidesContainer = null;
        this.navIndicator = null;
        this.performanceMonitor = new AnimationPerformanceMonitor();
        
        // Slide definitions
        this.slideDefinitions = [
            {
                id: 'intro',
                title: 'Crypto Fundamentals',
                subtitle: 'Understanding the Building Blocks of Blockchain',
                animationClass: 'IntroAnimations'
            },
            {
                id: 'hash',
                title: 'Hash Functions: The Digital Blender',
                subtitle: 'Any input → Always the same size output',
                animationClass: 'HashDemo'
            },
            {
                id: 'signatures',
                title: 'Digital Signatures: Your Cryptographic DNA',
                subtitle: 'Proving authenticity without revealing secrets',
                animationClass: 'DigitalSignaturesDemo'
            },
            {
                id: 'merkle',
                title: 'Merkle Trees: The Efficient Detective',
                subtitle: 'Verify data integrity without downloading everything',
                animationClass: 'MerkleTreeDemo'
            },
            {
                id: 'integration',
                title: 'Putting It All Together',
                subtitle: 'How hash functions, signatures, and Merkle trees create blockchain',
                animationClass: 'BlockchainIntegrationDemo'
            }
        ];
    }

    /**
     * Initializes the presentation
     */
    async init() {
        try {
            PresentationUtils.debug('Initializing presentation...');
            
            this.slidesContainer = document.getElementById('slides-container');
            this.navIndicator = document.getElementById('navIndicator');
            
            if (!this.slidesContainer) {
                throw new Error('Slides container not found');
            }

            // Generate slides HTML
            await this.generateSlides();
            
            // Setup navigation
            this.setupNavigation();
            this.setupKeyboard();
            
            // Setup performance monitoring in development
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                this.performanceMonitor.start();
            }
            
            // Handle initial URL hash
            this.handleInitialHash();
            
            // Activate first slide
            this.activateSlide(0);
            
            PresentationUtils.debug('Presentation initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize presentation:', error);
        }
    }

    /**
     * Generates HTML for all slides
     */
    async generateSlides() {
        this.slidesContainer.innerHTML = '';
        
        for (let i = 0; i < this.slideDefinitions.length; i++) {
            const slideDef = this.slideDefinitions[i];
            const slideHTML = await this.generateSlideHTML(slideDef, i);
            this.slidesContainer.innerHTML += slideHTML;
        }
        
        // Update DOM references
        this.slides = this.slidesContainer.querySelectorAll('.slide');
        this.totalSlides = this.slides.length;
        
        // Generate navigation dots
        this.generateNavigation();
        
        // Initialize slide animations
        this.initializeSlideAnimations();
    }

    /**
     * Generates HTML for a single slide
     * @param {Object} slideDef - Slide definition
     * @param {number} index - Slide index
     * @returns {string} - HTML string
     */
    async generateSlideHTML(slideDef, index) {
        // Check if slide class has custom HTML generator
        const SlideClass = window.slideClasses?.[slideDef.id];
        if (SlideClass && typeof SlideClass.prototype.createSlideHTML === 'function') {
            const instance = new SlideClass();
            return instance.createSlideHTML();
        }
        
        // Default slide templates
        switch (slideDef.id) {
            case 'intro':
                return this.generateIntroSlide(slideDef);
            case 'hash':
                return this.generateHashSlide(slideDef);
            case 'signatures':
                return this.generateSignaturesSlide(slideDef);
            default:
                return this.generatePlaceholderSlide(slideDef);
        }
    }

    /**
     * Generates intro slide HTML
     */
    generateIntroSlide(slideDef) {
        return `
            <div class="slide ${slideDef.id === 'intro' ? 'active' : ''}" data-slide="${slideDef.id}">
                <div class="slide-header">
                    <h1>${slideDef.title}</h1>
                    <p class="subtitle">${slideDef.subtitle}</p>
                </div>
                
                <div class="slide-content">
                    <div class="intro-grid">
                        <div class="concept-card" data-concept="hash">
                            <span class="concept-icon">🌪️</span>
                            <h3>Hash Functions</h3>
                            <p>The digital blender that creates unique fingerprints</p>
                        </div>
                        
                        <div class="concept-card" data-concept="signatures">
                            <span class="concept-icon">🔐</span>
                            <h3>Digital Signatures</h3>
                            <p>Your cryptographic DNA for proving authenticity</p>
                        </div>
                        
                        <div class="concept-card" data-concept="merkle">
                            <span class="concept-icon">🌳</span>
                            <h3>Merkle Trees</h3>
                            <p>Efficient verification without downloading everything</p>
                        </div>
                        
                        <div class="concept-card" data-concept="blockchain">
                            <span class="concept-icon">⛓️</span>
                            <h3>Blockchain</h3>
                            <p>How it all comes together securely</p>
                        </div>
                    </div>
                </div>
                
                <div class="slide-footer">
                    <div class="key-points">
                        <div class="key-point">
                            <span class="bullet">🎯</span>
                            <span>Simple visual explanations of complex concepts</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">🔍</span>
                            <span>See how each piece builds on the others</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Generates hash demo slide HTML
     */
    generateHashSlide(slideDef) {
        return `
            <div class="slide" data-slide="${slideDef.id}">
                <div class="slide-header">
                    <h1>${slideDef.title}</h1>
                    <p class="subtitle">${slideDef.subtitle}</p>
                </div>
                
                <div class="slide-content">
                    <div class="demo-section">
                        <div class="input-display">
                            <span class="input-label">Input</span>
                            <div class="input-value" id="inputValue">Hello</div>
                        </div>

                        <div class="blender" id="blender">
                            <div class="blender-inner">🌪️</div>
                            <div class="particle-container" id="particleContainer"></div>
                        </div>

                        <div class="output-display">
                            <span class="output-label">Hash Output</span>
                            <div class="hash-value" id="hashValue">2cf24dba4f21d4288094e19b482f7c1b7ae07d12e4b31...</div>
                        </div>
                    </div>

                    <div class="avalanche-section">
                        <h3 class="section-title">The Avalanche Effect</h3>
                        <div class="comparison-grid">
                            <div class="comparison-item">
                                <div class="comparison-input">
                                    <strong>Input:</strong> "<span id="beforeInput">Hello</span>"
                                </div>
                                <div class="comparison-output">
                                    <code id="beforeHash">2cf24dba4f21d4288094e19b482f7c1b</code>
                                </div>
                            </div>
                            
                            <div class="comparison-arrow">→</div>
                            
                            <div class="comparison-item">
                                <div class="comparison-input">
                                    <strong>Input:</strong> "<span id="afterInput">Hello!</span>"
                                </div>
                                <div class="comparison-output">
                                    <code id="afterHash" class="highlight-change">334d016f755cd6dc58c53a86e183882f</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="slide-footer">
                    <div class="key-points">
                        <div class="key-point">
                            <span class="bullet">⚡</span>
                            <span><strong>Immutability:</strong> Any change completely alters the hash</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">🔗</span>
                            <span><strong>Linking:</strong> Each block references the previous block's hash</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">✓</span>
                            <span><strong>Verification:</strong> Instantly detect any data tampering</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Generates signatures slide HTML - uses class method if available
     */
    generateSignaturesSlide(slideDef) {
        const SignaturesClass = window.slideClasses?.['signatures'];
        if (SignaturesClass) {
            const instance = new SignaturesClass();
            return instance.createSlideHTML();
        }
        
        return this.generatePlaceholderSlide(slideDef);
    }

    /**
     * Generates placeholder slide HTML
     */
    generatePlaceholderSlide(slideDef) {
        return `
            <div class="slide" data-slide="${slideDef.id}">
                <div class="slide-header">
                    <h1>${slideDef.title}</h1>
                    <p class="subtitle">${slideDef.subtitle}</p>
                </div>
                
                <div class="slide-content">
                    <div class="glass-container" style="text-align: center; padding: 4rem;">
                        <div style="font-size: 6rem; margin-bottom: 2rem;">🚧</div>
                        <h2>Coming Soon</h2>
                        <p style="font-size: var(--font-size-md); margin-top: 2rem; color: var(--text-secondary);">
                            ${slideDef.subtitle}
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Generates navigation dots
     */
    generateNavigation() {
        if (!this.navIndicator) return;
        
        this.navIndicator.innerHTML = '';
        
        this.slideDefinitions.forEach((slide, index) => {
            const dot = document.createElement('div');
            dot.className = `nav-dot ${index === 0 ? 'active' : ''}`;
            dot.dataset.slide = slide.id;
            dot.dataset.index = index;
            dot.title = slide.title;
            this.navIndicator.appendChild(dot);
        });
    }

    /**
     * Initializes slide animation controllers
     */
    initializeSlideAnimations() {
        this.slideDefinitions.forEach(slideDef => {
            const SlideClass = window.slideClasses?.[slideDef.id];
            if (SlideClass) {
                this.slideAnimations[slideDef.id] = new SlideClass();
            } else {
                // Create default animation controller
                this.slideAnimations[slideDef.id] = this.createDefaultAnimation(slideDef.id);
            }
        });
    }

    /**
     * Creates default animation for slides without custom controllers
     */
    createDefaultAnimation(slideId) {
        return {
            activate: () => PresentationUtils.debug(`Activated slide: ${slideId}`),
            deactivate: () => PresentationUtils.debug(`Deactivated slide: ${slideId}`)
        };
    }

    /**
     * Sets up navigation event listeners
     */
    setupNavigation() {
        if (!this.navIndicator) return;
        
        this.navIndicator.addEventListener('click', (e) => {
            const dot = e.target.closest('.nav-dot');
            if (dot && dot.dataset.index) {
                const index = parseInt(dot.dataset.index);
                this.goToSlide(index);
            }
        });
    }