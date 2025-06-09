import React, { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Row,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  MoreVertical,
  ChevronDown,
  ChevronsUpDown,
  Search,
  Shield,
  UserMinus,
  Star,
  Power
} from "lucide-react";
import { TeamMember } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface TeamMembersTableProps {
  members?: TeamMember[];
  onUpdateMember?: (memberId: string, updates: Partial<TeamMember>) => void;
  onRemoveMember?: (memberId: string) => void;
}

export const TeamMembersTable: React.FC<TeamMembersTableProps> = ({
  members = [],
  onUpdateMember,
  onRemoveMember
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<TeamMember>[] = [
    {
      accessorKey: "name",
      header: "Person",
      cell: ({ row }: { row: Row<TeamMember> }) => {
        const member = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/brand/clarivue_logo_transparent.png" />
              <AvatarFallback>
                {member.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium flex items-center gap-2">
                {member.name}
                {member.role === 'Admin' && (
                  <Badge variant="outline" className="ml-2">Admin</Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {member.email}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "seat",
      header: "Seat Type",
      cell: ({ row }: { row: Row<TeamMember> }) => {
        const seat = row.getValue("seat") as string;
        return (
          <Badge
            variant={seat === 'Pro' ? 'default' : 'outline'}
            className={seat === 'Pro' ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' : ''}
          >
            {seat}
          </Badge>
        );
      },
    },
    {
      accessorKey: "usage",
      header: ({ column }: { column: any }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Usage
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }: { row: Row<TeamMember> }) => {
        const usage = row.original.usage;
        const percentage = (usage.current / usage.limit) * 100;
        return (
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full",
                  percentage > 80 ? "bg-orange-500" :
                  percentage > 50 ? "bg-blue-500" :
                  "bg-emerald-500"
                )}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-sm">
              {usage.current}/{usage.limit}
            </span>
          </div>
        );
      },
      sortingFn: (rowA: Row<TeamMember>, rowB: Row<TeamMember>) => {
        const aUsage = (rowA.original.usage.current / rowA.original.usage.limit) * 100;
        const bUsage = (rowB.original.usage.current / rowB.original.usage.limit) * 100;
        return aUsage - bUsage;
      },
    },
    {
      accessorKey: "isCapturingEnabled",
      header: "Capturing",
      cell: ({ row }: { row: Row<TeamMember> }) => {
        const enabled = row.getValue("isCapturingEnabled") as boolean;
        return (
          <Switch
            checked={enabled}
            onCheckedChange={(checked) => 
              onUpdateMember?.(row.original.id, { isCapturingEnabled: checked })
            }
          />
        );
      },
    },
    {
      accessorKey: "lastConversation",
      header: ({ column }: { column: any }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Activity
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }: { row: Row<TeamMember> }) => {
        const lastConversation = row.original.lastConversation;
        if (!lastConversation) return "Never";
        return formatDistanceToNow(new Date(lastConversation.date), { addSuffix: true });
      },
      sortingFn: (rowA: Row<TeamMember>, rowB: Row<TeamMember>) => {
        const aDate = rowA.original.lastConversation?.date || new Date(0);
        const bDate = rowB.original.lastConversation?.date || new Date(0);
        return new Date(aDate).getTime() - new Date(bDate).getTime();
      },
    },
    {
      id: "actions",
      cell: ({ row }: { row: Row<TeamMember> }) => {
        const member = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {member.role !== 'Admin' && (
                <DropdownMenuItem
                  onClick={() => onUpdateMember?.(member.id, { role: 'Admin' })}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Make Admin
                </DropdownMenuItem>
              )}
              {member.seat === 'Pro' ? (
                <DropdownMenuItem
                  onClick={() => onUpdateMember?.(member.id, { seat: 'Free' })}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Revoke Pro Seat
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => onUpdateMember?.(member.id, { seat: 'Pro' })}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Assign Pro Seat
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => onRemoveMember?.(member.id)}
              >
                <UserMinus className="mr-2 h-4 w-4" />
                Remove from Team
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: members,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              View <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuItem
                    key={column.id}
                    className="capitalize"
                    onClick={() => column.toggleVisibility(!column.getIsVisible())}
                  >
                    {column.id}
                  </DropdownMenuItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No team members found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}; 