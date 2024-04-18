import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';

import { getLoggedUserName } from '../../features/user';
import { useClientTableDataQuery, useTableColumnsQuery } from '../../modules/table/queries';
import TableHeader from '../../components/table/TableHeader';
import { getMessage } from '../../features/localization';

const TABLE_NAME = 'ClientSideTable';

const ClientSideTable = () => {
  const { data } = useClientTableDataQuery(TABLE_NAME);
  const { data: visibleColumns } = useTableColumnsQuery(TABLE_NAME, getLoggedUserName());

  const columns = [
    { field: 'firstName', header: getMessage('firstName') },
    { field: 'lastName', header: getMessage('lastName') },
    { field: 'email', header: getMessage('email') },
    { field: 'phoneNumber', header: getMessage('phoneNumber') },
  ];

  const filters = {
    firstName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    lastName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    phoneNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };

  return (
    <>
      <DataTable
        value={data}
        header={<TableHeader tableName={TABLE_NAME} columns={columns} visibleColumns={visibleColumns} />}
        resizableColumns
        reorderableColumns
        showGridlines
        stripedRows
        filters={filters}
      >
        {visibleColumns &&
          columns
            .filter((col) => visibleColumns.some((visibleColumn) => col.field === visibleColumn))
            .map((col) => <Column key={col.field} field={col.field} header={col.header} sortable filter />)}
      </DataTable>
    </>
  );
};

export default ClientSideTable;
