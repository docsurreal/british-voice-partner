import React, { useState } from 'react'

export default function App() {
  const [partnerText, setPartnerText] = useState('Hello! I am your British voice partner.')
  const [config, setConfig] = useState({ 
    accent: 'RP', 
    persona: 'rp_plain', 
    speed: 1.0, 
    pitch: 1.0, 
    gender: 'any', 
    voiceHint: '' 
  })

  const speak = (text) => {
    if (!text?.trim()) return
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-GB'
    utterance.rate = config.speed || 1.0
    utterance.pitch = config.pitch || 1.0
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div style={{ minHeight: '100vh', padding: '20px', fontFamily: 'system-ui' }}>
      <header style={{ 
        background: 'var(--bg-card)', 
        padding: '16px 24px', 
        borderRadius: '16px', 
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#1CB0F6' 
        }}>
          🎭 British Voice Partner
        </h1>
        <p style={{ 
          margin: '8px 0 0 0', 
          color: '#B7C4CF',
          fontSize: '18px'
        }}>
          Master your British accent with Duolingo-style lessons
        </p>
      </header>

      <main style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        display: 'grid',
        gap: '24px'
      }}>
        <div className="duolingo-card">
          <h2 style={{ 
            color: '#1CB0F6', 
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            🔊 Voice Settings
          </h2>
          
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600', 
                color: '#B7C4CF' 
              }}>
                Text to Practice
              </label>
              <textarea
                className="input-field textarea-field"
                value={partnerText}
                onChange={(e) => setPartnerText(e.target.value)}
                placeholder="Enter text to practice your British accent..."
                style={{ minHeight: '120px' }}
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600', 
                  color: '#B7C4CF' 
                }}>
                  Speed: {config.speed}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={config.speed}
                  onChange={(e) => setConfig(prev => ({ ...prev, speed: parseFloat(e.target.value) }))}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600', 
                  color: '#B7C4CF' 
                }}>
                  Pitch: {config.pitch}
                </label>
                <input
                  type="range"
                  min="0.7"
                  max="1.3"
                  step="0.1"
                  value={config.pitch}
                  onChange={(e) => setConfig(prev => ({ ...prev, pitch: parseFloat(e.target.value) }))}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                className="duo-button"
                onClick={() => speak(partnerText)}
              >
                🔊 Play British Accent
              </button>
              <button 
                className="duo-button green"
                onClick={() => setPartnerText('Hello! I am practicing my British accent. How do I sound?')}
              >
                📝 Sample Text
              </button>
            </div>
          </div>
        </div>

        <div className="duolingo-card">
          <h2 style={{ 
            color: '#58CC02', 
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            🎯 Quick Practice
          </h2>
          
          <div style={{ display: 'grid', gap: '16px' }}>
            {[
              "The car is parked in the yard",
              "I thought I caught the ball",
              "Would you like a cup of tea?",
              "The weather is rather lovely today"
            ].map((text, index) => (
              <div 
                key={index}
                style={{
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ fontStyle: 'italic', color: '#FFFFFF' }}>
                  "{text}"
                </span>
                <button 
                  className="duo-button"
                  style={{ padding: '8px 16px', fontSize: '14px' }}
                  onClick={() => speak(text)}
                >
                  🔊 Play
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="duolingo-card">
          <h2 style={{ 
            color: '#CE82FF', 
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            💡 British Accent Tips
          </h2>
          
          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{ 
              padding: '12px', 
              background: 'rgba(28, 176, 246, 0.1)', 
              borderRadius: '8px',
              border: '1px solid #1CB0F6'
            }}>
              <strong style={{ color: '#1CB0F6' }}>Non-rhotic R:</strong>
              <span style={{ color: '#FFFFFF' }}> Don't pronounce R at the end of words (car → "cah")</span>
            </div>
            <div style={{ 
              padding: '12px', 
              background: 'rgba(88, 204, 2, 0.1)', 
              borderRadius: '8px',
              border: '1px solid #58CC02'
            }}>
              <strong style={{ color: '#58CC02' }}>Long A sound:</strong>
              <span style={{ color: '#FFFFFF' }}> "Bath", "dance", "ask" use the broad "ah" sound</span>
            </div>
            <div style={{ 
              padding: '12px', 
              background: 'rgba(206, 130, 255, 0.1)', 
              borderRadius: '8px',
              border: '1px solid #CE82FF'
            }}>
              <strong style={{ color: '#CE82FF' }}>T pronunciation:</strong>
              <span style={{ color: '#FFFFFF' }}> Crisp T sounds, not the American "d" sound</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}