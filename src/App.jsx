import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  GraduationCap, 
  Volume2, 
  BookOpen, 
  HelpCircle, 
  Settings, 
  Trophy,
  Mic,
  PlayCircle,
  Menu,
  X
} from 'lucide-react'
import { US, GB } from 'country-flag-icons/react/3x2'

// Import pages
import HomePage from './pages/HomePage.jsx'
import PracticePage from './pages/PracticePage.jsx'
import LessonsPage from './pages/LessonsPage.jsx'
import HelpPage from './pages/HelpPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'

function Navigation({ onMobileMenuToggle }) {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: BookOpen, label: 'Lessons', color: '#CE82FF' },
    { path: '/practice', icon: Mic, label: 'Practice', color: '#58CC02' },
    { path: '/progress', icon: GraduationCap, label: 'Progress', color: '#1CB0F6' },
    { path: '/help', icon: HelpCircle, label: 'Help', color: '#FFC800' },
    { path: '/settings', icon: Settings, label: 'Settings', color: '#FF9600' }
  ]
  
  return (
    <nav className="nav-container">
      <div className="nav-content">
        <div className="logo-section">
          <BookOpen size={32} color="#CE82FF" />
          <span className="logo-text">British Pronunciation</span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: '16px' }}>
            <US className="flag-icon" />
            <span style={{ color: '#778DA9', fontSize: '14px' }}>→</span>
            <GB className="flag-icon" />
          </div>
        </div>
        
        <div className="nav-tabs">
          {navItems.map(({ path, icon: Icon, label, color }) => (
            <Link
              key={path}
              to={path}
              className={`nav-tab ${location.pathname === path ? 'active' : ''}`}
            >
              <Icon size={16} color={location.pathname === path ? 'white' : color} />
              {label}
            </Link>
          ))}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Trophy size={20} color="#FFC800" />
            <span style={{ color: '#FFC800', fontWeight: '600' }}>Level 3</span>
          </div>
          
          <button 
            className="mobile-menu-toggle"
            onClick={onMobileMenuToggle}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  )
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

function MobileMenu({ isOpen, onClose }) {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: BookOpen, label: 'Lessons', color: '#CE82FF' },
    { path: '/practice', icon: Mic, label: 'Practice', color: '#58CC02' },
    { path: '/progress', icon: GraduationCap, label: 'Progress', color: '#1CB0F6' },
    { path: '/help', icon: HelpCircle, label: 'Help', color: '#FFC800' },
    { path: '/settings', icon: Settings, label: 'Settings', color: '#FF9600' }
  ]

  return (
    <>
      <div 
        className={`mobile-menu-overlay ${isOpen ? 'active' : ''}`} 
        onClick={onClose}
      />
      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <h3 style={{ color: 'white', margin: 0, fontSize: '18px' }}>Navigation</h3>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="mobile-nav-items">
          {navItems.map(({ path, icon: Icon, label, color }) => (
            <Link
              key={path}
              to={path}
              className={`mobile-nav-item ${location.pathname === path ? 'active' : ''}`}
              onClick={onClose}
            >
              <Icon size={20} color={location.pathname === path ? 'white' : color} />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

function AppContent() {
  const [config, setConfig] = useState({
    accent: 'RP',
    speed: 1.0,
    pitch: 1.0,
    voice: 'british'
  })
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const toggleMobileMenu = () => setMobileMenuOpen(true)
  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <div className="app">
      <Navigation onMobileMenuToggle={toggleMobileMenu} />
      
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={
                <PageTransition>
                  <LessonsPage config={config} setConfig={setConfig} />
                </PageTransition>
              } 
            />
            <Route 
              path="/progress" 
              element={
                <PageTransition>
                  <HomePage config={config} setConfig={setConfig} />
                </PageTransition>
              } 
            />
            <Route 
              path="/practice" 
              element={
                <PageTransition>
                  <PracticePage config={config} setConfig={setConfig} />
                </PageTransition>
              } 
            />
            <Route 
              path="/lessons" 
              element={
                <PageTransition>
                  <LessonsPage config={config} setConfig={setConfig} />
                </PageTransition>
              } 
            />
            <Route 
              path="/help" 
              element={
                <PageTransition>
                  <HelpPage />
                </PageTransition>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <PageTransition>
                  <SettingsPage config={config} setConfig={setConfig} />
                </PageTransition>
              } 
            />
          </Routes>
        </AnimatePresence>
      </main>
      
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}