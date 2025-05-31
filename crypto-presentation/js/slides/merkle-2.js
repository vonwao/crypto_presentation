// js/slides/merkle-part2.js
// Merkle Trees Part 2: Proof of Inclusion and Tamper Detection

class MerklePart2Demo {
    constructor() {
        this.transactions = [
            { id: 'TX1', content: 'Alice → Bob: $50', hash: 'a1b2c3...' },
            { id: 'TX2', content: 'Charlie → Alice: $25', hash: 'd4e5f6...' },
            { id: 'TX3', content: 'Bob → David: $30', hash: 'g7h8i9...' },
            { id: 'TX4', content: 'Eve → Charlie: $15', hash: 'j1k2l3...' }
        ];
        
        this.selectedTxIndex = 0;
        this.currentAnimationPhase = 0;
        this.animationController = new AnimationController(8000); // 8 second cycles
        this.isActive = false;
        this.elements = {};
        
        // Pre-calculate tree structure
        this.calculateTreeHashes();
    }

    /**
     * Creates the HTML structure for merkle part 2
     * @returns {string} HTML string
     */
    createSlideHTML() {
        return `
            <div class="slide" data-slide="merkle-part2">
                <div class="slide-header">
                    <h1>Merkle Trees: Verification & Security</h1>
                    <p class="subtitle">Proving inclusion and detecting tampering</p>
                </div>
                
                <div class="slide-content">
                    <div class="verification-demo">
                        
                        <div class="proof-demo" id="proofDemo">
                            <h2 class="demo-title">Proof of Inclusion</h2>
                            <div class="demo-content">
                                <div class="proof-question" id="proofQuestion">
                                    <div class="question-icon">🕵️</div>
                                    <div class="question-text">
                                        <h3>Question:</h3>
                                        <p>Is "<span id="targetTransaction">Alice → Bob: $50</span>" included in this block?</p>
                                    </div>
                                </div>
                                
                                <div class="proof-process" id="proofProcess">
                                    <div class="proof-step" id="proofStep1">
                                        <div class="step-number">1</div>
                                        <div class="step-content">
                                            <h4>Get Transaction Hash</h4>
                                            <code id="txHash">a1b2c3...</code>
                                        </div>
                                    </div>
                                    
                                    <div class="proof-step" id="proofStep2">
                                        <div class="step-number">2</div>
                                        <div class="step-content">
                                            <h4>Get Sibling Hashes</h4>
                                            <div class="sibling-hashes" id="siblingHashes">
                                                <code class="sibling">d4e5f6...</code>
                                                <code class="sibling">m4n5o6...</code>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="proof-step" id="proofStep3">
                                        <div class="step-number">3</div>
                                        <div class="step-content">
                                            <h4>Compute Path to Root</h4>
                                            <div class="computation" id="computation">
                                                <div class="compute-step">Hash(TX1 + TX2) = p7q8r9...</div>
                                                <div class="compute-step">Hash(AB + CD) = s1t2u3...</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="proof-result" id="proofResult">
                                        <div class="result-icon" id="resultIcon">✅</div>
                                        <div class="result-text" id="resultText">
                                            Matches Merkle Root! Transaction verified in 3 steps.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="efficiency-showcase" id="efficiencyShowcase">
                            <h2 class="showcase-title">Why This Is Amazing</h2>
                            <div class="efficiency-comparison">
                                <div class="comparison-item slow-way">
                                    <div class="method-icon">🐌</div>
                                    <h4>Traditional Way</h4>
                                    <div class="method-stats">
                                        <div class="stat">Download: <span class="bad">500 GB</span></div>
                                        <div class="stat">Time: <span class="bad">Hours</span></div>
                                        <div class="stat">Cost: <span class="bad">$$$</span></div>
                                    </div>
                                </div>
                                
                                <div class="vs-divider">VS</div>
                                
                                <div class="comparison-item fast-way">
                                    <div class="method-icon">⚡</div>
                                    <h4>Merkle Tree Way</h4>
                                    <div class="method-stats">
                                        <div class="stat">Download: <span class="good">1 KB</span></div>
                                        <div class="stat">Time: <span class="good">Instant</span></div>
                                        <div class="stat">Cost: <span class="good">$0.01</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tamper-demo" id="tamperDemo">
                            <h2 class="demo-title">Tamper Detection</h2>
                            <div class="tamper-scenario" id="tamperScenario">
                                <div class="scenario-description">
                                    <div class="hacker-icon">👤</div>
                                    <div class="scenario-text">
                                        <h3>Attack Scenario</h3>
                                        <p id="attackDescription">Hacker tries to change Alice's $50 to $5000</p>
                                    </div>
                                </div>
                                
                                <div class="tamper-visualization" id="tamperVisualization">
                                    <div class="tamper-step">
                                        <div class="original-tx" id="originalTx">
                                            <div class="tx-label">Original</div>
                                            <div class="tx-content">Alice → Bob: $50</div>
                                            <div class="tx-hash">a1b2c3...</div>
                                        </div>
                                        
                                        <div class="tamper-arrow">→</div>
                                        
                                        <div class="tampered-tx" id="tamperedTx">
                                            <div class="tx-label">Tampered</div>
                                            <div class="tx-content tampered">Alice → Bob: $5000</div>
                                            <div class="tx-hash tampered">x9y8z7...</div>
                                        </div>
                                    </div>
                                    
                                    <div class="tamper-result" id="tamperResult">
                                        <div class="result-icon" id="tamperResultIcon">⚠️</div>
                                        <div class="result-message" id="tamperResultMessage">
                                            Hash mismatch detected! Tree structure breaks.
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
                            <span class="bullet">🔍</span>
                            <span><strong>Verification:</strong> Prove inclusion without downloading everything</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">🛡️</span>
                            <span><strong>Security:</strong> Any tampering immediately breaks the tree</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">⚡</span>
                            <span><strong>Efficiency:</strong> 1 KB proof vs 500 GB full download</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Activates the merkle part 2 animations
     */
    activate() {
        if (this.isActive) return;
        this.isActive = true;
        
        PresentationUtils.debug('Activating Merkle Part 2 Demo');
        
        // Get element references
        this.elements = {
            proofDemo: document.getElementById('proofDemo'),
            proofProcess: document.getElementById('proofProcess'),
            efficiencyShowcase: document.getElementById('efficiencyShowcase'),
            tamperDemo: document.getElementById('tamperDemo'),
            tamperVisualization: document.getElementById('tamperVisualization'),
            proofResult: document.getElementById('proofResult'),
            tamperResult: document.getElementById('tamperResult')
        };

        this.getElementReferences();
        
        if (!this.elements.proofDemo) {
            console.warn('Merkle part 2 elements not found, skipping activation');
            return;
        }

        // Set up animation callback
        this.animationController.addCallback(() => this.runVerificationAnimation());
        this.animationController.start();
        
        // Initial setup
        this.updateDisplay();
    }

    /**
     * Deactivates the merkle part 2 animations
     */
    deactivate() {
        if (!this.isActive) return;
        this.isActive = false;
        
        PresentationUtils.debug('Deactivating Merkle Part 2 Demo');
        
        // Stop animation controller
        this.animationController.stop();
        
        // Clean up animations
        this.clearAllAnimations();
    }

    /**
     * Gets references to elements
     */
    getElementReferences() {
        this.elements.proofSteps = [];
        
        // Get proof steps
        for (let i = 1; i <= 3; i++) {
            this.elements.proofSteps.push(document.getElementById(`proofStep${i}`));
        }

        // Get other elements
        this.elements.targetTransaction = document.getElementById('targetTransaction');
        this.elements.txHash = document.getElementById('txHash');
        this.elements.siblingHashes = document.getElementById('siblingHashes');
        this.elements.computation = document.getElementById('computation');
        this.elements.resultIcon = document.getElementById('resultIcon');
        this.elements.resultText = document.getElementById('resultText');
        this.elements.originalTx = document.getElementById('originalTx');
        this.elements.tamperedTx = document.getElementById('tamperedTx');
        this.elements.tamperResultIcon = document.getElementById('tamperResultIcon');
        this.elements.tamperResultMessage = document.getElementById('tamperResultMessage');
    }

    /**
     * Runs the main verification animation sequence
     */
    runVerificationAnimation() {
        if (!this.isActive) return;
        
        this.currentAnimationPhase = (this.currentAnimationPhase + 1) % 3;
        
        PresentationUtils.debug(`Merkle verification phase: ${this.currentAnimationPhase}`);
        
        // Clear previous animations
        this.clearAllAnimations();
        
        switch (this.currentAnimationPhase) {
            case 0:
                this.demonstrateProofOfInclusion();
                break;
            case 1:
                this.showcaseEfficiency();
                break;
            case 2:
                this.demonstrateTamperDetection();
                break;
        }
    }

    /**
     * Demonstrates proof of inclusion process
     */
    demonstrateProofOfInclusion() {
        // Cycle through different transactions
        this.selectedTxIndex = (this.selectedTxIndex + 1) % this.transactions.length;
        const selectedTx = this.transactions[this.selectedTxIndex];
        
        // Update target transaction
        if (this.elements.targetTransaction) {
            this.elements.targetTransaction.textContent = selectedTx.content;
        }

        // Step 1: Show transaction hash (1 second)
        setTimeout(() => {
            if (this.isActive) this.animateProofStep(0, selectedTx);
        }, 500);

        // Step 2: Show sibling hashes (2 seconds)
        setTimeout(() => {
            if (this.isActive) this.animateProofStep(1, selectedTx);
        }, 2000);

        // Step 3: Show computation (2 seconds)
        setTimeout(() => {
            if (this.isActive) this.animateProofStep(2, selectedTx);
        }, 4000);

        // Show result (2 seconds)
        setTimeout(() => {
            if (this.isActive) this.showProofResult();
        }, 6000);
    }

    /**
     * Animates a specific proof step
     */
    animateProofStep(stepIndex, transaction) {
        const step = this.elements.proofSteps[stepIndex];
        if (!step) return;

        // Clear previous step highlights
        this.elements.proofSteps.forEach(s => {
            if (s) s.classList.remove('active');
        });

        // Highlight current step
        step.classList.add('active');
        PresentationUtils.createRipple(step, 'var(--primary-blue)');

        // Update step content based on index
        switch (stepIndex) {
            case 0:
                if (this.elements.txHash) {
                    this.elements.txHash.textContent = transaction.hash;
                    PresentationUtils.highlight(this.elements.txHash);
                }
                break;
            case 1:
                this.showSiblingHashes(transaction);
                break;
            case 2:
                this.showComputation(transaction);
                break;
        }
    }

    /**
     * Shows sibling hashes for the selected transaction
     */
    showSiblingHashes(transaction) {
        if (!this.elements.siblingHashes) return;

        const siblings = this.getSiblingHashes(transaction);
        const siblingElements = this.elements.siblingHashes.querySelectorAll('.sibling');
        
        siblings.forEach((hash, index) => {
            if (siblingElements[index]) {
                siblingElements[index].textContent = hash;
                setTimeout(() => {
                    PresentationUtils.highlight(siblingElements[index], 'highlight-change', 1000);
                }, index * 300);
            }
        });
    }

    /**
     * Shows computation steps
     */
    showComputation(transaction) {
        if (!this.elements.computation) return;

        const computeSteps = this.elements.computation.querySelectorAll('.compute-step');
        
        computeSteps.forEach((step, index) => {
            setTimeout(() => {
                if (this.isActive) {
                    step.style.opacity = '1';
                    step.style.animation = 'fadeInUp 0.5s ease-out';
                    PresentationUtils.createRipple(step, 'var(--primary-gold)');
                }
            }, index * 800);
        });
    }

    /**
     * Shows the proof result
     */
    showProofResult() {
        if (!this.elements.proofResult) return;

        this.elements.proofResult.style.animation = 'fadeInScale 0.8s ease-out';
        
        // Animate result icon
        if (this.elements.resultIcon) {
            this.elements.resultIcon.style.animation = 'bounce 1s ease-out';
        }
        
        // Create success particles
        PresentationUtils.createParticles(this.elements.proofResult, 8, 2000);
        PresentationUtils.createRipple(this.elements.proofResult, 'var(--success-green)');
    }

    /**
     * Showcases efficiency comparison
     */
    showcaseEfficiency() {
        // Highlight slow way first
        setTimeout(() => {
            if (this.isActive) {
                const slowWay = this.elements.efficiencyShowcase.querySelector('.slow-way');
                slowWay.style.animation = 'problemPulse 2s infinite';
                PresentationUtils.createRipple(slowWay, 'var(--alert-red)');
            }
        }, 1000);

        // Highlight fast way
        setTimeout(() => {
            if (this.isActive) {
                const fastWay = this.elements.efficiencyShowcase.querySelector('.fast-way');
                fastWay.style.animation = 'solutionReveal 2s ease-out';
                PresentationUtils.createRipple(fastWay, 'var(--success-green)');
                PresentationUtils.createParticles(fastWay, 10, 3000);
            }
        }, 3500);

        // Emphasize the VS
        setTimeout(() => {
            if (this.isActive) {
                const vsDivider = this.elements.efficiencyShowcase.querySelector('.vs-divider');
                vsDivider.style.animation = 'vsHighlight 1s ease-out';
                vsDivider.style.fontSize = '3rem';
                vsDivider.style.color = 'var(--primary-gold)';
            }
        }, 6000);
    }

    /**
     * Demonstrates tamper detection
     */
    demonstrateTamperDetection() {
        // Show original transaction
        setTimeout(() => {
            if (this.isActive && this.elements.originalTx) {
                this.elements.originalTx.style.animation = 'fadeInScale 0.8s ease-out';
                PresentationUtils.createRipple(this.elements.originalTx, 'var(--success-green)');
            }
        }, 500);

        // Show tampering attempt
        setTimeout(() => {
            if (this.isActive && this.elements.tamperedTx) {
                this.elements.tamperedTx.style.animation = 'tamperAttack 1s ease-out';
                this.elements.tamperedTx.classList.add('tampered');
                PresentationUtils.createRipple(this.elements.tamperedTx, 'var(--alert-red)');
            }
        }, 2500);

        // Show detection result
        setTimeout(() => {
            if (this.isActive) {
                this.showTamperDetectionResult();
            }
        }, 5000);

        // Reset for next cycle
        setTimeout(() => {
            if (this.isActive) {
                this.resetTamperDemo();
            }
        }, 7500);
    }

    /**
     * Shows tamper detection result
     */
    showTamperDetectionResult() {
        if (!this.elements.tamperResult) return;

        this.elements.tamperResult.style.animation = 'fadeInScale 0.8s ease-out';
        this.elements.tamperResult.style.background = 'rgba(255, 71, 87, 0.1)';
        this.elements.tamperResult.style.borderColor = 'var(--alert-red)';
        
        // Animate warning icon
        if (this.elements.tamperResultIcon) {
            this.elements.tamperResultIcon.style.animation = 'tamperShake 0.5s infinite';
        }
        
        // Create warning particles
        PresentationUtils.createParticles(this.elements.tamperResult, 6, 2000);
        PresentationUtils.createRipple(this.elements.tamperResult, 'var(--alert-red)');
    }

    /**
     * Resets tamper demo for next cycle
     */
    resetTamperDemo() {
        if (this.elements.originalTx) {
            this.elements.originalTx.style.animation = '';
        }
        
        if (this.elements.tamperedTx) {
            this.elements.tamperedTx.style.animation = '';
            this.elements.tamperedTx.classList.remove('tampered');
        }
        
        if (this.elements.tamperResult) {
            this.elements.tamperResult.style.animation = '';
            this.elements.tamperResult.style.background = '';
            this.elements.tamperResult.style.borderColor = '';
        }
        
        if (this.elements.tamperResultIcon) {
            this.elements.tamperResultIcon.style.animation = '';
        }
    }

    /**
     * Calculates tree hashes and structure
     */
    calculateTreeHashes() {
        // Generate realistic-looking hashes for demo
        this.transactions.forEach(tx => {
            tx.hash = PresentationUtils.simpleHash(tx.content).substring(0, 8) + '...';
        });

        // Calculate branch hashes
        this.branchHashes = [
            this.combineHashes(this.transactions[0].hash, this.transactions[1].hash),
            this.combineHashes(this.transactions[2].hash, this.transactions[3].hash)
        ];

        // Calculate root hash
        this.rootHash = this.combineHashes(this.branchHashes[0], this.branchHashes[1]);
    }

    /**
     * Gets sibling hashes for a transaction
     */
    getSiblingHashes(transaction) {
        const txIndex = this.transactions.findIndex(tx => tx.id === transaction.id);
        const siblings = [];
        
        // Get sibling at leaf level
        if (txIndex % 2 === 0) {
            // Even index, sibling is next
            if (txIndex + 1 < this.transactions.length) {
                siblings.push(this.transactions[txIndex + 1].hash);
            }
        } else {
            // Odd index, sibling is previous
            siblings.push(this.transactions[txIndex - 1].hash);
        }
        
        // Get sibling at branch level
        const branchIndex = Math.floor(txIndex / 2);
        const siblingBranchIndex = branchIndex === 0 ? 1 : 0;
        siblings.push(this.branchHashes[siblingBranchIndex]);
        
        return siblings;
    }

    /**
     * Combines two hashes
     */
    combineHashes(hash1, hash2) {
        const combined = hash1 + hash2;
        return PresentationUtils.simpleHash(combined).substring(0, 8) + '...';
    }

    /**
     * Updates the display with current values
     */
    updateDisplay() {
        // Set initial transaction
        const selectedTx = this.transactions[this.selectedTxIndex];
        if (this.elements.targetTransaction) {
            this.elements.targetTransaction.textContent = selectedTx.content;
        }
        
        // Set initial hash
        if (this.elements.txHash) {
            this.elements.txHash.textContent = selectedTx.hash;
        }
    }

    /**
     * Clears all active animations
     */
    clearAllAnimations() {
        // Clear proof step highlights
        if (this.elements.proofSteps) {
            this.elements.proofSteps.forEach(step => {
                if (step) {
                    step.classList.remove('active');
                    step.style.animation = '';
                }
            });
        }

        // Clear result animations
        if (this.elements.proofResult) {
            this.elements.proofResult.style.animation = '';
        }

        // Clear efficiency showcase animations
        const slowWay = this.elements.efficiencyShowcase?.querySelector('.slow-way');
        const fastWay = this.elements.efficiencyShowcase?.querySelector('.fast-way');
        const vsDivider = this.elements.efficiencyShowcase?.querySelector('.vs-divider');
        
        if (slowWay) slowWay.style.animation = '';
        if (fastWay) fastWay.style.animation = '';
        if (vsDivider) {
            vsDivider.style.animation = '';
            vsDivider.style.fontSize = '';
            vsDivider.style.color = '';
        }

        // Reset tamper demo
        this.resetTamperDemo();

        // Clear computation steps
        if (this.elements.computation) {
            const computeSteps = this.elements.computation.querySelectorAll('.compute-step');
            computeSteps.forEach(step => {
                step.style.opacity = '0';
                step.style.animation = '';
            });
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
            selectedTransaction: this.selectedTxIndex,
            transactionCount: this.transactions.length,
            controller: this.animationController.getStatus()
        };
    }
}

// Additional CSS animations needed - add these to styles/slides.css if not present
const additionalCSS = `
@keyframes problemPulse {
    0%, 100% { 
        transform: scale(1);
        border-color: var(--alert-red);
    }
    50% { 
        transform: scale(1.05);
        border-color: #ff6b7d;
        box-shadow: 0 0 20px rgba(255, 71, 87, 0.5);
    }
}

@keyframes solutionReveal {
    0% { 
        opacity: 0;
        transform: translateY(20px) scale(0.9);
    }
    100% { 
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

@keyframes vsHighlight {
    0% { 
        transform: scale(1);
        text-shadow: none;
    }
    50% { 
        transform: scale(1.2);
        text-shadow: 0 0 20px var(--primary-gold);
    }
    100% { 
        transform: scale(1.1);
        text-shadow: 0 0 15px var(--primary-gold);
    }
}

@keyframes tamperAttack {
    0% { 
        transform: scale(1);
        border-color: var(--success-green);
    }
    50% { 
        transform: scale(1.1) rotate(2deg);
        border-color: var(--alert-red);
    }
    100% { 
        transform: scale(1);
        border-color: var(--alert-red);
    }
}

.proof-step {
    opacity: 0.6;
    transition: all 0.3s ease;
}

.proof-step.active {
    opacity: 1;
    transform: scale(1.02);
    border-left: 4px solid var(--primary-blue);
    background: rgba(0, 212, 255, 0.1);
}

.tampered {
    color: var(--alert-red) !important;
    border-color: var(--alert-red) !important;
    background: rgba(255, 71, 87, 0.1) !important;
}

.bad {
    color: var(--alert-red);
    font-weight: bold;
}

.good {
    color: var(--success-green);
    font-weight: bold;
}

.method-stats {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
}

.stat {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 6px;
}

.efficiency-comparison {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 2rem;
    align-items: center;
    margin-top: 2rem;
}

.comparison-item {
    background: var(--glass-bg);
    border-radius: 15px;
    padding: 2rem;
    border: 2px solid var(--glass-border);
    text-align: center;
    transition: all 0.3s ease;
}

.method-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.vs-divider {
    font-size: 2rem;
    color: var(--primary-gold);
    font-weight: bold;
    text-align: center;
}

.tamper-step {
    display: flex;
    align-items: center;
    gap: 2rem;
    justify-content: center;
    margin-bottom: 2rem;
}

.original-tx, .tampered-tx {
    background: var(--glass-bg);
    border: 2px solid var(--success-green);
    border-radius: 15px;
    padding: 1.5rem;
    text-align: center;
    min-width: 200px;
}

.tampered-tx {
    border-color: var(--alert-red);
}

.tx-label {
    font-size: var(--font-size-xs);
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    text-transform: uppercase;
}

.tx-content {
    font-size: var(--font-size-md);
    margin-bottom: 1rem;
    font-weight: bold;
}

.tx-hash {
    font-family: 'Courier New', monospace;
    font-size: var(--font-size-sm);
    background: rgba(0, 0, 0, 0.2);
    padding: 0.5rem;
    border-radius: 6px;
}

.tamper-arrow {
    font-size: 2rem;
    color: var(--alert-red);
    font-weight: bold;
}
`;

// Register the slide class
if (typeof window.slideClasses === 'undefined') {
    window.slideClasses = {};
}
window.slideClasses['merkle-part2'] = MerklePart2Demo;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MerklePart2Demo;
}