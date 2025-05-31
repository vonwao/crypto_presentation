// js/slides/intro.js
// Introduction slide with concept card highlighting animations

class IntroAnimations {
    constructor() {
        this.cards = [];
        this.currentIndex = 0;
        this.animationController = new AnimationController(3000); // 3 second intervals
        this.isActive = false;
        this.concepts = [
            {
                name: 'hash',
                description: 'Creates unique fingerprints for any data'
            },
            {
                name: 'signatures', 
                description: 'Proves who created a message'
            },
            {
                name: 'merkle',
                description: 'Efficiently verifies large datasets'
            },
            {
                name: 'blockchain',
                description: 'Chains everything together securely'
            }
        ];
    }

    /**
     * Creates the HTML structure for the intro slide
     * @returns {string} HTML string
     */
    createSlideHTML() {
        return `
            <div class="slide active" data-slide="intro">
                <div class="slide-header">
                    <h1>Crypto Fundamentals</h1>
                    <p class="subtitle">Understanding the Building Blocks of Blockchain</p>
                </div>
                
                <div class="slide-content">
                    <div class="intro-grid">
                        <div class="concept-card" data-concept="hash">
                            <span class="concept-icon">🌪️</span>
                            <h3>Hash Functions</h3>
                            <p>The digital blender that creates unique fingerprints</p>
                            <div class="concept-detail" id="hashDetail">
                                Creates unique fingerprints for any data
                            </div>
                        </div>
                        
                        <div class="concept-card" data-concept="signatures">
                            <span class="concept-icon">🔐</span>
                            <h3>Digital Signatures</h3>
                            <p>Your cryptographic DNA for proving authenticity</p>
                            <div class="concept-detail" id="signaturesDetail">
                                Proves who created a message
                            </div>
                        </div>
                        
                        <div class="concept-card" data-concept="merkle">
                            <span class="concept-icon">🌳</span>
                            <h3>Merkle Trees</h3>
                            <p>Efficient verification without downloading everything</p>
                            <div class="concept-detail" id="merkleDetail">
                                Efficiently verifies large datasets
                            </div>
                        </div>
                        
                        <div class="concept-card" data-concept="blockchain">
                            <span class="concept-icon">⛓️</span>
                            <h3>Blockchain</h3>
                            <p>How it all comes together securely</p>
                            <div class="concept-detail" id="blockchainDetail">
                                Chains everything together securely
                            </div>
                        </div>
                    </div>

                    <div class="intro-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" id="progressFill"></div>
                        </div>
                        <div class="progress-text" id="progressText">
                            Building comprehensive understanding...
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
                        <div class="key-point">
                            <span class="bullet">🚀</span>
                            <span>Interactive demonstrations you can follow along</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Activates the intro slide animations
     */
    activate() {
        if (this.isActive) return;
        this.isActive = true;
        
        PresentationUtils.debug('Activating Intro Animations');
        
        // Get element references
        this.cards = document.querySelectorAll('.concept-card');
        this.progressFill = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');
        
        if (this.cards.length === 0) {
            console.warn('Intro concept cards not found, skipping activation');
            return;
        }

        // Set up animation callback
        this.animationController.addCallback(() => this.highlightNext());
        this.animationController.start();
        
        // Start with first card highlighted
        this.highlightCard(0);
        
        // Initialize progress bar
        this.updateProgress();
    }

    /**
     * Deactivates the intro slide animations
     */
    deactivate() {
        if (!this.isActive) return;
        this.isActive = false;
        
        PresentationUtils.debug('Deactivating Intro Animations');
        
        // Stop animation controller
        this.animationController.stop();
        
        // Remove all highlights
        this.cards.forEach(card => {
            card.classList.remove('highlight', 'pulse-effect');
        });
        
        // Reset progress
        if (this.progressFill) {
            this.progressFill.style.width = '0%';
        }
    }

    /**
     * Highlights the next concept card in sequence
     */
    highlightNext() {
        if (!this.isActive || this.cards.length === 0) return;
        
        // Remove previous highlights
        this.cards.forEach(card => {
            card.classList.remove('highlight', 'pulse-effect');
        });
        
        // Highlight current card
        this.highlightCard(this.currentIndex);
        
        // Update progress
        this.updateProgress();
        
        // Move to next card
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        
        PresentationUtils.debug(`Highlighted concept: ${this.concepts[this.currentIndex]?.name || 'unknown'}`);
    }

    /**
     * Highlights a specific card with animations
     * @param {number} index - Card index to highlight
     */
    highlightCard(index) {
        if (index < 0 || index >= this.cards.length) return;
        
        const card = this.cards[index];
        const concept = this.concepts[index];
        
        // Add highlight class
        card.classList.add('highlight');
        
        // Add entrance animation
        setTimeout(() => {
            card.classList.add('pulse-effect');
        }, 100);
        
        // Create particle effect around the card
        this.createCardParticles(card);
        
        // Update concept detail if it exists
        const detailElement = card.querySelector('.concept-detail');
        if (detailElement && concept) {
            this.animateDetailText(detailElement, concept.description);
        }
        
        // Add ripple effect
        setTimeout(() => {
            PresentationUtils.createRipple(card, 'var(--primary-blue)');
        }, 200);
    }

    /**
     * Creates particle effects around a card
     * @param {HTMLElement} card - Card element
     */
    createCardParticles(card) {
        const cardRect = card.getBoundingClientRect();
        const particleContainer = document.createElement('div');
        particleContainer.style.position = 'absolute';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.pointerEvents = 'none';
        particleContainer.style.zIndex = '1';
        
        card.style.position = 'relative';
        card.appendChild(particleContainer);
        
        // Create multiple small particles
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.background = 'var(--primary-gold)';
            particle.style.borderRadius = '50%';
            particle.style.top = '50%';
            particle.style.left = '50%';
            particle.style.transform = 'translate(-50%, -50%)';
            particle.style.animation = `cardParticleFloat 2s ease-out forwards`;
            particle.style.animationDelay = (i * 0.1) + 's';
            
            // Random direction
            const angle = (360 / 6) * i;
            particle.style.setProperty('--angle', angle + 'deg');
            
            particleContainer.appendChild(particle);
        }
        
        // Clean up particles
        setTimeout(() => {
            if (particleContainer.parentNode) {
                particleContainer.remove();
            }
        }, 2000);
    }

    /**
     * Animates detail text with typewriter effect
     * @param {HTMLElement} element - Detail text element
     * @param {string} text - Text to animate
     */
    animateDetailText(element, text) {
        element.style.opacity = '1';
        element.style.height = 'auto';
        
        // Simple fade in effect
        element.style.animation = 'fadeInUp 0.5s ease-out';
        
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }

    /**
     * Updates the progress bar
     */
    updateProgress() {
        if (!this.progressFill || !this.progressText) return;
        
        const progress = ((this.currentIndex + 1) / this.cards.length) * 100;
        const currentConcept = this.concepts[this.currentIndex];
        
        // Animate progress bar
        this.progressFill.style.width = progress + '%';
        
        // Update progress text
        if (currentConcept) {
            this.progressText.textContent = `Exploring: ${currentConcept.name.charAt(0).toUpperCase() + currentConcept.name.slice(1)}`;
        }
        
        // Add glow effect to progress bar
        this.progressFill.style.boxShadow = `0 0 10px var(--primary-blue)`;
        
        setTimeout(() => {
            this.progressFill.style.boxShadow = '';
        }, 500);
    }

    /**
     * Manually highlights a specific concept
     * @param {string} conceptName - Name of concept to highlight
     */
    highlightConcept(conceptName) {
        const conceptIndex = this.concepts.findIndex(c => c.name === conceptName);
        if (conceptIndex !== -1) {
            this.currentIndex = conceptIndex;
            this.highlightCard(conceptIndex);
            this.updateProgress();
        }
    }

    /**
     * Changes the animation interval
     * @param {number} newInterval - New interval in milliseconds
     */
    setAnimationInterval(newInterval) {
        this.animationController.setInterval(newInterval, true);
        PresentationUtils.debug(`Intro animation interval changed to ${newInterval}ms`);
    }

    /**
     * Gets the current animation status
     * @returns {Object} Status information
     */
    getStatus() {
        return {
            isActive: this.isActive,
            currentIndex: this.currentIndex,
            currentConcept: this.concepts[this.currentIndex]?.name || null,
            totalConcepts: this.concepts.length,
            controller: this.animationController.getStatus()
        };
    }

    /**
     * Adds hover effects to cards
     */
    addInteractivity() {
        this.cards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('highlight')) {
                    card.style.transform = 'translateY(-5px)';
                    card.style.boxShadow = '0 10px 25px rgba(0, 212, 255, 0.2)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('highlight')) {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                }
            });
            
            card.addEventListener('click', () => {
                this.highlightConcept(this.concepts[index].name);
            });
        });
    }

    /**
     * Resets the animation to the beginning
     */
    reset() {
        this.currentIndex = 0;
        this.cards.forEach(card => {
            card.classList.remove('highlight', 'pulse-effect');
        });
        this.highlightCard(0);
        this.updateProgress();
    }
}

// Additional CSS for intro animations (add to slides.css if not present)
const introStyles = `
.concept-detail {
    font-size: var(--font-size-xs);
    color: var(--primary-gold);
    margin-top: 1rem;
    opacity: 0;
    height: 0;
    overflow: hidden;
    transition: all 0.3s ease;
}

.concept-card.highlight .concept-detail {
    opacity: 1;
    height: auto;
}

.intro-progress {
    margin-top: 3rem;
    text-align: center;
}

.progress-bar {
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 1rem;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-blue), var(--primary-gold));
    border-radius: 3px;
    transition: width 0.5s ease;
    width: 0%;
}

.progress-text {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    font-style: italic;
}

.pulse-effect {
    animation: pulse 2s ease-in-out;
}

@keyframes cardParticleFloat {
    0% {
        opacity: 1;
        transform: translate(-50%, -50%) rotate(var(--angle)) translateX(0) scale(1);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -50%) rotate(var(--angle)) translateX(40px) scale(0.5);
    }
}
`;

// Inject styles if they don't exist
if (!document.querySelector('#intro-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'intro-styles';
    styleSheet.textContent = introStyles;
    document.head.appendChild(styleSheet);
}

// Register the slide class
if (typeof window.slideClasses === 'undefined') {
    window.slideClasses = {};
}
window.slideClasses['intro'] = IntroAnimations;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IntroAnimations;
}