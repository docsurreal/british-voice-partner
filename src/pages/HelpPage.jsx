import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronRight, 
  Volume2, 
  Mic, 
  BookOpen,
  Settings,
  Headphones,
  Globe,
  Theater,
  Award,
  Lightbulb,
  Users
} from 'lucide-react'
import { GB, US } from 'country-flag-icons/react/3x2'

export default function HelpPage() {
  const [expandedSection, setExpandedSection] = useState(null)
  
  const helpSections = [
    {
      id: 'quick-start',
      title: 'Quick Start Wiki',
      icon: Lightbulb,
      color: '#58CC02',
      faqs: [
        {
          question: '🚀 How to Get Started (Basic Wiki)',
          answer: '1. **Lessons**: Start here with structured pronunciation lessons\n2. **Practice**: Record yourself and get feedback on pronunciation\n3. **Progress**: View your learning statistics and completed lessons\n4. **Settings**: Customize voice speed, pitch, and preferences\n5. **Help**: Find answers to common questions and usage guide'
        },
        {
          question: 'What is Received Pronunciation (RP)?',
          answer: 'Received Pronunciation is the accent traditionally regarded as the standard for British English. It\'s the accent typically heard in classical British theatre, BBC broadcasts, and formal British education. Also known as "BBC English" or "Queen\'s English."'
        },
        {
          question: 'How do I navigate the new interface?',
          answer: 'Use the top navigation bar to switch between Academy, Practice, Lessons, Help, and Settings. Each section has frosted glass cards with different features. The US→GB flags show your transformation journey from American to British pronunciation.'
        }
      ]
    },
    {
      id: 'new-features',
      title: '✨ New Features & Updates',
      icon: Award,
      color: '#FFC800',
      faqs: [
        {
          question: '🎭 What\'s new in this version?',
          answer: '• **Modern SPA Design**: Smooth page transitions and professional interface\n• **Frosted Glass Effects**: Beautiful visual design with Unsplash backgrounds\n• **Professional Icons**: Replaced emojis with clean, academic icons\n• **US→GB Flag Theme**: Visual representation of accent transformation\n• **Enhanced Practice Lab**: Better recording simulation and feedback\n• **Structured Lessons**: Progressive curriculum with XP point system\n• **Comprehensive Settings**: Full customization of voice and interface preferences'
        },
        {
          question: '⚙️ Settings & Customization',
          answer: 'New settings panel allows you to:\n• Adjust speech speed (0.5x - 1.5x)\n• Control voice pitch (0.7 - 1.3)\n• Choose accent type (RP, Estuary, Northern, Welsh)\n• Set daily practice goals\n• Enable/disable animations\n• Export/import your preferences'
        },
        {
          question: '🏆 Progress Tracking',
          answer: 'Track your journey with:\n• XP points for completed lessons\n• Practice time statistics\n• Accuracy percentage tracking\n• Achievement system\n• Local progress saving (browser-based)'
        }
      ]
    },
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: BookOpen,
      color: '#CE82FF',
      faqs: [
        {
          question: 'How do I use the voice practice feature?',
          answer: 'Navigate to the Practice section, select an exercise, click "Listen" to hear the correct pronunciation, then click "Record" to practice yourself. Our system will provide feedback on your pronunciation accuracy.'
        },
        {
          question: 'Do I need special equipment?',
          answer: 'All you need is a computer or mobile device with a microphone and speakers/headphones. For best results, we recommend using headphones to clearly hear pronunciation nuances and a quality microphone for accurate recording.'
        }
      ]
    },
    {
      id: 'pronunciation',
      title: 'Pronunciation Guide',
      icon: Volume2,
      color: '#1CB0F6',
      faqs: [
        {
          question: 'What is the non-rhotic \'R\' sound?',
          answer: 'In British English, \'R\' sounds at the end of words or before consonants are not pronounced. For example: "car" sounds like "cah", "farm" like "fahm", and "world" like "wohld".'
        },
        {
          question: 'How do I pronounce the British \'A\' sound?',
          answer: 'Words like "bath", "dance", "ask", and "path" use a long \'ah\' sound (as in "father") rather than the short \'a\' sound used in American English. This is one of the most distinctive features of RP.'
        },
        {
          question: 'What about \'T\' pronunciation?',
          answer: 'British English maintains crisp \'T\' sounds. Unlike American English which often softens \'T\' to \'D\' (as in "water" → "wader"), British pronunciation keeps the \'T\' distinct: "water" remains "wa-ter".'
        },
        {
          question: 'How do I handle vowel sounds?',
          answer: 'British vowels are generally more rounded and precise. The \'O\' in "thought" is rounded, the \'U\' in "cup" is open, and diphthongs like "home" are pronounced "hohm" rather than "hooem".'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: Settings,
      color: '#CE82FF',
      faqs: [
        {
          question: 'The voice playback isn\'t working',
          answer: 'Ensure your browser supports Web Speech API (Chrome, Edge, Safari recommended). Check your system audio settings and try refreshing the page. Make sure you\'re not using private/incognito mode which may block speech features.'
        },
        {
          question: 'Recording feature not responding',
          answer: 'Grant microphone permissions when prompted. Check browser settings under Privacy & Security → Microphone. Ensure no other applications are using your microphone. Try using Chrome for best compatibility.'
        },
        {
          question: 'Audio quality is poor',
          answer: 'Use headphones to prevent feedback. Ensure you\'re in a quiet environment. Check microphone positioning - speak clearly 6-8 inches from the mic. Adjust speed and pitch settings in the practice section.'
        },
        {
          question: 'App runs slowly or crashes',
          answer: 'Clear browser cache and cookies. Close other browser tabs. Ensure you have stable internet connection. Update your browser to the latest version. Restart browser if issues persist.'
        }
      ]
    },
    {
      id: 'features',
      title: 'Features & Navigation',
      icon: BookOpen,
      color: '#FFC800',
      faqs: [
        {
          question: 'How do the lessons work?',
          answer: 'Lessons are structured progressively. Complete beginner lessons to unlock intermediate content. Each lesson includes audio examples, practice exercises, and pronunciation tips. You earn XP points for completion.'
        },
        {
          question: 'What are the difficulty levels?',
          answer: 'Beginner: Basic RP sounds and common words. Intermediate: Complex vowel patterns and sentence rhythm. Advanced: Professional speaking, theatrical projection, and nuanced pronunciation for performance.'
        },
        {
          question: 'How does the scoring system work?',
          answer: 'Our system analyzes pronunciation accuracy, rhythm, and fluency. Scores range from 0-100%. 70%+ indicates good progress. Scores are based on phonetic analysis and timing patterns.'
        },
        {
          question: 'Can I track my progress?',
          answer: 'Yes! The Academy dashboard shows completed lessons, total practice time, accuracy improvements, and achievements earned. Your progress is saved locally in your browser.'
        }
      ]
    },
    {
      id: 'performance',
      title: 'Acting & Performance',
      icon: Theater,
      color: '#FF9600',
      faqs: [
        {
          question: 'How can this help with stage performance?',
          answer: 'Our academy focuses on projection, clarity, and authentic RP delivery essential for classical theatre. Practice exercises include Shakespeare, Wilde, and contemporary British drama excerpts.'
        },
        {
          question: 'What about different British accents?',
          answer: 'While we focus primarily on RP, we include guidance on regional variations like Estuary English, Northern accents, and Welsh influences. RP remains the foundation for most theatrical work.'
        },
        {
          question: 'Professional voice coaching tips?',
          answer: 'Practice daily for consistency. Focus on breath support and resonance. Record yourself regularly to track improvement. Study classical British actors. Work on both conversational and performative registers.'
        }
      ]
    }
  ]

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  const quickTips = [
    {
      icon: Headphones,
      title: "Use Quality Audio",
      tip: "Headphones help you hear subtle pronunciation differences"
    },
    {
      icon: Mic,
      title: "Practice Daily",
      tip: "15 minutes daily is more effective than long irregular sessions"
    },
    {
      icon: Globe,
      title: "Immerse Yourself",
      tip: "Watch British films, BBC programmes, and classical theatre"
    },
    {
      icon: Users,
      title: "Join Community",
      tip: "Practice with others learning British pronunciation"
    }
  ]

  return (
    <div className="content-grid">
      <motion.div 
        className="glass-morphism"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ padding: '40px', textAlign: 'center' }}
      >
        <h1 className="section-header" style={{ textAlign: 'center', marginBottom: '16px' }}>
          <HelpCircle size={32} color="#FFC800" />
          Help & Guide
        </h1>
        <p style={{ fontSize: '18px', color: '#E0E1DD', marginBottom: '32px' }}>
          Learn how to use the pronunciation lessons and practice exercises
        </p>
        
        <div style={{ display: 'flex', justify: 'center', alignItems: 'center', gap: '16px' }}>
          <US style={{ width: '32px', height: '24px', borderRadius: '4px' }} />
          <span style={{ color: '#778DA9', fontSize: '18px' }}>→</span>
          <GB style={{ width: '32px', height: '24px', borderRadius: '4px' }} />
          <span style={{ color: '#E0E1DD', marginLeft: '12px', fontSize: '16px' }}>
            Learn British Pronunciation
          </span>
        </div>
      </motion.div>

      {/* Quick Tips */}
      <div>
        <h2 className="section-header">
          <Award size={24} color="#58CC02" />
          Quick Tips for Success
        </h2>
        <div className="content-grid two-columns">
          {quickTips.map((tip, index) => (
            <motion.div
              key={tip.title}
              className="glass-morphism"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}
            >
              <tip.icon size={24} color="#1CB0F6" />
              <div>
                <h4 style={{ color: '#FFFFFF', margin: '0 0 4px 0', fontSize: '16px' }}>
                  {tip.title}
                </h4>
                <p style={{ color: '#E0E1DD', margin: 0, fontSize: '14px' }}>
                  {tip.tip}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Sections */}
      <div>
        <h2 className="section-header">
          <BookOpen size={24} color="#CE82FF" />
          Frequently Asked Questions
        </h2>
        
        <div className="content-grid">
          {helpSections.map((section, index) => (
            <motion.div
              key={section.id}
              className="glass-morphism"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ padding: '0', overflow: 'hidden' }}
            >
              <button
                onClick={() => toggleSection(section.id)}
                style={{
                  width: '100%',
                  padding: '20px',
                  background: 'transparent',
                  border: 'none',
                  color: '#FFFFFF',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '18px',
                  fontWeight: '600'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <section.icon size={24} color={section.color} />
                  {section.title}
                </div>
                {expandedSection === section.id ? 
                  <ChevronDown size={20} color="#778DA9" /> : 
                  <ChevronRight size={20} color="#778DA9" />
                }
              </button>
              
              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '0 20px 20px 20px' }}>
                      {section.faqs.map((faq, faqIndex) => (
                        <div key={faqIndex} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: faqIndex < section.faqs.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                          <h4 style={{ color: section.color, fontSize: '16px', marginBottom: '8px', fontWeight: '600' }}>
                            {faq.question}
                          </h4>
                          <div style={{ color: '#E0E1DD', fontSize: '14px', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-line' }}>
                            {faq.answer}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}