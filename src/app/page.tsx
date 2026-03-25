'use client'

import { useState } from 'react'

export default function Dashboard() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')
  const [whatsappSubSection, setWhatsappSubSection] = useState('overview')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [showTemplateModal, setShowTemplateModal] = useState(false)

  const renderWhatsAppCampaigns = () => (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">WhatsApp Business Campaigns</h1>
            <p className="text-gray-600">Meta Business API Compliant Messaging Platform</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              + Create Template
            </button>
            <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
              View License Status
            </button>
          </div>
        </div>
        
        {/* License Status Banner */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-green-800 font-medium">Meta Business License: Active</span>
            <span className="ml-2 text-green-600 text-sm">| Rate Limit: 1000 msgs/hour | Templates: 15 Approved</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Approved Templates</p>
              <p className="text-2xl font-bold text-gray-900">15</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Messages Sent (24h)</p>
              <p className="text-2xl font-bold text-gray-900">847</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Delivery Rate</p>
              <p className="text-2xl font-bold text-gray-900">98.5%</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Opt-in Contacts</p>
              <p className="text-2xl font-bold text-gray-900">2,847</p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Template Management */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Message Templates</h3>
            <div className="flex space-x-2">
              <button className="text-sm text-gray-600 hover:text-gray-900">Filter</button>
              <button className="text-sm text-blue-600 hover:text-blue-700">+ New Template</button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {/* Template Items */}
            {[
              { name: "Welcome Message", status: "Approved", category: "MARKETING", lastUsed: "2 hours ago" },
              { name: "Order Confirmation", status: "Approved", category: "TRANSACTIONAL", lastUsed: "1 day ago" },
              { name: "Promotional Offer", status: "Pending", category: "MARKETING", lastUsed: "Never" },
              { name: "Support Follow-up", status: "Approved", category: "CUSTOMER_SERVICE", lastUsed: "3 days ago" }
            ].map((template, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{template.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span>Category: {template.category}</span>
                      <span>Last used: {template.lastUsed}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    template.status === 'Approved' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {template.status}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Monitoring</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Opt-in Rate</span>
              <span className="text-sm font-medium text-green-600">100%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Rate Limiting</span>
              <span className="text-sm font-medium text-green-600">Within Limits</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Template Compliance</span>
              <span className="text-sm font-medium text-green-600">Approved</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Business Verification</span>
              <span className="text-sm font-medium text-green-600">Verified</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="font-medium text-gray-900">Submit Template for Approval</div>
              <div className="text-sm text-gray-500">Create and submit new message templates</div>
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="font-medium text-gray-900">Manage Opt-in Lists</div>
              <div className="text-sm text-gray-500">View and manage customer consent</div>
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="font-medium text-gray-900">View Analytics</div>
              <div className="text-sm text-gray-500">Campaign performance and compliance reports</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderDashboard = () => (
    <div className="max-w-7xl mx-auto">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-black mb-8 text-center">Live Customers</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Customers */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Customers</p>
              <p className="text-3xl font-bold text-gray-900">1,248</p>
              <p className="text-green-500 text-sm">+12% from last month</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Sessions</p>
              <p className="text-3xl font-bold text-gray-900">23</p>
              <p className="text-green-500 text-sm">Currently online</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Revenue</p>
              <p className="text-3xl font-bold text-gray-900">₹84,592</p>
              <p className="text-green-500 text-sm">+8% from last week</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Live Customers with Border */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Live Customers</p>
              <p className="text-3xl font-bold text-gray-900">0</p>
              <p className="text-gray-500 text-sm">No active customers</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Dashboard Content */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-600">New customer registered - John Doe</p>
              <span className="text-xs text-gray-400">2 min ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Order completed - ₹2,450</p>
              <span className="text-xs text-gray-400">15 min ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Support ticket opened</p>
              <span className="text-xs text-gray-400">1 hour ago</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Conversion Rate</span>
              <span className="font-semibold text-green-600">3.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg. Order Value</span>
              <span className="font-semibold">₹1,847</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Customer Satisfaction</span>
              <span className="font-semibold text-green-600">98%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {sidebarExpanded && (
        <div className="w-80 bg-blue-600 text-white flex flex-col transition-all duration-300">
        {/* Logo */}
        {sidebarExpanded && (
          <div className="p-6">
            <h1 className="text-xl font-bold italic text-yellow-400">MODENX</h1>
          </div>
        )}
        
          {/* Navigation */}
          <nav className="flex-1">
              <div className="flex items-center px-6 py-3 text-sm bg-blue-700 border-r-2 border-white">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                <span>Home - Live Customer</span>
              </div>
              <div className="flex items-center px-6 py-3 text-sm hover:bg-blue-700">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
                </svg>
                <span>Manage Brand/Stores</span>
              </div>
              <div className="flex items-center px-6 py-3 text-sm hover:bg-blue-700">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Manage Rewards</span>
              </div>
              <div className="flex items-center px-6 py-3 text-sm hover:bg-blue-700">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H9V11M15,11H17V13H15V11M19,11H21V13H19V11M1,21H23L12,10L1,21Z"/>
                </svg>
                <span>Download QR Code</span>
              </div>
              <div className="flex items-center px-6 py-3 text-sm hover:bg-blue-700">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8L16,11.78Z"/>
                </svg>
                <span>Insights</span>
              </div>
              <div className="flex items-center px-6 py-3 text-sm hover:bg-blue-700 cursor-pointer">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V22H19V19H5V22H3V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M14,9H10A5,5 0 0,0 5,14H19A5,5 0 0,0 14,9Z"/>
                </svg>
                <span>Marketing Campaigns</span>
              </div>
              
              <div 
                className={`flex items-center px-6 py-3 text-sm cursor-pointer ${
                  activeSection === 'whatsapp' ? 'bg-blue-700 border-r-2 border-yellow-400' : 'hover:bg-blue-700'
                }`}
                onClick={() => setActiveSection('whatsapp')}
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472,14.382c-0.297,0.297-0.626,0.569-0.987,0.816c-1.158,0.795-2.517,1.219-3.935,1.227c-1.415,0.008-2.86-0.396-4.115-1.146l-3.77,0.988l1.009-3.678c-0.764-1.264-1.148-2.696-1.117-4.135c0.031-1.438,0.466-2.852,1.264-4.098c0.797-1.246,1.933-2.31,3.292-3.088c1.359-0.778,2.905-1.152,4.477-1.084c1.572,0.068,3.08,0.578,4.366,1.477c1.286,0.899,2.315,2.158,2.983,3.647c0.668,1.489,0.859,3.146,0.552,4.801C19.177,12.106,18.557,13.294,17.472,14.382z M7.842,18.671l2.338-0.613c1.108,0.615,2.37,0.915,3.66,0.871c1.29-0.044,2.542-0.445,3.626-1.162c1.084-0.717,1.969-1.712,2.564-2.882c0.595-1.17,0.877-2.474,0.815-3.782c-0.062-1.308-0.475-2.575-1.198-3.674c-0.723-1.099-1.731-1.996-2.92-2.601c-1.189-0.605-2.523-0.894-3.866-0.838c-1.343,0.056-2.643,0.462-3.767,1.177c-1.124,0.715-2.039,1.707-2.65,2.872c-0.611,1.165-0.894,2.465-0.822,3.769c0.072,1.304,0.495,2.567,1.227,3.664L7.842,18.671z"/>
                </svg>
                <span>WhatsApp Campaigns</span>
              </div>
              <div className="flex items-center px-6 py-3 text-sm hover:bg-blue-700">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20,4V16H8.91L7.14,17.77C7.06,17.85 6.96,17.91 6.84,17.91H6.8C6.57,17.91 6.4,17.74 6.4,17.5V16H4A2,2 0 0,1 2,14V4A2,2 0 0,1 4,2H18A2,2 0 0,1 20,4Z"/>
                </svg>
                <span>Manage Greetings</span>
              </div>
              <div className="flex items-center px-6 py-3 text-sm hover:bg-blue-700">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.8,10.9C9.53,10.31 8.8,9.7 8.8,8.75C8.8,7.66 9.81,6.9 11.5,6.9C13.28,6.9 13.94,7.75 14,9H16.21C16.14,7.28 15.09,5.7 13,5.19V3H10V5.16C8.06,5.58 6.5,6.84 6.5,8.77C6.5,11.08 8.41,12.23 11.2,12.9C13.7,13.5 14.2,14.38 14.2,15.31C14.2,16 13.71,17.1 11.5,17.1C9.44,17.1 8.63,16.18 8.5,15H6.32C6.44,17.19 8.08,18.42 10,18.83V21H13V18.85C14.95,18.5 16.5,17.35 16.5,15.3C16.5,12.46 14.07,11.5 11.8,10.9Z"/>
                </svg>
                <span>Payments & Invoices</span>
              </div>
              <div className="flex items-center px-6 py-3 text-sm hover:bg-blue-700">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                </svg>
                <span>Message Center</span>
              </div>
              <div className="flex items-center px-6 py-3 text-sm hover:bg-blue-700">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                </svg>
                <span>Account Profile</span>
              </div>
              <div className="flex items-center px-6 py-3 text-sm hover:bg-blue-700">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.97 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.95C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.95L19.05,18.95C19.27,19.04 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
                </svg>
                <span>User Setting</span>
              </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="text-white hover:text-yellow-400 focus:outline-none p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-lg font-bold italic text-yellow-400">modenX</h2>
          </div>

          {/* Center Dropdown */}
          <div className="flex items-center space-x-2 bg-blue-700 px-4 py-2 rounded">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span className="text-sm font-medium">XYZ</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </div>

          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="flex items-center bg-white text-gray-700 px-4 py-2 rounded-md space-x-2 min-w-64">
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <span className="text-sm text-gray-600 flex-1">27/1, Haralur Main R...</span>
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </div>

            {/* Notifications */}
            <div className="relative">
              <div className="bg-white text-blue-600 p-2 rounded">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                </svg>
              </div>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                2
              </span>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 p-8" style={{backgroundColor: '#9ca3af'}}>
          <div className="max-w-7xl mx-auto">
            {activeSection === 'whatsapp' ? (
              /* WhatsApp Campaigns Content */
              <div className="space-y-6">
                {/* Header with Navigation */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-black">WhatsApp Business Platform</h1>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-green-700 font-medium">Meta Verified</span>
                      </div>
                    </div>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      + Create New Campaign
                    </button>
                  </div>

                  {/* Navigation Tabs */}
                  <div className="border-b border-gray-200">
                    <div className="flex space-x-8">
                      {['overview', 'templates', 'messages', 'analytics', 'settings'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setWhatsappSubSection(tab)}
                          className={`py-2 px-4 font-medium capitalize transition-colors ${
                            whatsappSubSection === tab
                              ? 'text-blue-600 border-b-2 border-blue-600'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content based on selected tab */}
                {whatsappSubSection === 'overview' && (
                  <>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600">Approved Templates</p>
                            <p className="text-2xl font-bold text-gray-900">15</p>
                            <p className="text-xs text-green-600">+3 this month</p>
                          </div>
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600">Messages Sent (24h)</p>
                            <p className="text-2xl font-bold text-gray-900">1,247</p>
                            <p className="text-xs text-blue-600">+12% from yesterday</p>
                          </div>
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600">Delivery Rate</p>
                            <p className="text-2xl font-bold text-gray-900">98.5%</p>
                            <p className="text-xs text-green-600">Above industry avg</p>
                          </div>
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600">Active Conversations</p>
                            <p className="text-2xl font-bold text-gray-900">182</p>
                            <p className="text-xs text-orange-600">23 unread</p>
                          </div>
                          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <button 
                          onClick={() => setWhatsappSubSection('templates')}
                          className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                        >
                          <svg className="w-8 h-8 text-green-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1H5C3.89,1 3,1.89 3,3V21A2,2 0 0,0 5,23H19A2,2 0 0,0 21,21V9M19,9H14V4H5V21H19V9Z"/>
                          </svg>
                          <div className="text-left">
                            <div className="font-medium text-gray-900">Manage Templates</div>
                            <div className="text-sm text-gray-600">Create & submit templates</div>
                          </div>
                        </button>

                        <button 
                          onClick={() => setWhatsappSubSection('messages')}
                          className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <svg className="w-8 h-8 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20,2H4A2,2 0 0,0 2,4V16A2,2 0 0,0 4,18H18L22,22V4A2,2 0 0,0 20,2Z"/>
                          </svg>
                          <div className="text-left">
                            <div className="font-medium text-gray-900">Customer Messages</div>
                            <div className="text-sm text-gray-600">23 unread messages</div>
                          </div>
                        </button>

                        <button 
                          onClick={() => setWhatsappSubSection('analytics')}
                          className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                        >
                          <svg className="w-8 h-8 text-purple-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8L16,11.78Z"/>
                          </svg>
                          <div className="text-left">
                            <div className="font-medium text-gray-900">Analytics</div>
                            <div className="text-sm text-gray-600">View performance metrics</div>
                          </div>
                        </button>

                        <button 
                          onClick={() => setWhatsappSubSection('settings')}
                          className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <svg className="w-8 h-8 text-gray-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.61L12.75,4H11.25Z"/>
                          </svg>
                          <div className="text-left">
                            <div className="font-medium text-gray-900">Settings</div>
                            <div className="text-sm text-gray-600">Configure your account</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {whatsappSubSection === 'templates' && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-semibold text-gray-900">Message Templates</h2>
                      <button 
                        onClick={() => setShowTemplateModal(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        + Create Template
                      </button>
                    </div>

                    <div className="grid gap-4">
                      {[
                        { name: 'Welcome Message', status: 'Approved', category: 'Utility', language: 'English' },
                        { name: 'Order Confirmation', status: 'Approved', category: 'Transactional', language: 'English' },
                        { name: 'Shipping Update', status: 'Pending Review', category: 'Transactional', language: 'English' },
                        { name: 'Customer Support', status: 'Approved', category: 'Customer Care', language: 'English' },
                        { name: 'Promotional Offer', status: 'Rejected', category: 'Marketing', language: 'English' },
                      ].map((template, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                              </svg>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{template.name}</h3>
                              <p className="text-sm text-gray-500">{template.category} • {template.language}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              template.status === 'Approved' ? 'bg-green-100 text-green-800' :
                              template.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {template.status}
                            </span>
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {whatsappSubSection === 'messages' && (
                  <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                      <h2 className="text-2xl font-semibold text-gray-900">Customer Messages & Conversations</h2>
                      <p className="text-gray-600 mt-1">All incoming and outgoing messages are stored here</p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 h-96">
                      {/* Conversation List */}
                      <div className="border-r border-gray-200 overflow-y-auto">
                        <div className="p-4">
                          <input 
                            type="text" 
                            placeholder="Search conversations..." 
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-1">
                          {[
                            { name: 'John Doe', message: 'Thanks for the quick delivery!', time: '2 min ago', unread: true, phone: '+1 234 567 8901' },
                            { name: 'Sarah Johnson', message: 'When will my order arrive?', time: '15 min ago', unread: true, phone: '+1 234 567 8902' },
                            { name: 'Mike Wilson', message: 'Product looks great, thank you', time: '1 hour ago', unread: false, phone: '+1 234 567 8903' },
                            { name: 'Emily Davis', message: 'Can I return this item?', time: '2 hours ago', unread: true, phone: '+1 234 567 8904' },
                            { name: 'David Brown', message: 'Perfect service!', time: '1 day ago', unread: false, phone: '+1 234 567 8905' },
                          ].map((conversation, index) => (
                            <div key={index} className={`p-4 hover:bg-gray-50 cursor-pointer border-l-4 ${conversation.unread ? 'border-blue-500 bg-blue-50' : 'border-transparent'}`}>
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium text-gray-900">{conversation.name}</h4>
                                <span className="text-xs text-gray-500">{conversation.time}</span>
                              </div>
                              <p className="text-sm text-gray-600 truncate">{conversation.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{conversation.phone}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Message Thread */}
                      <div className="lg:col-span-2 flex flex-col">
                        <div className="p-4 border-b border-gray-200">
                          <h3 className="font-semibold text-gray-900">John Doe</h3>
                          <p className="text-sm text-gray-500">+1 234 567 8901 • Online now</p>
                        </div>
                        
                        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                          <div className="flex justify-start">
                            <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                              <p className="text-sm">Hi, I just placed an order. When can I expect delivery?</p>
                              <p className="text-xs text-gray-500 mt-1">Today, 2:30 PM</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <div className="bg-green-500 text-white rounded-lg p-3 max-w-xs">
                              <p className="text-sm">Hello John! Your order has been confirmed and will be delivered within 2-3 business days. You&apos;ll receive a tracking number shortly.</p>
                              <p className="text-xs text-green-100 mt-1">Today, 2:32 PM ✓✓</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-start">
                            <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                              <p className="text-sm">Thanks for the quick delivery!</p>
                              <p className="text-xs text-gray-500 mt-1">Today, 3:45 PM</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border-t border-gray-200">
                          <div className="flex space-x-2">
                            <input 
                              type="text" 
                              placeholder="Type a message..." 
                              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                              Send
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {whatsappSubSection === 'analytics' && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Performance Analytics</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="font-medium text-blue-900 mb-2">Message Volume</h3>
                          <p className="text-2xl font-bold text-blue-600">12,547</p>
                          <p className="text-sm text-blue-600">Messages this month</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h3 className="font-medium text-green-900 mb-2">Response Rate</h3>
                          <p className="text-2xl font-bold text-green-600">89.3%</p>
                          <p className="text-sm text-green-600">Within 1 hour</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h3 className="font-medium text-purple-900 mb-2">Template Usage</h3>
                          <p className="text-2xl font-bold text-purple-600">8,439</p>
                          <p className="text-sm text-purple-600">Templates sent</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-4">Message Trends (Last 7 Days)</h3>
                        <div className="h-64 bg-white rounded border flex items-center justify-center">
                          <p className="text-gray-500">Chart visualization would be displayed here</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {whatsappSubSection === 'settings' && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">WhatsApp Business Settings</h2>
                    
                    <div className="space-y-6">
                      {/* Business Profile */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Business Profile</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                            <input type="text" value="ModernX Store" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input type="text" value="+1 (555) 123-4567" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </div>
                        </div>
                      </div>

                      {/* Compliance Status */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Meta Business API Compliance</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                            <div className="flex items-center">
                              <svg className="w-6 h-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <div>
                                <div className="font-medium text-gray-900">Business Verification</div>
                                <div className="text-sm text-gray-600">Your business profile is verified with Meta</div>
                              </div>
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">Verified</span>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                            <div className="flex items-center">
                              <svg className="w-6 h-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <div>
                                <div className="font-medium text-gray-900">API Access</div>
                                <div className="text-sm text-gray-600">WhatsApp Business API access is active</div>
                              </div>
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">Active</span>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                            <div className="flex items-center">
                              <svg className="w-6 h-6 text-yellow-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              <div>
                                <div className="font-medium text-gray-900">Quality Rating</div>
                                <div className="text-sm text-gray-600">Monitor template performance to maintain quality</div>
                              </div>
                            </div>
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">Monitoring</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Template Creation Modal */}
                {showTemplateModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowTemplateModal(false)}>
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">Create New Template</h3>
                        <button onClick={() => setShowTemplateModal(false)} className="text-gray-400 hover:text-gray-600">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                          </svg>
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                          <input type="text" placeholder="Enter template name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Transactional</option>
                            <option>Marketing</option>
                            <option>Utility</option>
                            <option>Customer Care</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Message Content</label>
                          <textarea 
                            rows={4} 
                            placeholder="Enter your message template..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          ></textarea>
                        </div>
                        
                        <div className="flex justify-end space-x-3 pt-4">
                          <button 
                            onClick={() => setShowTemplateModal(false)}
                            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={() => setShowTemplateModal(false)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            Submit for Approval
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Default Dashboard Content */
              <div>
                {/* Page Title */}
                <h1 className="text-3xl font-bold text-black mb-8 text-center">Live Customers</h1>

                {/* Stats Cards and Search */}
                <div className="flex justify-between items-start mb-12">
                  {/* Stats Cards */}
                  <div className="flex space-x-8">
                    <div className="bg-white rounded-lg px-8 py-6 text-center min-w-[180px] shadow-sm border border-blue-300">
                      <div className="text-sm text-blue-700 font-medium">Live Customers : 0</div>
                    </div>
                    <div className="bg-white rounded-lg px-8 py-6 text-center min-w-[180px] shadow-sm">
                      <div className="text-sm text-blue-700 font-medium">Last 12 Hours : 0</div>
                    </div>
                    <div className="bg-white rounded-lg px-8 py-6 text-center min-w-[180px] shadow-sm">
                      <div className="text-sm text-blue-700 font-medium">Last 24 Hours : 0</div>
                    </div>
                    <div className="bg-white rounded-lg px-8 py-6 text-center min-w-[180px] shadow-sm">
                      <div className="text-sm text-blue-700 font-medium">Last 1 Week : 0</div>
                    </div>
                  </div>

                  {/* Search Customer */}
                  <div className="flex items-center bg-white rounded-lg px-4 py-3 space-x-2 min-w-[220px] shadow-sm">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                    <span className="text-sm text-gray-500 flex-1">Search Customer</span>
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 10l5 5 5-5z"/>
                    </svg>
                  </div>
                </div>

                {/* Empty State */}
                <div className="text-center py-20">
                  <p className="text-lg text-black">
                    Your store is currently quiet, but we&apos;re ready for your next wave of customers!
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}