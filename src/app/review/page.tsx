'use client'

import { useState, useEffect } from 'react'

const questions = [
  {
    q: 'Welcome! I am ModenX AI. Thank you for watching our demo. Let me ask you — how excited are you about transforming the offline retail experience?',
    options: ['🔥 Very Excited', '👍 Interested', '🤔 Need More Info', '💡 Have Ideas'],
  },
  {
    q: 'Great! Which feature impressed you the most today?',
    options: ['📋 QR Check-In', '🤖 AI Staff Assist', '📡 Multi-Channel Outreach', '🚶 Window Shopper Recovery', '💬 WA Command Center', '📊 Journey Analytics'],
  },
  {
    q: 'Last one. If you were a retailer, would you want ModenX in your store?',
    options: ['🚀 Absolutely, sign me up!', '👀 Show me a pilot first', '💰 Depends on the pricing', '🤝 Let\u0027s discuss further'],
  },
]

export default function ReviewPage() {
  const [reviewQ, setReviewQ] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [started, setStarted] = useState(false)

  const speak = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    // Pick the most natural voice available
    const voices = window.speechSynthesis.getVoices()
    const preferred = [
      'Google UK English Female',
      'Google US English',
      'Microsoft Zira',
      'Microsoft Jenny',
      'Samantha',
      'Karen',
      'Moira',
      'Rishi',
    ]
    let bestVoice = voices.find(v => preferred.some(p => v.name.includes(p)))
    if (!bestVoice) bestVoice = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female'))
    if (!bestVoice) bestVoice = voices.find(v => v.lang.startsWith('en') && !v.localService)
    if (!bestVoice) bestVoice = voices.find(v => v.lang.startsWith('en'))
    if (bestVoice) u.voice = bestVoice
    u.rate = 0.92
    u.pitch = 1.05
    u.volume = 1.0
    u.lang = bestVoice?.lang || 'en-US'
    u.onstart = () => setIsSpeaking(true)
    u.onend = () => setIsSpeaking(false)
    window.speechSynthesis.speak(u)
  }

  // Pre-load voices (Chrome loads them async)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices()
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices()
    }
  }, [])

  const startReview = () => {
    setStarted(true)
    setTimeout(() => speak(questions[0].q), 600)
  }

  const answer = (opt: string) => {
    const next = [...answers, opt]
    setAnswers(next)
    if (reviewQ < questions.length - 1) {
      setReviewQ(reviewQ + 1)
      setTimeout(() => speak(questions[reviewQ + 1].q), 400)
    } else {
      setReviewQ(questions.length)
      setTimeout(() => speak('Thank you so much! Your feedback means the world to us. We cannot wait to bring ModenX to every retail store in India.'), 400)
    }
  }

  const isComplete = reviewQ >= questions.length
  const currentQ = questions[reviewQ] || questions[questions.length - 1]

  // Cleanup speech on unmount
  useEffect(() => {
    return () => { if (typeof window !== 'undefined') window.speechSynthesis.cancel() }
  }, [])

  if (!started) {
    return (
      <div className="min-h-screen bg-blue-600 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <span className="text-blue-600 font-black italic text-2xl">mX</span>
          </div>
          <h1 className="text-white text-2xl font-black mb-2">ModenX AI Review</h1>
          <p className="text-blue-200 text-sm mb-8">Our AI will ask you 3 quick questions about the demo. It speaks out loud — make sure your volume is on!</p>
          <button onClick={startReview}
            className="bg-white text-blue-700 font-bold px-8 py-4 rounded-2xl text-lg hover:bg-blue-50 shadow-xl w-full">
            🎤 Start Review
          </button>
          <p className="text-blue-300 text-xs mt-4">Takes less than 30 seconds</p>
        </div>
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-500 text-sm mb-6">Your feedback has been captured:</p>

          <div className="space-y-2 mb-8 text-left">
            {answers.map((a, i) => (
              <div key={i} className="flex items-center space-x-3 bg-blue-50 rounded-xl px-4 py-3">
                <span className="text-xs font-bold text-blue-400 flex-shrink-0">Q{i + 1}</span>
                <span className="text-sm font-medium text-gray-800">{a}</span>
              </div>
            ))}
          </div>

          <div className="bg-blue-600 rounded-2xl p-6 mb-6">
            <p className="text-yellow-400 font-black italic text-xl mb-1">modenX</p>
            <p className="text-white text-sm">The offline customer journey, reimagined.</p>
            <p className="text-blue-200 text-xs mt-2">Every walk-in becomes a relationship.</p>
          </div>

          <p className="text-gray-300 text-xs">modenX · Board Presentation · April 2026</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 px-6 pt-8 pb-6 text-center">
        <div className="relative inline-block mb-4">
          <div className={`w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl transition-all duration-300 ${isSpeaking ? 'ring-4 ring-blue-300 ring-offset-2 scale-110' : ''}`}>
            <span className="text-3xl">{isSpeaking ? '🗣️' : '🤖'}</span>
          </div>
          {isSpeaking && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex space-x-0.5">
              <div className="w-1 h-3 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1 h-4 bg-blue-200 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1 h-3 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              <div className="w-1 h-5 bg-blue-200 rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
              <div className="w-1 h-3 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '250ms' }} />
            </div>
          )}
        </div>
        <p className="text-yellow-400 font-black italic text-sm">ModenX AI</p>
        <p className="text-blue-200 text-xs mt-1">Question {reviewQ + 1} of {questions.length}</p>

        {/* Progress */}
        <div className="flex justify-center space-x-2 mt-3">
          {questions.map((_, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${i === reviewQ ? 'bg-white scale-125' : i < reviewQ ? 'bg-blue-300' : 'bg-blue-500'}`} />
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-6 py-6">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6 relative">
          <div className="absolute -top-2 left-6 w-4 h-4 bg-blue-50 border-l border-t border-blue-100 rotate-45" />
          <p className="text-gray-800 text-base leading-relaxed">{currentQ.q}</p>
          <button onClick={() => speak(currentQ.q)} className="mt-3 text-xs text-blue-600 hover:underline flex items-center space-x-1">
            <span>🔊</span><span>{isSpeaking ? 'Speaking...' : 'Hear this question'}</span>
          </button>
        </div>

        <div className="space-y-2">
          {currentQ.options.map((opt) => (
            <button key={opt} onClick={() => answer(opt)}
              className="w-full text-left text-base px-5 py-4 border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 active:scale-95 transition-all font-medium text-gray-700">
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
