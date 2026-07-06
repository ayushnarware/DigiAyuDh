/**
 * Browser and DOM utility functions
 */

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    }
  } catch {
    return false;
  }
};

/**
 * Download file from data URL
 */
export const downloadFile = (url: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Get current scroll position
 */
export const getScrollPosition = (): { x: number; y: number } => ({
  x: window.scrollX || window.pageXOffset,
  y: window.scrollY || window.pageYOffset,
});

/**
 * Scroll to element smoothly
 */
export const scrollToElement = (
  element: HTMLElement | null,
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' },
): void => {
  element?.scrollIntoView(options);
};

/**
 * Check if element is in viewport
 */
export const isElementInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Detect if device is mobile
 */
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
};

/**
 * Get device type
 */
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

/**
 * Handle full screen toggle
 */
export const toggleFullscreen = async (element: HTMLElement = document.documentElement): Promise<void> => {
  try {
    if (!document.fullscreenElement) {
      await element.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (error) {
    console.error('Fullscreen error:', error);
  }
};

/**
 * Generate unique ID
 */
export const generateId = (prefix = 'id'): string => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
