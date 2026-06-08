// src/data/films.js
//  Color TPU PPF catalog. Solid colours are offered in Gloss / Matte /
// Satin finishes; metallic & colour-shift films get their own categories.
// Each film's `finish` drives the 3D material (see CarViewer FINISH map).

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// Base solid colours [displayName, hex, catalog code]
const solids = [
  ['White', '#eef0ec', 'TPU-6024'],
  ['Sunflower Yellow', '#f2a40f', 'TPU-6023'],
  ['Purple', '#28306e', 'TPU-6022'],
  ['Khaki Milano', '#c3b48d', 'TPU-6021'],
  ['Desert Yellow', '#9b7d46', 'TPU-6020'],
  ['Rouge Pink', '#e6b3c2', 'TPU-6019'],
  ['Miami Blue', '#1aa7d6', 'TPU-6006'],
  ['Towering Green', '#a6d8c4', 'TPU-6005'],
  ['Viper Green', '#5cb82a', 'TPU-6004'],
  ['Hell Green', '#1d525a', 'TPU-6003'],
  ['Khaki Green', '#97a78d', 'TPU-6002'],
  ['Combat Green', '#6f6535', 'TPU-6001'],
]

const finishWord = { gloss: 'Gloss', matte: 'Matte', satin: 'Satin' }
const finishDesc = {
  gloss: 'Deep, mirror-like high-gloss finish.',
  matte: 'Flat, non-reflective matte finish.',
  satin: 'Soft satin sheen — between matte and gloss.',
}

const buildFinish = (finish) =>
  solids.map(([base, hex, code]) => {
    const name = `${finishWord[finish]} ${base}`
    return {
      id: slug(name),
      name,
      hex,
      brand: '',
      code,
      finish,
      description: `${base} · ${finishDesc[finish]}`,
    }
  })

// Metallic / pearl films (TPU-70xx series)
const metallicSrc = [
  ['Black Red', '#2c0e14', 'TPU-7024'],
  ['Liquid Metal Red', '#7e1018', 'TPU-7016'],
  ['Berry Purple', '#7d2362', 'TPU-7023'],
  ['Silver Purple', '#a7a8c6', 'TPU-7022'],
  ['Shark Blue', '#93a7b6', 'TPU-7012'],
  ['Turquoise', '#9cc0b2', 'TPU-7018'],
  ['Frozen Berry', '#8f8a90', 'TPU-7020'],
  ['Champagne Gold', '#c6b39a', 'TPU-7015'],
  ['Metallic Black', '#1b1b1e', 'TPU-7013'],
  ['Royal Blue', '#1c2f93', 'TPU-7011'],
  ['Tanzanite Blue', '#22314e', 'TPU-7010'],
]

// Colour-shift / holographic films
const colorshiftSrc = [
  ['Super Purple', '#382a4a', 'TPU-7021'],
  ['Starry Phantom', '#5b4350', 'TPU-7019'],
  ['Fantasy Grey Red', '#c6c0cb', 'TPU-7017'],
  ['Holographic Black', '#1a1c22', 'TPU-7014'],
]

const mk = (finish, desc) => ([name, hex, code]) => ({
  id: slug(name),
  name,
  hex,
  brand: '',
  code,
  finish,
  description: `${code} · ${desc}`,
})

export const filmCategories = [
  { id: 'gloss', label: 'Gloss', films: buildFinish('gloss') },
  { id: 'matte', label: 'Matte', films: buildFinish('matte') },
  { id: 'satin', label: 'Satin', films: buildFinish('satin') },
  { id: 'metallic', label: 'Metallic', films: metallicSrc.map(mk('metallic', 'Metallic pearl finish.')) },
  { id: 'colorshift', label: 'Color Shift', films: colorshiftSrc.map(mk('colorshift', 'Iridescent colour-shift finish.')) },
]

export const defaultFilm = filmCategories[0].films[0]
