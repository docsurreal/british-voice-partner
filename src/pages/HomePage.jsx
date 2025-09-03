import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Volume2, 
  PlayCircle, 
  Mic, 
  BookOpen, 
  Award, 
  TrendingUp,
  Clock,
  Target,
  Zap,
  Theater,
  Languages,
  ChevronRight
} from 'lucide-react'
import { GB } from 'country-flag-icons/react/3x2'

export default function HomePage({ config, setConfig }) {
  const [practiceText, setPracticeText] = useState('Welcome to the British Voice Academy. Master the art of Received Pronunciation.')
  
  const speak = (text) => {
    if (!text?.trim()) return
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-GB'
    utterance.rate = config.speed || 1.0
    utterance.pitch = config.pitch || 1.0
    window.speechSynthesis.speak(utterance)
  }

  const quickPracticeItems = [
    {
      title: "Received Pronunciation",
      text: "The car is parked rather far from the theatre",
      difficulty: "Intermediate",
      focus: "Non-rhotic R sounds",
      color: "#1CB0F6"
    },
    {
      title: "Vowel Distinctions", 
      text: "I thought I caught the ball in the hall",
      difficulty: "Advanced",
      focus: "British vowel system",
      color: "#58CC02"
    },
    {
      title: "Consonant Clarity",
      text: "The bottle of water was rather bitter",
      difficulty: "Beginner",
      focus: "T-sound articulation",
      color: "#CE82FF"
    }
  ]

  const statsData = [
    { icon: Clock, label: "Study Time", value: "24h 30m", color: "#1CB0F6" },
    { icon: Award, label: "Achievements", value: "12", color: "#FFC800" },
    { icon: TrendingUp, label: "Progress", value: "68%", color: "#58CC02" },
    { icon: Target, label: "Accuracy", value: "89%", color: "#CE82FF" }
  ]

  return (
    <div className="content-grid">
      {/* Hero Section */}
      <motion.div 
        className="glass-morphism"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{ padding: '40px', textAlign: 'center' }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <Theater size={48} color="#1CB0F6" />
          <GB style={{ width: '60px', height: '45px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }} />
        </div>
        
        <h1 className="section-header" style={{ fontSize: '36px', textAlign: 'center', marginBottom: '16px' }}>
          Your Learning Progress
        </h1>
        
        <p style={{ 
          fontSize: '18px', 
          color: '#E0E1DD', 
          marginBottom: '32px',
          maxWidth: '500px',
          margin: '0 auto 32px auto',
          lineHeight: '1.6'
        }}>
          Continue your British pronunciation lessons and track your progress.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            className="academic-button success"
            onClick={() => speak(practiceText)}
          >
            <PlayCircle size={20} style={{ marginRight: '8px' }} />
            Listen
          </button>
          
          <button className="academic-button">
            <BookOpen size={20} style={{ marginRight: '8px' }} />
            Continue Lessons
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="content-grid three-columns">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="glass-morphism"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{ padding: '24px', textAlign: 'center' }}
          >
            <stat.icon size={32} color={stat.color} style={{ marginBottom: '12px' }} />
            <div style={{ fontSize: '32px', fontWeight: '700', color: stat.color, marginBottom: '8px' }}>
              {stat.value}
            </div>
            <div style={{ color: '#778DA9', fontSize: '14px', fontWeight: '500' }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Practice Section */}
      <motion.div 
        className="glass-morphism"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ padding: '32px' }}
      >
        <div className="section-header">
          <Volume2 size={32} color="#1CB0F6" />
          Quick Practice
        </div>
        
        <div style={{ display: 'grid', gap: '24px' }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '12px', 
              fontWeight: '600', 
              color: '#E0E1DD',
              fontSize: '16px'
            }}>
              Custom Practice Text
            </label>
            <textarea
              className="elegant-input"
              value={practiceText}
              onChange={(e) => setPracticeText(e.target.value)}
              placeholder="Enter text to practice your British accent..."
              style={{ minHeight: '100px', resize: 'vertical' }}
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500', 
                color: '#E0E1DD',
                fontSize: '14px'
              }}>
                Speed: {config.speed.toFixed(1)}x
              </label>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={config.speed}
                onChange={(e) => setConfig(prev => ({ ...prev, speed: parseFloat(e.target.value) }))}
                style={{ 
                  width: '100%',
                  height: '6px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              />
            </div>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500', 
                color: '#E0E1DD',
                fontSize: '14px'
              }}>
                Pitch: {config.pitch.toFixed(1)}
              </label>
              <input
                type="range"
                min="0.7"
                max="1.3"
                step="0.1"
                value={config.pitch}
                onChange={(e) => setConfig(prev => ({ ...prev, pitch: parseFloat(e.target.value) }))}
                style={{ 
                  width: '100%',
                  height: '6px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button 
              className="academic-button"
              onClick={() => speak(practiceText)}
            >
              <Volume2 size={20} style={{ marginRight: '8px' }} />
              Practice Pronunciation
            </button>
            
            <button 
              className="academic-button success"
              onClick={() => setPracticeText('Good evening. I would be delighted to attend the theatre performance this evening.')}
            >
              <Zap size={20} style={{ marginRight: '8px' }} />
              Sample Text
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Practice Cards */}
      <div>
        <h2 className="section-header">
          <Languages size={32} color="#58CC02" />
          Practice Exercises
        </h2>
        
        <div className="content-grid">
          {quickPracticeItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="glass-morphism"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ 
                padding: '24px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: item.color,
                color: 'white',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {item.difficulty}
              </div>
              
              <h3 style={{ 
                color: item.color, 
                fontSize: '18px', 
                fontWeight: '600', 
                marginBottom: '8px',
                marginRight: '80px'
              }}>
                {item.title}
              </h3>
              
              <p style={{ 
                color: '#E0E1DD', 
                fontStyle: 'italic', 
                fontSize: '16px', 
                marginBottom: '12px',
                lineHeight: '1.5'
              }}>
                "{item.text}"
              </p>
              
              <div style={{ 
                color: '#778DA9', 
                fontSize: '13px', 
                marginBottom: '16px',
                fontWeight: '500'
              }}>
                Focus: {item.focus}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button 
                  className="academic-button"
                  style={{ 
                    padding: '8px 16px', 
                    fontSize: '14px',
                    background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`
                  }}
                  onClick={() => speak(item.text)}
                >
                  <PlayCircle size={16} style={{ marginRight: '6px' }} />
                  Practice
                </button>
                
                <ChevronRight size={20} color="#778DA9" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}