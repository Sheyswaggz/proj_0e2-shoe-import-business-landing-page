# Shoe Import Business Landing Page

A professional, modern landing page for a shoe importation business. This landing page showcases
services, establishes credibility, and provides essential contact information to potential
wholesale buyers and business partners in the footwear industry.

## Overview

This project serves as the primary online presence for a shoe import business, designed to attract
B2B clients and partners. The landing page highlights key services, product offerings, and company
credentials to build trust and facilitate business connections.

## Technology Stack

- **Build Tool:** Vite 5.x - Fast, modern build tool with Hot Module Replacement (HMR)
- **CSS Framework:** Tailwind CSS 3.x - Utility-first CSS framework for rapid UI development
- **JavaScript:** Vanilla ES6+ - No framework dependencies, clean and performant
- **CSS Processing:** PostCSS with Autoprefixer - Ensures cross-browser compatibility
- **Code Quality:**
  - ESLint - JavaScript linting with best practices
  - Prettier - Consistent code formatting

## Prerequisites

- **Node.js:** Version 18.x or higher
- **npm:** Version 9.x or higher (comes with Node.js)

## Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

This will install all required dependencies including Vite, Tailwind CSS, PostCSS, ESLint, and
Prettier.

### 2. Start Development Server

```bash
npm run dev
```

The development server will start on `http://localhost:3000` and automatically open in your default
browser. The page supports Hot Module Replacement (HMR), so changes to your code will be reflected
instantly without refreshing.

### 3. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory with:

- Minified HTML, CSS, and JavaScript
- Optimized assets with cache-busting hashes
- Compressed file sizes for faster loading
- Tree-shaken code to remove unused modules

### 4. Preview Production Build

```bash
npm run preview
```

Serves the production build locally on `http://localhost:4173` to test the optimized version before
deployment.

### 5. Lint Code

```bash
npm run lint
```

Runs ESLint to check for code quality issues and potential bugs.

## Project Structure

```
shoe-import-business-landing-page/
├── src/
│   ├── style.css              # Main stylesheet with Tailwind directives
│   ├── main.js                # Main JavaScript entry point
│   └── components/            # Modular JavaScript components
│       ├── navigation.js      # Navigation functionality
│       ├── about.js           # About section logic
│       ├── services.js        # Services showcase
│       ├── testimonials.js    # Customer testimonials
│       └── contact.js         # Contact form handling
├── index.html                 # Main HTML entry point
├── package.json               # Node.js dependencies and scripts
├── vite.config.js             # Vite build configuration
├── tailwind.config.js         # Tailwind CSS customization
├── postcss.config.js          # PostCSS configuration
├── .eslintrc.cjs              # ESLint configuration
├── .prettierrc                # Prettier configuration
├── .gitignore                 # Git ignore patterns
└── README.md                  # Project documentation
```

## Configuration Files

### Vite Configuration (`vite.config.js`)

- Optimized build output with terser minification
- CSS code splitting for better caching
- Asset optimization and hashing
- Development server with HMR on port 3000

### Tailwind Configuration (`tailwind.config.js`)

- Custom color palette for B2B branding
  - Primary: Professional blue tones
  - Secondary: Neutral grays for text and backgrounds
  - Accent: Strategic red for CTAs
- Typography scale optimized for readability
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Extended spacing and border radius utilities

### ESLint Configuration (`.eslintrc.cjs`)

- ES2022 syntax support
- Browser and Node.js environment
- Recommended best practices
- Accessibility rules included

### Prettier Configuration (`.prettierrc`)

- Consistent code formatting
- Semi-colons enabled
- Single quotes for strings
- 100 character print width
- File-specific overrides for HTML, CSS, and Markdown

## Deployment

### Build Optimization

The production build is optimized for:

- **Performance:** Minified code, tree-shaking, and code splitting
- **SEO:** Semantic HTML structure and meta tags
- **Accessibility:** WCAG 2.1 Level AA compliance
- **Browser Support:** Modern browsers (Chrome, Firefox, Safari, Edge)

### Deployment Platforms

This static site can be deployed to:

- **Netlify:** Drag-and-drop or Git integration
- **Vercel:** Zero-config deployment from Git
- **GitHub Pages:** Free hosting for open-source projects
- **AWS S3 + CloudFront:** Enterprise-grade hosting
- **Any static hosting service:** Just upload the `dist/` folder

### Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_API_ENDPOINT=https://api.example.com
VITE_CONTACT_EMAIL=contact@example.com
```

Access in JavaScript:

```javascript
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
```

## Business Context

### Target Audience

- Wholesale shoe buyers
- Retail business owners
- Footwear distributors
- B2B partners in the fashion industry

### Key Features

- **Service Showcase:** Highlighting import capabilities and product range
- **Credibility Building:** Testimonials, certifications, and business credentials
- **Contact Integration:** Easy-to-use contact forms and direct communication channels
- **Responsive Design:** Optimized for desktop and mobile devices
- **Fast Loading:** Performance-optimized for better user experience and SEO

## Development Guidelines

### Code Style

- Follow ESLint and Prettier configurations
- Use semantic HTML5 elements
- Write accessible markup (ARIA labels, alt text, etc.)
- Keep JavaScript modular and reusable
- Use Tailwind utility classes for styling

### Git Workflow

- Create feature branches from `main`
- Write descriptive commit messages
- Keep commits focused and atomic
- Test locally before pushing

### Performance Best Practices

- Optimize images (WebP format, appropriate sizes)
- Lazy load images and components
- Minimize third-party scripts
- Use modern CSS features for animations
- Implement proper caching strategies

## Contribution Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - See LICENSE file for details

## Support

For questions or issues, please open an issue in the repository or contact the development team.

---

**Built with modern web technologies for optimal performance and user experience.**
