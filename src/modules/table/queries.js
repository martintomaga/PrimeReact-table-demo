import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { mapFilterMatchMode, mapSortOrder } from './transform';

export const cacheKeys = {
  clientTableDataGet: (tableName) => ['clientTableData', tableName],
  serverTableDataGet: (tableName, tableParams) => ['serverTableData', tableName, tableParams],
  tableColumnsGet: (tableName, userName) => ['tableColumnsData', tableName, userName],
};

export const useClientTableDataQuery = (tableName) =>
  useQuery({
    queryKey: cacheKeys.clientTableDataGet(tableName),
    queryFn: () => axios.get('/table/clientTableData', { params: { tableName } }).then((res) => res.data),
  });

export const useServerTableDataQuery = (tableName, tableParams) =>
  useQuery({
    queryKey: cacheKeys.serverTableDataGet(tableName, tableParams),
    queryFn: () =>
      axios
        .get('/table/serverTableData', {
          params: {
            page: tableParams.first,
            size: tableParams.rows,
            sort: JSON.stringify([{ accessor: tableParams.sortField, sortType: mapSortOrder(tableParams.sortOrder) }]),
            filter: JSON.stringify(getFilter(tableParams.filters)),
          },
        })
        .then((res) => res.data),
  });

// URL params
// page=0
// size=20
// sort=[{"accessor":"name","sortType":"DESC"}]
// filter=[{"accessor":"name","value":"karel","matchMode":"CONTAINS","value2":"","filterType":0},
//   {"accessor":"birthDate","value":"1985-08-10","matchMode":"BETWEEN","value2":"1985-08-20","filterType":2}]

const getFilter = (filters) => {
  let flattenFilters = Object.keys(filters).map((key) => {
    let filter = filters[key];
    filter.key = key;
    return filter;
  });

  return flattenFilters
    .filter((filter) => filter.value)
    .map((filter) => {
      return { accessor: filter.key, value: filter.value, matchMode: mapFilterMatchMode(filter.matchMode) };
    });
};

export const useTableColumnsQuery = (tableName, userName) =>
  useQuery({
    queryKey: cacheKeys.tableColumnsGet(tableName, userName),
    queryFn: () => axios.get('/table/tableColumns', { params: { tableName, userName } }).then((res) => res.data),
  });

export const useTableColumnMutation = (tableName, userName) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      axios.post('/table/tableColumns', {
        params: {
          tableName,
          userName,
          columnName: data.columnName,
          visible: data.visible,
        },
      }),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(cacheKeys.tableColumnsGet(tableName, userName), (columns) =>
        variables.visible
          ? [...columns, variables.columnName]
          : columns.filter((column) => column !== variables.columnName),
      );
    },
  });
};
