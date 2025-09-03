import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Target, Clock, BookOpen, Mic, Users, TrendingUp, Star } from 'lucide-react'

export default function Dashboard({ userData, setUserData }) {
  const { streak, totalPoints, level, progress, savedLines } = userData

  const achievements = [
    { icon: Trophy, title: 'First Lesson', desc: 'Complete your first lesson', completed: true },
    { icon: Mic, title: 'Perfect Pronunciation', desc: 'Score 90%+ on pronunciation', completed: progress > 90 },
    { icon: BookOpen, title: 'Script Scholar', desc: 'Save 10+ lines from scripts', completed: savedLines.length >= 10 },
    { icon: Users, title: 'Cast Member', desc: 'Connect with other cast members', completed: false }
  ]

  const recentActivity = [
    { type: 'lesson', text: 'Completed "RP Pronunciation Basics"', time: '2 hours ago' },
    { type: 'practice', text: 'Practiced 15 lines from Hamlet', time: '1 day ago' },
    { type: 'script', text: 'Added "Romeo and Juliet" script', time: '2 days ago' }
  ]

  return (
    <div className="grid">
      <motion.div 
        className="duolingo-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-title">
          <TrendingUp size={24} color="#58CC02" />
          Your Progress
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: '700', color: '#1CB0F6' }}>{streak}</div>
            <div style={{ color: '#B7C4CF', fontSize: '14px' }}>Day Streak</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: '700', color: '#58CC02' }}>{totalPoints}</div>
            <div style={{ color: '#B7C4CF', fontSize: '14px' }}>Total XP</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: '700', color: '#FFC800' }}>{level}</div>
            <div style={{ color: '#B7C4CF', fontSize: '14px' }}>Level</div>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#B7C4CF' }}>Overall Progress</span>
            <span style={{ color: '#58CC02', fontWeight: '600' }}>{progress}%</span>
          </div>
          <div className="progress-bar">
            <motion.div 
              className="progress-fill" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      </motion.div>

      <div className="grid two-col">
        <motion.div 
          className="duolingo-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="section-title">
            <Star size={20} color="#FFC800" />
            Achievements
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '8px',
                  background: achievement.completed ? 'rgba(88, 204, 2, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${achievement.completed ? '#58CC02' : 'rgba(255, 255, 255, 0.1)'}`
                }}
              >
                <achievement.icon 
                  size={24} 
                  color={achievement.completed ? '#58CC02' : '#8B9BA8'} 
                />
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontWeight: '600', 
                    color: achievement.completed ? '#FFFFFF' : '#B7C4CF' 
                  }}>
                    {achievement.title}
                  </div>
                  <div style={{ 
                    fontSize: '14px', 
                    color: achievement.completed ? '#B7C4CF' : '#8B9BA8' 
                  }}>
                    {achievement.desc}
                  </div>
                </div>
                {achievement.completed && (
                  <div style={{
                    background: '#58CC02',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    ✓ Done
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="duolingo-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="section-title">
            <Clock size={20} color="#1CB0F6" />
            Recent Activity
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentActivity.map((activity, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: activity.type === 'lesson' ? '#1CB0F6' : 
                             activity.type === 'practice' ? '#58CC02' : '#FFC800',
                  marginTop: '6px'
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '500', color: '#FFFFFF', marginBottom: '4px' }}>
                    {activity.text}
                  </div>
                  <div style={{ fontSize: '12px', color: '#8B9BA8' }}>
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="duolingo-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="section-title">
          <Target size={20} color="#CE82FF" />
          Quick Actions
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <button className="duo-button">
            <BookOpen size={16} style={{ marginRight: '8px' }} />
            Start Lesson
          </button>
          <button className="duo-button green">
            <Mic size={16} style={{ marginRight: '8px' }} />
            Practice Lines
          </button>
          <button className="duo-button" style={{ background: 'linear-gradient(180deg, #CE82FF 0%, #B565E8 100%)', boxShadow: '0 4px 0 #B565E8' }}>
            <Users size={16} style={{ marginRight: '8px' }} />
            Join Cast
          </button>
        </div>
      </motion.div>
    </div>
  )
}