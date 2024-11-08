"use client"

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, PaginationSlots, Input, Select, Selection, SelectItem } from "@nextui-org/react";
import { useMemo, useState, useEffect, useCallback } from "react";
import { TableSlots, InputSlots, SortDescriptor } from "@nextui-org/react";
import { useViewport } from "@/context/ViewportContext";


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

export type Accumulator = {
  [key: string]: ColumnType["key"] | undefined;
}

export default function InputTable({
  columns, rows, 
  inputColumns,
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
  inputColumns?: Array<ColumnType["key"]>;
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

  const width = useViewport();

  const [tableMounted, setTableMounted] = useState(false);

  // Set with the selected rowsPerPage value, used in rowsPerPageSelector (TODO), or null
  const [selectedRowsPerPageSet, setSelectedRowsPerPageSet] = useState<Selection>(() => {
    if (typeof rowsPerPage === 'number')
      return new Set([rowsPerPage.toString()]);
    else if (Array.isArray(rowsPerPage))
      return new Set([rowsPerPage[0].toString()]);
    else return new Set([]);
  });

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({});

  const [displayedPage, setDisplayedPage] = useState<number>(1);

  const [tableRows, setTableRows] = useState<Array<RowType>>(rows);

  const onInputValueChange = useCallback((rowId: RowType["id"], columnKey: ColumnType["key"], value: string) => {
    
    // Update only the specific cell without mutating the original state of the array
    setTableRows((prevRows) =>
      prevRows.map((row) =>
        (row.id === rowId ) 
          ? { ...row, [columnKey]: value } 
          : row
      )
    );

  }, []);

  // Component mounted
  useEffect(() => {
    setTableMounted(true);
  }, []);

  // Generates an array of objects with key-value pairs: "key": string, "value": number
  const rowsPerPageIterable = useMemo(() => {
    if (typeof rowsPerPage === 'number')
      return (
        [{
          "key": rowsPerPage.toString(),
          "value": rowsPerPage
        }] 
      );
    else if (Array.isArray(rowsPerPage))
      return (
        rowsPerPage.map((arrayRow) => (
          {
            "key": arrayRow.toString(),
            "value": arrayRow
          }
        ))
      )
    else return [];
  }, [rowsPerPage]);

  // numerical value of selectedRowsPerPageSet or null
  const selectedRowsPerPage = useMemo(() => {
    if (selectedRowsPerPageSet)
      return Number(Array.from(selectedRowsPerPageSet)[0]);
    else 
     return null;
  }, [selectedRowsPerPageSet]);

  const totalPages = useMemo(() => {
    if (typeof selectedRowsPerPage === 'number')
      return Math.ceil(tableRows.length / selectedRowsPerPage);
    else
      return 1
  }, [tableRows.length, selectedRowsPerPage]);

  const pagesSiblings = useMemo(() => {
    if (width < 500)
      return 0;

    if (width > 500)
      return 1
  }, [width]);

  // Sorted rows depending on selected column, original rows if sorting isn't enabled
  const sortedRows = useMemo(() => {

    // When sorting isn't enabled, sortDescriptor.column is undefined, so we return the original rows.
    if (!sortDescriptor?.column)
        return tableRows;
      
    const columnKey = sortDescriptor.column;

    return [...tableRows].sort((a, b) => {
      const first = a[columnKey];
      const second = b[columnKey];

      // Check that `first` and `second` are of type `string` or `number`
      const parsedFirst = typeof first === "string" ? parseInt(first) || first : first;
      const parsedSecond = typeof second === "string" ? parseInt(second) || second : second;
  
      let cmp = parsedFirst < parsedSecond ? -1 : 1;

      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }

      return cmp;
    });
  }, [sortDescriptor, tableRows]);

  // Rows that will be displayed in the current page, depending on the sortedRows list
  const displayedRows = useMemo(() => {

    // If selectedRowsPerPage is null, no pagination exists so return all items
    if (!selectedRowsPerPage)
      return sortedRows

    const start = (displayedPage - 1) * Number(selectedRowsPerPage);
    const end = start + Number(selectedRowsPerPage);

    return sortedRows.slice(start,end)
  }, [displayedPage, sortedRows, selectedRowsPerPage]);

  // Top content of the array, currently only the tableLabel
  const topContent = useMemo(() => {
    if (displayTopContent) {
      return (

        <div className={ classNames?.topContent ? `flex ${classNames.topContent}` : `flex` }>
        
          { displayTableLabel && <div className="my-auto">{tableLabel}</div> }

          {displayRowsPerPageSelector && 
            <div className="h-10">
              <Select
                variant="flat"
                label="Entries"
                labelPlacement="outside-left"
                items={rowsPerPageIterable}
                selectedKeys={selectedRowsPerPageSet}
                disallowEmptySelection
                onSelectionChange={setSelectedRowsPerPageSet}
                classNames={{
                  base: "items-center",
                  mainWrapper: "w-16",
                }}
              >
                {(entry) => (
                  <SelectItem
                    key={entry.key}
                    value={entry.value}
                    textValue={entry.key}
                    hideSelectedIcon
                  >
                    {entry?.value}
                  </SelectItem>
                )}
              </Select>
            </div>
          }
        
        </div>
        
      )
    } else 
      return <></>;
    
  }, [displayTopContent, classNames?.topContent, displayTableLabel, tableLabel, displayRowsPerPageSelector, rowsPerPageIterable, selectedRowsPerPageSet]);

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
              siblings={pagesSiblings}
              onChange={(page) => { setDisplayedPage(page) }}
            />
          }
          
        </div>
        
      )
    } else
        return <></>;
  }, [displayBottomContent, classNames?.bottomContent?.base, classNames?.bottomContent?.paginationClassNames, displayPagination, displayPaginationControls, displayedPage, totalPages, pagesSiblings]);

  const tableClassNames = useMemo(() => {
    return {
      ... classNames?.table,
      th: "px-6"
    }
  }, [classNames]);

  // Hook to set the displayed page to 1 when totalPages changes
  useEffect(() => {
    setDisplayedPage(1);
  }, [totalPages]);

  // Hook to change selectedRowsPerPageSet if rowsPerPage prop is changed
  useEffect(() => {
    if (typeof rowsPerPage === 'number')
      setSelectedRowsPerPageSet(new Set([rowsPerPage.toString()]));
    else if (Array.isArray(rowsPerPage))
      setSelectedRowsPerPageSet(new Set([rowsPerPage[0].toString()]));
    else setSelectedRowsPerPageSet(new Set([]));
  }, [rowsPerPage]);

  if (!tableMounted)
    return null

  return (
    <Table
      aria-label={tableLabel}
      classNames={tableClassNames}
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

        {(item) => {
          console.log("rendering row:", item)
          return (
            <TableRow key={item.id}>   

              {(columnKey) => (
              
                <TableCell>
                  
                  {
                    (!inputColumns || !inputColumns.includes(columnKey)) 
                      ? item[columnKey]
                      : (
                          <Input
                            value={item[columnKey].toString()}
                            onValueChange={(value) => onInputValueChange(item.id, columnKey, value)}
                            classNames={classNames?.input}
                          />
                        )
                  }
                  
                </TableCell>
              
              )}

            </TableRow>
          )
        }}

      </TableBody>

    </Table>
  )
}
