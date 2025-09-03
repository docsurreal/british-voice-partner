import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  Volume2, 
  Mic, 
  Globe, 
  Palette,
  User,
  Bell,
  Shield,
  Download,
  Upload,
  RotateCcw,
  Save,
  Monitor,
  Moon,
  Sun
} from 'lucide-react'
import { GB, US } from 'country-flag-icons/react/3x2'

export default function SettingsPage({ config, setConfig }) {
  const [tempConfig, setTempConfig] = useState(config)
  const [hasChanges, setHasChanges] = useState(false)
  
  const handleChange = (key, value) => {
    setTempConfig(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }
  
  const saveSettings = () => {
    setConfig(tempConfig)
    setHasChanges(false)
  }
  
  const resetToDefaults = () => {
    const defaults = {
      accent: 'RP',
      speed: 1.0,
      pitch: 1.0,
      voice: 'british',
      theme: 'dark',
      notifications: true,
      autoplay: false
    }
    setTempConfig(defaults)
    setHasChanges(true)
  }

  const settingSections = [
    {
      id: 'voice',
      title: 'Voice & Audio Settings',
      icon: Volume2,
      color: '#1CB0F6',
      settings: [
        {
          id: 'accent',
          label: 'Accent Type',
          type: 'select',
          value: tempConfig.accent,
          options: [
            { value: 'RP', label: 'Received Pronunciation (RP)' },
            { value: 'Estuary', label: 'Estuary English' },
            { value: 'Northern', label: 'Northern British' },
            { value: 'Welsh', label: 'Welsh English' }
          ]
        },
        {
          id: 'speed',
          label: 'Speech Speed',
          type: 'range',
          value: tempConfig.speed,
          min: 0.5,
          max: 1.5,
          step: 0.1,
          suffix: 'x'
        },
        {
          id: 'pitch',
          label: 'Voice Pitch',
          type: 'range',
          value: tempConfig.pitch,
          min: 0.7,
          max: 1.3,
          step: 0.1
        },
        {
          id: 'autoplay',
          label: 'Auto-play Audio Examples',
          type: 'toggle',
          value: tempConfig.autoplay || false
        }
      ]
    },
    {
      id: 'interface',
      title: 'Interface & Display',
      icon: Palette,
      color: '#CE82FF',
      settings: [
        {
          id: 'theme',
          label: 'Theme',
          type: 'select',
          value: tempConfig.theme || 'dark',
          options: [
            { value: 'dark', label: 'Academic Dark' },
            { value: 'light', label: 'Classic Light' },
            { value: 'auto', label: 'System Default' }
          ]
        },
        {
          id: 'animations',
          label: 'Enable Animations',
          type: 'toggle',
          value: tempConfig.animations !== false
        },
        {
          id: 'compactMode',
          label: 'Compact Mode',
          type: 'toggle',
          value: tempConfig.compactMode || false
        }
      ]
    },
    {
      id: 'learning',
      title: 'Learning Preferences',
      icon: User,
      color: '#58CC02',
      settings: [
        {
          id: 'skillLevel',
          label: 'Current Skill Level',
          type: 'select',
          value: tempConfig.skillLevel || 'intermediate',
          options: [
            { value: 'beginner', label: 'Beginner' },
            { value: 'intermediate', label: 'Intermediate' },
            { value: 'advanced', label: 'Advanced' },
            { value: 'professional', label: 'Professional' }
          ]
        },
        {
          id: 'dailyGoal',
          label: 'Daily Practice Goal',
          type: 'range',
          value: tempConfig.dailyGoal || 15,
          min: 5,
          max: 60,
          step: 5,
          suffix: ' min'
        },
        {
          id: 'notifications',
          label: 'Practice Reminders',
          type: 'toggle',
          value: tempConfig.notifications !== false
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Data',
      icon: Shield,
      color: '#FF9600',
      settings: [
        {
          id: 'saveProgress',
          label: 'Save Progress Locally',
          type: 'toggle',
          value: tempConfig.saveProgress !== false
        },
        {
          id: 'analytics',
          label: 'Usage Analytics',
          type: 'toggle',
          value: tempConfig.analytics || false
        }
      ]
    }
  ]

  const renderSetting = (setting) => {
    switch (setting.type) {
      case 'select':
        return (
          <select
            className="elegant-input"
            value={setting.value}
            onChange={(e) => handleChange(setting.id, e.target.value)}
            style={{ padding: '12px 16px' }}
          >
            {setting.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      
      case 'range':
        return (
          <div>
            <input
              type="range"
              min={setting.min}
              max={setting.max}
              step={setting.step}
              value={setting.value}
              onChange={(e) => handleChange(setting.id, parseFloat(e.target.value))}
              style={{
                width: '100%',
                height: '6px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '10px',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
            <div style={{ 
              textAlign: 'center', 
              marginTop: '8px', 
              color: '#1CB0F6', 
              fontWeight: '600',
              fontSize: '14px'
            }}>
              {setting.value}{setting.suffix || ''}
            </div>
          </div>
        )
      
      case 'toggle':
        return (
          <div 
            onClick={() => handleChange(setting.id, !setting.value)}
            style={{
              width: '60px',
              height: '30px',
              background: setting.value ? '#58CC02' : 'rgba(255,255,255,0.2)',
              borderRadius: '15px',
              position: 'relative',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{
              width: '26px',
              height: '26px',
              background: 'white',
              borderRadius: '50%',
              position: 'absolute',
              top: '2px',
              left: setting.value ? '32px' : '2px',
              transition: 'all 0.3s ease'
            }} />
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="content-grid">
      <motion.div 
        className="glass-morphism"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ padding: '40px', textAlign: 'center' }}
      >
        <h1 className="section-header" style={{ textAlign: 'center', marginBottom: '16px' }}>
          <Settings size={32} color="#FF9600" />
          Academy Settings
        </h1>
        <p style={{ fontSize: '18px', color: '#E0E1DD', marginBottom: '32px' }}>
          Customize your British pronunciation learning experience
        </p>
        
        <div style={{ display: 'flex', justify: 'center', alignItems: 'center', gap: '16px' }}>
          <US style={{ width: '32px', height: '24px', borderRadius: '4px' }} />
          <span style={{ color: '#778DA9', fontSize: '18px' }}>→</span>
          <GB style={{ width: '32px', height: '24px', borderRadius: '4px' }} />
          <span style={{ color: '#E0E1DD', marginLeft: '12px', fontSize: '16px' }}>
            Personalized Learning Path
          </span>
        </div>
      </motion.div>

      {/* Settings Sections */}
      <div className="content-grid">
        {settingSections.map((section, index) => (
          <motion.div
            key={section.id}
            className="glass-morphism"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{ padding: '32px' }}
          >
            <h2 className="section-header" style={{ marginBottom: '24px' }}>
              <section.icon size={28} color={section.color} />
              {section.title}
            </h2>
            
            <div style={{ display: 'grid', gap: '20px' }}>
              {section.settings.map(setting => (
                <div key={setting.id}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <label style={{
                      fontWeight: '500',
                      color: '#E0E1DD',
                      fontSize: '16px'
                    }}>
                      {setting.label}
                    </label>
                    {setting.type === 'toggle' && renderSetting(setting)}
                  </div>
                  {setting.type !== 'toggle' && renderSetting(setting)}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <motion.div
        className="glass-morphism"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ padding: '32px' }}
      >
        <h2 className="section-header" style={{ marginBottom: '24px' }}>
          <Monitor size={28} color="#FFC800" />
          System Actions
        </h2>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            className={`academic-button ${hasChanges ? 'success' : ''}`}
            onClick={saveSettings}
            disabled={!hasChanges}
            style={{ opacity: hasChanges ? 1 : 0.6 }}
          >
            <Save size={16} style={{ marginRight: '8px' }} />
            Save Changes
          </button>
          
          <button
            className="academic-button"
            onClick={resetToDefaults}
          >
            <RotateCcw size={16} style={{ marginRight: '8px' }} />
            Reset to Defaults
          </button>
          
          <button
            className="academic-button"
            onClick={() => {
              const data = JSON.stringify(tempConfig, null, 2)
              const blob = new Blob([data], { type: 'application/json' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'british-voice-settings.json'
              a.click()
              URL.revokeObjectURL(url)
            }}
          >
            <Download size={16} style={{ marginRight: '8px' }} />
            Export Settings
          </button>
        </div>
        
        {hasChanges && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              marginTop: '20px',
              padding: '16px',
              background: 'rgba(255, 196, 0, 0.1)',
              border: '1px solid #FFC400',
              borderRadius: '12px',
              textAlign: 'center',
              color: '#FFC400',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            You have unsaved changes. Remember to save your preferences.
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}