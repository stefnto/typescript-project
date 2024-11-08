import React from 'react'

import InputTable, { ColumnType, RowType, InputTableClassNames } from "@/components/Table/InputTable";
import { Card, CardBody } from "@nextui-org/card";

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
  {
    id: "5",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "6",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "7",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "8",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "9",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "10",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "11",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "12",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "13",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "14",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "15",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "16",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "17",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "18",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "19",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "20",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "21",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "22",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "23",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "24",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "25",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "26",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "27",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "28",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "29",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "30",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "31",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "32",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "33",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "34",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    id: "35",
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

const inputColumns = ["name", "role", "status"];

const tableClassNames: InputTableClassNames = {
  topContent: `justify-between`,
  bottomContent: {
    // base: "flex"
  },
  table: {
    wrapper: "shadow-none py-0 pl-0 pr-2 rounded-t-none flex-1 justify-normal",
  },
  input: {
    base: "min-w-[200px]",
    // input: "text-center"
  }
};

const rowsPerPage = [2, 5, 10, 20, 30];

const TablePage = () => {
  return (
    <Card>
      <CardBody>
        <InputTable
          columns={columns}
          rows={rows}
          inputColumns={inputColumns}
          tableLabel="Status table"
          displayTableLabel
          isHeaderSticky
          removeWrapper
          displayTopContent
          displayBottomContent
          topContentPlacement='outside'
          bottomContentPlacement='outside'
          rowsPerPage={rowsPerPage}
          displayRowsPerPageSelector
          enableSorting
          sortableColumns={sortableColumns}
          classNames={tableClassNames}
          // displayPaginationControls={false}
        />
      </CardBody>
    </Card>
    
  )
}

export default TablePage
