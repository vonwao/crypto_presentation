// js/slides/blockchain-part1.js
// First part: How the pieces work together in blockchain

class BlockchainPart1Demo {
    constructor() {
        this.blocks = [
            {
                id: 'genesis',
                index: 0,
                previousHash: '000000...',
                merkleRoot: 'a1b2c3...',
                nonce: 12345,
                transactions: ['Genesis Block'],
                hash: '1a2b3c...',
                timestamp: '2024-01-01'
            },
            {
                id: 'block1',
                index: 1,
                previousHash: '1a2b3c...',
                merkleRoot: 'd4e5f6...',
                nonce: 67890,
                transactions: ['Alice→Bob: $50', 'Charlie→Alice: $25'],
                hash: '7g8h9i...',
                timestamp: '2024-01-02'
            },
            {
                id: 'block2',
                index: 2,
                previousHash: '7g8h9i...',
                merkleRoot: 'j1k2l3...',
                nonce: 54321,
                transactions: ['Bob→David: $30', 'Eve→Charlie: $15'],
                hash: 'm4n5o6...',
                timestamp: '2024-01-03'
            }
        ];
        
        this.currentAnimationPhase = 0;
        this.animationController = new AnimationController(8000); // 8 second cycles
        this.isActive = false;
        this.elements = {};
    }

