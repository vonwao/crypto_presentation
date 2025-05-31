// js/presentation.js - Main presentation controller

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
        // Replace the slideDefinitions array in your presentation.js with this:

// Updated slideDefinitions array for presentation.js
// Replace the existing slideDefinitions in your presentation.js constructor with this:

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
        id: 'signatures-part1',
        title: 'Digital Signatures Part 1: The Concept',
        subtitle: 'Your cryptographic DNA for proving authenticity',
        animationClass: 'SignaturesPart1Demo'
    },
    {
        id: 'signatures-part2',
        title: 'Digital Signatures Part 2: Security & Verification',
        subtitle: 'Why digital beats physical signatures every time',
        animationClass: 'SignaturesPart2Demo'
    },
    {
        id: 'merkle-part1',
        title: 'Merkle Trees Part 1: Tree Construction',
        subtitle: 'Building efficient data structures from the ground up',
        animationClass: 'MerklePart1Demo'
    },
    {
        id: 'merkle-part2',
        title: 'Merkle Trees Part 2: Verification & Security',
        subtitle: 'Proving inclusion and detecting tampering',
        animationClass: 'MerklePart2Demo'
    },
    {
        id: 'blockchain-part1',
        title: 'Building a Blockchain Part 1: Assembly',
        subtitle: 'Watch how our three concepts create an unbreakable chain',
        animationClass: 'BlockchainPart1Demo'
    },
    {
        id: 'blockchain-part2',
        title: 'Building a Blockchain Part 2: Security Guarantees',
        subtitle: 'Mathematical guarantees without central authority',
        animationClass: 'BlockchainPart2Demo'
    }
];

// Also update the corresponding script tags in index.html:
/*

*/

// Update the intro slide's concept cards to match the new structure:
// In generateIntroSlide method, update the concept cards:

// generateIntroSlide(slideDef) {
//     return `
//         <div class="slide ${slideDef.id === 'intro' ? 'active' : ''}" data-slide="${slideDef.id}">
//             <div class="slide-header">
//                 <h1>${slideDef.title}</h1>
//                 <p class="subtitle">${slideDef.subtitle}</p>
//             </div>
            
//             <div class="slide-content">
//                 <div class="intro-grid">
//                     <div class="concept-card" data-concept="hash">
//                         <span class="concept-icon">🌪️</span>
//                         <h3>Hash Functions</h3>
//                         <p>The digital blender that creates unique fingerprints</p>
//                     </div>
                    
//                     <div class="concept-card" data-concept="signatures">
//                         <span class="concept-icon">🔐</span>
//                         <h3>Digital Signatures</h3>
//                         <p>Your cryptographic DNA - concept and security</p>
//                         <div class="concept-parts">
//                             <span class="part-indicator">Part 1: Concept</span>
//                             <span class="part-indicator">Part 2: Security</span>
//                         </div>
//                     </div>
                    
//                     <div class="concept-card" data-concept="merkle">
//                         <span class="concept-icon">🌳</span>
//                         <h3>Merkle Trees</h3>
//                         <p>Efficient verification without downloading everything</p>
//                         <div class="concept-parts">
//                             <span class="part-indicator">Part 1: Construction</span>
//                             <span class="part-indicator">Part 2: Verification</span>
//                         </div>
//                     </div>
                    
//                     <div class="concept-card" data-concept="blockchain">
//                         <span class="concept-icon">⛓️</span>
//                         <h3>Blockchain</h3>
//                         <p>How it all comes together securely</p>
//                         <div class="concept-parts">
//                             <span class="part-indicator">Part 1: Assembly</span>
//                             <span class="part-indicator">Part 2: Security</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
            
//             <div class="slide-footer">
//                 <div class="key-points">
//                     <div class="key-point">
//                         <span class="bullet">🎯</span>
//                         <span>Simple visual explanations of complex concepts</span>
//                     </div>
//                     <div class="key-point">
//                         <span class="bullet">🔍</span>
//                         <span>See how each piece builds on the others</span>
//                     </div>
//                     <div class="key-point">
//                         <span class="bullet">📚</span>
//                         <span>Deep dive into each topic with multi-part lessons</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;
// }

