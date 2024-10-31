"use client";

import { useEffect, useMemo, useState } from "react";
import { getCookie } from "cookies-next";
import {
  MantineReactTable,
  useMantineReactTable,
  MRT_ColumnFiltersState,
  MRT_SortingState,
  MRT_Cell,
  MRT_CellValue,
} from "mantine-react-table";
import { ActionIcon, Box, Button, Modal, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { createClient } from "@/utils/supabase/client";

export function UsersTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState(0);
  // const [pagination, setPagination] = useState({
  //   pageIndex: 0,
  //   pageSize: 25,
  // });
  // const [globalFilter, setGlobalFilter] = useState("");
  // const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
  //   []
  // );
  // const [sorting, setSorting] = useState<MRT_SortingState>([]);

  const [refreshTableTrigger, setRefreshTableTrigger] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const { users } = await response.json();

        setTableData(users?.users ?? []);
        setRowCount(users?.users?.length ?? 0);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [refreshTableTrigger]);

  const columns = useMemo(
    () => [
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Created At",
        accessorKey: "created_at",
        Cell: ({ cell }: { cell: MRT_Cell<any, string> }) => {
          const date = new Date(cell.getValue<string>());
          return date.toLocaleString();
        },
      },
      {
        header: "Last Login",
        accessorKey: "last_sign_in_at",
        Cell: ({ cell }: { cell: MRT_Cell<any, string> }) => {
          const date = new Date(cell.getValue<string>());
          return date.toLocaleString();
        },
      },
    ],
    []
  );

  const table = useMantineReactTable({
    data: tableData,
    columns,
    rowCount,
    layoutMode: "grid",
    enableToolbarInternalActions: false,
    enableTopToolbar: false,
    // enableGlobalFilter: false,
    // enableColumnFilters: false,
    // enableSorting: false,
    // enableDensityToggle: false,
    // enableFullScreenToggle: false,
    // enableColumnActions: false,
    // enableRowActions: false,
    // enableColumnFilterModes: false,
    // enableColumnOrdering: false,
    // enableHiding: false,
    // enablePinning: false,
    // enableRowSelection: false,
  });
  return (
    <>
      <MantineReactTable table={table} />
    </>
  );
}
