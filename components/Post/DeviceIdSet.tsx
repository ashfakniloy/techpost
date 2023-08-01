"use client";

import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

function DeviceIdSet({ isAdmin }: { isAdmin: boolean }) {
  useEffect(() => {
    if (isAdmin) return;

    const deviceId = Cookies.get("deviceId");

    if (!deviceId) {
      const newDeviceId = uuidv4();
      Cookies.set("deviceId", newDeviceId);
    }
  }, []);

  return <></>;
}

export default DeviceIdSet;
