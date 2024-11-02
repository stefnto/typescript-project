import React from 'react'

import InputTable, { ColumnType, RowType, InputTableClassNames } from "@/components/Table/InputTable";

const rows: Array<RowType> = [
  {
    id: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    id: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    id: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    id: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns: Array<ColumnType> = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

const sortableColumns = ["name", "role", "status"];

const tableClassNames: InputTableClassNames = {
  bottomContent: {
    // base: "flex"
  }
};

const rowsPerPage = 2;

const TablePage = () => {
  return (
    <InputTable
      columns={columns}
      rows={rows}
      tableLabel="Status table"
      displayTableLabel
      isHeaderSticky
      displayTopContent
      displayBottomContent
      // topContentPlacement='outside'
      // bottomContentPlacement='outside'
      rowsPerPage={rowsPerPage}
      enableSorting
      sortableColumns={sortableColumns}
      classNames={tableClassNames}
      // displayPaginationControls={false}
    />
  )
}

export default TablePage
