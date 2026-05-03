import type { ServiceSlug, IndustrySlug } from "./services-data";

export type Vertical = "medical" | "real-estate" | "home-services";

export interface Industry {
  slug: IndustrySlug;
  name: string;                            // e.g. "Dental Practices"
  vertical: Vertical;
  hero: {
    headline: string;                      // H1, contains primary keyword
    subhead: string;
    metricBadge?: string;                  // e.g. "12 dental clients · +280% new patient volume avg"
  };
  problem: { paragraphs: string[] };       // 3 paragraphs
  servicesUsed: ServiceSlug[];             // 4 of 6 — the cards rendered in SOLUTION section
  stack: {
    description: string;                   // 1 paragraph
    integrations: string[];                // e.g. ["Dentrix", "Open Dental", "Weave"]
  };
  proof: {
    caseQuote: string;                     // benchmark statement (per spec decision)
    clientLabel: string;                   // e.g. "Industry benchmark, 12 dental engagements"
  };
  faq: { q: string; a: string }[];         // 6 entries for FAQPage schema
  cta: {
    label: string;                         // e.g. "Book a 15-min dental practice audit"
    subcopy: string;
  };
  targetKeyword: string;                   // primary
  secondaryKeywords: string[];             // 2-3 supporting
}

export const industries: Industry[] = [
  {
    slug: "dental-marketing-minneapolis",
    name: "Dental Practices",
    vertical: "medical",
    hero: {
      headline: "AI Marketing for Minneapolis Dental Practices",
      subhead:
        "Replace generic SEO firms and overwhelmed front-desk recall with autonomous agents that book new patients while you're chairside.",
      metricBadge: "12 dental engagements · industry benchmark",
    },
    problem: {
      paragraphs: [
        "A dental marketing agency in Minneapolis sells the same playbook every busy practice already runs: a content calendar, a Google Ads account, and a monthly report. Twin Cities CPCs for terms like \"dentist near me\" and \"dental implants Minneapolis\" have climbed roughly 60% in three years, while the blog posts those same firms produce never reach the patients you actually want. The math has shifted, and most practices are still paying for the version that worked in 2019.",
        "Inside the practice, the tax compounds. Front-desk staff lose two hours a day chasing recall, leaving voicemails, and rebooking the no-shows from yesterday's column. Hygienist chairs sit empty for 30 to 45 minutes per provider per week — quiet revenue leaving the building. The standard fix is to hire a marketing coordinator, sign with a national dental chain, or pile more work on the office manager. All three treat marketing as a cost center to be managed instead of a system to be deployed.",
        "AI does not replace the marketing coordinator. It gives the practice a coordinator who works 24/7, never forgets a recall window, and learns from every booked-versus-no-show pattern in your PMS. Paid spend gets bid against actual chair-time availability instead of a static keyword list. That is what Neurospark deploys, and it is the deployment model your competitors are starting to figure out.",
      ],
    },
    servicesUsed: ["ai-agents", "paid-media-ai", "growth-automation", "brand-intel"],
    stack: {
      description:
        "We wire your practice management system into a single agent layer that handles inbound chat, recall outreach, review monitoring, and Google and Meta ad bid management. The agents read appointment availability in real time through Dentrix, Open Dental, or Eaglesoft, sync notes through Weave or Solutionreach, and never double-book or miss a recall window. Negative reviews route to the practice owner inside ten minutes.",
      integrations: ["Dentrix", "Open Dental", "Eaglesoft", "Weave", "Solutionreach"],
    },
    proof: {
      caseQuote:
        "Our dental engagements target +180–220% new-patient inquiry volume within 90 days, with cost-per-acquisition dropping 35–50% versus baseline Google Ads spend. Sustained lift averages +35–60% over baseline at month 12.",
      clientLabel: "Industry benchmark across 12 Minneapolis-area dental engagements",
    },
    faq: [
      {
        q: "How long until we see new patients?",
        a: "First booked new-patient appointments inside 21 days of agent deployment is the typical pattern. The full lift curve compounds over 90 days as the bid agents learn your conversion data and the recall agent works through your existing list.",
      },
      {
        q: "Do we need to switch our practice management software?",
        a: "No. We integrate with whatever PMS you already run — Dentrix, Open Dental, and Eaglesoft are the ones we deploy on most often, with Weave or Solutionreach for messaging. The agents read your real-time availability through the existing API.",
      },
      {
        q: "Will you replace our existing marketing coordinator?",
        a: "Most of our dental clients keep their coordinator and free them to focus on community partnerships, case studies, and provider-led content. The agents take the repetitive, high-volume work — recall calls, review responses, ad bid adjustments, after-hours inbound.",
      },
      {
        q: "What does pricing look like for a single-location practice?",
        a: "Most single-location practices run on the Operator tier at $22K/month, which includes 4 modules — AI Agents, Paid Media AI, Growth Automation, and Brand Intel. Smaller practices can start on Starter at $8K/month with 2 modules; multi-location DSOs typically need Command at $48K/month for all 6.",
      },
      {
        q: "How do you handle HIPAA and patient data?",
        a: "We never store PHI. All patient-identifying data stays inside your PMS; the agents read it through your existing API and act on availability and category signals only. We sign a BAA with every dental practice we onboard.",
      },
      {
        q: "What's the switching cost if we want to leave?",
        a: "Month-to-month, no annual lockup. We hand back any custom training data, prompts, and agent configurations on request. Most practices stay because the agents pay for themselves inside the first quarter.",
      },
    ],
    cta: {
      label: "Book a 15-min dental practice audit",
      subcopy:
        "We'll review your current ad spend, recall workflow, and review profile, and send a 4-step deployment plan within 24 hours.",
    },
    targetKeyword: "dental marketing agency Minneapolis",
    secondaryKeywords: [
      "dental SEO Minnesota",
      "AI for dental practices",
      "Minneapolis dental marketing",
    ],
  },
  {
    slug: "med-spa-marketing-minneapolis",
    name: "Med Spas & Aesthetic Clinics",
    vertical: "medical",
    hero: {
      headline: "AI Marketing for Minneapolis Med Spas",
      subhead:
        "Trade boilerplate Instagram packages and one-off promo blasts for an agent stack that fills injector chairs and grows membership monthly.",
      metricBadge: "9 med-spa engagements · industry benchmark",
    },
    problem: {
      paragraphs: [
        "Hiring a med spa marketing agency in Minneapolis usually means paying for a content creator, a Meta ad buyer, and a quarterly review. The output looks fine in a slide deck and underperforms in the chair. Aesthetic CPMs in the Twin Cities have nearly doubled since 2023, before/after rules tighten with every Meta policy update, and the seasonal swing between summer body-contouring demand and the December injectable rush leaves spend either wasted or under-deployed.",
        "Operationally, the bottleneck is rarely lead volume — it is the gap between an inquiry and a booked consult. Membership programs that should be your most profitable channel quietly stall because nurture is manual. Front-desk staff triage DMs, voicemails, text-back requests, and abandoned web forms in the same window they are checking patients in. The leads that do book are the ones who happened to call during business hours.",
        "Neurospark deploys an agent layer that takes the inbound, qualifies it against your service menu, books against real Boulevard or Aesthetic Record availability, and sequences members through retention flows that actually fire on time. Paid spend rebalances weekly against booked-revenue per service, not last-click attribution. The practice keeps its aesthetic; the operations get a 24/7 spine.",
      ],
    },
    servicesUsed: ["ai-agents", "paid-media-ai", "content-engine", "brand-intel"],
    stack: {
      description:
        "Your booking platform — Aesthetic Record, Boulevard, or Mindbody — feeds the agent layer real-time availability, package mix, and membership status. Inbound DMs, web chat, SMS, and ad-form leads route to a qualification agent that books against the right injector or laser room, then hands off to a nurture agent that runs membership and rebooking sequences. Content Engine drafts compliant before/after captions, member-only campaigns, and seasonal launches.",
      integrations: ["Aesthetic Record", "Boulevard", "Mindbody"],
    },
    proof: {
      caseQuote:
        "Our med-spa engagements target +140–180% qualified consult volume within 90 days, with membership conversion rates rising 25–40% over baseline. Sustained lift averages +30–55% over baseline booked revenue at month 12.",
      clientLabel: "Industry benchmark across 9 Minneapolis-area med-spa engagements",
    },
    faq: [
      {
        q: "How long until we see consults on the calendar?",
        a: "Inbound qualification and booking go live in week one, so existing demand starts converting immediately. The full lift on paid acquisition compounds over 60 to 90 days as the bid agents learn which services convert at which CPL.",
      },
      {
        q: "Do you integrate with Boulevard, Aesthetic Record, or Mindbody?",
        a: "Yes. Those are the three platforms we deploy on most often. The agents read live provider availability, package and membership data, and write booking events back into the source of truth — no duplicate calendars to manage.",
      },
      {
        q: "Will the agents replace our existing social and content team?",
        a: "Most clinics keep their content lead and use the Content Engine to multiply output — the AI drafts compliant captions, before/after frames, and member campaigns; the human approves and adds the brand polish. The qualification and nurture agents replace the after-hours triage no one wants to do.",
      },
      {
        q: "What does pricing look like for a typical single-location med spa?",
        a: "Most single-location med spas run on Operator at $22K/month with 4 modules — AI Agents, Paid Media AI, Content Engine, and Brand Intel. Newer or smaller clinics start on Starter at $8K/month; multi-location groups with shared injectors usually move to Command at $48K/month.",
      },
      {
        q: "How do you stay HIPAA-compliant on ads and lead handling?",
        a: "We never store PHI in the ad layer. Identifiers stay inside your booking platform; ad audiences are built from non-PHI behavioral and category signals. We sign a BAA, and our before/after content workflow follows current Meta and FDA guidance for aesthetic claims.",
      },
      {
        q: "What's the switching cost if we want to leave?",
        a: "Month-to-month, no annual lockup. We hand back trained prompts, agent configurations, and any custom audiences on request. Most clinics stay because membership LTV improvements compound past the first contract quarter.",
      },
    ],
    cta: {
      label: "Book a 15-min med spa marketing audit",
      subcopy:
        "We'll review your current ad spend, booking funnel, and membership program, and send a 4-step deployment plan within 24 hours.",
    },
    targetKeyword: "med spa marketing agency Minneapolis",
    secondaryKeywords: [
      "aesthetic clinic marketing Minnesota",
      "med spa AI marketing",
      "Minneapolis med spa advertising",
    ],
  },
  {
    slug: "real-estate-marketing-minneapolis",
    name: "Real Estate & Property",
    vertical: "real-estate",
    hero: {
      headline: "AI Marketing for Minneapolis Real Estate",
      subhead:
        "Stop competing with Zillow and franchise brands on their terms — deploy an agent stack that owns your geography and works every lead, every day.",
      metricBadge: "8 brokerage engagements · industry benchmark",
    },
    problem: {
      paragraphs: [
        "A solo agent or boutique team hiring a real estate marketing agency in Minneapolis is usually outspent ten to one by Zillow, Redfin, and the franchise machines. The standard response is a CRM, a website refresh, and a monthly Facebook ad — none of which closes the response-time gap that decides who actually wins the lead. In the Twin Cities, the first agent to answer a portal inquiry inside five minutes wins it most of the time, and most agents are in a showing when it lands.",
        "The second leak is listing velocity. New listings need their full content kit — listing copy, social cuts, video walkthrough captions, neighborhood briefs, follow-up sequences — live within hours of the photographer leaving. Most teams ship that asset stack three days late, after the listing has already lost its launch window. Buyer and seller nurture sequences that should run for 12 to 18 months quietly die after the third manual touch.",
        "Neurospark deploys an agent layer that answers every inbound lead in under a minute, builds the listing content kit the moment new MLS data hits, and runs geo-targeted nurture against your actual conversion data inside Follow Up Boss, kvCORE, or BoomTown. The agent is not the agent; the agent is the system that lets the agent stay in the field.",
      ],
    },
    servicesUsed: ["ai-agents", "paid-media-ai", "content-engine", "growth-automation"],
    stack: {
      description:
        "Your CRM — Follow Up Boss, kvCORE, or BoomTown — is the source of truth. The agent layer pulls new leads as they arrive, qualifies them via SMS and chat in under a minute, books showings against your actual calendar, and runs long-horizon buyer and seller nurture sequences. Content Engine generates listing copy, social cuts, neighborhood briefs, and email follow-ups the same hour photos hit the MLS.",
      integrations: ["Follow Up Boss", "kvCORE", "BoomTown"],
    },
    proof: {
      caseQuote:
        "Our real estate engagements target +200–260% qualified buyer and seller leads within 90 days, with response time on inbound dropping under 60 seconds. Sustained lift averages +40–70% over baseline closed transactions at month 12.",
      clientLabel: "Industry benchmark across 8 Minneapolis-area brokerage engagements",
    },
    faq: [
      {
        q: "How quickly can we get inbound response time under a minute?",
        a: "The qualification and booking agent goes live in week one and starts working leads inside 60 seconds of arrival. Full nurture sequences and listing content workflows compound over the following 30 to 60 days.",
      },
      {
        q: "Do you integrate with Follow Up Boss, kvCORE, or BoomTown?",
        a: "Yes. Those are the three CRMs we deploy on most often, plus most major MLS feeds. The agents read leads, lender approvals, and showing activity in real time and write every interaction back to the CRM as the system of record.",
      },
      {
        q: "Will the agents replace our team's ISA or transaction coordinator?",
        a: "Most teams keep both and reassign their time. The agent handles first-touch qualification, showing booking, and the long-tail nurture; the human ISA focuses on hot-buyer conversion and listing presentations.",
      },
      {
        q: "What does pricing look like for a solo agent or small team?",
        a: "Solo and small teams typically start on Starter at $8K/month with 2 modules — usually AI Agents and Content Engine. Producing teams of 5 to 20 agents fit Operator at $22K/month for 4 modules; brokerages move to Command at $48K/month for all 6.",
      },
      {
        q: "How do you handle listing-velocity content without sounding generic?",
        a: "Content Engine is fine-tuned on your existing listing copy, neighborhood expertise, and brand voice in week one. It drafts; you approve. The output is faster than a copywriter and reads like the agent wrote it, not like a template.",
      },
      {
        q: "What's the switching cost if we want to leave?",
        a: "Month-to-month, no annual lockup. We hand back trained prompts, sequences, and content templates on request. Most teams stay because the response-time math compounds across every listing season.",
      },
    ],
    cta: {
      label: "Book a 15-min realtor marketing audit",
      subcopy:
        "We'll review your current lead response time, listing workflow, and CRM data, and send a 4-step deployment plan within 24 hours.",
    },
    targetKeyword: "real estate marketing agency Minneapolis",
    secondaryKeywords: [
      "realtor marketing Minnesota",
      "AI for realtors",
      "Minneapolis real estate advertising",
    ],
  },
  {
    slug: "hvac-marketing-minneapolis",
    name: "HVAC Contractors",
    vertical: "home-services",
    hero: {
      headline: "AI Marketing for Minneapolis HVAC Contractors",
      subhead:
        "Bid against the polar vortex and the August heat dome in real time — deploy an agent stack that books emergency calls and feeds maintenance plans on autopilot.",
      metricBadge: "11 HVAC engagements · industry benchmark",
    },
    problem: {
      paragraphs: [
        "An HVAC marketing agency in Minneapolis usually treats your spend like a flat budget, but Twin Cities HVAC demand is anything but flat. Demand explodes during a polar vortex week and again during a July heat dome, then drops off a cliff. CPCs on \"emergency furnace repair Minneapolis\" or \"AC not working St Paul\" can triple inside 48 hours, and most agencies are still managing bids on a weekly cadence. By the time the campaign adjusts, the storm has passed.",
        "Inside the shop, dispatch is the bottleneck no marketing report ever surfaces. A spike of 40 emergency calls in a morning floods the CSR team, and the conversion rate on those calls collapses because hold times push 8 minutes. Recurring maintenance plans — the most valuable product you sell — get pitched inconsistently because the technician already moved on to the next call. Last year's leads sit cold in ServiceTitan with no nurture sequence behind them.",
        "Neurospark deploys an agent layer that bids paid spend against live weather data and your dispatch capacity, answers inbound calls and chat 24/7, and runs maintenance-plan nurture against your existing customer base inside ServiceTitan, Housecall Pro, or Jobber. The agent slows spend when your trucks are full and floods it the moment dispatch opens up.",
      ],
    },
    servicesUsed: ["ai-agents", "paid-media-ai", "growth-automation", "brand-intel"],
    stack: {
      description:
        "Your field service platform — ServiceTitan, Housecall Pro, or Jobber — feeds the agent layer dispatch capacity, technician routing, and maintenance-plan status. The Paid Media AI agent reads live weather feeds and bids against it; the AI Agents handle inbound calls, web chat, and after-hours intake; the Growth Automation agent runs recurring-maintenance nurture and seasonal tune-up campaigns against your existing customer base.",
      integrations: ["ServiceTitan", "Housecall Pro", "Jobber"],
    },
    proof: {
      caseQuote:
        "Our HVAC engagements target +160–210% emergency call volume during weather events with cost-per-booked-job dropping 30–45% versus flat-bid baseline. Sustained lift averages +35–55% over baseline annual revenue at month 12, with maintenance-plan attach rates up 40–70%.",
      clientLabel: "Industry benchmark across 11 Minneapolis-area HVAC engagements",
    },
    faq: [
      {
        q: "How quickly can we go live before the next weather event?",
        a: "Standard deployment is 14 to 21 days from kickoff to live agents. We prioritize the seasonal calendar — if a polar vortex or heat wave is forecast, we'll fast-track the bid agent and inbound qualification ahead of the rest of the stack.",
      },
      {
        q: "Do you integrate with ServiceTitan, Housecall Pro, or Jobber?",
        a: "Yes. Those are the three field service platforms we deploy on most often. The agents read dispatch capacity and technician availability in real time and write every booked job, lead, and customer interaction back as the source of truth.",
      },
      {
        q: "Will the agents replace our CSRs or our marketing manager?",
        a: "Most contractors keep their CSR team and offload after-hours and overflow volume to the agent — when the storm hits, the agent absorbs the spike instead of putting customers on hold. Marketing managers shift from running campaigns to overseeing the system.",
      },
      {
        q: "What does pricing look like for a typical residential HVAC company?",
        a: "Most residential HVAC contractors fit Operator at $22K/month with 4 modules — AI Agents, Paid Media AI, Growth Automation, and Brand Intel. Smaller shops can start on Starter at $8K/month; large multi-location operators move to Command at $48K/month for all 6.",
      },
      {
        q: "How do you handle the seasonal demand swings without wasting spend?",
        a: "Paid Media AI bids against live weather data, dispatch capacity, and historical conversion patterns at the hourly level — not the weekly cadence most agencies still run. Spend slows automatically when trucks are full and accelerates the moment capacity opens up.",
      },
      {
        q: "What's the switching cost if we want to leave?",
        a: "Month-to-month, no annual lockup. We hand back trained prompts, bid models, and customer nurture sequences on request. Most contractors stay because maintenance-plan attach rates keep compounding past the first season.",
      },
    ],
    cta: {
      label: "Book a 15-min HVAC marketing audit",
      subcopy:
        "We'll review your current ad spend, dispatch flow, and maintenance-plan attach rate, and send a 4-step deployment plan within 24 hours.",
    },
    targetKeyword: "HVAC marketing agency Minneapolis",
    secondaryKeywords: [
      "HVAC lead generation",
      "AI for HVAC contractors",
      "Minneapolis HVAC advertising",
    ],
  },
  {
    slug: "plumbing-marketing-minneapolis",
    name: "Plumbing Contractors",
    vertical: "home-services",
    hero: {
      headline: "AI Marketing for Minneapolis Plumbers",
      subhead:
        "Win the water-emergency call before your competitor's voicemail picks up — deploy an agent stack that answers in seconds and grows recurring service revenue.",
      metricBadge: "9 plumbing engagements · industry benchmark",
    },
    problem: {
      paragraphs: [
        "A plumbing marketing agency in Minneapolis usually optimizes for lead volume and ignores the metric that decides revenue: response time on a water emergency. A burst pipe in a Twin Cities winter does not wait for a callback. The homeowner dials three plumbers in 90 seconds and books the first one to answer with a real ETA. Most shops are losing those calls inside the first ring, and no SEO report makes it visible.",
        "The second problem is mix. Residential emergency calls are the loud channel, but recurring residential maintenance plans and steady commercial accounts are where margin lives. Both quietly underperform because nurture is manual: last year's emergency customer gets no follow-up, the commercial property manager forgets to rebook the annual backflow test, and the kitchen-remodel lead from May never hears from you in October.",
        "Neurospark deploys an agent layer that answers inbound calls and chat 24/7 with real ETAs from your dispatch board, runs maintenance-plan and commercial-account nurture against ServiceTitan, Housecall Pro, or Jobber, and bids paid spend against the categories where margin actually lives. Emergency response stops being a coin flip; recurring revenue stops leaking out the back door.",
      ],
    },
    servicesUsed: ["ai-agents", "paid-media-ai", "growth-automation", "content-engine"],
    stack: {
      description:
        "Your field service platform — ServiceTitan, Housecall Pro, or Jobber — feeds the agent layer live dispatch ETAs, technician routing, and customer history. AI Agents pick up inbound voice and chat in seconds with real arrival windows; Paid Media AI bids against emergency-search demand and commercial intent; Growth Automation runs maintenance-plan nurture and commercial-account rebooking; Content Engine drafts service-area landing pages and follow-up sequences.",
      integrations: ["ServiceTitan", "Housecall Pro", "Jobber"],
    },
    proof: {
      caseQuote:
        "Our plumbing engagements target +170–220% emergency call conversion within 90 days, with answer-rate climbing past 95% and average response under 30 seconds. Sustained lift averages +35–60% over baseline annual revenue at month 12, with recurring-plan attach rates up 40–65%.",
      clientLabel: "Industry benchmark across 9 Minneapolis-area plumbing engagements",
    },
    faq: [
      {
        q: "How quickly can we go from missed calls to sub-30-second response?",
        a: "The inbound voice and chat agent goes live in week one and starts answering with real ETAs from day one. The bid model and nurture sequences compound over the following 30 to 60 days.",
      },
      {
        q: "Do you integrate with ServiceTitan, Housecall Pro, or Jobber?",
        a: "Yes. Those are the three field service platforms we deploy on most often. The agents read dispatch capacity and technician routing in real time and write every booked job and customer interaction back as the source of truth.",
      },
      {
        q: "Will the agents replace our CSRs or office manager?",
        a: "Most shops keep their team and offload overflow, after-hours, and weekend volume to the agent. The CSR team focuses on the calls that genuinely need a human; the office manager stops being the on-call dispatcher at 11pm on a Saturday.",
      },
      {
        q: "What does pricing look like for a typical residential and commercial plumbing operation?",
        a: "Most plumbing contractors fit Operator at $22K/month with 4 modules — AI Agents, Paid Media AI, Growth Automation, and Content Engine. Smaller shops start on Starter at $8K/month; multi-location operators with heavy commercial mix move to Command at $48K/month for all 6.",
      },
      {
        q: "How do you balance residential emergency volume against the commercial book?",
        a: "The bid model and qualification logic split spend by category margin and your current dispatch capacity, not lead count. Commercial nurture runs on its own cadence — annual backflow tests, property-manager rebooking, RFP response — independent of the residential emergency layer.",
      },
      {
        q: "What's the switching cost if we want to leave?",
        a: "Month-to-month, no annual lockup. We hand back trained prompts, bid models, and customer nurture sequences on request. Most shops stay because the answer-rate math pays for the engagement inside the first 60 days.",
      },
    ],
    cta: {
      label: "Book a 15-min plumbing marketing audit",
      subcopy:
        "We'll review your current call answer-rate, dispatch flow, and recurring revenue mix, and send a 4-step deployment plan within 24 hours.",
    },
    targetKeyword: "plumbing marketing agency Minneapolis",
    secondaryKeywords: [
      "plumber lead generation MN",
      "AI for plumbers",
      "Minneapolis plumbing advertising",
    ],
  },
  {
    slug: "roofing-marketing-minneapolis",
    name: "Roofing Contractors",
    vertical: "home-services",
    hero: {
      headline: "AI Marketing for Minneapolis Roofers",
      subhead:
        "Be on the storm-damaged street before the door-knockers — deploy an agent stack that triggers on weather data, captures drone-inspection leads, and tracks insurance timelines.",
      metricBadge: "10 roofing engagements · industry benchmark",
    },
    problem: {
      paragraphs: [
        "A roofing marketing agency in Minneapolis usually sells a brand kit and a Google profile and calls it a system. Storms do not respect that system. A hail event over Edina or a windstorm across the north metro creates a 72-hour window where every roofer in the region is fighting for the same homeowner — and the out-of-state storm-chasers are already knocking on doors. Most local contractors run paid spend on a weekly bid cycle, which means they show up two days after the demand spike has been claimed.",
        "Lead capture is the second leak. Drone-inspection campaigns and free-estimate offers pull strong volume, but the funnel collapses between form-submit and booked inspection because the homeowner is also calling four other roofers. Insurance claim timing makes it worse — the claim adjuster's calendar drives the project timeline, and most contractors lose the job because no one shadows the claim through the 30-to-60-day approval window.",
        "Neurospark deploys an agent layer that triggers ad spend on live weather and storm-damage data, qualifies inbound inspection leads in under a minute, books against your crew calendar, and tracks every active insurance claim through approval and scheduling inside AccuLynx, JobNimbus, or Roofr. Storm response stops depending on which crew chief checks the weather app first.",
      ],
    },
    servicesUsed: ["ai-agents", "paid-media-ai", "growth-automation", "content-engine"],
    stack: {
      description:
        "Your project management platform — AccuLynx, JobNimbus, or Roofr — is the source of truth for active jobs, claim status, and crew capacity. AI Agents handle inbound inspection requests, qualify damage type, and book against the crew calendar; Paid Media AI triggers spend on live storm and hail-track data; Growth Automation shadows insurance claims through approval; Content Engine drafts neighborhood-targeted landing pages and homeowner follow-ups.",
      integrations: ["AccuLynx", "JobNimbus", "Roofr"],
    },
    proof: {
      caseQuote:
        "Our roofing engagements target +200–280% inspection-booking volume in the 72 hours after a qualifying storm, with cost-per-booked-inspection dropping 30–50% versus flat-bid baseline. Sustained lift averages +40–65% over baseline annual revenue at month 12.",
      clientLabel: "Industry benchmark across 10 Minneapolis-area roofing engagements",
    },
    faq: [
      {
        q: "How quickly can we go live before the next storm season?",
        a: "Standard deployment is 14 to 21 days from kickoff to live agents. We prioritize the storm calendar — if hail or wind is in the 10-day forecast, we fast-track the weather-triggered bid agent and inbound qualification ahead of the rest of the stack.",
      },
      {
        q: "Do you integrate with AccuLynx, JobNimbus, or Roofr?",
        a: "Yes. Those are the three roofing platforms we deploy on most often. The agents read crew capacity, active job status, and insurance claim timelines in real time and write every booked inspection and customer interaction back as the source of truth.",
      },
      {
        q: "Will the agents replace our sales reps or canvassers?",
        a: "No. Sales reps and field canvassers close jobs in person; the agents make sure the right inspection is on their calendar, the right neighborhood is being targeted, and active insurance claims do not fall through the cracks during approval.",
      },
      {
        q: "What does pricing look like for a typical regional roofing company?",
        a: "Most regional roofers fit Operator at $22K/month with 4 modules — AI Agents, Paid Media AI, Growth Automation, and Content Engine. Smaller shops start on Starter at $8K/month; larger storm-response operators with multiple crews move to Command at $48K/month for all 6.",
      },
      {
        q: "How do you handle storm-chaser competition without acting like one?",
        a: "Geo-fencing and weather-trigger logic focus spend on your licensed service area only, and the qualification agent screens for legitimate damage before booking inspections. The result is local-credibility positioning with storm-chaser response speed — the inverse of how out-of-state competitors operate.",
      },
      {
        q: "What's the switching cost if we want to leave?",
        a: "Month-to-month, no annual lockup. We hand back trained prompts, weather-trigger logic, and claim-tracking sequences on request. Most contractors stay because the storm-response math compounds across every season.",
      },
    ],
    cta: {
      label: "Book a 15-min roofing marketing audit",
      subcopy:
        "We'll review your current storm-response workflow, inspection booking funnel, and insurance-claim tracking, and send a 4-step deployment plan within 24 hours.",
    },
    targetKeyword: "roofing marketing agency Minneapolis",
    secondaryKeywords: [
      "roofing leads Minnesota",
      "storm response marketing",
      "Minneapolis roofing advertising",
    ],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
