// js/utils.js - Shared utility functions

class PresentationUtils {
    /**
     * Creates a ripple effect animation on an element
     * @param {HTMLElement} element - Target element
     * @param {string} color - Ripple color (CSS color value)
     */
    static createRipple(element, color = 'var(--primary-blue)') {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.border = `2px solid ${color}`;
        ripple.style.borderRadius = '50%';
        ripple.style.opacity = '0';
        ripple.style.pointerEvents = 'none';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'rippleExpand 1.5s ease-out';
        ripple.style.zIndex = '1';
        
        element.style.position = element.style.position || 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 1500);
    }

    /**
     * Creates animated particles flowing from a container
     * @param {HTMLElement} container - Container element
     * @param {number} count - Number of particles
     * @param {number} duration - Animation duration in ms
     */
    static createParticles(container, count = 8, duration = 2500) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'data-particle';
            particle.style.animationDelay = (i * 0.15) + 's';
            particle.style.animation = `particleFlow ${duration}ms ease-out forwards`;
            particle.style.transform = `translate(-50%, -50%) rotate(${i * (360/count)}deg) translateX(-60px)`;
            particle.style.zIndex = '2';
            
            container.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, duration);
        }
    }

    /**
     * Simple hash function for demonstration purposes
     * Note: Not cryptographically secure, for demo only
     * @param {string} str - Input string to hash
     * @returns {string} - Hex hash string
     */
    static simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        // Convert to hex and pad to look like a real hash
        const hex = Math.abs(hash).toString(16);
        return hex.padStart(32, '0').substring(0, 32);
    }

    /**
     * Formats hash for display with ellipsis
     * @param {string} hash - Hash string
     * @returns {string} - Formatted hash
     */
    static formatHash(hash) {
        return hash + '...';
    }

    /**
     * Generates a cryptographic-looking signature
     * @param {string} message - Message to sign
     * @param {string} privateKey - Private key identifier
     * @returns {string} - Signature string
     */
    static generateSignature(message, privateKey) {
        const combined = message + privateKey + Date.now();
        return this.simpleHash(combined).substring(0, 16);
    }

    /**
     * Simulates signature verification
     * @param {string} message - Original message
     * @param {string} signature - Signature to verify
     * @param {string} publicKey - Public key identifier
     * @returns {boolean} - Verification result
     */
    static verifySignature(message, signature, publicKey) {
        // Simplified verification for demo
        // In reality, this involves complex cryptographic operations
        return signature.length === 16 && /^[a-f0-9]+$/.test(signature);
    }

    /**
     * Creates a smooth fade in animation
     * @param {HTMLElement} element - Element to animate
     * @param {number} duration - Animation duration in ms
     */
    static fadeIn(element, duration = 500) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `all ${duration}ms ease`;
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    /**
     * Creates a smooth fade out animation
     * @param {HTMLElement} element - Element to animate
     * @param {number} duration - Animation duration in ms
     * @param {Function} callback - Callback after animation
     */
    static fadeOut(element, duration = 500, callback = null) {
        element.style.transition = `all ${duration}ms ease`;
        element.style.opacity = '0';
        element.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            if (callback) callback();
        }, duration);
    }

    /**
     * Highlights an element temporarily
     * @param {HTMLElement} element - Element to highlight
     * @param {string} className - CSS class for highlighting
     * @param {number} duration - Highlight duration in ms
     */
    static highlight(element, className = 'highlight-change', duration = 2000) {
        element.classList.add(className);
        
        setTimeout(() => {
            element.classList.remove(className);
        }, duration);
    }

    /**
     * Animates a counter from start to end value
     * @param {HTMLElement} element - Element to update
     * @param {number} start - Start value
     * @param {number} end - End value
     * @param {number} duration - Animation duration in ms
     * @param {Function} formatter - Optional value formatter
     */
    static animateCounter(element, start, end, duration = 1000, formatter = null) {
        const startTime = performance.now();
        const difference = end - start;
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = start + (difference * easeOut);
            
            const displayValue = formatter ? 
                formatter(Math.round(currentValue)) : 
                Math.round(currentValue).toString();
                
            element.textContent = displayValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    /**
     * Debounces a function call
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in ms
     * @returns {Function} - Debounced function
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttles a function call
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in ms
     * @returns {Function} - Throttled function
     */
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Creates a smooth pulse animation
     * @param {HTMLElement} element - Element to pulse
     * @param {number} duration - Pulse duration in ms
     * @param {number} iterations - Number of iterations (0 = infinite)
     */
    static pulse(element, duration = 1000, iterations = 3) {
        const keyframes = [
            { transform: 'scale(1)', opacity: '1' },
            { transform: 'scale(1.05)', opacity: '0.8' },
            { transform: 'scale(1)', opacity: '1' }
        ];
        
        const options = {
            duration: duration,
            iterations: iterations === 0 ? Infinity : iterations,
            easing: 'ease-in-out'
        };
        
        return element.animate(keyframes, options);
    }

    /**
     * Checks if an element is visible in the viewport
     * @param {HTMLElement} element - Element to check
     * @returns {boolean} - Visibility status
     */
    static isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * Generates random color from the presentation palette
     * @returns {string} - CSS color value
     */
    static getRandomColor() {
        const colors = [
            'var(--primary-blue)',
            'var(--primary-gold)',
            'var(--success-green)',
            'var(--alert-red)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    /**
     * Logs debug information (only in development)
     * @param {string} message - Debug message
     * @param {any} data - Optional data to log
     */
    static debug(message, data = null) {
        if (window.location.hostname === 'localhost' || 
            window.location.hostname === '127.0.0.1') {
            console.log(`[Presentation Debug] ${message}`, data || '');
        }
    }
}

// Make utilities globally available
window.PresentationUtils = PresentationUtils;