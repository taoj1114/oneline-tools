# OneLine Tools

OneLine Tools is a modern, high-performance, edge-deployed online toolkit featuring 16+ essential developer, text, security, and utility tools.

## Features

- **Edge-Powered**: Built on Cloudflare Workers and Pages, ensuring ultra-fast load times globally.
- **Modern UI**: Crafted with React 18, TypeScript, and Tailwind CSS v4.
- **User Experience**: Supports Dark/Light mode, multi-language (EN/ZH), favorites, and recently used tools.
- **Privacy-First**: Most tools run entirely in the browser (client-side) for maximum data privacy.

### Tool Categories
- **Developer**: JSON Formatter, SQL Formatter, URL Encoder, Base64 Encoder, UUID Generator, Regex Builder.
- **Text**: Word Counter, Case Converter, Lorem Ipsum, Markdown Preview.
- **Security**: Hash Generator (Web Crypto), Password Generator.
- **Visual**: Palette Generator, Glassmorphism Generator.
- **Utility**: QR Code Generator, Unit Converter.

## Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Deployment**: Cloudflare Workers (Static Assets)
- **Icons**: Lucide React
- **Internationalization**: React Context API

## Getting Started

### Local Development

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Deployment

To deploy to Cloudflare Workers:

```bash
npm run build
npx wrangler deploy
```

## License

This project is open-source.
