import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px', textAlign: 'center',
          border: '1px solid #ff4444', borderRadius: '8px',
          backgroundColor: '#fff5f5', margin: '20px'
        }}>
          <h2 style={{ color: '#cc0000' }}>Something went wrong</h2>
          <p style={{ color: '#666' }}>{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              padding: '10px 20px', backgroundColor: '#007bff',
              color: 'white', border: 'none', borderRadius: '4px',
              cursor: 'pointer', marginTop: '10px'
            }}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;