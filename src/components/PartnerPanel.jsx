import React, { useMemo, useState } from 'react'
import { useVoices, pickVoice } from './useVoices'

const PERSONAS = [
  { id:'rp_plain', label:'RP • Neutral', pitch:1.0, rate:1.0 },
  { id:'rp_formal', label:'RP • Formal', pitch:0.95, rate:0.95 },
  { id:'estuary', label:'Estuary • Modern', pitch:1.05, rate:1.02 },
  { id:'cockney_soft', label:'Cockney • Soft', pitch:1.05, rate:1.05 },
  { id:'cockney_strong', label:'Cockney • Strong', pitch:1.1, rate:1.02 },
]

export default function PartnerPanel({ onSpeak, text, setText, config, setConfig }){
  const voices = useVoices()
  const [previewing, setPreviewing] = useState(false)
  const v = useMemo(()=> pickVoice(voices, { lang:'en-GB', gender:config.gender, nameIncludes: config.voiceHint }), [voices, config.gender, config.voiceHint])

  const speak = (t) => {
    if (!t?.trim()) return
    const u = new SpeechSynthesisUtterance(t)
    u.lang = 'en-GB'
    const persona = PERSONAS.find(p=>p.id===config.persona) || PERSONAS[0]
    u.rate = config.speed || persona.rate
    u.pitch = config.pitch || persona.pitch
    if (v) u.voice = v
    u.onstart = ()=> setPreviewing(true)
    u.onend = ()=> setPreviewing(false)
    window.speechSynthesis.speak(u)
    onSpeak && onSpeak(t)
  }

  return (
    <div className="frost" style={{padding:16}}>
      <div className="kpi"><div className="dot" style={{background:'#38bdf8'}}></div> <strong>Voice Partner</strong> — choose accent, person, speed, gender</div>
      <div style={{height:10}}></div>
      <div className="row">
        <div style={{flex:1}}>
          <div className="label">Accent Type</div>
          <select value={config.accent} onChange={e=>setConfig(c=>({...c, accent:e.target.value}))}>
            <option value="RP">RP (Received Pronunciation)</option>
            <option value="Estuary">Estuary (Modern London)</option>
            <option value="Cockney">Cockney (East London)</option>
          </select>
        </div>
        <div style={{flex:1}}>
          <div className="label">Persona</div>
          <select value={config.persona} onChange={e=>setConfig(c=>({...c, persona:e.target.value}))}>
            {PERSONAS.map(p=> <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
        </div>
      </div>

      <div className="row" style={{marginTop:10}}>
        <div style={{flex:1}}>
          <div className="label">Gender</div>
          <select value={config.gender} onChange={e=>setConfig(c=>({...c, gender:e.target.value}))}>
            <option value="any">Any</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
        <div style={{flex:1}}>
          <div className="label">Speed (0.7–1.3)</div>
          <input type="range" min="0.7" max="1.3" step="0.01" value={config.speed} onChange={e=>setConfig(c=>({...c, speed:parseFloat(e.target.value)}))}/>
        </div>
        <div style={{flex:1}}>
          <div className="label">Pitch (0.8–1.2)</div>
          <input type="range" min="0.8" max="1.2" step="0.01" value={config.pitch} onChange={e=>setConfig(c=>({...c, pitch:parseFloat(e.target.value)}))}/>
        </div>
      </div>

      <div className="row" style={{marginTop:10}}>
        <div style={{flex:1}}>
          <div className="label">Optional: Voice name hint (e.g., “Serena”, “Daniel”, “Google UK”)</div>
          <input value={config.voiceHint} onChange={e=>setConfig(c=>({...c, voiceHint:e.target.value}))} placeholder="Serena / Daniel / Google UK English Female"/>
        </div>
        <span className="pill">{v ? ('Voice: ' + v.name) : 'Voice: (loading…)'} </span>
      </div>

      <div style={{marginTop:12}}>
        <div className="label">Partner will speak this (paste lines on the right & click “Send to Partner”)</div>
        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Hello! Paste lines or type here to hear them in a proper British accent." />
      </div>

      <div className="row" style={{marginTop:10}}>
        <button className="btn" onClick={()=>speak(text)} disabled={previewing}>🔊 Play Partner</button>
        <button className="btn" onClick={()=>{ window.speechSynthesis.cancel(); }} disabled={!previewing}>⏹ Stop</button>
        <span className="pill">TTS approximates RP/Estuary/Cockney via rate + pitch</span>
      </div>
    </div>
  )
}
