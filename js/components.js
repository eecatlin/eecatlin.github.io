/**
 * Component Loader
 * Loads reusable HTML components and handles path resolution
 */

(function() {
    'use strict';

    // Determine base path based on current page location
    function getBasePath() {
        var path = window.location.pathname;
        // If we're in the pages directory, base path is ../
        if (path.includes('/pages/')) {
            return '../';
        }
        // If we're at root, base path is empty
        return '';
    }

    // Get active page identifier
    function getActivePage() {
        var path = window.location.pathname;
        var filename = path.split('/').pop();
        
        if (filename === 'index.html' || filename === '' || path.endsWith('/')) {
            return 'home';
        }
        
        // Remove .html extension
        var pageName = filename.replace('.html', '');
        
        // Map page names to identifiers
        if (pageName === 'bio') {
            return 'bio';
        }
        
        return null;
    }

    // Replace placeholders in component HTML
    function processComponent(html, basePath, activePage) {
        // Replace base path placeholder
        html = html.replace(/{BASE_PATH}/g, basePath);
        
        // Handle active states
        var activeHome = activePage === 'home' ? 'active' : '';
        var activeBio = activePage === 'bio' ? 'active' : '';
        
        html = html.replace(/{ACTIVE_HOME}/g, activeHome);
        html = html.replace(/{ACTIVE_BIO}/g, activeBio);
        
        return html;
    }

    // Load and execute scripts from HTML
    function loadScriptsFromHTML(html, basePath, callback) {
        // Create a temporary div to parse the HTML
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // Find all script tags
        var scripts = tempDiv.querySelectorAll('script');
        var scriptsToLoad = scripts.length;
        var scriptsLoaded = 0;
                
        if (scriptsToLoad === 0) {
            if (callback) callback(true);
            return;
        }
        
        // Load each script sequentially
        function loadNextScript(index) {
            if (index >= scriptsToLoad) {
                if (callback) callback(true);
                return;
            }
            
            var script = scripts[index];
            var src = script.getAttribute('src');
            
            if (src) {
                // External script - create new script element and load it
                var newScript = document.createElement('script');
                newScript.src = src;
                newScript.onload = function() {
                    scriptsLoaded++;
                    loadNextScript(index + 1);
                };
                newScript.onerror = function() {
                    console.error('Component Loader: Failed to load script: ' + src);
                    scriptsLoaded++;
                    loadNextScript(index + 1); // Continue even if one fails
                };
                document.head.appendChild(newScript);
            } else {
                // Inline script - execute it directly
                try {
                    eval(script.textContent || script.innerHTML);
                    scriptsLoaded++;
                } catch (e) {
                    console.error('Component Loader: Error executing inline script:', e);
                    scriptsLoaded++;
                }
                loadNextScript(index + 1);
            }
        }
        
        loadNextScript(0);
    }

    // Load a component and insert it into the DOM
    function loadComponent(componentName, targetSelector, insertMethod, callback) {
        var basePath = getBasePath();
        var activePage = getActivePage();
        var componentPath = basePath + 'components/' + componentName + '.html';
        
        // Use XMLHttpRequest for better browser compatibility
        var xhr = new XMLHttpRequest();
        xhr.open('GET', componentPath, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var processedHtml = processComponent(xhr.responseText, basePath, activePage);
                    var target = document.querySelector(targetSelector);
                    
                    if (!target) {
                        console.error('Component Loader: Target element not found: ' + targetSelector);
                        if (callback) callback(false);
                        return;
                    }
                    
                    // Special handling for scripts component - need to execute scripts
                    if (componentName === 'scripts') {
                        // Remove the placeholder div (but keep it in DOM structure)
                        if (insertMethod === 'replace') {
                            // Replace with empty div to maintain structure
                            target.outerHTML = '<div data-component="scripts" style="display:none;"></div>';
                        } else {
                            target.innerHTML = '';
                        }
                        // Load and execute scripts
                        loadScriptsFromHTML(processedHtml, basePath, callback);
                        return;
                    }
                    
                    // For other components, insert HTML normally
                    if (insertMethod === 'replace') {
                        target.outerHTML = processedHtml;
                    } else if (insertMethod === 'beforebegin') {
                        target.insertAdjacentHTML('beforebegin', processedHtml);
                    } else if (insertMethod === 'afterbegin') {
                        target.insertAdjacentHTML('afterbegin', processedHtml);
                    } else if (insertMethod === 'beforeend') {
                        target.insertAdjacentHTML('beforeend', processedHtml);
                    } else if (insertMethod === 'afterend') {
                        target.insertAdjacentHTML('afterend', processedHtml);
                    } else {
                        // Default: replace innerHTML
                        target.innerHTML = processedHtml;
                    }
                    if (callback) callback(true);
                } else {
                    console.error('Component Loader: Failed to load component "' + componentName + '" from "' + componentPath + '" (Status: ' + xhr.status + ')');
                    if (callback) callback(false);
                }
            }
        };
        xhr.onerror = function() {
            console.error('Component Loader: Network error loading component "' + componentName + '" from "' + componentPath + '"');
            // Check if this is a CORS/file:// issue
            if (window.location.protocol === 'file:') {
                console.error('Component Loader: CORS error detected. You are viewing the site via file:// protocol.');
                console.error('Component Loader: Please use a local web server for development.');
                console.error('Component Loader: Run: python3 -m http.server 8000 (or similar)');
                // Show a visible error message to the user
                var errorDiv = document.createElement('div');
                errorDiv.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#f44336;color:white;padding:15px;z-index:10000;text-align:center;';
                errorDiv.innerHTML = '<strong>Development Mode:</strong> Components require a web server. Run: <code>python3 -m http.server 8000</code> then visit <code>http://localhost:8000</code>';
                document.body.insertBefore(errorDiv, document.body.firstChild);
            }
            if (callback) callback(false);
        };
        xhr.send();
    }

    // Wait for a script to be available
    function waitForScript(scriptName, checkFunction, callback, maxWait) {
        maxWait = maxWait || 2000; // Default 2 seconds max wait
        var startTime = Date.now();
        var checkInterval = setInterval(function() {
            if (checkFunction()) {
                clearInterval(checkInterval);
                callback(true);
            } else if (Date.now() - startTime > maxWait) {
                clearInterval(checkInterval);
                console.warn('Component Loader: Timeout waiting for ' + scriptName);
                callback(false);
            }
        }, 50);
    }

    // Auto-load components
    function initComponents() {
        // Load scripts first (so Bootstrap is available for nav)
        var scriptsPlaceholder = document.querySelector('[data-component="scripts"]');
        if (scriptsPlaceholder) {
            loadComponent('scripts', '[data-component="scripts"]', 'replace', function(success) {
                if (success) {
                    // Wait for jQuery and Bootstrap to be loaded, then load navigation
                    // Give scripts more time to load (they load asynchronously)
                    waitForScript('jQuery and Bootstrap', function() {
                        var jqReady = typeof jQuery !== 'undefined';
                        var bootstrapReady = jqReady && typeof jQuery.fn !== 'undefined' && typeof jQuery.fn.dropdown !== 'undefined';
                        return jqReady && bootstrapReady;
                    }, function(ready) {
                        if (ready) {
                            loadNavComponent();
                        } else {
                            // Check what's missing
                            if (typeof jQuery === 'undefined') {
                                console.warn('Component Loader: jQuery not loaded after timeout');
                            } else if (typeof jQuery.fn === 'undefined' || typeof jQuery.fn.dropdown === 'undefined') {
                                console.warn('Component Loader: Bootstrap not loaded after timeout');
                            }
                            // Load nav anyway - Bootstrap dropdowns might still work
                            console.warn('Component Loader: Loading nav without Bootstrap confirmation');
                            loadNavComponent();
                        }
                    }, 5000); // Increased to 5 seconds for slower connections
                } else {
                    // If scripts failed to load, still try to load nav
                    loadNavComponent();
                }
            });
        } else {
            console.warn('Scripts placeholder not found');
            // Load nav anyway
            loadNavComponent();
        }
    }
    
    // Separate function to load nav component
    function loadNavComponent() {
        var navPlaceholder = document.querySelector('[data-component="nav"]');
        if (navPlaceholder) {
            loadComponent('nav', '[data-component="nav"]', 'replace', function(success) {
                if (success) {
                    // Initialize Bootstrap dropdown after nav is loaded
                    // Bootstrap 3 dropdowns need to be initialized when added dynamically
                    if (typeof jQuery !== 'undefined' && jQuery.fn.dropdown) {
                        // Small delay to ensure DOM is updated
                        setTimeout(function() {
                            // Initialize all dropdowns in the nav
                            jQuery('[data-toggle="dropdown"]').each(function() {
                                var $el = jQuery(this);
                                // Check if already initialized
                                if (!$el.data('bs.dropdown')) {
                                    try {
                                        $el.dropdown();
                                    } catch (e) {
                                        console.warn('Component Loader: Could not initialize dropdown:', e);
                                    }
                                }
                            });
                        }, 50);
                    } else {
                        // If Bootstrap isn't ready yet, wait a bit more
                        setTimeout(function() {
                            if (typeof jQuery !== 'undefined' && jQuery.fn.dropdown) {
                                jQuery('[data-toggle="dropdown"]').each(function() {
                                    var $el = jQuery(this);
                                    if (!$el.data('bs.dropdown')) {
                                        try {
                                            $el.dropdown();
                                        } catch (e) {
                                            console.warn('Component Loader: Could not initialize dropdown:', e);
                                        }
                                    }
                                });
                            }
                        }, 200);
                    }
                }
                // Load footer after nav is loaded
                loadFooterComponent();
            });
        } else {
            console.warn('Navigation placeholder not found');
            // Load footer anyway
            loadFooterComponent();
        }
    }
    
    // Separate function to load footer component
    function loadFooterComponent() {
        var footerPlaceholder = document.querySelector('[data-component="footer"]');
        if (footerPlaceholder) {
            loadComponent('footer', '[data-component="footer"]', 'replace', function(success) {
                if (success) {
                    // Set current year in footer
                    var yearSpan = document.querySelector('.footer-year');
                    if (yearSpan) {
                        yearSpan.textContent = new Date().getFullYear();
                    }
                }
            });
        }
        // Footer is optional, so no warning if not found
    }

    // Initialize when DOM is ready
    // This script should be loaded just before closing </body> tag
    // Run immediately since DOM is already parsed when script executes
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initComponents);
    } else {
        // DOM is ready, run immediately
        initComponents();
    }

    // Export for manual use if needed
    window.loadComponent = loadComponent;
})();

