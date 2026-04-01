'use client'

import { useState } from 'react'

const mockCustomers = [
  {
    id: 'C001',
    name: 'Priya Sharma',
    phone: '+91 98765 43210',
    checkInTime: '10:32 AM',
    visits: 7,
    lastVisit: '12 Mar 2026',
    preferences: ['Ethnic Wear', 'Accessories'],
    tier: 'Gold',
    points: 2450,
    avatar: 'PS',
  },
  {
    id: 'C002',
    name: 'Rahul Mehta',
    phone: '+91 87654 32109',
    checkInTime: '11:05 AM',
    visits: 3,
    lastVisit: '01 Feb 2026',
    preferences: ['Formals', 'Footwear'],
    tier: 'Silver',
    points: 870,
    avatar: 'RM',
  },
  {
    id: 'C003',
    name: 'Ananya Iyer',
    phone: '+91 76543 21098',
    checkInTime: '11:48 AM',
    visits: 14,
    lastVisit: '28 Mar 2026',
    preferences: ['Western', 'Bags', 'Jewellery'],
    tier: 'Platinum',
    points: 5200,
    avatar: 'AI',
  },
]

const whatsappTemplates = [
  {
    id: 'T001',
    name: 'Welcome Back Offer',
    category: 'MARKETING',
    body: "Hi {{name}}! Welcome back to MODENX {{store}}. As our valued {{tier}} member, here's an exclusive *15% OFF* on your purchase today. Valid till end of day. Show this message at billing.",
  },
  {
    id: 'T002',
    name: 'New Arrivals Alert',
    category: 'MARKETING',
    body: 'Hey {{name}}! We know you love {{preference}}. Check out our latest arrivals — freshly stocked just for you. Visit us in-store or browse at modenx.in. Reply STOP to opt out.',
  },
  {
    id: 'T003',
    name: 'Loyalty Points Reminder',
    category: 'TRANSACTIONAL',
    body: 'Hi {{name}}, you have *{{points}} reward points* ready to redeem at MODENX! That\'s ₹{{points_value}} off on your next purchase. Visit us soon before they expire on {{expiry}}.',
  },
  {
    id: 'T004',
    name: 'Post Visit Thank You',
    category: 'CUSTOMER_SERVICE',
    body: 'Thank you for visiting MODENX, {{name}}! We hope you loved your experience. Rate us ⭐⭐⭐⭐⭐ and earn 50 bonus points. Tap: modenx.in/review',
  },
]

