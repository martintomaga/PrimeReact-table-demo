import { useRouter } from 'next/router';

import { Divider } from 'primereact/divider';
import { Fieldset } from 'primereact/fieldset';

import URLS from '../constants/urls';

const Index = () => {
  const router = useRouter();

  return (
    <>
      <h2>PrimeReact Datatable demo</h2>

      <Fieldset
        legend="Client side table"
        style={{ cursor: 'pointer' }}
        onClick={() => router.push(URLS.clientSideTable)}
      >
        <ul>
          <li>Resizable columns</li>
          <li>Reordable columns</li>
          <li>Change column visibility (with saving the profile on the server)</li>
          <li>Client side sorting</li>
          <li>Client side filtering (default filtering)</li>
        </ul>
      </Fieldset>

      <Divider />

      <Fieldset
        legend="Server side table"
        style={{ cursor: 'pointer' }}
        onClick={() => router.push(URLS.serverSideTable)}
      >
        <ul>
          <li>Resizable columns</li>
          <li>Reordable columns</li>
          <li>Change column visibility (with saving the profile on the server)</li>
          <li>Server side sorting</li>
          <li>Server side filtering (custom filtering)</li>
          <li>Server side pagination</li>
        </ul>
      </Fieldset>
    </>
  );
};
export default Index;
