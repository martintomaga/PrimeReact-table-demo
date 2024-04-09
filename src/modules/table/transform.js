import { find, prop, propEq } from 'ramda';
import { FilterMatchMode, SortOrder } from 'primereact/api';

const sortTransformTable = [
  {
    primeTable: SortOrder.ASC,
    backend: 'ASC',
  },
  {
    primeTable: SortOrder.DESC,
    backend: 'DESC',
  },
];

const filterTransformTable = [
  {
    primeTable: FilterMatchMode.CONTAINS,
    backend: 'CONTAINS',
  },
  {
    primeTable: FilterMatchMode.STARTS_WITH,
    backend: 'STARTS_WITH',
  },
  {
    primeTable: FilterMatchMode.ENDS_WITH,
    backend: 'ENDS_WITH',
  },
  {
    primeTable: FilterMatchMode.EQUALS,
    backend: 'EQUALS',
  },
  {
    primeTable: FilterMatchMode.NOT_EQUALS,
    backend: 'GREATER_THAN',
  },
  {
    primeTable: FilterMatchMode.LESS_THAN,
    backend: 'LESS_THAN',
  },
  {
    primeTable: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
    backend: 'GREATER_EQUAL',
  },
  {
    primeTable: FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
    backend: 'LESS_EQUAL',
  },
  {
    primeTable: FilterMatchMode.BETWEEN,
    backend: 'BETWEEN',
  },
];

export const mapSortOrder = (sortOrder) => prop('backend', find(propEq(sortOrder, 'primeTable'), sortTransformTable));

export const mapFilterMatchMode = (filterMatchMode) => prop('backend', find(propEq(filterMatchMode, 'primeTable'), filterTransformTable));