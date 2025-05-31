// js/slides/blockchain-part2.js
// Simplified blockchain security explanation - Phase 1 Content Simplification

class BlockchainPart2Demo {
    constructor() {
        // Simple security benefits in plain English
        this.securityBenefits = [
            {
                title: "No Single Point of Failure",
                description: "No one computer controls everything",
                icon: "🌐"
            },
            {
                title: "Math Provides the Proof", 
                description: "Cryptography makes cheating impossible",
                icon: "🧮"
            },
            {
                title: "Everyone Can Verify",
                description: "Anyone can check the math themselves",
                icon: "✅"
            }
        ];
        
        this.currentSubSlide = 0;
        this.animationController = new AnimationController(6000); // 6 second cycles
        this.isActive = false;
        this.elements = {};
    }

    /**
     * Creates the HTML structure for blockchain part 2
     * @returns {string} HTML string
     */
    createSlideHTML() {
        return `
            <div class="slide" data-slide="blockchain-part2">
                <div class="slide-header">
                    <h1>Why This Creates Unbreakable Security</h1>
                    <p class="subtitle">Simple explanations of revolutionary trust</p>
                </div>
                
                <div class="slide-content">
                    <div class="blockchain-security-demo">
                        
                        <!-- Sub-slide 1: Why Tampering Fails -->
                        <div class="security-section tampering-demo" id="tamperingDemo">
                            <h2 class="section-title">🎯 Why Tampering Fails</h2>
                            <div class="tampering-explanation">
                                <div class="simple-blockchain">
                                    <div class="simple-block" id="originalBlock">
                                        <div class="block-label">Block #2</div>
                                        <div class="transaction" id="originalTransaction">
                                            Alice → Bob: $50
                                        </div>
                                        <div class="block-hash" id="originalHash">
                                            Hash: abc123...
                                        </div>
                                    </div>
                                    
                                    <div class="chain-arrow">→</div>
                                    
                                    <div class="simple-block" id="nextBlock">
                                        <div class="block-label">Block #3</div>
                                        <div class="prev-reference" id="prevReference">
                                            Previous: abc123...
                                        </div>
                                        <div class="block-hash">
                                            Hash: def456...
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="tampering-result" id="tamperingResult">
                                    <div class="result-icon">🛡️</div>
                                    <div class="result-text">
                                        <strong>Try to change anything = everything breaks</strong>
                                        <p>Hash mismatch detected instantly</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Sub-slide 2: Security Benefits -->
                        <div class="security-section benefits-demo" id="benefitsDemo">
                            <h2 class="section-title">🔒 Security Benefits</h2>
                            <div class="benefits-grid">
                                ${this.securityBenefits.map((benefit, index) => `
                                    <div class="benefit-card" id="benefit${index}" data-benefit="${index}">
                                        <div class="benefit-icon">${benefit.icon}</div>
                                        <div class="benefit-content">
                                            <h3 class="benefit-title">${benefit.title}</h3>
                                            <p class="benefit-description">${benefit.description}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Sub-slide 3: Revolutionary Trust -->
                        <div class="security-section trust-demo" id="trustDemo">
                            <h2 class="section-title">🏛️ Revolutionary Trust</h2>
                            <div class="trust-comparison">
                                <div class="trust-model old-way" id="oldWay">
                                    <div class="model-header">
                                        <div class="model-icon">🏦</div>
                                        <h3>Old Way</h3>
                                    </div>
                                    <div class="trust-description">
                                        <p><strong>"Trust the bank"</strong></p>
                                        <p>Single point of control</p>
                                        <div class="trust-issues">
                                            <div class="issue">❌ Can be hacked</div>
                                            <div class="issue">❌ Can be corrupted</div>
                                            <div class="issue">❌ Can fail</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="vs-divider">VS</div>

                                <div class="trust-model new-way" id="newWay">
                                    <div class="model-header">
                                        <div class="model-icon">⛓️</div>
                                        <h3>New Way</h3>
                                    </div>
                                    <div class="trust-description">
                                        <p><strong>"Trust the math"</strong></p>
                                        <p>Distributed proof</p>
                                        <div class="trust-benefits">
                                            <div class="benefit">✅ No middleman needed</div>
                                            <div class="benefit">✅ Math can't lie</div>
                                            <div class="benefit">✅ Everyone can verify</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="slide-footer">
                    <div class="key-points">
                        <div class="key-point">
                            <span class="bullet">🎯</span>
                            <span><strong>Unbreakable:</strong> Changing anything breaks the mathematical proof</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">🧮</span>
                            <span><strong>Trustless:</strong> No human institutions required - pure mathematics</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">🚀</span>
                            <span><strong>Revolutionary:</strong> This enables programmable money and Web3</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Creates HTML for a specific sub-slide
     * @param {string} subSlideId - The sub-slide identifier
     * @param {Array} sections - Array of section identifiers to include
     * @returns {string} HTML string for the sub-slide
     */
    createSubSlideHTML(subSlideId, sections) {
        const fullHTML = this.createSlideHTML();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = fullHTML;
        
        const slideElement = tempDiv.querySelector('.slide');
        slideElement.setAttribute('data-slide', subSlideId);
        
        // Update header based on sub-slide
        this.updateSubSlideHeader(slideElement, subSlideId);
        
        // Filter content to show only specified sections
        this.filterContentSections(slideElement, sections);
        
        return slideElement.outerHTML;
    }

    /**
     * Updates the slide header for a specific sub-slide
     */
    updateSubSlideHeader(slideElement, subSlideId) {
        const header = slideElement.querySelector('.slide-header');
        if (!header) return;

        const title = header.querySelector('h1');
        const subtitle = header.querySelector('.subtitle');

        switch (subSlideId) {
            case 'blockchain-2-tampering':
                if (title) title.textContent = 'Why Tampering Fails';
                if (subtitle) subtitle.textContent = 'One clear example of why you can\'t change blockchain';
                break;
            case 'blockchain-2-benefits':
                if (title) title.textContent = 'Security Benefits';
                if (subtitle) subtitle.textContent = 'Three key benefits in plain language';
                break;
            case 'blockchain-2-trust':
                if (title) title.textContent = 'Revolutionary Trust';
                if (subtitle) subtitle.textContent = 'Old way vs New way - no middleman needed';
                break;
        }
    }

    /**
     * Filters content sections based on sub-slide requirements
     */
    filterContentSections(slideElement, sections) {
        const content = slideElement.querySelector('.slide-content');
        if (!content) return;

        // Hide all sections initially
        const allSections = content.querySelectorAll('.security-section');
        allSections.forEach(section => {
            section.style.display = 'none';
        });

        // Show only specified sections
        sections.forEach(sectionId => {
            switch (sectionId) {
                case 'tampering-demo':
                    const tamperingDemo = content.querySelector('.tampering-demo');
                    if (tamperingDemo) {
                        tamperingDemo.style.display = 'block';
                    }
                    break;
                case 'benefits-demo':
                    const benefitsDemo = content.querySelector('.benefits-demo');
                    if (benefitsDemo) {
                        benefitsDemo.style.display = 'block';
                    }
                    break;
                case 'trust-demo':
                    const trustDemo = content.querySelector('.trust-demo');
                    if (trustDemo) {
                        trustDemo.style.display = 'block';
                    }
                    break;
            }
        });
        
    }

    /**
     * Activates the blockchain part 2 animations
     */
    activate() {
        if (this.isActive) return;
        this.isActive = true;
        
        PresentationUtils.debug('Activating Simplified Blockchain Part 2 Demo');
        
        // Get element references
        this.elements = {
            tamperingDemo: document.getElementById('tamperingDemo'),
            benefitsDemo: document.getElementById('benefitsDemo'),
            trustDemo: document.getElementById('trustDemo'),
            originalTransaction: document.getElementById('originalTransaction'),
            originalHash: document.getElementById('originalHash'),
            prevReference: document.getElementById('prevReference'),
            tamperingResult: document.getElementById('tamperingResult'),
            oldWay: document.getElementById('oldWay'),
            newWay: document.getElementById('newWay')
        };

        this.getElementReferences();
        
        if (!this.elements.tamperingDemo && !this.elements.benefitsDemo && !this.elements.trustDemo) {
            console.warn('Blockchain part 2 elements not found, skipping activation');
            return;
        }

        // Set up animation callback
        this.animationController.addCallback(() => this.runSimpleDemo());
        this.animationController.start();
        
        // Initial setup
        this.updateDisplay();
    }

    /**
     * Deactivates the blockchain part 2 animations
     */
    deactivate() {
        if (!this.isActive) return;
        this.isActive = false;
        
        PresentationUtils.debug('Deactivating Simplified Blockchain Part 2 Demo');
        
        // Stop animation controller
        this.animationController.stop();
        
        // Clean up animations
        this.clearAllAnimations();
    }

    /**
     * Gets references to elements
     */
    getElementReferences() {
        // Get benefit card references
        this.elements.benefits = [];
        this.securityBenefits.forEach((benefit, index) => {
            const benefitElement = document.getElementById(`benefit${index}`);
            if (benefitElement) {
                this.elements.benefits.push(benefitElement);
            }
        });
    }

    /**
     * Runs the simplified demonstration sequence
     */
    runSimpleDemo() {
        if (!this.isActive) return;
        
        this.currentSubSlide = (this.currentSubSlide + 1) % 3;
        
        PresentationUtils.debug(`Simple demo phase: ${this.currentSubSlide}`);
        
        // Clear previous animations
        this.clearAllAnimations();
        
        switch (this.currentSubSlide) {
            case 0:
                this.demonstrateTampering();
                break;
            case 1:
                this.highlightBenefits();
                break;
            case 2:
                this.compareTrustModels();
                break;
        }
    }

    /**
     * Simple tampering demonstration
     */
    demonstrateTampering() {
        if (!this.elements.originalTransaction) return;
        
        // Step 1: Show normal state
        this.elements.originalTransaction.style.color = "var(--text-primary)";
        this.elements.originalHash.style.color = "var(--primary-blue)";
        this.elements.prevReference.style.color = "var(--text-secondary)";
        
        // Step 2: Attempt tampering
        setTimeout(() => {
            if (this.isActive && this.elements.originalTransaction) {
                this.elements.originalTransaction.textContent = "Alice → Bob: $5000";
                this.elements.originalTransaction.style.color = "var(--alert-red)";
                this.elements.originalTransaction.style.animation = "shake 0.5s infinite";
            }
        }, 1000);
        
        // Step 3: Show hash change
        setTimeout(() => {
            if (this.isActive && this.elements.originalHash) {
                this.elements.originalHash.textContent = "Hash: CHANGED!";
                this.elements.originalHash.style.color = "var(--alert-red)";
                this.elements.originalHash.style.animation = "highlight 1s infinite";
            }
        }, 2000);
        
        // Step 4: Show mismatch
        setTimeout(() => {
            if (this.isActive && this.elements.prevReference) {
                this.elements.prevReference.style.color = "var(--alert-red)";
                this.elements.prevReference.style.animation = "highlight 1s infinite";
            }
        }, 3000);
        
        // Step 5: Show failure result
        setTimeout(() => {
            if (this.isActive && this.elements.tamperingResult) {
                this.elements.tamperingResult.style.background = "rgba(255, 71, 87, 0.1)";
                this.elements.tamperingResult.style.borderColor = "var(--alert-red)";
                this.elements.tamperingResult.style.animation = "pulse 2s ease-out";
            }
        }, 4000);
        
        // Step 6: Reset for next cycle
        setTimeout(() => {
            if (this.isActive) {
                this.resetTamperingDemo();
            }
        }, 5000);
    }

    /**
     * Highlight security benefits one by one
     */
    highlightBenefits() {
        this.elements.benefits.forEach((benefit, index) => {
            setTimeout(() => {
                if (this.isActive && benefit) {
                    benefit.classList.add('active');
                    benefit.style.animation = "fadeInScale 1s ease-out";
                    PresentationUtils.createRipple(benefit, 'var(--success-green)');
                }
            }, index * 1000);
        });
    }

    /**
     * Compare trust models
     */
    compareTrustModels() {
        // Highlight old way issues
        if (this.elements.oldWay) {
            const issues = this.elements.oldWay.querySelectorAll('.issue');
            issues.forEach((issue, index) => {
                setTimeout(() => {
                    if (this.isActive) {
                        issue.style.animation = "highlight 2s infinite";
                        issue.style.color = "var(--alert-red)";
                    }
                }, index * 500);
            });
        }
        
        // Highlight new way benefits
        setTimeout(() => {
            if (this.isActive && this.elements.newWay) {
                const benefits = this.elements.newWay.querySelectorAll('.benefit');
                benefits.forEach((benefit, index) => {
                    setTimeout(() => {
                        if (this.isActive) {
                            benefit.style.animation = "fadeInScale 1s ease-out";
                            benefit.style.color = "var(--success-green)";
                        }
                    }, index * 400);
                });
                
                // Highlight the whole new way
                this.elements.newWay.style.animation = "pulse 2s infinite";
                this.elements.newWay.style.background = "rgba(0, 255, 136, 0.1)";
            }
        }, 2000);
    }

    /**
     * Reset tampering demonstration
     */
    resetTamperingDemo() {
        if (this.elements.originalTransaction) {
            this.elements.originalTransaction.textContent = "Alice → Bob: $50";
            this.elements.originalTransaction.style.color = "var(--text-primary)";
            this.elements.originalTransaction.style.animation = "";
        }
        
        if (this.elements.originalHash) {
            this.elements.originalHash.textContent = "Hash: abc123...";
            this.elements.originalHash.style.color = "var(--primary-blue)";
            this.elements.originalHash.style.animation = "";
        }
        
        if (this.elements.prevReference) {
            this.elements.prevReference.style.color = "var(--text-secondary)";
            this.elements.prevReference.style.animation = "";
        }
        
        if (this.elements.tamperingResult) {
            this.elements.tamperingResult.style.background = "rgba(0, 255, 136, 0.1)";
            this.elements.tamperingResult.style.borderColor = "var(--success-green)";
            this.elements.tamperingResult.style.animation = "";
        }
    }

    /**
     * Updates the display with current values
     */
    updateDisplay() {
        // Set initial clean state
        this.resetTamperingDemo();
    }

    /**
     * Clears all active animations
     */
    clearAllAnimations() {
        // Clear benefit highlights
        this.elements.benefits.forEach(benefit => {
            if (benefit) {
                benefit.classList.remove('active');
                benefit.style.animation = "";
            }
        });
        
        // Clear trust comparison highlights
        const issues = document.querySelectorAll('.issue');
        const benefits = document.querySelectorAll('.benefit');
        
        issues.forEach(issue => {
            issue.style.animation = "";
            issue.style.color = "";
        });
        
        benefits.forEach(benefit => {
            benefit.style.animation = "";
            benefit.style.color = "";
        });
        
        // Clear trust model highlights
        if (this.elements.oldWay) {
            this.elements.oldWay.style.animation = "";
            this.elements.oldWay.style.background = "";
        }
        
        if (this.elements.newWay) {
            this.elements.newWay.style.animation = "";
            this.elements.newWay.style.background = "";
        }
    }

    /**
     * Gets the current animation status
     * @returns {Object} Status information
     */
    getStatus() {
        return {
            isActive: this.isActive,
            currentSubSlide: this.currentSubSlide,
            securityBenefits: this.securityBenefits.length,
            controller: this.animationController.getStatus()
        };
    }
}

// Register the slide class
if (typeof window.slideClasses === 'undefined') {
    window.slideClasses = {};
}
window.slideClasses['blockchain-part2'] = BlockchainPart2Demo;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlockchainPart2Demo;
}