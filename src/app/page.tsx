'use client'

import { useState } from 'react'

// ─── DATA ───────────────────────────────────────────────────────────────────

const mockCustomers = [
  {
    id: 'C001', name: 'Meera Kapoor', phone: '+91 98765 43210', checkInTime: '10:32 AM',
    email: 'meera.kapoor@gmail.com', instagram: '@meera.stylefiles',
    channels: { whatsapp: true, sms: true, email: true, instagram: true },
    visits: 7, lastVisit: '12 Mar 2026', lastPurchase: 'Banarasi Silk Saree — ₹4,200',
    preferences: ['Ethnic Wear', 'Accessories'], wishlist: ['Chanderi Dupatta', 'Kundan Earrings'],
    occasions: ['Wedding (May 2026)', 'Diwali'], tier: 'Gold', points: 2450, totalSpend: '₹38,400',
    avatar: 'MK', assistedBy: 'Ritu (Floor Staff)', lastAssistDate: '12 Mar 2026',
    notes: 'Prefers muted tones. Usually shops with her mother.',
    purchases: [
      { item: 'Banarasi Silk Saree', amount: 4200, date: '12 Mar 2026' },
      { item: 'Zardozi Clutch', amount: 1800, date: '18 Jan 2026' },
      { item: 'Cotton Kurta Set', amount: 2400, date: '02 Dec 2025' },
    ],
  },
  {
    id: 'C002', name: 'Vikram Sinha', phone: '+91 87654 32109', checkInTime: '11:05 AM',
    email: 'vikram.sinha@outlook.com', instagram: '',
    channels: { whatsapp: true, sms: true, email: true, instagram: false },
    visits: 3, lastVisit: '01 Feb 2026', lastPurchase: 'Slim Fit Blazer — ₹3,800',
    preferences: ['Formals', 'Footwear'], wishlist: ['Oxford Shoes', 'Linen Trousers'],
    occasions: ['Office Wear', 'Engagement (Jun 2026)'], tier: 'Silver', points: 870, totalSpend: '₹11,200',
    avatar: 'VS', assistedBy: 'Arun (Senior Stylist)', lastAssistDate: '01 Feb 2026',
    notes: 'Prefers western formals. Size 40 shirt, 32 waist.',
    purchases: [
      { item: 'Slim Fit Blazer', amount: 3800, date: '01 Feb 2026' },
      { item: 'White Formal Shirt', amount: 1600, date: '15 Nov 2025' },
    ],
  },
  {
    id: 'C003', name: 'Zara Deshpande', phone: '+91 76543 21098', checkInTime: '11:48 AM',
    email: 'zara.deshpande@gmail.com', instagram: '@zara.ootd',
    channels: { whatsapp: true, sms: true, email: true, instagram: true },
    visits: 14, lastVisit: '28 Mar 2026', lastPurchase: 'Indo-Western Co-ord Set — ₹5,600',
    preferences: ['Western', 'Bags', 'Jewellery'], wishlist: ['Tote Bag', 'Block Print Kurta'],
    occasions: ['Casual', 'Birthday (Apr 2026)'], tier: 'Platinum', points: 5200, totalSpend: '₹92,000',
    avatar: 'ZD', assistedBy: 'Priya (Store Manager)', lastAssistDate: '28 Mar 2026',
    notes: 'Top spender. Loves discovering new arrivals. Very decisive.',
    purchases: [
      { item: 'Indo-Western Co-ord Set', amount: 5600, date: '28 Mar 2026' },
      { item: 'Silver Cuff Bracelet', amount: 2200, date: '10 Mar 2026' },
      { item: 'Embroidered Tote', amount: 3400, date: '14 Feb 2026' },
      { item: 'Pashmina Shawl', amount: 6800, date: '25 Dec 2025' },
    ],
  },
]

const outreachTemplates = [
  { id: 'T001', channel: 'WhatsApp', name: 'Welcome Back Offer', body: "Hi {{name}}! Great seeing you at MODENX today. As our {{tier}} member, enjoy *15% OFF* on your purchase. Show this at billing!" },
  { id: 'T002', channel: 'WhatsApp', name: 'Wishlist Back in Stock', body: 'Hey {{name}}! Good news — {{wishlist_item}} is back in stock at MODENX. Drop by or reply to reserve!' },
  { id: 'T003', channel: 'SMS', name: 'Points Reminder', body: 'Hi {{name}}, you have {{points}} pts (worth Rs.{{points_value}}) at MODENX! Use before {{expiry}}. Reply STOP to opt out.' },
  { id: 'T004', channel: 'Email', name: 'Monthly Lookbook', body: 'Hi {{name}}, your personalised MODENX lookbook for this month is here! Based on your love for {{wishlist_item}} — we have curated 8 new picks. Open the email to explore.' },
  { id: 'T005', channel: 'Instagram DM', name: 'New Arrivals Drop', body: 'Hey {{name}}! 👋 Just dropped fresh arrivals in your fav category. Swipe through our latest story highlights or DM us to reserve your picks! 🛍️' },
  { id: 'T006', channel: 'RCS', name: 'Loyalty Upgrade', body: 'Congrats {{name}}! 🎉 You are now a {{tier}} member at MODENX. Tap below to view your exclusive perks and redeem {{points}} reward points.' },
  { id: 'T007', channel: 'WhatsApp', name: 'Post-Visit Thank You', body: 'Thank you for visiting MODENX, {{name}}! Rate us ⭐⭐⭐⭐⭐ and earn 50 bonus points: modenx.in/review' },
]

const suggestedItems = [
  { name: 'Chanderi Silk Kurta', price: 2800, match: 'Matches preference' },
  { name: 'Kundan Jhumka Set', price: 1400, match: 'On wishlist' },
  { name: 'Bandhani Dupatta', price: 950, match: 'Pairs with last purchase' },
  { name: 'Embroidered Potli Bag', price: 1200, match: 'Occasion: Wedding' },
]

// ─── NAV ────────────────────────────────────────────────────────────────────

type View = 'checkin-flow' | 'repeat-flow' | 'dashboard' | 'customer-detail' | 'rewards' | 'outreach' | 'wa-command' | 'insights'

