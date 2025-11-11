/**
 * Details Navigation Utilities
 *
 * Auto-opens collapsed <details> elements when navigating to anchors inside them.
 * Enables ToC links to work seamlessly with collapsible sections.
 */

/**
 * Opens all parent <details> elements of a target element.
 * Enables anchor navigation to work inside collapsed sections.
 *
 * @param targetId - The element ID to navigate to (without # prefix)
 */
function openParentDetails(targetId: string): void {
  if (!targetId) return;

  const target = document.getElementById(targetId);
  if (!target) return;

  // Walk up the DOM tree and open any <details> ancestors
  let element: HTMLElement | null = target;
  while (element && element !== document.body) {
    if (element.tagName === 'DETAILS') {
      (element as HTMLDetailsElement).open = true;
    }
    element = element.parentElement;
  }
}

/**
 * Handles hash changes (anchor navigation) by opening collapsed details.
 * Called on initial load, hash changes, and SPA navigation.
 */
function handleHashChange(): void {
  const hash = window.location.hash.slice(1); // Remove '#' prefix
  if (hash) {
    // Small delay to ensure DOM is ready
    setTimeout(() => openParentDetails(hash), 10);
  }
}

/**
 * Initializes details navigation functionality.
 * Sets up event listeners for hash changes and initial page load.
 * Should be called once during app initialization (client-side only).
 */
export function initializeDetailsNavigation(): void {
  if (typeof window === 'undefined') return;

  // Handle initial page load with hash
  if (window.location.hash) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleHashChange);
    } else {
      handleHashChange();
    }
  }

  // Handle hash changes during navigation (ToC clicks, back/forward)
  window.addEventListener('hashchange', handleHashChange);
}
