import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const pkg = require('lucide-react/package.json')
console.log('lucide-react version:', pkg.version)

const lucide = await import('lucide-react')
const candidates = [
  'Shield', 'ShieldCheck', 'Palette', 'SprayCan', 'Gem', 'Sparkles', 'Droplets', 'Droplet',
  'SunDim', 'Sun', 'Moon', 'BadgeCheck', 'Award', 'Trophy', 'Thermometer', 'ThermometerSun',
  'Layers', 'Layers3', 'Scissors', 'PenTool', 'Ruler', 'Phone', 'Mail', 'MapPin', 'Map', 'Clock',
  'Instagram', 'Facebook', 'Twitter', 'Youtube', 'Music', 'Music2', 'Music4',
  'CheckCircle2', 'CircleCheck', 'CircleCheckBig', 'Check', 'Car', 'FlaskConical', 'Microscope',
  'Wand2', 'Wand', 'WandSparkles', 'FileCheck', 'FileCheck2', 'ScrollText', 'Hexagon',
  'ArrowRight', 'ChevronDown', 'Sparkle',
]
const exists = candidates.filter((n) => typeof lucide[n] !== 'undefined')
const missing = candidates.filter((n) => typeof lucide[n] === 'undefined')
console.log('\nEXISTS:', exists.join(', '))
console.log('\nMISSING:', missing.join(', '))
console.log('\ntotal exported names:', Object.keys(lucide).length)
