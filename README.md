# AgentPro - B2B SaaS AI Agent Platform

A complete B2B SaaS platform for selling AI agent services with a professional landing page, contact sales functionality, and comprehensive dashboard.

## 🌐 Live Demo

- **Production Site:** [https://same-r3trf3se0jc-latest.netlify.app](https://same-r3trf3se0jc-latest.netlify.app)
- **Dashboard Demo:** [https://same-r3trf3se0jc-latest.netlify.app/dashboard](https://same-r3trf3se0jc-latest.netlify.app/dashboard)

## ✨ Features

### Landing Page
- 🎯 Professional hero section with compelling value proposition
- 🔧 Feature showcase with 6 key capabilities
- 💬 Customer testimonials with 5-star reviews
- 💰 Transparent pricing with Professional ($299/month) and Enterprise tiers
- 📱 Fully responsive design

### Contact Sales System
- 📋 Comprehensive contact form with validation
- ✅ Success state with 24-hour response commitment
- 🎨 Professional UI/UX with proper error handling
- 📊 Lead qualification fields (company size, role, etc.)

### Dashboard Functionality
- 📊 Real-time analytics and metrics dashboard
- 🤖 AI agent management interface
- 💬 Live conversation testing with simulated responses
- 📈 Performance monitoring and customer satisfaction tracking
- 👥 Recent conversations overview

## 🛠️ Tech Stack

- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS + shadcn/ui components
- **Language:** TypeScript
- **Icons:** Lucide React
- **Deployment:** Netlify (Static Export)
- **Package Manager:** Bun

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/polinavishnev/ai-agent-saas-platform.git
cd ai-agent-saas-platform
```

2. Install dependencies:
```bash
bun install
```

3. Run the development server:
```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Build static export
bun run build

# Preview the build locally
bunx serve out
```

## 📁 Project Structure

```
ai-agent-saas/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Dashboard
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── contact-sales-dialog.tsx  # Contact form modal
│   │   └── ui/                   # shadcn/ui components
│   └── lib/
│       └── utils.ts              # Utilities
├── public/                       # Static assets
└── package.json
```

## 🎨 Key Components

### Landing Page Sections
- **Hero:** Value proposition with CTA buttons
- **Features:** 6 key features with icons and descriptions
- **Testimonials:** Customer reviews with ratings
- **Pricing:** Two-tier pricing structure
- **CTA:** Final conversion section

### Contact Sales Dialog
- Form validation and error handling
- Success state with clear next steps
- Professional styling and UX
- Lead qualification questions

### Dashboard
- Analytics overview with key metrics
- AI agent management interface
- Real-time conversation testing
- Recent activity monitoring

## 🔧 Customization

### Branding
- Update colors in `tailwind.config.ts`
- Modify company name and branding in components
- Replace testimonials with real customer data

### Content
- Edit landing page copy in `src/app/page.tsx`
- Update feature descriptions and pricing
- Customize dashboard metrics and data

### Styling
- shadcn/ui components in `src/components/ui/`
- Global styles in `src/app/globals.css`
- Tailwind configuration in `tailwind.config.ts`

## 📈 Performance

- ⚡ Static site generation for optimal loading speeds
- 📱 Responsive design for all device sizes
- 🎨 Modern UI with smooth animations
- ♿ Accessible components with proper ARIA labels

## 🚀 Deployment

The site is configured for static export and can be deployed to:
- Netlify (current deployment)
- Vercel
- GitHub Pages
- Any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🛟 Support

For questions or support, please open an issue on GitHub or contact the development team.

---

Built with ❤️ using [Same](https://same.new) - The AI-powered development platform
