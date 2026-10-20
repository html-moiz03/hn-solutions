/* =====================================================================
 * CONTACT CONFIG — fill in any of these to show them on the page.
 * Empty strings are hidden. If all are empty, a fallback sentence shows.
 * ===================================================================== */
export const CONTACT = {
  email: "",
  phone: "",
  linkedin: "",
};

export const ticker = [
  "Outbound sales",
  "Retention",
  "Quality assurance",
  "Operations and reporting",
  "Recorded calls",
  "Weekly reporting",
];

export const hero = {
  eyebrow: "Outbound sales BPO · Based in Pakistan",
  title: "Outbound sales calls, checked before they reach you.",
  lede: "HN Solutions is an outbound call center for US auto and home warranty programs. Experienced fronters and closers work the phones, and our operations desk runs the dialer, CRM and QA, so every sale is reviewed against its recording before it reaches you.",
};

export const services = [
  { title: "Outbound sales", tag: "Closers", body: "Live outbound calls on your campaign, run from your approved script and product terms by closers with real floor experience." },
  { title: "Retention", tag: "Closers", body: "Follow-up calls to customers who hesitate or ask to cancel, so a sale that was made properly stays on the books." },
  { title: "Quality assurance", tag: "Operations", body: "Every sale call is recorded and scored against a checklist before it is submitted. Sales that fail go back for correction and are not passed on." },
  { title: "Operations and reporting", tag: "Operations", body: "Dialer, CRM and sales records are managed in house. The campaign owner gets weekly sales and chargeback reports." },
];

export const steps = [
  { title: "Dial", body: "Leads are loaded into our dialer after scrubbing against DNC lists, with the source of the leads agreed with the campaign owner. Calls go out only inside legal calling hours." },
  { title: "Connect and pitch", body: "A closer runs your approved script and sticks to your product terms." },
  { title: "Close and verify", body: "The customer's agreement, details and consent are confirmed on the recorded call." },
  { title: "QA review", body: "Operations scores the recording against a checklist. Sales that fail go back for a fix or a retention call." },
  { title: "Hand off", body: "Approved sales go to the campaign owner in the format they ask for." },
  { title: "Report", body: "Weekly sales and chargeback reports keep the numbers matching on both sides." },
];

export const team = [
  { name: "Malik AbdulMoiz Zaheer", role: "Partner · Operations", body: "Runs the dialer, CRM, merchant setup, sales records and call QA." },
  { name: "Zain-Ul-Abideen", role: "Partner · Closer", body: "Outbound sales calls and customer retention." },
  { name: "Mirza Nasar Hussain", role: "Partner · Closer", body: "Outbound sales calls and customer retention." },
  { name: "Abdullah Arshad", role: "Partner · Closer", body: "Outbound sales calls and customer retention." },
];

export const standards = [
  { title: "Every call recorded", body: "Sale calls are recorded and kept, so any sale can be checked." },
  { title: "QA before submission", body: "No sale reaches you until it has passed review." },
  { title: "Calling rules followed", body: "DNC scrubbing and legal calling hours on every list." },
  { title: "Approved scripts only", body: "Closers say what your script says and nothing more." },
  { title: "Straight reporting", body: "Sales and chargebacks are reported as they are, every week." },
  { title: "Scale on results", body: "We start with a focused campaign and scale once the numbers hold." },
];

export const partnership = {
  bring: [
    "Experienced fronters and closers, ready to start",
    "Our own dialer, agents and workstations",
    "Recorded calls and QA on every sale",
    "Weekly sales and chargeback reporting",
  ],
  need: [
    "An auto or home warranty program with an approved script and product terms",
    "A merchant account and payment gateway",
    "Compliance and chargeback terms agreed up front",
    "A written agreement before launch",
  ],
};

export const metrics: { to?: number; prefix?: string; suffix?: string; text?: string; label: string }[] = [
  { to: 150000, prefix: "$", label: "charged in sales in a single year" },
  { to: 100, suffix: "%", label: "of sale calls recorded" },
  { to: 100, suffix: "%", label: "of sales QA-reviewed before submission" },
  { text: "Weekly", label: "sales and chargeback reporting" },
];

export const floor = [
  { title: "Dialer", body: "Our own outbound dialer, with lists scrubbed against DNC before a call goes out." },
  { title: "CRM and records", body: "Every lead, call outcome and sale is logged and kept in house." },
  { title: "Agent workstations", body: "Dedicated agents and workstations, set up and ready for your campaign." },
  { title: "Call recording", body: "Sale calls are recorded and stored, so any sale can be checked." },
  { title: "QA scoring", body: "Each recording is scored against a checklist before the sale is submitted." },
  { title: "Reporting", body: "Weekly sales and chargeback reports, shared as they are." },
];

export const experience = {
  years: 5,
  suffix: "+",
  label: "years of auto and home warranty sales experience on our team",
  intro: "Our team has worked auto and home warranty campaigns with:",
  companies: [
    { name: "Drive Smart", logo: "/logos/drive-smart.png", w: 220, h: 68, tall: false },
    { name: "Omega Auto Care", logo: "/logos/omega-auto-care.png", w: 220, h: 66, tall: false },
    { name: "BeeCovered", logo: "/logos/beecovered.png", w: 220, h: 79, tall: false },
    { name: "MotoAssure", logo: "/logos/motoassure.png", w: 90, h: 85, tall: true },
    { name: "Home Assure", logo: "/logos/home-assure.png", w: 120, h: 77, tall: true },
  ],
  note: "Past campaign experience of our team members. Logos belong to their respective owners and do not imply endorsement or partnership.",
};

export const faq = [
  { q: "What does HN Solutions do?", a: "We are an outbound call center (BPO) based in Pakistan, running US auto and home warranty campaigns. Fronters make the calls, Closers close them, and an Operator runs the dialer, CRM and quality checks." },
  { q: "Who makes the calls?", a: "Experienced fronters and closers with real floor experience in auto and home warranty sales. We start with a focused campaign and scale once the results hold." },
  { q: "Are calls recorded and checked?", a: "Yes. Every sale call is recorded and scored against a checklist before it is submitted. Sales that fail go back for correction or a retention call and are not passed on." },
  { q: "How do you handle calling rules?", a: "Leads are scrubbed against DNC lists, the source of the leads is agreed with the campaign owner, and calls go out only inside legal calling hours." },
  { q: "What do you need to launch a campaign?", a: "An auto or home warranty program with an approved script and product terms, a merchant account and payment gateway, compliance and chargeback terms agreed up front, and a written agreement before launch." },
  { q: "What do carriers get?", a: "Experienced fronters and closers ready to start, our own dialer, agents and workstations, recorded calls with QA on every sale, and weekly sales and chargeback reports." },
  { q: "How do we get started?", a: "Get in touch with your program details. We agree the terms, set up the dialer and QA for your campaign, and start dialing." },
];
