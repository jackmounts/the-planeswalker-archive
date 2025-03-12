"use client";
import withAuth from "@/components/hoc/withAuth";
import React from "react";

const ScannerPage: React.FC = () => {
  return (
    <div>
      <h1>Scanner Page</h1>
      <p>Welcome to the Scanner page!</p>
    </div>
  );
};

export default withAuth(ScannerPage);
