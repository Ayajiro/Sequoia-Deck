# 🌲 Sequoia Deck

> A ritual-based toolkit for sustainable growth.  
> 「靜靜耕耘，每天一點點地前進。」

Sequoia Deck is a modular productivity suite that blends the Pomodoro technique, journaling, and habit tracking with a warm, nature-inspired interface. Designed for slow and intentional living, each tool in the deck helps you cultivate consistent progress — like tending a small farm.

---

## 🧩 Overview

Sequoia Deck is built as an Nx monorepo, containing the following apps/tools:

| App / Tool | Description |
|------------|-------------|
| **Minowa** | 🌾 The central hub of the ritual system. A visual farm that grows as your habits accumulate. |
| **ippo** | ⏱️ A lightweight and focused Pomodoro-style timer. Every “ippo” (一歩) brings you closer to your goals. |
| **Kinomi** | 🍎 A harvest wall — log and review the small fruits of your efforts over time. |
| **Nozora** | 🌌 A restful space for reflection, journaling, or mindful breaks. Think of it as your internal sky. |
| **Mitsura** | 🔗 A habit-chain tracker. Connect your daily efforts into a meaningful, visualized growth path. |

Each app is standalone, but collectively form a complete habit-building ecosystem.

---

## 📁 Project Structure

sequoia-deck/
├── apps/
│ ├── minowa/ # Main dashboard app
│ ├── ippo/ # Pomodoro timer tool
│ ├── kinomi/ # Outcome journal tool
│ ├── nozora/ # Reflection space
│ └── mitsura/ # Habit chain visualizer
├── libs/
│ └── shared/ # Shared UI / logic libraries (WIP)
├── README.md
└── nx.json, etc.


---

## 🚧 Development Status

| Module    | Status     | Notes                          |
|-----------|------------|--------------------------------|
| ippo      | ✅ Done     | Core timer functionality implemented |
| kinomi    | 🔧 Planned | Up next — MVP: log + timeline view |
| nozora    | 🔧 Planned | Lightweight mood journal with optional free text |
| mitsura   | ⏳ Later    | Depends on ippo + kinomi data |
| minowa    | ⏳ Later    | Integration hub — dashboard + routing between tools |

---

## 🛠 Tech Stack

- Monorepo management: **Nx**
- Frontend framework: **React / Next.js**
- Styling: **TailwindCSS**
- Testing: **Vitest (unit)** + **Playwright (E2E)**
- (Optional future) Backend: Express + MongoDB or Supabase

---

## 📌 Philosophy

- **Nature-inspired interface**: Soft colors, farming metaphors, cyclical growth.
- **Modular tools**: Each part works independently, but integrates naturally.
- **Habit-first, not task-first**: Focus on the rhythm, not just the checklist.
- **Privacy-friendly**: No external sync unless user opts in.

---

## 📈 Roadmap Highlights

- [ ] 🎯 Kinomi MVP: auto-log per pomodoro + custom notes
- [ ] 💭 Nozora MVP: mood + text entry
- [ ] 🧭 Minowa dashboard: visual growth + daily ritual entry point
- [ ] 🔄 Mitsura: timeline visualization from kinomi logs
- [ ] 🔐 User auth & optional cloud sync

---

## 📄 License

MIT © [Your Name or Team]  
Built with focus, calm, and a little sun.

---

## 🌱 Slogan Candidates (optional)

> "From tiny steps, a field grows."  
> "Plant your habits. Watch them grow."  
> 「育てよう、小さな毎日。」

