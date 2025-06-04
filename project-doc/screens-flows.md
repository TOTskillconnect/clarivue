Here’s the `.md` version of the **Clarivue MVP Navigation Map** for your frontend documentation:

---

```markdown
# 🧭 Clarivue MVP – Navigation Map

This file outlines all the key screens and components in the frontend application, showing how users move through the app from login to live interview support and post-call analytics.

---

## 🔐 Authentication Flow

### `LoginScreen`
- OAuth login with Google / Microsoft

### `OnboardingScreen`
- First-time setup
- Option to connect calendar
- Configure auto-join preferences

---

## 🏠 Main Dashboard Flow

### `DashboardHome`
- Quick overview of upcoming interviews
- AI assistant status
- Navigation to other modules

### `UpcomingInterviewsList`
- List of synced or scheduled interviews
- “Join with Clarivue” toggle
- Manual scheduling option

### `404 / ErrorScreen`
- Fallback for invalid or broken routes

---

## 🎥 Live Interview Flow

### `InterviewLiveView`
- Primary interface for real-time interview support

#### Inside `InterviewLiveView`:
- `TranscriptFeedPanel`  
  → Displays live speaker-labeled transcript  
- `FollowUpSuggestionTray`  
  → Live AI-generated follow-up questions  
- `BookmarkButton`  
  → Saves moments for later review  
- `ToneSignalChip`  
  → Shows emotional cues like hesitation, confidence

---

## 🧾 Post-Interview Summary

### `SummaryReportView`
- Full interview transcript (speaker-tagged)
- Auto-generated scorecard (skills, communication, etc.)
- Candidate summary paragraph
- Export/share/download options

---

## ⚙️ Settings Flow (Optional for MVP)

### `UserSettings`
- Manage auth, notification, and app settings

### `InterviewDefaultsScreen`
- Define default tone, language, and session behavior

---

## 🗂 Navigation Structure Summary

```

LoginScreen
└── OnboardingScreen
└── DashboardHome
├── UpcomingInterviewsList
│     └── InterviewLiveView
│           ├── TranscriptFeedPanel
│           ├── FollowUpSuggestionTray
│           ├── BookmarkButton
│           └── ToneSignalChip
│                 └── SummaryReportView
└── 404 / ErrorScreen

```

---

## 🧪 Notes

- All screens should be responsive (desktop first, tablet-friendly)
- Global layout wraps Dashboard, Interview, and Report views
- InterviewLiveView is the most critical screen — optimize for clarity and speed
```

