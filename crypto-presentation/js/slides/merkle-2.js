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
                                            <div class="tx-hash tampered">CHANGED!</div>
                                        </div>
                                    </div>
                                    
                                    <div class="tamper-result" id="tamperResult">
                                        <div class="result-icon" id="tamperResultIcon">⚠️</div>
                                        <div class="result-message" id="tamperResultMessage">
                                            Hash mismatch detected! Tree