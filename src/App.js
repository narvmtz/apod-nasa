import './App.css';
import FetchData from './components/FetchData.jsx';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FetchData />
    </QueryClientProvider>
  );
}

export default App;