const NAV_ITEMS = [
  { label: 'Home - Live Customer', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
  { label: 'Manage Brand/Stores', icon: 'M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z' },
  { label: 'Manage Rewards', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
  { label: 'Download QR Code', icon: 'M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H9V11M15,11H17V13H15V11M19,11H21V13H19V11M1,21H23L12,10L1,21Z' },
  { label: 'Insights', icon: 'M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8L16,11.78Z' },
  { label: 'Marketing Campaigns', icon: 'M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V22H19V19H5V22H3V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M14,9H10A5,5 0 0,0 5,14H19A5,5 0 0,0 14,9Z' },
  { label: 'WhatsApp Campaigns', icon: 'M17.472,14.382c-0.297,0.297-0.626,0.569-0.987,0.816c-1.158,0.795-2.517,1.219-3.935,1.227c-1.415,0.008-2.86-0.396-4.115-1.146l-3.77,0.988l1.009-3.678c-0.764-1.264-1.148-2.696-1.117-4.135c0.031-1.438,0.466-2.852,1.264-4.098c0.797-1.246,1.933-2.31,3.292-3.088c1.359-0.778,2.905-1.152,4.477-1.084c1.572,0.068,3.08,0.578,4.366,1.477c1.286,0.899,2.315,2.158,2.983,3.647c0.668,1.489,0.859,3.146,0.552,4.801C19.177,12.106,18.557,13.294,17.472,14.382z' },
  { label: 'Manage Greetings', icon: 'M20,4V16H8.91L7.14,17.77C7.06,17.85 6.96,17.91 6.84,17.91H6.8C6.57,17.91 6.4,17.74 6.4,17.5V16H4A2,2 0 0,1 2,14V4A2,2 0 0,1 4,2H18A2,2 0 0,1 20,4Z' },
  { label: 'Payments & Invoices', icon: 'M11.8,10.9C9.53,10.31 8.8,9.7 8.8,8.75C8.8,7.66 9.81,6.9 11.5,6.9C13.28,6.9 13.94,7.75 14,9H16.21C16.14,7.28 15.09,5.7 13,5.19V3H10V5.16C8.06,5.58 6.5,6.84 6.5,8.77C6.5,11.08 8.41,12.23 11.2,12.9C13.7,13.5 14.2,14.38 14.2,15.31C14.2,16 13.71,17.1 11.5,17.1C9.44,17.1 8.63,16.18 8.5,15H6.32C6.44,17.19 8.08,18.42 10,18.83V21H13V18.85C14.95,18.5 16.5,17.35 16.5,15.3C16.5,12.46 14.07,11.5 11.8,10.9Z' },
  { label: 'Message Center', icon: 'M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z' },
  { label: 'Account Profile', icon: 'M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z' },
  { label: 'User Setting', icon: 'M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.97 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.95C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.95L19.05,18.95C19.27,19.04 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z' },
]

type Step = 'checkin-qr' | 'checkin-form' | 'checkin-confirmed' | 'retailer-dashboard' | 'whatsapp-select' | 'whatsapp-compose' | 'whatsapp-sent' | 'analytics'

const STEPS: { id: Step; label: string }[] = [
  { id: 'checkin-qr', label: '1. QR Scan' },
  { id: 'checkin-form', label: '2. Check-In Form' },
  { id: 'checkin-confirmed', label: '3. Confirmed' },
  { id: 'retailer-dashboard', label: '4. Live Dashboard' },
  { id: 'whatsapp-select', label: '5. Select Customer' },
  { id: 'whatsapp-compose', label: '6. Compose' },
  { id: 'whatsapp-sent', label: '7. Message Sent' },
  { id: 'analytics', label: '8. Analytics' },
]

// Maps each step to which sidebar item should appear "active"
const STEP_NAV: Record<Step, string> = {
  'checkin-qr': 'Download QR Code',
  'checkin-form': 'Home - Live Customer',
  'checkin-confirmed': 'Home - Live Customer',
  'retailer-dashboard': 'Home - Live Customer',
  'whatsapp-select': 'WhatsApp Campaigns',
  'whatsapp-compose': 'WhatsApp Campaigns',
  'whatsapp-sent': 'WhatsApp Campaigns',
  'analytics': 'Insights',
}

export default function MockupPresentation() {
  const [currentStep, setCurrentStep] = useState<Step>('checkin-qr')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedCustomer, setSelectedCustomer] = useState(mockCustomers[0])
  const [selectedTemplate, setSelectedTemplate] = useState(whatsappTemplates[0])

  const currentIdx = STEPS.findIndex(s => s.id === currentStep)
  const activeNav = STEP_NAV[currentStep]

  const goNext = () => { if (currentIdx < STEPS.length - 1) setCurrentStep(STEPS[currentIdx + 1].id) }
  const goPrev = () => { if (currentIdx > 0) setCurrentStep(STEPS[currentIdx - 1].id) }

  const fillTemplate = (t: typeof whatsappTemplates[0], c: typeof mockCustomers[0]) =>
    t.body
      .replace('{{name}}', c.name.split(' ')[0])
      .replace('{{store}}', 'Ensemble · HSR Layout')
      .replace('{{tier}}', c.tier)
      .replace('{{preference}}', c.preferences[0])
      .replace('{{points}}', String(c.points))
      .replace('{{points_value}}', String(Math.floor(c.points / 10)))
      .replace('{{expiry}}', '30 Apr 2026')

  const tierBadge = (tier: string) => {
    if (tier === 'Platinum') return 'bg-blue-800 text-white'
    if (tier === 'Gold') return 'bg-blue-600 text-white'
    return 'bg-blue-100 text-blue-700'
  }

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">

      {/* ── PRESENTATION BANNER ── */}
      <div className="bg-blue-700 text-white text-center text-xs py-1.5 font-medium tracking-wide flex items-center justify-center space-x-6">
        <span>BOARD PRESENTATION MOCKUP — April 2026</span>
        <div className="flex items-center space-x-1">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(s.id)}
              className={`px-2.5 py-0.5 rounded text-xs transition-all ${currentStep === s.id ? 'bg-white text-blue-700 font-bold' : 'text-blue-200 hover:text-white'}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── ACTUAL APP HEADER ── */}
      <header className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:text-blue-200 focus:outline-none p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h2 className="text-lg font-bold italic text-yellow-400">modenX</h2>
        </div>

        {/* Store dropdown */}
        <div className="flex items-center space-x-2 bg-blue-700 px-4 py-2 rounded cursor-pointer hover:bg-blue-800">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
          </svg>
          <span className="text-sm font-medium">Ensemble</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
        </div>

        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="flex items-center bg-white text-gray-700 px-4 py-2 rounded-md space-x-2 min-w-64">
            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <span className="text-sm text-gray-600 flex-1">27/1, Haralur Main R...</span>
            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
          </div>
          {/* Bell */}
          <div className="relative">
            <div className="bg-white text-blue-600 p-2 rounded">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
              </svg>
            </div>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">2</span>
          </div>
        </div>
      </header>

      {/* ── BODY: SIDEBAR + MAIN ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── SIDEBAR ── */}
        {sidebarOpen && (
          <div className="w-72 bg-blue-600 text-white flex flex-col flex-shrink-0 overflow-y-auto">
            <div className="p-4 border-b border-blue-500">
              <h1 className="text-base font-bold italic text-yellow-400">MODENX</h1>
            </div>
            <nav className="flex-1 py-1">
              {NAV_ITEMS.map((item) => {
                const isActive = item.label === activeNav
                return (
                  <div
                    key={item.label}
                    className={`flex items-center px-5 py-3 text-sm cursor-pointer transition-all ${
                      isActive
                        ? 'bg-white text-blue-700 font-semibold border-r-4 border-blue-700'
                        : 'hover:bg-blue-700 text-white'
                    }`}
                  >
                    <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d={item.icon} />
                    </svg>
                    <span>{item.label}</span>
                  </div>
                )
              })}
            </nav>
          </div>
        )}

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="p-8 max-w-5xl mx-auto">

            {/* ── STEP 1: QR SCAN ── */}
            {currentStep === 'checkin-qr' && (
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Download QR Code</h1>
                <p className="text-gray-500 mb-6 text-sm">Share this QR at your store entrance. Customers scan to check in — no app required.</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  <div className="space-y-4">
                    {[
                      { icon: '🔐', title: 'Unique per Store', desc: 'Every retailer gets a dedicated QR linked to their MODENX account' },
                      { icon: '📲', title: 'No App Needed', desc: 'Opens instantly in the customer\'s browser — zero friction' },
                      { icon: '⚡', title: 'Instant Notification', desc: 'Retailer gets a real-time ping the moment any customer scans' },
                      { icon: '💬', title: 'WhatsApp Opt-In Captured', desc: 'Consent collected at check-in — Meta Business API compliant' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start space-x-4 border border-gray-200 rounded-lg p-4">
                        <span className="text-2xl flex-shrink-0">{item.icon}</span>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                          <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* QR Card */}
                  <div className="flex justify-center">
                    <div className="border border-gray-200 rounded-2xl p-6 w-72 text-center shadow-sm">
                      <div className="bg-blue-600 rounded-xl p-4 mb-4">
                        <p className="text-yellow-400 font-bold italic text-lg">modenX</p>
                        <p className="text-blue-200 text-xs mt-0.5">Ensemble · HSR Layout, Bengaluru</p>
                      </div>
                      {/* QR visual */}
                      <div className="border-2 border-gray-200 rounded-xl p-3 mb-4 mx-auto w-44 h-44 flex items-center justify-center relative bg-white">
                        <div className="grid grid-cols-7 gap-0.5 w-36 h-36">
                          {Array.from({ length: 49 }).map((_, i) => {
                            const corner = [0,1,7,8,5,6,13,14,35,36,43,44,40,41,47,48].includes(i)
                            const rand = [2,10,18,22,25,30,33,38,46,3,19,27,31].includes(i)
                            return <div key={i} className={`w-full h-full ${corner ? 'bg-blue-700' : rand ? 'bg-blue-900' : 'bg-white'}`} />
                          })}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white p-1 rounded shadow">
                            <div className="bg-blue-600 w-8 h-8 rounded flex items-center justify-center">
                              <span className="text-white font-black text-xs">MX</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="w-full border-2 border-blue-600 text-blue-600 font-semibold py-2 rounded-lg text-sm hover:bg-blue-50">
                        Download QR Code
                      </button>
                      <div className="mt-3 flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-blue-600 font-medium">Store Open · 47 visits today</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 2: CHECK-IN FORM ── */}
            {currentStep === 'checkin-form' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">Customer Check-In</h1>
                  <p className="text-gray-500 mb-6 text-sm">After scanning the QR, the customer fills a lightweight web form. Returning customers are pre-filled via phone lookup.</p>
                  <div className="border border-blue-100 bg-blue-50 rounded-lg p-4">
                    <p className="text-blue-800 font-semibold text-sm">WhatsApp Opt-In</p>
                    <p className="text-blue-700 text-xs mt-1">Explicit consent is captured here — required for Meta Business API outreach. Fully compliant.</p>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      'Customer arrives → scans store QR code',
                      'Browser opens check-in form instantly',
                      'New customer fills details in ~30 seconds',
                      'Returning customer is auto pre-filled',
                      'Retailer gets live notification on dashboard',
                    ].map((step, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
                        <p className="text-sm text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phone mockup */}
                <div className="flex justify-center">
                  <div className="w-68 bg-gray-900 rounded-3xl p-3 shadow-2xl">
                    <div className="bg-white rounded-2xl overflow-hidden">
                      <div className="bg-gray-800 px-4 py-1.5 flex justify-between">
                        <span className="text-white text-xs">9:41 AM</span>
                        <span className="text-white text-xs">●●●</span>
                      </div>
                      <div className="bg-gray-100 px-3 py-1.5">
                        <div className="bg-white rounded text-xs text-gray-500 px-2 py-0.5">checkin.modenx.in/tattva</div>
                      </div>
                      <div className="p-4">
                        <div className="text-center mb-4">
                          <p className="text-blue-600 font-bold italic text-base">modenX</p>
                          <p className="text-gray-500 text-xs">Ensemble · HSR Layout</p>
                        </div>
                        <div className="space-y-2.5">
                          <div>
                            <p className="text-xs text-gray-500">Full Name *</p>
                            <div className="border border-gray-300 rounded px-2 py-1.5 text-xs bg-gray-50 mt-0.5">Priya Sharma</div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">WhatsApp Number *</p>
                            <div className="border border-gray-300 rounded px-2 py-1.5 text-xs bg-gray-50 mt-0.5">+91 98765 43210</div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Preferences</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {['Ethnic Wear', 'Western', 'Formals', 'Bags'].map(p => (
                                <span key={p} className={`text-xs px-2 py-0.5 rounded-full border ${p === 'Ethnic Wear' ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-500'}`}>{p}</span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-start space-x-2 bg-blue-50 rounded p-2">
                            <div className="w-3 h-3 bg-blue-600 rounded-sm flex items-center justify-center mt-0.5 flex-shrink-0">
                              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            </div>
                            <p className="text-xs text-blue-700">I agree to receive offers on WhatsApp from this store</p>
                          </div>
                          <button className="w-full bg-blue-600 text-white text-sm font-semibold py-2 rounded-lg">Check In ✓</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 3: CONFIRMED ── */}
            {currentStep === 'checkin-confirmed' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">Check-In Confirmed</h1>
                  <p className="text-gray-500 mb-6 text-sm">The customer sees a personalised welcome. The retailer gets an instant dashboard notification with visit history and preferences.</p>

                  <div className="border border-gray-200 rounded-xl p-5">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Retailer notification:</p>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">PS</div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">Priya Sharma checked in</p>
                        <p className="text-gray-500 text-xs">Gold Member · 7 visits · Loves Ethnic Wear · 2,450 pts</p>
                      </div>
                      <span className="text-xs text-blue-600 font-medium">Just now</span>
                    </div>
                  </div>
                </div>

                {/* Customer phone */}
                <div className="flex justify-center">
                  <div className="w-68 bg-gray-900 rounded-3xl p-3 shadow-2xl">
                    <div className="bg-white rounded-2xl overflow-hidden">
                      <div className="bg-gray-800 px-4 py-1.5 flex justify-between">
                        <span className="text-white text-xs">9:41 AM</span>
                        <span className="text-white text-xs">●●●</span>
                      </div>
                      <div className="p-6 text-center">
                        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg className="w-7 h-7 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-blue-600 font-bold italic mb-1">modenX</p>
                        <p className="text-xl font-bold text-gray-900">Welcome back,</p>
                        <p className="text-xl font-bold text-blue-600 mb-3">Priya! 🎉</p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                          <p className="text-blue-800 font-semibold text-sm">🏆 Gold Member</p>
                          <p className="text-blue-600 text-xs mt-0.5">2,450 reward points · ₹245 off today</p>
                        </div>
                        <div className="text-left space-y-1.5 text-xs text-gray-600">
                          <div className="flex justify-between"><span>Total Visits</span><span className="font-semibold text-gray-900">7 times</span></div>
                          <div className="flex justify-between"><span>Last Visit</span><span className="font-semibold text-gray-900">12 Mar 2026</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 4: LIVE DASHBOARD ── */}
            {currentStep === 'retailer-dashboard' && (
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Customers</h1>

                {/* Filter Tabs — matching actual app style */}
                <div className="flex items-center space-x-3 mb-6 flex-wrap gap-y-2">
                  {[
                    { label: 'Live Customers', value: '3' },
                    { label: 'Last 12 Hours', value: '18' },
                    { label: 'Last 24 Hours', value: '47' },
                    { label: 'Last 1 Week', value: '214' },
                  ].map((tab, i) => (
                    <button key={i} className={`border-2 border-blue-600 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${i === 0 ? 'bg-blue-600 text-white' : 'text-blue-600 bg-white hover:bg-blue-50'}`}>
                      {tab.label} : {tab.value}
                    </button>
                  ))}
                  <div className="ml-auto flex items-center border border-gray-300 rounded-lg px-3 py-2 min-w-52 space-x-2">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                    <span className="text-sm text-gray-400">Search Customer</span>
                    <svg className="w-4 h-4 text-gray-400 ml-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
                  </div>
                </div>

                {/* Customer Cards */}
                <div className="space-y-3">
                  {mockCustomers.map((c) => (
                    <div
                      key={c.id}
                      className={`flex items-center space-x-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedCustomer.id === c.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                      onClick={() => setSelectedCustomer(c)}
                    >
                      <div className="w-11 h-11 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">{c.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold text-gray-900">{c.name}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tierBadge(c.tier)}`}>{c.tier}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{c.phone} · Checked in {c.checkInTime} · {c.visits} total visits</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {c.preferences.slice(0, 2).map(p => (
                            <span key={p} className="border border-blue-200 text-blue-700 text-xs px-2 py-0.5 rounded-full">{p}</span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 space-y-1">
                        <div className="flex items-center space-x-1 justify-end">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-blue-600 font-medium">In Store</span>
                        </div>
                        <p className="text-xs text-gray-400">{c.points.toLocaleString()} pts</p>
                        <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
                          Send WhatsApp
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── STEP 5: WHATSAPP SELECT ── */}
            {currentStep === 'whatsapp-select' && (
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">WhatsApp Campaigns</h1>
                <p className="text-gray-500 mb-6 text-sm">Reach checked-in customers individually or in bulk — by tier, preference, or recency.</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="border border-gray-200 rounded-xl p-4">
                    <p className="font-semibold text-gray-900 text-sm mb-3">Outreach Type</p>
                    {[
                      { type: 'Individual', desc: 'One customer', icon: '👤', active: true },
                      { type: 'By Tier', desc: 'Gold, Platinum...', icon: '🏆', active: false },
                      { type: 'By Preference', desc: 'Ethnic, Western...', icon: '🛍️', active: false },
                      { type: 'All Checked-In Today', desc: '47 customers', icon: '🏪', active: false },
                    ].map((opt) => (
                      <div key={opt.type} className={`flex items-center space-x-3 p-3 rounded-lg border mb-2 cursor-pointer ${opt.active ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}>
                        <span>{opt.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{opt.type}</p>
                          <p className="text-xs text-gray-400">{opt.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="lg:col-span-2 border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                      <p className="font-semibold text-gray-900 text-sm">Select Customer</p>
                      <span className="text-xs text-gray-500">3 in store now</span>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {mockCustomers.map((c) => (
                        <div key={c.id} className={`flex items-center space-x-4 px-4 py-3 cursor-pointer ${selectedCustomer.id === c.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`} onClick={() => setSelectedCustomer(c)}>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedCustomer.id === c.id ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                            {selectedCustomer.id === c.id && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                          </div>
                          <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">{c.avatar}</div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-sm">{c.name}</p>
                            <p className="text-xs text-gray-500">{c.tier} · {c.preferences[0]} · {c.phone}</p>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tierBadge(c.tier)}`}>{c.tier}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-100">
                      <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700 flex items-center justify-center space-x-2" onClick={() => setCurrentStep('whatsapp-compose')}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
                        <span>Send WhatsApp to {selectedCustomer.name.split(' ')[0]}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 6: COMPOSE ── */}
            {currentStep === 'whatsapp-compose' && (
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Compose Message</h1>
                <p className="text-gray-500 mb-6 text-sm">Pick a Meta-approved template — auto-personalised with the customer's name, tier, and preferences.</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Templates */}
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
                      <p className="font-semibold text-gray-900 text-sm">Approved Templates</p>
                      <p className="text-xs text-gray-400 mt-0.5">All Meta Business API approved</p>
                    </div>
                    <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
                      {whatsappTemplates.map((t) => (
                        <div key={t.id} className={`p-4 cursor-pointer border-l-4 transition-all ${selectedTemplate.id === t.id ? 'border-blue-600 bg-blue-50' : 'border-transparent hover:bg-gray-50'}`} onClick={() => setSelectedTemplate(t)}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm">{t.name}</p>
                              <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded mt-1 inline-block">{t.category}</span>
                              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{t.body.replace(/{{.*?}}/g, '...')}</p>
                            </div>
                            <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-medium flex-shrink-0">Approved</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Preview */}
                  <div>
                    <div className="border border-gray-200 rounded-xl p-4 mb-4">
                      <p className="font-semibold text-gray-900 text-sm mb-2">Sending to:</p>
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">{selectedCustomer.avatar}</div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{selectedCustomer.name}</p>
                          <p className="text-xs text-gray-500">{selectedCustomer.phone} · WhatsApp Opt-in ✓</p>
                        </div>
                      </div>
                    </div>

                    {/* Chat preview */}
                    <div className="rounded-xl overflow-hidden border border-gray-200">
                      <div className="bg-blue-700 px-4 py-3 flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                          <span className="text-blue-700 font-bold text-xs">MX</span>
                        </div>
                        <div>
                          <p className="text-white text-sm font-semibold">MODENX · Ensemble</p>
                          <p className="text-blue-200 text-xs">Business Account · Meta Verified</p>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 min-h-28">
                        <div className="max-w-xs bg-white rounded-tr-xl rounded-b-xl shadow-sm p-3 ml-auto">
                          <p className="text-gray-800 text-xs leading-relaxed">{fillTemplate(selectedTemplate, selectedCustomer)}</p>
                          <div className="flex justify-end items-center space-x-1 mt-1">
                            <span className="text-gray-400 text-xs">10:32 AM</span>
                            <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 16 15"><path d="M15.01 3.316l-.478-.372a.365.365 0 00-.51.063L8.666 9.879a.32.32 0 01-.484.033l-.358-.325a.319.319 0 00-.484.032l-.378.483a.418.418 0 00.036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 00-.064-.512zm-4.1 0l-.478-.372a.365.365 0 00-.51.063L4.566 9.879a.32.32 0 01-.484.033L1.891 7.769a.366.366 0 00-.515.006l-.423.433a.364.364 0 00.006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 00-.063-.51z"/></svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 flex items-center justify-center space-x-2" onClick={() => setCurrentStep('whatsapp-sent')}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                      <span>Send via WhatsApp Business API</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 7: SENT ── */}
            {currentStep === 'whatsapp-sent' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">Message Delivered</h1>
                  <p className="text-gray-500 mb-6 text-sm">Delivered via Meta Business API with live tracking — retailer sees delivery, read receipts, and replies in real time.</p>
                  <div className="space-y-3">
                    {[
                      { label: 'Sent via API', time: '10:32:01 AM', shade: 'bg-blue-300' },
                      { label: 'Delivered to Device', time: '10:32:03 AM', shade: 'bg-blue-400' },
                      { label: 'Read by Customer', time: '10:35:22 AM', shade: 'bg-blue-600' },
                      { label: 'Customer Replied', time: '10:41:05 AM', shade: 'bg-blue-800' },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center space-x-3 border border-gray-200 rounded-lg p-3">
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${s.shade}`}></div>
                        <p className="text-sm font-medium text-gray-900 flex-1">{s.label}</p>
                        <span className="text-xs text-gray-400">{s.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phone — customer view */}
                <div className="flex justify-center">
                  <div className="w-68 bg-gray-900 rounded-3xl p-3 shadow-2xl">
                    <div className="rounded-2xl overflow-hidden">
                      <div className="bg-blue-700 px-3 py-2.5 flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-700 font-black text-xs">MX</span>
                        </div>
                        <div>
                          <p className="text-white text-xs font-semibold">MODENX · Ensemble</p>
                          <p className="text-blue-200 text-xs">Business · Verified</p>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-3 space-y-3 min-h-52">
                        <div className="bg-white rounded-tr-xl rounded-b-xl shadow-sm p-2.5 max-w-52">
                          <p className="text-gray-800 text-xs leading-relaxed">{fillTemplate(selectedTemplate, selectedCustomer)}</p>
                          <div className="flex justify-end items-center space-x-1 mt-1">
                            <span className="text-gray-400 text-xs">10:32 AM</span>
                            <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 16 15"><path d="M15.01 3.316l-.478-.372a.365.365 0 00-.51.063L8.666 9.879a.32.32 0 01-.484.033l-.358-.325a.319.319 0 00-.484.032l-.378.483a.418.418 0 00.036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 00-.064-.512zm-4.1 0l-.478-.372a.365.365 0 00-.51.063L4.566 9.879a.32.32 0 01-.484.033L1.891 7.769a.366.366 0 00-.515.006l-.423.433a.364.364 0 00.006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 00-.063-.51z"/></svg>
                          </div>
                        </div>
                        <div className="bg-blue-600 rounded-tl-xl rounded-b-xl shadow-sm p-2.5 max-w-44 ml-auto">
                          <p className="text-white text-xs">Yes! Coming to billing right now 😊</p>
                          <p className="text-blue-200 text-xs text-right mt-1">10:41 AM</p>
                        </div>
                      </div>
                      <div className="bg-white px-3 py-2 flex items-center space-x-2 border-t border-blue-100">
                        <div className="flex-1 bg-blue-50 rounded-full px-3 py-1.5 text-xs text-gray-400">Message</div>
                        <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 8: ANALYTICS ── */}
            {currentStep === 'analytics' && (
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Insights</h1>
                <p className="text-gray-500 mb-6 text-sm">Full visibility from check-in to purchase — measure the ROI of every WhatsApp message sent.</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Messages Sent Today', value: '31', sub: '+12% vs yesterday', border: 'border-blue-300' },
                    { label: 'Delivery Rate', value: '98.7%', sub: 'Meta verified', border: 'border-blue-400' },
                    { label: 'Open Rate', value: '87.3%', sub: 'Industry avg: 62%', border: 'border-blue-600' },
                    { label: 'Conversion Rate', value: '41%', sub: '13 purchases driven', border: 'border-blue-800' },
                  ].map((k, i) => (
                    <div key={i} className={`bg-white border-l-4 ${k.border} border border-gray-200 rounded-xl p-5 shadow-sm`}>
                      <p className="text-3xl font-black text-blue-600">{k.value}</p>
                      <p className="text-gray-700 text-sm font-medium mt-1">{k.label}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{k.sub}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-900 mb-4">Template Performance</h3>
                    <div className="space-y-4">
                      {[
                        { name: 'Welcome Back Offer', rate: 50, sent: 18, purchased: 9 },
                        { name: 'New Arrivals Alert', rate: 38, sent: 8, purchased: 3 },
                        { name: 'Loyalty Points Reminder', rate: 20, sent: 5, purchased: 1 },
                      ].map((t, i) => (
                        <div key={i}>
                          <div className="flex justify-between mb-1">
                            <p className="text-sm text-gray-700 font-medium">{t.name}</p>
                            <span className="text-xs font-bold text-blue-600">{t.rate}% CVR</span>
                          </div>
                          <div className="w-full bg-blue-50 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${t.rate * 2}%` }} />
                          </div>
                          <p className="text-xs text-gray-400 mt-1">{t.sent} sent · {t.purchased} purchased</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-900 mb-4">Revenue Attributed to WhatsApp</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Today's Revenue</p>
                          <p className="text-xs text-gray-500">13 converted customers</p>
                        </div>
                        <p className="text-2xl font-black text-blue-600">₹21,450</p>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-100 rounded-lg border border-blue-200">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">This Month</p>
                          <p className="text-xs text-gray-500">847 msgs · 312 conversions</p>
                        </div>
                        <p className="text-2xl font-black text-blue-700">₹5.8L</p>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Cost Per Message</p>
                          <p className="text-xs text-gray-500">via Meta Business API</p>
                        </div>
                        <p className="text-2xl font-black text-blue-500">₹0.60</p>
                      </div>
                      <div className="bg-blue-600 rounded-xl p-4 text-center">
                        <p className="text-blue-200 text-xs mb-1">Return on Investment</p>
                        <p className="text-5xl font-black text-white">41x</p>
                        <p className="text-blue-200 text-xs mt-1">Every ₹1 spent → ₹41 revenue</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── NAV BUTTONS ── */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200">
              <button onClick={goPrev} disabled={currentIdx === 0}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-lg border-2 border-blue-600 text-blue-600 font-medium text-sm hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                <span>Previous</span>
              </button>
              <span className="text-sm text-gray-400">{currentIdx + 1} / {STEPS.length}</span>
              <button onClick={goNext} disabled={currentIdx === STEPS.length - 1}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed">
                <span>Next</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