const NAV = [
  { label: 'New Customer', icon: 'M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H9V11M15,11H17V13H15V11M19,11H21V13H19V11M1,21H23L12,10L1,21Z', view: 'checkin-flow' as View },
  { label: 'Repeat Customer', icon: 'M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z', view: 'repeat-flow' as View },
  { label: 'Dashboard', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z', view: 'dashboard' as View },
  { label: 'Rewards', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z', view: 'rewards' as View },
  { label: 'Outreach', icon: 'M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z', view: 'outreach' as View },
  { label: 'WA Command Center', icon: 'M17.472,14.382c-0.297,0.297-0.626,0.569-0.987,0.816c-1.158,0.795-2.517,1.219-3.935,1.227c-1.415,0.008-2.86-0.396-4.115-1.146l-3.77,0.988l1.009-3.678c-0.764-1.264-1.148-2.696-1.117-4.135c0.031-1.438,0.466-2.852,1.264-4.098c0.797-1.246,1.933-2.31,3.292-3.088c1.359-0.778,2.905-1.152,4.477-1.084c1.572,0.068,3.08,0.578,4.366,1.477c1.286,0.899,2.315,2.158,2.983,3.647c0.668,1.489,0.859,3.146,0.552,4.801C19.177,12.106,18.557,13.294,17.472,14.382z', view: 'wa-command' as View },
  { label: 'Insights', icon: 'M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8L16,11.78Z', view: 'insights' as View },
]

const NAV_OTHER = [
  { label: 'Manage Brand/Stores', icon: 'M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z' },
  { label: 'Download QR Code', icon: 'M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H9V11M15,11H17V13H15V11M19,11H21V13H19V11M1,21H23L12,10L1,21Z' },
  { label: 'Marketing Campaigns', icon: 'M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V22H19V19H5V22H3V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M14,9H10A5,5 0 0,0 5,14H19A5,5 0 0,0 14,9Z' },
  { label: 'Payments & Invoices', icon: 'M11.8,10.9C9.53,10.31 8.8,9.7 8.8,8.75C8.8,7.66 9.81,6.9 11.5,6.9C13.28,6.9 13.94,7.75 14,9H16.21C16.14,7.28 15.09,5.7 13,5.19V3H10V5.16C8.06,5.58 6.5,6.84 6.5,8.77C6.5,11.08 8.41,12.23 11.2,12.9C13.7,13.5 14.2,14.38 14.2,15.31C14.2,16 13.71,17.1 11.5,17.1C9.44,17.1 8.63,16.18 8.5,15H6.32C6.44,17.19 8.08,18.42 10,18.83V21H13V18.85C14.95,18.5 16.5,17.35 16.5,15.3C16.5,12.46 14.07,11.5 11.8,10.9Z' },
  { label: 'Settings', icon: 'M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.97 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.95C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.95L19.05,18.95C19.27,19.04 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z' },
]

// ─── COMPONENT ──────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [activeView, setActiveView] = useState<View>('checkin-flow')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedCustomer, setSelectedCustomer] = useState<typeof mockCustomers[0] | null>(null)
  const [customerTab, setCustomerTab] = useState<'profile' | 'journey' | 'assist' | 'billing'>('profile')
  const [checkinStep, setCheckinStep] = useState<1 | 2 | 3 | 4>(1)
  const [repeatStep, setRepeatStep] = useState<1 | 2 | 3 | 4>(1)
  const [expandedCard, setExpandedCard] = useState<string | null>('C001')
  const [expandedChannel, setExpandedChannel] = useState<string | null>(null)
  const [expandedTier, setExpandedTier] = useState<string | null>(null)
  const [manualCheckin, setManualCheckin] = useState(false)
  const [audienceFilters, setAudienceFilters] = useState<Record<string, boolean>>({ all: true })
  const [waTab, setWaTab] = useState<'overview' | 'conversations' | 'templates' | 'analytics'>('overview')
  const [activeChat, setActiveChat] = useState<string>('Meera Kapoor')
  const [aiMode, setAiMode] = useState(true)
  const [replyText, setReplyText] = useState('')
  const [taggedItems, setTaggedItems] = useState<string[]>([])
  const [staffNote, setStaffNote] = useState('')
  const [pointsApplied, setPointsApplied] = useState(false)
  const [billDone, setBillDone] = useState(false)
  const [outreachModal, setOutreachModal] = useState<typeof mockCustomers[0] | null>(null)
  const [outreachTemplate, setOutreachTemplate] = useState(outreachTemplates[0])
  const [outreachSent, setOutreachSent] = useState(false)

  const tierBadge = (tier: string) => {
    if (tier === 'Platinum') return 'bg-blue-800 text-white'
    if (tier === 'Gold') return 'bg-blue-600 text-white'
    return 'bg-blue-100 text-blue-700'
  }

  const fillTemplate = (t: typeof outreachTemplates[0], c: typeof mockCustomers[0]) =>
    t.body
      .replace('{{name}}', c.name.split(' ')[0])
      .replace('{{tier}}', c.tier)
      .replace('{{wishlist_item}}', c.wishlist[0])
      .replace('{{points}}', String(c.points))
      .replace('{{points_value}}', String(Math.floor(c.points / 10)))
      .replace('{{expiry}}', '30 Apr 2026')

  const openCustomer = (c: typeof mockCustomers[0], tab: typeof customerTab = 'profile') => {
    setSelectedCustomer(c)
    setCustomerTab(tab)
    setTaggedItems([])
    setStaffNote('')
    setPointsApplied(false)
    setBillDone(false)
    setActiveView('customer-detail')
  }

  const openOutreach = (c: typeof mockCustomers[0], tmpl = outreachTemplates[0]) => {
    setOutreachTemplate(tmpl)
    setOutreachSent(false)
    setOutreachModal(c)
  }

  // ── CHECK-IN FLOW ──────────────────────────────────────────────────────────

  const renderCheckinFlow = () => {
    const steps = [
      { n: 1 as const, label: 'Store QR Code' },
      { n: 2 as const, label: 'Customer Scans & Fills Form' },
      { n: 3 as const, label: 'Check-In Confirmed' },
      { n: 4 as const, label: 'Retailer Sees Live Customer' },
    ]
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Customer Check-In Flow</h1>
        <p className="text-gray-500 text-sm mb-5">The complete journey from store entrance to live dashboard — no app required.</p>

        {/* Step indicator */}
        <div className="flex items-center space-x-2 mb-6">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center">
              <button onClick={() => setCheckinStep(s.n)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${checkinStep === s.n ? 'bg-blue-600 text-white' : checkinStep > s.n ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${checkinStep === s.n ? 'bg-white text-blue-600' : checkinStep > s.n ? 'bg-blue-600 text-white' : 'bg-gray-300 text-white'}`}>{checkinStep > s.n ? '✓' : s.n}</span>
                <span>{s.label}</span>
              </button>
              {i < steps.length - 1 && <div className={`w-8 h-0.5 mx-1 ${checkinStep > s.n ? 'bg-blue-400' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* ── Step 1: QR Code ── */}
        {checkinStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Store QR Code</h2>
              <p className="text-gray-500 text-sm mb-5">Each MODENX partner store gets a unique QR code displayed at the entrance. Customers scan with their phone camera — no app download required.</p>
              <div className="space-y-3">
                {[
                  { icon: '🔐', title: 'Unique per Store', desc: 'Every retailer gets a QR linked to their MODENX account and store location' },
                  { icon: '📲', title: 'No App Needed', desc: 'Opens instantly in the customer&apos;s mobile browser — zero friction' },
                  { icon: '⚡', title: 'Instant Dashboard Ping', desc: 'The retailer gets a real-time notification the moment anyone scans' },
                  { icon: '📡', title: 'Multi-Channel Capture', desc: 'Phone, email, Instagram, and preferences — all in one 30-second form' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3 border border-gray-200 rounded-lg p-3">
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div><p className="font-semibold text-gray-900 text-sm">{item.title}</p><p className="text-gray-500 text-xs mt-0.5">{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="border border-gray-200 rounded-2xl p-6 w-72 text-center shadow-sm">
                <div className="bg-blue-600 rounded-xl p-4 mb-4">
                  <p className="text-yellow-400 font-bold italic text-lg">modenX</p>
                  <p className="text-blue-200 text-xs mt-0.5">Ensemble · HSR Layout, Bengaluru</p>
                </div>
                <div className="border-2 border-gray-200 rounded-xl p-3 mb-4 mx-auto w-44 h-44 flex items-center justify-center relative bg-white">
                  <div className="grid grid-cols-7 gap-0.5 w-36 h-36">
                    {Array.from({ length: 49 }).map((_, i) => {
                      const corner = [0,1,7,8,5,6,13,14,35,36,43,44,40,41,47,48].includes(i)
                      const rand = [2,10,18,22,25,30,33,38,46,3,19,27,31].includes(i)
                      return <div key={i} className={`w-full h-full ${corner ? 'bg-blue-700' : rand ? 'bg-blue-900' : 'bg-white'}`} />
                    })}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-1 rounded shadow"><div className="bg-blue-600 w-8 h-8 rounded flex items-center justify-center"><span className="text-white font-black text-xs">MX</span></div></div>
                  </div>
                </div>
                <button className="w-full border-2 border-blue-600 text-blue-600 font-semibold py-2 rounded-lg text-sm hover:bg-blue-50 mb-2">Download QR Code</button>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-blue-600 font-medium">Store Open · 47 scans today</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: Customer Form ── */}
        {checkinStep === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Customer Fills Check-In Form</h2>
              <p className="text-gray-500 text-sm mb-5">After scanning, a lightweight web form opens. This is where we capture all the data needed to reach the customer on every channel.</p>
              <div className="border border-blue-100 bg-blue-50 rounded-lg p-4 mb-4">
                <p className="text-blue-800 font-semibold text-sm">How We Capture Each Channel</p>
                <div className="mt-2 space-y-2">
                  {[
                    { ch: '💬 WhatsApp + 📱 SMS + 💎 RCS', how: 'Phone number (required field) — auto-enables all 3' },
                    { ch: '📧 Email', how: 'Optional field on check-in form — 78% of customers provide it' },
                    { ch: '📸 Instagram', how: 'Optional field + "Follow us" CTA — or staff adds it later from the profile' },
                  ].map((c, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs">
                      <span className="font-semibold text-blue-700 flex-shrink-0">{c.ch}</span>
                      <span className="text-blue-600">→ {c.how}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                {[
                  'Customer scans QR → browser opens form instantly',
                  'Returning customer auto pre-filled via phone lookup',
                  'New customer fills details in ~30 seconds',
                  'WhatsApp + email opt-in captured with consent',
                  'Instagram handle is optional but incentivised (bonus points)',
                ].map((step, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
                    <p className="text-sm text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Phone mockup */}
            <div className="flex justify-center">
              <div className="w-72 bg-gray-900 rounded-3xl p-3 shadow-2xl">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="bg-gray-800 px-4 py-1.5 flex justify-between"><span className="text-white text-xs">9:41 AM</span><span className="text-white text-xs">●●●</span></div>
                  <div className="bg-gray-100 px-3 py-1.5"><div className="bg-white rounded text-xs text-gray-500 px-2 py-0.5">checkin.modenx.in/ensemble</div></div>
                  <div className="p-4">
                    <div className="text-center mb-3">
                      <p className="text-blue-600 font-bold italic text-base">modenX</p>
                      <p className="text-gray-500 text-xs">Ensemble · HSR Layout</p>
                    </div>
                    <div className="space-y-2.5">
                      <div><p className="text-xs text-gray-500 font-medium">Full Name *</p><div className="border border-gray-300 rounded px-2 py-1.5 text-xs bg-gray-50 mt-0.5">Meera Kapoor</div></div>
                      <div><p className="text-xs text-gray-500 font-medium">WhatsApp Number *</p><div className="border border-gray-300 rounded px-2 py-1.5 text-xs bg-gray-50 mt-0.5">+91 98765 43210</div></div>
                      <div><p className="text-xs text-gray-500 font-medium">Email</p><div className="border border-gray-300 rounded px-2 py-1.5 text-xs bg-gray-50 mt-0.5">meera.kapoor@gmail.com</div></div>
                      <div><p className="text-xs text-gray-500 font-medium">Instagram Handle</p><div className="border border-gray-300 rounded px-2 py-1.5 text-xs bg-gray-50 mt-0.5">@meera.stylefiles</div></div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">I like</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {['Ethnic Wear', 'Western', 'Formals', 'Bags', 'Jewellery'].map(p => (
                            <span key={p} className={`text-xs px-2 py-0.5 rounded-full border ${['Ethnic Wear'].includes(p) ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-500'}`}>{p}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 bg-blue-50 rounded p-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-sm flex items-center justify-center mt-0.5 flex-shrink-0">
                          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        </div>
                        <p className="text-xs text-blue-700">I agree to receive offers via WhatsApp, Email &amp; SMS</p>
                      </div>
                      <button className="w-full bg-blue-600 text-white text-sm font-semibold py-2 rounded-lg">Check In ✓</button>
                      <p className="text-center text-xs text-gray-400">🎁 Share Instagram &amp; get 50 bonus pts!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 3: Confirmation ── */}
        {checkinStep === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Check-In Confirmed</h2>
              <p className="text-gray-500 text-sm mb-5">The customer sees a personalised welcome screen. Simultaneously, the retailer gets an instant ping on their dashboard.</p>

              <div className="border border-gray-200 rounded-xl p-5 mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-3">Retailer sees this notification instantly:</p>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">MK</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">Meera Kapoor checked in</p>
                    <p className="text-gray-500 text-xs">Gold · 7 visits · Loves Ethnic Wear · Wedding in May</p>
                  </div>
                  <span className="text-xs text-blue-600 font-medium">Just now</span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Channels captured at check-in:</p>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { icon: '💬', label: 'WhatsApp', on: true },
                    { icon: '📱', label: 'SMS', on: true },
                    { icon: '📧', label: 'Email', on: true },
                    { icon: '📸', label: 'Instagram', on: true },
                    { icon: '💎', label: 'RCS', on: true },
                  ].map(ch => (
                    <div key={ch.label} className={`rounded-lg p-2 text-center ${ch.on ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-dashed border-gray-200'}`}>
                      <p className="text-lg">{ch.icon}</p>
                      <p className="text-xs font-medium text-gray-700">{ch.label}</p>
                      <p className="text-xs text-blue-600 mt-0.5">✓</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">All 5 outreach channels unlocked from a single 30-second form</p>
              </div>
            </div>

            {/* Customer phone confirmation */}
            <div className="flex justify-center">
              <div className="w-72 bg-gray-900 rounded-3xl p-3 shadow-2xl">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="bg-gray-800 px-4 py-1.5 flex justify-between"><span className="text-white text-xs">9:41 AM</span><span className="text-white text-xs">●●●</span></div>
                  <div className="p-6 text-center">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-7 h-7 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    </div>
                    <p className="text-blue-600 font-bold italic mb-1">modenX</p>
                    <p className="text-xl font-bold text-gray-900">Welcome back,</p>
                    <p className="text-xl font-bold text-blue-600 mb-3">Meera! 🎉</p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                      <p className="text-blue-800 font-semibold text-sm">🏆 Gold Member</p>
                      <p className="text-blue-600 text-xs mt-0.5">2,450 points · ₹245 off today</p>
                    </div>
                    <div className="text-left space-y-1.5 text-xs text-gray-600">
                      <div className="flex justify-between"><span>Total Visits</span><span className="font-semibold text-gray-900">7 times</span></div>
                      <div className="flex justify-between"><span>Connected Channels</span><span className="font-semibold text-gray-900">💬 📱 📧 📸 💎</span></div>
                      <div className="flex justify-between"><span>Bonus Points Earned</span><span className="font-semibold text-blue-600">+50 pts (Instagram)</span></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">Enjoy your shopping!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 4: Live on Dashboard (Grid View) ── */}
        {checkinStep === 4 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Customer Appears on Live Dashboard</h2>
                <p className="text-gray-500 text-sm mt-1">Click any card to expand full details. The retailer sees everyone in-store at a glance.</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-blue-600">3 in store now</span>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              {mockCustomers.map((c, i) => {
                const isExpanded = expandedCard === c.id
                return (
                  <div key={c.id}
                    className={`border-2 rounded-2xl overflow-hidden transition-all cursor-pointer ${isExpanded ? 'border-blue-600 shadow-lg md:col-span-3' : 'border-gray-200 hover:border-blue-300'}`}
                    onClick={() => setExpandedCard(isExpanded ? null : c.id)}>

                    {/* Card header — always visible */}
                    <div className={`p-4 ${isExpanded ? 'bg-blue-600 text-white' : 'bg-white'}`}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${isExpanded ? 'bg-white text-blue-700' : 'bg-blue-600 text-white'}`}>{c.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 flex-wrap">
                            <p className={`font-bold ${isExpanded ? 'text-white' : 'text-gray-900'}`}>{c.name}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isExpanded ? 'bg-white text-blue-700' : tierBadge(c.tier)}`}>{c.tier}</span>
                            {i === 0 && <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isExpanded ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700'}`}>Just checked in</span>}
                          </div>
                          <p className={`text-xs mt-0.5 ${isExpanded ? 'text-blue-200' : 'text-gray-500'}`}>{c.phone} · Checked in {c.checkInTime}</p>
                        </div>
                        <svg className={`w-5 h-5 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180 text-blue-200' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>

                      {/* Collapsed mini-info */}
                      {!isExpanded && (
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center space-x-1.5">
                            {c.preferences.map(p => <span key={p} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{p}</span>)}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              {[{ i: '💬', o: c.channels.whatsapp }, { i: '📱', o: c.channels.sms }, { i: '📧', o: c.channels.email }, { i: '📸', o: c.channels.instagram }].map((ch, j) => (
                                <span key={j} className={`text-xs ${ch.o ? '' : 'opacity-20'}`}>{ch.i}</span>
                              ))}
                            </div>
                            <span className="text-xs font-semibold text-blue-600">{c.points.toLocaleString()} pts</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Expanded content */}
                    {isExpanded && (
                      <div className="bg-white p-5" onClick={(e) => e.stopPropagation()}>
                        <div className="grid grid-cols-4 gap-4 mb-4">
                          <div className="bg-blue-50 rounded-xl p-3 text-center">
                            <p className="text-2xl font-black text-blue-600">{c.points.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Points</p>
                          </div>
                          <div className="bg-blue-50 rounded-xl p-3 text-center">
                            <p className="text-2xl font-black text-blue-600">{c.visits}</p>
                            <p className="text-xs text-gray-500">Visits</p>
                          </div>
                          <div className="bg-blue-50 rounded-xl p-3 text-center">
                            <p className="text-2xl font-black text-blue-600">{c.totalSpend}</p>
                            <p className="text-xs text-gray-500">Lifetime</p>
                          </div>
                          <div className="bg-blue-50 rounded-xl p-3 text-center">
                            <p className="text-2xl font-black text-blue-600">{c.channels.whatsapp && c.channels.email && c.channels.instagram ? '5' : c.channels.email ? '4' : '3'}</p>
                            <p className="text-xs text-gray-500">Channels</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-xs font-semibold text-gray-500 mb-1.5">🛍️ Preferences</p>
                            <div className="flex flex-wrap gap-1">{c.preferences.map(p => <span key={p} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{p}</span>)}</div>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 mb-1.5">❤️ Wishlist</p>
                            {c.wishlist.map(w => <p key={w} className="text-xs text-gray-700">• {w}</p>)}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 mb-1.5">📅 Occasions</p>
                            {c.occasions.map(o => <p key={o} className="text-xs text-gray-700 bg-blue-50 rounded px-2 py-0.5 mb-1">{o}</p>)}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-xs font-semibold text-gray-500 mb-1.5">🕐 Last Purchase</p>
                            <p className="text-sm text-gray-900">{c.lastPurchase}</p>
                            <p className="text-xs text-gray-400">{c.lastVisit}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 mb-1.5">👤 Last Assisted By</p>
                            <p className="text-sm text-gray-900 font-medium">{c.assistedBy}</p>
                            <p className="text-xs text-gray-400">{c.lastAssistDate}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 mb-1.5">📝 Staff Note</p>
                            <p className="text-sm text-gray-700 italic">&ldquo;{c.notes}&rdquo;</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button onClick={() => openCustomer(c)} className="flex-1 text-xs border-2 border-blue-600 text-blue-600 py-2 rounded-xl font-semibold hover:bg-blue-50">👤 Full Profile</button>
                          <button onClick={() => openCustomer(c, 'assist')} className="flex-1 text-xs bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700">🛍️ Assist</button>
                          <button onClick={() => openCustomer(c, 'billing')} className="flex-1 text-xs bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700">🧾 Bill</button>
                          <button onClick={() => openOutreach(c)} className="flex-1 text-xs bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700">📡 Reach Out</button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Nav buttons */}
        <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-200">
          <button onClick={() => checkinStep > 1 && setCheckinStep((checkinStep - 1) as any)} disabled={checkinStep === 1}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg border-2 border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            <span>Previous</span>
          </button>
          <span className="text-sm text-gray-400">Step {checkinStep} of 4</span>
          {checkinStep < 4 ? (
            <button onClick={() => setCheckinStep((checkinStep + 1) as any)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
              <span>Next</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          ) : (
            <button onClick={() => setActiveView('dashboard')}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
              <span>Go to Dashboard</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          )}
        </div>
      </div>
    )
  }

  // ── REPEAT CUSTOMER FLOW (Tier B — Quick Confirm) ──────────────────────────

  const renderRepeatFlow = () => {
    const rc = mockCustomers[0] // Meera Kapoor as the repeat customer
    const steps = [
      { n: 1 as const, label: 'Customer Scans QR' },
      { n: 2 as const, label: 'Instant Recognition' },
      { n: 3 as const, label: 'Personalized Welcome' },
      { n: 4 as const, label: 'Staff Gets Rich Brief' },
    ]
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Repeat Customer Flow</h1>
        <p className="text-gray-500 text-sm mb-5">When a known customer scans the QR again — zero forms, instant recognition, personalized welcome.</p>

        {/* Step indicator */}
        <div className="flex items-center space-x-2 mb-6">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center">
              <button onClick={() => setRepeatStep(s.n)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${repeatStep === s.n ? 'bg-blue-600 text-white' : repeatStep > s.n ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${repeatStep === s.n ? 'bg-white text-blue-600' : repeatStep > s.n ? 'bg-blue-600 text-white' : 'bg-gray-300 text-white'}`}>{repeatStep > s.n ? '✓' : s.n}</span>
                <span>{s.label}</span>
              </button>
              {i < steps.length - 1 && <div className={`w-8 h-0.5 mx-1 ${repeatStep > s.n ? 'bg-blue-400' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* ── Step 1: Scans QR ── */}
        {repeatStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Meera Scans the Store QR — Again</h2>
              <p className="text-gray-500 text-sm mb-5">This is her 8th visit. She scans the same QR at the entrance. But this time, the system already knows who she is.</p>
              <div className="space-y-3">
                {[
                  { icon: '🔍', title: 'Phone / Browser Fingerprint Match', desc: 'System detects her instantly from the last check-in — no form needed' },
                  { icon: '⚡', title: 'Zero Fields, Zero Friction', desc: 'She never sees the registration form again. Straight to welcome.' },
                  { icon: '🧠', title: 'Full Context Loaded', desc: 'Tier, points, wishlist, occasions, staff notes — all recalled in milliseconds' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3 border border-gray-200 rounded-lg p-3">
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div><p className="font-semibold text-gray-900 text-sm">{item.title}</p><p className="text-gray-500 text-xs mt-0.5">{item.desc}</p></div>
                  </div>
                ))}
              </div>
              <div className="mt-5 bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-sm font-semibold text-blue-800">New Customer vs Repeat — The Difference</p>
                <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <p className="font-semibold text-gray-500 mb-1">New Customer</p>
                    <p className="text-gray-700">Full form → 30 seconds</p>
                    <p className="text-gray-400">Name, phone, email, IG, preferences</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-blue-300">
                    <p className="font-semibold text-blue-600 mb-1">Repeat Customer</p>
                    <p className="text-gray-700">One tap → 3 seconds</p>
                    <p className="text-gray-400">Auto-recognized, confirm &amp; go</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-72 bg-gray-900 rounded-3xl p-3 shadow-2xl">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="bg-gray-800 px-4 py-1.5 flex justify-between"><span className="text-white text-xs">10:31 AM</span><span className="text-white text-xs">●●●</span></div>
                  <div className="p-8 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <p className="text-blue-600 font-bold italic mb-2">modenX</p>
                    <p className="text-sm font-medium text-gray-700">Recognizing you...</p>
                    <p className="text-xs text-gray-400 mt-1">Matching phone number</p>
                    <div className="mt-4 flex justify-center space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: Quick Confirm ── */}
        {repeatStep === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Instant Recognition — One-Tap Confirm</h2>
              <p className="text-gray-500 text-sm mb-5">System matches her phone. Instead of a form, she sees a pre-filled card with her profile. One tap and she&apos;s checked in.</p>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
                <p className="text-sm font-semibold text-blue-800 mb-2">What Gets Loaded Automatically</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    '🏆 Tier: Gold Member',
                    '💰 Points: 2,450 (₹245 value)',
                    '🛍️ Prefers: Ethnic Wear, Accessories',
                    '📅 Occasion: Wedding (May 2026)',
                    '❤️ Wishlist: Chanderi Dupatta',
                    '📝 Staff Note: Prefers muted tones',
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded px-2 py-1.5 text-gray-700">{item}</div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500">She can also update her email or Instagram if she hasn&apos;t shared them yet — but it&apos;s optional, not blocking.</p>
            </div>
            <div className="flex justify-center">
              <div className="w-72 bg-gray-900 rounded-3xl p-3 shadow-2xl">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="bg-gray-800 px-4 py-1.5 flex justify-between"><span className="text-white text-xs">10:31 AM</span><span className="text-white text-xs">●●●</span></div>
                  <div className="p-5">
                    <p className="text-blue-600 font-bold italic text-center mb-3">modenX</p>
                    <div className="text-center mb-4">
                      <p className="text-sm text-gray-500">Welcome back!</p>
                      <p className="text-lg font-bold text-gray-900">Is this you?</p>
                    </div>
                    {/* Profile card */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-3">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">MK</div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{rc.name}</p>
                          <p className="text-xs text-gray-500">{rc.phone}</p>
                        </div>
                        <span className="ml-auto text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-medium">🏆 Gold</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-white rounded px-2 py-1.5"><span className="text-gray-400">Points</span><p className="font-semibold text-gray-900">2,450 pts</p></div>
                        <div className="bg-white rounded px-2 py-1.5"><span className="text-gray-400">Visits</span><p className="font-semibold text-gray-900">7 times</p></div>
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 text-white text-sm font-bold py-2.5 rounded-xl mb-2">Yes, Check Me In ✓</button>
                    <button className="w-full text-xs text-blue-600 py-1.5 hover:underline">Not me? Use a different number</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 3: Personalized Welcome ── */}
        {repeatStep === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Personalized Welcome — Not Generic</h2>
              <p className="text-gray-500 text-sm mb-5">After one tap, Meera sees a welcome screen tailored to HER — with active offers, wishlist alerts, and her points balance. Plus, auto-triggers fire behind the scenes.</p>
              <div className="border border-gray-200 rounded-xl p-4 mb-4">
                <p className="font-semibold text-gray-900 text-sm mb-3">Auto-Triggers on Check-In</p>
                <div className="space-y-2">
                  {[
                    { icon: '💬', trigger: 'Welcome Back WhatsApp sent', detail: '"Hi Meera! 15% OFF today as our Gold member. Show at billing."' },
                    { icon: '❤️', trigger: 'Wishlist stock matched', detail: 'Chanderi Dupatta is in stock → shown on welcome screen' },
                    { icon: '🏆', trigger: 'Visit streak bonus applied', detail: '+50 bonus points for 3rd visit this month' },
                    { icon: '📅', trigger: 'Occasion surfaced to staff', detail: '"Wedding in May — show bridal collection"' },
                  ].map((t, i) => (
                    <div key={i} className="flex items-start space-x-3 bg-blue-50 rounded-lg p-3">
                      <span className="text-lg flex-shrink-0">{t.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900 text-xs">{t.trigger}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{t.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-72 bg-gray-900 rounded-3xl p-3 shadow-2xl">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="bg-gray-800 px-4 py-1.5 flex justify-between"><span className="text-white text-xs">10:32 AM</span><span className="text-white text-xs">●●●</span></div>
                  <div className="p-4">
                    <div className="text-center mb-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      </div>
                      <p className="text-blue-600 font-bold italic text-sm">modenX</p>
                      <p className="text-lg font-bold text-gray-900">Welcome back, Meera!</p>
                    </div>

                    {/* Tier + Points */}
                    <div className="bg-blue-600 text-white rounded-xl p-3 mb-3 text-center">
                      <p className="text-xs text-blue-200">🏆 Gold Member · Visit #8</p>
                      <p className="text-2xl font-black mt-0.5">2,500 pts</p>
                      <p className="text-xs text-blue-200">₹250 redeemable today</p>
                    </div>

                    {/* Active offer */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-2">
                      <p className="text-xs font-bold text-blue-700">🎉 TODAY&apos;S OFFER</p>
                      <p className="text-sm font-bold text-gray-900 mt-0.5">15% OFF (Gold Exclusive)</p>
                      <p className="text-xs text-gray-500">+ Weekend Double Points active</p>
                    </div>

                    {/* Wishlist alert */}
                    <div className="bg-white border border-gray-200 rounded-xl p-3 mb-2">
                      <p className="text-xs font-bold text-gray-700">❤️ FROM YOUR WISHLIST</p>
                      <p className="text-sm text-gray-900 mt-0.5">Chanderi Dupatta — <span className="text-blue-600 font-semibold">In Stock!</span></p>
                    </div>

                    {/* Visit purpose */}
                    <p className="text-xs text-gray-500 text-center mb-2">What brings you in today?</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {['Wedding Shopping', 'Just Browsing', 'Redeem Points', 'Returns'].map(p => (
                        <button key={p} className="text-xs border border-gray-200 rounded-lg py-1.5 text-gray-700 hover:bg-blue-50 hover:border-blue-300">{p}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 4: Staff Rich Brief ── */}
        {repeatStep === 4 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Staff Gets a Rich Customer Brief</h2>
            <p className="text-gray-500 text-sm mb-5">The moment Meera checks in, her staff sees everything they need to deliver a personalized experience — before they even approach her.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Staff notification */}
              <div className="lg:col-span-2 border-2 border-blue-600 rounded-2xl overflow-hidden">
                <div className="bg-blue-600 px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <p className="text-white font-semibold text-sm">🔔 Returning Customer Alert</p>
                  </div>
                  <span className="text-blue-200 text-xs">Just now</span>
                </div>
                <div className="p-5">
                  {/* Identity */}
                  <div className="flex items-center space-x-4 mb-4 pb-4 border-b border-gray-100">
                    <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-xl">MK</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="text-lg font-bold text-gray-900">{rc.name}</p>
                        <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-medium">🏆 Gold</span>
                      </div>
                      <p className="text-sm text-gray-500">{rc.phone} · Visit #8 · Lifetime: {rc.totalSpend}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        {['💬', '📱', '📧', '📸'].map((ch, j) => <span key={j} className="text-sm">{ch}</span>)}
                        <span className="text-xs text-gray-400 ml-1">All channels connected</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-blue-600">{rc.points.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">reward points</p>
                    </div>
                  </div>

                  {/* Context grid */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-1.5">🛍️ PREFERENCES</p>
                      <div className="flex flex-wrap gap-1">
                        {rc.preferences.map(p => <span key={p} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{p}</span>)}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-1.5">📅 HERE FOR</p>
                      <p className="text-sm font-medium text-gray-900">{rc.occasions[0]}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Selected at check-in</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-1.5">🕐 LAST PURCHASE</p>
                      <p className="text-sm font-medium text-gray-900">{rc.lastPurchase}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{rc.lastVisit}</p>
                    </div>
                  </div>

                  {/* Wishlist + Staff Note */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                      <p className="text-xs font-semibold text-blue-700 mb-1.5">❤️ WISHLIST (IN STOCK)</p>
                      {rc.wishlist.map(w => (
                        <div key={w} className="flex items-center space-x-2 text-sm text-gray-900 mb-1">
                          <span className="text-blue-500">✓</span><span>{w}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3">
                      <p className="text-xs font-semibold text-gray-600 mb-1.5">📝 STAFF NOTE (LAST VISIT)</p>
                      <p className="text-sm text-gray-700 italic">&ldquo;{rc.notes}&rdquo;</p>
                    </div>
                  </div>

                  {/* Suggested greeting */}
                  <div className="bg-gray-900 text-white rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">💡 SUGGESTED GREETING (assign to: <span className="text-blue-400 font-semibold">{rc.assistedBy}</span>)</p>
                    <p className="text-sm leading-relaxed">&ldquo;Welcome back, Meera! It&apos;s {rc.assistedBy.split(' ')[0]} again. The Chanderi Dupatta you were eyeing is in aisle 3. Since you&apos;re here for the wedding — we just got a new bridal collection I think you&apos;ll love.&rdquo;</p>
                  </div>
                </div>
              </div>

              {/* Right: actions */}
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="font-semibold text-gray-900 text-sm mb-3">Quick Staff Actions</p>
                  <div className="space-y-2">
                    <button onClick={() => openCustomer(rc, 'assist')} className="w-full text-left text-xs px-3 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">🛍️ Start In-Store Assist</button>
                    <button onClick={() => openCustomer(rc)} className="w-full text-left text-xs px-3 py-2.5 border border-gray-200 rounded-lg hover:bg-blue-50">👤 View Full Profile</button>
                    <button onClick={() => openCustomer(rc, 'billing')} className="w-full text-left text-xs px-3 py-2.5 border border-gray-200 rounded-lg hover:bg-blue-50">🧾 Quick Bill</button>
                    <button onClick={() => openOutreach(rc)} className="w-full text-left text-xs px-3 py-2.5 border border-gray-200 rounded-lg hover:bg-blue-50">📡 Send Message</button>
                  </div>
                </div>
                <div className="border border-blue-100 bg-blue-50 rounded-xl p-4">
                  <p className="font-semibold text-gray-900 text-sm mb-2">Auto-Actions Fired</p>
                  <div className="space-y-1.5">
                    {[
                      '✅ Welcome WhatsApp sent',
                      '✅ 15% Gold offer applied',
                      '✅ Weekend 2x points active',
                      '✅ +50 visit streak bonus',
                      '✅ Wishlist stock matched',
                    ].map((a, i) => (
                      <p key={i} className="text-xs text-blue-700">{a}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Nav buttons */}
        <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-200">
          <button onClick={() => repeatStep > 1 && setRepeatStep((repeatStep - 1) as any)} disabled={repeatStep === 1}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg border-2 border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            <span>Previous</span>
          </button>
          <span className="text-sm text-gray-400">Step {repeatStep} of 4</span>
          {repeatStep < 4 ? (
            <button onClick={() => setRepeatStep((repeatStep + 1) as any)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
              <span>Next</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          ) : (
            <button onClick={() => { setSelectedCustomer(rc); setActiveView('customer-detail'); setCustomerTab('profile') }}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
              <span>Open Meera&apos;s Profile</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          )}
        </div>
      </div>
    )
  }

  // ── DASHBOARD ─────────────────────────────────────────────────────────────

  const renderDashboard = () => (
    <div>
      {/* ── Unified stats: check-in + rewards + outreach + revenue ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'In Store Now', value: '3', sub: '47 check-ins today', link: 'checkin-flow' as View },
          { label: 'Revenue Today', value: '₹38,420', sub: '18 purchases · 68% CVR', link: null },
          { label: 'Points Issued Today', value: '1,920', sub: '5% reward rate active', link: 'rewards' as View },
          { label: 'Outreach Sent (7d)', value: '142', sub: '💬87 📧31 📸14 📱10', link: 'outreach' as View },
        ].map((s, i) => (
          <div key={i} onClick={() => s.link && setActiveView(s.link)} className={`bg-white border border-gray-200 rounded-xl p-4 ${s.link ? 'cursor-pointer hover:border-blue-300 hover:bg-blue-50' : ''} transition-all`}>
            <p className="text-xs text-gray-500 font-medium">{s.label}</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Manual check-in button */}
      <div className="flex items-center justify-end mb-4">
        <button onClick={() => setManualCheckin(true)} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
          <span>Manual Check-In</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ── Live customers (2 cols) ── */}
        <div className="lg:col-span-2 space-y-5">
          {/* Live Customers header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <p className="font-semibold text-gray-900 text-sm">Live Customers</p>
            </div>
            <div className="flex space-x-2">
              {['Now', '12h', '24h', '1w'].map((f, i) => (
                <button key={f} className={`text-xs px-2.5 py-1 rounded-lg ${i === 0 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{f}</button>
              ))}
            </div>
          </div>

          {/* Grid of expandable cards */}
          <div className="grid grid-cols-1 gap-3">
            {mockCustomers.map((c) => {
              const isOpen = expandedCard === c.id
              return (
                <div key={c.id} className={`border-2 rounded-xl overflow-hidden transition-all ${isOpen ? 'border-blue-600 shadow-md' : 'border-gray-200 hover:border-blue-300'}`}>
                  {/* Collapsed row — always visible */}
                  <div className={`flex items-center space-x-3 px-4 py-3 cursor-pointer ${isOpen ? 'bg-blue-600 text-white' : 'bg-white hover:bg-blue-50'}`}
                    onClick={() => setExpandedCard(isOpen ? null : c.id)}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${isOpen ? 'bg-white text-blue-700' : 'bg-blue-600 text-white'}`}>{c.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 flex-wrap">
                        <p className={`font-bold text-sm ${isOpen ? 'text-white' : 'text-gray-900'}`}>{c.name}</p>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${isOpen ? 'bg-white text-blue-700' : tierBadge(c.tier)}`}>{c.tier}</span>
                        <span className={`text-xs ${isOpen ? 'text-blue-200' : 'text-gray-400'}`}>{c.points.toLocaleString()} pts</span>
                      </div>
                      <p className={`text-xs mt-0.5 ${isOpen ? 'text-blue-200' : 'text-gray-500'}`}>{c.preferences.join(', ')} · {c.occasions[0]}</p>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {!isOpen && (
                        <>
                          <button onClick={(e) => { e.stopPropagation(); openOutreach(c) }} className="text-xs border border-blue-600 text-blue-600 px-2 py-1 rounded-lg hover:bg-blue-50">Reach Out</button>
                          <button onClick={(e) => { e.stopPropagation(); openCustomer(c, 'assist') }} className="text-xs bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-700">Assist</button>
                        </>
                      )}
                      <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180 text-blue-200' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isOpen && (
                    <div className="bg-white p-4" onClick={(e) => e.stopPropagation()}>
                      {/* Stats row */}
                      <div className="grid grid-cols-4 gap-3 mb-4">
                        {[
                          { val: c.points.toLocaleString(), label: 'Points' },
                          { val: String(c.visits), label: 'Visits' },
                          { val: c.totalSpend, label: 'Lifetime' },
                          { val: c.channels.instagram ? '5' : '4', label: 'Channels' },
                        ].map((s, i) => (
                          <div key={i} className="bg-blue-50 rounded-lg p-2.5 text-center">
                            <p className="text-lg font-black text-blue-600">{s.val}</p>
                            <p className="text-xs text-gray-500">{s.label}</p>
                          </div>
                        ))}
                      </div>

                      {/* Details grid */}
                      <div className="grid grid-cols-4 gap-3 mb-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 mb-1">🛍️ Preferences</p>
                          <div className="flex flex-wrap gap-1">{c.preferences.map(p => <span key={p} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{p}</span>)}</div>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 mb-1">❤️ Wishlist</p>
                          {c.wishlist.map(w => <p key={w} className="text-xs text-gray-700">• {w}</p>)}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 mb-1">🕐 Last Purchase</p>
                          <p className="text-xs text-gray-900 font-medium">{c.lastPurchase}</p>
                          <p className="text-xs text-gray-400">{c.lastVisit}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 mb-1">👤 Last Assisted By</p>
                          <p className="text-xs text-gray-900 font-medium">{c.assistedBy}</p>
                          <p className="text-xs text-gray-400">{c.lastAssistDate}</p>
                        </div>
                      </div>

                      {/* Channels */}
                      <div className="flex items-center space-x-3 mb-4">
                        {[
                          { icon: '💬', label: 'WhatsApp', on: c.channels.whatsapp },
                          { icon: '📱', label: 'SMS', on: c.channels.sms },
                          { icon: '📧', label: 'Email', on: c.channels.email },
                          { icon: '📸', label: 'Instagram', on: c.channels.instagram },
                        ].map((ch, j) => (
                          <span key={j} className={`text-xs px-2 py-1 rounded-full ${ch.on ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-400'}`}>{ch.icon} {ch.label}</span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <button onClick={() => openCustomer(c)} className="flex-1 text-xs border-2 border-blue-600 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50">👤 Full Profile</button>
                        <button onClick={() => openCustomer(c, 'assist')} className="flex-1 text-xs bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">🛍️ Assist</button>
                        <button onClick={() => openCustomer(c, 'billing')} className="flex-1 text-xs bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">🧾 Bill</button>
                        <button onClick={() => openOutreach(c)} className="flex-1 text-xs bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">📡 Reach Out</button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* ── Rewards + Outreach side-by-side ── */}
          <div className="grid grid-cols-2 gap-4">
            {/* Rewards health */}
            <div className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-blue-300 transition-all" onClick={() => setActiveView('rewards')}>
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-900 text-sm">🏆 Rewards Program</p>
                <span className="text-xs text-blue-600 hover:underline">Edit →</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-gray-500">Earn Rate</span><span className="font-semibold">5% (1 pt per ₹20)</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Active Offers</span><span className="font-semibold">5 running</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Points Redeemed (30d)</span><span className="font-semibold text-blue-600">12,400 pts</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Tier Split</span>
                  <span className="font-semibold">
                    <span className="text-blue-800">12</span> Plat · <span className="text-blue-600">48</span> Gold · <span className="text-blue-400">154</span> Silver
                  </span>
                </div>
              </div>
            </div>

            {/* Outreach health */}
            <div className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-blue-300 transition-all" onClick={() => setActiveView('outreach')}>
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-900 text-sm">📡 Outreach (7 days)</p>
                <span className="text-xs text-blue-600 hover:underline">View →</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-gray-500">💬 WhatsApp</span><span className="font-semibold">87 sent · 41% CVR</span></div>
                <div className="flex justify-between"><span className="text-gray-500">📧 Email</span><span className="font-semibold">31 sent · 18% CVR</span></div>
                <div className="flex justify-between"><span className="text-gray-500">📸 Instagram</span><span className="font-semibold">14 sent · 32% CVR</span></div>
                <div className="flex justify-between"><span className="text-gray-500">📱 SMS</span><span className="font-semibold">10 sent · 28% CVR</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right sidebar ── */}
        <div className="space-y-4">
          {/* Journey funnel */}
          <div className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-blue-300 transition-all" onClick={() => setActiveView('insights')}>
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-gray-900 text-sm">📊 Weekly Journey</p>
              <span className="text-xs text-blue-600">Details →</span>
            </div>
            {[
              { step: 'Walk-In → Check-In', count: 214, pct: 100 },
              { step: 'Profile Captured', count: 198, pct: 92 },
              { step: 'Staff Assisted', count: 143, pct: 67 },
              { step: 'Purchased', count: 97, pct: 45 },
              { step: 'Returned Again', count: 61, pct: 28 },
            ].map((s, i) => (
              <div key={i} className="mb-2 last:mb-0">
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="text-gray-700">{s.step}</span>
                  <span className="font-semibold text-blue-600">{s.count}</span>
                </div>
                <div className="w-full bg-blue-50 rounded-full h-1.5">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Unified activity feed — all features */}
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="font-semibold text-gray-900 text-sm mb-3">Live Activity Feed</p>
            <div className="space-y-2.5">
              {[
                { icon: '📋', text: 'Meera Kapoor scanned QR and checked in', time: '2 min ago', tag: 'Check-In' },
                { icon: '🛍️', text: 'Staff tagged 3 items for Meera (assist)', time: '5 min ago', tag: 'Assist' },
                { icon: '🧾', text: 'Vikram Sinha purchased ₹3,800 (card)', time: '18 min ago', tag: 'Billing' },
                { icon: '🏆', text: 'Vikram earned +190 reward points', time: '18 min ago', tag: 'Rewards' },
                { icon: '💬', text: 'Thank You sent to Vikram via WhatsApp', time: '19 min ago', tag: 'Outreach' },
                { icon: '📸', text: 'Zara replied to Instagram DM offer', time: '1 hr ago', tag: 'Outreach' },
                { icon: '⬆️', text: 'Neha K. upgraded to Gold tier', time: '3 hrs ago', tag: 'Rewards' },
                { icon: '📧', text: 'Monthly lookbook sent to 534 customers', time: '5 hrs ago', tag: 'Outreach' },
              ].map((a, i) => (
                <div key={i} className="flex items-start space-x-2">
                  <span className="text-sm flex-shrink-0">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 leading-relaxed">{a.text}</p>
                    <div className="flex items-center space-x-2 mt-0.5">
                      <span className="text-xs text-gray-400">{a.time}</span>
                      <span className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium">{a.tag}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // ── CUSTOMER DETAIL (unified single-customer workspace) ───────────────────

  const renderCustomerDetail = () => {
    if (!selectedCustomer) return null
    const c = selectedCustomer
    const tabs = [
      { id: 'profile' as const, label: 'Profile' },
      { id: 'journey' as const, label: 'Journey' },
      { id: 'assist' as const, label: 'In-Store Assist' },
      { id: 'billing' as const, label: 'Billing' },
    ]

    return (
      <div>
        {/* ── Customer header bar (persists across tabs) ── */}
        <div className="flex items-center space-x-4 bg-blue-600 text-white rounded-xl p-4 mb-5">
          <button onClick={() => setActiveView('dashboard')} className="text-blue-200 hover:text-white mr-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="w-12 h-12 bg-white text-blue-700 rounded-full flex items-center justify-center font-black text-lg">{c.avatar}</div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <p className="font-bold text-lg">{c.name}</p>
              <span className="text-xs bg-white text-blue-700 font-bold px-2 py-0.5 rounded-full">🏆 {c.tier}</span>
            </div>
            <p className="text-blue-200 text-xs">{c.phone} · {c.visits} visits · {c.totalSpend} lifetime</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-2xl font-black">{c.points.toLocaleString()} <span className="text-xs font-normal text-blue-200">pts</span></p>
            <button onClick={() => openOutreach(c)} className="text-xs bg-white text-blue-700 font-semibold px-3 py-1 rounded-lg hover:bg-blue-50">Reach Out</button>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex space-x-1 border-b border-gray-200 mb-5">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setCustomerTab(t.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${customerTab === t.id ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── TAB: Profile ── */}
        {customerTab === 'profile' && (
          <div>
            {/* Connected Channels strip */}
            <div className="border border-gray-200 rounded-xl p-4 mb-5">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-900 text-sm">📡 Connected Channels</p>
                <span className="text-xs text-gray-400">Captured via QR check-in form + staff enrichment</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { icon: '💬', label: 'WhatsApp', value: c.phone, source: 'QR check-in', connected: c.channels.whatsapp },
                  { icon: '📱', label: 'SMS', value: c.phone, source: 'QR check-in', connected: c.channels.sms },
                  { icon: '📧', label: 'Email', value: c.email || '—', source: 'Check-in form', connected: c.channels.email },
                  { icon: '📸', label: 'Instagram', value: c.instagram || '—', source: 'Customer shared / staff added', connected: c.channels.instagram },
                  { icon: '💎', label: 'RCS', value: c.phone, source: 'Auto (phone)', connected: c.channels.whatsapp },
                ].map((ch) => (
                  <div key={ch.label} className={`rounded-lg p-2.5 text-center border ${ch.connected ? 'border-blue-200 bg-blue-50' : 'border-dashed border-gray-200 bg-gray-50'}`}>
                    <p className="text-lg mb-0.5">{ch.icon}</p>
                    <p className="text-xs font-semibold text-gray-900">{ch.label}</p>
                    {ch.connected ? (
                      <>
                        <p className="text-xs text-blue-600 font-medium mt-1 truncate">{ch.value}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{ch.source}</p>
                      </>
                    ) : (
                      <p className="text-xs text-gray-400 mt-1 italic">Not connected</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="font-semibold text-gray-900 text-sm mb-2">🛍️ Preferences</p>
                  <div className="flex flex-wrap gap-1.5">
                    {c.preferences.map(p => <span key={p} className="bg-blue-50 border border-blue-200 text-blue-700 text-xs px-2.5 py-1 rounded-full">{p}</span>)}
                  </div>
                </div>
                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="font-semibold text-gray-900 text-sm mb-2">❤️ Wishlist</p>
                  {c.wishlist.map(w => (
                    <div key={w} className="flex items-center space-x-2 text-xs text-gray-700 mb-1 last:mb-0">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" /><span>{w}</span>
                    </div>
                  ))}
                </div>
                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="font-semibold text-gray-900 text-sm mb-2">📅 Occasions</p>
                  {c.occasions.map(o => <div key={o} className="text-xs text-gray-700 bg-blue-50 rounded px-2 py-1 mb-1 last:mb-0">{o}</div>)}
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="font-semibold text-gray-900 text-sm mb-2">🧾 Purchase History</p>
                  <div className="space-y-2">
                    {c.purchases.map((p, i) => (
                      <div key={i} className="flex items-center justify-between text-xs bg-gray-50 rounded-lg px-3 py-2">
                        <div><p className="font-medium text-gray-900">{p.item}</p><p className="text-gray-400">{p.date}</p></div>
                        <p className="font-semibold text-gray-900">₹{p.amount.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="font-semibold text-gray-900 text-sm mb-2">👤 Last Assisted By</p>
                  <div className="flex items-center space-x-2 bg-blue-50 rounded-lg px-3 py-2">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{c.assistedBy.charAt(0)}</div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900">{c.assistedBy}</p>
                      <p className="text-xs text-gray-400">{c.lastAssistDate}</p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="font-semibold text-gray-900 text-sm mb-2">📝 Staff Notes</p>
                  <p className="text-xs text-gray-600 bg-yellow-50 border border-yellow-100 rounded px-3 py-2 italic">&ldquo;{c.notes}&rdquo;</p>
                </div>
                <div className="border border-blue-100 bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-0.5">Lifetime Value</p>
                  <p className="text-3xl font-black text-blue-600">{c.totalSpend}</p>
                  <p className="text-xs text-gray-500 mt-1">{c.visits} visits · {c.tier} Member</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setCustomerTab('assist')} className="bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-blue-700">Start Assist</button>
                  <button onClick={() => setCustomerTab('billing')} className="border-2 border-blue-600 text-blue-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-blue-50">Bill Customer</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: Journey ── */}
        {customerTab === 'journey' && (
          <div className="max-w-2xl">
            <p className="text-gray-500 text-sm mb-5">Complete timeline of {c.name.split(' ')[0]}&apos;s journey — check-ins, purchases, rewards, and outreach.</p>
            <div className="relative pl-6 border-l-2 border-blue-200 space-y-5">
              {[
                { date: 'Today · ' + c.checkInTime, event: '📋 Checked into store', detail: 'Scanned QR at entrance · All 5 channels connected', tag: 'Check-In' },
                { date: 'Today · ' + c.checkInTime, event: '💬 Welcome Back offer sent via WhatsApp', detail: '15% OFF message delivered and read', tag: 'Outreach' },
                ...c.purchases.flatMap(p => [
                  { date: p.date, event: `🧾 Purchased: ${p.item}`, detail: `₹${p.amount.toLocaleString()} · Paid via UPI`, tag: 'Billing' },
                  { date: p.date, event: `🏆 Earned +${Math.floor(p.amount * 0.05)} reward points`, detail: `5% of ₹${p.amount.toLocaleString()} (from Rewards Catalog)`, tag: 'Rewards' },
                  { date: p.date, event: '💬 Post-visit Thank You sent', detail: 'Via WhatsApp · Earned 50 bonus points from review', tag: 'Outreach' },
                ]),
                { date: '2024', event: '👤 Joined MODENX', detail: `Signed up as ${c.tier} member via store QR`, tag: 'Check-In' },
              ].map((ev, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-8 w-3 h-3 rounded-full bg-blue-500 border-2 border-white" />
                  <div className="flex items-center space-x-2 mb-0.5">
                    <p className="text-xs text-gray-400">{ev.date}</p>
                    <span className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium">{ev.tag}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{ev.event}</p>
                  <p className="text-xs text-gray-500">{ev.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: Assist ── */}
        {customerTab === 'assist' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2">
              <p className="font-semibold text-gray-900 mb-3">✨ Suggested for {c.name.split(' ')[0]}</p>
              <div className="space-y-2.5">
                {suggestedItems.map((item) => {
                  const isTagged = taggedItems.includes(item.name)
                  return (
                    <div key={item.name} className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all ${isTagged ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}>
                      <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                      </div>
                      <div className="flex-1"><p className="font-medium text-gray-900 text-sm">{item.name}</p><p className="text-xs text-blue-600">{item.match}</p></div>
                      <p className="font-semibold text-gray-900 text-sm">₹{item.price.toLocaleString()}</p>
                      <button onClick={() => setTaggedItems(isTagged ? taggedItems.filter(x => x !== item.name) : [...taggedItems, item.name])}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium ${isTagged ? 'bg-blue-600 text-white' : 'border border-blue-600 text-blue-600 hover:bg-blue-50'}`}>
                        {isTagged ? '✓ Tagged' : 'Tag'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-xl p-4">
                <p className="font-semibold text-gray-900 text-sm mb-2">Tagged Items ({taggedItems.length})</p>
                {taggedItems.length === 0
                  ? <p className="text-xs text-gray-400 italic">Tag items from suggestions</p>
                  : taggedItems.map(i => <div key={i} className="text-xs text-blue-700 bg-blue-50 px-2 py-1.5 rounded mb-1">✓ {i}</div>)
                }
              </div>
              <div className="border border-gray-200 rounded-xl p-4">
                <p className="font-semibold text-gray-900 text-sm mb-2">Staff Note</p>
                <textarea className="w-full text-xs border border-gray-200 rounded-lg p-2 resize-none focus:outline-none focus:border-blue-400" rows={3}
                  placeholder="e.g. Interested in wedding collection" value={staffNote} onChange={e => setStaffNote(e.target.value)} />
              </div>
              <button onClick={() => { setPointsApplied(false); setBillDone(false); setCustomerTab('billing') }}
                className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700">Proceed to Billing →</button>
            </div>
          </div>
        )}

        {/* ── TAB: Billing ── */}
        {customerTab === 'billing' && (() => {
          const items = taggedItems.length > 0
            ? taggedItems.map((name, i) => ({ name, price: [2800, 1400, 950, 1200][i] || 1500 }))
            : [{ name: 'Chanderi Silk Kurta', price: 2800 }, { name: 'Kundan Jhumka Set', price: 1400 }]
          const sub = items.reduce((s, i) => s + i.price, 0)
          const disc = pointsApplied ? Math.floor(c.points / 10) : 0
          const total = sub - disc
          const earned = Math.floor(total * 0.05)

          return !billDone ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-5 py-3 border-b border-gray-100"><p className="font-semibold text-gray-900 text-sm">Items</p></div>
                <div className="divide-y divide-gray-50">
                  {items.map((it, i) => (
                    <div key={i} className="flex justify-between px-5 py-3 text-sm"><span className="text-gray-800">{it.name}</span><span className="font-semibold">₹{it.price.toLocaleString()}</span></div>
                  ))}
                </div>
                <div className="px-5 py-3 border-t border-gray-100 space-y-1">
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span>₹{sub.toLocaleString()}</span></div>
                  {pointsApplied && <div className="flex justify-between text-sm text-blue-600"><span>Points ({c.points} pts)</span><span>-₹{disc}</span></div>}
                  <div className="flex justify-between font-bold"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className={`border-2 rounded-xl p-4 cursor-pointer ${pointsApplied ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`} onClick={() => setPointsApplied(!pointsApplied)}>
                  <div className="flex items-center justify-between">
                    <div><p className="font-semibold text-gray-900 text-sm">Apply Reward Points</p><p className="text-xs text-gray-500">{c.points.toLocaleString()} pts = ₹{Math.floor(c.points / 10)} off</p></div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${pointsApplied ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>{pointsApplied && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}</div>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-900">Points Earned This Visit</p>
                  <p className="text-2xl font-black text-blue-600 mt-0.5">+{earned} pts</p>
                  <p className="text-xs text-gray-500 mt-1">Based on 5% reward rate (from <button onClick={() => setActiveView('rewards')} className="text-blue-600 underline">Rewards Catalog</button>)</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {['UPI', 'Card', 'Cash'].map((m, i) => (
                    <div key={m} className={`text-center py-2.5 rounded-lg border-2 text-sm font-medium cursor-pointer ${i === 0 ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-blue-200'}`}>{m}</div>
                  ))}
                </div>
                <button onClick={() => setBillDone(true)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-base hover:bg-blue-700">
                  Complete — ₹{total.toLocaleString()}
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto text-center py-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Purchase Complete!</h3>
              <p className="text-gray-500 text-sm mb-4">₹{total.toLocaleString()} · +{earned} pts earned</p>
              <button onClick={() => openOutreach(c, outreachTemplates[6])} className="border-2 border-blue-600 text-blue-600 px-5 py-2 rounded-xl text-sm font-semibold hover:bg-blue-50">
                Send Thank You →
              </button>
            </div>
          )
        })()}
      </div>
    )
  }

  // ── REWARDS CATALOG ────────────────────────────────────────────────────────

  const renderRewards = () => (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Rewards Catalog</h1>

      {/* Default Reward Points */}
      <div className="border border-gray-200 rounded-xl p-6 mb-8">
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          </div>
          <p className="text-gray-900 font-medium">Do you offer reward points?</p>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <p className="text-gray-700 text-sm">Enter default reward details:</p>
          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          </div>
        </div>

        {/* Radio options */}
        <div className="flex items-center space-x-6 mb-5">
          <label className="flex items-center space-x-2 cursor-pointer">
            <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <div className="w-0 h-0"></div>
            </div>
            <span className="text-sm text-gray-700">Per Point Cost</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <div className="w-4 h-4 rounded-full border-2 border-blue-600 flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-700">Percentage</span>
          </label>
        </div>

        {/* Form fields */}
        <div className="flex items-end space-x-4 mb-3">
          <div className="flex-1">
            <label className="text-xs text-gray-600 font-medium">Percentage</label>
            <input type="text" defaultValue="5" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-600 font-medium">Min Spend Limit</label>
            <input type="text" defaultValue="500" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-600 font-medium">Max Spend Limit</label>
            <input type="text" defaultValue="50000" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-600 font-medium">Point Expiry in (months)</label>
            <input type="text" defaultValue="12" placeholder="0 for no expiry time" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
          </div>
          <button className="text-gray-400 hover:text-gray-600 p-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <p className="text-xs text-blue-600 mb-4">1 reward point for every ₹20 spent.</p>
        <div className="flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Update</button>
        </div>
      </div>

      {/* Other Special Offers */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Other Special Offers</h2>
        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
          <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          </div>
          <span className="font-medium text-sm">Add</span>
        </button>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-8 bg-blue-600 text-white text-xs font-medium">
          <div className="px-4 py-3">Offer Name</div>
          <div className="px-4 py-3">Offer Type</div>
          <div className="px-4 py-3">Reward Validity</div>
          <div className="px-4 py-3">Offer Value</div>
          <div className="px-4 py-3">Min Spend Amount</div>
          <div className="px-4 py-3">Start Date</div>
          <div className="px-4 py-3">End Date</div>
          <div className="px-4 py-3">Delete</div>
        </div>
        {/* Offers */}
        {[
          { name: 'Welcome Bonus', type: 'Flat Points', validity: '30 days', value: '100 pts', min: '₹0', start: '01 Apr 2026', end: '30 Jun 2026' },
          { name: 'Birthday Special', type: 'Discount %', validity: '7 days', value: '20% OFF', min: '₹1,000', start: 'On Birthday', end: '+7 days' },
          { name: 'Referral Reward', type: 'Flat Points', validity: '60 days', value: '250 pts', min: '₹0', start: '01 Apr 2026', end: '31 Dec 2026' },
          { name: 'Weekend Double', type: 'Points Multiplier', validity: 'Sat-Sun', value: '2x Points', min: '₹500', start: '01 Apr 2026', end: '30 Apr 2026' },
          { name: 'Festival Sale', type: 'Discount %', validity: '5 days', value: '15% OFF', min: '₹2,000', start: '10 Oct 2026', end: '15 Oct 2026' },
        ].map((offer, i) => (
          <div key={i} className="grid grid-cols-8 text-xs border-t border-gray-100 hover:bg-blue-50 transition-all">
            <div className="px-4 py-3 font-medium text-gray-900">{offer.name}</div>
            <div className="px-4 py-3 text-gray-600">{offer.type}</div>
            <div className="px-4 py-3 text-gray-600">{offer.validity}</div>
            <div className="px-4 py-3 font-semibold text-blue-600">{offer.value}</div>
            <div className="px-4 py-3 text-gray-600">{offer.min}</div>
            <div className="px-4 py-3 text-gray-600">{offer.start}</div>
            <div className="px-4 py-3 text-gray-600">{offer.end}</div>
            <div className="px-4 py-3">
              <button className="text-gray-400 hover:text-red-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // ── OUTREACH CENTER (with audience targeting) ──────────────────────────────

  const renderOutreach = () => {
    const filters = [
      { id: 'all', label: 'All Customers', count: 1248 },
      { id: 'plat', label: '🏆 Platinum', count: 12 },
      { id: 'gold', label: '🥇 Gold', count: 48 },
      { id: 'silver', label: '🥈 Silver', count: 154 },
      { id: 'ethnic', label: 'Ethnic Wear', count: 312 },
      { id: 'western', label: 'Western', count: 287 },
      { id: 'wedding', label: '📅 Wedding', count: 64 },
      { id: 'inactive', label: 'Inactive 30d+', count: 198 },
      { id: 'birthday', label: '🎂 Birthday this month', count: 23 },
      { id: 'highvalue', label: '💎 High Value (>₹50K)', count: 38 },
    ]
    const activeFilters = Object.entries(audienceFilters).filter(([, v]) => v).map(([k]) => k)
    const toggleFilter = (id: string) => {
      if (id === 'all') { setAudienceFilters({ all: true }); return }
      const next = { ...audienceFilters, all: false, [id]: !audienceFilters[id] }
      if (Object.values(next).every(v => !v)) next.all = true
      setAudienceFilters(next)
    }

    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Outreach Campaign</h1>
        <p className="text-gray-500 text-sm mb-5">Select your target audience, pick a channel and template, then send.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* ── Left: Audience Builder ── */}
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="font-semibold text-gray-900 text-sm mb-3">🎯 Target Audience</p>
            <div className="space-y-1.5">
              {filters.map(f => (
                <div key={f.id} onClick={() => toggleFilter(f.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all ${audienceFilters[f.id] ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-gray-700'}`}>
                  <span className="text-xs font-medium">{f.label}</span>
                  <span className={`text-xs ${audienceFilters[f.id] ? 'text-blue-200' : 'text-gray-400'}`}>{f.count}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">Selected audience:</p>
              <p className="text-lg font-black text-blue-600 mt-0.5">
                {audienceFilters.all ? '1,248' : activeFilters.reduce((sum, k) => sum + (filters.find(f => f.id === k)?.count || 0), 0).toLocaleString()} customers
              </p>
            </div>
          </div>

          {/* ── Right: Channel + Template + Preview ── */}
          <div className="lg:col-span-2 space-y-4">
            {/* Channel selector */}
            <div className="border border-gray-200 rounded-xl p-4">
              <p className="font-semibold text-gray-900 text-sm mb-3">📡 Select Channel</p>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { ch: 'WhatsApp', icon: '💬', reach: '98.7%' },
                  { ch: 'SMS', icon: '📱', reach: '99.1%' },
                  { ch: 'Email', icon: '📧', reach: '97.3%' },
                  { ch: 'Instagram', icon: '📸', reach: '96.5%' },
                  { ch: 'RCS', icon: '💎', reach: '95.8%' },
                ].map((ch, i) => (
                  <div key={ch.ch} className={`text-center p-3 rounded-xl border-2 cursor-pointer transition-all ${i === 0 ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                    <p className="text-xl mb-1">{ch.icon}</p>
                    <p className="text-xs font-semibold text-gray-900">{ch.ch}</p>
                    <p className="text-xs text-gray-400">{ch.reach} reach</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Template picker */}
            <div className="border border-gray-200 rounded-xl p-4">
              <p className="font-semibold text-gray-900 text-sm mb-3">💬 Select Template</p>
              <div className="grid grid-cols-2 gap-2">
                {outreachTemplates.filter(t => t.channel === 'WhatsApp').map(t => (
                  <div key={t.id} className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${outreachTemplate.id === t.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}
                    onClick={() => setOutreachTemplate(t)}>
                    <p className="text-sm font-medium text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{t.body.substring(0, 60)}...</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary + Send */}
            <div className="bg-blue-600 rounded-xl p-5 flex items-center justify-between">
              <div>
                <p className="text-white font-semibold text-sm">Ready to send</p>
                <p className="text-blue-200 text-xs mt-0.5">
                  &ldquo;{outreachTemplate.name}&rdquo; via WhatsApp → {audienceFilters.all ? '1,248' : activeFilters.reduce((sum, k) => sum + (filters.find(f => f.id === k)?.count || 0), 0).toLocaleString()} customers
                </p>
              </div>
              <button className="bg-white text-blue-700 font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-blue-50">Send Campaign</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── WA COMMAND CENTER (tabbed, with live chat) ─────────────────────────────

  const renderWACommand = () => {
    const chatContacts = [
      { name: 'Meera Kapoor', avatar: 'MK', lastMsg: 'Yes! Coming to billing right now 😊', time: '10:41 AM', unread: 0, status: 'replied' },
      { name: 'Vikram Sinha', avatar: 'VS', lastMsg: 'Do you have this in size 40?', time: '11:12 AM', unread: 1, status: 'incoming' },
      { name: 'Zara Deshpande', avatar: 'ZD', lastMsg: 'Will check it out this weekend!', time: '11:48 AM', unread: 0, status: 'replied' },
      { name: 'Neha Kumar', avatar: 'NK', lastMsg: 'Thanks for the discount code!', time: '12:05 PM', unread: 2, status: 'incoming' },
      { name: 'Arjun Patel', avatar: 'AP', lastMsg: 'Delivered', time: '12:30 PM', unread: 0, status: 'delivered' },
      { name: 'Kavya Reddy', avatar: 'KR', lastMsg: 'Can I return the kurta?', time: '1:15 PM', unread: 1, status: 'incoming' },
    ]

    const chatMessages: Record<string, Array<{ from: 'store' | 'customer'; text: string; time: string }>> = {
      'Meera Kapoor': [
        { from: 'store', text: "Hi Meera! Welcome back to MODENX. As our Gold member, enjoy 15% OFF on your purchase today. Show this at billing!", time: '10:32 AM' },
        { from: 'customer', text: "Oh nice! I'm already in store 😄", time: '10:35 AM' },
        { from: 'store', text: "Great! Your Chanderi Dupatta is in aisle 3. Should I have someone bring it to you?", time: '10:36 AM' },
        { from: 'customer', text: "Yes please! That would be amazing", time: '10:38 AM' },
        { from: 'store', text: "Done! Our staff will bring it to you. Also, we just received a new bridal collection — would you like to see it?", time: '10:39 AM' },
        { from: 'customer', text: "Yes! Coming to billing right now 😊", time: '10:41 AM' },
      ],
      'Vikram Sinha': [
        { from: 'store', text: "Hi Vikram! You have 870 reward points (₹87 off) at MODENX! Use before 30 Apr.", time: '11:05 AM' },
        { from: 'customer', text: "Thanks! I was looking at that Slim Fit Blazer again", time: '11:08 AM' },
        { from: 'customer', text: "Do you have this in size 40?", time: '11:12 AM' },
      ],
      'Neha Kumar': [
        { from: 'store', text: "Thank you for visiting MODENX, Neha! Rate us ⭐⭐⭐⭐⭐ and earn 50 bonus points.", time: '11:50 AM' },
        { from: 'customer', text: "Just rated 5 stars! The service was excellent", time: '12:02 PM' },
        { from: 'customer', text: "Thanks for the discount code!", time: '12:05 PM' },
      ],
      'Kavya Reddy': [
        { from: 'store', text: "Hey Kavya! We know you love Western wear. Check out our latest arrivals!", time: '1:00 PM' },
        { from: 'customer', text: "Can I return the kurta? It doesn't fit well", time: '1:15 PM' },
      ],
    }

    const activeMsgs = chatMessages[activeChat] || [
      { from: 'store' as const, text: 'Message sent via template', time: '—' },
    ]

    return (
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">WhatsApp Command Center</h1>
            <p className="text-gray-500 text-sm mt-0.5">Meta Business API — Real-time messaging operations</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5">
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-blue-600">Meta Verified</span>
            </div>
            <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">+91 80123 45678</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 border-b border-gray-200 mb-5">
          {[
            { id: 'overview' as const, label: 'Overview' },
            { id: 'conversations' as const, label: 'Live Conversations' },
            { id: 'templates' as const, label: 'Templates' },
            { id: 'analytics' as const, label: 'Analytics' },
          ].map(t => (
            <button key={t.id} onClick={() => setWaTab(t.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${waTab === t.id ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {t.label}
              {t.id === 'conversations' && <span className="ml-1.5 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>}
            </button>
          ))}
        </div>

        {/* ── TAB: Overview ── */}
        {waTab === 'overview' && (
          <div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center"><span className="text-white text-lg">💬</span></div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">MODENX Ensemble</p>
                  <p className="text-xs text-gray-500">Tier: Standard · Quality: High · Limit: 1K/24h</p>
                </div>
              </div>
              <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full font-medium">Connected</span>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-5">
              {[
                { label: 'Sent (24h)', value: '342', change: '↑ 18%' },
                { label: 'Delivery', value: '98.7%', change: '↑ 0.3%' },
                { label: 'Read', value: '87.2%', change: '↑ 2.1%' },
                { label: 'Response', value: '34.8%', change: '↑ 5.4%' },
              ].map((k, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
                  <p className="text-xs text-gray-500">{k.label}</p>
                  <p className="text-2xl font-black text-gray-900 mt-1">{k.value}</p>
                  <p className="text-xs text-blue-600 font-medium mt-0.5">{k.change}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-xl p-4">
                <p className="font-semibold text-gray-900 text-sm mb-3">Conversations (24h)</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { type: 'Marketing', count: 187, limit: 1000, pct: 19 },
                    { type: 'Utility', count: 94, limit: null, pct: 0 },
                    { type: 'Service', count: 42, limit: null, pct: 0 },
                    { type: 'Auth', count: 19, limit: null, pct: 0 },
                  ].map(c => (
                    <div key={c.type} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between mb-1"><span className="text-xs font-medium text-gray-700">{c.type}</span><span className="text-sm font-black text-gray-900">{c.count}</span></div>
                      {c.limit ? (
                        <><div className="w-full bg-blue-100 rounded-full h-1.5"><div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${c.pct}%` }} /></div><p className="text-xs text-gray-400 mt-0.5">{c.count}/{c.limit}</p></>
                      ) : <p className="text-xs text-gray-400">Unlimited</p>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-gray-200 rounded-xl p-4">
                <p className="font-semibold text-gray-900 text-sm mb-3">Account Health</p>
                <div className="space-y-2">
                  {[
                    { l: 'Quality Rating', v: 'High', i: '🟢' },
                    { l: 'Messaging Limit', v: '1K / 24h', i: '📊' },
                    { l: 'Verification', v: 'Verified', i: '✅' },
                    { l: 'Display Name', v: 'MODENX Ensemble', i: '🏪' },
                    { l: 'Two-Factor Auth', v: 'Enabled', i: '🔐' },
                    { l: 'AI Auto-Reply', v: aiMode ? 'ON' : 'OFF', i: '🤖' },
                  ].map((h, i) => (
                    <div key={i} className="flex justify-between"><span className="text-xs text-gray-600 flex items-center space-x-1.5"><span>{h.i}</span><span>{h.l}</span></span><span className="text-xs font-semibold text-gray-900">{h.v}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: Live Conversations ── */}
        {waTab === 'conversations' && (
          <div className="flex border border-gray-200 rounded-xl overflow-hidden" style={{ height: '520px' }}>
            {/* Contact list */}
            <div className="w-72 border-r border-gray-200 flex flex-col flex-shrink-0">
              <div className="p-3 border-b border-gray-100">
                <input type="text" placeholder="Search conversations..." className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400" />
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                {chatContacts.map(c => (
                  <div key={c.name} onClick={() => setActiveChat(c.name)}
                    className={`flex items-center space-x-3 px-3 py-3 cursor-pointer transition-all ${activeChat === c.name ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                    <div className="relative flex-shrink-0">
                      <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">{c.avatar}</div>
                      {c.unread > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">{c.unread}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <p className="text-xs font-semibold text-gray-900 truncate">{c.name}</p>
                        <span className="text-xs text-gray-400 flex-shrink-0">{c.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{c.lastMsg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat window */}
            <div className="flex-1 flex flex-col">
              {/* Chat header */}
              <div className="bg-blue-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white text-blue-700 rounded-full flex items-center justify-center font-bold text-xs">{chatContacts.find(c => c.name === activeChat)?.avatar || '?'}</div>
                  <div>
                    <p className="text-white text-sm font-semibold">{activeChat}</p>
                    <p className="text-blue-200 text-xs">Online · WhatsApp Business</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {/* AI / Human toggle */}
                  <div className="flex items-center bg-blue-700 rounded-lg p-0.5">
                    <button onClick={() => setAiMode(true)} className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${aiMode ? 'bg-white text-blue-700' : 'text-blue-200 hover:text-white'}`}>🤖 AI</button>
                    <button onClick={() => setAiMode(false)} className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${!aiMode ? 'bg-white text-blue-700' : 'text-blue-200 hover:text-white'}`}>👤 Human</button>
                  </div>
                </div>
              </div>

              {/* AI/Human mode banner */}
              <div className={`px-4 py-1.5 text-xs font-medium flex items-center space-x-2 ${aiMode ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-600'}`}>
                <span>{aiMode ? '🤖' : '👤'}</span>
                <span>{aiMode ? 'AI Auto-Reply is ON — responses are generated automatically based on customer profile and store context' : 'Human Mode — staff replies manually. AI suggestions shown below.'}</span>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto bg-blue-50 p-4 space-y-3">
                {activeMsgs.map((m, i) => (
                  <div key={i} className={`flex ${m.from === 'store' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs rounded-xl p-3 shadow-sm ${m.from === 'store' ? 'bg-white rounded-tr-none' : 'bg-blue-600 text-white rounded-tl-none'}`}>
                      <p className="text-xs leading-relaxed">{m.text}</p>
                      <div className={`flex items-center justify-end space-x-1 mt-1 ${m.from === 'store' ? 'text-gray-400' : 'text-blue-200'}`}>
                        <span className="text-xs">{m.time}</span>
                        {m.from === 'store' && <span className="text-xs text-blue-500">✓✓</span>}
                      </div>
                    </div>
                  </div>
                ))}

                {/* AI suggested reply (in human mode) */}
                {!aiMode && chatContacts.find(c => c.name === activeChat)?.status === 'incoming' && (
                  <div className="flex justify-end">
                    <div className="max-w-xs bg-blue-100 border-2 border-dashed border-blue-300 rounded-xl p-3">
                      <p className="text-xs text-blue-700 font-medium mb-1">💡 AI Suggestion:</p>
                      <p className="text-xs text-blue-800">{activeChat === 'Vikram Sinha' ? "Yes Vikram! The Slim Fit Blazer is available in size 40. I'll keep one aside at the trial room for you. 👔" : activeChat === 'Kavya Reddy' ? "Hi Kavya, absolutely! You can return it within 7 days. Please bring the receipt and original tags. We're open till 9 PM today. 😊" : "Thanks for reaching out! Let me check and get back to you right away."}</p>
                      <button onClick={() => setReplyText(activeChat === 'Vikram Sinha' ? "Yes Vikram! The Slim Fit Blazer is available in size 40. I'll keep one aside for you. 👔" : "Hi! Let me check and get back to you.")}
                        className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">Use this reply</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Reply input */}
              <div className="bg-white border-t border-gray-200 p-3 flex items-center space-x-2 flex-shrink-0">
                <input type="text" placeholder={aiMode ? "AI will auto-reply... or type to override" : "Type a reply..."} value={replyText} onChange={e => setReplyText(e.target.value)}
                  className="flex-1 text-sm border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-400" />
                <button className="text-xs bg-blue-600 text-white px-3 py-2 rounded-xl hover:bg-blue-700 flex items-center space-x-1">
                  <span>📤</span><span>Send</span>
                </button>
                <button className="text-xs border border-gray-200 text-gray-500 px-3 py-2 rounded-xl hover:bg-gray-50 flex items-center space-x-1">
                  <span>📎</span><span>Template</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: Templates ── */}
        {waTab === 'templates' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-500">Manage your Meta-approved message templates</p>
              <button className="text-xs bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">+ Create Template</button>
            </div>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="grid grid-cols-12 bg-blue-600 text-white text-xs font-medium px-5 py-3">
                <div className="col-span-3">Template Name</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1">Quality</div>
                <div className="col-span-1">Sent</div>
                <div className="col-span-1">Read %</div>
                <div className="col-span-1">Reply %</div>
                <div className="col-span-2">Actions</div>
              </div>
              {[
                { name: 'Welcome Back Offer', cat: 'MARKETING', status: 'Approved', quality: 'High', sent: 312, read: 89, reply: 41 },
                { name: 'Wishlist Back in Stock', cat: 'UTILITY', status: 'Approved', quality: 'High', sent: 186, read: 92, reply: 38 },
                { name: 'Post-Visit Thank You', cat: 'MARKETING', status: 'Approved', quality: 'Medium', sent: 245, read: 78, reply: 22 },
                { name: 'Points Reminder', cat: 'UTILITY', status: 'Approved', quality: 'High', sent: 134, read: 85, reply: 31 },
                { name: 'New Arrivals Drop', cat: 'MARKETING', status: 'Approved', quality: 'High', sent: 98, read: 91, reply: 45 },
                { name: 'Loyalty Upgrade', cat: 'MARKETING', status: 'Pending', quality: '—', sent: 0, read: 0, reply: 0 },
                { name: 'Flash Sale Alert', cat: 'MARKETING', status: 'Rejected', quality: '—', sent: 0, read: 0, reply: 0 },
              ].map((t, i) => (
                <div key={i} className="grid grid-cols-12 text-xs px-5 py-3 border-t border-gray-100 hover:bg-blue-50 items-center">
                  <div className="col-span-3 font-medium text-gray-900">{t.name}</div>
                  <div className="col-span-2"><span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{t.cat}</span></div>
                  <div className="col-span-1"><span className={`px-1.5 py-0.5 rounded font-medium ${t.status === 'Approved' ? 'bg-blue-100 text-blue-700' : t.status === 'Pending' ? 'bg-gray-100 text-gray-600' : 'bg-red-50 text-red-600'}`}>{t.status}</span></div>
                  <div className="col-span-1 text-gray-600">{t.quality}</div>
                  <div className="col-span-1 font-semibold text-gray-900">{t.sent || '—'}</div>
                  <div className="col-span-1 text-gray-600">{t.read ? `${t.read}%` : '—'}</div>
                  <div className="col-span-1 text-gray-600">{t.reply ? `${t.reply}%` : '—'}</div>
                  <div className="col-span-2 flex space-x-1">
                    {t.status === 'Approved' && <button className="text-xs border border-blue-600 text-blue-600 px-2 py-0.5 rounded hover:bg-blue-50">Send</button>}
                    <button className="text-xs border border-gray-200 text-gray-500 px-2 py-0.5 rounded hover:bg-gray-50">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: Analytics ── */}
        {waTab === 'analytics' && (
          <div>
            <div className="grid grid-cols-4 gap-3 mb-5">
              {[
                { label: 'Total Sent (30d)', value: '2,847' },
                { label: 'Avg Delivery Rate', value: '98.7%' },
                { label: 'Avg Read Rate', value: '87.2%' },
                { label: 'Revenue Attributed', value: '₹5.8L' },
              ].map((k, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
                  <p className="text-xs text-gray-500">{k.label}</p>
                  <p className="text-2xl font-black text-gray-900 mt-1">{k.value}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-xl p-4">
                <p className="font-semibold text-gray-900 text-sm mb-3">Template Performance</p>
                {[
                  { name: 'Welcome Back Offer', sent: 312, cvr: 41, rev: '₹2.4L' },
                  { name: 'Wishlist Alert', sent: 186, cvr: 38, rev: '₹1.6L' },
                  { name: 'New Arrivals', sent: 98, cvr: 45, rev: '₹0.9L' },
                  { name: 'Thank You', sent: 245, cvr: 22, rev: '₹0.6L' },
                  { name: 'Points Reminder', sent: 134, cvr: 31, rev: '₹0.3L' },
                ].map(t => (
                  <div key={t.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-xs font-medium text-gray-900">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.sent} sent · {t.cvr}% CVR</p>
                    </div>
                    <p className="text-sm font-black text-blue-600">{t.rev}</p>
                  </div>
                ))}
              </div>
              <div className="border border-gray-200 rounded-xl p-4">
                <p className="font-semibold text-gray-900 text-sm mb-3">Response Insights</p>
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-gray-700">Avg Response Time</p>
                    <p className="text-xl font-black text-blue-600">4.2 min</p>
                    <p className="text-xs text-gray-400">AI auto-reply: 0.3s avg</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-gray-700">AI vs Human Replies</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <div className="flex-1"><div className="w-full bg-blue-100 rounded-full h-3"><div className="bg-blue-600 h-3 rounded-full" style={{ width: '68%' }} /></div></div>
                      <span className="text-xs font-semibold text-gray-700">68% AI · 32% Human</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-gray-700">Customer Satisfaction</p>
                    <p className="text-xl font-black text-blue-600">4.7 / 5.0</p>
                    <p className="text-xs text-gray-400">Based on post-chat ratings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // ── INSIGHTS ──────────────────────────────────────────────────────────────

  const renderInsights = () => (
    <div>
      {/* ── Hero ROI Banner ── */}
      <div className="bg-blue-600 rounded-2xl p-6 mb-6 flex items-center justify-between">
        <div>
          <p className="text-blue-200 text-xs font-medium uppercase tracking-wider">Platform Performance — This Month</p>
          <p className="text-white text-2xl font-black mt-1">₹12.1L Revenue Attributed</p>
          <p className="text-blue-200 text-sm mt-1">Across 5 channels · 1,973 messages sent · 214 walk-ins this week</p>
        </div>
        <div className="text-right">
          <p className="text-6xl font-black text-white">41x</p>
          <p className="text-blue-200 text-sm">ROI on every ₹1 spent</p>
        </div>
      </div>

      {/* ── Market & Competitor Landscape ── */}
      <h2 className="text-lg font-bold text-gray-900 mb-3">Market &amp; Competitor Landscape</h2>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Engaged Customers', value: '400', change: '+12%', up: true },
          { label: 'Avg Visit by A Customer', value: '2.00', change: '+0.3', up: true },
          { label: 'Total Marketable Customers', value: '1.83M', change: '+2.1%', up: true },
          { label: 'Total Competitors', value: '500', change: '+8', up: false },
        ].map((c, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start justify-between mb-3">
              <p className="text-gray-500 text-xs font-medium leading-tight">{c.label}</p>
              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${c.up ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                {c.up ? '↑' : '→'} {c.change}
              </span>
            </div>
            <p className="text-3xl font-black text-gray-900">{c.value}</p>
          </div>
        ))}
      </div>

      {/* ── Your Business Performance ── */}
      <h2 className="text-lg font-bold text-gray-900 mb-3">Your Business Performance</h2>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Your Total Customers', value: '1,248', change: '+18%', sub: 'vs last month' },
          { label: 'Total Visit Count', value: '4,720', change: '+24%', sub: 'vs last month' },
          { label: 'Avg Visits per Customer', value: '3.78', change: '+0.4', sub: 'improving retention' },
        ].map((c, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-gray-500 text-xs font-medium mb-1">{c.label}</p>
            <div className="flex items-end space-x-2">
              <p className="text-3xl font-black text-gray-900">{c.value}</p>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded mb-1">↑ {c.change}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Customer Journey Funnel (visual) ── */}
      <h2 className="text-lg font-bold text-gray-900 mb-3">Customer Journey Funnel</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
        <div className="flex items-end space-x-1 mb-4" style={{ height: '120px' }}>
          {[
            { label: 'Walk-In', value: 214, pct: 100 },
            { label: 'Profile', value: 198, pct: 92 },
            { label: 'Assisted', value: 143, pct: 67 },
            { label: 'Purchased', value: 97, pct: 45 },
            { label: 'Returned', value: 61, pct: 28 },
          ].map((s, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
              <p className="text-lg font-black text-blue-600 mb-1">{s.value}</p>
              <div className="w-full rounded-t-lg bg-blue-600 transition-all" style={{ height: `${s.pct}%`, opacity: 1 - i * 0.15 }} />
            </div>
          ))}
        </div>
        <div className="flex space-x-1">
          {['Walk-In', 'Profile Captured', 'Staff Assisted', 'Purchased', 'Returned Again'].map((l, i) => (
            <div key={i} className="flex-1 text-center">
              <p className="text-xs text-gray-500 font-medium">{l}</p>
              <p className="text-xs text-gray-400">{[100, 92, 67, 45, 28][i]}%</p>
            </div>
          ))}
        </div>
        {/* Drop-off indicators */}
        <div className="flex space-x-1 mt-3 border-t border-gray-100 pt-3">
          {[
            { from: 'Walk-In → Profile', drop: '8%', note: '16 left without checking in' },
            { from: 'Profile → Assisted', drop: '28%', note: '55 browsed on their own' },
            { from: 'Assisted → Purchased', drop: '32%', note: '46 did not buy' },
            { from: 'Purchased → Returned', drop: '37%', note: '36 haven\'t come back yet' },
          ].map((d, i) => (
            <div key={i} className="flex-1 text-center">
              <p className="text-xs font-semibold text-gray-700">{d.drop} drop</p>
              <p className="text-xs text-gray-400">{d.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Channel Performance + Loyalty — Pie Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">

        {/* ── Channel Revenue Pie ── */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Outreach Revenue Split</h2>
          {(() => {
            const channels = [
              { id: 'wa', ch: '💬 WhatsApp', sent: 847, cvr: 41, rev: 5.8, revLabel: '₹5.8L', pct: 48, color: '#1e40af', delivery: '98.7%', open: '87%', topTemplate: 'Welcome Back Offer' },
              { id: 'email', ch: '📧 Email', sent: 534, cvr: 18, rev: 2.1, revLabel: '₹2.1L', pct: 17, color: '#2563eb', delivery: '97.3%', open: '34%', topTemplate: 'Monthly Lookbook' },
              { id: 'sms', ch: '📱 SMS', sent: 312, cvr: 28, rev: 1.9, revLabel: '₹1.9L', pct: 16, color: '#3b82f6', delivery: '99.1%', open: '62%', topTemplate: 'Points Reminder' },
              { id: 'ig', ch: '📸 Instagram', sent: 186, cvr: 32, rev: 1.7, revLabel: '₹1.7L', pct: 14, color: '#60a5fa', delivery: '96.5%', open: '71%', topTemplate: 'New Arrivals Drop' },
              { id: 'rcs', ch: '💎 RCS', sent: 94, cvr: 22, rev: 0.6, revLabel: '₹0.6L', pct: 5, color: '#93c5fd', delivery: '95.8%', open: '58%', topTemplate: 'Loyalty Upgrade' },
            ]
            // Build conic gradient
            let cumulative = 0
            const segments = channels.map(c => {
              const start = cumulative
              cumulative += c.pct
              return `${c.color} ${start}% ${cumulative}%`
            })
            const conicGradient = `conic-gradient(${segments.join(', ')})`

            return (
              <div>
                <div className="flex items-start space-x-6">
                  {/* Donut */}
                  <div className="relative flex-shrink-0">
                    <div className="w-40 h-40 rounded-full" style={{ background: conicGradient }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center">
                        <p className="text-xl font-black text-gray-900">₹12.1L</p>
                        <p className="text-xs text-gray-400">Total</p>
                      </div>
                    </div>
                  </div>
                  {/* Legend */}
                  <div className="flex-1 space-y-1.5">
                    {channels.map(c => (
                      <div key={c.id} className={`flex items-center space-x-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all ${expandedChannel === c.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}
                        onClick={() => setExpandedChannel(expandedChannel === c.id ? null : c.id)}>
                        <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: c.color }} />
                        <p className="text-xs font-medium text-gray-700 flex-1">{c.ch}</p>
                        <p className="text-xs font-bold text-gray-900">{c.revLabel}</p>
                        <p className="text-xs text-gray-400">{c.pct}%</p>
                        <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform ${expandedChannel === c.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Expanded detail */}
                {expandedChannel && (() => {
                  const c = channels.find(x => x.id === expandedChannel)!
                  return (
                    <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: c.color }} />
                          <p className="font-bold text-gray-900">{c.ch}</p>
                        </div>
                        <p className="text-2xl font-black text-blue-600">{c.revLabel}</p>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        <div className="bg-white rounded-lg p-2.5 text-center">
                          <p className="text-lg font-black text-gray-900">{c.sent}</p>
                          <p className="text-xs text-gray-500">Sent</p>
                        </div>
                        <div className="bg-white rounded-lg p-2.5 text-center">
                          <p className="text-lg font-black text-gray-900">{c.delivery}</p>
                          <p className="text-xs text-gray-500">Delivery</p>
                        </div>
                        <div className="bg-white rounded-lg p-2.5 text-center">
                          <p className="text-lg font-black text-gray-900">{c.open}</p>
                          <p className="text-xs text-gray-500">Open Rate</p>
                        </div>
                        <div className="bg-white rounded-lg p-2.5 text-center">
                          <p className="text-lg font-black text-blue-600">{c.cvr}%</p>
                          <p className="text-xs text-gray-500">CVR</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Top template: <span className="font-semibold text-gray-700">{c.topTemplate}</span></p>
                    </div>
                  )
                })()}
              </div>
            )
          })()}
        </div>

        {/* ── Loyalty Tier Pie ── */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Loyalty Tier Split</h2>
          {(() => {
            const tiers = [
              { id: 'plat', tier: 'Platinum', count: 12, pct: 6, avg: '₹1.2L', ltv: '₹14.4L', color: '#1e3a8a', retention: '94%', avgVisits: '11.2', topPref: 'Ethnic Wear', redeemRate: '42%' },
              { id: 'gold', tier: 'Gold', count: 48, pct: 22, avg: '₹38K', ltv: '₹18.2L', color: '#2563eb', retention: '78%', avgVisits: '6.4', topPref: 'Western', redeemRate: '31%' },
              { id: 'silver', tier: 'Silver', count: 154, pct: 72, avg: '₹12K', ltv: '₹18.5L', color: '#93c5fd', retention: '52%', avgVisits: '2.8', topPref: 'Accessories', redeemRate: '18%' },
            ]
            let cumulative = 0
            const segments = tiers.map(t => {
              const start = cumulative
              cumulative += t.pct
              return `${t.color} ${start}% ${cumulative}%`
            })
            const conicGradient = `conic-gradient(${segments.join(', ')})`

            return (
              <div>
                <div className="flex items-start space-x-6">
                  {/* Donut */}
                  <div className="relative flex-shrink-0">
                    <div className="w-40 h-40 rounded-full" style={{ background: conicGradient }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center">
                        <p className="text-xl font-black text-gray-900">214</p>
                        <p className="text-xs text-gray-400">Customers</p>
                      </div>
                    </div>
                  </div>
                  {/* Legend */}
                  <div className="flex-1 space-y-1.5">
                    {tiers.map(t => (
                      <div key={t.id} className={`flex items-center space-x-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all ${expandedTier === t.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}
                        onClick={() => setExpandedTier(expandedTier === t.id ? null : t.id)}>
                        <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: t.color }} />
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tierBadge(t.tier)}`}>{t.tier}</span>
                        <p className="text-xs text-gray-700 flex-1">{t.count} ({t.pct}%)</p>
                        <p className="text-xs font-bold text-gray-900">{t.ltv}</p>
                        <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform ${expandedTier === t.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Expanded tier detail */}
                {expandedTier && (() => {
                  const t = tiers.find(x => x.id === expandedTier)!
                  return (
                    <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: t.color }} />
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tierBadge(t.tier)}`}>{t.tier}</span>
                          <p className="font-bold text-gray-900">{t.count} customers</p>
                        </div>
                        <p className="text-2xl font-black text-blue-600">{t.ltv}</p>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        <div className="bg-white rounded-lg p-2.5 text-center">
                          <p className="text-lg font-black text-gray-900">{t.avg}</p>
                          <p className="text-xs text-gray-500">Avg Spend</p>
                        </div>
                        <div className="bg-white rounded-lg p-2.5 text-center">
                          <p className="text-lg font-black text-gray-900">{t.retention}</p>
                          <p className="text-xs text-gray-500">Retention</p>
                        </div>
                        <div className="bg-white rounded-lg p-2.5 text-center">
                          <p className="text-lg font-black text-gray-900">{t.avgVisits}</p>
                          <p className="text-xs text-gray-500">Avg Visits</p>
                        </div>
                        <div className="bg-white rounded-lg p-2.5 text-center">
                          <p className="text-lg font-black text-blue-600">{t.redeemRate}</p>
                          <p className="text-xs text-gray-500">Redeem Rate</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Top preference: <span className="font-semibold text-gray-700">{t.topPref}</span></p>
                    </div>
                  )
                })()}

                {/* Points + LTV footer */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Points Issued (30d)</p>
                    <p className="text-lg font-black text-gray-900">48,200</p>
                    <p className="text-xs text-blue-600 font-medium">↑ 14%</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Points Redeemed</p>
                    <p className="text-lg font-black text-gray-900">12,400</p>
                    <p className="text-xs text-gray-400">25.7% rate</p>
                  </div>
                </div>
                <div className="bg-blue-600 rounded-xl p-4 mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-xs">Total Customer Lifetime Value</p>
                    <p className="text-blue-100 text-xs mt-0.5">214 customers · all tiers</p>
                  </div>
                  <p className="text-3xl font-black text-white">₹51.1L</p>
                </div>
              </div>
            )
          })()}
        </div>
      </div>
    </div>
  )

  const views: Record<View, () => JSX.Element | null> = {
    'checkin-flow': renderCheckinFlow,
    'repeat-flow': renderRepeatFlow,
    'dashboard': renderDashboard,
    'customer-detail': renderCustomerDetail,
    'rewards': renderRewards,
    'outreach': renderOutreach,
    'wa-command': renderWACommand,
    'insights': renderInsights,
  }

  // ── RENDER ────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:text-blue-200 p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></button>
          <h2 className="text-lg font-bold italic text-yellow-400">modenX</h2>
        </div>
        <div className="flex items-center space-x-2 bg-blue-700 px-4 py-2 rounded cursor-pointer hover:bg-blue-800">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/></svg>
          <span className="text-sm font-medium">Ensemble</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-white text-gray-700 px-4 py-2 rounded-md space-x-2 min-w-64">
            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            <span className="text-sm text-gray-600 flex-1">27/1, Haralur Main R...</span>
          </div>
          <div className="relative">
            <div className="bg-white text-blue-600 p-2 rounded"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg></div>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">2</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-56 bg-blue-600 text-white flex flex-col flex-shrink-0 overflow-y-auto">
            <div className="p-3 border-b border-blue-500">
              <p className="text-xs font-bold italic text-yellow-400">MODENX</p>
              <p className="text-blue-200 text-xs">Offline Customer Platform</p>
            </div>
            <nav className="flex-1 py-1">
              <p className="px-4 pt-3 pb-1 text-xs text-blue-300 font-semibold uppercase tracking-wider">Core</p>
              {NAV.map((item) => {
                const isActive = item.view === activeView || (item.view === 'dashboard' && activeView === 'customer-detail')
                return (
                  <div key={item.label} onClick={() => { setActiveView(item.view); setSelectedCustomer(null) }}
                    className={`flex items-center px-4 py-2.5 text-sm cursor-pointer transition-all ${isActive ? 'bg-white text-blue-700 font-semibold' : 'hover:bg-blue-700'}`}>
                    <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d={item.icon} /></svg>
                    <span>{item.label}</span>
                  </div>
                )
              })}
              <p className="px-4 pt-4 pb-1 text-xs text-blue-300 font-semibold uppercase tracking-wider">More</p>
              {NAV_OTHER.map((item) => (
                <div key={item.label} className="flex items-center px-4 py-2.5 text-sm opacity-60 cursor-default">
                  <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d={item.icon} /></svg>
                  <span>{item.label}</span>
                </div>
              ))}
            </nav>
          </div>
        )}

        {/* Main */}
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="p-6 max-w-5xl mx-auto">
            {views[activeView]()}
          </div>
        </main>
      </div>

      {/* ── MANUAL CHECK-IN MODAL ── */}
      {manualCheckin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setManualCheckin(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
              <p className="text-white font-semibold">Manual Check-In</p>
              <button onClick={() => setManualCheckin(false)} className="text-blue-200 hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-500">Check in a customer who didn&apos;t scan the QR — enter their phone to look up or create a new profile.</p>
              <div>
                <label className="text-xs text-gray-600 font-medium">Phone Number *</label>
                <input type="text" placeholder="+91 98765 43210" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">MK</div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Meera Kapoor</p>
                    <p className="text-xs text-gray-500">Gold · 7 visits · 2,450 pts</p>
                  </div>
                  <span className="ml-auto text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">Match found</span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-500 font-medium mb-2">Or create new customer:</p>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs text-gray-500">Name</label><input type="text" placeholder="Full Name" className="mt-0.5 w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-blue-400" /></div>
                  <div><label className="text-xs text-gray-500">Email</label><input type="text" placeholder="Optional" className="mt-0.5 w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-blue-400" /></div>
                </div>
              </div>
              <button onClick={() => setManualCheckin(false)} className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700">Check In Customer</button>
            </div>
          </div>
        </div>
      )}

      {/* ── OUTREACH MODAL ── */}
      {outreachModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOutreachModal(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
            <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-white text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">{outreachModal.avatar}</div>
                <div>
                  <p className="text-white font-semibold text-sm">{outreachModal.name}</p>
                  <p className="text-blue-200 text-xs">{outreachModal.phone} {outreachModal.email ? `· ${outreachModal.email}` : ''} {outreachModal.instagram ? `· ${outreachModal.instagram}` : ''}</p>
                  <div className="flex items-center space-x-1.5 mt-1">
                    {[
                      { icon: '💬', on: outreachModal.channels.whatsapp },
                      { icon: '📱', on: outreachModal.channels.sms },
                      { icon: '📧', on: outreachModal.channels.email },
                      { icon: '📸', on: outreachModal.channels.instagram },
                    ].map((ch, i) => (
                      <span key={i} className={`text-xs ${ch.on ? 'opacity-100' : 'opacity-30'}`}>{ch.icon}</span>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={() => setOutreachModal(null)} className="text-blue-200 hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            {!outreachSent ? (
              <div className="flex divide-x divide-gray-100 max-h-[70vh]">
                <div className="w-56 flex-shrink-0 overflow-y-auto">
                  <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase border-b border-gray-100">Templates</p>
                  {outreachTemplates.map((t) => (
                    <div key={t.id} onClick={() => setOutreachTemplate(t)}
                      className={`px-4 py-3 cursor-pointer border-l-4 ${outreachTemplate.id === t.id ? 'border-blue-600 bg-blue-50' : 'border-transparent hover:bg-gray-50'}`}>
                      <p className="text-sm font-medium text-gray-900">{t.name}</p>
                      <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded mt-0.5 inline-block">{t.channel}</span>
                    </div>
                  ))}
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 bg-blue-50 p-5 overflow-y-auto">
                    <div className="max-w-xs bg-white rounded-tr-xl rounded-b-xl shadow-sm p-4">
                      <p className="text-gray-800 text-sm leading-relaxed">{fillTemplate(outreachTemplate, outreachModal)}</p>
                      <p className="text-right text-gray-400 text-xs mt-2">Now ✓✓</p>
                    </div>
                  </div>
                  <div className="px-5 py-4 border-t bg-white">
                    <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700" onClick={() => setOutreachSent(true)}>
                      Send via {outreachTemplate.channel}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-10 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Sent!</h3>
                <p className="text-gray-500 text-sm mb-4">{outreachTemplate.name} → {outreachModal.name} via {outreachTemplate.channel}</p>
                <button className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50" onClick={() => setOutreachModal(null)}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
