"use client";
import { useEffect, useState } from "react";

export function useSession() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) setSession(data);
        else setSession(null);
      });
  }, []);
  return session;
}
