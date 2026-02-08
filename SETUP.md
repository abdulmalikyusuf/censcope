# Project Setup Guide

## ✅ Completed Steps

1. ✅ Installed pnpm via corepack
2. ✅ Installed all project dependencies (746 packages)
3. ✅ Started development server (running on http://localhost:3000)

## ⚠️ Required Environment Variables

The application requires the following environment variables to be set in `.env.local`:

### Required Variables

1. **DATABASE_URL** - PostgreSQL database connection string
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/censcope
   ```

2. **CLOUDINARY_API_KEY** - Your Cloudinary API key
   ```
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   ```

3. **CLOUDINARY_NAME** - Your Cloudinary cloud name
   ```
   CLOUDINARY_NAME=your-cloudinary-name
   ```

4. **CLOUDINARY_SECRET** - Your Cloudinary API secret
   ```
   CLOUDINARY_SECRET=your-cloudinary-secret
   ```

5. **AUTH_SECRET** - Secret key for NextAuth (generate with: `openssl rand -base64 32`)
   ```
   AUTH_SECRET=your-generated-secret-key
   ```

6. **NEXTAUTH_URL** - Base URL for your application
   ```
   NEXTAUTH_URL=http://localhost:3000
   ```

7. **NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY** - Paystack public key for donations
   ```
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_public_key_here
   ```

8. **PAYSTACK_SECRET_KEY** - Paystack secret key for payment verification (server-side only)
   ```
   PAYSTACK_SECRET_KEY=sk_test_your_secret_key_here
   ```

### Optional Variables

- **NEXT_PUBLIC_APP_URL** - Public application URL (defaults to localhost:3000)
- **SEED_EMAIL**, **SEED_NAME**, **SEED_PASSWORD** - For database seeding (optional)

## 📝 Next Steps

1. **Create/Update `.env.local` file** with the required variables above

2. **Set up PostgreSQL database**:
   - Install PostgreSQL if not already installed
   - Create a database named `censcope` (or update DATABASE_URL)
   - Run migrations: `pnpm db:migrate`

3. **Get Cloudinary credentials**:
   - Sign up at https://cloudinary.com if you don't have an account
   - Get your API key, cloud name, and secret from the dashboard

4. **Generate AUTH_SECRET**:
   ```bash
   openssl rand -base64 32
   ```

5. **Get Paystack credentials**:
   - Sign up at https://paystack.com if you don't have an account
   - Get your public key and secret key from the dashboard
   - For testing, use test keys (pk_test_... and sk_test_...)
   - For production, use live keys (pk_live_... and sk_live_...)

6. **Restart the development server** after setting environment variables:
   ```bash
   pnpm dev
   ```

## 🚀 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:generate` - Generate database migrations
- `pnpm db:migrate` - Run database migrations
- `pnpm db:seed` - Seed the database

## 🔍 Current Status

- Development server is running on http://localhost:3000
- Server is currently returning 500 errors due to missing environment variables
- Once environment variables are configured, the application should work properly
