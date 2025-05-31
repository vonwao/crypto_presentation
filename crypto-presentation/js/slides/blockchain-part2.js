// js/slides/blockchain-part2.js
// Second part: Why blockchain creates unbreakable security

class BlockchainPart2Demo {
    constructor() {
        this.securityDemos = [
            {
                title: "Immutable History",
                description: "Changing any past transaction requires recalculating all subsequent blocks",
                icon: "🛡️"
            },
            {
                title: "Instant Verification", 
                description: "Merkle trees allow verification without downloading the entire blockchain",
                icon: "⚡"
            },
            {
                title: "Cryptographic Proof",
                description: "Digital signatures ensure only authorized parties can create transactions",
                icon: "🔍"
            },
            {
                title: "Decentralized Trust",
                description: "No central authority needed - math provides the guarantee",
                icon: "🌍"
            }
        ];
        
        this.attackScenarios = [
            {
                name: "Transaction Tampering",
                description: "Attempt to change a past transaction",
                breakagePoint: "Hash mismatch detected immediately"
            },
            {
                name: "Block Insertion",
                description: "Try to insert a fake block in the middle",
                breakagePoint: "Chain continuity broken - invalid previous hash"
            },
            {
                name: "Signature Forgery",
                description: "Attempt to forge a digital signature",
                breakagePoint: "Mathematical verification fails"
            }
        ];
        
        this.currentAnimationPhase = 0;
        this.animationController = new AnimationController(9000); // 9 second cycles
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
                    <p class="subtitle">Mathematical guarantees without central authority</p>
                </div>
                
                <div class="slide-content">
                    <div class="security-demonstration">
                        <div class="attack-simulation" id="attackSimulation">
                            <h3 class="demo-title">🎯 Attack Simulation</h3>
                            <div class="attack-scenario" id="attackScenario">
                                <div class="scenario-description">
                                    <div class="attacker-icon">👤</div>
                                    <div class="attack-details">
                                        <div class="attack-name" id="attackName">Transaction Tampering</div>
                                        <div class="attack-description" id="attackDescription">
                                            Attempt to change a past transaction
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="attack-visualization" id="attackVisualization">
                                    <div class="blockchain-mini">
                                        <div class="mini-block" id="targetBlock">
                                            <div class="block-label">Block #2</div>
                                            <div class="block-content">
                                                <div class="transaction" id="targetTransaction">
                                                    Alice→Bob: $50
                                                </div>
                                                <div class="block-hash" id="targetHash">
                                                    7g8h9i...
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="chain-arrow">→</div>
                                        
                                        <div class="mini-block" id="nextBlock">
                                            <div class="block-label">Block #3</div>
                                            <div class="block-content">
                                                <div class="prev-hash-ref" id="prevHashRef">
                                                    Prev: 7g8h9i...
                                                </div>
                                                <div class="block-hash">
                                                    m4n5o6...
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="attack-result" id="attackResult">
                                        <div class="result-icon" id="resultIcon">⚠️</div>
                                        <div class="result-message" id="resultMessage">
                                            Attempting attack...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="security-features" id="securityFeatures">
                            <h3 class="demo-title">🔒 Security Guarantees</h3>
                            <div class="features-grid">
                                ${this.securityDemos.map((feature, index) => `
                                    <div class="security-feature" id="feature${index}" data-feature="${index}">
                                        <div class="feature-icon">${feature.icon}</div>
                                        <div class="feature-content">
                                            <h4 class="feature-title">${feature.title}</h4>
                                            <p class="feature-description">${feature.description}</p>
                                        </div>
                                        <div class="feature-status" id="featureStatus${index}">
                                            <div class="status-indicator">✓</div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="trust-comparison" id="trustComparison">
                            <h3 class="demo-title">🏛️ Traditional vs Blockchain Trust</h3>
                            <div class="comparison-grid">
                                <div class="trust-model traditional" id="traditionalModel">
                                    <div class="model-header">
                                        <div class="model-icon">🏦</div>
                                        <h4>Traditional System</h4>
                                    </div>
                                    <div class="trust-flow">
                                        <div class="trust-node central">
                                            <div class="node-label">Central Authority</div>
                                            <div class="node-description">Bank, Government, Company</div>
                                        </div>
                                        <div class="trust-connections">
                                            <div class="connection-line"></div>
                                            <div class="connection-line"></div>
                                            <div class="connection-line"></div>
                                        </div>
                                        <div class="trust-participants">
                                            <div class="participant">User A</div>
                                            <div class="participant">User B</div>
                                            <div class="participant">User C</div>
                                        </div>
                                    </div>
                                    <div class="model-issues">
                                        <div class="issue">❌ Single point of failure</div>
                                        <div class="issue">❌ Requires trust in authority</div>
                                        <div class="issue">❌ Can be corrupted or hacked</div>
                                    </div>
                                </div>

                                <div class="trust-model blockchain" id="blockchainModel">
                                    <div class="model-header">
                                        <div class="model-icon">⛓️</div>
                                        <h4>Blockchain System</h4>
                                    </div>
                                    <div class="trust-flow">
                                        <div class="trust-network">
                                            <div class="network-node">A</div>
                                            <div class="network-node">B</div>
                                            <div class="network-node">C</div>
                                            <div class="network-node">D</div>
                                            <div class="network-connections"></div>
                                        </div>
                                        <div class="math-guarantee">
                                            <div class="guarantee-icon">📐</div>
                                            <div class="guarantee-text">Mathematical Proof</div>
                                        </div>
                                    </div>
                                    <div class="model-benefits">
                                        <div class="benefit">✅ No single point of failure</div>
                                        <div class="benefit">✅ Trust through mathematics</div>
                                        <div class="benefit">✅ Transparent and verifiable</div>
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
                            <span><strong>Complete System:</strong> Each piece reinforces the others for maximum security</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">🧮</span>
                            <span><strong>Mathematical Trust:</strong> No human institutions required - pure math</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">🚀</span>
                            <span><strong>Revolutionary:</strong> This enables programmable money, smart contracts, and Web3</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Activates the blockchain part 2 animations
     */
    activate() {
        if (this.isActive) return;
        this.isActive = true;
        
        PresentationUtils.debug('Activating Blockchain Part 2 Demo');
        
        // Get element references
        this.elements = {
            attackSimulation: document.getElementById('attackSimulation'),
            attackScenario: document.getElementById('attackScenario'),
            securityFeatures: document.getElementById('securityFeatures'),
            trustComparison: document.getElementById('trustComparison'),
            attackName: document.getElementById('attackName'),
            attackDescription: document.getElementById('attackDescription'),
            targetTransaction: document.getElementById('targetTransaction'),
            targetHash: document.getElementById('targetHash'),
            prevHashRef: document.getElementById('prevHashRef'),
            attackResult: document.getElementById('attackResult'),
            resultIcon: document.getElementById('resultIcon'),
            resultMessage: document.getElementById('resultMessage')
        };

        this.getElementReferences();
        
        if (!this.elements.attackSimulation) {
            console.warn('Blockchain part 2 elements not found, skipping activation');
            return;
        }

        // Set up animation callback
        this.animationController.addCallback(() => this.runSecurityDemo());
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
        
        PresentationUtils.debug('Deactivating Blockchain Part 2 Demo');
        
        // Stop animation controller
        this.animationController.stop();
        
        // Clean up animations
        this.clearAllAnimations();
    }

    /**
     * Gets references to elements
     */
    getElementReferences() {
        this.elements.features = [];
        this.elements.blocks = {
            target: document.getElementById('targetBlock'),
            next: document.getElementById('nextBlock')
        };
        
        // Get security feature references
        this.securityDemos.forEach((feature, index) => {
            this.elements.features.push({
                container: document.getElementById(`feature${index}`),
                status: document.getElementById(`featureStatus${index}`)
            });
        });
    }

    /**
     * Runs the main security demonstration sequence
     */
    runSecurityDemo() {
        if (!this.isActive) return;
        
        this.currentAnimationPhase = (this.currentAnimationPhase + 1) % 4;
        
        PresentationUtils.debug(`Security demo phase: ${this.currentAnimationPhase}`);
        
        // Clear previous animations
        this.clearAllAnimations();
        
        switch (this.currentAnimationPhase) {
            case 0:
                this.simulateTransactionTampering();
                break;
            case 1:
                this.demonstrateSecurityFeatures();
                break;
            case 2:
                this.simulateBlockInsertion();
                break;
            case 3:
                this.compareTrustModels();
                break;
        }
    }

    /**
     * Simulates transaction tampering attack
     */
    simulateTransactionTampering() {
        const scenario = this.attackScenarios[0];
        
        // Update attack details
        this.elements.attackName.textContent = scenario.name;
        this.elements.attackDescription.textContent = scenario.description;
        
        // Reset to normal state
        this.elements.targetTransaction.textContent = "Alice→Bob: $50";
        this.elements.targetTransaction.style.color = "var(--text-primary)";
        this.elements.resultIcon.textContent = "⚠️";
        this.elements.resultMessage.textContent = "Attempting attack...";
        
        // Step 1: Highlight target transaction
        setTimeout(() => {
            if (this.isActive) {
                this.elements.blocks.target.classList.add('attack-target');
                PresentationUtils.createRipple(this.elements.blocks.target, 'var(--alert-red)');
            }
        }, 500);
        
        // Step 2: Show tampering
        setTimeout(() => {
            if (this.isActive) {
                this.elements.targetTransaction.textContent = "Alice→Bob: $5000";
                this.elements.targetTransaction.style.color = "var(--alert-red)";
                this.elements.targetTransaction.style.animation = "tamperShake 0.5s infinite";
            }
        }, 1500);
        
        // Step 3: Show hash change
        setTimeout(() => {
            if (this.isActive) {
                this.elements.targetHash.textContent = "CHANGED!";
                this.elements.targetHash.style.color = "var(--alert-red)";
                this.elements.targetHash.style.animation = "highlight 1s infinite";
            }
        }, 2500);
        
        // Step 4: Show chain break
        setTimeout(() => {
            if (this.isActive) {
                this.elements.prevHashRef.style.color = "var(--alert-red)";
                this.elements.prevHashRef.style.animation = "highlight 1s infinite";
                this.elements.blocks.next.classList.add('chain-broken');
            }
        }, 3500);
        
        // Step 5: Show failure
        setTimeout(() => {
            if (this.isActive) {
                this.elements.resultIcon.textContent = "❌";
                this.elements.resultMessage.textContent = scenario.breakagePoint;
                this.elements.attackResult.style.background = "rgba(255, 71, 87, 0.1)";
                this.elements.attackResult.style.borderColor = "var(--alert-red)";
            }
        }, 4500);
    }

    /**
     * Demonstrates security features
     */
    demonstrateSecurityFeatures() {
        // Reset attack visualization
        this.resetAttackVisualization();
        
        // Highlight security features one by one
        this.elements.features.forEach((feature, index) => {
            setTimeout(() => {
                if (this.isActive) {
                    feature.container.classList.add('active');
                    feature.status.style.animation = "bounce 1s ease-out";
                    PresentationUtils.createRipple(feature.container, 'var(--success-green)');
                }
            }, index * 800);
        });
        
        // Create overall security pulse
        setTimeout(() => {
            if (this.isActive) {
                this.elements.securityFeatures.style.animation = "securityPulse 2s ease-out";
            }
        }, 3000);
    }

    /**
     * Simulates block insertion attack
     */
    simulateBlockInsertion() {
        const scenario = this.attackScenarios[1];
        
        // Update attack details
        this.elements.attackName.textContent = scenario.name;
        this.elements.attackDescription.textContent = scenario.description;
        
        // Reset attack visualization
        this.resetAttackVisualization();
        
        // Show fake block insertion attempt
        setTimeout(() => {
            if (this.isActive) {
                const fakeBlock = document.createElement('div');
                fakeBlock.className = 'mini-block fake-block';
                fakeBlock.innerHTML = `
                    <div class="block-label">Fake Block</div>
                    <div class="block-content">
                        <div class="transaction">Hacker→Self: $1M</div>
                        <div class="block-hash">FAKE123...</div>
                    </div>
                `;
                
                const visualization = this.elements.attackScenario.querySelector('.attack-visualization .blockchain-mini');
                visualization.insertBefore(fakeBlock, visualization.querySelector('.chain-arrow'));
                
                fakeBlock.style.animation = "fakeBlockInsert 2s ease-out";
            }
        }, 1000);
        
        // Show chain rejection
        setTimeout(() => {
            if (this.isActive) {
                this.elements.resultIcon.textContent = "❌";
                this.elements.resultMessage.textContent = scenario.breakagePoint;
                this.elements.attackResult.style.background = "rgba(255, 71, 87, 0.1)";
                
                // Remove fake block
                const fakeBlock = document.querySelector('.fake-block');
                if (fakeBlock) {
                    fakeBlock.style.animation = "fadeOut 1s ease-out";
                    setTimeout(() => fakeBlock.remove(), 1000);
                }
            }
        }, 3000);
    }

    /**
     * Compares traditional vs blockchain trust models
     */
    compareTrustModels() {
        // Reset attack visualization
        this.resetAttackVisualization();
        
        // Hide attack simulation, focus on trust comparison
        this.elements.attackSimulation.style.opacity = "0.3";
        this.elements.trustComparison.style.transform = "scale(1.05)";
        this.elements.trustComparison.style.background = "rgba(0, 212, 255, 0.1)";
        
        // Animate traditional model issues
        const traditionalModel = document.getElementById('traditionalModel');
        const issues = traditionalModel.querySelectorAll('.issue');
        
        issues.forEach((issue, index) => {
            setTimeout(() => {
                if (this.isActive) {
                    issue.style.animation = "highlight 2s infinite";
                    issue.style.color = "var(--alert-red)";
                }
            }, index * 500);
        });
        
        // Animate blockchain model benefits
        setTimeout(() => {
            if (this.isActive) {
                const blockchainModel = document.getElementById('blockchainModel');
                const benefits = blockchainModel.querySelectorAll('.benefit');
                
                benefits.forEach((benefit, index) => {
                    setTimeout(() => {
                        if (this.isActive) {
                            benefit.style.animation = "fadeInScale 1s ease-out";
                            benefit.style.color = "var(--success-green)";
                        }
                    }, index * 400);
                });
                
                // Highlight mathematical guarantee
                const mathGuarantee = blockchainModel.querySelector('.math-guarantee');
                mathGuarantee.style.animation = "pulse 2s infinite";
                mathGuarantee.style.background = "var(--primary-gold)";
                mathGuarantee.style.color = "white";
            }
        }, 2000);
    }

    /**
     * Resets the attack visualization to clean state
     */
    resetAttackVisualization() {
        // Reset attack simulation visibility
        this.elements.attackSimulation.style.opacity = "1";
        this.elements.trustComparison.style.transform = "scale(1)";
        this.elements.trustComparison.style.background = "";
        
        // Reset transaction
        this.elements.targetTransaction.textContent = "Alice→Bob: $50";
        this.elements.targetTransaction.style.color = "var(--text-primary)";
        this.elements.targetTransaction.style.animation = "";
        
        // Reset hashes
        this.elements.targetHash.textContent = "7g8h9i...";
        this.elements.targetHash.style.color = "var(--primary-blue)";
        this.elements.targetHash.style.animation = "";
        
        this.elements.prevHashRef.style.color = "var(--text-secondary)";
        this.elements.prevHashRef.style.animation = "";
        
        // Reset result
        this.elements.resultIcon.textContent = "🛡️";
        this.elements.resultMessage.textContent = "Blockchain security active";
        this.elements.attackResult.style.background = "rgba(0, 255, 136, 0.1)";
        this.elements.attackResult.style.borderColor = "var(--success-green)";
        
        // Reset blocks
        if (this.elements.blocks.target) {
            this.elements.blocks.target.classList.remove('attack-target');
        }
        if (this.elements.blocks.next) {
            this.elements.blocks.next.classList.remove('chain-broken');
        }
        
        // Remove any fake blocks
        const fakeBlocks = document.querySelectorAll('.fake-block');
        fakeBlocks.forEach(block => block.remove());
    }

    /**
     * Updates the display with current values
     */
    updateDisplay() {
        // Set initial state
        this.resetAttackVisualization();
    }

    /**
     * Clears all active animations
     */
    clearAllAnimations() {
        // Clear feature highlights
        this.elements.features.forEach(feature => {
            if (feature.container) {
                feature.container.classList.remove('active');
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
        
        // Clear math guarantee highlight
        const mathGuarantee = document.querySelector('.math-guarantee');
        if (mathGuarantee) {
            mathGuarantee.style.animation = "";
            mathGuarantee.style.background = "";
            mathGuarantee.style.color = "";
        }
        
        // Reset security features animation
        if (this.elements.securityFeatures) {
            this.elements.securityFeatures.style.animation = "";
        }
    }

    /**
     * Gets the current animation status
     * @returns {Object} Status information
     */
    getStatus() {
        return {
            isActive: this.isActive,
            currentPhase: this.currentAnimationPhase,
            attackScenarios: this.attackScenarios.length,
            securityFeatures: this.securityDemos.length,
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