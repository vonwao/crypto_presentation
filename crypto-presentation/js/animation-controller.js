// js/animation-controller.js - Controls slide animations and timing

class AnimationController {
    /**
     * Creates an animation controller for managing slide animations
     * @param {number} interval - Time between animations in milliseconds
     */
    constructor(interval = 7000) {
        this.interval = interval;
        this.callbacks = [];
        this.isRunning = false;
        this.timer = null;
        this.currentIteration = 0;
        this.pausedAt = 0;
        this.startTime = 0;
    }

    /**
     * Adds a callback function to be executed on each animation cycle
     * @param {Function} callback - Function to execute
     * @param {Object} options - Optional configuration
     */
    addCallback(callback, options = {}) {
        this.callbacks.push({
            func: callback,
            priority: options.priority || 0,
            executeOnStart: options.executeOnStart !== false
        });
        
        // Sort by priority (higher priority first)
        this.callbacks.sort((a, b) => b.priority - a.priority);
    }

    /**
     * Removes a callback function
     * @param {Function} callback - Function to remove
     */
    removeCallback(callback) {
        this.callbacks = this.callbacks.filter(cb => cb.func !== callback);
    }

    /**
     * Starts the animation controller
     * @param {boolean} immediate - Whether to run callbacks immediately
     */
    start(immediate = true) {
        if (this.isRunning) {
            PresentationUtils.debug('AnimationController already running');
            return;
        }

        this.isRunning = true;
        this.startTime = performance.now();
        
        PresentationUtils.debug(`AnimationController started with ${this.interval}ms interval`);

        // Run immediately if requested
        if (immediate) {
            this.runCallbacks();
        }

        // Set up the interval timer
        this.timer = setInterval(() => {
            this.runCallbacks();
        }, this.interval);
    }

    /**
     * Stops the animation controller
     */
    stop() {
        if (!this.isRunning) {
            return;
        }

        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        this.isRunning = false;
        this.pausedAt = performance.now();
        
        PresentationUtils.debug('AnimationController stopped');
    }

    /**
     * Pauses the animation controller
     */
    pause() {
        if (!this.isRunning) {
            return;
        }

        this.stop();
        this.pausedAt = performance.now();
        
        PresentationUtils.debug('AnimationController paused');
    }

    /**
     * Resumes the animation controller
     */
    resume() {
        if (this.isRunning) {
            return;
        }

        // Calculate remaining time in current cycle
        const elapsed = this.pausedAt - this.startTime;
        const remaining = this.interval - (elapsed % this.interval);

        this.isRunning = true;
        
        // Resume with the remaining time
        this.timer = setTimeout(() => {
            this.runCallbacks();
            // Then continue with normal interval
            this.timer = setInterval(() => {
                this.runCallbacks();
            }, this.interval);
        }, remaining);

        PresentationUtils.debug('AnimationController resumed');
    }

    /**
     * Resets the animation controller
     */
    reset() {
        this.stop();
        this.currentIteration = 0;
        this.pausedAt = 0;
        this.startTime = 0;
        
        PresentationUtils.debug('AnimationController reset');
    }

    /**
     * Executes all registered callbacks
     */
    runCallbacks() {
        if (!this.isRunning) {
            return;
        }

        this.currentIteration++;
        
        PresentationUtils.debug(`Running animation callbacks (iteration ${this.currentIteration})`);

        this.callbacks.forEach((callbackObj, index) => {
            try {
                callbackObj.func(this.currentIteration);
            } catch (error) {
                console.error(`Animation callback ${index} error:`, error);
            }
        });
    }

    /**
     * Sets a new interval for the animation controller
     * @param {number} newInterval - New interval in milliseconds
     * @param {boolean} restart - Whether to restart with new interval
     */
    setInterval(newInterval, restart = false) {
        const wasRunning = this.isRunning;
        
        if (wasRunning) {
            this.stop();
        }

        this.interval = newInterval;
        
        PresentationUtils.debug(`Animation interval changed to ${newInterval}ms`);

        if (restart && wasRunning) {
            this.start();
        }
    }

    /**
     * Gets the current status of the controller
     * @returns {Object} - Status information
     */
    getStatus() {
        return {
            isRunning: this.isRunning,
            interval: this.interval,
            currentIteration: this.currentIteration,
            callbackCount: this.callbacks.length,
            runtime: this.isRunning ? performance.now() - this.startTime : 0
        };
    }

    /**
     * Clears all callbacks
     */
    clearCallbacks() {
        this.callbacks = [];
        PresentationUtils.debug('All animation callbacks cleared');
    }
}

// Enhanced animation controller with additional features
class AdvancedAnimationController extends AnimationController {
    constructor(interval = 7000) {
        super(interval);
        this.phases = [];
        this.currentPhase = 0;
        this.phaseStartTime = 0;
    }

    /**
     * Adds an animation phase with specific timing
     * @param {string} name - Phase name
     * @param {number} duration - Phase duration in ms
     * @param {Function} callback - Function to execute during phase
     */
    addPhase(name, duration, callback) {
        this.phases.push({
            name,
            duration,
            callback,
            executed: false
        });
    }

    /**
     * Starts a multi-phase animation sequence
     */
    startPhaseSequence() {
        if (this.phases.length === 0) {
            PresentationUtils.debug('No phases defined for sequence');
            return;
        }

        this.currentPhase = 0;
        this.phaseStartTime = performance.now();
        this.executeCurrentPhase();
    }

