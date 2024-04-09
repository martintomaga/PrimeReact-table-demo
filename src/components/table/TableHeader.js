import PropTypes from 'prop-types';

import { MultiSelect } from 'primereact/multiselect';

import { useTableColumnMutation } from '../../modules/table/queries';
import { getLoggedUserName } from '../../features/user';

const TableHeader = ({ tableName, columns, visibleColumns }) => {
  const tableColumnMutation = useTableColumnMutation(tableName, getLoggedUserName());

  const onColumnToggle = (event) => {
    let columnName = event.selectedOption.field;
    let visible = event.value.some((col) => col.field === event.selectedOption.field);

    tableColumnMutation.mutate({ columnName, visible });
  };

  return (
    <>
      <MultiSelect
        value={columns?.filter((col) => visibleColumns?.some((vCol) => vCol === col.field))}
        options={columns}
        optionLabel="header"
        onChange={onColumnToggle}
        display="chip"
        showSelectAll={false}
      />
    </>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.array,
  tableName: PropTypes.string.isRequired,
  visibleColumns: PropTypes.array,
};

export default TableHeader;
