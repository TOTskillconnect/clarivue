# 🎨 Clarivue Color System

A structured color configuration for the Clarivue app, designed for clarity, calm, and intelligence.

---

## 🌈 Primary Palette

| Role         | Name         | Hex       | Usage                            |
|--------------|--------------|-----------|----------------------------------|
| **Primary**  | Indigo Glow  | `#ccc3f6` | Brand color, buttons, links      |
| **Accent**   | Soft Iris    | `#cec2f7` | Hover states, UI highlights      |
| **Secondary**| Orchid Tint  | `#caa1e8` | Secondary buttons, CTAs          |
| **Tertiary** | Sky Haze     | `#acbaff` | Charts, tooltips, decorative UI  |

---

## ⚪ Neutral Palette

| Role               | Name     | Hex       | Usage                            |
|--------------------|----------|-----------|----------------------------------|
| **Background**     | Snow     | `#ffffff` | App background                   |
| **Card Background**| Ghost    | `#f9f9ff` | Surfaces, cards                  |
| **Border/Lines**   | Cloud    | `#e2e6f3` | Dividers, input borders          |
| **Text Primary**   | Ink      | `#1e1e2f` | Main headings, content           |
| **Text Secondary** | Slate    | `#5c5f73` | Labels, metadata, subtext        |

---

## ✅ Status & Utility Colors

| Type     | Name     | Hex       | Usage                          |
|----------|----------|-----------|--------------------------------|
| **Success** | Mint    | `#4ade80` | Confirmation, positive signals |
| **Warning** | Amber   | `#fbbf24` | Caution messages               |
| **Danger**  | Rose    | `#f87171` | Errors, alerts                 |
| **Info**    | Bluebell| `#60a5fa` | Tooltips, hints, info banners  |

---

## 🛠 Tailwind CSS Config Snippet

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#ccc3f6',   // Indigo Glow
        accent: '#cec2f7',    // Soft Iris
        secondary: '#caa1e8', // Orchid Tint
        tertiary: '#acbaff',  // Sky Haze
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
      },
    },
  },
}
