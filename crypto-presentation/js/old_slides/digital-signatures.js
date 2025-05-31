// js/slides/digital-signatures.js
// Digital Signatures slide with key/lock animation system

class DigitalSignaturesDemo {
    constructor() {
        this.messages = [
            { text: "Transfer $100 to Alice", from: "Bob" },
            { text: "Contract Agreement", from: "Company A" },
            { text: "Document Approval", from: "Manager" },
            { text: "Blockchain Transaction", from: "User123" }
        ];
        this.currentIndex = 0;
        this.animationController = new AnimationController(7000); // 7 seconds
        this.isActive = false;
        this.elements = {};
    }

    createSlideHTML() {
        return `
            <div class="slide" data-slide="signatures">
                <div class="slide-header">
                    <h1>Digital Signatures: Your Cryptographic DNA</h1>
                    <p class="subtitle">Proving authenticity without revealing secrets</p>
                </div>
                
                <div class="slide-content">
                    <div class="signature-demo">
                        <div class="signature-process">
                            <!-- Message to sign -->
                            <div class="message-container">
                                <div class="message-box" id="messageBox">
                                    <div class="message-label">Message</div>
                                    <div class="message-content" id="messageContent">Transfer $100 to Alice</div>
                                    <div class="message-sender">From: <span id="messageSender">Bob</span></div>
                                </div>
                            </div>

                            <!-- Private Key (Signing) -->
                            <div class="key-container private-key-container">
                                <div class="key-box private-key" id="privateKey">
                                    <div class="key-icon">🗝️</div>
                                    <div class="key-label">Private Key</div>
                                    <div class="key-description">(Keep Secret!)</div>
                                    <div class="key-particles" id="privateKeyParticles"></div>
                                </div>
                                <div class="process-arrow">↓</div>
                                <div class="process-label">SIGN</div>
                            </div>

                            <!-- Digital Signature -->
                            <div class="signature-container">
                                <div class="signature-box" id="signatureBox">
                                    <div class="signature-label">Digital Signature</div>
                                    <div class="signature-value" id="signatureValue">a7f8e9d2c4b6...</div>
                                    <div class="signature-status" id="signatureStatus">✓ Authentic</div>
                                </div>
                            </div>

                            <!-- Public Key (Verification) -->
                            <div class="key-container public-key-container">
                                <div class="process-arrow">↓</div>
                                <div class="process-label">VERIFY</div>
                                <div class="key-box public-key" id="publicKey">
                                    <div class="key-icon">🔓</div>
                                    <div class="key-label">Public Key</div>
                                    <div class="key-description">(Everyone Can See)</div>
                                    <div class="key-particles" id="publicKeyParticles"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Comparison Section -->
                        <div class="comparison-section">
                            <h3 class="section-title">Traditional vs Digital Signatures</h3>
                            <div class="comparison-grid">
                                <div class="comparison-item traditional">
                                    <div class="comparison-header">
                                        <span class="comparison-icon">✍️</span>
                                        <h4>Traditional Signature</h4>
                                    </div>
                                    <div class="comparison-content">
                                        <div class="comparison-point">❌ Can be forged</div>
                                        <div class="comparison-point">❌ Hard to verify remotely</div>
                                        <div class="comparison-point">❌ Requires physical presence</div>
                                        <div class="comparison-point">⚠️ Not tamper-evident</div>
                                    </div>
                                </div>
                                
                                <div class="comparison-arrow">→</div>
                                
                                <div class="comparison-item digital">
                                    <div class="comparison-header">
                                        <span class="comparison-icon">🔐</span>
                                        <h4>Digital Signature</h4>
                                    </div>
                                    <div class="comparison-content">
                                        <div class="comparison-point">✅ Mathematically impossible to forge</div>
                                        <div class="comparison-point">✅ Instantly verifiable worldwide</div>
                                        <div class="comparison-point">✅ Works remotely</div>
                                        <div class="comparison-point">✅ Detects any tampering</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="slide-footer">
                    <div class="key-points">
                        <div class="key-point">
                            <span class="bullet">🔐</span>
                            <span><strong>Two Keys:</strong> Private key signs, public key verifies</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">🛡️</span>
                            <span><strong>Non-repudiation:</strong> Can't deny you signed it</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">⚡</span>
                            <span><strong>Integrity:</strong> Any change breaks the signature</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    activate() {
        if (this.isActive) return;
        this.isActive = true;
        
        // Get element references
        this.elements = {
            messageContent: document.getElementById('messageContent'),
            messageSender: document.getElementById('messageSender'),
            privateKey: document.getElementById('privateKey'),
            publicKey: document.getElementById('publicKey'),
            signatureValue: document.getElementById('signatureValue'),
            signatureStatus: document.getElementById('signatureStatus'),
            privateKeyParticles: document.getElementById('privateKeyParticles'),
            publicKeyParticles: document.getElementById('publicKeyParticles'),
            signatureBox: document.getElementById('signatureBox')
        };

        this.animationController.addCallback(() => this.runSignatureAnimation());
        this.animationController.start();
        this.updateDisplay();
    }

    deactivate() {
        if (!this.isActive) return;
        this.isActive = false;
        this.animationController.stop();
        
        // Clean up any ongoing animations
        Object.values(this.elements).forEach(element => {
            if (element) {
                element.classList.remove('processing', 'glow-effect', 'signing', 'verifying');
            }
        });
    }

    runSignatureAnimation() {
        if (!this.isActive) return;
        
        // Cycle through messages
        this.currentIndex = (this.currentIndex + 1) % this.messages.length;
        const currentMessage = this.messages[this.currentIndex];
        
        // Update message
        this.elements.messageContent.textContent = currentMessage.text;
        this.elements.messageSender.textContent = currentMessage.from;
        
        // Phase 1: Signing process (3 seconds)
        this.startSigningPhase(currentMessage);
        
        // Phase 2: Verification process (2 seconds)
        setTimeout(() => {
            if (this.isActive) this.startVerificationPhase();
        }, 3000);
        
        // Phase 3: Result display (2 seconds)
        setTimeout(() => {
            if (this.isActive) this.showVerificationResult();
        }, 5000);
    }

    startSigningPhase(message) {
        // Highlight private key
        this.elements.privateKey.classList.add('glow-effect', 'signing');
        
        // Create signing particles
        PresentationUtils.createParticles(this.elements.privateKeyParticles, 6, 2000);
        
        // Animate signature creation
        setTimeout(() => {
            if (!this.isActive) return;
            
            const signature = this.generateSignature(message.text, message.from);
            this.elements.signatureValue.textContent = signature + '...';
            this.elements.signatureBox.classList.add('fadeInScale');
            
            // Remove signing state
            setTimeout(() => {
                this.elements.privateKey.classList.remove('signing');
            }, 500);
            
        }, 1500);
    }

    startVerificationPhase() {
        // Highlight public key
        this.elements.publicKey.classList.add('glow-effect', 'verifying');
        
        // Create verification particles
        PresentationUtils.createParticles(this.elements.publicKeyParticles, 8, 1500);
        
        // Animate verification process
        this.elements.signatureStatus.textContent = "🔍 Verifying...";
        this.elements.signatureStatus.classList.add('highlight-change');
    }

    showVerificationResult() {
        // Show successful verification
        this.elements.signatureStatus.textContent = "✅ Verified Authentic";
        this.elements.signatureStatus.classList.remove('highlight-change');
        this.elements.signatureStatus.classList.add('bounce-effect');
        
        // Remove verification state
        this.elements.publicKey.classList.remove('verifying');
        
        // Clean up animations
        setTimeout(() => {
            Object.values(this.elements).forEach(element => {
                if (element) {
                    element.classList.remove('glow-effect', 'fadeInScale', 'bounce-effect');
                }
            });
        }, 1000);
    }

    generateSignature(message, sender) {
        // Simple signature generation for demo purposes
        const combined = message + sender + Date.now();
        return PresentationUtils.simpleHash(combined).substring(0, 12);
    }

    updateDisplay() {
        const currentMessage = this.messages[this.currentIndex];
        this.elements.messageContent.textContent = currentMessage.text;
        this.elements.messageSender.textContent = currentMessage.from;
        
        const signature = this.generateSignature(currentMessage.text, currentMessage.from);
        this.elements.signatureValue.textContent = signature + '...';
        this.elements.signatureStatus.textContent = "✅ Verified Authentic";
    }
}

// Register the slide
if (typeof window.slideClasses === 'undefined') {
    window.slideClasses = {};
}
window.slideClasses['signatures'] = DigitalSignaturesDemo;