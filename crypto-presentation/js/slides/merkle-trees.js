// js/slides/merkle-trees.js
// Merkle Trees slide with tree construction and proof-of-inclusion animations

class MerkleTreeDemo {
    constructor() {
        this.transactions = [
            { id: 'TX1', content: 'Alice → Bob: $50', hash: null },
            { id: 'TX2', content: 'Charlie → Alice: $25', hash: null },
            { id: 'TX3', content: 'Bob → David: $30', hash: null },
            { id: 'TX4', content: 'Eve → Charlie: $15', hash: null },
            { id: 'TX5', content: 'David → Alice: $20', hash: null },
            { id: 'TX6', content: 'Alice → Eve: $10', hash: null },
            { id: 'TX7', content: 'Bob → Charlie: $35', hash: null },
            { id: 'TX8', content: 'Eve → David: $40', hash: null }
        ];
        
        this.tree = {};
        this.currentAnimationPhase = 0;
        this.selectedTxIndex = 0;
        this.animationController = new AnimationController(8000); // 8 second cycles
        this.isActive = false;
        this.elements = {};
        
        // Generate initial hashes
        this.generateTransactionHashes();
    }

    /**
     * Creates the HTML structure for the merkle tree slide
     * @returns {string} HTML string
     */
    createSlideHTML() {
        return `
            <div class="slide" data-slide="merkle">
                <div class="slide-header">
                    <h1>Merkle Trees: The Efficient Detective</h1>
                    <p class="subtitle">Verify data integrity without downloading everything</p>
                </div>
                
                <div class="slide-content">
                    <div class="merkle-demo">
                        <div class="tree-section">
                            <div class="tree-container" id="treeContainer">
                                <div class="tree-structure" id="treeStructure">
                                    <!-- Root Level -->
                                    <div class="tree-level root-level">
                                        <div class="tree-node root-node" id="rootNode">
                                            <div class="node-label">Merkle Root</div>
                                            <div class="node-hash" id="rootHash">Building...</div>
                                        </div>
                                    </div>
                                    
                                    <!-- Level 1 -->
                                    <div class="tree-level level-1">
                                        <div class="tree-node branch-node" id="branch1">
                                            <div class="node-hash" id="branch1Hash">...</div>
                                        </div>
                                        <div class="tree-node branch-node" id="branch2">
                                            <div class="node-hash" id="branch2Hash">...</div>
                                        </div>
                                    </div>
                                    
                                    <!-- Level 2 -->
                                    <div class="tree-level level-2">
                                        <div class="tree-node branch-node" id="branch3">
                                            <div class="node-hash" id="branch3Hash">...</div>
                                        </div>
                                        <div class="tree-node branch-node" id="branch4">
                                            <div class="node-hash" id="branch4Hash">...</div>
                                        </div>
                                        <div class="tree-node branch-node" id="branch5">
                                            <div class="node-hash" id="branch5Hash">...</div>
                                        </div>
                                        <div class="tree-node branch-node" id="branch6">
                                            <div class="node-hash" id="branch6Hash">...</div>
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
                                </div>
                                
                                <!-- Connection Lines -->
                                <div class="tree-connections" id="treeConnections">
                                    <!-- Lines will be drawn dynamically -->
                                </div>
                                
                                <!-- Animation Particles -->
                                <div class="hash-particles" id="hashParticles"></div>
                            </div>
                        </div>

                        <div class="proof-section">
                            <h3 class="section-title">Proof of Inclusion</h3>
                            <div class="proof-demonstration" id="proofDemo">
                                <div class="proof-scenario">
                                    <div class="proof-question">
                                        <strong>Question:</strong> Is transaction "<span id="proofTxContent">Alice → Bob: $50</span>" 
                                        included in this block?
                                    </div>
                                    
                                    <div class="proof-path" id="proofPath">
                                        <div class="proof-step">
                                            <span class="step-number">1.</span>
                                            <span class="step-description">Get transaction hash</span>
                                            <code class="step-value" id="proofTxHash">a1b2c3...</code>
                                        </div>
                                        
                                        <div class="proof-step">
                                            <span class="step-number">2.</span>
                                            <span class="step-description">Get sibling hashes</span>
                                            <div class="sibling-hashes" id="siblingHashes">
                                                <code class="sibling-hash">d4e5f6...</code>
                                                <code class="sibling-hash">g7h8i9...</code>
                                                <code class="sibling-hash">j1k2l3...</code>
                                            </div>
                                        </div>
                                        
                                        <div class="proof-step">
                                            <span class="step-number">3.</span>
                                            <span class="step-description">Compute path to root</span>
                                            <div class="computation-path" id="computationPath">
                                                <div class="computation-step">Hash(TX1 + TX2) = <code>m4n5o6...</code></div>
                                                <div class="computation-step">Hash(AB + CD) = <code>p7q8r9...</code></div>
                                                <div class="computation-step">Hash(ABCD + EFGH) = <code>s1t2u3...</code></div>
                                            </div>
                                        </div>
                                        
                                        <div class="proof-result" id="proofResult">
                                            <div class="result-check">
                                                <span class="result-icon" id="resultIcon">✓</span>
                                                <span class="result-text" id="resultText">Matches Merkle Root! Transaction is verified.</span>
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
                            <span class="bullet">🌳</span>
                            <span><strong>Efficient:</strong> Verify any transaction with just log₂(n) hashes</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">🔍</span>
                            <span><strong>Tamper-proof:</strong> Any change breaks the entire tree</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">⚡</span>
                            <span><strong>Scalable:</strong> Works with millions of transactions</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Activates the merkle tree animations
     */
    activate() {
        if (this.isActive) return;
        this.isActive = true;
        
        PresentationUtils.debug('Activating Merkle Tree Demo');
        
        // Get element references
        this.elements = {
            treeStructure: document.getElementById('treeStructure'),
            treeConnections: document.getElementById('treeConnections'),
            hashParticles: document.getElementById('hashParticles'),
            rootNode: document.getElementById('rootNode'),
            rootHash: document.getElementById('rootHash'),
            proofTxContent: document.getElementById('proofTxContent'),
            proofTxHash: document.getElementById('proofTxHash'),
            siblingHashes: document.getElementById('siblingHashes'),
            computationPath: document.getElementById('computationPath'),
            proofResult: document.getElementById('proofResult'),
            resultIcon: document.getElementById('resultIcon'),
            resultText: document.getElementById('resultText')
        };

        // Get node references
        this.getNodeReferences();
        
        if (!this.elements.treeStructure) {
            console.warn('Merkle tree elements not found, skipping activation');
            return;
        }

        // Set up animation callback
        this.animationController.addCallback(() => this.runTreeAnimation());
        this.animationController.start();
        
        // Initial display
        this.updateDisplay();
        this.drawConnections();
    }

    /**
     * Deactivates the merkle tree animations
     */
    deactivate() {
        if (!this.isActive) return;
        this.isActive = false;
        
        PresentationUtils.debug('Deactivating Merkle Tree Demo');
        
        // Stop animation controller
        this.animationController.stop();
        
        // Clean up animations
        if (this.elements.treeStructure) {
            const nodes = this.elements.treeStructure.querySelectorAll('.tree-node');
            nodes.forEach(node => {
                node.classList.remove('building', 'highlighted', 'proof-path');
            });
        }
    }

    /**
     * Gets references to all tree nodes
     */
    getNodeReferences() {
        this.elements.leafNodes = [];
        this.elements.branchNodes = [];
        
        // Get leaf nodes (transactions)
        for (let i = 0; i < 8; i++) {
            this.elements.leafNodes.push({
                node: document.getElementById(`leaf${i}`),
                hash: document.getElementById(`leaf${i}Hash`)
            });
        }
        
        // Get branch nodes
        for (let i = 1; i <= 6; i++) {
            this.elements.branchNodes.push({
                node: document.getElementById(`branch${i}`),
                hash: document.getElementById(`branch${i}Hash`)
            });
        }
    }

    /**
     * Runs the main tree building animation sequence
     */
    runTreeAnimation() {
        if (!this.isActive) return;
        
        this.currentAnimationPhase = (this.currentAnimationPhase + 1) % 3;
        
        PresentationUtils.debug(`Merkle tree animation phase: ${this.currentAnimationPhase}`);
        
        switch (this.currentAnimationPhase) {
            case 0:
                this.buildTreeFromBottom();
                break;
            case 1:
                this.demonstrateProofOfInclusion();
                break;
            case 2:
                this.showTamperDetection();
                break;
        }
    }

    /**
     * Animates building the tree from leaf nodes up to root
     */
    buildTreeFromBottom() {
        // Reset all nodes
        this.clearAllHighlights();
        
        // Phase 1: Highlight leaf nodes (1 second)
        this.highlightLeafNodes();
        
        // Phase 2: Build level 2 branches (2 seconds)
        setTimeout(() => {
            if (this.isActive) this.buildLevel2();
        }, 1000);
        
        // Phase 3: Build level 1 branches (2 seconds)
        setTimeout(() => {
            if (this.isActive) this.buildLevel1();
        }, 3000);
        
        // Phase 4: Build root (2 seconds)
        setTimeout(() => {
            if (this.isActive) this.buildRoot();
        }, 5000);
    }

    /**
     * Highlights all leaf nodes with staggered animation
     */
    highlightLeafNodes() {
        this.elements.leafNodes.forEach((leaf, index) => {
            setTimeout(() => {
                if (this.isActive && leaf.node) {
                    leaf.node.classList.add('building');
                    this.createHashParticles(leaf.node, 'leaf');
                }
            }, index * 100);
        });
    }

    /**
     * Builds level 2 branch nodes (pairs of leaves)
     */
    buildLevel2() {
        // Build 4 branch nodes from 8 leaf nodes
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                if (!this.isActive) return;
                
                const branchNode = this.elements.branchNodes[i + 2]; // branch3-6
                const leftLeaf = this.elements.leafNodes[i * 2];
                const rightLeaf = this.elements.leafNodes[i * 2 + 1];
                
                // Combine hashes
                const combinedHash = this.combineHashes(
                    this.transactions[i * 2].hash,
                    this.transactions[i * 2 + 1].hash
                );
                
                // Animate hash combination
                this.animateHashCombination(leftLeaf.node, rightLeaf.node, branchNode.node);
                
                // Update hash display
                if (branchNode.hash) {
                    branchNode.hash.textContent = combinedHash;
                }
                
                branchNode.node.classList.add('building');
                
            }, i * 400);
        }
    }

    /**
     * Builds level 1 branch nodes
     */
    buildLevel1() {
        // Build 2 branch nodes from 4 level-2 branches
        for (let i = 0; i < 2; i++) {
            setTimeout(() => {
                if (!this.isActive) return;
                
                const branchNode = this.elements.branchNodes[i]; // branch1-2
                const leftChild = this.elements.branchNodes[i * 2 + 2];
                const rightChild = this.elements.branchNodes[i * 2 + 3];
                
                // Combine hashes
                const leftHash = leftChild.hash.textContent;
                const rightHash = rightChild.hash.textContent;
                const combinedHash = this.combineHashes(leftHash, rightHash);
                
                // Animate hash combination
                this.animateHashCombination(leftChild.node, rightChild.node, branchNode.node);
                
                // Update hash display
                if (branchNode.hash) {
                    branchNode.hash.textContent = combinedHash;
                }
                
                branchNode.node.classList.add('building');
                
            }, i * 600);
        }
    }

    /**
     * Builds the root node
     */
    buildRoot() {
        if (!this.isActive) return;
        
        const leftBranch = this.elements.branchNodes[0];
        const rightBranch = this.elements.branchNodes[1];
        
        // Combine top-level hashes
        const leftHash = leftBranch.hash.textContent;
        const rightHash = rightBranch.hash.textContent;
        const rootHash = this.combineHashes(leftHash, rightHash);
        
        // Animate final combination
        this.animateHashCombination(leftBranch.node, rightBranch.node, this.elements.rootNode);
        
        // Update root hash
        setTimeout(() => {
            if (this.isActive && this.elements.rootHash) {
                this.elements.rootHash.textContent = rootHash;
                this.elements.rootNode.classList.add('building');
                
                // Victory animation
                PresentationUtils.createRipple(this.elements.rootNode, 'var(--primary-gold)');
            }
        }, 800);
    }

    /**
     * Demonstrates proof of inclusion for a specific transaction
     */
    demonstrateProofOfInclusion() {
        this.clearAllHighlights();
        
        // Select a transaction to prove
        this.selectedTxIndex = (this.selectedTxIndex + 1) % this.transactions.length;
        const selectedTx = this.transactions[this.selectedTxIndex];
        
        // Update proof display
        this.elements.proofTxContent.textContent = selectedTx.content;
        this.elements.proofTxHash.textContent = selectedTx.hash;
        
        // Highlight the proof path
        this.highlightProofPath(this.selectedTxIndex);
        
        // Animate proof verification
        setTimeout(() => {
            if (this.isActive) this.animateProofVerification();
        }, 1000);
    }

    /**
     * Highlights the path from selected transaction to root
     */
    highlightProofPath(txIndex) {
        // Highlight selected transaction
        const leafNode = this.elements.leafNodes[txIndex];
        leafNode.node.classList.add('proof-path');
        
        // Calculate path to root
        let currentIndex = txIndex;
        let level = 0;
        
        // Level 2 (pairs)
        const level2Index = Math.floor(currentIndex / 2);
        const level2Node = this.elements.branchNodes[level2Index + 2];
        level2Node.node.classList.add('proof-path');
        
        // Level 1
        const level1Index = Math.floor(level2Index / 2);
        const level1Node = this.elements.branchNodes[level1Index];
        level1Node.node.classList.add('proof-path');
        
        // Root
        this.elements.rootNode.classList.add('proof-path');
        
        // Create flowing particles along the path
        this.createProofPathParticles(txIndex);
    }

    /**
     * Shows what happens when data is tampered with
     */
    showTamperDetection() {
        this.clearAllHighlights();
        
        // Simulate tampering with a transaction
        const tamperIndex = 2; // TX3
        const originalTx = this.transactions[tamperIndex];
        const leafNode = this.elements.leafNodes[tamperIndex];
        
        // Show "tampered" transaction
        leafNode.node.classList.add('tampered');
        leafNode.hash.textContent = 'TAMPERED!';
        
        // Show how it breaks the tree
        setTimeout(() => {
            if (this.isActive) this.propagateTamperEffect(tamperIndex);
        }, 1000);
        
        // Reset after demonstration
        setTimeout(() => {
            if (this.isActive) {
                leafNode.node.classList.remove('tampered');
                leafNode.hash.textContent = originalTx.hash;
                this.clearAllHighlights();
            }
        }, 4000);
    }

    /**
     * Shows how tampering propagates up the tree
     */
    propagateTamperEffect(tamperIndex) {
        // Level 2
        setTimeout(() => {
            if (!this.isActive) return;
            const level2Index = Math.floor(tamperIndex / 2);
            const level2Node = this.elements.branchNodes[level2Index + 2];
            level2Node.node.classList.add('tampered');
            level2Node.hash.textContent = 'BROKEN!';
        }, 500);
        
        // Level 1
        setTimeout(() => {
            if (!this.isActive) return;
            const level2Index = Math.floor(tamperIndex / 2);
            const level1Index = Math.floor(level2Index / 2);
            const level1Node = this.elements.branchNodes[level1Index];
            level1Node.node.classList.add('tampered');
            level1Node.hash.textContent = 'BROKEN!';
        }, 1000);
        
        // Root
        setTimeout(() => {
            if (!this.isActive) return;
            this.elements.rootNode.classList.add('tampered');
            this.elements.rootHash.textContent = 'INVALID!';
        }, 1500);
    }

    /**
     * Animates hash combination between two nodes
     */
    animateHashCombination(leftNode, rightNode, targetNode) {
        // Create particles flowing from children to parent
        const leftRect = leftNode.getBoundingClientRect();
        const rightRect = rightNode.getBoundingClientRect();
        const targetRect = targetNode.getBoundingClientRect();
        
        // Create particles from both sources
        this.createCombinationParticles(leftNode, targetNode, 'var(--primary-blue)');
        this.createCombinationParticles(rightNode, targetNode, 'var(--success-green)');
        
        // Pulse the target node
        setTimeout(() => {
            PresentationUtils.pulse(targetNode, 800, 1);
        }, 600);
    }

    /**
     * Creates particles flowing between nodes
     */
    createCombinationParticles(fromNode, toNode, color) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'combination-particle';
                particle.style.background = color;
                
                const fromRect = fromNode.getBoundingClientRect();
                const toRect = toNode.getBoundingClientRect();
                const containerRect = this.elements.treeStructure.getBoundingClientRect();
                
                particle.style.left = (fromRect.left - containerRect.left + fromRect.width / 2) + 'px';
                particle.style.top = (fromRect.top - containerRect.top + fromRect.height / 2) + 'px';
                
                const deltaX = (toRect.left - fromRect.left);
                const deltaY = (toRect.top - fromRect.top);
                
                particle.style.setProperty('--deltaX', deltaX + 'px');
                particle.style.setProperty('--deltaY', deltaY + 'px');
                particle.style.animation = 'particleFlow 1s ease-out forwards';
                
                this.elements.hashParticles.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.remove();
                    }
                }, 1000);
                
            }, i * 100);
        }
    }

    /**
     * Creates hash particles around a node
     */
    createHashParticles(node, type) {
        PresentationUtils.createParticles(node, 4, 1500);
    }

    /**
     * Creates particles flowing along proof path
     */
    createProofPathParticles(txIndex) {
        // Implementation for proof path particle animation
        const pathNodes = this.getProofPathNodes(txIndex);
        
        pathNodes.forEach((node, index) => {
            setTimeout(() => {
                if (this.isActive) {
                    PresentationUtils.createRipple(node, 'var(--primary-gold)');
                }
            }, index * 300);
        });
    }

    /**
     * Gets nodes in the proof path for a transaction
     */
    getProofPathNodes(txIndex) {
        const nodes = [];
        
        nodes.push(this.elements.leafNodes[txIndex].node);
        
        const level2Index = Math.floor(txIndex / 2);
        nodes.push(this.elements.branchNodes[level2Index + 2].node);
        
        const level1Index = Math.floor(level2Index / 2);
        nodes.push(this.elements.branchNodes[level1Index].node);
        
        nodes.push(this.elements.rootNode);
        
        return nodes;
    }

    /**
     * Animates proof verification
     */
    animateProofVerification() {
        // Animate computation steps
        const steps = this.elements.computationPath.querySelectorAll('.computation-step');
        
        steps.forEach((step, index) => {
            setTimeout(() => {
                if (this.isActive) {
                    step.style.animation = 'fadeInUp 0.5s ease-out';
                    step.style.background = 'rgba(0, 255, 136, 0.1)';
                }
            }, index * 500);
        });
        
        // Show final result
        setTimeout(() => {
            if (this.isActive) {
                this.elements.resultIcon.textContent = '✅';
                this.elements.resultText.textContent = 'Verified! Transaction is authentic.';
                this.elements.proofResult.style.animation = 'bounce 1s ease-out';
            }
        }, 2000);
    }

    /**
     * Draws connection lines between tree levels
     */
    drawConnections() {
        // This would draw SVG lines connecting parent/child nodes
        // Implementation depends on your styling preferences
    }

    /**
     * Clears all node highlights
     */
    clearAllHighlights() {
        if (!this.elements.treeStructure) return;
        
        const allNodes = this.elements.treeStructure.querySelectorAll('.tree-node');
        allNodes.forEach(node => {
            node.classList.remove('building', 'highlighted', 'proof-path', 'tampered');
        });
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
     * Combines two hashes (simplified)
     */
    combineHashes(hash1, hash2) {
        const combined = hash1 + hash2;
        return PresentationUtils.simpleHash(combined).substring(0, 8) + '...';
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

// Register the slide class
if (typeof window.slideClasses === 'undefined') {
    window.slideClasses = {};
}
window.slideClasses['merkle'] = MerkleTreeDemo;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MerkleTreeDemo;
}