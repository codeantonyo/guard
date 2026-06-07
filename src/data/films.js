// src/data/films.js
// ─── Film catalog. Each film gets a `finish` field derived from its category,
//     which the 3D viewer uses to drive material properties (gloss/matte/etc.). ───

const rawCategories = [
  {
    id: 'gloss',
    label: 'Gloss',
    films: [
      { id: 'gloss-black', name: 'Gloss Black', hex: '#0a0a0a', brand: 'XPEL', description: 'Deep, mirror-like black finish. Maximum gloss depth.' },
      { id: 'gloss-white', name: 'Gloss White', hex: '#F5F5F0', brand: 'XPEL', description: 'Pure white with a crystal-clear gloss finish.' },
      { id: 'gloss-silver', name: 'Gloss Silver', hex: '#C0C0C0', brand: 'Hexis', description: 'Classic metallic silver. Timeless automotive appeal.' },
      { id: 'gloss-midnight-blue', name: 'Gloss Midnight Blue', hex: '#1a2040', brand: 'Avery', description: 'Deep midnight blue with high gloss shine.' },
      { id: 'gloss-racing-red', name: 'Gloss Racing Red', hex: '#CC1100', brand: 'KPMF', description: 'Vivid motorsport-inspired red.' },
      { id: 'gloss-forest-green', name: 'Gloss Forest Green', hex: '#1a4020', brand: 'Oracal', description: 'Deep forest green with a rich gloss finish.' },
      { id: 'gloss-pearl-white', name: 'Gloss Pearl White', hex: '#FFFFF0', brand: 'Avery', description: 'White with a subtle iridescent pearl effect.' },
      { id: 'gloss-champagne', name: 'Gloss Champagne', hex: '#C8A870', brand: 'Hexis', description: 'Warm champagne gold with glossy depth.' },
    ],
  },
  {
    id: 'matte',
    label: 'Matte',
    films: [
      { id: 'matte-black', name: 'Matte Black', hex: '#1a1a1a', brand: 'XPEL', description: 'The iconic stealth look. Non-reflective dead black.' },
      { id: 'matte-white', name: 'Matte White', hex: '#E8E8E4', brand: 'Avery', description: 'Clean matte white. Minimal and bold.' },
      { id: 'matte-gray', name: 'Matte Gray', hex: '#808080', brand: 'Oracal', description: 'Neutral matte gray for a subtle look.' },
      { id: 'matte-olive', name: 'Matte Olive', hex: '#4a5020', brand: 'KPMF', description: 'Military-inspired olive green. Tactical aesthetic.' },
      { id: 'matte-navy', name: 'Matte Navy', hex: '#1a2035', brand: 'Hexis', description: 'Dark navy matte. Sophisticated and understated.' },
      { id: 'matte-burgundy', name: 'Matte Burgundy', hex: '#5a1020', brand: 'Avery', description: 'Rich burgundy with a velvety matte surface.' },
      { id: 'matte-beige', name: 'Matte Sand', hex: '#C8B090', brand: 'Oracal', description: 'Warm sand tone. Desert aesthetic.' },
      { id: 'matte-bronze', name: 'Matte Bronze', hex: '#8B5E3C', brand: 'KPMF', description: 'Earthy bronze matte. Unique and refined.' },
    ],
  },
  {
    id: 'satin',
    label: 'Satin',
    films: [
      { id: 'satin-black', name: 'Satin Black', hex: '#1c1c1c', brand: 'XPEL', description: 'Between matte and gloss. The perfect hybrid finish.' },
      { id: 'satin-white', name: 'Satin White', hex: '#ECECEC', brand: 'Avery', description: 'Soft white with a silky satin sheen.' },
      { id: 'satin-gray', name: 'Satin Dark Gray', hex: '#505050', brand: 'Hexis', description: 'Sophisticated dark gray satin finish.' },
      { id: 'satin-blue', name: 'Satin Steel Blue', hex: '#2a4060', brand: 'KPMF', description: 'Deep steel blue with a silky surface.' },
      { id: 'satin-rose-gold', name: 'Satin Rose Gold', hex: '#C08070', brand: 'Avery', description: 'Luxurious rose gold. Modern and elegant.' },
      { id: 'satin-emerald', name: 'Satin Emerald', hex: '#1a6040', brand: 'Oracal', description: 'Rich emerald green with satin depth.' },
    ],
  },
  {
    id: 'chrome',
    label: 'Chrome',
    films: [
      { id: 'chrome-silver', name: 'Chrome Silver', hex: '#D8D8D8', brand: 'Avery', description: 'Mirror-like chrome silver. Maximum attention.' },
      { id: 'chrome-gold', name: 'Chrome Gold', hex: '#D4A830', brand: 'KPMF', description: 'Brilliant gold chrome. Royalty on wheels.' },
      { id: 'chrome-rose', name: 'Chrome Rose', hex: '#D48080', brand: 'Hexis', description: 'Shimmering rose chrome. Glamorous finish.' },
      { id: 'chrome-black', name: 'Chrome Black', hex: '#303030', brand: 'Avery', description: 'Dark chrome mirror finish. Stealth luxury.' },
      { id: 'chrome-blue', name: 'Chrome Blue', hex: '#4060C0', brand: 'KPMF', description: 'Electric blue chrome. Futuristic appeal.' },
    ],
  },
  {
    id: 'colorshift',
    label: 'Color Shift',
    films: [
      { id: 'cs-midnight', name: 'Midnight Galaxy', hex: '#301850', brand: 'KPMF', description: 'Shifts from deep purple to electric blue. Cosmic depth.' },
      { id: 'cs-volcanic', name: 'Volcanic Ember', hex: '#C04010', brand: 'Avery', description: 'Shifts from volcanic orange to deep red.' },
      { id: 'cs-ocean', name: 'Ocean Drift', hex: '#108060', brand: 'Hexis', description: 'Shifts from teal to forest green. Like light on water.' },
      { id: 'cs-galaxy', name: 'Galaxy Dusk', hex: '#8040A0', brand: 'KPMF', description: 'Shifts from magenta pink to deep purple.' },
    ],
  },
]

// Attach the finish (= category id) to every film so components can read it directly.
export const filmCategories = rawCategories.map((cat) => ({
  ...cat,
  films: cat.films.map((f) => ({ ...f, finish: cat.id })),
}))

export const defaultFilm = filmCategories[0].films[0]
