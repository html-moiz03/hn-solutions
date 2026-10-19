# HN Solutions Line Board

Build a single-page, animated, professional portfolio website for "HN Solutions", an outbound sales team (call center) that runs US auto warranty campaigns. It will be shared with prospective partners and clients, so it must feel credible, precise and modern. Use React, Tailwind and shadcn/ui, Framer Motion for animation, and Lenis for smooth scrolling. No backend, no auth, no database.

CONTENT RULES (important)
- Use only the copy below. Do NOT invent statistics, client names, logos, testimonials, awards, years of experience or case studies. No stock photos of people. No emoji anywhere.
- HN Solutions is based in Pakistan and works on US campaigns. Do not claim it is US-registered or licensed.
- Contact section: show the heading and intro, and a clearly marked config object at the top of the file (email, phone, linkedin, all empty strings). Show each value with a copy button only if it is filled in. If all are empty, show the sentence "Contact details are shared by the person who sent you this page."

BRAND AND LOOK
- Concept: a telephone switchboard / line board. Precise, calm, operational. Not a generic SaaS template. Do NOT use purple-to-blue gradients, glassmorphism cards, or centered everything.
- Fonts (Google Fonts): Archivo at a wide width setting (font-stretch about 112 to 118, weight 750 to 800) for headings, IBM Plex Sans for body, IBM Plex Mono for small uppercase labels.
- Light theme colors: background #F1F4F1, surface #FFFFFF, ink #10252A, muted text #4F6368, lines #D3DBD7, signal accent (burnt orange) #C2410C, "ok" teal #0F766E. Dark panel for the line board: #0E2328 with text #E6EEEB, panel lamps #FF9A5C (busy) and #4FD1B5 (ok). Provide a matching dark mode that follows the system setting: background #0A1619, surface #10242A, ink #E6EEEB, signal #FF9A5C.
- Flat, ruled, editorial layout with thin 1px lines and left-aligned headings. Sentence case everywhere. Mono uppercase eyebrow label above each section heading.

ANIMATION DIRECTION (inspired by Scrolltide, Watermelon UI and Godly-style showcase sites)
- Hero: staggered fade-up entrance of eyebrow, headline, lede and buttons. A subtle, lightweight animated background behind the hero (slow-moving soft mesh or halftone dot field in the ink and signal colors, CSS or canvas only, no heavy WebGL, low opacity so text stays readable).
- A thin horizontal marquee ticker under the hero that loops slowly: "Outbound sales", "Retention", "Quality assurance", "Operations and reporting", "Recorded calls", "Weekly reporting", separated by small dots. Pause on hover.
- The hero "line board" panel (see below) is the one bold visual moment.
- Scroll-linked reveals for every section (opacity .7 to 1 with a small upward move, using whileInView with once: true; content must remain readable even if animations never fire).
- Process section: a vertical line that draws itself as the user scrolls (scroll-linked scaleY), with each step's dot lighting up as it is reached.
- Services as a bento-style grid with hover micro-interactions (lift, accent underline slide, arrow shifting).
- Team monogram circles fill with the accent color on hover.
- Smooth scrolling with Lenis. Respect prefers-reduced-motion by disabling the marquee, background motion, board cycling and scroll animations.

SECTIONS AND COPY
1. Sticky nav: brand "HN Solutions" with a small four-bar waveform glyph; links Services, Process, Team, Standards; a "Contact" outlined button. On phones show only the brand and the Contact button.
2. Hero. Eyebrow: "Outbound sales team · Based in Pakistan". H1: "Outbound sales calls, checked before they reach you." Lede: "HN Solutions is a four-person outbound sales team for US auto warranty campaigns. Three experienced closers work the phones. One operator runs the dialer, CRM and QA, so every sale is reviewed against its recording before it is submitted." Buttons: "See how a sale moves" (scrolls to Process) and "Get in touch" (outlined, scrolls to Contact).
   Line board panel on the right (dark panel, rounded 6px, 1px border): header with a pulsing lamp, label "Line board" and a small tag "Illustration". Four rows: Closer 1, Closer 2, Closer 3, QA review. Each row has a lamp, a name, a state label and a 14-bar mini waveform. The states cycle on a timer with staggered timing. Closers cycle through Dialing, Ringing, On call (twice as long), Wrap-up. QA cycles through In queue, Reviewing (twice as long), Approved. Lamps are orange when dialing, ringing, queued or reviewing, teal when on call or approved, grey for wrap-up. Waveform bars animate only while a row is On call or Reviewing. Footer line: "Every sale call passes QA before it is submitted."
