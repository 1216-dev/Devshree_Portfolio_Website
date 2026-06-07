'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Copy, HelpCircle, X, ChevronRight, Droplets, Info } from 'lucide-react'

// Synthesise a clean bubble/pop sound using Web Audio API
function playPopSound(soundEnabled: boolean) {
  if (!soundEnabled) return
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    
    // Create oscillator
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    osc.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    // Retro bubble pop frequency sweep
    const now = ctx.currentTime
    osc.type = 'sine'
    osc.frequency.setValueAtTime(150, now)
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.12)
    
    // Gain envelop
    gainNode.gain.setValueAtTime(0.3, now)
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15)
    
    osc.start(now)
    osc.stop(now + 0.15)
  } catch (e) {
    console.error('Audio synthesis failed:', e)
  }
}

// Synthesise a splash/water sound
function playWaterSound(soundEnabled: boolean) {
  if (!soundEnabled) return
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    osc.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(600, now)
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.2)
    
    gainNode.gain.setValueAtTime(0.15, now)
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2)
    
    osc.start(now)
    osc.stop(now + 0.2)
  } catch (e) {
    console.error('Audio synthesis failed:', e)
  }
}

// Types of plants
type PlantStage = 'seed' | 'sprout' | 'bud' | 'flower'
type FlowerType = 'rose' | 'sunflower' | 'violet' | 'marigold'

interface SeedIdea {
  id: string
  name: string
  note: string
  row: number
  col: number
  stage: PlantStage
  flowerType?: FlowerType
  waterCount: number
  wateredByMeToday?: boolean
  timestamp: number
  isMine?: boolean
}

// Custom vector illustrations for the garden
const SoilIcon = () => (
  <svg className="w-14 h-7" viewBox="0 0 24 12" shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
    {/* Outline */}
    <path d="M 6 4 h 12 v 1 h 2 v 1 h 2 v 1 h 2 v 4 h -22 v -4 h 2 v -1 h 2 v -1 z" fill="#3b2314" />
    {/* Core Soil */}
    <path d="M 7 5 h 10 v 1 h 2 v 1 h 2 v 4 h -18 v -4 h 2 v -1 z" fill="#78350F" />
    {/* Texture details */}
    <rect x="8" y="7" width="2" height="1" fill="#451a03" />
    <rect x="14" y="6" width="3" height="1" fill="#451a03" />
    <rect x="12" y="9" width="4" height="1" fill="#451a03" />
    <rect x="6" y="9" width="2" height="1" fill="#451a03" />
    
    {/* Highlights */}
    <rect x="9" y="5" width="3" height="1" fill="#b45309" />
    <rect x="13" y="7" width="2" height="1" fill="#b45309" />
    <rect x="17" y="8" width="2" height="1" fill="#b45309" />
  </svg>
)

const SproutIcon = () => (
  <svg className="w-10 h-10 animate-pulse" viewBox="0 0 16 16" shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
    {/* Black outline */}
    <rect x="7" y="5" width="2" height="9" fill="#1b2e1a" />
    <rect x="5" y="4" width="2" height="2" fill="#1b2e1a" />
    <rect x="3" y="5" width="2" height="2" fill="#1b2e1a" />
    <rect x="9" y="3" width="2" height="2" fill="#1b2e1a" />
    <rect x="11" y="4" width="2" height="2" fill="#1b2e1a" />
    
    {/* Stem fill */}
    <rect x="7" y="6" width="2" height="8" fill="#22c55e" />
    
    {/* Left Leaf fill */}
    <rect x="5" y="5" width="2" height="1" fill="#15803d" />
    <rect x="4" y="6" width="2" height="1" fill="#22c55e" />
    <rect x="3" y="7" width="2" height="1" fill="#4ade80" />
    
    {/* Right Leaf fill */}
    <rect x="9" y="4" width="2" height="1" fill="#16a34a" />
    <rect x="10" y="5" width="2" height="1" fill="#22c55e" />
    <rect x="11" y="6" width="2" height="1" fill="#86efac" />
  </svg>
)

