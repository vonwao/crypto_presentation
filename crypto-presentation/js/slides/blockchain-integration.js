// js/slides/blockchain-integration.js
// Final slide showing how all concepts work together in a living blockchain

class BlockchainIntegrationDemo {
    constructor() {
        this.blocks = [
            {
                id: 'genesis',
                index: 0,
                previousHash: '000000...',
                merkleRoot: null,
                nonce: 12345,
                transactions: ['Genesis Block'],
                hash: null,
                timestamp: '2024-01-01'
            },
            {
                id: 'block1',
                index: 1,
                previousHash: null, // Will link to genesis
                merkleRoot: null,
                nonce: 67890,
                transactions: ['Alice→Bob: $50', 'Charlie→Alice: $25'],
                hash: null,
                timestamp: '2024-01-02'
            },
            {
                id: 'block2',
                index: 2,
                previousHash: null, // Will link to block1
                merkleRoot: null,
                nonce: 54321,
                transactions: ['Bob→David: $30', 'Eve→Charlie: $15'],
                hash: null,
                timestamp: '2024-01-03'
            }
        ];
        
        this.currentAnimationPhase = 0;
        this.animationController = new AnimationController(10000); // 10 second cycles
        this.isActive = false;
        this.elements = {};
        
        // Initialize blockchain
        this.initializeBlockchain();
    }

