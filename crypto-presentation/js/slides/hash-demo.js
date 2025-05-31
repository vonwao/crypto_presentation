// js/slides/hash-demo.js
// Hash Functions slide with blender animation and avalanche effect

class HashDemo {
    constructor() {
        this.inputs = ['Hello', 'Hello!', 'Blockchain', 'Bitcoin', 'Crypto', 'Hash123', 'Transaction', 'Block#1'];
        this.currentIndex = 0;
        this.elements = {};
        this.animationController = new AnimationController(6000); // 6 second intervals
        this.isActive = false;
    }

    /**
     * Creates the HTML structure for the hash demo slide
     * @returns {string} HTML string
     */
    createSlideHTML() {
        return `
            <div class="slide" data-slide="hash">
                <div class="slide-header">
                    <h1>Hash Functions: The Digital Blender</h1>
                    <p class="subtitle">Any input → Always the same size output</p>
                </div>
                
                <div class="slide-content">
                    <div class="demo-section">
                        <div class="input-display">
                            <span class="input-label">Input</span>
                            <div class="input-value" id="inputValue">Hello</div>
                        </div>

                        <div class="blender" id="blender">
                            <div class="blender-inner">🌪️</div>
                            <div class="particle-container" id="particleContainer"></div>
                        </div>

                        <div class="output-display">
                            <span class="output-label">Hash Output</span>
                            <div class="hash-value" id="hashValue">2cf24dba4f21d4288094e19b482f7c1b7ae07d12e4b31...</div>
                        </div>
                    </div>

                    <div class="avalanche-section">
                        <h3 class="section-title">The Avalanche Effect</h3>
                        <div class="comparison-grid">
                            <div class="comparison-item">
                                <div class="comparison-input">
                                    <strong>Input:</strong> "<span id="beforeInput">Hello</span>"
                                </div>
                                <div class="comparison-output">
                                    <code id="beforeHash">2cf24dba4f21d4288094e19b482f7c1b</code>
                                </div>
                            </div>
                            
                            <div class="comparison-arrow">→</div>
                            
                            <div class="comparison-item">
                                <div class="comparison-input">
                                    <strong>Input:</strong> "<span id="afterInput">Hello!</span>"
                                </div>
                                <div class="comparison-output">
                                    <code id="afterHash" class="highlight-change">334d016f755cd6dc58c53a86e183882f</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="slide-footer">
                    <div class="key-points">
                        <div class="key-point">
                            <span class="bullet">⚡</span>
                            <span><strong>Immutability:</strong> Any change completely alters the hash</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">🔗</span>
                            <span><strong>Linking:</strong> Each block references the previous block's hash</span>
                        </div>
                        <div class="key-point">
                            <span class="bullet">✓</span>
                            <span><strong>Verification:</strong> Instantly detect any data tampering</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Activates the hash demo animations
     */
    activate() {
        if (this.isActive) return;
        this.isActive = true;
        
        PresentationUtils.debug('Activating Hash Demo');
        
        // Get element references
        this.elements = {
            inputValue: document.getElementById('inputValue'),
            hashValue: document.getElementById('hashValue'),
            blender: document.getElementById('blender'),
            particleContainer: document.getElementById('particleContainer'),
            beforeInput: document.getElementById('beforeInput'),
            afterInput: document.getElementById('afterInput'),
            beforeHash: document.getElementById('beforeHash'),
            afterHash: document.getElementById('afterHash')
        };

        // Verify elements exist
        if (!this.elements.inputValue || !this.elements.blender) {
            console.warn('Hash demo elements not found, skipping activation');
            return;
        }

        // Set up animation callback
        this.animationController.addCallback(() => this.runHashAnimation());
        this.animationController.start();
        
        // Set initial display
        this.updateDisplay();
    }

    /**
     * Deactivates the hash demo animations
     */
    deactivate() {
        if (!this.isActive) return;
        this.isActive = false;
        
        PresentationUtils.debug('Deactivating Hash Demo');
        
        // Stop animation controller
        this.animationController.stop();
        
        // Clean up any ongoing animations
        if (this.elements.blender) {
            this.elements.blender.classList.remove('processing');
        }
        
        Object.values(this.elements).forEach(element => {
            if (element) {
                element.classList.remove('processing', 'input-changing', 'hash-updating');
            }
        });
    }

    /**
     * Runs the main hash animation sequence
     */
    runHashAnimation() {
        if (!this.isActive || !this.elements.inputValue) return;
        
        // Cycle through different inputs
        this.currentIndex = (this.currentIndex + 1) % this.inputs.length;
        const currentInput = this.inputs[this.currentIndex];
        
        PresentationUtils.debug(`Hash animation cycle ${this.currentIndex}: ${currentInput}`);
        
        // Phase 1: Update input (0.5 seconds)
        this.updateInput(currentInput);
        
        // Phase 2: Start blending process (2 seconds)
        setTimeout(() => {
            if (this.isActive) this.startBlendingAnimation();
        }, 500);
        
        // Phase 3: Show hash result (1.5 seconds)
        setTimeout(() => {
            if (this.isActive) this.showHashResult(currentInput);
        }, 2500);
        
        // Phase 4: Update comparison (1 second)
        setTimeout(() => {
            if (this.isActive) this.updateAvalancheComparison(currentInput);
        }, 4000);
        
        // Phase 5: Cleanup (1 second)
        setTimeout(() => {
            if (this.isActive) this.cleanupAnimation();
        }, 5000);
    }

    /**
     * Updates the input display
     * @param {string} input - New input value
     */
    updateInput(input) {
        this.elements.inputValue.textContent = input;
        this.elements.inputValue.parentElement.classList.add('input-changing');
        
        // Add bounce effect
        this.elements.inputValue.style.animation = 'bounce 0.5s ease-out';
        setTimeout(() => {
            this.elements.inputValue.style.animation = '';
        }, 500);
    }

    /**
     * Starts the blender animation with particles
     */
    startBlendingAnimation() {
        // Start blender spinning and pulsing
        this.elements.blender.classList.add('processing');
        
        // Create flowing particles
        PresentationUtils.createParticles(this.elements.particleContainer, 12, 2000);
        
        // Add ripple effect
        PresentationUtils.createRipple(this.elements.blender, 'var(--primary-gold)');
        
        // Additional particle burst halfway through
        setTimeout(() => {
            if (this.isActive) {
                PresentationUtils.createParticles(this.elements.particleContainer, 8, 1000);
            }
        }, 1000);
    }

    /**
     * Shows the hash result with animation
     * @param {string} input - Input string that was hashed
     */
    showHashResult(input) {
        const hash = PresentationUtils.simpleHash(input);
        const formattedHash = PresentationUtils.formatHash(hash);
        
        // Animate hash value change
        this.elements.hashValue.style.opacity = '0';
        this.elements.hashValue.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            this.elements.hashValue.textContent = formattedHash;
            this.elements.hashValue.style.transition = 'all 0.5s ease';
            this.elements.hashValue.style.opacity = '1';
            this.elements.hashValue.style.transform = 'scale(1)';
            
            // Add glow effect
            this.elements.hashValue.parentElement.classList.add('hash-updating');
        }, 100);
    }

    /**
     * Updates the avalanche effect comparison
     * @param {string} input - Base input string
     */
    updateAvalancheComparison(input) {
        const modifiedInput = input + '!';
        const baseHash = PresentationUtils.simpleHash(input);
        const modifiedHash = PresentationUtils.simpleHash(modifiedInput);
        
        // Update before values
        this.elements.beforeInput.textContent = input;
        this.elements.beforeHash.textContent = baseHash;
        
        // Update after values with highlighting
        this.elements.afterInput.innerHTML = `${input}<span style="color: var(--alert-red); font-weight: bold; animation: blink 1s infinite;">!</span>`;
        this.elements.afterHash.textContent = modifiedHash;
        
        // Highlight the change
        this.elements.afterHash.classList.add('highlight-change');
        
        // Create ripple effect on comparison
        setTimeout(() => {
            PresentationUtils.createRipple(this.elements.afterHash.parentElement, 'var(--alert-red)');
        }, 200);
    }

    /**
     * Cleans up animation classes
     */
    cleanupAnimation() {
        // Remove processing states
        this.elements.blender.classList.remove('processing');
        this.elements.inputValue.parentElement.classList.remove('input-changing');
        this.elements.hashValue.parentElement.classList.remove('hash-updating');
        
        // Remove highlighting after delay
        setTimeout(() => {
            this.elements.afterHash.classList.remove('highlight-change');
        }, 1000);
    }

    /**
     * Updates the display with current values
     */
    updateDisplay() {
        const currentInput = this.inputs[this.currentIndex];
        const hash = PresentationUtils.simpleHash(currentInput);
        
        // Set current values
        this.elements.inputValue.textContent = currentInput;
        this.elements.hashValue.textContent = PresentationUtils.formatHash(hash);
        
        // Set comparison values
        this.updateAvalancheComparison(currentInput);
    }

    /**
     * Manually triggers a hash animation (useful for debugging)
     */
    triggerAnimation() {
        if (this.isActive) {
            this.runHashAnimation();
        }
    }

    /**
     * Changes the animation interval
     * @param {number} newInterval - New interval in milliseconds
     */
    setAnimationInterval(newInterval) {
        this.animationController.setInterval(newInterval, true);
        PresentationUtils.debug(`Hash demo interval changed to ${newInterval}ms`);
    }

    /**
     * Gets the current animation status
     * @returns {Object} Status information
     */
    getStatus() {
        return {
            isActive: this.isActive,
            currentInput: this.inputs[this.currentIndex],
            currentIndex: this.currentIndex,
            totalInputs: this.inputs.length,
            controller: this.animationController.getStatus()
        };
    }

    /**
     * Adds a custom input to the rotation
     * @param {string} input - Input string to add
     */
    addInput(input) {
        if (input && typeof input === 'string' && !this.inputs.includes(input)) {
            this.inputs.push(input);
            PresentationUtils.debug(`Added input: ${input}`);
        }
    }

    /**
     * Removes an input from the rotation
     * @param {string} input - Input string to remove
     */
    removeInput(input) {
        const index = this.inputs.indexOf(input);
        if (index > -1) {
            this.inputs.splice(index, 1);
            // Adjust current index if necessary
            if (this.currentIndex >= this.inputs.length) {
                this.currentIndex = 0;
            }
            PresentationUtils.debug(`Removed input: ${input}`);
        }
    }
}

// Register the slide class
if (typeof window.slideClasses === 'undefined') {
    window.slideClasses = {};
}
window.slideClasses['hash'] = HashDemo;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HashDemo;
}