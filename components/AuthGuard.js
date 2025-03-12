import { useRouter } from "next/router";
import { useEffect } from "react";
import { isAuthenticated } from "../src/lib/auth";

export default function AuthGuard({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login"); // Redirect to login page if not authenticated
    }
  }, []);

  return isAuthenticated() ? children : null;
}
