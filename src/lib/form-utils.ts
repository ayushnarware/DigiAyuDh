/**
 * Utility functions for form handling and validation
 */

export const formUtils = {
  /**
   * Get error message from form errors object
   */
  getErrorMessage: (errors: Record<string, any>, field: string): string | undefined => {
    return errors?.[field]?.message;
  },

  /**
   * Check if field has error
   */
  hasError: (errors: Record<string, any>, field: string): boolean => {
    return !!errors?.[field];
  },

  /**
   * Format form data for API submission
   */
  formatFormData: (data: Record<string, any>) => {
    return {
      ...data,
      _timestamp: new Date().toISOString(),
    };
  },

  /**
   * Reset form to initial values
   */
  resetForm: (reset: Function, initialValues: Record<string, any>) => {
    reset(initialValues);
  },

  /**
   * Disable form during submission
   */
  getSubmitButtonState: (isSubmitting: boolean, isValid: boolean) => ({
    disabled: isSubmitting || !isValid,
    loading: isSubmitting,
  }),
};

/**
 * Common validation patterns
 */
export const validationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\d+\-\s()]+$/,
  url: /^https?:\/\/.+/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  noSpecialChars: /^[a-zA-Z0-9\s\-_\.]+$/,
};

/**
 * Format validation error messages
 */
export const formatValidationError = (fieldName: string, errorType: string): string => {
  const messages: Record<string, string> = {
    required: `${fieldName} is required`,
    email: `Please enter a valid email address`,
    minLength: `${fieldName} must be at least {min} characters`,
    maxLength: `${fieldName} must be no more than {max} characters`,
    pattern: `${fieldName} format is invalid`,
    min: `${fieldName} must be at least {min}`,
    max: `${fieldName} must be no more than {max}`,
  };

  return messages[errorType] ?? `${fieldName} is invalid`;
};
