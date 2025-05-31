
// js/slides/signatures-part2.js
// Digital Signatures Part 2: Signing and Verification Demo

class SignaturesPart2Demo {
    constructor() {
        this.messages = [
            { text: "Transfer $100 to Alice", from: "Bob" },
            { text: "Contract Agreement", from: "Company A" },
            { text: "Document Approval", from: "Manager" },
            { text: "Blockchain Transaction", from: "User123" }
        ];
        this.currentIndex = 0;
        this.animationController = new AnimationController(8000); // 8 second cycles
        this.isActive = false;
        this.elements = {};
    }

    /**
     * Creates the HTML structure for signatures part 2
     * @returns {string} HTML string
     */
    createSlideHTML() {
        return `
            <div class="slide" data-slide="signatures-part2">
                <div class="slide-header">
                    <h1>Digital Signatures: See It In Action</h1>
                    <p class="subtitle">Watch the signing and verification process</p>
                </div>
                
                <div class="slide-content">
                    <div class="signature-demo">
                        <div class="demo-process" id="demoProcess">
                            <!-- Message to sign -->
                            <div class="process-step step-message" id="stepMessage">
                                <div class="step-header">
                                    <div class="step-number">1</div>
                                    <h3>Message to Sign</h3>
                                </div>
                                <div class="message-display" id="messageDisplay">
                                    <div class="message-content" id="messageContent">Transfer $100 to Alice</div>
                                    <div class="message-sender">From: <span id="messageSender">Bob</span></div>
                                </div>
                            </div>

                            <!-- Signing Process -->
                            <div class="process-step step-signing" id="stepSigning">
                                <div class="step-header">
                                    <div class="step-number">2</div>
                                    <h3>Private Key Signs</h3>
                                </div>
                                <div class="signing-visual" id="signingVisual">
                                    <div class="private-key-icon">🗝️</div>
                                    <div class="signing-process" id="signingProcess">
                                        <div class="process-particles" id="signingParticles"></div>
                                        <div class="process-status" id="signingStatus">Ready to sign...</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Signature Result -->
                            <div class="process-step step-signature" id="stepSignature">
                                <div class="step-header">
                                    <div class="step-number">3</div>
                                    <h3>Digital Signature</h3>
                                </div>
                                <div class="signature-display" id="signatureDisplay">
                                    <div class="signature-value" id="signatureValue">a7f8e9d2c4b6...</div>
                                    <div class="signature-status" id="signatureStatus">✓ Signed</div>
                                </div>
                            </div>

                            <!-- Verification Process -->
                            <div class="process-step step-verification" id="stepVerification">
                                <div class="step-header">
                                    <div class="step-number">4</div>
                                    <h3>Public Key Verifies</h3>
                                </div>
                                <div class="verification-visual" id="verificationVisual">
                                    <div class="public-key-icon">🔓</div>
                                    <div class="verification-process" id="verificationProcess">
                                        <div class="process-particles" id="verificationParticles"></div>
                                        <div class="verification-result" id="verificationResult">
                                            <div class="result-icon" id="resultIcon">⏳</div>
                                            <div class="result-text" id="resultText">Verifying...</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Key Benefits -->
                        <div class="benefits-showcase" id="benefitsShowcase">
                            <h2 class="benefits-title">Why This Is Revolutionary</h2>
                            <div class="benefits-grid">
                                <div class="benefit-item" id="benefit1">
                                    <div class="benefit-icon">🛡️</div>
                                    <h4>Non-repudiation</h4>
                                    <p>Can't deny you signed it</p>
                                </div>
                                
                                <div class="benefit-item" id="benefit2">
                                    <div class="benefit-icon">⚡</div>
                                    <h4>Integrity Check</h4>
                                    <p>Any change breaks signature</p>
                                </div>
                                
                                <div class="benefit-item" id="benefit3">
                                    <div class="benefit-icon">🌍</div>
                                    <h4>Global Verification</h4>
                                    <p>Anyone can verify instantly</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="slide-footer">
                    <div class="key-points">
                        <div class="key-point">
                            <span class="bullet">🔐</span>
                            <span><strong>Unique:</strong> Each message gets a different signature</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">🛡️</span>
                            <span><strong>Tamper-proof:</strong> Change anything = signature becomes invalid</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">▶️</span>
                            <span><strong>Next:</strong> How to verify efficiently with Merkle trees</span>
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
            case 'signatures-2-process':
                if (title) title.textContent = 'Digital Signatures: The Signing Process';
                if (subtitle) subtitle.textContent = 'Watch messages get cryptographically signed';
                break;
            case 'signatures-2-verification':
                if (title) title.textContent = 'Digital Signatures: Verification & Results';
                if (subtitle) subtitle.textContent = 'See how public keys verify authenticity';
                break;
            case 'signatures-2-benefits':
                if (title) title.textContent = 'Why Digital Signatures Are Revolutionary';
                if (subtitle) subtitle.textContent = 'Non-repudiation, integrity, and global verification';
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
        const allSections = content.querySelectorAll('.demo-process, .benefits-showcase');
        allSections.forEach(section => {
            section.style.display = 'none';
        });

        // Show only specified sections
        sections.forEach(sectionId => {
            switch (sectionId) {
                case 'demo-process-steps-1-2':
                    // Show only steps 1-2 of the demo process
                    const demoProcess = content.querySelector('.demo-process');
                    if (demoProcess) {
                        demoProcess.style.display = 'block';
                        // Hide steps 3-4
                        const step3 = demoProcess.querySelector('#stepSignature');
                        const step4 = demoProcess.querySelector('#stepVerification');
                        if (step3) step3.style.display = 'none';
                        if (step4) step4.style.display = 'none';
                    }
                    break;
                case 'demo-process-steps-3-4':
                    // Show only steps 3-4 of the demo process
                    const demoProcess2 = content.querySelector('.demo-process');
                    if (demoProcess2) {
                        demoProcess2.style.display = 'block';
                        // Hide steps 1-2
                        const step1 = demoProcess2.querySelector('#stepMessage');
                        const step2 = demoProcess2.querySelector('#stepSigning');
                        if (step1) step1.style.display = 'none';
                        if (step2) step2.style.display = 'none';
                    }
                    break;
                case 'step-message':
                    const stepMessage = content.querySelector('#stepMessage');
                    if (stepMessage) stepMessage.style.display = 'block';
                    break;
                case 'step-signing':
                    const stepSigning = content.querySelector('#stepSigning');
                    if (stepSigning) stepSigning.style.display = 'block';
                    break;
                case 'step-signature':
                    const stepSignature = content.querySelector('#stepSignature');
                    if (stepSignature) stepSignature.style.display = 'block';
                    break;
                case 'step-verification':
                    const stepVerification = content.querySelector('#stepVerification');
                    if (stepVerification) stepVerification.style.display = 'block';
                    break;
                case 'benefits-showcase':
                    const benefitsShowcase = content.querySelector('.benefits-showcase');
                    if (benefitsShowcase) benefitsShowcase.style.display = 'block';
                    break;
            }
        });
    }

    /**
     * Activates the signatures part 2 animations
     */
    activate() {
        if (this.isActive) return;
        this.isActive = true;
        
        PresentationUtils.debug('Activating Signatures Part 2 Demo');
        
        // Get element references
        this.elements = {
            demoProcess: document.getElementById('demoProcess'),
            messageContent: document.getElementById('messageContent'),
            messageSender: document.getElementById('messageSender'),
            stepSigning: document.getElementById('stepSigning'),
            signingProcess: document.getElementById('signingProcess'),
            signingParticles: document.getElementById('signingParticles'),
            signingStatus: document.getElementById('signingStatus'),
            signatureValue: document.getElementById('signatureValue'),
            signatureStatus: document.getElementById('signatureStatus'),
            stepVerification: document.getElementById('stepVerification'),
            verificationProcess: document.getElementById('verificationProcess'),
            verificationParticles: document.getElementById('verificationParticles'),
            resultIcon: document.getElementById('resultIcon'),
            resultText: document.getElementById('resultText'),
            benefitsShowcase: document.getElementById('benefitsShowcase')
        };

        this.getElementReferences();
        
        if (!this.elements.demoProcess) {
            console.warn('Signatures part 2 elements not found, skipping activation');
            return;
        }

        // Set up animation callback
        this.animationController.addCallback(() => this.runSigningDemo());
        this.animationController.start();
        
        // Initial setup
        this.updateDisplay();
    }

    /**
     * Deactivates the signatures part 2 animations
     */
    deactivate() {
        if (!this.isActive) return;
        this.isActive = false;
        
        PresentationUtils.debug('Deactivating Signatures Part 2 Demo');
        
        // Stop animation controller
        this.animationController.stop();
        
        // Clean up animations
        this.clearAllAnimations();
    }

    /**
     * Gets references to elements
     */
    getElementReferences() {
        this.elements.processSteps = [
            document.getElementById('stepMessage'),
            document.getElementById('stepSigning'),
            document.getElementById('stepSignature'),
            document.getElementById('stepVerification')
        ];

        this.elements.benefitItems = [
            document.getElementById('benefit1'),
            document.getElementById('benefit2'),
            document.getElementById('benefit3')
        ];
    }

    /**
     * Runs the main signing demonstration sequence
     */
    runSigningDemo() {
        if (!this.isActive) return;
        
        // Cycle through messages
        this.currentIndex = (this.currentIndex + 1) % this.messages.length;
        const currentMessage = this.messages[this.currentIndex];
        
        PresentationUtils.debug(`Signing demo: ${currentMessage.text}`);
        
        // Clear previous animations
        this.clearAllAnimations();
        
        // Update message
        this.elements.messageContent.textContent = currentMessage.text;
        this.elements.messageSender.textContent = currentMessage.from;
        
        // Phase 1: Highlight message (1 second)
        this.highlightMessage();
        
        // Phase 2: Start signing process (2 seconds)
        setTimeout(() => {
            if (this.isActive) this.startSigningProcess(currentMessage);
        }, 1000);
        
        // Phase 3: Show signature result (2 seconds)
        setTimeout(() => {
            if (this.isActive) this.showSignatureResult(currentMessage);
        }, 3000);
        
        // Phase 4: Start verification (2 seconds)
        setTimeout(() => {
            if (this.isActive) this.startVerificationProcess();
        }, 5000);
        
        // Phase 5: Show benefits (1 second)
        setTimeout(() => {
            if (this.isActive) this.highlightBenefits();
        }, 7000);
    }

    /**
     * Highlights the message to be signed
     */
    highlightMessage() {
        this.elements.processSteps[0].classList.add('active');
        this.elements.messageContent.style.animation = 'messageHighlight 1s ease-out';
        PresentationUtils.createRipple(this.elements.processSteps[0], 'var(--primary-blue)');
    }

    /**
     * Starts the signing process animation
     */
    startSigningProcess(message) {
        // Highlight signing step
        this.elements.processSteps[1].classList.add('active');
        this.elements.processSteps[0].classList.remove('active');
        
        // Update status
        this.elements.signingStatus.textContent = "Signing with private key...";
        this.elements.signingStatus.style.color = "var(--primary-gold)";
        
        // Create signing particles
        PresentationUtils.createParticles(this.elements.signingParticles, 8, 2000);
        
        // Animate signing process
        this.elements.signingProcess.style.animation = 'signingProcess 2s ease-in-out';
        
        setTimeout(() => {
            if (this.isActive) {
                this.elements.signingStatus.textContent = "✓ Signature created!";
                this.elements.signingStatus.style.color = "var(--success-green)";
            }
        }, 1500);
    }

    /**
     * Shows the signature result
     */
    showSignatureResult(message) {
        // Highlight signature step
        this.elements.processSteps[2].classList.add('active');
        this.elements.processSteps[1].classList.remove('active');
        
        // Generate and show signature
        const signature = this.generateSignature(message.text, message.from);
        this.elements.signatureValue.textContent = signature + '...';
        this.elements.signatureValue.style.animation = 'signatureReveal 1s ease-out';
        
        // Update status
        this.elements.signatureStatus.textContent = "✓ Signed";
        this.elements.signatureStatus.style.color = "var(--success-green)";
        
        PresentationUtils.createRipple(this.elements.processSteps[2], 'var(--primary-gold)');
    }

    /**
     * Starts the verification process
     */
    startVerificationProcess() {
        // Highlight verification step
        this.elements.processSteps[3].classList.add('active');
        this.elements.processSteps[2].classList.remove('active');
        
        // Update verification display
        this.elements.resultIcon.textContent = "🔍";
        this.elements.resultText.textContent = "Verifying with public key...";
        this.elements.resultText.style.color = "var(--primary-blue)";
        
        // Create verification particles
        PresentationUtils.createParticles(this.elements.verificationParticles, 10, 2000);
        
        // Animate verification process
        this.elements.verificationProcess.style.animation = 'verificationProcess 2s ease-in-out';
        
        setTimeout(() => {
            if (this.isActive) {
                this.elements.resultIcon.textContent = "✅";
                this.elements.resultText.textContent = "Verified Authentic!";
                this.elements.resultText.style.color = "var(--success-green)";
                this.elements.verificationProcess.style.animation = 'successPulse 1s ease-out';
            }
        }, 1500);
    }

    /**
     * Highlights the benefits
     */
    highlightBenefits() {
        this.elements.benefitItems.forEach((item, index) => {
            setTimeout(() => {
                if (this.isActive && item) {
                    item.classList.add('highlighted');
                    item.style.animation = 'benefitPop 0.8s ease-out';
                    PresentationUtils.createRipple(item, 'var(--success-green)');
                }
            }, index * 200);
        });
    }

    /**
     * Generates a signature for demo purposes
     */
    generateSignature(message, sender) {
        const combined = message + sender + Date.now();
        return PresentationUtils.simpleHash(combined).substring(0, 12);
    }

    /**
     * Updates the display with current values
     */
    updateDisplay() {
        const currentMessage = this.messages[this.currentIndex];
        this.elements.messageContent.textContent = currentMessage.text;
        this.elements.messageSender.textContent = currentMessage.from;
        
        const signature = this.generateSignature(currentMessage.text, currentMessage.from);
        this.elements.signatureValue.textContent = signature + '...';
        
        // Set initial states
        this.elements.signingStatus.textContent = "Ready to sign...";
        this.elements.signingStatus.style.color = "var(--text-secondary)";
        
        this.elements.signatureStatus.textContent = "✓ Signed";
        this.elements.signatureStatus.style.color = "var(--success-green)";
        
        this.elements.resultIcon.textContent = "✅";
        this.elements.resultText.textContent = "Verified Authentic!";
        this.elements.resultText.style.color = "var(--success-green)";
    }

    /**
     * Clears all active animations
     */
    clearAllAnimations() {
        // Clear step highlights
        this.elements.processSteps.forEach(step => {
            if (step) {
                step.classList.remove('active');
            }
        });
        
        // Clear benefit highlights
        this.elements.benefitItems.forEach(item => {
            if (item) {
                item.classList.remove('highlighted');
                item.style.animation = '';
            }
        });
        
        // Clear other animations
        this.elements.messageContent.style.animation = '';
        this.elements.signatureValue.style.animation = '';
        this.elements.signingProcess.style.animation = '';
        this.elements.verificationProcess.style.animation = '';
    }

    /**
     * Gets the current animation status
     * @returns {Object} Status information
     */
    getStatus() {
        return {
            isActive: this.isActive,
            currentMessageIndex: this.currentIndex,
            currentMessage: this.messages[this.currentIndex],
            controller: this.animationController.getStatus()
        };
    }
}

// Register the slide class
if (typeof window.slideClasses === 'undefined') {
    window.slideClasses = {};
}
window.slideClasses['signatures-part2'] = SignaturesPart2Demo;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SignaturesPart2Demo;
}