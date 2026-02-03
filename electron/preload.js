/**
 * Electron Preload Script
 * 
 * Runs in the renderer process before web content loads.
 * Used to safely expose select Node.js functionality to the renderer.
 * 
 * @module electron/preload
 * @author GridGuard Development Team
 */

// Currently no APIs need to be exposed to the renderer
// The game runs entirely client-side in the browser context
console.log('GridGuard preload script loaded');
