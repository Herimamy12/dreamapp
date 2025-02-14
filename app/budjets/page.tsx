'use client'

import React, { useEffect } from "react";
import { testConsoleLog } from "../actions";

const page = () => {
  useEffect(() => {
    testConsoleLog();
  }, []);

  return <div>page</div>;
};

export default page;
