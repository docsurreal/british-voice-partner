import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mic, PlayCircle, Volume2, RotateCcw, CheckCircle, Award } from 'lucide-react'

export default function PracticePage({ config, setConfig }) {
  const [recording, setRecording] = useState(false)
  const [practiceScore, setPracticeScore] = useState(null)
  
  const speak = (text) => {
    if (!text?.trim()) return
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-GB'
    utterance.rate = config.speed || 1.0
    utterance.pitch = config.pitch || 1.0
    window.speechSynthesis.speak(utterance)
  }

  const practiceExercises = [
    {
      title: "Clear Pronunciation",
      text: "The actor performed brilliantly at the Royal Theatre last evening",
      tips: "Focus on clear consonants and vowel sounds",
      level: "Intermediate"
    },
    {
      title: "Vowel Mastery",
      text: "I asked for a glass of water after the dance class",
      tips: "Use the broad 'a' sound in 'asked', 'glass', and 'dance'",
      level: "Advanced"
    },
    {
      title: "Professional Speaking",
      text: "Good afternoon, I would be delighted to schedule a meeting",
      tips: "Maintain formal register and precise articulation",
      level: "Professional"
    }
  ]

  const simulateRecording = () => {
    setRecording(true)
    setTimeout(() => {
      setRecording(false)
      setPracticeScore(Math.floor(Math.random() * 30) + 70)
    }, 3000)
  }

  return (
    <div className="content-grid">
      <motion.div 
        className="glass-morphism"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ padding: '32px', textAlign: 'center' }}
      >
        <h1 className="section-header" style={{ textAlign: 'center' }}>
          <Mic size={32} color="#58CC02" />
          Pronunciation Practice
        </h1>
        <p style={{ fontSize: '18px', color: '#E0E1DD', marginBottom: '24px' }}>
          Practice pronunciation with these exercises and record yourself for feedback
        </p>
      </motion.div>

      <div className="content-grid">
        {practiceExercises.map((exercise, index) => (
          <motion.div
            key={exercise.title}
            className="glass-morphism"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{ padding: '24px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ color: '#58CC02', fontSize: '20px', margin: 0 }}>
                {exercise.title}
              </h3>
              <div style={{
                background: '#CE82FF',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px'
              }}>
                {exercise.level}
              </div>
            </div>
            
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '16px',
              fontStyle: 'italic',
              fontSize: '16px',
              lineHeight: '1.5'
            }}>
              "{exercise.text}"
            </div>
            
            <div style={{
              background: 'rgba(206, 130, 255, 0.1)',
              border: '1px solid #CE82FF',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px',
              color: '#E0E1DD'
            }}>
              <strong style={{ color: '#CE82FF' }}>Tip:</strong> {exercise.tips}
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="academic-button"
                onClick={() => speak(exercise.text)}
              >
                <Volume2 size={16} style={{ marginRight: '6px' }} />
                Listen
              </button>
              
              <button 
                className="academic-button success"
                onClick={simulateRecording}
                disabled={recording}
              >
                <Mic size={16} style={{ marginRight: '6px' }} />
                {recording ? 'Recording...' : 'Record'}
              </button>
            </div>
            
            {practiceScore && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  marginTop: '16px',
                  padding: '16px',
                  background: 'rgba(88, 204, 2, 0.1)',
                  border: '1px solid #58CC02',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}
              >
                <CheckCircle size={24} color="#58CC02" style={{ marginBottom: '8px' }} />
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#58CC02' }}>
                  {practiceScore}%
                </div>
                <div style={{ color: '#E0E1DD', fontSize: '14px' }}>
                  Excellent progress! Your accent is improving.
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}