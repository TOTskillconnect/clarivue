
# 🛠️ Clarivue Frontend – Tech Requirements & Architecture

This document describes the **technical requirements and architecture** for the **Clarivue frontend MVP**, built to support a real-time AI interview assistant.

---

## 📦 Tech Stack Overview

| Layer       | Tool / Framework       | Purpose |
|-------------|------------------------|---------|
| Frontend    | **React + Tailwind CSS** | Component-based UI + utility styling |
| UI Framework| **ShadCN + Headless UI** | Modern components for modals,dropdowns |
| Styling     | **Tailwind + Custom Theme** | Using Clarivue’s brand palette |
| State Mgmt  | **Zustand / Context API** | Light state management across sessions |
| Realtime    | **Socket.IO / WebSockets** | For live transcript and follow-up question stream |
| API Access  | **Axios / Fetch**         | REST hooks to backend services |
| Environment | **Vite** or **Next.js**   | Fast bundling & SSR (if needed) |
| Auth        | **Clerk / Auth0 / Firebase Auth** | Secure login + user sessions |
| Storage     | **Supabase / Firebase**   | Storing transcripts, settings, bookmarks |
| Deployment  | **Vercel / Netlify**      | CI/CD for instant deployments |

---

## 🎨 Clarivue Frontend Structure

/src
/components → Shared UI blocks (Button, Sidebar, Header, Tooltip)
/layouts → Page wrappers (InterviewPage, Dashboard)
/pages → Route-level components (Login, Home, Interview)
/hooks → Custom hooks (useTranscript, useSuggestions)
/services → API wrappers (getTranscript, getSuggestions)
/lib → Utility functions (formatting, timers)
/config → Theme, color, constants
/context → App-level state (auth, user info, current session)

yaml
Copy
Edit

---

## 🧠 Core UI Features for MVP

### 1. 🔗 **Login / Onboarding**
- OAuth support (Google, Microsoft)
- Optional: connect calendar
- Optional: toggle "auto-join interviews"

### 2. 📺 **Live Interview Dashboard**
- Sidebar layout:
  - 🧠 Real-time **transcript feed** (streamed from backend)
  - 💬 Suggested **follow-up questions**
  - 📌 Bookmark moment button
  - 🎯 Speaker identification tags (candidate vs interviewer)
- Optional:
  - Show tone/emotion signals per answer
  - Mute/Resume bot interaction toggle

### 3. 📊 **Post-Interview Summary View**
- Transcript viewer
- Scorecard panel (communication, skills, fit, red flags)
- Candidate summary paragraph
- Share / Download / Copy-to-clipboard options

---

## 🧩 Component Highlights

| Component         | Props / Features |
|------------------|------------------|
| `TranscriptFeed` | Real-time stream, speaker-labeled |
| `FollowUpTray`   | Suggestions, auto-refresh every 5s |
| `BookmarkButton` | Saves timestamp to backend |
| `ScorecardView`  | Auto-filled categories, editable in v2 |
| `LiveToneIndicator` | Displays tone labels based on NLP signal |

---

## 🎨 Theme Configuration

Color values used in Tailwind config:
```js
colors: {
  primary: '#ccc3f6',
  accent: '#cec2f7',
  secondary: '#caa1e8',
  tertiary: '#acbaff',
  background: '#ffffff',
  surface: '#f9f9ff',
  border: '#e2e6f3',
  text: {
    primary: '#1e1e2f',
    secondary: '#5c5f73',
  },
  status: {
    success: '#4ade80',
    warning: '#fbbf24',
    danger:  '#f87171',
    info:    '#60a5fa',
  }
}