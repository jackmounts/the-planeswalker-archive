"use client";
import withAuth from "@/components/hoc/withAuth";
import React from "react";

const ProfilePage: React.FC = () => {
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome to the profile page!</p>
    </div>
  );
};

export default withAuth(ProfilePage);