    /**
     * Creates the HTML structure for the blockchain integration slide
     * @returns {string} HTML string
     */
    createSlideHTML() {
        return `
            <div class="slide" data-slide="integration">
                <div class="slide-header">
                    <h1>Putting It All Together</h1>
                    <p class="subtitle">How hash functions, signatures, and Merkle trees create blockchain</p>
                </div>
                
                <div class="slide-content">
                    <div class="blockchain-demo">
                        <div class="blockchain-visualization">
                            <div class="blockchain-chain" id="blockchainChain">
                                ${this.blocks.map((block, index) => this.generateBlockHTML(block, index)).join('')}
                            </div>
                            
                            <div class="chain-connections" id="chainConnections">
                                <!-- Hash connections between blocks -->
                            </div>
                        </div>

                        <div class="process-explanation">
                            <div class="process-steps" id="processSteps">
                                <div class="process-step" id="step1">
                                    <div class="step-icon">🔐</div>
                                    <div class="step-content">
                                        <h4>1. Digital Signatures</h4>
                                        <p>Every transaction is cryptographically signed by the sender</p>
                                        <div class="step-demo" id="signatureDemo">
                                            <code class="signature-example">Alice signs: "Transfer $50 to Bob"</code>
                                        </div>
                                    </div>
                                </div>

                                <div class="process-step" id="step2">
                                    <div class="step-icon">🌳</div>
                                    <div class="step-content">
                                        <h4>2. Merkle Tree Creation</h4>
                                        <p>Transactions are organized into an efficient verification structure</p>
                                        <div class="step-demo" id="merkleDemo">
                                            <div class="mini-tree">
                                                <div class="mini-root">Root: <code>a1b2c3...</code></div>
                                                <div class="mini-leaves">
                                                    <span class="mini-leaf">TX1</span>
                                                    <span class="mini-leaf">TX2</span>
                                                    <span class="mini-leaf">TX3</span>
                                                    <span class="mini-leaf">TX4</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="process-step" id="step3">
                                    <div class="step-icon">🌪️</div>
                                    <div class="step-content">
                                        <h4>3. Block Hash Creation</h4>
                                        <p>Previous hash + Merkle root + nonce → unique block fingerprint</p>
                                        <div class="step-demo" id="hashDemo">
                                            <div class="hash-equation">
                                                <span class="hash-input">PrevHash + MerkleRoot + Nonce</span>
                                                <span class="hash-arrow">→</span>
                                                <span class="hash-output" id="currentBlockHash">d4e5f6...</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="process-step" id="step4">
                                    <div class="step-icon">⛓️</div>
                                    <div class="step-content">
                                        <h4>4. Chain Linking</h4>
                                        <p>Each block references the previous block's hash, creating an unbreakable chain</p>
                                        <div class="step-demo" id="chainDemo">
                                            <div class="chain-links">
                                                <div class="chain-link">Block N-1</div>
                                                <div class="chain-arrow">→</div>
                                                <div class="chain-link active">Block N</div>
                                                <div class="chain-arrow">→</div>
                                                <div class="chain-link">Block N+1</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="security-showcase" id="securityShowcase">
                            <h3 class="showcase-title">Why This Creates Unbreakable Security</h3>
                            <div class="security-features">
                                <div class="security-feature" id="feature1">
                                    <div class="feature-icon">🛡️</div>
                                    <div class="feature-content">
                                        <h5>Immutable History</h5>
                                        <p>Changing any past transaction requires recalculating all subsequent blocks</p>
                                    </div>
                                </div>
                                
                                <div class="security-feature" id="feature2">
                                    <div class="feature-icon">⚡</div>
                                    <div class="feature-content">
                                        <h5>Instant Verification</h5>
                                        <p>Merkle trees allow verification of any transaction without downloading the entire blockchain</p>
                                    </div>
                                </div>
                                
                                <div class="security-feature" id="feature3">
                                    <div class="feature-icon">🔍</div>
                                    <div class="feature-content">
                                        <h5>Cryptographic Proof</h5>
                                        <p>Digital signatures ensure only authorized parties can create transactions</p>
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
                            <span class="bullet">🌍</span>
                            <span><strong>Decentralized Trust:</strong> No central authority needed - math provides the guarantee</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">🚀</span>
                            <span><strong>Future-Proof:</strong> These fundamentals power all blockchain innovations</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Generates HTML for a single block
     */
    generateBlockHTML(block, index) {
        return `
            <div class="blockchain-block" id="block${index}" data-block-index="${index}">
                <div class="block-header">
                    <div class="block-title">Block #${block.index}</div>
                    <div class="block-timestamp">${block.timestamp}</div>
                </div>
                
                <div class="block-content">
                    <div class="block-field">
                        <label>Previous Hash:</label>
                        <code class="prev-hash" id="prevHash${index}">${block.previousHash || '...'}</code>
                    </div>
                    
                    <div class="block-field">
                        <label>Transactions:</label>
                        <div class="transaction-list">
                            ${block.transactions.map(tx => `<div class="transaction-item">${tx}</div>`).join('')}
                        </div>
                    </div>
                    
                    <div class="block-field">
                        <label>Merkle Root:</label>
                        <code class="merkle-root" id="merkleRoot${index}">${block.merkleRoot || 'calculating...'}</code>
                    </div>
                    
                    <div class="block-field">
                        <label>Nonce:</label>
                        <code class="nonce">${block.nonce}</code>
                    </div>
                    
                    <div class="block-field block-hash-field">
                        <label>Block Hash:</label>
                        <code class="block-hash" id="blockHash${index}">${block.hash || 'mining...'}</code>
                    </div>
                </div>
                
                <div class="block-particles" id="blockParticles${index}"></div>
            </div>
        `;
    }

    /**
     * Activates the blockchain integration animations
     */
    activate() {
        if (this.isActive) return;
        this.isActive = true;
        
        PresentationUtils.debug('Activating Blockchain Integration Demo');
        
        // Get element references
        this.elements = {
            blockchainChain: document.getElementById('blockchainChain'),
            chainConnections: document.getElementById('chainConnections'),
            processSteps: document.getElementById('processSteps'),
            securityShowcase: document.getElementById('securityShowcase'),
            currentBlockHash: document.getElementById('currentBlockHash')
        };

        // Get block references
        this.getBlockReferences();
        
        if (!this.elements.blockchainChain) {
            console.warn('Blockchain elements not found, skipping activation');
            return;
        }

        // Set up animation callback
        this.animationController.addCallback(() => this.runBlockchainAnimation());
        this.animationController.start();
        
        // Initial setup
        this.updateDisplay();
        this.drawConnections();
    }

    /**
     * Deactivates the blockchain integration animations
     */
    deactivate() {
        if (!this.isActive) return;
        this.isActive = false;
        
        PresentationUtils.debug('Deactivating Blockchain Integration Demo');
        
        // Stop animation controller
        this.animationController.stop();
        
        // Clean up animations
        this.clearAllAnimations();
    }

    /**
     * Gets references to block elements
     */
    getBlockReferences() {
        this.elements.blocks = [];
        
        this.blocks.forEach((block, index) => {
            this.elements.blocks.push({
                container: document.getElementById(`block${index}`),
                prevHash: document.getElementById(`prevHash${index}`),
                merkleRoot: document.getElementById(`merkleRoot${index}`),
                blockHash: document.getElementById(`blockHash${index}`),
                particles: document.getElementById(`blockParticles${index}`)
            });
        });
    }

    /**
     * Runs the main blockchain animation sequence
     */
    runBlockchainAnimation() {
        if (!this.isActive) return;
        
        this.currentAnimationPhase = (this.currentAnimationPhase + 1) % 4;
        
        PresentationUtils.debug(`Blockchain animation phase: ${this.currentAnimationPhase}`);
        
        switch (this.currentAnimationPhase) {
            case 0:
                this.demonstrateTransactionSigning();
                break;
            case 1:
                this.demonstrateMerkleTreeBuilding();
                break;
            case 2:
                this.demonstrateBlockCreation();
                break;
            case 3:
                this.demonstrateChainLinking();
                break;
        }
    }

    /**
     * Shows digital signature process
     */
    demonstrateTransactionSigning() {
        this.clearAllAnimations();
        this.highlightStep(1);
        
        // Animate signature creation
        const signatureDemo = document.getElementById('signatureDemo');
        const signatureExample = signatureDemo.querySelector('.signature-example');
        
        // Show signing process
        signatureExample.style.animation = 'glow 2s infinite';
        
        // Create signature particles
        setTimeout(() => {
            if (this.isActive) {
                PresentationUtils.createParticles(signatureDemo, 6, 2000);
            }
        }, 500);
        
        // Show verification
        setTimeout(() => {
            if (this.isActive) {
                signatureExample.textContent = 'Alice signs: "Transfer $50 to Bob" ✓ Verified';
                signatureExample.style.color = 'var(--success-green)';
            }
        }, 2000);
        
        // Reset
        setTimeout(() => {
            if (this.isActive) {
                signatureExample.style.animation = '';
                signatureExample.style.color = '';
                signatureExample.textContent = 'Alice signs: "Transfer $50 to Bob"';
            }
        }, 4000);
    }

    /**
     * Shows Merkle tree construction
     */
    demonstrateMerkleTreeBuilding() {
        this.clearAllAnimations();
        this.highlightStep(2);
        
        const merkleDemo = document.getElementById('merkleDemo');
        const miniTree = merkleDemo.querySelector('.mini-tree');
        const miniLeaves = merkleDemo.querySelectorAll('.mini-leaf');
        const miniRoot = merkleDemo.querySelector('.mini-root');
        
        // Animate leaf highlighting
        miniLeaves.forEach((leaf, index) => {
            setTimeout(() => {
                if (this.isActive) {
                    leaf.style.animation = 'bounce 0.5s ease-out';
                    leaf.style.background = 'var(--success-green)';
                    leaf.style.color = 'white';
                }
            }, index * 200);
        });
        
        // Build tree upward
        setTimeout(() => {
            if (this.isActive) {
                PresentationUtils.createParticles(miniTree, 8, 2000);
                miniRoot.style.animation = 'fadeInScale 1s ease-out';
                miniRoot.style.background = 'var(--primary-gold)';
                miniRoot.style.color = 'white';
            }
        }, 1000);
        
        // Reset
        setTimeout(() => {
            if (this.isActive) {
                miniLeaves.forEach(leaf => {
                    leaf.style.animation = '';
                    leaf.style.background = '';
                    leaf.style.color = '';
                });
                miniRoot.style.animation = '';
                miniRoot.style.background = '';
                miniRoot.style.color = '';
            }
        }, 4000);
    }

    /**
     * Shows block hash creation
     */
    demonstrateBlockCreation() {
        this.clearAllAnimations();
        this.highlightStep(3);
        
        const hashDemo = document.getElementById('hashDemo');
        const hashEquation = hashDemo.querySelector('.hash-equation');
        const hashInputs = hashEquation.querySelectorAll('.hash-input');
        const hashOutput = hashEquation.querySelector('.hash-output');
        
        // Animate input combination
        hashEquation.style.animation = 'glow 3s infinite';
        
        // Show hash calculation
        setTimeout(() => {
            if (this.isActive) {
                PresentationUtils.createParticles(hashDemo, 10, 2500);
                hashOutput.style.animation = 'fadeInScale 1s ease-out';
                hashOutput.style.color = 'var(--primary-gold)';
            }
        }, 1000);
        
        // Highlight current block being built
        const currentBlock = this.elements.blocks[1];
        if (currentBlock && currentBlock.container) {
            setTimeout(() => {
                if (this.isActive) {
                    currentBlock.container.classList.add('building');
                    PresentationUtils.createParticles(currentBlock.particles, 12, 3000);
                }
            }, 1500);
        }
        
        // Reset
        setTimeout(() => {
            if (this.isActive) {
                hashEquation.style.animation = '';
                hashOutput.style.animation = '';
                hashOutput.style.color = '';
                if (currentBlock && currentBlock.container) {
                    currentBlock.container.classList.remove('building');
                }
            }
        }, 5000);
    }

    /**
     * Shows chain linking process
     */
    demonstrateChainLinking() {
        this.clearAllAnimations();
        this.highlightStep(4);
        
        // Animate chain connections
        this.animateChainConnections();
        
        // Show hash propagation
        this.elements.blocks.forEach((block, index) => {
            setTimeout(() => {
                if (this.isActive && block.container) {
                    block.container.classList.add('linked');
                    PresentationUtils.createRipple(block.container, 'var(--primary-blue)');
                    
                    // Update next block's previous hash
                    if (index < this.elements.blocks.length - 1) {
                        const nextBlock = this.elements.blocks[index + 1];
                        if (nextBlock.prevHash) {
                            nextBlock.prevHash.style.animation = 'highlight 1s ease-out';
                            nextBlock.prevHash.style.color = 'var(--primary-gold)';
                        }
                    }
                }
            }, index * 800);
        });
        
        // Show security features
        setTimeout(() => {
            if (this.isActive) {
                this.animateSecurityFeatures();
            }
        }, 3000);
        
        // Reset
        setTimeout(() => {
            if (this.isActive) {
                this.elements.blocks.forEach(block => {
                    if (block.container) {
                        block.container.classList.remove('linked');
                    }
                    if (block.prevHash) {
                        block.prevHash.style.animation = '';
                        block.prevHash.style.color = '';
                    }
                });
            }
        }, 6000);
    }

    /**
     * Animates chain connections between blocks
     */
    animateChainConnections() {
        // Create flowing particles between blocks
        for (let i = 0; i < this.elements.blocks.length - 1; i++) {
            setTimeout(() => {
                if (!this.isActive) return;
                
                const fromBlock = this.elements.blocks[i];
                const toBlock = this.elements.blocks[i + 1];
                
                if (fromBlock.container && toBlock.container) {
                    this.createConnectionParticles(fromBlock.container, toBlock.container);
                }
            }, i * 400);
        }
    }

    /**
     * Creates particles flowing between two blocks
     */
    createConnectionParticles(fromBlock, toBlock) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                if (!this.isActive) return;
                
                const particle = document.createElement('div');
                particle.className = 'connection-particle';
                particle.style.background = 'var(--primary-blue)';
                
                const fromRect = fromBlock.getBoundingClientRect();
                const toRect = toBlock.getBoundingClientRect();
                const containerRect = this.elements.blockchainChain.getBoundingClientRect();
                
                particle.style.left = (fromRect.right - containerRect.left) + 'px';
                particle.style.top = (fromRect.top - containerRect.top + fromRect.height / 2) + 'px';
                
                const deltaX = toRect.left - fromRect.right;
                const deltaY = (toRect.top + toRect.height / 2) - (fromRect.top + fromRect.height / 2);
                
                particle.style.setProperty('--deltaX', deltaX + 'px');
                particle.style.setProperty('--deltaY', deltaY + 'px');
                particle.style.animation = 'connectionFlow 1.5s ease-out forwards';
                
                this.elements.blockchainChain.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.remove();
                    }
                }, 1500);
                
            }, i * 150);
        }
    }

    /**
     * Animates security features
     */
    animateSecurityFeatures() {
        const features = this.elements.securityShowcase.querySelectorAll('.security-feature');
        
        features.forEach((feature, index) => {
            setTimeout(() => {
                if (this.isActive) {
                    feature.style.animation = 'fadeInUp 0.8s ease-out';
                    feature.style.background = 'rgba(0, 255, 136, 0.1)';
                    feature.style.borderLeft = '4px solid var(--success-green)';
                }
            }, index * 400);
        });
        
        // Reset
        setTimeout(() => {
            features.forEach(feature => {
                feature.style.animation = '';
                feature.style.background = '';
                feature.style.borderLeft = '';
            });
        }, 3000);
    }

    /**
     * Highlights a specific process step
     */
    highlightStep(stepNumber) {
        const steps = this.elements.processSteps.querySelectorAll('.process-step');
        
        steps.forEach((step, index) => {
            step.classList.remove('active');
            if (index + 1 === stepNumber) {
                step.classList.add('active');
                step.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    /**
     * Draws connections between blocks
     */
    drawConnections() {
        // Visual connections would be drawn here
        // Implementation depends on your preferred approach (SVG, CSS, etc.)
    }

    /**
     * Initializes the blockchain with proper hashes
     */
    initializeBlockchain() {
        // Generate genesis block hash
        this.blocks[0].hash = PresentationUtils.simpleHash('genesis' + this.blocks[0].nonce).substring(0, 8) + '...';
        
        // Link subsequent blocks
        for (let i = 1; i < this.blocks.length; i++) {
            this.blocks[i].previousHash = this.blocks[i - 1].hash;
            
            // Generate Merkle root for transactions
            const txData = this.blocks[i].transactions.join('');
            this.blocks[i].merkleRoot = PresentationUtils.simpleHash(txData).substring(0, 8) + '...';
            
            // Generate block hash
            const blockData = this.blocks[i].previousHash + this.blocks[i].merkleRoot + this.blocks[i].nonce;
            this.blocks[i].hash = PresentationUtils.simpleHash(blockData).substring(0, 8) + '...';
        }
    }

    /**
     * Updates the display with current values
     */
    updateDisplay() {
        this.elements.blocks.forEach((blockEl, index) => {
            const block = this.blocks[index];
            
            if (blockEl.prevHash) {
                blockEl.prevHash.textContent = block.previousHash;
            }
            if (blockEl.merkleRoot) {
                blockEl.merkleRoot.textContent = block.merkleRoot;
            }
            if (blockEl.blockHash) {
                blockEl.blockHash.textContent = block.hash;
            }
        });
    }

    /**
     * Clears all active animations
     */
    clearAllAnimations() {
        const steps = this.elements.processSteps.querySelectorAll('.process-step');
        steps.forEach(step => step.classList.remove('active'));
        
        this.elements.blocks.forEach(block => {
            if (block.container) {
                block.container.classList.remove('building', 'linked');
            }
        });
    }

    /**
     * Gets the current animation status
     * @returns {Object} Status information
     */
    getStatus() {
        return {
            isActive: this.isActive,
            currentPhase: this.currentAnimationPhase,
            blockCount: this.blocks.length,
            controller: this.animationController.getStatus()
        };
    }
}

// Register the slide class
if (typeof window.slideClasses === 'undefined') {
    window.slideClasses = {};
}
window.slideClasses['integration'] = BlockchainIntegrationDemo;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlockchainIntegrationDemo;
}