    /**
     * Creates the HTML structure for blockchain part 1
     * @returns {string} HTML string
     */
    createSlideHTML() {
        return `
            <div class="slide" data-slide="blockchain-part1">
                <div class="slide-header">
                    <h1>How Blockchain Works</h1>
                    <p class="subtitle">Putting it all together: signatures, hashes, and Merkle trees</p>
                </div>
                
                <div class="slide-content">
                    <div class="blockchain-builder">
                        <div class="blockchain-chain" id="blockchainChain">
                            <h3 style="text-align: center; color: var(--primary-gold); margin-bottom: 1.5rem;">The Blockchain</h3>
                            ${this.blocks.map((block, index) => this.generateSimpleBlockHTML(block, index)).join('')}
                        </div>
                        
                        <div class="construction-process" id="constructionProcess">
                            <div class="process-title">How Each Block is Built</div>
                            <div class="process-steps" id="processSteps">
                                <div class="construction-step" id="step1">
                                    <div class="step-number">1</div>
                                    <div class="step-content">
                                        <div class="step-title">🔐 Sign Transactions</div>
                                        <div class="step-description">Every transaction gets a digital signature to prove it's real</div>
                                        <div class="step-visual" id="signingVisual">
                                            <div class="signature-demo">
                                                <span class="tx-item">Alice sends $50 to Bob</span>
                                                <span class="sign-arrow">→</span>
                                                <span class="signature-result">✓ Verified</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="construction-step" id="step2">
                                    <div class="step-number">2</div>
                                    <div class="step-content">
                                        <div class="step-title">🌳 Organize with Merkle Tree</div>
                                        <div class="step-description">Bundle all transactions into one efficient summary</div>
                                        <div class="step-visual" id="merkleVisual">
                                            <div class="mini-merkle">
                                                <div class="merkle-root">Summary Hash</div>
                                                <div class="merkle-branches">
                                                    <span class="branch">Group A</span>
                                                    <span class="branch">Group B</span>
                                                </div>
                                                <div class="merkle-leaves">
                                                    <span class="leaf">TX1</span>
                                                    <span class="leaf">TX2</span>
                                                    <span class="leaf">TX3</span>
                                                    <span class="leaf">TX4</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="construction-step" id="step3">
                                    <div class="step-number">3</div>
                                    <div class="step-content">
                                        <div class="step-title">🌪️ Create Block Hash</div>
                                        <div class="step-description">Mix everything together to create a unique block fingerprint</div>
                                        <div class="step-visual" id="hashingVisual">
                                            <div class="hash-combination">
                                                <div class="hash-inputs">
                                                    <div class="hash-input">
                                                        <div class="input-label">Previous Block</div>
                                                        <div class="input-value">1a2b3c...</div>
                                                    </div>
                                                    <div class="hash-arrow">+</div>
                                                    <div class="hash-input">
                                                        <div class="input-label">Merkle Root</div>
                                                        <div class="input-value">d4e5f6...</div>
                                                    </div>
                                                    <div class="hash-arrow">+</div>
                                                    <div class="hash-input">
                                                        <div class="input-label">Timestamp</div>
                                                        <div class="input-value">2024-01-02</div>
                                                    </div>
                                                </div>
                                                <div class="hash-arrow">↓</div>
                                                <div class="hash-result" id="hashResult">New Block Hash: 7g8h9i...</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="construction-step" id="step4">
                                    <div class="step-number">4</div>
                                    <div class="step-content">
                                        <div class="step-title">⛓️ Connect to Chain</div>
                                        <div class="step-description">Link this block to the previous one, creating an unbreakable chain</div>
                                        <div class="step-visual" id="linkingVisual">
                                            <div class="chain-link-demo">
                                                <div class="chain-block">
                                                    <div class="chain-block-title">Previous Block</div>
                                                    <div class="chain-block-hash">1a2b3c...</div>
                                                </div>
                                                <div class="chain-arrow">→</div>
                                                <div class="chain-block">
                                                    <div class="chain-block-title">New Block</div>
                                                    <div class="chain-block-hash">7g8h9i...</div>
                                                </div>
                                                <div class="chain-arrow">→</div>
                                                <div class="chain-block">
                                                    <div class="chain-block-title">Next Block</div>
                                                    <div class="chain-block-hash">m4n5o6...</div>
                                                </div>
                                            </div>
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
                            <span class="bullet">🔗</span>
                            <span><strong>The Magic:</strong> Each block references the previous one, making tampering impossible</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">🔗</span>
                            <span><strong>Unbreakable Links:</strong> Each block depends on all previous blocks</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">▶️</span>
                            <span><strong>Next:</strong> See why this creates ultimate security</span>
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
            case 'blockchain-1-signing':
                if (title) title.textContent = 'Step 1-2: Secure Transactions';
                if (subtitle) subtitle.textContent = 'Sign transactions and organize them with Merkle trees';
                break;
            case 'blockchain-1-hashing':
                if (title) title.textContent = 'Step 3: Create Block Hash';
                if (subtitle) subtitle.textContent = 'Mix everything together to create a unique fingerprint';
                break;
            case 'blockchain-1-linking':
                if (title) title.textContent = 'Step 4: Connect the Chain';
                if (subtitle) subtitle.textContent = 'Link blocks together to create an unbreakable chain';
                break;
        }
    }

    /**
     * Filters content sections based on sub-slide requirements
     */
    filterContentSections(slideElement, sections) {
        const content = slideElement.querySelector('.slide-content');
        if (!content) return;

        // Hide all construction steps initially
        const allSteps = content.querySelectorAll('.construction-step');
        allSteps.forEach(step => {
            step.style.display = 'none';
        });

        // Show only specified sections
        sections.forEach(sectionId => {
            switch (sectionId) {
                case 'step1':
                    const step1 = content.querySelector('#step1');
                    if (step1) step1.style.display = 'block';
                    break;
                case 'step2':
                    const step2 = content.querySelector('#step2');
                    if (step2) step2.style.display = 'block';
                    break;
                case 'step3':
                    const step3 = content.querySelector('#step3');
                    if (step3) step3.style.display = 'block';
                    break;
                case 'step4':
                    const step4 = content.querySelector('#step4');
                    if (step4) step4.style.display = 'block';
                    break;
                case 'construction-process':
                    const constructionProcess = content.querySelector('.construction-process');
                    if (constructionProcess) constructionProcess.style.display = 'block';
                    break;
                case 'hash-combination':
                    const hashCombination = content.querySelector('.hash-combination');
                    if (hashCombination) hashCombination.style.display = 'block';
                    break;
                case 'chain-connection':
                    const chainConnection = content.querySelector('.chain-link-demo');
                    if (chainConnection) chainConnection.style.display = 'block';
                    break;
            }
        });
    }

    /**
     * Generates simplified HTML for a single block (for main view)
     */
    generateSimpleBlockHTML(block, index) {
        return `
            <div class="blockchain-block" id="block${index}" data-block-index="${index}">
                <div class="block-header">
                    <div class="block-title">Block #${block.index}</div>
                    <div class="block-timestamp">${block.timestamp}</div>
                </div>
                
                <div class="block-content">
                    <div class="block-summary">
                        <div class="summary-item">
                            <span class="summary-label">Transactions:</span>
                            <span class="summary-value">${block.transactions.length}</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-label">Previous Hash:</span>
                            <code class="summary-hash">${block.previousHash}</code>
                        </div>
                        <div class="summary-item">
                            <span class="summary-label">This Block's Hash:</span>
                            <code class="summary-hash">${block.hash}</code>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Generates HTML for a single block (detailed version)
     */
    generateBlockHTML(block, index) {
        return `
            <div class="blockchain-block" id="block${index}" data-block-index="${index}">
                <div class="block-header">
                    <div class="block-title">Block #${block.index}</div>
                    <div class="block-timestamp">${block.timestamp}</div>
                </div>
                
                <div class="block-content">
                    <div class="block-hash-display">
                        <div class="hash-label">Block Hash:</div>
                        <code class="block-hash" id="blockHash${index}">${block.hash}</code>
                    </div>
                    
                    <div class="block-summary">
                        <div class="summary-item">
                            <span class="summary-label">Transactions:</span>
                            <span class="summary-value">${block.transactions.length}</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-label">Merkle Root:</span>
                            <code class="summary-hash">${block.merkleRoot}</code>
                        </div>
                    </div>
                </div>
                
                <div class="block-particles" id="blockParticles${index}"></div>
            </div>
        `;
    }

    /**
     * Activates the blockchain part 1 animations
     */
    activate() {
        if (this.isActive) return;
        this.isActive = true;
        
        PresentationUtils.debug('Activating Blockchain Part 1 Demo');
        
        // Get element references
        this.elements = {
            blockchainChain: document.getElementById('blockchainChain'),
            processSteps: document.getElementById('processSteps'),
            constructionProcess: document.getElementById('constructionProcess')
        };

        // Get block and step references
        this.getElementReferences();
        
        if (!this.elements.blockchainChain) {
            console.warn('Blockchain part 1 elements not found, skipping activation');
            return;
        }

        // Set up animation callback
        this.animationController.addCallback(() => this.runConstructionAnimation());
        this.animationController.start();
        
        // Initial setup
        this.updateDisplay();
    }

    /**
     * Deactivates the blockchain part 1 animations
     */
    deactivate() {
        if (!this.isActive) return;
        this.isActive = false;
        
        PresentationUtils.debug('Deactivating Blockchain Part 1 Demo');
        
        // Stop animation controller
        this.animationController.stop();
        
        // Clean up animations
        this.clearAllAnimations();
    }

    /**
     * Gets references to elements
     */
    getElementReferences() {
        this.elements.blocks = [];
        this.elements.steps = [];
        
        // Get block references
        this.blocks.forEach((block, index) => {
            this.elements.blocks.push({
                container: document.getElementById(`block${index}`),
                blockHash: document.getElementById(`blockHash${index}`),
                particles: document.getElementById(`blockParticles${index}`)
            });
        });

        // Get step references
        for (let i = 1; i <= 4; i++) {
            this.elements.steps.push({
                container: document.getElementById(`step${i}`),
                visual: document.getElementById(['', 'signingVisual', 'merkleVisual', 'hashingVisual', 'linkingVisual'][i])
            });
        }
    }

    /**
     * Runs the main construction animation sequence
     */
    runConstructionAnimation() {
        if (!this.isActive) return;
        
        this.currentAnimationPhase = (this.currentAnimationPhase + 1) % 4;
        
        PresentationUtils.debug(`Construction animation phase: ${this.currentAnimationPhase}`);
        
        // Clear previous animations
        this.clearAllAnimations();
        
        switch (this.currentAnimationPhase) {
            case 0:
                this.animateSigningProcess();
                break;
            case 1:
                this.animateMerkleConstruction();
                break;
            case 2:
                this.animateBlockHashing();
                break;
            case 3:
                this.animateChainLinking();
                break;
        }
    }

    /**
     * Animates the transaction signing process
     */
    animateSigningProcess() {
        this.highlightStep(1);
        
        const signingVisual = this.elements.steps[0].visual;
        const signatureDemo = signingVisual.querySelector('.signature-demo');
        const txItem = signatureDemo.querySelector('.tx-item');
        const signResult = signatureDemo.querySelector('.signature-result');
        
        // Animate signing
        txItem.style.animation = 'glow 2s infinite';
        
        setTimeout(() => {
            if (this.isActive) {
                PresentationUtils.createParticles(signingVisual, 6, 2000);
                signResult.style.animation = 'fadeInScale 1s ease-out';
                signResult.style.color = 'var(--success-green)';
            }
        }, 1000);
        
        // Highlight corresponding block
        setTimeout(() => {
            if (this.isActive && this.elements.blocks[1]) {
                this.elements.blocks[1].container.classList.add('processing');
                PresentationUtils.createParticles(this.elements.blocks[1].particles, 8, 2000);
            }
        }, 2000);
    }

    /**
     * Animates Merkle tree construction
     */
    animateMerkleConstruction() {
        this.highlightStep(2);
        
        const merkleVisual = this.elements.steps[1].visual;
        const miniMerkle = merkleVisual.querySelector('.mini-merkle');
        const leaves = merkleVisual.querySelectorAll('.leaf');
        const branches = merkleVisual.querySelectorAll('.branch');
        const root = merkleVisual.querySelector('.merkle-root');
        
        // Animate tree building
        leaves.forEach((leaf, index) => {
            setTimeout(() => {
                if (this.isActive) {
                    leaf.style.animation = 'bounce 0.5s ease-out';
                    leaf.style.background = 'var(--success-green)';
                }
            }, index * 200);
        });
        
        setTimeout(() => {
            if (this.isActive) {
                branches.forEach(branch => {
                    branch.style.animation = 'fadeInScale 0.8s ease-out';
                    branch.style.background = 'var(--primary-blue)';
                });
            }
        }, 1000);
        
        setTimeout(() => {
            if (this.isActive) {
                root.style.animation = 'fadeInScale 1s ease-out';
                root.style.background = 'var(--primary-gold)';
                PresentationUtils.createParticles(miniMerkle, 10, 2000);
            }
        }, 1800);
    }

    /**
     * Animates block hashing process
     */
    animateBlockHashing() {
        this.highlightStep(3);
        
        const hashingVisual = this.elements.steps[2].visual;
        const hashInputs = hashingVisual.querySelectorAll('.hash-part');
        const hashResult = hashingVisual.querySelector('.hash-result');
        
        // Animate input combination
        hashInputs.forEach((input, index) => {
            setTimeout(() => {
                if (this.isActive) {
                    input.style.animation = 'pulse 1s ease-out';
                    input.style.background = 'var(--primary-blue)';
                }
            }, index * 300);
        });
        
        setTimeout(() => {
            if (this.isActive) {
                PresentationUtils.createParticles(hashingVisual, 12, 2500);
                hashResult.style.animation = 'fadeInScale 1s ease-out';
                hashResult.style.background = 'var(--primary-gold)';
                hashResult.style.color = 'white';
            }
        }, 1500);
    }

    /**
     * Animates chain linking process
     */
    animateChainLinking() {
        this.highlightStep(4);
        
        const linkingVisual = this.elements.steps[3].visual;
        const chainDemo = linkingVisual.querySelector('.chain-link-demo');
        const linkLine = chainDemo.querySelector('.link-line');
        
        // Animate chain connection
        linkLine.style.animation = 'chainConnection 2s ease-out';
        
        // Animate all blocks linking
        this.elements.blocks.forEach((block, index) => {
            setTimeout(() => {
                if (this.isActive && block.container) {
                    block.container.classList.add('linked');
                    PresentationUtils.createRipple(block.container, 'var(--success-green)');
                }
            }, index * 400);
        });
        
        setTimeout(() => {
            if (this.isActive) {
                PresentationUtils.createParticles(chainDemo, 8, 2000);
            }
        }, 1000);
    }

    /**
     * Highlights a specific step
     */
    highlightStep(stepNumber) {
        this.elements.steps.forEach((step, index) => {
            if (step.container) {
                step.container.classList.remove('active');
                if (index + 1 === stepNumber) {
                    step.container.classList.add('active');
                }
            }
        });
    }

    /**
     * Updates the display with current values
     */
    updateDisplay() {
        // Display is mostly static for this slide
    }

    /**
     * Clears all active animations
     */
    clearAllAnimations() {
        this.elements.steps.forEach(step => {
            if (step.container) {
                step.container.classList.remove('active');
            }
        });
        
        this.elements.blocks.forEach(block => {
            if (block.container) {
                block.container.classList.remove('processing', 'linked');
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
window.slideClasses['blockchain-part1'] = BlockchainPart1Demo;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlockchainPart1Demo;
}