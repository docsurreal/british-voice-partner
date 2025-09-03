import React, { useRef, useState } from 'react'

export default function LearnerPanel({ partnerSpeak, setPartnerSpeak, onSendToPartner }){
  const [lines, setLines] = useState("Paste your play lines here.\nTry: Harry had a house in Hackney. The car is far.")
  const [recording, setRecording] = useState(false)
  const [heard, setHeard] = useState('')
  const [score, setScore] = useState(null)
  const recRef = useRef(null)

  const send = ()=> onSendToPartner(lines)

  const start = ()=>{
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)){
      alert('Speech recognition not supported here. Try Chrome desktop.')
      return
    }
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition
    const rec = new Rec()
    rec.lang = 'en-GB'
    rec.interimResults = false
    rec.maxAlternatives = 1
    rec.onresult = (e)=>{
      const val = e.results[0][0].transcript
      setHeard(val)
      scoreAttempt(val, lines)
      setRecording(false)
    }
    rec.onerror = ()=> setRecording(false)
    rec.onend = ()=> setRecording(false)
    recRef.current = rec
    setRecording(true)
    rec.start()
  }

  const stop = ()=>{ if (recRef.current){ recRef.current.stop() } }

  const scoreAttempt = (val, target)=>{
    const clean = s => s.toLowerCase().replace(/[^a-z'\s]/g,' ').replace(/\s+/g,' ').trim()
    const tv = clean(target).split(' ')
    const vv = clean(val).split(' ')
    const setT = new Set(tv)
    let hit = 0
    vv.forEach(w=>{ if (setT.has(w)) hit++ })
    let s = Math.round((hit / Math.max(1, tv.length)) * 60)
    if (Math.abs(vv.length - tv.length) <= 2) s += 20
    if (val.includes("'")) s += 5
    s = Math.max(0, Math.min(100, s))
    setScore(s)
  }

  return (
    <div className="frost" style={{padding:16}}>
      <div className="kpi"><div className="dot" style={{background:'#f59e0b'}}></div> <strong>Your Practice</strong> — paste lines, send to partner, then record yourself</div>
      <div style={{height:10}}></div>
      <div className="label">Your Lines</div>
      <textarea value={lines} onChange={e=>setLines(e.target.value)} />
      <div className="row" style={{marginTop:10}}>
        <button className="btn" onClick={send}>➡️ Send to Partner</button>
        <button className="btn" onClick={recording ? stop : start}>{recording ? '⏹ Stop' : '🎙️ Record Myself'}</button>
        <span className="pill">Heard: {heard || '—'}</span>
        <span className="pill">Score: {score===null ? '—' : score + '%'}</span>
      </div>
      <div className="meter" style={{marginTop:10}}><div style={{width: `${score||0}%`}}></div></div>
      <div className="label" style={{marginTop:8}}>Workflow: Send → Partner plays the accent → You record → Compare & iterate.</div>
    </div>
  )
}
