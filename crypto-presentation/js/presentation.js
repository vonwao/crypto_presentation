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
        
        // Sub-slide support
        this.flattenedSlides = [];
        this.currentFlatIndex = 0;
        this.totalFlatSlides = 0;
        
        // Enhanced slide definitions with sub-slide support
        this.slideDefinitions = [
            {
                id: 'intro',
                title: 'Crypto Fundamentals',
                subtitle: 'Understanding the Building Blocks of Blockchain',
                animationClass: 'IntroAnimations'
                // No subSlides - remains single slide
            },
            {
                id: 'hash',
                title: 'Hash Functions',
                animationClass: 'HashDemo',
                subSlides: [
                    {
                        id: 'hash-demo',
                        title: 'Hash Functions: The Digital Blender',
                        subtitle: 'Any input → Always the same size output',
                        sections: ['demo-section']
                    },
                    {
                        id: 'hash-avalanche',
                        title: 'Hash Functions: Avalanche Effect',
                        subtitle: 'Tiny changes create massive differences',
                        sections: ['avalanche-section']
                    }
                ]
            },
            {
                id: 'signatures-part1',
                title: 'Digital Signatures Part 1',
                animationClass: 'SignaturesPart1Demo',
                subSlides: [
                    {
                        id: 'signatures-1-keys',
                        title: 'Digital Signatures: The Two-Key System',
                        subtitle: 'Private signs, public verifies',
                        sections: ['key-system-demo']
                    },
                    {
                        id: 'signatures-1-analogy',
                        title: 'Digital vs Traditional Signatures',
                        subtitle: 'Why digital beats physical every time',
                        sections: ['analogy-section']
                    },
                    {
                        id: 'signatures-1-security',
                        title: 'Mathematical Security Guarantee',
                        subtitle: 'Impossible to forge, easy to verify',
                        sections: ['security-guarantee']
                    }
                ]
            },
            {
                id: 'signatures-part2',
                title: 'Digital Signatures Part 2: Security & Verification',
                subtitle: 'Why digital beats physical signatures every time',
                animationClass: 'SignaturesPart2Demo'
                // TODO: Add subSlides after examining the file
            },
            {
                id: 'merkle-part1',
                title: 'Merkle Trees Part 1',
                animationClass: 'MerklePart1Demo',
                subSlides: [
                    {
                        id: 'merkle-1-problem',
                        title: 'Merkle Trees: The Problem',
                        subtitle: 'How to verify one transaction out of millions?',
                        sections: ['concept-explanation']
                    },
                    {
                        id: 'merkle-1-construction',
                        title: 'Merkle Trees: Building the Tree',
                        subtitle: 'Efficient organization from the ground up',
                        sections: ['tree-builder']
                    },
                    {
                        id: 'merkle-1-steps',
                        title: 'Merkle Trees: How It Works',
                        subtitle: 'Step by step construction process',
                        sections: ['step-explanation']
                    }
                ]
            },
            {
                id: 'merkle-part2',
                title: 'Merkle Trees Part 2: Verification & Security',
                subtitle: 'Proving inclusion and detecting tampering',
                animationClass: 'MerklePart2Demo'
                // TODO: Add subSlides after examining the file
            },
            {
                id: 'blockchain-part1',
                title: 'Building a Blockchain Part 1: Assembly',
                subtitle: 'Watch how our three concepts create an unbreakable chain',
                animationClass: 'BlockchainPart1Demo'
                // TODO: Add subSlides after examining the file
            },
            {
                id: 'blockchain-part2',
                title: 'Building a Blockchain Part 2: Security Guarantees',
                subtitle: 'Mathematical guarantees without central authority',
                animationClass: 'BlockchainPart2Demo'
                // TODO: Add subSlides after examining the file
            }
        ];
        
        // Flatten slide definitions for navigation
        this.flattenSlideDefinitions();
    }
    
    /**
     * Flattens slide definitions into a navigable sequence
     */
    flattenSlideDefinitions() {
        this.flattenedSlides = [];
        
        this.slideDefinitions.forEach((slide, slideIndex) => {
            if (slide.subSlides && slide.subSlides.length > 0) {
                // Add each sub-slide
                slide.subSlides.forEach((subSlide, subIndex) => {
                    this.flattenedSlides.push({
                        ...subSlide,
                        parentSlide: slide,
                        parentIndex: slideIndex,
                        subSlideIndex: subIndex,
                        isSubSlide: true,
                        flatIndex: this.flattenedSlides.length
                    });
                });
            } else {
                // Add regular slide
                this.flattenedSlides.push({
                    ...slide,
                    parentSlide: null,
                    parentIndex: slideIndex,
                    subSlideIndex: 0,
                    isSubSlide: false,
                    flatIndex: this.flattenedSlides.length
                });
            }
        });
        
        this.totalFlatSlides = this.flattenedSlides.length;
        PresentationUtils.debug(`Flattened ${this.slideDefinitions.length} slides into ${this.totalFlatSlides} navigable slides`);
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
            console.log('Flattened slides:', this.flattenedSlides);
            
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
        
        // Generate HTML for each flattened slide
        for (let i = 0; i < this.flattenedSlides.length; i++) {
            const flatSlide = this.flattenedSlides[i];
            const slideHTML = await this.generateSlideHTML(flatSlide, i);
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
     * Generates HTML for a single slide (regular or sub-slide)
     * @param {Object} flatSlide - Flattened slide definition
     * @param {number} index - Slide index in flattened array
     * @returns {string} - HTML string
     */
    async generateSlideHTML(flatSlide, index) {
        console.log(`Generating slide HTML for: ${flatSlide.id} (index: ${index})`);
        
        // For sub-slides, check if parent slide class has sub-slide HTML generator
        if (flatSlide.isSubSlide && flatSlide.parentSlide) {
            const parentSlideClass = window.slideClasses?.[flatSlide.parentSlide.id];
            console.log(`Parent slide class for ${flatSlide.parentSlide.id}:`, parentSlideClass ? 'Found' : 'Not found');
            
            if (parentSlideClass && typeof parentSlideClass.prototype.createSubSlideHTML === 'function') {
                console.log(`Using custom sub-slide HTML generator for ${flatSlide.id}`);
                try {
                    const instance = new parentSlideClass();
                    return instance.createSubSlideHTML(flatSlide.id, flatSlide.sections);
                } catch (error) {
                    console.error(`Error creating sub-slide HTML for ${flatSlide.id}:`, error);
                    // Fall back to placeholder
                    return this.generatePlaceholderSlide(flatSlide);
                }
            }
            
            // Fall back to generating sub-slide from parent class's full HTML
            if (parentSlideClass && typeof parentSlideClass.prototype.createSlideHTML === 'function') {
                console.log(`Extracting sub-slide from parent HTML for ${flatSlide.id}`);
                try {
                    const instance = new parentSlideClass();
                    const fullHTML = instance.createSlideHTML();
                    return this.extractSubSlideFromHTML(fullHTML, flatSlide);
                } catch (error) {
                    console.error(`Error extracting sub-slide HTML for ${flatSlide.id}:`, error);
                    return this.generatePlaceholderSlide(flatSlide);
                }
            }
        }
        
        // For regular slides, use existing logic
        const slideId = flatSlide.isSubSlide ? flatSlide.parentSlide.id : flatSlide.id;
        const SlideClass = window.slideClasses?.[slideId];
        console.log(`Slide class for ${slideId}:`, SlideClass ? 'Found' : 'Not found');
        
        if (SlideClass && typeof SlideClass.prototype.createSlideHTML === 'function') {
            console.log(`Using custom HTML generator for ${slideId}`);
            try {
                const instance = new SlideClass();
                return instance.createSlideHTML();
            } catch (error) {
                console.error(`Error creating slide HTML for ${slideId}:`, error);
                return this.generatePlaceholderSlide(flatSlide);
            }
        }
        
        // Default slide templates
        console.log(`Using default template for ${flatSlide.id}`);
        switch (flatSlide.id) {
            case 'intro':
                return this.generateIntroSlide(flatSlide);
            case 'hash-demo':
            case 'hash-avalanche':
                return this.generateHashSubSlide(flatSlide);
            case 'signatures-1-keys':
            case 'signatures-1-analogy':
            case 'signatures-1-security':
                return this.generateSignaturesSubSlide(flatSlide);
            case 'merkle-1-problem':
            case 'merkle-1-construction':
            case 'merkle-1-steps':
                return this.generateMerkleSubSlide(flatSlide);
            default:
                console.warn(`No template found for slide: ${flatSlide.id}, using placeholder`);
                return this.generatePlaceholderSlide(flatSlide);
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
     * Extracts a sub-slide from parent slide's full HTML
     * @param {string} fullHTML - Full HTML from parent slide
     * @param {Object} flatSlide - Sub-slide definition
     * @returns {string} - Sub-slide HTML
     */
    extractSubSlideFromHTML(fullHTML, flatSlide) {
        // Create a temporary DOM element to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = fullHTML;
        
        // Find the slide element
        const slideElement = tempDiv.querySelector('.slide');
        if (!slideElement) {
            return this.generatePlaceholderSlide(flatSlide);
        }
        
        // Update slide attributes
        slideElement.setAttribute('data-slide', flatSlide.id);
        
        // Update header
        const header = slideElement.querySelector('.slide-header');
        if (header) {
            const title = header.querySelector('h1');
            const subtitle = header.querySelector('.subtitle');
            if (title) title.textContent = flatSlide.title;
            if (subtitle) subtitle.textContent = flatSlide.subtitle;
        }
        
        // Extract only the specified sections
        const content = slideElement.querySelector('.slide-content');
        if (content && flatSlide.sections) {
            // Hide all sections first
            const allSections = content.querySelectorAll('[class*="section"], [class*="demo"], [class*="explanation"]');
            allSections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show only the sections for this sub-slide
            flatSlide.sections.forEach(sectionClass => {
                const section = content.querySelector(`.${sectionClass}`);
                if (section) {
                    section.style.display = '';
                }
            });
        }
        
        return slideElement.outerHTML;
    }
    
    /**
     * Generates hash sub-slide HTML
     * @param {Object} flatSlide - Sub-slide definition
     * @returns {string} - HTML string
     */
    generateHashSubSlide(flatSlide) {
        const isDemo = flatSlide.id === 'hash-demo';
        const isAvalanche = flatSlide.id === 'hash-avalanche';
        
        return `
            <div class="slide" data-slide="${flatSlide.id}">
                <div class="slide-header">
                    <h1>${flatSlide.title}</h1>
                    <p class="subtitle">${flatSlide.subtitle}</p>
                </div>
                
                <div class="slide-content">
                    ${isDemo ? `
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
                    ` : ''}
                    
                    ${isAvalanche ? `
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
                    ` : ''}
                </div>

                <div class="slide-footer">
                    <div class="key-points">
                        ${isDemo ? `
                            <div class="key-point">
                                <span class="bullet">🌪️</span>
                                <span><strong>Blending:</strong> Any input becomes a fixed-size hash</span>
                            </div>
                            <div class="key-point">
                                <span class="bullet">🔄</span>
                                <span><strong>Deterministic:</strong> Same input always gives same output</span>
                            </div>
                        ` : `
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
                        `}
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * Generates signatures sub-slide HTML
     * @param {Object} flatSlide - Sub-slide definition
     * @returns {string} - HTML string
     */
    generateSignaturesSubSlide(flatSlide) {
        // For now, return placeholder - will be implemented when we update the signatures slide class
        return this.generatePlaceholderSlide(flatSlide);
    }
    
    /**
     * Generates merkle sub-slide HTML
     * @param {Object} flatSlide - Sub-slide definition
     * @returns {string} - HTML string
     */
    generateMerkleSubSlide(flatSlide) {
        // For now, return placeholder - will be implemented when we update the merkle slide class
        return this.generatePlaceholderSlide(flatSlide);
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
        
        this.flattenedSlides.forEach((flatSlide, index) => {
            const dot = document.createElement('div');
            dot.className = `nav-dot ${index === 0 ? 'active' : ''}`;
            
            // Add sub-slide indicator if this is a sub-slide
            if (flatSlide.isSubSlide) {
                dot.classList.add('sub-slide-dot');
                dot.dataset.parentSlide = flatSlide.parentSlide.id;
                dot.dataset.subSlideIndex = flatSlide.subSlideIndex;
            }
            
            dot.dataset.slide = flatSlide.id;
            dot.dataset.index = index;
            dot.title = flatSlide.title;
            this.navIndicator.appendChild(dot);
        });
    }

    /**
     * Initializes slide animation controllers
     */
    initializeSlideAnimations() {
        // Initialize animations for parent slides (not sub-slides)
        this.slideDefinitions.forEach(slideDef => {
            const SlideClass = window.slideClasses?.[slideDef.id];
            if (SlideClass) {
                this.slideAnimations[slideDef.id] = new SlideClass();
            } else {
                // Create default animation controller
                this.slideAnimations[slideDef.id] = this.createDefaultAnimation(slideDef.id);
            }
        });
        
        // Also create animation controllers for individual sub-slides if needed
        this.flattenedSlides.forEach(flatSlide => {
            if (flatSlide.isSubSlide) {
                // Sub-slides can share the parent's animation controller
                // or have their own if specifically defined
                const parentAnimationId = flatSlide.parentSlide.id;
                if (this.slideAnimations[parentAnimationId]) {
                    this.slideAnimations[flatSlide.id] = this.slideAnimations[parentAnimationId];
                } else {
                    this.slideAnimations[flatSlide.id] = this.createDefaultAnimation(flatSlide.id);
                }
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
            const flatIndex = this.flattenedSlides.findIndex(slide => slide.id === hash);
            if (flatIndex !== -1) {
                this.currentSlide = flatIndex;
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
            const flatSlide = this.flattenedSlides[index];
            PresentationUtils.debug(`Transitioning to slide ${index} (${flatSlide.id})`);

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
        const flatSlide = this.flattenedSlides[index];
        const slideId = flatSlide.id;
        const newURL = `${window.location.pathname}#${slideId}`;
        window.history.replaceState(null, null, newURL);
    }

    /**
     * Activates animations for a slide
     * @param {number} index - Slide index
     */
    async activateSlide(index) {
        const flatSlide = this.flattenedSlides[index];
        const slideId = flatSlide.id;
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
        const flatSlide = this.flattenedSlides[index];
        const slideId = flatSlide.id;
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
        const flatIndex = this.flattenedSlides.findIndex(slide => slide.id === hash);
        
        if (flatIndex !== -1 && flatIndex !== this.currentSlide) {
            this.goToSlide(flatIndex);
        }
    }

    /**
     * Gets current presentation status
     * @returns {Object} - Status information
     */
    getStatus() {
        const currentFlatSlide = this.flattenedSlides[this.currentSlide];
        
        return {
            currentSlide: this.currentSlide,
            totalSlides: this.totalSlides,
            currentSlideId: currentFlatSlide?.id || null,
            currentSlideTitle: currentFlatSlide?.title || null,
            isSubSlide: currentFlatSlide?.isSubSlide || false,
            parentSlide: currentFlatSlide?.parentSlide?.id || null,
            subSlideIndex: currentFlatSlide?.subSlideIndex || 0,
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