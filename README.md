# Techpost | Multi-Author Tech Blog

![Project Screenshot](/public/images/techpost-banner.webp)

A full-stack multi-author tech blog project built with Next.js 14 (app router). This project allows multiple authors to publish tech-related blog posts, manage their profiles, and engage with the community.

## Live Demo

[Explore the Live Demo](https://techpost.vercel.app)

## Tech Stack

- Next.js (app router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- Prisma
- PostgreSQL
- Cloudinary
- NextAuth
- Tiptap
- React Hook Form
- Zod

## Key Features

### For Users

- User Registration: Users can register with email account (no email verification required, for demonstration purpose only).
- Blog Post Management: Authors can create blog posts using rich text editor and perform editing and deletion actions.
- Media Upload: Authors can upload images to enhance their blog posts.
- User Profiles: Users can create and manage their bios.
- Interaction: Users can like blog posts, leave comments, and like comments and replies.
- Social Media Sharing: Users can easily share blog articles on popular social media platforms.
- Unique View Counts: Each blog post keeps track of its unique view counts.
- Search Functionality: Users can search for blog posts by title.
- Sorting Options: Users can view posts by recent or popularity and switch between list and grid views.
- Custom Pagination: Custom pagination allows easy navigation through posts.
- Dynamic Image Placeholders: Placeholder images are used for a better user experience while images load.
- Dynamic Meta Tags: SEO-friendly meta tags for improved search engine visibility.
- Sitemap: A dynamically generated sitemap for search engine indexing.
- OpenGraph Images: Dynamic OpenGraph images for enhanced social sharing.

### For Admin

- Admin Dashboard: The admin dashboard provides charts and information about the site.
- Category Management: Admin can create new categories for users to post under.
- Editor's Choice: Admin can feature selected posts at the top of the website.
- User and Post Management: Admin can search, view and delete users and posts as needed.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- PostgreSQL database configured.
- Cloudinary account set up.
- Other dependencies installed (specified in package.json).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ashfakniloy/techpost.git
   cd techpost
   ```

2. Install dependencies using npm:

   ```bash
   npm install
   ```

### Configuration

1.  Create a `.env` file in the project root and set the required environment variables from .env.example:

    ```bash
    DATABASE_URL=
    NEXT_PUBLIC_BASE_URL=
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
    NEXT_PUBLIC_CLOUDINARY_PRESET_NAME=
    NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    CLOUDINARY_CLOUD_NAME=
    NEXTAUTH_SECRET=
    ```

### Setting Up the Database

1.  To initialize your database schema, run the following command:

    `npx prisma db push`

    This command will create the necessary tables and schema in your PostgreSQL database based on your Prisma schema definition.

2.  After successfully pushing the database schema, you can apply any pending migrations (if applicable) using:

    `npx prisma migrate dev`

    This command will apply any pending migrations to the database.

### Running the Development Server

1.  Start the development server:

    `npm run dev`

2.  Open your web browser and navigate to [http://localhost:3000](http://localhost:3000/) to access the project locally.

### Building for Production

1.  To build the project for production, use the following command:

    `npm run build`

2.  Start the production server:

    `npm start`

Now, your project is up and running locally with the database set up and ready for use.

## Author

### Ashfak Ahmed Niloy

- Email: ashfakniloy@gmail.com
- Portfolio: https://niloy.vercel.app
- GitHub: https://github.com/ashfakniloy
