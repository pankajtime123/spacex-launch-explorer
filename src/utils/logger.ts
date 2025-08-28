export const logError = (error: Error, errorInfo?: React.ErrorInfo) => {
  // In a real application, you would send this to a logging service like Sentry, Crashlytics, etc.
  console.log('---BEGIN Error Log---');
  console.log('Error:', error);
  console.log('Error Info:', errorInfo);
  console.log('---END Error Log---');
};

export const logInfo = (message: string, data?: any) => {
  console.log('---BEGIN Info Log---');
  console.log('Message:', message);
  if (data) {
    console.log('Data:', data);
  }
  console.log('---END Info Log---');
};

export const logWarn = (message: string, data?: any) => {
  console.warn('---BEGIN Warning Log---');
  console.warn('Message:', message);
  if (data) {
    console.warn('Data:', data);
  }
  console.warn('---END Warning Log---');
};
