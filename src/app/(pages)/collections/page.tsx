"use client";
import withAuth from "@/components/hoc/withAuth";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";
import { Collection } from "@/app/db";
import { Button } from "@/components/ui/button";
import { Filter, ListFilter, Pencil, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

const CollectionPage: React.FC = () => {
  const data: Collection[] = [
    {
      uuid: "abcd1234",
      profile_uuid: "abcd1234",
      name: "Collection 1",
      type: "deck",
      favourite: true,
    },
    {
      uuid: "abcd1234",
      profile_uuid: "abcd1234",
      name: "Collection 2",
      type: "collection",
      favourite: true,
    },
    {
      uuid: "abcd1234",
      profile_uuid: "abcd1234",
      name: "Collection 3",
      type: "bulk",
    },
    {
      uuid: "abcd1234",
      profile_uuid: "abcd1234",
      name: "Collection 4",
      type: "whishlist",
    },
    {
      uuid: "abcd1234",
      profile_uuid: "abcd1234",
      name: "Collection 5",
      type: "deck",
    },
    {
      uuid: "abcd1234",
      profile_uuid: "abcd1234",
      name: "Collection 6",
      type: "binder",
    },
  ];
  return (
    <div className="container mx-auto p-15">
      <div className="text-4xl font-bold">Your Collections</div>{" "}
      <div className="text-muted-foreground">
        You can find all your spells just like you left them organized last
        time!
      </div>
      <div className="flex flex-row w-full items-center justify-between my-8 border-b-2 py-2">
        <div className="flex flex-row items-center gap-4">
          <Button variant="primary">
            <Plus /> New Collection
          </Button>
        </div>

        <div className="flex flex-row items-center gap-4">
          <Input placeholder="Search for a collection..." />
          <Button variant="primary_ghost">
            <ListFilter /> Filter
          </Button>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default withAuth(CollectionPage);
