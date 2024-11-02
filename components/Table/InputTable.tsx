"use client"

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Pagination, PaginationSlots } from "@nextui-org/react";
import { useMemo, useState, useEffect, SetStateAction } from "react";
import { TableSlots, InputSlots, SortDescriptor } from "@nextui-org/react";


export type ColumnType = {
  key: string | number;
  label: string | number;
}

export type RowType = {
  id: string | number;
  [key: string]: string | number;
};

export type InputTableClassNames = {
  table?: {
    [key in TableSlots]?: string;
  },
  topContent?: string;
  bottomContent?: {
    base?: string;
    paginationClassNames?: { 
      [key in PaginationSlots]?: string;
    }
    
  };
  input?: {
    [key in InputSlots]?: string;
  };
}

export default function InputTable({
  columns, rows, 
  tableLabel, displayTableLabel=false,
  isHeaderSticky=false, removeWrapper=false,
  displayTopContent=false, displayBottomContent=false,
  topContentPlacement="inside", bottomContentPlacement="inside",
  rowsPerPage, displayRowsPerPageSelector=false,
  displayPagination=true, displayPaginationControls=true,
  enableSorting=false, sortableColumns,
  columnsAlignment="start",
  classNames
}: Readonly<{
  columns: Array<ColumnType>;
  rows: Array<RowType>;
  tableLabel?: string;
  displayTableLabel?: boolean;
  isHeaderSticky?: boolean;
  removeWrapper?: boolean;
  displayTopContent?: boolean;
  displayBottomContent?: boolean;
  topContentPlacement?: "outside" | "inside";
  bottomContentPlacement?: "outside" | "inside";
  rowsPerPage?: number | Array<number>;
  displayRowsPerPageSelector?: boolean;
  displayPagination?: boolean;
  displayPaginationControls?: boolean;
  enableSorting?: boolean;
  sortableColumns?: Array<ColumnType["key"]>;
  columnsAlignment?: "start" | "center" | "end";
  classNames?: InputTableClassNames;
}>) {
  // Set with the selected rowsPerPage value, used in rowsPerPageSelector (TODO), or null
  const [selectedRowsPerPageSet, setSelectedRowsPerPageSet] = useState(() => {
    if (typeof rowsPerPage === 'number')
      return new Set([rowsPerPage]);
    else if (Array.isArray(rowsPerPage))
      return new Set([rowsPerPage[0]]);
    else return null;
  });

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({});

  const [displayedPage, setDisplayedPage] = useState(1);

  // Hook to change selectedRowsPerPageSet if rowsPerPage prop is changed
  useEffect(() => {
    if (typeof rowsPerPage === 'number')
      setSelectedRowsPerPageSet(new Set([rowsPerPage]));
    else if (Array.isArray(rowsPerPage))
      setSelectedRowsPerPageSet(new Set([rowsPerPage[0]]));
    else setSelectedRowsPerPageSet(null);
  }, [rowsPerPage])

  // numerical value of selectedRowsPerPageSet or null
  const selectedRowsPerPage = useMemo(() => {
    if (selectedRowsPerPageSet)
      return Array.from(selectedRowsPerPageSet)[0];
    else 
     return null;
  }, [selectedRowsPerPageSet]);

  const totalPages = useMemo(() => {
    if (typeof selectedRowsPerPage === 'number')
      return Math.ceil(rows.length / selectedRowsPerPage);
    else
      return 1
  }, [rows.length, selectedRowsPerPage]);

  // Hook to set the displayed page to 1 when totalPages changes
  useEffect(() => {
    setDisplayedPage(1);
  }, [totalPages]);

  // Sorted rows depending on selected column, original rows if sorting isn't enabled
  const sortedRows = useMemo(() => {

    // When sorting isn't enabled, sortDescriptor.column is undefined, so we return the original rows.
    if (!sortDescriptor.column)
        return rows;
      
    const columnKey = sortDescriptor.column;

    return [...rows].sort((a, b) => {
      let first = a[columnKey];
      let second = b[columnKey];

      // Check that `first` and `second` are of type `string` or `number`
      const parsedFirst = typeof first === "string" ? parseInt(first) || first : first;
      const parsedSecond = typeof second === "string" ? parseInt(second) || second : second;
  
      let cmp = parsedFirst < parsedSecond ? -1 : 1;

      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }

      return cmp;
    });
  }, [sortDescriptor, rows]);

  // Rows that will be displayed in the current page, depending on the sortedRows list
  const displayedRows = useMemo(() => {

    // If selectedRowsPerPage is null, no pagination exists so return all items
    if (!selectedRowsPerPage)
      return sortedRows

    const start = (displayedPage - 1) * selectedRowsPerPage;
    const end = start + selectedRowsPerPage;

    return sortedRows.slice(start,end)
  }, [displayedPage, sortedRows, selectedRowsPerPage]);

  // Top content of the array, currently only the tableLabel
  const topContent = useMemo(() => {
    if (displayTopContent) {
      return (

        <div className={classNames?.topContent}>
        
          { displayTableLabel && <div>{tableLabel}</div> }
        
        </div>
        
      )
    } else 
      return <></>;
    
  }, [displayTopContent, displayTableLabel, tableLabel]);

  // Bottom content of the array, currently only pagination
  const bottomContent = useMemo(() => {
    if (displayBottomContent) {
      return (
        <div className={classNames?.bottomContent?.base}>

          { displayPagination &&
            <Pagination
              classNames={
                classNames?.bottomContent?.paginationClassNames
                  ? classNames?.bottomContent?.paginationClassNames
                  : {
                    base: "flex justify-center"
                  }
              }
              showControls={displayPaginationControls}
              page={displayedPage}
              total={totalPages}
              onChange={(page) => { setDisplayedPage(page) }}
            />
          }
          
        </div>
        
      )
    } else
        return <></>;
  }, [classNames?.bottomContent, displayBottomContent, displayPagination, displayedPage, displayPaginationControls, totalPages]);

  return (
    <Table
      aria-label={tableLabel}
      isHeaderSticky={isHeaderSticky}
      removeWrapper={removeWrapper}
      topContent={topContent}
      bottomContent={bottomContent}
      topContentPlacement={topContentPlacement}
      bottomContentPlacement={bottomContentPlacement}
      sortDescriptor={enableSorting ? sortDescriptor : undefined}
      onSortChange={enableSorting ? setSortDescriptor : undefined}
    >

      <TableHeader columns={columns}>

        {(column) =>

          <TableColumn
            key={column.key}
            data-type={column.key}
            allowsSorting={(enableSorting && sortableColumns?.includes(column.key)) ? true : false}
            align={columnsAlignment}
          >
            {column.label}
          </TableColumn>

        }

      </TableHeader>

      <TableBody items={displayedRows}>

        {(item) => (

          <TableRow key={item.id}>

            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}

          </TableRow>

        )}

      </TableBody>

    </Table>
  )
}
