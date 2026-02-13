<p align="center">
  <img src="/src/assets/logo.png" alt="Recruityze Logo" width="200" height="200">
</p>

<h1 align="center">Recruityze - AI Resume Builder & Interview Coach</h1>

<p align="center">
  <strong>Your AI-Powered Career Preparation Platform</strong>
</p>

<p align="center">
  Build professional resumes and ace your interviews with AI assistance
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#subscription-plans">Subscription Plans</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#project-structure">Project Structure</a>
</p>

---

## Overview

**Recruityze** is a comprehensive career preparation platform that combines AI-powered resume building with realistic interview practice. Whether you're a fresh graduate or an experienced professional, Recruityze helps you stand out in the job market with professionally crafted resumes and mock interview simulations that prepare you for the real thing.

### Why Recruityze?

- 🎯 **AI-Powered Content**: Generate tailored resume content with Gemini 2.0
- 🎙️ **Real Voice Interviews**: Practice with AI in realistic voice-based mock interviews
- 📝 **Smart Resume Builder**: Create ATS-friendly resumes in minutes
- 💼 **Interview Preparation**: Custom questions based on your industry and role
- 🚀 **Career Ready**: Get instant feedback and improve your interview skills
- 💳 **Flexible Plans**: Free tier with premium features for serious job seekers

---

## Features

### 🤖 AI Resume Builder

- **Intelligent Content Generation**: AI-powered suggestions for each resume section
- **ATS-Optimized Templates**: Professional templates that pass Applicant Tracking Systems
- **Real-time Preview**: See your resume update as you edit
- **Multiple Export Formats**: Download as PDF, DOCX, or share via link
- **Custom Sections**: Add custom sections for certifications, projects, awards
- **Smart Formatting**: Automatic formatting and layout optimization
- **Resume Analytics**: Track which sections need improvement

### 🎙️ AI Mock Interviews

- **Voice-Based Practice**: Real-time voice conversation with AI interviewer
- **Dynamic Question Generation**: Custom questions based on your role and experience
- **Industry-Specific Scenarios**: Tailored questions for different industries
- **Real-time Feedback**: Instant analysis of your answers
- **Interview Recording**: Review your performance and track progress
- **Behavioral & Technical Questions**: Comprehensive interview preparation
- **Performance Metrics**: Score your communication, confidence, and content

### 💼 Career Tools

- **Resume Scanner**: Check your resume against job descriptions
- **Keyword Optimization**: Ensure your resume matches job requirements
- **Cover Letter Generator**: AI-assisted cover letter writing
- **LinkedIn Profile Optimizer**: Sync and optimize your LinkedIn presence
- **Interview Question Bank**: Access 1000+ common interview questions
- **Progress Tracking**: Monitor your preparation journey

### 👤 User Management

- **Secure Authentication**: Email, Google, and social login via Clerk
- **Profile Management**: Manage multiple resumes and interview sessions
- **Document Storage**: Save and organize all your career documents
- **Usage Analytics**: Track your platform usage and progress

---

## Subscription Plans

### 🆓 Free Tier

**Perfect for getting started**

- ✅ 1 AI-generated resume
- ✅ 3 mock interview sessions per month
- ✅ Basic resume templates (5 templates)
- ✅ PDF export
- ✅ Standard AI content suggestions
- ❌ No voice interviews
- ❌ Limited question bank access
- ❌ No performance analytics

### ⭐ Premium Tier - $9.99/month

**For serious job seekers**

- ✅ **Unlimited** AI-generated resumes
- ✅ **Unlimited** mock interview sessions
- ✅ **Voice-based** AI interviews
- ✅ Premium resume templates (20+ templates)
- ✅ All export formats (PDF, DOCX, TXT)
- ✅ Advanced AI content generation
- ✅ Interview performance analytics
- ✅ Custom branding (add logo, colors)
- ✅ Priority support
- ✅ Resume version history
- ✅ Cover letter generator
- ✅ ATS optimization score
- ✅ Full question bank access (1000+ questions)
- ✅ Interview recording & playback

### 🏢 Enterprise (Coming Soon)

**For teams and organizations**

- Everything in Premium
- Team management dashboard
- Bulk resume creation
- Custom interview scenarios
- API access
- Dedicated account manager
- Custom integrations

---

## Tech Stack

### Frontend

- **Framework**: [Next.js 15](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe development
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - Beautiful, accessible components
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) - Lightweight state management
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) - Type-safe forms

### Backend & Services

