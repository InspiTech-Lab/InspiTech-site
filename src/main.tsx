// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// // Add error boundary for better error handling
// class ErrorBoundary extends StrictMode {
//   constructor(props: any) {
//     super(props);
//   }

//   static getDerivedStateFromError(error: Error) {
//     return { hasError: true, error };
//   }

//   componentDidCatch(error: Error, errorInfo: any) {
//     console.error('Error caught by boundary:', error, errorInfo);
//   }

//   render() {
//     return this.props.children;
//   }
// }

createRoot(document.getElementById('root')!).render(
 
    <App />

);