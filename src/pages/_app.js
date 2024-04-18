import PropTypes from 'prop-types';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { addLocale, PrimeReactProvider, updateLocaleOptions } from 'primereact/api';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import csPrimeLocales from '../localization/csPrime.json';
import csAppLocales from '../localization/csApp.json';

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  require('../../mock');
}

addLocale('cs', csPrimeLocales['cs']);
updateLocaleOptions(csAppLocales['cs'], 'cs');

const queryClient = new QueryClient();

function App({ Component, pageProps }) {
  const primeReactProviderValue = {
    locale: 'cs',
  };

  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider value={primeReactProviderValue}>
        <Component {...pageProps} />
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default App;