- **Database**: [Prisma](https://www.prisma.io/) ORM - Type-safe database access
- **Authentication**: [Clerk](https://clerk.dev/) - Complete user management
- **Payments**: [Stripe](https://stripe.com/) - Subscription management
- **AI Engine**: [Google Gemini 2.0](https://deepmind.google/technologies/gemini/) - Content generation
- **Voice AI**: Custom integration for voice interviews
- **File Storage**: Cloud storage for resumes and recordings

### Development Tools

- **Package Manager**: npm / yarn / pnpm
- **Code Quality**: ESLint + Prettier
- **Version Control**: Git

---

## Getting Started

### Prerequisites

Ensure you have the following installed and set up:

- **Node.js** 18+ - [Download](https://nodejs.org/)
- **npm**, **yarn**, or **pnpm** - Package manager
- **Git** - Version control
- **Clerk Account** - [Sign up](https://clerk.dev/)
- **Stripe Account** - [Sign up](https://stripe.com/)
- **Google AI Studio** - [Get API Key](https://makersuite.google.com/app/apikey)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Abdulelah-Abacar/Recruityze.git
cd Recruityze
```

2. **Install dependencies**

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```bash
# ==============================================
# Database Configuration
# ==============================================
DATABASE_URL="postgresql://user:password@localhost:5432/recruityze_db"

# ==============================================
# Authentication (Clerk)
# ==============================================
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# ==============================================
# AI Configuration (Google Gemini)
# ==============================================
GEMINI_API_KEY=your_gemini_api_key_here

# ==============================================
# Payment Processing (Stripe)
# ==============================================
STRIPE_SECRET_KEY=sk_test_your_stripe_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Premium Plan Price IDs
STRIPE_PREMIUM_MONTHLY_PRICE_ID=price_xxxxxxxxxxxxx
STRIPE_PREMIUM_YEARLY_PRICE_ID=price_xxxxxxxxxxxxx

# ==============================================
# Application Configuration
# ==============================================
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ==============================================
# Voice Interview (Optional)
# ==============================================
VOICE_AI_API_KEY=your_voice_ai_key
VOICE_AI_ENDPOINT=your_voice_endpoint
```

4. **Set up the database**

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed sample data
npx prisma db seed
```

5. **Start the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

---

## Configuration Guide

### Setting Up Clerk Authentication

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Enable email and social providers (Google, GitHub, etc.)
4. Copy your API keys to `.env`
5. Configure redirect URLs:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in: `/dashboard`

### Setting Up Stripe Payments

1. Visit [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your API keys (test mode for development)
3. Create subscription products:
   - **Premium Monthly**: $9.99/month
   - **Premium Yearly**: $99/year (save 17%)
4. Set up webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
5. Copy webhook secret to `.env`

### Setting Up Google Gemini AI

1. Go to [Google AI Studio](https://makersuite.google.com/)
2. Create a new API key
3. Copy the key to `GEMINI_API_KEY` in `.env`
4. Configure usage limits and quotas
5. Review [Gemini API documentation](https://ai.google.dev/docs)

---

## Project Structure

```plaintext
Recruityze/
│
├── prisma/                          # Database schema and migrations
│   ├── schema.prisma               # Prisma models
│   ├── migrations/                 # Database migrations
│   └── seed.ts                     # Seed data
│
├── public/                          # Static assets
│   ├── templates/                  # Resume templates
│   └── icons/                      # Icon assets
│
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (auth)/                # Authentication pages
│   │   │   ├── sign-in/           # Sign in page
│   │   │   └── sign-up/           # Sign up page
│   │   │
│   │   ├── (dashboard)/           # Protected dashboard routes
│   │   │   ├── dashboard/         # Main dashboard
│   │   │   ├── resumes/           # Resume management
│   │   │   ├── interviews/        # Interview practice
│   │   │   ├── settings/          # User settings
│   │   │   └── billing/           # Subscription management
│   │   │
│   │   ├── api/                   # API routes
│   │   │   ├── ai/                # AI generation endpoints
│   │   │   ├── resumes/           # Resume CRUD operations
│   │   │   ├── interviews/        # Interview management
│   │   │   ├── webhooks/          # Stripe webhooks
│   │   │   └── voice/             # Voice interview API
│   │   │
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Landing page
│   │
│   ├── assets/                     # Project assets
│   │   ├── images/                # Image files
│   │   └── fonts/                 # Custom fonts
│   │
│   ├── components/                 # React components
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── resume/                # Resume-related components
│   │   │   ├── ResumeEditor.tsx   # Resume editor
│   │   │   ├── ResumePreview.tsx  # Live preview
│   │   │   ├── TemplateSelector.tsx
│   │   │   └── SectionEditor.tsx
│   │   │
│   │   ├── interview/             # Interview components
│   │   │   ├── MockInterview.tsx  # Interview interface
│   │   │   ├── VoiceRecorder.tsx  # Voice recording
│   │   │   ├── QuestionDisplay.tsx
│   │   │   └── FeedbackPanel.tsx
│   │   │
│   │   ├── subscription/          # Subscription components
│   │   │   ├── PricingCards.tsx   # Pricing display
│   │   │   ├── UpgradeModal.tsx   # Upgrade prompt
│   │   │   └── UsageTracker.tsx   # Usage limits
│   │   │
│   │   ├── shared/                # Shared components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── LoadingStates.tsx
│   │   │
│   │   └── forms/                 # Form components
│   │       ├── ContactInfoForm.tsx
│   │       ├── ExperienceForm.tsx
│   │       └── EducationForm.tsx
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useResume.ts           # Resume state management
│   │   ├── useSubscription.ts     # Subscription status
│   │   ├── useInterview.ts        # Interview session
│   │   ├── useVoiceRecorder.ts    # Voice recording
│   │   └── useAI.ts               # AI generation
│   │
│   ├── lib/                        # Utility libraries
│   │   ├── db.ts                  # Prisma client
│   │   ├── stripe.ts              # Stripe utilities
│   │   ├── clerk.ts               # Clerk helpers
│   │   ├── ai/                    # AI utilities
│   │   │   ├── gemini.ts          # Gemini integration
│   │   │   ├── prompts.ts         # AI prompts
│   │   │   └── voice.ts           # Voice AI
│   │   │
│   │   ├── utils.ts               # General utilities
│   │   ├── validators.ts          # Validation functions
│   │   └── constants.ts           # App constants
│   │
│   ├── stores/                     # Zustand stores
│   │   ├── resumeStore.ts         # Resume state
│   │   ├── interviewStore.ts      # Interview state
│   │   └── userStore.ts           # User preferences
│   │
│   ├── types/                      # TypeScript types
│   │   ├── resume.ts              # Resume types
│   │   ├── interview.ts           # Interview types
│   │   ├── subscription.ts        # Subscription types
│   │   └── index.ts               # Exports
│   │
│   └── middleware.ts               # Next.js middleware
│
├── .env.example                     # Environment template
├── .eslintrc.json                  # ESLint config
├── .gitignore                      # Git ignore
├── components.json                 # shadcn/ui config
├── next.config.mjs                 # Next.js config
├── package.json                    # Dependencies
├── postcss.config.js               # PostCSS config
├── tailwind.config.ts              # Tailwind config
├── tsconfig.json                   # TypeScript config
└── README.md                       # Documentation
```

---

## Key Features Explained

### 🎯 AI Resume Generation

The platform uses Google's Gemini 2.0 to:

- Analyze your work experience and generate compelling bullet points
- Optimize keywords for ATS (Applicant Tracking Systems)
- Suggest improvements to existing content
- Generate role-specific summaries
- Create tailored content for different job applications

**Example Usage:**

```typescript
// Generate work experience bullets
const bullets = await generateBullets({
  role: "Software Engineer",
  company: "Tech Corp",
  description: "Built web applications",
});
```

### 🎙️ Voice Mock Interviews

Practice interviews with AI in a realistic voice conversation:

- **Behavioral Questions**: "Tell me about a time when..."
- **Technical Questions**: Role-specific technical challenges
- **Situational Questions**: Problem-solving scenarios
- **Follow-up Questions**: Dynamic conversation flow

**Interview Flow:**

1. Select interview type (behavioral, technical, mixed)
2. Choose industry and seniority level
3. Start voice conversation with AI
4. Receive real-time feedback
5. Review recording and transcript
6. Get performance score and improvement tips

### 📊 Performance Analytics

Track your preparation progress:

- **Interview Scores**: Communication, content, confidence
- **Common Weaknesses**: Identify patterns in your answers
- **Improvement Trends**: See progress over time
- **Question Types**: Which questions you struggle with
- **Time Management**: Average answer length

### 💳 Subscription Management

Seamless subscription experience:

- **Instant Upgrades**: Immediate access to premium features
- **Usage Tracking**: Real-time usage indicators
- **Flexible Cancellation**: Cancel anytime, keep access until period ends
- **Upgrade Prompts**: Smart prompts when hitting free tier limits
- **Billing Portal**: Manage subscription through Stripe portal

---

## Usage Limits

| Feature               | Free Tier | Premium Tier        |
| --------------------- | --------- | ------------------- |
| Resume Creation       | 1 resume  | Unlimited           |
| Mock Interviews       | 3/month   | Unlimited           |
| Voice Interviews      | ❌        | ✅                  |
| Resume Templates      | 5 basic   | 20+ premium         |
| AI Content Generation | Basic     | Advanced            |
| Export Formats        | PDF only  | PDF, DOCX, TXT      |
| Interview Analytics   | ❌        | ✅                  |
| Question Bank         | Limited   | Full access (1000+) |
| Cover Letters         | ❌        | ✅                  |
| Resume History        | ❌        | ✅                  |

---

## API Endpoints

### Resume Management

```typescript
// Create a new resume
POST /api/resumes
Body: { title, template, content }

// Get all resumes
GET /api/resumes

// Update resume
PATCH /api/resumes/:id
Body: { content }

// Delete resume
DELETE /api/resumes/:id

// Generate AI content
POST /api/ai/generate
Body: { section, context }
```

### Interview Sessions

```typescript
// Start interview session
POST /api/interviews/start
Body: { type, industry, level }

// Submit answer
POST /api/interviews/:id/answer
Body: { answer, audio? }

// Get feedback
GET /api/interviews/:id/feedback

// End session
POST /api/interviews/:id/end
```

### Subscription

```typescript
// Create checkout session
POST / api / subscription / checkout;
Body: {
  priceId;
}

// Cancel subscription
POST / api / subscription / cancel;

// Get subscription status
GET / api / subscription / status;
```

---

## Scripts

| Command                  | Description              |
| ------------------------ | ------------------------ |
| `npm run dev`            | Start development server |
| `npm run build`          | Build for production     |
| `npm run start`          | Start production server  |
| `npm run lint`           | Run ESLint               |
| `npm run type-check`     | Check TypeScript types   |
| `npx prisma studio`      | Open Prisma database GUI |
| `npx prisma migrate dev` | Create new migration     |
| `npx prisma db push`     | Push schema to database  |
| `npx prisma generate`    | Generate Prisma client   |

---

## Development Workflow

### Adding a New Resume Template

1. Create template in `/public/templates/`
2. Add template metadata to `src/lib/constants.ts`
3. Update template selector component
4. Test with sample data

### Adding a New Interview Question Type

1. Define question type in `src/types/interview.ts`
2. Add prompts in `src/lib/ai/prompts.ts`
3. Update interview logic in `src/hooks/useInterview.ts`
4. Add UI components if needed

### Testing Webhooks Locally

```bash
# Install Stripe CLI
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Test webhook
stripe trigger payment_intent.succeeded
```

---

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com/)
3. Add environment variables
4. Deploy

### Environment Variables for Production

Ensure these are set in your hosting platform:

- ✅ All Clerk keys
- ✅ Stripe production keys
- ✅ Database URL (production)
- ✅ Gemini API key
- ✅ Voice AI credentials
- ✅ App URL (production domain)

### Database Migration

```bash
# Run migrations in production
npx prisma migrate deploy
```

---

## Troubleshooting

### Common Issues

**Issue**: Clerk authentication not working

- ✅ Check API keys are correct
- ✅ Verify redirect URLs in Clerk dashboard
- ✅ Clear browser cookies and try again

**Issue**: Stripe webhook failing

- ✅ Verify webhook secret matches
- ✅ Check endpoint is publicly accessible
- ✅ Review Stripe dashboard logs

**Issue**: AI generation slow or failing

- ✅ Check Gemini API quota
- ✅ Verify API key is valid
- ✅ Review rate limiting settings

**Issue**: Voice interview not recording

- ✅ Check browser microphone permissions
- ✅ Use HTTPS in production
- ✅ Test different browsers

---

## Roadmap

### Coming Soon

- 🎯 **Q2 2025**
  - LinkedIn integration
  - Resume comparison tool
  - Interview coaching tips
  - Mobile app (iOS/Android)

- 🚀 **Q3 2025**
  - Team collaboration features
  - Custom interview scenarios
  - Video mock interviews
  - Resume portfolio builder

- 💡 **Q4 2025**
  - Enterprise tier launch
  - API for third-party integrations
  - Advanced analytics dashboard
  - Multi-language support

---

## Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Follow existing code style

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Support & Community

Need help or want to connect with other users?

- 📧 **Email**: support@recruityze.com
- 💬 **Discord**: [Join our community](https://discord.gg/recruityze)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/Abdulelah-Abacar/Recruityze/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/Abdulelah-Abacar/Recruityze/discussions)
- 📚 **Documentation**: [docs.recruityze.com](https://docs.recruityze.com)
- 🐦 **Twitter**: [@recruityze](https://twitter.com/recruityze)

---

## Acknowledgments

- Built with [Next.js](https://nextjs.org/) by Vercel
- AI powered by [Google Gemini](https://deepmind.google/technologies/gemini/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Authentication by [Clerk](https://clerk.dev/)
- Payments by [Stripe](https://stripe.com/)

<p align="center">
  <strong>Built with ❤️ for job seekers everywhere</strong>
</p>

<p align="center">
  <a href="https://ecruityze.vercel.app">Visit Website</a> •
  <a href="https://docs.ecruityze.vercel.app">Documentation</a> •
  <a href="https://github.com/Abdulelah-Abacar/Recruityze">GitHub</a>
</p>