3. Marquee ticker (above).
4. Services. Heading "What the team handles", intro "One team covers the calls, the checks and the paperwork around them." Four items:
   - Outbound sales: "Live outbound calls on your campaign, run from your approved script and product terms by closers with real floor experience." Tag: Closers.
   - Retention: "Follow-up calls to customers who hesitate or ask to cancel, so a sale that was made properly stays on the books." Tag: Closers.
   - Quality assurance: "Every sale call is recorded and scored against a checklist before it is submitted. Sales that fail go back for correction and are not passed on." Tag: Operations.
   - Operations and reporting: "Dialer, CRM and sales records are managed in house. The campaign owner gets weekly sales and chargeback reports." Tag: Operations.
5. Process. Heading "How a sale moves through our line", intro "Six steps from the first dial to the weekly report." Steps: Dial ("Leads are loaded into our dialer after scrubbing against DNC lists, with the source of the leads agreed with the campaign owner. Calls go out only inside legal calling hours."), Connect and pitch ("A closer runs your approved script and sticks to your product terms."), Close and verify ("The customer's agreement, details and consent are confirmed on the recorded call."), QA review ("Operations scores the recording against a checklist. Sales that fail go back for a fix or a retention call."), Hand off ("Approved sales go to the campaign owner in the format they ask for."), Report ("Weekly sales and chargeback reports keep the numbers matching on both sides.").
6. Team. Heading "Four partners, one line", intro "Three closers on the phones and one operator behind them. All four own the company." Four people with monogram circles (no photos): Malik, Partner · Operations, "Runs the dialer, CRM, merchant setup, sales records and call QA."; Zain, Nasar and Abdullah, each Partner · Closer, "Outbound sales calls and customer retention."
7. Standards. Heading "How we work", intro "The rules we hold ourselves to on every campaign." Six items with a teal check marker: Every call recorded ("Sale calls are recorded and kept, so any sale can be checked."); QA before submission ("No sale reaches you until it has passed review."); Calling rules followed ("DNC scrubbing and legal calling hours on every list."); Approved scripts only ("Closers say what your script says and nothing more."); Straight reporting ("Sales and chargebacks are reported as they are, every week."); Start small, grow on results ("We begin with a small team and scale once the numbers hold.").
8. Partnership. Heading "What we bring and what we need", intro "Terms are discussed directly, on a call or by email." Two columns. We bring: An experienced closing team, ready to start; Our own dialer, agents and workstations; Recorded calls and QA on every sale; Weekly sales and chargeback reporting. We need from a partner: An auto warranty campaign with an approved script and product; A merchant account and payment gateway; Clear terms on compliance and chargebacks; A written agreement before we start.
9. Contact. Heading "Start with a short call." Intro "Tell us about your campaign and we will walk you through our setup and answer questions about the team." Contact items from the config object as described above.
10. Footer: "HN Solutions · Based in Pakistan" on the left, "© 2026 HN Solutions" on the right.

QUALITY BAR
- Fully responsive down to 360px with a 16px minimum side gutter and no horizontal scroll. Visible keyboard focus states. Good contrast in both light and dark modes. Semantic HTML with one h1. Page title "HN Solutions".
- Keep the code clean: separate components per section, content in a single data file, the contact config in one obvious place.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d4c18266-3570-4589-a1ff-c75904b3787b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