const BudIcon = () => (
  <svg className="w-8.5 h-10" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stem */}
    <path d="M16 34V16C16 12 18 10 20 8" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
    {/* Leaves */}
    <path d="M16 24C11 24 9 20 10 17C12 14 16 18 16 24Z" fill="#166534" />
    {/* Bud Head */}
    <path d="M16 16C12 14 12 6 16 2C20 6 20 14 16 16Z" fill="#EC4899" stroke="#BE185D" strokeWidth="1.5" />
    <path d="M16 16C14 14 14 10 16 6C18 10 18 14 16 16Z" fill="#F472B6" />
  </svg>
)

const FlowerIcon = ({ type }: { type: FlowerType }) => {
  const getColors = () => {
    switch (type) {
      case 'rose':
        return { petal: '#EF4444', center: '#B91C1C', petalLight: '#F87171' }
      case 'sunflower':
        return { petal: '#F59E0B', center: '#78350F', petalLight: '#FBBF24' }
      case 'violet':
        return { petal: '#8B5CF6', center: '#4C1D95', petalLight: '#A78BFA' }
      case 'marigold':
      default:
        return { petal: '#F97316', center: '#C2410C', petalLight: '#FB923C' }
    }
  }
  const colors = getColors()

  return (
    <svg className="w-10 h-12" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stem & Leaf */}
      <path d="M20 46V22C20 17 22 15 24 13" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M20 32C26 32 28 29 27 26C25 23 20 27 20 32Z" fill="#166534" />
      
      {/* Petals */}
      <circle cx="20" cy="14" r="8" fill={colors.petal} />
      <circle cx="13" cy="11" r="7" fill={colors.petalLight} />
      <circle cx="27" cy="11" r="7" fill={colors.petalLight} />
      <circle cx="13" cy="18" r="7" fill={colors.petalLight} />
      <circle cx="27" cy="18" r="7" fill={colors.petalLight} />
      <circle cx="20" cy="7" r="7" fill={colors.petalLight} />
      
      {/* Center */}
      <circle cx="20" cy="14" r="5" fill={colors.center} />
    </svg>
  )
}

const WateringCanIcon = ({ animate }: { animate?: boolean }) => (
  <motion.svg
    animate={animate ? { rotate: [-10, -35, -10], y: [0, -3, 0] } : {}}
    transition={{ duration: 0.8, repeat: animate ? Infinity : 0 }}
    className="w-12 h-12"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 20H26L24 36H12L10 20Z" fill="#F97316" stroke="#C2410C" strokeWidth="2.5" />
    <path d="M6 22C4 22 2 24 2 27C2 30 4 32 6 32H10" stroke="#C2410C" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 24L38 18V24" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
    <path d="M38 16L42 12M42 12H44M42 12V14" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
  </motion.svg>
)

