import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PlayCircle, PauseCircle, Volume2, Settings, BookOpen, Mic } from 'lucide-react'

export default function LessonsPage({ config, setConfig }) {
  const [currentLine, setCurrentLine] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedVoice, setSelectedVoice] = useState('London')
  const [customText, setCustomText] = useState('')
  const [scriptMode, setScriptMode] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Sample script lines from a British play
  const scriptLines = [
    "LADY BRACKNELL: To lose one parent may be regarded as a misfortune;",
    "to lose both looks like carelessness.",
    "JACK: I admit with shame that I do not know.",
    "I only wish I were more certain of the fact.",
    "LADY BRACKNELL: I feel bound to tell you that you are not down on my list of eligible young men,",
    "although I have the same list as the dear Duchess of Bolton has.",
    "We work together, in fact.",
    "JACK: Lady Bracknell, I hate to seem inquisitive,",
    "but would you kindly inform me who I am?",
    "LADY BRACKNELL: You are the son of my poor sister, Mrs. Moncrieff,",
    "and consequently Algernon's elder brother.",
    "JACK: Algy's elder brother! Then I have a brother after all.",
    "I knew I had a brother! I always said I had a brother!",
    "ALGERNON: Yes, you have a brother.",
    "And his name is Ernest.",
    "JACK: Ernest! My own brother is named Ernest!",
    "LADY BRACKNELL: The question now arises, what disposition",
    "are we to make of you?",
    "JACK: That is a matter I must leave to you to decide.",
    "LADY BRACKNELL: I think some preliminary inquiry into your past life",
    "would be advisable.",
    "Where did you come from?",
    "JACK: From a handbag.",
    "LADY BRACKNELL: A handbag?",
    "JACK: Yes, Lady Bracknell, I was in a handbag--",
    "a somewhat large, black leather handbag,",
    "with handles to it--an ordinary handbag, in fact."
  ]

  const voiceOptions = [
    { value: 'London', label: 'London (RP)', description: 'Received Pronunciation - Standard British' },
    { value: 'Yorkshire', label: 'Yorkshire', description: 'Northern English accent' },
    { value: 'Welsh', label: 'Welsh English', description: 'Welsh-influenced English' },
    { value: 'Scottish', label: 'Scottish', description: 'Scottish English accent' },
    { value: 'Estuary', label: 'Estuary English', description: 'Modern London area accent' }
  ]

  const speak = (text, lineIndex = null) => {
    if (!text?.trim()) return
    
    // Stop any current speech
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-GB'
    utterance.rate = config.speed || 1.0
    utterance.pitch = config.pitch || 1.0
    
    // Try to find a British voice that matches the selection
    const voices = window.speechSynthesis.getVoices()
    const britishVoice = voices.find(voice => 
      voice.lang.includes('GB') || voice.lang.includes('UK') || 
      voice.name.toLowerCase().includes('british') ||
      voice.name.toLowerCase().includes('english')
    )
    
    if (britishVoice) {
      utterance.voice = britishVoice
    }

    utterance.onstart = () => {
      setIsPlaying(true)
      if (lineIndex !== null) {
        setCurrentLine(lineIndex)
      }
    }

    utterance.onend = () => {
      setIsPlaying(false)
      if (scriptMode && lineIndex !== null && lineIndex < scriptLines.length - 1) {
        // Auto-advance to next line after a brief pause
        setTimeout(() => {
          setCurrentLine(lineIndex + 1)
        }, 500)
      }
    }

    window.speechSynthesis.speak(utterance)
  }

  const playScript = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
    } else {
      speak(scriptLines[currentLine], currentLine)
    }
  }

  const playLine = (lineIndex) => {
    setCurrentLine(lineIndex)
    speak(scriptLines[lineIndex], lineIndex)
  }

  const playCustomText = () => {
    if (customText.trim()) {
      speak(customText)
    }
  }

  return (
    <div className="content-grid">
      {/* Main Interface Header */}
      <motion.div 
        className="glass-morphism"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ padding: '20px' }}
      >
        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? '16px' : '0'
        }}>
          <div>
            <h1 className="section-header" style={{ fontSize: '28px', marginBottom: '8px' }}>
              <Volume2 size={32} color="#CE82FF" />
              British Accent Practice
            </h1>
            <p style={{ color: '#E0E1DD', fontSize: '16px', margin: 0 }}>
              Listen to British pronunciation - Select accent and practice with script
            </p>
          </div>
          
          {/* Voice Selection */}
          <div style={{ minWidth: isMobile ? '100%' : '200px', marginBottom: isMobile ? '16px' : '0' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#E0E1DD', fontSize: '14px', fontWeight: '500' }}>
              Accent Style
            </label>
            <select
              className="elegant-input"
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              style={{ padding: '8px 12px', fontSize: '14px' }}
            >
              {voiceOptions.map(voice => (
                <option key={voice.value} value={voice.value}>
                  {voice.label}
                </option>
              ))}
            </select>
            <div style={{ color: '#778DA9', fontSize: '12px', marginTop: '4px' }}>
              {voiceOptions.find(v => v.value === selectedVoice)?.description}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className={isMobile ? 'mobile-layout' : ''} style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
        gap: '20px', 
        height: isMobile ? 'auto' : '70vh' 
      }}>
        
        {/* Script Window */}
        <motion.div
          className={`glass-morphism ${isMobile ? 'mobile-script-section' : ''}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ display: 'flex', flexDirection: 'column', height: isMobile ? '50vh' : '100%' }}
        >
          <div style={{ 
            padding: '20px 20px 16px 20px', 
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2 style={{ color: '#FFFFFF', fontSize: '18px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={20} color="#58CC02" />
              Script: "The Importance of Being Earnest"
            </h2>
            <button
              className={`academic-button ${isPlaying ? 'success' : ''}`}
              onClick={playScript}
              style={{ padding: '8px 16px', fontSize: '14px' }}
            >
              {isPlaying ? (
                <>
                  <PauseCircle size={16} style={{ marginRight: '6px' }} />
                  Pause
                </>
              ) : (
                <>
                  <PlayCircle size={16} style={{ marginRight: '6px' }} />
                  Play
                </>
              )}
            </button>
          </div>
          
          <div style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: '0',
            background: 'rgba(0,0,0,0.2)'
          }}>
            {scriptLines.map((line, index) => (
              <motion.div
                key={index}
                onClick={() => playLine(index)}
                className={isMobile ? 'script-line-mobile' : ''}
                style={{
                  padding: isMobile ? '12px 16px' : '16px 20px',
                  cursor: 'pointer',
                  backgroundColor: currentLine === index ? 'rgba(206, 130, 255, 0.2)' : 'transparent',
                  color: currentLine === index ? '#FFFFFF' : '#778DA9',
                  borderLeft: currentLine === index ? '4px solid #CE82FF' : '4px solid transparent',
                  fontSize: isMobile ? 'clamp(14px, 3.8vw, 16px)' : '15px',
                  lineHeight: '1.6',
                  transition: 'all 0.3s ease',
                  borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}
                whileHover={{ 
                  backgroundColor: currentLine === index ? 'rgba(206, 130, 255, 0.3)' : 'rgba(255,255,255,0.05)',
                  color: '#FFFFFF'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className={isMobile ? 'script-line-number' : ''} style={{
                    minWidth: isMobile ? '20px' : '24px',
                    height: isMobile ? '20px' : '24px',
                    borderRadius: '50%',
                    background: currentLine === index ? '#CE82FF' : 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isMobile ? '11px' : '12px',
                    color: currentLine === index ? 'white' : '#778DA9',
                    fontWeight: '600'
                  }}>
                    {index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    {line}
                  </div>
                  {currentLine === index && isPlaying && (
                    <Volume2 size={16} color="#CE82FF" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Text Input & Controls */}
        <motion.div
          className={`glass-morphism ${isMobile ? 'mobile-controls-section' : ''}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ display: 'flex', flexDirection: 'column', height: isMobile ? 'auto' : '100%' }}
        >
          <div style={{ 
            padding: '20px 20px 16px 20px', 
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h2 style={{ color: '#FFFFFF', fontSize: '18px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mic size={20} color="#1CB0F6" />
              Custom Text Practice
            </h2>
          </div>
          
          <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500', 
                color: '#E0E1DD',
                fontSize: '14px'
              }}>
                Enter text to hear in {selectedVoice} accent:
              </label>
              <textarea
                className="elegant-input"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Type any text here to hear it spoken in British pronunciation..."
                style={{ 
                  minHeight: '200px', 
                  resize: 'vertical',
                  fontSize: '15px',
                  lineHeight: '1.6'
                }}
              />
            </div>
            
            <button 
              className="academic-button success"
              onClick={playCustomText}
              disabled={!customText.trim()}
              style={{ alignSelf: isMobile ? 'stretch' : 'flex-start', width: isMobile ? '100%' : 'auto' }}
            >
              <PlayCircle size={20} style={{ marginRight: '8px' }} />
              Speak Text
            </button>

            {/* Voice Controls */}
            <div style={{ 
              marginTop: '20px', 
              padding: '16px', 
              background: 'rgba(255,255,255,0.05)', 
              borderRadius: '8px' 
            }}>
              <h4 style={{ color: '#FFFFFF', fontSize: '16px', marginBottom: '16px' }}>Voice Controls</h4>
              
              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: '500', 
                    color: '#E0E1DD',
                    fontSize: '14px'
                  }}>
                    Speed: {config.speed?.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.1"
                    value={config.speed || 1.0}
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
                    Pitch: {config.pitch?.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0.7"
                    max="1.3"
                    step="0.1"
                    value={config.pitch || 1.0}
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
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}