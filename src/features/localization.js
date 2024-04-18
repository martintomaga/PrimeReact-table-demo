import { localeOptions } from 'primereact/api';

export const getMessage = (key) => {
  const localizedMessages = localeOptions(undefined);

  return localizedMessages['app'] ? localizedMessages['app'][key] : '';
};
