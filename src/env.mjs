// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    CLOUDINARY_SECRET: z.string(),
    CLOUDINARY_API_KEY: z.string(),
    CLOUDINARY_NAME: z.string(),
    PAYSTACK_SECRET_KEY: z.string().optional(),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: z.string(),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
    PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
    NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  },
});
