import { useEffect, useState } from 'react'
export function useVoices(){
  const [voices, setVoices] = useState([])
  useEffect(()=>{
    const load=()=> setVoices(window.speechSynthesis.getVoices())
    load()
    if (typeof window !== 'undefined'){
      window.speechSynthesis.onvoiceschanged = load
    }
  },[])
  return voices
}
export function pickVoice(voices, { lang='en-GB', gender='any', nameIncludes='' }){
  const gb = voices.filter(v=> v.lang && v.lang.startsWith(lang))
  const byName = nameIncludes ? gb.filter(v=> v.name.toLowerCase().includes(nameIncludes.toLowerCase())) : gb
  let pool = byName
  if (gender==='male'){
    pool = byName.filter(v=> /male|daniel|george|brian|google uk english male/i.test(v.name))
  } else if (gender==='female'){
    pool = byName.filter(v=> /female|martha|serena|amy|emma|english uk|google uk english female/i.test(v.name))
  }
  return pool[0] || gb[0] || voices[0]
}
