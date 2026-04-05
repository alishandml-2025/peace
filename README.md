# SDG 16 — Peace, Justice & Strong Institutions

A coursework website by students of the University of Westminster, promoting awareness and action towards **Sustainable Development Goal 16**.

## Project Structure

```
├── index.html          # Home page (with splash screen)
├── gallery.html        # Image Gallery page
├── simulator.html      # Action Impact Simulator page
├── feedback.html       # Feedback & Programme Directory page
├── team.html           # Meet Our Team page
├── profile.html        # Student Profile page
├── sitemap.html        # Sitemap (SVG) page
├── content.html        # SDG 16 Educational Content page
├── css/
│   └── style.css       # Shared stylesheet for all pages
├── js/
│   └── script.js       # Shared JavaScript for all pages
└── images/             # Local image and video assets
```

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Home page with animated splash screen, hero section, mission cards, stats banner, and content gallery tiles |
| `gallery.html` | Image gallery with modal viewer and theme switcher (light/dark/sepia) |
| `simulator.html` | Interactive Action Impact Simulator — select actions and see your SDG 16 impact score |
| `feedback.html` | SDG 16 programme directory, user reviews, and a validated feedback form |
| `team.html` | Meet the four team members with hover-reveal details |
| `profile.html` | Student profile page with tasks, skills, and personal reflection |
| `sitemap.html` | SVG-based interactive sitemap showing the site hierarchy |
| `content.html` | In-depth educational content on reducing violence, rule of law, anti-corruption, inclusive governance, and taking action |

## Features

- **Responsive design** — works on mobile, tablet, and desktop
- **Accessible** — ARIA labels, keyboard navigation, semantic HTML
- **Animated splash screen** — video background with countdown timer (home page only)
- **Shared navigation bar** — consistent navbar across all pages
- **Scroll animations** — elements fade in as you scroll
- **Animated stat counters** — numbers count up when scrolled into view
- **Gallery modal** — click images to expand with light/dark/sepia theme options
- **Impact Simulator** — interactive card-based scoring system
- **Feedback form** — client-side JavaScript validation

## Technologies

- HTML5
- CSS3 (custom properties, flexbox, grid, animations)
- Vanilla JavaScript (ES5/ES6)
- Google Fonts (Inter, Playfair Display)
- SVG (sitemap diagram)

## Running the Site

Open `index.html` in any modern browser. No build tools or server required.

For best results, serve the files from a local HTTP server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx serve .
```

Then visit `http://localhost:8000` in your browser.
