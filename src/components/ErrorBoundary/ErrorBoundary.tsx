import React, { ErrorInfo, ReactNode } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { logError } from '../../utils/logger';
import AppText from '../ui/AppText/AppText';
import AppView from '../ui/AppView/AppView';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(
    error: Error
  ): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('ErrorBoundary caught an error:', error, errorInfo);
    logError(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <AppView style={styles.container}>
          <AppText style={styles.title}>
            Something went wrong.
          </AppText>
          <AppText style={styles.message}>
            We are sorry for the inconvenience. Please try again later.
          </AppText>

          {this.state.error && (
            <AppView style={styles.errorDetails}>
              <AppText style={styles.errorText}>
                Error: {String(this.state.error.message || 'Unknown error')}
              </AppText>

              {this.state.error.stack ? (
                this.state.error.stack
                  .split('\n')
                  .map((line, index) => (
                    <AppText
                      key={index}
                      style={styles.errorText}
                    >
                      {line.trim()}
                    </AppText>
                  ))
              ) : (
                <AppText style={styles.errorText}>
                  No stack trace available
                </AppText>
              )}
            </AppView>
          )}
        </AppView>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8d7da',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#721c24',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#721c24',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorDetails: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f5c6cb',
    borderRadius: 5,
    width: '100%',
  },
  errorText: {
    color: '#721c24',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 12,
    marginBottom: 2,
  },
});

export default ErrorBoundary;
