# 🚀 Mobile Store Management

> Mobile Store inventory management on Netlify

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs&logoColor=white)](#) [![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)](#) [![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?logo=sqlite&logoColor=black)](#) [![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white)](#) [![EJS](https://img.shields.io/badge/EJS-Templates-B4CA65?logo=javascript&logoColor=black)](#) [![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?logo=netlify&logoColor=white)](#) [![GitHub stars](https://img.shields.io/github/stars/arnavarya001/Mobile_Shop?style=flat&color=yellow)](https://github.com/arnavarya001/Mobile_Shop/stargazers) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

🔗 **Live Application:** [https://bespoke-kataifi-f49f73.netlify.app/](https://bespoke-kataifi-f49f73.netlify.app/)

---

## 📖 Overview

**Mobile Store Management** is designed to provide a streamlined, high-performance solution for mobile store inventory management on netlify. Grounded in a modern stack (Node.js, Express, Drizzle ORM, TypeScript, EJS, Netlify, CSS), the architecture prioritizes performance, clarity, and rapid deployment.

## ✨ Features

- **Robust Server Architecture:** Powered by Express.js for fast, resilient request routing and middleware integration.
- **Type-Safe Database Access:** Backed by Drizzle ORM for schema-first, fully typed database queries and streamlined migrations.
- **Dynamic Server-Side Rendering:** Clean EJS templates for responsive page rendering and fast first-contentful paint.
- **Cloud Deployment Ready:** Pre-configured for Netlify with serverless functions and instant automated deployments.
- **Type Safety:** Full TypeScript support ensuring strict type checking and predictable code execution.

## 🧰 Tech Stack

| Layer | Technology | Role |
| :--- | :--- | :--- |
| Frontend | EJS / HTML5 / CSS | Server-rendered UI Templates |
| Backend | Node.js & Express.js | Application Server & API Routing |
| Database | Drizzle ORM | Type-safe ORM & Database Layer |
| Hosting & CI/CD | Netlify | Edge Network & Automated Deployments |
| Language | TypeScript | Static Type Safety |

## 🗂️ Project Structure

```text
Mobile_Shop/
├── db/                  # Database schema & ORM migrations
├── netlify/                  # Serverless functions & edge configuration
├── views/                  # EJS view templates & layouts
├── public/                  # Static assets, images, and client scripts
├── app.js               # Main application entry point
├── drizzle.config.ts    # Drizzle ORM schema configuration
├── netlify.toml         # Netlify deployment & build settings
├── package.json         # Dependencies, metadata, and run scripts
├── tsconfig.json        # TypeScript compiler options
└── README.md            # Project documentation
```

## 📦 Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher recommended)
- **npm** (or yarn / pnpm)
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/arnavarya001/Mobile_Shop.git
   cd Mobile_Shop
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```


### Running Locally

To launch the application locally, run:

```bash
npm start
```

Open your browser and navigate to `http://localhost:3000` (or the port indicated in your console output).

### Available Scripts

| Command | Script | Purpose |
| :--- | :--- | :--- |
| `npm run start` | `node --import tsx app.js` | Start production server |

## 🌐 Deployment

This project includes configuration for automated deployment on **Netlify**:
1. Connect your repository in the Netlify Dashboard.
2. Build command: `npm run build`
3. Output directory: configured via `netlify.toml`

## 🤝 Contributing

Contributions are welcomed! Feel free to submit pull requests or open issues to improve features, performance, or documentation.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
