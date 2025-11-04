# NAPCORE Store

> Curated tools for European mobility data professionals

A community-driven catalog of open-source tools that support European mobility data standards like DATEX II, NeTEx, SIRI, and mobilityDCAT-AP.

## 🌐 Live Site

Visit the catalog at: **[napcore-tools.eu](#)** _(coming soon)_

## 🎯 Mission

Make it easier for developers, data publishers, and mobility professionals to find and use the right tools for working with European mobility data standards.

## 📚 What's Inside

- **9 Tool Categories**: Validators, Converters, SDKs, and more
- **Standards Coverage**: DATEX II, NeTEx, SIRI, mobilityDCAT-AP, DCAT-AP
- **Quality Curated**: Only functional, documented, maintained tools
- **Community-Driven**: Submit tools and improvements via GitHub

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/napcore/napcore-web-store.git
cd napcore-web-store

# Install dependencies
npm install

# Start development server
npm run docs:dev
```

Visit `http://localhost:5173` to see the site locally.

### Build for Production

```bash
npm run docs:build
npm run docs:preview
```

## 📂 Project Structure

```
napcore-web-store/
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts          # VitePress configuration
│   │   └── theme/
│   │       ├── index.ts       # Custom theme
│   │       └── custom.css     # NAPCORE branding
│   ├── index.md               # Homepage
│   ├── tools/                 # Tool documentation
│   │   ├── index.md
│   │   ├── datex-browser.md
│   │   ├── datex-schema-tool.md
│   │   └── mobilitydcat-generator.md
│   ├── categories/            # Category pages
│   │   ├── index.md
│   │   ├── validators.md
│   │   ├── converters.md
│   │   └── ... (more categories)
│   ├── contribute.md          # Contribution guide
│   └── about.md               # About page
├── package.json
└── README.md
```

## 🤝 Contributing

We welcome contributions! Here's how:

### Submit a Tool

1. Check our [criteria](./docs/contribute.md#tool-criteria)
2. Gather [required information](./docs/contribute.md#required-information)
3. [Start a discussion](https://github.com/napcore/napcore-web-store/discussions) with "Tool Submission" category
4. Community review and approval
5. Tool added to catalog!

### Improve Documentation

1. Click "Suggest changes to this page" on any page
2. Make your edits
3. Submit a pull request

### Report Issues

- [Open an issue](https://github.com/napcore/napcore-web-store/issues)
- [Start a discussion](https://github.com/napcore/napcore-web-store/discussions)

See [CONTRIBUTING.md](./docs/contribute.md) for detailed guidelines.

## 🛠 Technology Stack

- **[VitePress](https://vitepress.dev/)**: Modern static site generator
- **[Vue 3](https://vuejs.org/)**: Progressive JavaScript framework
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe JavaScript
- **Custom CSS**: NAPCORE branding and styling

## 📊 Current Stats

- **Tools**: 3
- **Categories**: 9
- **Standards**: 5+
- **Open Source**: 100%

## 🎨 Design

The catalog features:

- NAPCORE brand colors and official logo
- Responsive, mobile-first design
- Accessible (WCAG AA compliant)
- Fast loading and SEO optimized
- Dark mode support

## 📖 Documentation

- [About the Catalog](./docs/about.md)
- [How to Contribute](./docs/contribute.md)
- [Tool Categories](./docs/categories/index.md)
- [All Tools](./docs/tools/index.md)

## 🌍 About NAPCORE

**NAPCORE** (National Access Point Coordination Organisation for Europe) improves interoperability of National Access Points as the backbone of European mobility data exchange.

- **36 participants**: 33 Beneficiaries covering 26 EU Member States
- **37 Implementing Bodies**
- **Mission**: Harmonize mobility data standards across Europe

Learn more at [napcore.eu](https://napcore.eu)

## 📄 License

- **Catalog Content**: CC BY 4.0
- **Code**: MIT License
- **Individual Tools**: See respective tool licenses

## 🙏 Acknowledgments

This catalog is made possible by:

- NAPCORE partners and participating member states
- Tool developers who create and maintain these resources
- Community contributors
- European Commission through the Connecting Europe Facility

## 📬 Contact

- **GitHub**: [napcore/napcore-web-store](https://github.com/napcore/napcore-web-store)
- **Discussions**: [GitHub Discussions](https://github.com/napcore/napcore-web-store/discussions)
- **Website**: [napcore.eu](https://napcore.eu)

---

<div align="center">
  <p><strong>NAPCORE</strong> - National Access Point Coordination Organisation for Europe</p>
  <p>Co-financed by the Connecting Europe Facility of the European Union</p>
</div>
