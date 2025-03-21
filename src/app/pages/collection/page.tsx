"use client";
import withAuth from "@/components/hoc/withAuth";
import React from "react";

const CollectionPage: React.FC = () => {
  return (
    <div>
      <h1>Collection Page</h1>
      <p>Welcome to the collection page!</p>
    </div>
  );
};

export default withAuth(CollectionPage);