    /**
     * Executes the current phase
     */
    executeCurrentPhase() {
        if (this.currentPhase >= this.phases.length) {
            PresentationUtils.debug('Phase sequence completed');
            return;
        }

        const phase = this.phases[this.currentPhase];
        
        PresentationUtils.debug(`Executing phase: ${phase.name}`);

        try {
            phase.callback();
            phase.executed = true;
        } catch (error) {
            console.error(`Phase ${phase.name} error:`, error);
        }

        // Schedule next phase
        setTimeout(() => {
            this.currentPhase++;
            this.executeCurrentPhase();
        }, phase.duration);
    }

    /**
     * Resets all phases
     */
    resetPhases() {
        this.phases.forEach(phase => {
            phase.executed = false;
        });
        this.currentPhase = 0;
        this.phaseStartTime = 0;
    }
}

// Animation state manager for complex slide animations
class AnimationStateManager {
    constructor() {
        this.states = new Map();
        this.currentState = null;
        this.previousState = null;
        this.listeners = [];
    }

    /**
     * Defines an animation state
     * @param {string} name - State name
     * @param {Object} config - State configuration
     */
    defineState(name, config) {
        this.states.set(name, {
            name,
            enter: config.enter || (() => {}),
            exit: config.exit || (() => {}),
            update: config.update || (() => {}),
            duration: config.duration || 0
        });
    }

    /**
     * Transitions to a new state
     * @param {string} stateName - Target state name
     */
    transitionTo(stateName) {
        if (!this.states.has(stateName)) {
            console.error(`State '${stateName}' not defined`);
            return;
        }

        const newState = this.states.get(stateName);
        
        // Exit current state
        if (this.currentState) {
            try {
                this.currentState.exit();
            } catch (error) {
                console.error(`Error exiting state '${this.currentState.name}':`, error);
            }
        }

        this.previousState = this.currentState;
        this.currentState = newState;

        // Notify listeners
        this.notifyListeners('stateChange', {
            from: this.previousState?.name || null,
            to: this.currentState.name
        });

        // Enter new state
        try {
            this.currentState.enter();
        } catch (error) {
            console.error(`Error entering state '${this.currentState.name}':`, error);
        }

        PresentationUtils.debug(`State transition: ${this.previousState?.name || 'null'} -> ${this.currentState.name}`);
    }

    /**
     * Gets the current state name
     * @returns {string|null} - Current state name
     */
    getCurrentState() {
        return this.currentState?.name || null;
    }

    /**
     * Adds a state change listener
     * @param {Function} listener - Listener function
     */
    addListener(listener) {
        this.listeners.push(listener);
    }

    /**
     * Removes a state change listener
     * @param {Function} listener - Listener function to remove
     */
    removeListener(listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    /**
     * Notifies all listeners of an event
     * @param {string} event - Event name
     * @param {Object} data - Event data
     */
    notifyListeners(event, data) {
        this.listeners.forEach(listener => {
            try {
                listener(event, data);
            } catch (error) {
                console.error('Listener error:', error);
            }
        });
    }

    /**
     * Updates the current state
     * @param {number} deltaTime - Time since last update
     */
    update(deltaTime) {
        if (this.currentState && this.currentState.update) {
            try {
                this.currentState.update(deltaTime);
            } catch (error) {
                console.error(`Error updating state '${this.currentState.name}':`, error);
            }
        }
    }
}

// Performance monitor for animations
class AnimationPerformanceMonitor {
    constructor() {
        this.frameCount = 0;
        this.lastTime = 0;
        this.fps = 0;
        this.isMonitoring = false;
        this.fpsHistory = [];
        this.maxHistoryLength = 60; // Keep 60 fps readings
    }

    /**
     * Starts monitoring animation performance
     */
    start() {
        if (this.isMonitoring) return;
        
        this.isMonitoring = true;
        this.lastTime = performance.now();
        this.frameCount = 0;
        this.measureFPS();
        
        PresentationUtils.debug('Animation performance monitoring started');
    }

    /**
     * Stops monitoring animation performance
     */
    stop() {
        this.isMonitoring = false;
        PresentationUtils.debug('Animation performance monitoring stopped');
    }

    /**
     * Measures FPS
     */
    measureFPS() {
        if (!this.isMonitoring) return;

        const currentTime = performance.now();
        this.frameCount++;

        if (currentTime - this.lastTime >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
            this.fpsHistory.push(this.fps);
            
            // Keep history within limits
            if (this.fpsHistory.length > this.maxHistoryLength) {
                this.fpsHistory.shift();
            }

            // Log performance warnings
            if (this.fps < 30) {
                console.warn(`Low FPS detected: ${this.fps}`);
            }

            this.frameCount = 0;
            this.lastTime = currentTime;
        }

        requestAnimationFrame(() => this.measureFPS());
    }

    /**
     * Gets current performance stats
     * @returns {Object} - Performance statistics
     */
    getStats() {
        const avgFPS = this.fpsHistory.length > 0 ? 
            Math.round(this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length) : 0;
        
        const minFPS = this.fpsHistory.length > 0 ? Math.min(...this.fpsHistory) : 0;
        const maxFPS = this.fpsHistory.length > 0 ? Math.max(...this.fpsHistory) : 0;

        return {
            currentFPS: this.fps,
            averageFPS: avgFPS,
            minFPS,
            maxFPS,
            isMonitoring: this.isMonitoring,
            sampleCount: this.fpsHistory.length
        };
    }
}

// Export classes to global scope
window.AnimationController = AnimationController;
window.AdvancedAnimationController = AdvancedAnimationController;
window.AnimationStateManager = AnimationStateManager;
window.AnimationPerformanceMonitor = AnimationPerformanceMonitor;