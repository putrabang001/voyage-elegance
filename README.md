# Voyage Elegance - Tour & Travel Website

🌊 **Ocean Luxury meets Tropical Adventure**

A modern, multi-language tour & travel website with admin dashboard, built with Next.js 14, Tailwind CSS, and Prisma.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🌐 Multi-Language Support

Supports: 🇬🇧 English | 🇫🇷 Français | 🇮🇩 Bahasa Indonesia

- Switch languages using the dropdown in the header
- Auto-detects browser language on first visit
- All UI text and content translated

## 🔐 Admin Dashboard

Access at: `/admin/login`

Default credentials:
- Email: `admin@voyageelegance.com`
- Password: `admin123`

**⚠️ Change default password after first login!**

## 📁 Project Structure

```
voyage-elegance/
├── prisma/
│   ├── schema.prisma    # Database models
│   └── seed.ts         # Sample data seeder
├── src/
│   ├── app/
│   │   ├── [lang]/        # Multi-language public pages
│   │   │   ├── page.tsx   # Homepage
│   │   │   ├── destinations/
│   │   │   ├── tours/
│   │   │   ├── gallery/
│   │   │   ├── blog/
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   └── faq/
│   │   └── admin/         # Admin dashboard
│   │       ├── login/
│   │       ├── dashboard/
│   │       └── destinations/
│   ├── components/
│   │   ├── ui/            # Reusable UI components
│   │   └── layout/        # Header, Footer
│   ├── lib/
│   │   ├── i18n/          # Multi-language system
│   │   ├── utils/         # Utility functions
│   │   └── prisma.ts      # Database client
│   └── content/           # Translation files
│       ├── en.json
│       ├── fr.json
│       └── id.json
```

## 🚀 Deploy to Vercel

### Step 1: Push to GitHub

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/voyage-elegance.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New..." → "Project"**
3. Import your GitHub repository
4. Framework: **Next.js**
5. Click **"Deploy"**

### Step 3: Configure Environment Variables (Optional)

For production with persistent database:

1. In Vercel Dashboard → **Settings → Environment Variables**
2. Add: `DATABASE_URL` = your PostgreSQL connection string

**Note:** For SQLite, database resets on each deploy. Recommended to use PostgreSQL (Supabase/Neon) for production.

## 📊 Database Migration to PostgreSQL

For production with high traffic:

1. **Create account at [Supabase](https://supabase.com)** (free tier available)
2. Get your PostgreSQL connection string
3. Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

4. Update environment variable in Vercel
5. Push changes to redeploy

## 🛠️ Useful Commands

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Open Prisma Studio (visual database editor)
npx prisma studio

# Seed sample data
npx prisma db seed

# Build for production
npm run build

# Type check
npm run type-check
```

## 📝 Features

- ✅ Multi-language (EN/FR/ID) with auto-detection
- ✅ Responsive design (mobile-first)
- ✅ Admin dashboard with CRUD operations
- ✅ Activity logging
- ✅ Image gallery with lightbox
- ✅ Contact form with validation
- ✅ WhatsApp integration
- ✅ SEO optimized

## 🧪 Tech Stack

| Component | Technology |
|----------|------------|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS 3.4 |
| Database | Prisma ORM + SQLite |
| Forms | React Hook Form + Zod |
| Icons | Lucide React + Custom SVG |
| Deployment | Vercel |

## 📄 License

Private - All rights reserved

---

Built with ❤️ for Voyage Elegance
