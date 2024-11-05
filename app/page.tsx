"use client"
import { Tabs, Tab } from "@nextui-org/react";

export default function Home() {

  // const rows = [
  //   {
  //     id: "1",
  //     name: "Tony Reichert",
  //     role: "CEO",
  //     status: "Active",
  //   },
  //   {
  //     id: "2",
  //     name: "Zoey Lang",
  //     role: "Technical Lead",
  //     status: "Paused",
  //   },
  //   {
  //     id: "3",
  //     name: "Jane Fisher",
  //     role: "Senior Developer",
  //     status: "Active",
  //   },
  //   {
  //     id: "4",
  //     name: "William Howard",
  //     role: "Community Manager",
  //     status: "Vacation",
  //   },
  // ];
  
  // const columns = [
  //   {
  //     key: "name",
  //     label: "NAME",
  //   },
  //   {
  //     key: "role",
  //     label: "ROLE",
  //   },
  //   {
  //     key: "status",
  //     label: "STATUS",
  //   },
  // ];

  return (
    <Tabs
      aria-label="Tab"
      destroyInactiveTabPanel={false}
    >
      <Tab title="tab1">

        {/* <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table> */}

        {/* <InputTable
          columns={columns}
          rows={rows}
          tableLabel="Status table"
          displayTableLabel
          isHeaderSticky
          displayTopContent
        /> */}

      </Tab>

      <Tab title="tab2">

      </Tab>
    </Tabs>
  );
}
