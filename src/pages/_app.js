import PropTypes from 'prop-types';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  require('../../mock');
}

const queryClient = new QueryClient();

function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default App;