export function SeedGarden() {
  const [isOpen, setIsOpen] = useState(false)
  const [seeds, setSeeds] = useState<SeedIdea[]>([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [wateringMode, setWateringMode] = useState(false)
  const [waterLimit, setWaterLimit] = useState(1) // 1 per day
  const [showInfo, setShowInfo] = useState(false)
  
  // Custom dialog to plant a seed
  const [plantingCoords, setPlantingCoords] = useState<{ row: number; col: number } | null>(null)
  const [planterName, setPlanterName] = useState('')
  const [planterNote, setPlanterNote] = useState('')
  
  // Success toast/message state
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Floating water droplet animation triggers
  const [waterDrops, setWaterDrops] = useState<{ id: number; x: number; y: number }[]>([])

  // Setup initial mock ideas
  useEffect(() => {
    const saved = localStorage.getItem('land_of_ideas_seeds')
    if (saved) {
      setSeeds(JSON.parse(saved))
    } else {
      const defaultSeeds: SeedIdea[] = [
        {
          id: 'devshree',
          name: 'Devshree',
          note: 'Build a beautifully interactive Land of Ideas sprout garden for my scrapbook portfolio! 🚀',
          row: 2,
          col: 3,
          stage: 'flower',
          flowerType: 'sunflower',
          waterCount: 12,
          timestamp: Date.now() - 3 * 24 * 3600 * 1000,
        },
        {
          id: 'divyansh',
          name: 'Divyansh',
          note: 'An AI engine that designs retro hardware boards from high-level block designs.',
          row: 5,
          col: 8,
          stage: 'bud',
          waterCount: 5,
          timestamp: Date.now() - 2 * 24 * 3600 * 1000,
        },
        {
          id: 'riddhi',
          name: 'Riddhi',
          note: 'An interface framework based completely on physical paper cuts and layering rules.',
          row: 4,
          col: 11,
          stage: 'sprout',
          waterCount: 2,
          timestamp: Date.now() - 24 * 3600 * 1000,
        },
        // Pre-populate some extra surprise flowers to make the board look active
        {
          id: 'mock1',
          name: 'Arjun',
          note: 'Decentralized server arrays running completely on solar-powered microcomputers.',
          row: 1,
          col: 5,
          stage: 'flower',
          flowerType: 'rose',
          waterCount: 9,
          timestamp: Date.now(),
        },
        {
          id: 'mock2',
          name: 'Sarah',
          note: 'A local-first browser extension that turns every website into a hand-drawn blueprint.',
          row: 3,
          col: 14,
          stage: 'sprout',
          waterCount: 1,
          timestamp: Date.now(),
        },
        {
          id: 'mock3',
          name: 'Kenji',
          note: 'Audio synthesis engine recreating natural river flows based on weather API data.',
          row: 7,
          col: 6,
          stage: 'flower',
          flowerType: 'violet',
          waterCount: 15,
          timestamp: Date.now(),
        },
        {
          id: 'mock4',
          name: 'Chloe',
          note: 'Micro-animations library optimized for rendering on low-spec e-ink monitors.',
          row: 6,
          col: 2,
          stage: 'bud',
          waterCount: 3,
          timestamp: Date.now(),
        },
        {
          id: 'mock5',
          name: 'Aarav',
          note: 'Fully customizable physical dials connecting to Spotify playlist filters.',
          row: 8,
          col: 13,
          stage: 'flower',
          flowerType: 'marigold',
          waterCount: 7,
          timestamp: Date.now(),
        }
      ]
      setSeeds(defaultSeeds)
      localStorage.setItem('land_of_ideas_seeds', JSON.stringify(defaultSeeds))
    }

    // Check if watered today
    const lastWateredDate = localStorage.getItem('land_of_ideas_last_watered')
    const today = new Date().toDateString()
    if (lastWateredDate === today) {
      setWaterLimit(0)
    }
  }, [])

  // Trigger Toast Notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Plant a new seed
  const handlePlantSeed = (e: React.FormEvent) => {
    e.preventDefault()
    if (!planterName.trim() || !planterNote.trim() || !plantingCoords) return

    // Limit to one seed planted of their own
    const hasPlantedMine = seeds.some(s => s.isMine)
    if (hasPlantedMine) {
      triggerToast('You have already planted a sprout! Water others to help them grow.')
      setPlantingCoords(null)
      setPlanterName('')
      setPlanterNote('')
      return
    }

    const newSeed: SeedIdea = {
      id: 'mine_' + Date.now(),
      name: planterName.trim(),
      note: planterNote.trim(),
      row: plantingCoords.row,
      col: plantingCoords.col,
      stage: 'seed',
      waterCount: 0,
      timestamp: Date.now(),
      isMine: true,
    }

    const updated = [...seeds, newSeed]
    setSeeds(updated)
    localStorage.setItem('land_of_ideas_seeds', JSON.stringify(updated))
    playPopSound(soundEnabled)

    triggerToast(`Seed planted! Keep sharing to help it bloom into a surprise flower.`)
    setPlantingCoords(null)
    setPlanterName('')
    setPlanterNote('')
  }

  // Water a plant
  const handleWaterPlant = (plant: SeedIdea, e: React.MouseEvent) => {
    if (!wateringMode) return

    if (waterLimit <= 0) {
      triggerToast('You have already used your watering can today! Come back tomorrow.')
      setWateringMode(false)
      return
    }

    // Water sound & drop animation
    playWaterSound(soundEnabled)
    const rect = e.currentTarget.getBoundingClientRect()
    const containerRect = document.getElementById('garden-modal-content')?.getBoundingClientRect()
    
    if (rect && containerRect) {
      const dropId = Date.now()
      const x = rect.left - containerRect.left + rect.width / 2
      const y = rect.top - containerRect.top
      setWaterDrops(prev => [...prev, { id: dropId, x, y }])
      setTimeout(() => {
        setWaterDrops(prev => prev.filter(d => d.id !== dropId))
      }, 1000)
    }

    // Calculate new stage based on water count
    const newWaterCount = plant.waterCount + 1
    let newStage = plant.stage
    let newFlowerType = plant.flowerType

    if (newWaterCount >= 8) {
      newStage = 'flower'
      if (!newFlowerType) {
        const types: FlowerType[] = ['rose', 'sunflower', 'violet', 'marigold']
        newFlowerType = types[Math.floor(Math.random() * types.length)]
      }
    } else if (newWaterCount >= 4) {
      newStage = 'bud'
    } else if (newWaterCount >= 1) {
      newStage = 'sprout'
    }

    const updated = seeds.map(s => {
      if (s.id === plant.id) {
        return {
          ...s,
          waterCount: newWaterCount,
          stage: newStage,
          flowerType: newFlowerType,
          wateredByMeToday: true
        }
      }
      return s
    })

    setSeeds(updated)
    localStorage.setItem('land_of_ideas_seeds', JSON.stringify(updated))
    
    // Set daily limit
    setWaterLimit(0)
    localStorage.setItem('land_of_ideas_last_watered', new Date().toDateString())
    setWateringMode(false)
    triggerToast(`Watered ${plant.name}'s sprout! Stage: ${newStage.toUpperCase()} (${newWaterCount} drops total)`)
  }

  // Copy site sharing link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    triggerToast('Portfolio link copied to clipboard! Share it to get water.')
    playPopSound(soundEnabled)
  }

  // Sound toggler
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
  }

  // Generate grid rows (9 rows, 16 columns)
  const rowsCount = 9
  const colsCount = 16

  const renderGrid = () => {
    const gridItems = []
    for (let r = 1; r <= rowsCount; r++) {
      for (let c = 1; c <= colsCount; c++) {
        const plant = seeds.find(s => s.row === r && s.col === c)
        gridItems.push(
          <div
            key={`${r}-${c}`}
            className="relative flex items-center justify-center border-b border-dashed border-amber-900/10 min-h-[56px] min-w-[56px]"
          >
            {plant ? (
              <motion.div
                whileHover={{ scale: 1.15 }}
                onClick={(e) => {
                  if (wateringMode) {
                    handleWaterPlant(plant, e)
                  } else {
                    playPopSound(soundEnabled)
                  }
                }}
                className="group relative cursor-pointer flex flex-col items-center justify-end h-full w-full pb-1"
              >
                {/* Plant indicator / hover notes */}
                <div className="absolute bottom-12 hidden group-hover:flex flex-col items-center z-50 pointer-events-none">
                  <div className="bg-amber-950 text-amber-50 px-3 py-2 rounded-xl text-xs shadow-2xl border border-amber-800 max-w-[200px] text-center font-mono">
                    <span className="font-bold text-amber-300 block mb-0.5">{plant.name}</span>
                    <p className="leading-snug">{plant.note}</p>
                    <span className="text-[10px] text-amber-400 block mt-1">💧 Watered {plant.waterCount} times</span>
                  </div>
                  <div className="w-2.5 h-2.5 bg-amber-950 rotate-45 -mt-1.5 border-r border-b border-amber-800" />
                </div>

                {/* Show Stage Icon */}
                <div className="relative">
                  {plant.stage === 'seed' && <div className="w-8 h-8 flex items-center justify-center"><div className="w-2.5 h-2.5 rounded-full bg-amber-800 animate-bounce" /></div>}
                  {plant.stage === 'sprout' && <SproutIcon />}
                  {plant.stage === 'bud' && <BudIcon />}
                  {plant.stage === 'flower' && <FlowerIcon type={plant.flowerType || 'marigold'} />}
                  
                  {/* Watered effect badge */}
                  {plant.wateredByMeToday && (
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-0.5 text-[8px] animate-bounce">💧</span>
                  )}
                </div>

                {/* Soil background mound */}
                <div className="-mt-3 opacity-90">
                  <SoilIcon />
                </div>

                {/* Mine badge */}
                {plant.isMine && (
                  <span className="absolute -bottom-1 text-[8px] font-mono bg-emerald-600 text-emerald-50 px-1 rounded border border-emerald-500 uppercase tracking-widest leading-none scale-90">
                    my plant
                  </span>
                )}
              </motion.div>
            ) : (
              <button
                disabled={wateringMode}
                onClick={() => setPlantingCoords({ row: r, col: c })}
                className={`w-full h-full group hover:bg-amber-900/5 transition-colors duration-200 flex items-center justify-center ${wateringMode ? 'cursor-not-allowed opacity-40' : ''}`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-amber-900/10 group-hover:bg-amber-800/40 transition-colors" />
              </button>
            )}
          </div>
        )
      }
    }
    return gridItems
  }

  return (
    <>
      {/* Floating Trigger Icon (Bottom-Right Corner) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center">
        <motion.button
          onClick={() => {
            setIsOpen(true)
            playPopSound(soundEnabled)
          }}
          whileHover={{ scale: 1.1 }}
          animate={{
            rotate: [-2, 2, -2],
            y: [0, -2, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="relative flex flex-col items-center justify-center p-3 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-amber-200 hover:border-amber-400 group cursor-pointer"
        >
          {/* Sprout visual and soil */}
          <div className="scale-90 flex flex-col items-center">
            <SproutIcon />
            <div className="-mt-3">
              <SoilIcon />
            </div>
          </div>

          <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-orange-600 mt-0.5">
            Plant a seed!
          </span>
        </motion.button>
      </div>

      {/* Main Interactive Garden Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              id="garden-modal-content"
              className="relative bg-amber-50 rounded-2xl border-4 border-amber-950 shadow-2xl overflow-hidden w-full max-w-5xl flex flex-col text-amber-950 max-h-[90vh]"
            >
              
              {/* Header Panel */}
              <div className="bg-amber-900 text-amber-50 p-4 border-b-4 border-amber-950 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-amber-950/40 rounded-lg">
                    <SproutIcon />
                  </div>
                  <div>
                    <h2 className="font-display text-xl uppercase tracking-wider text-amber-100 leading-none">
                      Land of Ideas
                    </h2>
                    <p className="text-[10px] font-mono tracking-widest text-amber-300 uppercase mt-1">
                      Sparks, Sprouts, and Blossoms
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="bg-amber-950 px-3 py-1.5 rounded-lg text-xs font-mono border border-amber-800 text-amber-300">
                    {seeds.length} seeds sowed
                  </span>
                  
                  {/* Share/Copy Link */}
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 bg-amber-850 hover:bg-amber-950 border border-amber-800 text-amber-100 hover:text-white px-3 py-1.5 rounded-lg text-xs font-mono transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </button>

                  {/* Sound Toggle */}
                  <button
                    onClick={toggleSound}
                    className="p-1.5 bg-amber-950/40 hover:bg-amber-950/80 rounded-lg text-amber-200 transition-colors"
                    title={soundEnabled ? 'Mute' : 'Unmute'}
                  >
                    {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>

                  {/* Close button */}
                  <button
                    onClick={() => {
                      setIsOpen(false)
                      playPopSound(soundEnabled)
                    }}
                    className="p-1.5 bg-red-900/60 hover:bg-red-800 rounded-lg text-red-200 border border-red-950 transition-colors ml-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Water Droplet Particle Effects */}
              {waterDrops.map(drop => (
                <motion.div
                  key={drop.id}
                  initial={{ opacity: 1, y: drop.y - 40, x: drop.x }}
                  animate={{ opacity: 0, y: drop.y + 10 }}
                  transition={{ duration: 0.8, ease: 'easeIn' }}
                  className="absolute pointer-events-none z-50 text-blue-500 text-2xl font-semibold"
                >
                  💧
                </motion.div>
              ))}

              {/* Toast Messages */}
              <AnimatePresence>
                {toastMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, x: '-50%' }}
                    animate={{ opacity: 1, y: 12, x: '-50%' }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-900 border border-emerald-700 text-emerald-100 px-4 py-2.5 rounded-xl shadow-2xl text-xs font-mono flex items-center gap-2 max-w-sm text-center"
                  >
                    <span>🌱</span>
                    <span>{toastMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scrollable Soil Board Area */}
              <div className="flex-1 overflow-auto bg-[#854d0e] p-6 relative min-h-[400px]">
                {/* Horizontal Garden Rows Texture */}
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-3 opacity-30">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="h-4 w-full bg-amber-950/20 border-y border-amber-950/40" />
                  ))}
                </div>

                {/* Dots / Plots grid layout */}
                <div 
                  style={{ gridTemplateColumns: 'repeat(16, minmax(0, 1fr))' }}
                  className="relative mx-auto w-fit grid gap-0 bg-[#78350F]/20 border border-amber-950/10 rounded-xl"
                >
                  {renderGrid()}
                </div>
              </div>

              {/* Footer Panel Controls */}
              <div className="bg-amber-100 p-4 border-t-4 border-amber-950 flex flex-wrap items-center justify-between gap-4">
                
                {/* Left Controls: Watering Can */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (waterLimit <= 0) {
                        triggerToast('Watering limit reached! You can water another sprout tomorrow.')
                        return
                      }
                      setWateringMode(!wateringMode)
                      playPopSound(soundEnabled)
                    }}
                    className={`relative p-2 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      wateringMode
                        ? 'bg-blue-600 border-blue-900 text-white shadow-inner scale-95'
                        : 'bg-white border-amber-900/20 text-amber-950 hover:border-amber-800 shadow-md'
                    }`}
                  >
                    <WateringCanIcon animate={wateringMode} />
                    <div className="text-left font-mono">
                      <span className="text-[10px] block font-bold uppercase tracking-wider opacity-60">
                        Daily Water
                      </span>
                      <span className="text-sm font-bold block leading-none">
                        {waterLimit}/1 CAN
                      </span>
                    </div>
                  </button>

                  {wateringMode && (
                    <motion.div
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="bg-blue-500 text-white text-[11px] font-mono px-3 py-2 rounded-lg border border-blue-700 max-w-[200px]"
                    >
                      Click on any sprout or flower to water it!
                    </motion.div>
                  )}
                </div>

                {/* Right Controls: Info toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setShowInfo(!showInfo)
                      playPopSound(soundEnabled)
                    }}
                    className="flex items-center gap-1 bg-white hover:bg-amber-50 border-2 border-amber-900/20 px-3 py-2.5 rounded-xl font-mono text-xs font-bold transition-all shadow-md"
                  >
                    <Info className="w-4 h-4 text-orange-600" />
                    <span>MORE INFO</span>
                  </button>
                </div>
              </div>

              {/* Information Drawer Overlay */}
              <AnimatePresence>
                {showInfo && (
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    className="absolute inset-x-0 bottom-0 bg-amber-950 text-amber-100 p-6 z-50 border-t-4 border-amber-950 flex flex-col gap-4 font-mono max-h-[80%]"
                  >
                    <div className="flex items-center justify-between border-b border-amber-800 pb-2">
                      <h3 className="font-bold text-amber-300 uppercase tracking-widest text-sm flex items-center gap-2">
                        <span>🌱</span> Garden Rules & Guide
                      </h3>
                      <button
                        onClick={() => setShowInfo(false)}
                        className="text-amber-400 hover:text-white"
                      >
                        <X className="w-4.5 h-4.5" />
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 text-xs leading-relaxed">
                      <div>
                        <h4 className="font-bold text-amber-200 mb-2 border-b border-amber-900/60 pb-1">INSTRUCTIONS</h4>
                        <ol className="list-decimal list-inside space-y-2">
                          <li>
                            <span className="font-bold text-amber-300">Plant yours:</span> Click any empty dirt spot on the grid to drop a seed. Share your idea with the world!
                          </li>
                          <li>
                            <span className="font-bold text-amber-300">Water another:</span> Activate your daily watering can and click someone else&apos;s sprout to support their idea.
                          </li>
                          <li>
                            <span className="font-bold text-amber-300">Share to bloom:</span> Copy the site link and share it so others can water and bloom your sprout.
                          </li>
                        </ol>
                      </div>

                      <div>
                        <h4 className="font-bold text-amber-200 mb-2 border-b border-amber-900/60 pb-1">NOTE</h4>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Every sprout is a surprise flower; it will evolve dynamically as it accumulates water drops. You will only find out what it is once it fully blooms!</li>
                          <li>To keep the garden fair and healthy, you can only plant one sprout and water one other sprout a day.</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Seed Planter Dialog Form Overlay */}
              <AnimatePresence>
                {plantingCoords && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-amber-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                  >
                    <motion.form
                      onSubmit={handlePlantSeed}
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.95 }}
                      className="bg-white rounded-2xl border-4 border-amber-950 p-6 max-w-sm w-full font-mono text-amber-950 shadow-2xl relative"
                    >
                      <button
                        type="button"
                        onClick={() => setPlantingCoords(null)}
                        className="absolute top-4 right-4 text-amber-800 hover:text-amber-950"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl">🌱</span>
                        <h3 className="font-bold uppercase tracking-wider text-sm">
                          Plant your Seed
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-1">
                            Your Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Devshree"
                            value={planterName}
                            onChange={(e) => setPlanterName(e.target.value)}
                            className="w-full border-2 border-amber-900/20 focus:border-amber-900 p-2 rounded-lg text-sm bg-amber-50 outline-none text-amber-950 font-sans"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-1">
                            Your Idea (Sprout Note)
                          </label>
                          <textarea
                            required
                            placeholder="e.g. Build an autonomous garden interface where ideas grow into flowers..."
                            value={planterNote}
                            onChange={(e) => setPlanterNote(e.target.value)}
                            rows={3}
                            className="w-full border-2 border-amber-900/20 focus:border-amber-900 p-2 rounded-lg text-sm bg-amber-50 outline-none text-amber-950 font-sans resize-none"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2.5 mt-5">
                        <button
                          type="button"
                          onClick={() => setPlantingCoords(null)}
                          className="flex-1 bg-amber-100 hover:bg-amber-200 border-2 border-amber-900/20 px-3 py-2 rounded-lg text-xs font-bold transition-colors"
                        >
                          CANCEL
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg text-xs font-bold transition-colors"
                        >
                          PLANT MY SEED
                        </button>
                      </div>
                    </motion.form>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