// Add CSS for the new concept parts styling to styles/slides.css:
/*

*/

}
    /**
     * Initializes the presentation
     */
    async init() {
        try {
            console.log('Presentation init started');
            PresentationUtils.debug('Initializing presentation...');
            
            // Log available slide definitions
            console.log('Slide definitions:', this.slideDefinitions);
            
            this.slidesContainer = document.getElementById('slides-container');
            this.navIndicator = document.getElementById('navIndicator');
            
            console.log('DOM elements found:', {
                slidesContainer: !!this.slidesContainer,
                navIndicator: !!this.navIndicator
            });
            
            if (!this.slidesContainer) {
                throw new Error('Slides container not found');
            }

            // Generate slides HTML
            console.log('Generating slides...');
            await this.generateSlides();
            console.log('Slides generated, count:', this.slides.length);
            
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
            console.log('Activating first slide...');
            this.activateSlide(0);
            
            PresentationUtils.debug('Presentation initialized successfully');
            console.log('Presentation initialization complete');
            
        } catch (error) {
            console.error('Failed to initialize presentation:', error);
            console.error('Error details:', {
                message: error.message,
                stack: error.stack
            });
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
        console.log(`Generating slide HTML for: ${slideDef.id} (index: ${index})`);
        
        // Check if slide class has custom HTML generator
        const SlideClass = window.slideClasses?.[slideDef.id];
        console.log(`Slide class for ${slideDef.id}:`, SlideClass ? 'Found' : 'Not found');
        
        if (SlideClass && typeof SlideClass.prototype.createSlideHTML === 'function') {
            console.log(`Using custom HTML generator for ${slideDef.id}`);
            try {
                const instance = new SlideClass();
                return instance.createSlideHTML();
            } catch (error) {
                console.error(`Error creating slide HTML for ${slideDef.id}:`, error);
                // Fall back to default template
                return this.generatePlaceholderSlide(slideDef);
            }
        }
        
        // Default slide templates
        console.log(`Using default template for ${slideDef.id}`);
        switch (slideDef.id) {
            case 'intro':
                return this.generateIntroSlide(slideDef);
            case 'hash':
                return this.generateHashSlide(slideDef);
            case 'signatures-part1':
            case 'signatures-part2':
                return this.generateSignaturesSlide(slideDef);
            case 'merkle-part1':
            case 'merkle-part2':
            case 'blockchain-part1':
            case 'blockchain-part2':
                console.log(`Using placeholder for ${slideDef.id}`);
                return this.generatePlaceholderSlide(slideDef);
            default:
                console.warn(`No template found for slide: ${slideDef.id}, using placeholder`);
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

    /**
     * Sets up keyboard navigation
     */
    setupKeyboard() {
        // Store the handler as a property so we can remove it later
        this.keydownHandler = (e) => {
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
        };
        
        console.log('Setting up keyboard navigation');
        document.addEventListener('keydown', this.keydownHandler);
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
        console.log('Destroying presentation...');
        
        // Stop all animations
        Object.values(this.slideAnimations).forEach(animation => {
            if (animation && typeof animation.deactivate === 'function') {
                try {
                    animation.deactivate();
                } catch (error) {
                    console.error('Error deactivating animation:', error);
                }
            }
        });

        // Stop performance monitoring
        this.performanceMonitor.stop();

        // Remove event listeners
        if (this.keydownHandler) {
            document.removeEventListener('keydown', this.keydownHandler);
            console.log('Removed keydown event listener');
        }
        
        // Store the hashchange handler reference
        if (!this.hashChangeHandler && window.presentation) {
            this.hashChangeHandler = () => window.presentation.handleHashChange();
        }
        
        if (this.hashChangeHandler) {
            window.removeEventListener('hashchange', this.hashChangeHandler);
            console.log('Removed hashchange event listener');
        }
        
        // Remove visibility change handler
        if (this.visibilityChangeHandler) {
            document.removeEventListener('visibilitychange', this.visibilityChangeHandler);
            console.log('Removed visibilitychange event listener');
        }
        
        // Remove error handler
        if (this.errorHandler) {
            window.removeEventListener('error', this.errorHandler);
            console.log('Removed error event listener');
        }

        console.log('Presentation destroyed successfully');
        PresentationUtils.debug('Presentation destroyed');
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
        
        // Create and initialize presentation
        presentationInstance = new Presentation();
        await presentationInstance.init();
        
        // Handle hash changes for browser navigation
        presentationInstance.hashChangeHandler = () => {
            if (presentationInstance) {
                presentationInstance.handleHashChange();
            }
        };
        
        window.addEventListener('hashchange', presentationInstance.hashChangeHandler);
        console.log('Hash change handler registered');

        // Handle page visibility changes
        presentationInstance.visibilityChangeHandler = () => {
            if (document.hidden) {
                console.log('Page hidden, pausing animations');
                // Pause animations when tab is not visible
                Object.values(presentationInstance.slideAnimations).forEach(animation => {
                    if (animation && animation.animationController && animation.animationController.pause) {
                        animation.animationController.pause();
                    }
                });
            } else {
                console.log('Page visible, resuming animations');
                // Resume animations when tab becomes visible
                Object.values(presentationInstance.slideAnimations).forEach(animation => {
                    if (animation && animation.animationController && animation.animationController.resume) {
                        animation.animationController.resume();
                    }
                });
            }
        };
        
        document.addEventListener('visibilitychange', presentationInstance.visibilityChangeHandler);

        // Global error handler for animations
        presentationInstance.errorHandler = (event) => {
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
        };
        
        window.addEventListener('error', presentationInstance.errorHandler);
        console.log('Error handler registered');

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
}