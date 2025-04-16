import NextAuth from "next-auth";
import { authConfig } from "@/config/auth";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/admin"],
};
