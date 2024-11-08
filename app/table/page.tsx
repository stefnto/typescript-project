import React from 'react'

import InputTable, { ColumnType, RowType, InputTableClassNames } from "@/components/Table/InputTable";
import { Card, CardBody } from "@nextui-org/card";
import TableWrapper from './TableWrapper';

const TablePage = () => {
  return (
    <Card>
      <CardBody>
        <TableWrapper/>
      </CardBody>
    </Card>
    
  )
}

export default TablePage
