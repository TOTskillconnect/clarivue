# 🧭 Clarivue MVP – User Journey

This document outlines the core user journey for the **Clarivue MVP**: an AI-powered co-pilot that joins interviews, takes notes, suggests live follow-up questions, and produces insightful post-call reports.

GOAL
OVERALL GOAL 
user paste jd > backend takes jd and run through openai> openai generates context fit first scorecard(differentiator) > gets displayed to customer front end > customer edits or saves>> we use the scorecard to generate follow-up questions so it is streamlined to the goals) during live interview>> generates scorecard report after interview



---

## 👤 Primary User Persona

**Role**: Recruiter / Hiring Manager  
**Goal**: Run effective, insight-rich interviews without multitasking or manual note-taking  
**Tools**: Zoom, Google Meet, MS Teams  

---

## 🛣️ End-to-End User Journey

### 1. 🔗 **Connect Interview Tool**

- **Step**: User logs into Clarivue
- **Action**: Connects Zoom, Google Meet, or MS Teams via OAuth or API key
- **Result**: Clarivue can now auto-join scheduled calls via Recall.ai

---

### 2. 📅 **Schedule or Sync Interviews**

- **Step**: User syncs Google/Outlook calendar
- **Action**: Clarivue detects upcoming interviews
- **Optional**: User can manually mark sessions to track
- **Result**: Clarivue is ready to join selected calls

---

### 3. 📞 **Interview Begins – Clarivue Joins Silently**

- **Step**: Clarivue auto-joins the call (via Recall.ai bot)
- **Action**: Begins streaming audio
- **Result**:
  - Whisper begins real-time transcription
  - Speaker diarization starts (interviewer vs candidate)
  - Transcript is chunked for real-time analysis

---

### 4. 🤖 **Live Support During Interview**

- **Real-Time Features**:
  - Transcription feed visible in Clarivue UI
  - Smart follow-up questions suggested live (based on candidate responses + role context)
  - Tone detection indicators (e.g. hesitancy, confidence)

- **Optional UI**:
  - Sidebar with question suggestions
  - Scrollable live transcript with tone tags
  - "Bookmark this moment" button

---

### 5. 📋 **Post-Interview Wrap-up**

- **Action**: Clarivue automatically exits the call
- **User Sees**:
  - Clean interview transcript (speaker labeled)
  - Scorecard auto-filled (skills, communication, red flags, etc.)
  - 1-paragraph summary for candidate overview

---

### 6. 📤 **Report Delivery + Review**

- **Options**:
  - Download PDF summary
  - Share link with team
  - Export to Notion or Slack
- **Outcome**: Interviewer makes faster, clearer hiring decisions

---

## ✅ Key Outcomes for MVP

| Goal | Delivered By |
|------|--------------|
| Eliminate manual note-taking | Real-time transcription (Whisper) |
| Improve follow-ups | LLM-powered follow-up suggestion engine |
| Boost candidate insight | Tone detection + context engine |
| Streamline decision-making | Post-interview scorecard & summary |
| Easy integration | Recall.ai + calendar sync |

---

## 🚧 Limitations (MVP Scope)

- ❌ No ATS integration
- ❌ other languages transcription
- ❌ Manual labeling if diarization fails
- ❌ Limited feedback loop on suggestion quality (future version)

---

## 📌 Next Step Suggestions

- Add “Rate this follow-up” feedback during interviews
- Add custom prompt library for follow-up tone (e.g. friendly, critical, probing)
- Introduce interviewer-specific scorecard preferences

