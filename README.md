# 💪 FitPro — Personal Training Platform

**Transform your body. Transform your life.**

FitPro is a personal fitness platform designed to connect customers with personal trainers for goal-oriented fitness training at home. Users can explore fitness packages, book demo sessions, and coordinate training schedules with the FitPro team.

🌐 **Live Website:** [https://fit-pro-demo-platform.vercel.app/](https://fit-pro-demo-platform.vercel.app/)

---

## ✨ Features

### 👤 For Customers

- **Demo Packages:** Explore affordable demo sessions before committing to a main training package.
- **Main Packages:** Browse structured fitness programs designed around specific fitness goals.
- **Book a Demo:** Submit a demo booking request with contact details and location information.
- **Trainer Matching:** Support trainer matching based on customer location, requirements, and availability.
- **Flexible Scheduling:** Coordinate suitable demo session timings with the FitPro team.
- **Personalized Training:** Find training options for weight loss, muscle building, yoga, mobility, and general fitness.
- **Secure Authentication:** Register and log in to access authorized platform features.

### 🏋️ For Trainers

- **Become a Trainer:** Apply to join the FitPro platform.
- **Professional Profiles:** Showcase fitness expertise, qualifications, and experience.
- **Client Opportunities:** Connect with potential customers through the FitPro team.
- **Personalized Programs:** Support fitness programs tailored to individual goals.

### 🧑‍💼 For Administrators and the FitPro Team

- **Booking Coordination:** Manage demo booking requests and scheduling.
- **Trainer Coordination:** Help match trainers with customer requirements.
- **Customer Management:** Organize customer information and booking details.
- **Role-Based Access:** Provide authorized features for different user roles.

---

## 📦 Fitness Packages

FitPro separates demo sessions from main training programs, allowing customers to try the service before committing to a longer-term package.

| Package | Details | Price |
|---|---|---:|
| Demo Yoga | 1 session | ₹399 |
| Main Yoga Package | 8 sessions | ₹10,000 |

### Main Yoga Package Includes

- A dedicated personal trainer
- Nutritionist support for diet planning
- A personal dashboard for reports and progress tracking

*Package prices, inclusions, and availability are subject to the current offerings displayed on the website.*

---

## 🔄 How It Works

1. **Explore Packages:** Browse demo and main fitness packages.
2. **Submit a Demo Request:** Provide contact information, address, and fitness requirements.
3. **Coordinate Availability:** The FitPro team contacts the customer to discuss suitable time slots and trainer availability.
4. **Confirm the Session:** Finalize the schedule and any applicable demo payment.
5. **Begin Training:** Attend the demo session and explore a suitable main training program.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) — App Router |
| UI Library | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Authentication | [Auth.js (NextAuth.js v5)](https://authjs.dev/) |
| Password Hashing | [bcryptjs](https://github.com/dcodeIO/bcrypt.js) |
| Database | [MongoDB](https://www.mongodb.com/) |
| ODM | [Mongoose](https://mongoosejs.com/) |
| File Storage | [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) |
| Linting | ESLint 9 |
| Deployment | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or later
- [MongoDB Atlas](https://www.mongodb.com/atlas) or a local MongoDB instance
- A [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) store if required for file uploads
- Git and npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/gulatirahul569/FitPro-Demo-Platform.git

# 2. Navigate into the project
cd FitPro-Demo-Platform

# 3. Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the project root.

```env
# MongoDB connection string
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<database>

# Auth.js secret
AUTH_SECRET=your-random-secret

# Vercel Blob token (only if used)
BLOB_READ_WRITE_TOKEN=your-blob-token
```

Generate an authentication secret using:

```bash
npx auth secret
```

**Important:** Use the exact environment variable names referenced in your application code. Additional variables may be required for authentication providers, email services, or payment integrations.

Never commit `.env.local`, database credentials, authentication secrets, or storage tokens to GitHub.

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint checks |

*Available scripts depend on the commands defined in `package.json`.*

---

## 📁 Project Structure

```text
FitPro-Demo-Platform/
├── public/                 # Static assets
├── src/
│   ├── app/                # Application routes and pages
│   ├── components/         # Reusable UI components
│   ├── lib/                # Utilities and configuration
│   └── ...                 # Models, services, and supporting code
├── eslint.config.mjs       # ESLint configuration
├── jsconfig.json           # Path aliases
├── next.config.mjs         # Next.js configuration
├── postcss.config.mjs      # Tailwind CSS configuration
├── package.json            # Dependencies and scripts
└── README.md
```

*The exact directory structure may vary depending on the current repository.*

---

## ☁️ Deployment

FitPro is deployed on Vercel.

To deploy your own instance:

1. Push the repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com/new).
3. Configure environment variables under **Project Settings → Environment Variables**.
4. Ensure your MongoDB database accepts connections from the application environment.
5. Deploy and verify authentication, packages, and demo booking functionality.

### Live Project

🌐 [https://fit-pro-demo-platform.vercel.app/](https://fit-pro-demo-platform.vercel.app/)

---

## 🗺️ Roadmap

- [ ] Automated trainer availability and location-based matching
- [ ] Improved demo booking and scheduling workflow
- [ ] Integrated payments for demo sessions and main packages
- [ ] Customer progress tracking and fitness reports
- [ ] Nutritionist support and personalized diet plans
- [ ] Trainer and customer management improvements
- [ ] Verified customer reviews and ratings
- [ ] Booking notifications and email automation

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome.

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your feature"
   ```

4. Push your branch:

   ```bash
   git push origin feature/your-feature
   ```

5. Open a Pull Request.

---

## 👨‍💻 Author

**Rahul Gulati**

- GitHub: [@gulatirahul569](https://github.com/gulatirahul569)
- Live Project: [FitPro Demo Platform](https://fit-pro-demo-platform.vercel.app/)

---

*FitPro — Your fitness goals, our commitment.*
