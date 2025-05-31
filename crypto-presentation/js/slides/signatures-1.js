// js/slides/signatures-part1.js
// Digital Signatures Part 1: The Two-Key Concept

class SignaturesPart1Demo {
    constructor() {
        this.currentAnimationPhase = 0;
        this.animationController = new AnimationController(6000); // 6 second cycles
        this.isActive = false;
        this.elements = {};
    }

    /**
     * Creates the HTML structure for signatures part 1
     * @returns {string} HTML string
     */
    createSlideHTML() {
        return `
            <div class="slide" data-slide="signatures-part1">
                <div class="slide-header">
                    <h1>Digital Signatures: The Two-Key System</h1>
                    <p class="subtitle">Your cryptographic DNA that proves authenticity</p>
                </div>
                
                <div class="slide-content">
                    <div class="signature-concept">
                        <div class="key-system-demo" id="keySystemDemo">
                            <div class="key-explanation">
                                <h2 class="concept-title">How It Works</h2>
                                <p class="concept-description">Unlike handwritten signatures, digital signatures use mathematical pairs of keys</p>
                            </div>
                            
                            <div class="keys-display" id="keysDisplay">
                                <div class="key-container private-key-container" id="privateKeyContainer">
                                    <div class="key-visual">
                                        <div class="key-icon">🗝️</div>
                                        <div class="key-glow" id="privateKeyGlow"></div>
                                    </div>
                                    <div class="key-info">
                                        <h3 class="key-title">Private Key</h3>
                                        <p class="key-description">Keep this SECRET!</p>
                                        <div class="key-purpose">Used to SIGN messages</div>
                                    </div>
                                </div>

                                <div class="key-connection" id="keyConnection">
                                    <div class="connection-line"></div>
                                    <div class="connection-label">Mathematical Pair</div>
                                </div>

                                <div class="key-container public-key-container" id="publicKeyContainer">
                                    <div class="key-visual">
                                        <div class="key-icon">🔓</div>
                                        <div class="key-glow" id="publicKeyGlow"></div>
                                    </div>
                                    <div class="key-info">
                                        <h3 class="key-title">Public Key</h3>
                                        <p class="key-description">Share with everyone!</p>
                                        <div class="key-purpose">Used to VERIFY signatures</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="analogy-section" id="analogySection">
                            <h2 class="analogy-title">Think of it like...</h2>
                            <div class="analogy-grid">
                                <div class="analogy-item traditional" id="traditionalAnalogy">
                                    <div class="analogy-header">
                                        <div class="analogy-icon">✍️</div>
                                        <h4>Handwritten Signature</h4>
                                    </div>
                                    <div class="analogy-content">
                                        <div class="analogy-point problem">❌ Can be forged</div>
                                        <div class="analogy-point problem">❌ Hard to verify remotely</div>
                                        <div class="analogy-point problem">❌ Same signature every time</div>
                                    </div>
                                </div>

                                <div class="analogy-arrow">→</div>

                                <div class="analogy-item digital" id="digitalAnalogy">
                                    <div class="analogy-header">
                                        <div class="analogy-icon">🔐</div>
                                        <h4>Digital Signature</h4>
                                    </div>
                                    <div class="analogy-content">
                                        <div class="analogy-point benefit">✅ Mathematically impossible to forge</div>
                                        <div class="analogy-point benefit">✅ Instantly verifiable anywhere</div>
                                        <div class="analogy-point benefit">✅ Unique for each message</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="security-guarantee" id="securityGuarantee">
                            <div class="guarantee-content">
                                <div class="guarantee-icon">🛡️</div>
                                <div class="guarantee-text">
                                    <h3>Mathematical Guarantee</h3>
                                    <p>Only someone with the private key can create a valid signature</p>
                                    <p>Anyone with the public key can verify it's authentic</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="slide-footer">
                    <div class="key-points">
                        <div class="key-point">
                            <span class="bullet">🔐</span>
                            <span><strong>Two Keys:</strong> Private signs, public verifies</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">🧮</span>
                            <span><strong>Mathematical:</strong> Impossible to forge, easy to verify</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">▶️</span>
                            <span><strong>Next:</strong> See it in action!</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Activates the signatures part 1 animations
     */
    activate() {
        if (this.isActive) return;
        this.isActive = true;
        
        PresentationUtils.debug('Activating Signatures Part 1 Demo');
        
        // Get element references
        this.elements = {
            keySystemDemo: document.getElementById('keySystemDemo'),
            keysDisplay: document.getElementById('keysDisplay'),
            privateKeyContainer: document.getElementById('privateKeyContainer'),
            publicKeyContainer: document.getElementById('publicKeyContainer'),
            keyConnection: document.getElementById('keyConnection'),
            privateKeyGlow: document.getElementById('privateKeyGlow'),
            publicKeyGlow: document.getElementById('publicKeyGlow'),
            analogySection: document.getElementById('analogySection'),
            traditionalAnalogy: document.getElementById('traditionalAnalogy'),
            digitalAnalogy: document.getElementById('digitalAnalogy'),
            securityGuarantee: document.getElementById('securityGuarantee')
        };
        
        if (!this.elements.keySystemDemo) {
            console.warn('Signatures part 1 elements not found, skipping activation');
            return;
        }

        // Set up animation callback
        this.animationController.addCallback(() => this.runConceptAnimation());
        this.animationController.start();
        
        // Initial setup
        this.updateDisplay();
    }

    /**
     * Deactivates the signatures part 1 animations
     */
    deactivate() {
        if (!this.isActive) return;
        this.isActive = false;
        
        PresentationUtils.debug('Deactivating Signatures Part 1 Demo');
        
        // Stop animation controller
        this.animationController.stop();
        
        // Clean up animations
        this.clearAllAnimations();
    }

    /**
     * Runs the main concept animation sequence
     */
    runConceptAnimation() {
        if (!this.isActive) return;
        
        this.currentAnimationPhase = (this.currentAnimationPhase + 1) % 3;
        
        PresentationUtils.debug(`Signatures concept phase: ${this.currentAnimationPhase}`);
        
        // Clear previous animations
        this.clearAllAnimations();
        
        switch (this.currentAnimationPhase) {
            case 0:
                this.explainKeyPair();
                break;
            case 1:
                this.compareToTraditional();
                break;
            case 2:
                this.highlightSecurity();
                break;
        }
    }

    /**
     * Explains the key pair concept
     */
    explainKeyPair() {
        // Phase 1: Highlight private key
        setTimeout(() => {
            if (this.isActive) {
                this.elements.privateKeyContainer.classList.add('highlighted');
                this.elements.privateKeyGlow.style.animation = 'keyGlow 2s infinite';
                PresentationUtils.createRipple(this.elements.privateKeyContainer, 'var(--alert-red)');
            }
        }, 500);

        // Phase 2: Show connection
        setTimeout(() => {
            if (this.isActive) {
                this.elements.keyConnection.classList.add('active');
                const connectionLine = this.elements.keyConnection.querySelector('.connection-line');
                connectionLine.style.animation = 'connectionGrow 1s ease-out';
            }
        }, 2000);

        // Phase 3: Highlight public key
        setTimeout(() => {
            if (this.isActive) {
                this.elements.publicKeyContainer.classList.add('highlighted');
                this.elements.publicKeyGlow.style.animation = 'keyGlow 2s infinite';
                PresentationUtils.createRipple(this.elements.publicKeyContainer, 'var(--success-green)');
            }
        }, 3500);

        // Phase 4: Show both working together
        setTimeout(() => {
            if (this.isActive) {
                this.elements.keysDisplay.classList.add('synchronized');
                PresentationUtils.createParticles(this.elements.keysDisplay, 8, 2000);
            }
        }, 5000);
    }

    /**
     * Compares to traditional signatures
     */
    compareToTraditional() {
        // Reset key highlights
        this.clearKeyHighlights();

        // Phase 1: Highlight problems with traditional
        setTimeout(() => {
            if (this.isActive) {
                this.elements.traditionalAnalogy.classList.add('highlighted');
                const problems = this.elements.traditionalAnalogy.querySelectorAll('.analogy-point.problem');
                problems.forEach((problem, index) => {
                    setTimeout(() => {
                        if (this.isActive) {
                            problem.style.animation = 'problemPulse 1s ease-out';
                            problem.style.color = 'var(--alert-red)';
                        }
                    }, index * 400);
                });
            }
        }, 500);

        // Phase 2: Show digital benefits
        setTimeout(() => {
            if (this.isActive) {
                this.elements.digitalAnalogy.classList.add('highlighted');
                const benefits = this.elements.digitalAnalogy.querySelectorAll('.analogy-point.benefit');
                benefits.forEach((benefit, index) => {
                    setTimeout(() => {
                        if (this.isActive) {
                            benefit.style.animation = 'benefitReveal 1s ease-out';
                            benefit.style.color = 'var(--success-green)';
                        }
                    }, index * 400);
                });
            }
        }, 2500);

        // Phase 3: Create contrast effect
        setTimeout(() => {
            if (this.isActive) {
                this.elements.traditionalAnalogy.style.opacity = '0.6';
                this.elements.digitalAnalogy.style.animation = 'victoryPulse 2s ease-out';
                PresentationUtils.createRipple(this.elements.digitalAnalogy, 'var(--success-green)');
            }
        }, 4500);
    }

    /**
     * Highlights the security guarantee
     */
    highlightSecurity() {
        // Reset comparisons
        this.clearComparisonHighlights();

        // Phase 1: Dramatic security highlight
        setTimeout(() => {
            if (this.isActive) {
                this.elements.securityGuarantee.classList.add('highlighted');
                this.elements.securityGuarantee.style.animation = 'securityShield 3s ease-out';
                PresentationUtils.createParticles(this.elements.securityGuarantee, 12, 3000);
            }
        }, 500);

        // Phase 2: Glow both keys to show they work together
        setTimeout(() => {
            if (this.isActive) {
                this.elements.privateKeyContainer.classList.add('security-glow');
                this.elements.publicKeyContainer.classList.add('security-glow');
                
                // Create connection particles
                PresentationUtils.createParticles(this.elements.keyConnection, 6, 2000);
            }
        }, 2000);

        // Phase 3: Final emphasis
        setTimeout(() => {
            if (this.isActive) {
                this.elements.keysDisplay.style.animation = 'finalGlow 2s ease-out';
            }
        }, 4000);
    }

    /**
     * Clears key highlights
     */
    clearKeyHighlights() {
        this.elements.privateKeyContainer.classList.remove('highlighted');
        this.elements.publicKeyContainer.classList.remove('highlighted');
        this.elements.keysDisplay.classList.remove('synchronized');
        this.elements.keyConnection.classList.remove('active');
        
        this.elements.privateKeyGlow.style.animation = '';
        this.elements.publicKeyGlow.style.animation = '';
    }

    /**
     * Clears comparison highlights
     */
    clearComparisonHighlights() {
        this.elements.traditionalAnalogy.classList.remove('highlighted');
        this.elements.digitalAnalogy.classList.remove('highlighted');
        this.elements.traditionalAnalogy.style.opacity = '';
        this.elements.digitalAnalogy.style.animation = '';
        
        // Reset analogy points
        const points = this.elements.analogySection.querySelectorAll('.analogy-point');
        points.forEach(point => {
            point.style.animation = '';
            point.style.color = '';
        });
    }

    /**
     * Updates the display with current values
     */
    updateDisplay() {
        // Set initial clean state
        this.clearAllAnimations();
    }

    /**
     * Clears all active animations
     */
    clearAllAnimations() {
        this.clearKeyHighlights();
        this.clearComparisonHighlights();
        
        // Clear security highlight
        this.elements.securityGuarantee.classList.remove('highlighted');
        this.elements.securityGuarantee.style.animation = '';
        
        // Clear security glow
        this.elements.privateKeyContainer.classList.remove('security-glow');
        this.elements.publicKeyContainer.classList.remove('security-glow');
        this.elements.keysDisplay.style.animation = '';
    }

    /**
     * Gets the current animation status
     * @returns {Object} Status information
     */
    getStatus() {
        return {
            isActive: this.isActive,
            currentPhase: this.currentAnimationPhase,
            controller: this.animationController.getStatus()
        };
    }
}

// Register the slide class
if (typeof window.slideClasses === 'undefined') {
    window.slideClasses = {};
}
window.slideClasses['signatures-part1'] = SignaturesPart1Demo;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SignaturesPart1Demo;
}