# Cyntia Tomizawa - Portfolio

A modern, elegant portfolio website for **Cyntia Tomizawa**, a jewelry designer originally from Brazil, trained in Florence, Italy, and now based in the United States.

## ✨ Features

- **Responsive Design** - Fully responsive layout with mobile-first approach
- **Smooth Scrolling** - Locomotive Scroll integration for silky-smooth scroll experience
- **Video Background** - Dynamic hero section with video background
- **Collection Showcase** - Interactive jewelry collection gallery with carousel navigation
- **Animated Navigation** - Elegant desktop sidebar and fullscreen mobile menu
- **Contact Section** - Social links, email copy-to-clipboard, and phone contact
- **Toast Notifications** - User feedback with Sonner toast library

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **Language:** TypeScript
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** Locomotive Scroll
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [Sonner](https://sonner.emilkowal.ski/)
- **Theming:** next-themes

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/altomizawa/cyntiatomizawa.git
   cd cyntiatomizawa
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/
│   ├── components/
│   │   ├── LocoScroll.tsx    # Locomotive Scroll wrapper
│   │   ├── Navbar.tsx        # Navigation component
│   │   ├── Popup.tsx         # Collection popup modal
│   │   ├── Sonner.tsx        # Toast notifications
│   │   └── Video.tsx         # Video background component
│   ├── utils/
│   │   └── constants.ts      # Static content/data
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── public/
│   └── assets/               # Images and media files
└── ...config files
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🎨 Sections

1. **Hero** - Full-screen video background with name and title
2. **Work** - Interactive jewelry collection showcase
3. **About** - Biography and professional background
4. **Contact** - Social media links and contact information

## 📄 License

This project is private and proprietary.

## 👤 Contact

**Cyntia Tomizawa**
- Instagram: [@cyntiatominy](https://www.instagram.com/cyntiatominy/)
- LinkedIn: [Cyntia Tomizawa](https://www.linkedin.com/in/cyntia-tomizawa-81b18b262/)
- Email: cyntiatomizawa@gmail.com
- Phone: +1 (347) 593 0008
