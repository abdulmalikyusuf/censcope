import "next/server";

declare module "next/server" {
  interface NextRequest {
    auth?: {
      user: {
        id: string;
        email: string;
        // Add other user properties as needed
      };
      // Add other auth-related properties as needed
    };
  }
}
