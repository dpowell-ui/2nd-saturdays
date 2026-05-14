# 2nd Saturdays

A monthly Christian music songwriters round in Spring Hill, Tennessee.

Static site built with **Astro**, content managed via **Decap CMS**, deployed on **Netlify**.

---

## What's in this repo

```
2nd-saturdays/
├── astro.config.mjs        # Astro config (set your site URL here)
├── netlify.toml            # Netlify build settings + headers
├── package.json
│
├── src/
│   ├── pages/              # Each .astro file = one page on the site
│   │   ├── index.astro     #   /
│   │   ├── events.astro    #   /events
│   │   ├── about.astro     #   /about
│   │   └── visit.astro     #   /visit
│   ├── layouts/Layout.astro      # Wraps every page (head, nav, footer)
│   ├── components/         # Hero, Footer, EventRow, etc.
│   ├── content/
│   │   ├── config.ts             # Schema for the "events" collection
│   │   └── events/*.md           # One markdown file per round
│   ├── styles/global.css         # All design tokens + styles
│   └── lib/dates.ts              # Date helpers
│
└── public/                 # Served at site root
    ├── admin/
    │   ├── index.html      # Decap CMS mount → site.com/admin
    │   └── config.yml      # Decap collection schema
    └── photos/*.jpg        # Optimized event photos
```

---

## Run it locally

You'll need **Node.js 20+**.

```bash
npm install
npm run dev
```

Open <http://localhost:4321>.

To build for production locally:

```bash
npm run build
npm run preview
```

---

## Deploying to Netlify

### 1. Push to GitHub

Create a new GitHub repo and push this project to it. (Private or public — either works.)

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:YOUR-USER/2nd-saturdays.git
git push -u origin main
```

### 2. Connect to Netlify

1. Go to <https://app.netlify.com/start>
2. Click **"Import from Git"** → select GitHub → pick the repo
3. Build settings are detected automatically from `netlify.toml` — just confirm:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy site**

Within a minute or two, the site is live at a `*.netlify.app` URL.

### 3. Custom domain

In Netlify: **Domain management → Add custom domain** → follow instructions. Cloudflare Registrar is the cheapest, most reliable option for `.org` / `.com` registration (~$10–12/year). Netlify will auto-provision a free SSL cert.

Update `astro.config.mjs` and `public/admin/config.yml` to use the real domain (search for `2ndsaturdays.org`).

---

## Setting up the admin portal (Decap CMS)

The admin lives at **`yoursite.com/admin`**. It needs two things turned on in Netlify:

### Step 1 — Enable Netlify Identity

In your Netlify site dashboard:

1. **Site configuration → Identity → Enable Identity**
2. Under **Registration preferences**, set to **"Invite only"** (so randoms can't sign up)
3. Under **Git Gateway** (also in Identity settings), click **Enable Git Gateway**

### Step 2 — Invite editors

In **Identity → Invite users**, add the email addresses of whoever should be able to edit events (the ministry's husband-and-wife team). They'll get an email with a one-click signup link.

### Step 3 — Sign in and edit

The editors go to `yoursite.com/admin/`, click **Login with Netlify Identity**, and they're in. They can:

- Add new rounds
- Edit dates, times, lineups
- Upload photos (uploaded to `public/photos/` automatically)
- Delete past events

Every save commits to the GitHub repo → Netlify rebuilds → site updates in ~30 seconds. The editors never touch git directly.

---

## Managing events

Each round is a markdown file in `src/content/events/`. The Decap CMS UI is just a friendly editor for these files; you can also edit them by hand if you prefer.

A file looks like:

```yaml
---
title: June Round
date: 2026-06-13
time: 6:00 PM
doorsOpen: 5:30 PM
venue: Just Love Coffee Cafe
address: 4816 Main Street, Spring Hill, TN 37174
artists:
  - Andrew Greer
  - Johnathan Bond
  - Sarah Macintosh
  - Daniel Ellsworth
note: Four writers. Four chairs. One long table of songs.
---
```

The site automatically:

- Sorts rounds by date
- Splits them into Upcoming vs. Past based on today's date
- Uses the next upcoming round as the hero "Next Round" card
- Shows the four most recent upcoming on the home page

The `note` is optional — it shows as a small italic quote on the event card.

---

## Customization quick-reference

| Want to change… | Where to do it |
| --- | --- |
| Colors | `src/styles/global.css` — top of file, `:root` variables |
| Fonts | `src/styles/global.css` — `@import` at top + `.font-*` classes |
| Site title / meta | `src/layouts/Layout.astro` |
| Nav links | `src/components/Nav.astro` |
| Hero copy | `src/components/Hero.astro` |
| About page text | `src/pages/about.astro` |
| Footer | `src/components/Footer.astro` |
| Photos shown on home | `src/components/FromTheRoom.astro` |

---

## Email signup (next step)

The signup form on the home page is currently a stub (shows an alert on submit). To wire it up:

**Option A — Buttondown** (recommended, $9/mo): create a form, copy the embed code, paste it into `src/components/HomeCTA.astro` where the `<form>` lives.

**Option B — Mailchimp** (free tier): same idea — grab the embed and swap it in.

**Option C — Netlify Forms** (free, comes with Netlify): change the `<form>` tag to `<form name="newsletter" netlify>` and add a hidden `form-name` input. Submissions show up in the Netlify dashboard. Simpler but no automated emails.

---

## Adding the Columbia "Christian Music Nights" round later

When you're ready to add the sister round:

1. Either add a `location` field to the event schema (and filter by it in pages), or
2. Create a separate content collection `christian-music-nights` and add corresponding pages

I'd lean toward option 1 since the structure and copy is almost identical — one site, two recurring events with a location selector. We can hash this out when you get there.

---

## Need to revert or undo?

Every change goes through git. Open the repo on GitHub, find the commit you want to undo, click **Revert**. Netlify auto-redeploys to the previous state within a minute.

---

## Questions

Email the developer (you) or open an issue on the GitHub repo.
