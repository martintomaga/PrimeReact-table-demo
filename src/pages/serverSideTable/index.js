import { useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, SortOrder } from 'primereact/api';
import { InputNumber } from 'primereact/inputnumber';

import TableHeader from '../../components/table/TableHeader';
import { getLoggedUserName } from '../../features/user';
import { useServerTableDataQuery, useTableColumnsQuery } from '../../modules/table/queries';
import { getMessage } from '../../features/localization';

const TABLE_NAME = 'ServerSideTable';

const ServerSideTable = () => {
  const columns = [
    { field: 'firstName', header: getMessage('firstName') },
    { field: 'lastName', header: getMessage('lastName') },
    { field: 'email', header: getMessage('email') },
    { field: 'phoneNumber', header: getMessage('phoneNumber') },
    { field: 'note', header: getMessage('note') },
    { field: 'address', header: getMessage('address') },
    { field: 'weight', header: getMessage('weight') },
    { field: 'height', header: getMessage('height') },
  ];

  const filters = {
    firstName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    lastName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    phoneNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
    note: { value: null, matchMode: FilterMatchMode.CONTAINS },
    address: { value: null, matchMode: FilterMatchMode.CONTAINS },
    weight: { value: null, matchMode: FilterMatchMode.EQUALS },
    height: { value: null, matchMode: FilterMatchMode.EQUALS },
  };

  const initialParams = {
    first: 0,
    rows: 5,
    page: 1,
    sortField: 'lastName',
    sortOrder: SortOrder.ASC,
    filters: filters,
  };

  const [tableParams, setTableParams] = useState(initialParams);

  const { data } = useServerTableDataQuery(TABLE_NAME, tableParams);
  const { data: visibleColumns } = useTableColumnsQuery(TABLE_NAME, getLoggedUserName());

  const onPageHandler = (event) => {
    setTableParams({ ...event });
  };

  const onSortHandler = (event) => {
    setTableParams({ ...event });
  };

  const onFilterHandler = (event) => {
    event['first'] = 0;
    setTableParams({ ...event });
  };

  const numberFilterTemplate = (options) => {
    return (
      <InputNumber
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        mode="decimal"
      />
    );
  };

  return (
    <>
      {data && (
        <DataTable
          value={data.data?.content}
          header={<TableHeader tableName={TABLE_NAME} columns={columns} visibleColumns={visibleColumns} />}
          lazy
          resizableColumns
          reorderableColumns
          showGridlines
          stripedRows
          paginator
          rowsPerPageOptions={[5, 10, 25]}
          totalRecords={data.data?.totalElements}
          onPage={onPageHandler}
          onSort={onSortHandler}
          onFilter={onFilterHandler}
          sortMode={'single'}
          sortField={tableParams.sortField}
          sortOrder={tableParams.sortOrder}
          multiSortMeta={tableParams.multiSortMeta}
          filters={tableParams.filters}
          filterDisplay="row"
          first={tableParams.first}
          rows={tableParams.rows}
        >
          <Column
            key="firstName"
            field="firstName"
            header={getMessage('firstName')}
            sortable
            filter
            hidden={!visibleColumns?.includes('firstName')}
          />

          <Column
            key="lastName"
            field="lastName"
            header={getMessage('lastName')}
            sortable
            filter
            hidden={!visibleColumns?.includes('lastName')}
          />

          <Column
            key="phoneNumber"
            field="phoneNumber"
            header={getMessage('phoneNumber')}
            sortable
            filter
            hidden={!visibleColumns?.includes('phoneNumber')}
          />

          <Column
            key="email"
            field="email"
            header={getMessage('email')}
            sortable
            filter
            hidden={!visibleColumns?.includes('email')}
          />

          <Column key="note" field="note" header="Note" sortable filter hidden={!visibleColumns?.includes('note')} />

          <Column
            key="address"
            field="address"
            header={getMessage('address')}
            sortable
            filter
            hidden={!visibleColumns?.includes('address')}
          />

          <Column
            key="weight"
            field="weight"
            header={getMessage('weight')}
            sortable
            filter
            filterElement={numberFilterTemplate}
            dataType="numeric"
            hidden={!visibleColumns?.includes('weight')}
          />

          <Column
            key="height"
            field="height"
            header={getMessage('height')}
            sortable
            filter
            filterElement={numberFilterTemplate}
            dataType="numeric"
            hidden={!visibleColumns?.includes('height')}
          />
        </DataTable>
      )}
    </>
  );
};

export default ServerSideTable;
