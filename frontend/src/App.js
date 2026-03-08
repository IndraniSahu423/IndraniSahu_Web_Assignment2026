import ErrorBoundary from './components/ErrorBoundary';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <div>
      <ErrorBoundary>
        <RegistrationForm />
      </ErrorBoundary>
    </div>
  );
}

export default App;