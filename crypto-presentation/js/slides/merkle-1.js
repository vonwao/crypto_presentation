// js/slides/merkle-part1.js
// Merkle Trees Part 1: Tree Construction and How It Works

class MerklePart1Demo {
    constructor() {
        this.transactions = [
            { id: 'TX1', content: 'Alice → Bob: $50', hash: null },
            { id: 'TX2', content: 'Charlie → Alice: $25', hash: null },
            { id: 'TX3', content: 'Bob → David: $30', hash: null },
            { id: 'TX4', content: 'Eve → Charlie: $15', hash: null }
        ];
        
        this.currentAnimationPhase = 0;
        this.animationController = new AnimationController(7000); // 7 second cycles
        this.isActive = false;
        this.elements = {};
        
        // Generate transaction hashes
        this.generateTransactionHashes();
    }

    /**
     * Creates the HTML structure for merkle part 1
     * @returns {string} HTML string
     */
    createSlideHTML() {
        return `
            <div class="slide" data-slide="merkle-part1">
                <div class="slide-header">
                    <h1>Merkle Trees: Efficient Organization</h1>
                    <p class="subtitle">How to organize thousands of transactions efficiently</p>
                </div>
                
                <div class="slide-content">
                    <div class="merkle-construction">
                        <div class="concept-explanation" id="conceptExplanation">
                            <h2 class="concept-title">The Problem</h2>
                            <p class="concept-description">
                                How do you verify one transaction out of millions without downloading everything?
                            </p>
                            <div class="problem-visual" id="problemVisual">
                                <div class="massive-data">
                                    <div class="data-icon">📦</div>
                                    <div class="data-label">1 Million Transactions</div>
                                    <div class="data-size">~500 GB</div>
                                </div>
                                <div class="vs-arrow">VS</div>
                                <div class="efficient-solution">
                                    <div class="solution-icon">🌳</div>
                                    <div class="solution-label">Merkle Tree Proof</div>
                                    <div class="solution-size">~1 KB</div>
                                </div>
                            </div>
                        </div>

                        <div class="tree-builder" id="treeBuilder">
                            <h2 class="builder-title">Building the Tree</h2>
                            <div class="construction-area" id="constructionArea">
                                
                                <!-- Root Level -->
                                <div class="tree-level root-level">
                                    <div class="tree-node root-node" id="rootNode">
                                        <div class="node-label">Merkle Root</div>
                                        <div class="node-hash" id="rootHash">Building...</div>
                                    </div>
                                </div>
                                
                                <!-- Branch Level -->
                                <div class="tree-level branch-level">
                                    <div class="tree-node branch-node" id="branchLeft">
                                        <div class="node-hash" id="branchLeftHash">...</div>
                                    </div>
                                    <div class="tree-node branch-node" id="branchRight">
                                        <div class="node-hash" id="branchRightHash">...</div>
                                    </div>
                                </div>
                                
                                <!-- Leaf Level (Transactions) -->
                                <div class="tree-level leaf-level">
                                    ${this.transactions.map((tx, index) => `
                                        <div class="tree-node leaf-node" id="leaf${index}" data-tx-index="${index}">
                                            <div class="node-label">${tx.id}</div>
                                            <div class="transaction-content">${tx.content}</div>
                                            <div class="node-hash" id="leaf${index}Hash">${tx.hash}</div>
                                        </div>
                                    `).join('')}
                                </div>
                                
                                <!-- Connection lines -->
                                <div class="tree-connections" id="treeConnections">
                                    <svg class="connection-svg" id="connectionSvg">
                                        <!-- Lines will be drawn dynamically -->
                                    </svg>
                                </div>
                                
                                <!-- Animation particles -->
                                <div class="construction-particles" id="constructionParticles"></div>
                            </div>
                        </div>

                        <div class="step-explanation" id="stepExplanation">
                            <h2 class="step-title">How It Works</h2>
                            <div class="steps-grid">
                                <div class="step-item" id="step1">
                                    <div class="step-number">1</div>
                                    <div class="step-content">
                                        <h4>Hash Transactions</h4>
                                        <p>Each transaction gets a unique fingerprint</p>
                                    </div>
                                </div>
                                
                                <div class="step-item" id="step2">
                                    <div class="step-number">2</div>
                                    <div class="step-content">
                                        <h4>Pair & Combine</h4>
                                        <p>Hash pairs together to build branches</p>
                                    </div>
                                </div>
                                
                                <div class="step-item" id="step3">
                                    <div class="step-number">3</div>
                                    <div class="step-content">
                                        <h4>Build Upward</h4>
                                        <p>Keep combining until you reach the root</p>
                                    </div>
                                </div>
                                
                                <div class="step-item" id="step4">
                                    <div class="step-number">4</div>
                                    <div class="step-content">
                                        <h4>Single Root</h4>
                                        <p>One hash represents all transactions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="slide-footer">
                    <div class="key-points">
                        <div class="key-point">
                            <span class="bullet">🌳</span>
                            <span><strong>Logarithmic:</strong> Only need log₂(n) hashes to verify any transaction</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">⚡</span>
                            <span><strong>Efficient:</strong> 1 KB proof instead of 500 GB download</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">▶️</span>
                            <span><strong>Next:</strong> See proof of inclusion in action!</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Activates the merkle part 1 animations
     */
    activate() {
        if (this.isActive) return;
        this.isActive = true;
        
        PresentationUtils.debug('Activating Merkle Part 1 Demo');
        
        // Get element references
        this.elements = {
            conceptExplanation: document.getElementById('conceptExplanation'),
            problemVisual: document.getElementById('problemVisual'),
            treeBuilder: document.getElementById('treeBuilder'),
            constructionArea: document.getElementById('constructionArea'),
            constructionParticles: document.getElementById('constructionParticles'),
            stepExplanation: document.getElementById('stepExplanation'),
            rootNode: document.getElementById('rootNode'),
            rootHash: document.getElementById('rootHash')
        };

        this.getElementReferences();
        
        if (!this.elements.treeBuilder) {
            console.warn('Merkle part 1 elements not found, skipping activation');
            return;
        }

        // Set up animation callback
        this.animationController.addCallback(() => this.runConstructionAnimation());
        this.animationController.start();
        
        // Initial setup
        this.updateDisplay();
        this.drawConnections();
    }

    /**
     * Deactivates the merkle part 1 animations
     */
    deactivate() {
        if (!this.isActive) return;
        this.isActive = false;
        
        PresentationUtils.debug('Deactivating Merkle Part 1 Demo');
        
        // Stop animation controller
        this.animationController.stop();
        
        // Clean up animations
        this.clearAllAnimations();
    }

    /**
     * Gets references to elements
     */
    getElementReferences() {
        this.elements.leafNodes = [];
        this.elements.branchNodes = [];
        this.elements.stepItems = [];
        
        // Get leaf nodes
        for (let i = 0; i < 4; i++) {
            this.elements.leafNodes.push({
                node: document.getElementById(`leaf${i}`),
                hash: document.getElementById(`leaf${i}Hash`)
            });
        }
        
        // Get branch nodes
        this.elements.branchNodes = [
            {
                node: document.getElementById('branchLeft'),
                hash: document.getElementById('branchLeftHash')
            },
            {
                node: document.getElementById('branchRight'),
                hash: document.getElementById('branchRightHash')
            }
        ];

        // Get step items
        for (let i = 1; i <= 4; i++) {
            this.elements.stepItems.push(document.getElementById(`step${i}`));
        }
    }

    /**
     * Runs the main construction animation sequence
     */
    runConstructionAnimation() {
        if (!this.isActive) return;
        
        this.currentAnimationPhase = (this.currentAnimationPhase + 1) % 3;
        
        PresentationUtils.debug(`Merkle construction phase: ${this.currentAnimationPhase}`);
        
        // Clear previous animations
        this.clearAllAnimations();
        
        switch (this.currentAnimationPhase) {
            case 0:
                this.explainProblem();
                break;
            case 1:
                this.buildTreeFromBottom();
                break;
            case 2:
                this.explainSteps();
                break;
        }
    }

    /**
     * Explains the efficiency problem
     */
    explainProblem() {
        // Phase 1: Highlight the massive data problem
        setTimeout(() => {
            if (this.isActive) {
                const massiveData = this.elements.problemVisual.querySelector('.massive-data');
                massiveData.style.animation = 'problemPulse 2s infinite';
                massiveData.style.color = 'var(--alert-red)';
                PresentationUtils.createRipple(massiveData, 'var(--alert-red)');
            }
        }, 500);

        // Phase 2: Show the efficient solution
        setTimeout(() => {
            if (this.isActive) {
                const solution = this.elements.problemVisual.querySelector('.efficient-solution');
                solution.style.animation = 'solutionReveal 2s ease-out';
                solution.style.color = 'var(--success-green)';
                PresentationUtils.createRipple(solution, 'var(--success-green)');
                
                // Add victory particles
                PresentationUtils.createParticles(this.elements.problemVisual, 10, 3000);
            }
        }, 3000);

        // Phase 3: Emphasize the difference
        setTimeout(() => {
            if (this.isActive) {
                const vsArrow = this.elements.problemVisual.querySelector('.vs-arrow');
                vsArrow.style.animation = 'vsHighlight 1s ease-out';
                vsArrow.style.color = 'var(--primary-gold)';
                vsArrow.style.fontSize = '2rem';
            }
        }, 5000);
    }

    /**
     * Builds the tree from bottom to top
     */
    buildTreeFromBottom() {
        // Reset problem visual
        this.resetProblemVisual();

        // Phase 1: Highlight leaf transactions (1 second)
        this.highlightLeafNodes();
        
        // Phase 2: Build left branch (2 seconds)
        setTimeout(() => {
            if (this.isActive) this.buildBranch(0, [0, 1]);
        }, 1500);
        
        // Phase 3: Build right branch (2 seconds)  
        setTimeout(() => {
            if (this.isActive) this.buildBranch(1, [2, 3]);
        }, 3500);
        
        // Phase 4: Build root (1.5 seconds)
        setTimeout(() => {
            if (this.isActive) this.buildRoot();
        }, 5500);
    }

    /**
     * Highlights all leaf nodes
     */
    highlightLeafNodes() {
        this.elements.leafNodes.forEach((leaf, index) => {
            setTimeout(() => {
                if (this.isActive && leaf.node) {
                    leaf.node.classList.add('building');
                    PresentationUtils.createParticles(leaf.node, 4, 1500);
                }
            }, index * 200);
        });
    }

    /**
     * Builds a branch node from two leaf nodes
     */
    buildBranch(branchIndex, leafIndices) {
        const branch = this.elements.branchNodes[branchIndex];
        const leftLeaf = this.elements.leafNodes[leafIndices[0]];
        const rightLeaf = this.elements.leafNodes[leafIndices[1]];
        
        // Combine hashes
        const leftHash = this.transactions[leafIndices[0]].hash;
        const rightHash = this.transactions[leafIndices[1]].hash;
        const combinedHash = this.combineHashes(leftHash, rightHash);
        
        // Animate combination
        this.animateHashCombination(leftLeaf.node, rightLeaf.node, branch.node);
        
        // Update branch hash
        setTimeout(() => {
            if (this.isActive && branch.hash) {
                branch.hash.textContent = combinedHash;
                branch.node.classList.add('building');
                PresentationUtils.createRipple(branch.node, 'var(--primary-blue)');
            }
        }, 1000);
    }

    /**
     * Builds the root node
     */
    buildRoot() {
        const leftBranch = this.elements.branchNodes[0];
        const rightBranch = this.elements.branchNodes[1];
        
        // Combine branch hashes
        const leftHash = leftBranch.hash.textContent;
        const rightHash = rightBranch.hash.textContent;
        const rootHash = this.combineHashes(leftHash, rightHash);
        
        // Animate final combination
        this.animateHashCombination(leftBranch.node, rightBranch.node, this.elements.rootNode);
        
        // Update root hash
        setTimeout(() => {
            if (this.isActive) {
                this.elements.rootHash.textContent = rootHash;
                this.elements.rootNode.classList.add('building');
                
                // Victory animation
                PresentationUtils.createRipple(this.elements.rootNode, 'var(--primary-gold)');
                PresentationUtils.createParticles(this.elements.constructionParticles, 15, 3000);
                
                // Highlight the achievement
                this.elements.rootNode.style.animation = 'rootVictory 2s ease-out';
            }
        }, 800);
    }

    /**
     * Explains the construction steps
     */
    explainSteps() {
        // Reset tree highlights
        this.clearTreeHighlights();

        // Highlight steps one by one
        this.elements.stepItems.forEach((step, index) => {
            setTimeout(() => {
                if (this.isActive && step) {
                    step.classList.add('highlighted');
                    step.style.animation = 'stepHighlight 1s ease-out';
                    PresentationUtils.createRipple(step, 'var(--primary-blue)');
                }
            }, index * 800);
        });

        // Show overall completion
        setTimeout(() => {
            if (this.isActive) {
                this.elements.stepExplanation.style.animation = 'completionGlow 2s ease-out';
                PresentationUtils.createParticles(this.elements.stepExplanation, 8, 2000);
            }
        }, 3500);
    }

    /**
     * Animates hash combination between nodes
     */
    animateHashCombination(leftNode, rightNode, targetNode) {
        // Create combination particles
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                if (this.isActive) {
                    this.createCombinationParticle(leftNode, targetNode, 'var(--primary-blue)');
                    this.createCombinationParticle(rightNode, targetNode, 'var(--success-green)');
                }
            }, i * 200);
        }
    }

    /**
     * Creates a particle flowing between nodes
     */
    createCombinationParticle(fromNode, toNode, color) {
        const particle = document.createElement('div');
        particle.className = 'combination-particle';
        particle.style.background = color;
        particle.style.position = 'absolute';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = `0 0 6px ${color}`;
        particle.style.zIndex = '10';
        
        const fromRect = fromNode.getBoundingClientRect();
        const toRect = toNode.getBoundingClientRect();
        const containerRect = this.elements.constructionArea.getBoundingClientRect();
        
        particle.style.left = (fromRect.left - containerRect.left + fromRect.width / 2) + 'px';
        particle.style.top = (fromRect.top - containerRect.top + fromRect.height / 2) + 'px';
        
        const deltaX = (toRect.left - fromRect.left);
        const deltaY = (toRect.top - fromRect.top);
        
        particle.style.transition = 'all 1s ease-out';
        this.elements.constructionArea.appendChild(particle);
        
        // Animate to target
        setTimeout(() => {
            particle.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            particle.style.opacity = '0';
        }, 50);
        
        // Remove particle
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 1000);
    }

    /**
     * Draws connection lines between tree levels
     */
    drawConnections() {
        // Simple implementation - could be enhanced with SVG
        // For now, CSS handles the visual connections
    }

    /**
     * Generates transaction hashes
     */
    generateTransactionHashes() {
        this.transactions.forEach(tx => {
            tx.hash = PresentationUtils.simpleHash(tx.content).substring(0, 8) + '...';
        });
    }

    /**
     * Combines two hashes
     */
    combineHashes(hash1, hash2) {
        const combined = hash1 + hash2;
        return PresentationUtils.simpleHash(combined).substring(0, 8) + '...';
    }

    /**
     * Resets the problem visual
     */
    resetProblemVisual() {
        const massiveData = this.elements.problemVisual.querySelector('.massive-data');
        const solution = this.elements.problemVisual.querySelector('.efficient-solution');
        const vsArrow = this.elements.problemVisual.querySelector('.vs-arrow');
        
        massiveData.style.animation = '';
        massiveData.style.color = '';
        solution.style.animation = '';
        solution.style.color = '';
        vsArrow.style.animation = '';
        vsArrow.style.color = '';
        vsArrow.style.fontSize = '';
    }

    /**
     * Clears tree highlights
     */
    clearTreeHighlights() {
        // Clear leaf highlights
        this.elements.leafNodes.forEach(leaf => {
            if (leaf.node) {
                leaf.node.classList.remove('building');
            }
        });
        
        // Clear branch highlights
        this.elements.branchNodes.forEach(branch => {
            if (branch.node) {
                branch.node.classList.remove('building');
            }
        });
        
        // Clear root highlight
        this.elements.rootNode.classList.remove('building');
        this.elements.rootNode.style.animation = '';
    }

    /**
     * Updates the display with current values
     */
    updateDisplay() {
        // Update leaf node hashes
        this.elements.leafNodes.forEach((leaf, index) => {
            if (leaf.hash) {
                leaf.hash.textContent = this.transactions[index].hash;
            }
        });
        
        // Set initial state
        this.elements.rootHash.textContent = 'Building...';
        
        // Clear branch hashes
        this.elements.branchNodes.forEach(branch => {
            if (branch.hash) {
                branch.hash.textContent = '...';
            }
        });
    }

    /**
     * Clears all active animations
     */
    clearAllAnimations() {
        this.resetProblemVisual();
        this.clearTreeHighlights();
        
        // Clear step highlights
        this.elements.stepItems.forEach(step => {
            if (step) {
                step.classList.remove('highlighted');
                step.style.animation = '';
            }
        });
        
        // Clear explanation animations
        if (this.elements.stepExplanation) {
            this.elements.stepExplanation.style.animation = '';
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
            transactionCount: this.transactions.length,
            controller: this.animationController.getStatus()
        };
    }
}

// Register the slide class
if (typeof window.slideClasses === 'undefined') {
    window.slideClasses = {};
}
window.slideClasses['merkle-part1'] = MerklePart1Demo;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MerklePart1Demo;
}