"use client";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import React from "react";

const UnauthorizedPage = () => {
  return (
    <div>
      <div className="flex flex-row bg-zinc-800/50 border-2-zinc-800/50 p-4 rounded-md items-center">
        <div className="text-white mr-2 ">
          <InfoCircledIcon />
        </div>
        <div className="text-white ">
          <p>You are not Authorized to access this page.</p>
        </div>
      </div>

      {/* <p>Hold Up</p>
    <p>Error 401: Unauthorized</p> */}
    </div>
  );
};

export default UnauthorizedPage;
