# 🏋️ Complete Fitness Guide

A comprehensive fitness application covering exercises, programs, movement patterns, and training principles for CrossFit, Hyrox, Military training, and more.

## 🌟 Features

### 💪 Exercise Library
- **25+ Comprehensive Exercises** - Detailed instructions, tips, and variations
- **Multiple Categories** - CrossFit, Hyrox, Military, Olympic lifting, Gymnastics
- **Difficulty Progression System** - Step-by-step progressions from beginner to advanced
- **Muscle Group Targeting** - Filter by primary and secondary muscles
- **Equipment-Based Filtering** - Find exercises based on available equipment

### 🏃 Workout Programs
- **Pre-built Programs** - CrossFit WODs (Murph, Fran, Cindy), Hyrox training, Navy SEAL PST prep
- **Custom Workout Builder** - Create personalized workouts with exercise selection
- **Workout Timer & Progress Tracking** - Built-in timer with start/pause/reset functionality
- **Progress Logging** - Track reps, weights, and completion status

### 📊 Analytics & History
- **Workout History** - Complete tracking of past workouts with detailed stats
- **Performance Analytics** - Completion rates, total training hours, workout counts
- **Progress Visualization** - Track improvement over time
- **Export Capabilities** - Print workout cards for offline use

### 🎯 Training Science
- **Movement Patterns** - Six fundamental patterns (Squat, Hinge, Push, Pull, Carry, Rotation)
- **Training Principles** - Progressive overload, periodization, recovery, specificity
- **Form Cues & Common Mistakes** - Educational content for proper technique

### 🔧 User Experience
- **Advanced Search** - Keyboard shortcuts (⌘K, ⌘/, ESC, 1-4) for quick navigation
- **Favorites System** - Save preferred exercises and programs
- **Dark Mode** - Toggle between light and dark themes
- **Mobile Responsive** - Optimized for all device sizes with proper touch targets
- **PWA Support** - Install as standalone app with offline capabilities
- **Professional Icons** - Lucide React icon library for clean, consistent UI

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/farkhanmaul/fitness.git
cd fitness
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm run start
```

## 🏗️ Architecture

### Clean Code Principles
- **DRY** (Don't Repeat Yourself) - Reusable components and utilities
- **KISS** (Keep It Simple, Stupid) - Simple, focused components
- **SOLID** - Well-structured, maintainable code architecture

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── icons/          # Icon system with Lucide React
│   └── ui/             # Base UI components
├── data/               # Exercise, program, and training data
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.ts
│   ├── useTimer.ts
│   └── useKeyboardShortcuts.ts
├── types/              # TypeScript type definitions
├── utils/              # Helper functions and utilities
└── app/                # Next.js app router pages
```

## 🎨 Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React
- **State Management**: React hooks + localStorage
- **Build**: Next.js static export for GitHub Pages
- **PWA**: Service worker with offline caching
- **Deployment**: GitHub Actions → GitHub Pages

## 📱 Features in Detail

### Keyboard Shortcuts
- `⌘K` or `Ctrl+K` - Focus search
- `⌘/` or `Ctrl+/` - Show shortcuts help
- `ESC` - Clear search / go back
- `1-4` - Switch between tabs

### Mobile Optimizations
- 44px minimum touch targets
- Responsive typography scaling
- Touch-friendly interface elements
- Mobile-first CSS approach

### Accessibility
- Keyboard navigation support
- ARIA labels and descriptions
- Color contrast compliance
- Screen reader compatibility

## 🔄 Deployment

The application is automatically deployed to GitHub Pages via GitHub Actions:

**Live Demo**: [https://farkhanmaul.github.io/fitness/](https://farkhanmaul.github.io/fitness/)

### Manual Deployment
```bash
npm run build
npm run export
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **CrossFit** - For workout methodologies and exercise variations
- **Hyrox** - For functional fitness training principles  
- **Military Training** - For discipline and structured approach
- **Lucide** - For beautiful, consistent icons
- **Tailwind CSS** - For rapid UI development
- **Next.js** - For powerful React framework capabilities

---

**Built with ❤️ for the fitness community**

*🤖 Enhanced with Claude Code - AI-powered development assistant*