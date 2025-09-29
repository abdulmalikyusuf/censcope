import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/admin/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      // If logged in and trying to visit /admin/signin → redirect to /admin
      if (pathname === "/admin/signin" && isLoggedIn) {
        return false;
      }

      // If trying to access /admin/* but not logged in → redirect
      if (pathname.startsWith("/admin") && !isLoggedIn) {
        return false;
      }

      // Allow the signin page without auth
      if (pathname.startsWith("/admin/signin")) {
        return true;
      }

      // Otherwise, allow request
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        token.lastUpdated = new Date().toISOString();
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      return {
        ...session,
        user: {
          id: token.userId as string,
          email: token.email as string,
        },
      };
    },
    async redirect({ url, baseUrl }) {
      // Allows relative URLs
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // If same origin allowed
      try {
        const parsed = new URL(url);
        if (parsed.origin === baseUrl) {
          return url;
        }
      } catch {
        // If parsing fails, fallback
      }
      // Fallback to baseUrl
      return baseUrl;
    },
  },
  events: {
    async signIn({ user }) {
      console.log("[AUTH] Successful sign-in:", {
        userId: user.id,
        email: user.email,
        timestamp: new Date().toISOString(),
      });
    },
    async signOut(message) {
      if ("session" in message) {
        if (message.session?.userId) {
          console.log("[AUTH] Signing out...");
          // signOut();
        }
      }
    },
  },
  logger: {
    error(code, ...message) {
      console.error(code, message);
    },
    warn(code, ...message) {
      console.warn(code, message);
    },
    debug(code, ...message) {
      console.debug(code, message);
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
