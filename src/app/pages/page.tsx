"use client";
import withAuth from "@/components/hoc/withAuth";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Planeswalker Archive</h1>
    </div>
  );
};

export default withAuth(HomePage);
