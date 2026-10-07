'use client'

import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TimezoneSync({ savedTimezone }: { savedTimezone: string }) {
  const router = useRouter();

  useEffect(() => {
    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (savedTimezone === browserTimeZone) return;

    void authClient.updateUser({ timezone: browserTimeZone }).then(({ error }) => {
      if (error) {
        console.error("Failed to update user time zone:", error.message);
        return;
      }

      router.refresh();
    }).catch((error: unknown) => {
      console.error("Failed to update user time zone:", error);
    });
  }, [router, savedTimezone]);

  return null
}