"use client";

import { Collection } from "@/app/db";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpDown,
  ArrowUpRightIcon,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { Star } from "lucide-react";

export const columns: ColumnDef<Collection>[] = [
  {
    accessorKey: "favourite",
    header: ({ column }) => {
      return <div className="max-w-xs"></div>;
    },

    cell: ({ row }) => {
      return (
        <div className="max-w-xs flex justify-center">
          {(row.getValue("favourite") as boolean) && (
            <Star className="h-4 w-4 text-yellow-500" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown
            className={
              column.getIsSorted() === "desc"
                ? "-scale-y-100 ml-2 h-4 w-4"
                : "ml-2 h-4 w-4"
            }
          />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-row items-center gap-2">
          <div className="text-left hover:underline cursor-pointer">
            {row.getValue("name")}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      return (
        <div className="first-letter:uppercase">{row.getValue("type")}</div>
      );
    },
  },
  {
    accessorKey: "last_updated",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Updated
          <ArrowUpDown
            className={
              column.getIsSorted() === "desc"
                ? "-scale-y-100 ml-2 h-4 w-4"
                : "ml-2 h-4 w-4"
            }
          />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="">
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <ArrowUpRightIcon />
                Go to details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Star />
                Favourite
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pencil />
                Modify
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Trash2 />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
