// Car catalog for the 3D showcase.
//   paint.by = 'material' → recolor meshes whose MATERIAL name matches (clean models)
//   paint.by = 'mesh'     → recolor meshes whose MESH name matches (BMW shares one
//                            material across body + tyres/interior, so we target panels)
export const cars = [
  {
    id: 'audi-rs7',
    name: 'Audi RS7',
    short: 'RS7',
    file: '/car-model/audi-rs7.glb',
    paint: { by: 'material', match: 'paint' },
  },
  {
    id: 'porsche-911',
    name: 'Porsche 911 GT3',
    short: '911',
    file: '/car-model/porsche-911.glb',
    paint: { by: 'material', match: 'paint' },
  },
  {
    id: 'bmw-m5',
    name: 'BMW M5',
    short: 'M5',
    file: '/car-model/bmw-m5.glb',
    paint: { by: 'material', match: 'paint' },
  },
  {
    id: 'mercedes-s63',
    name: 'Mercedes S63',
    short: 'S63',
    file: '/car-model/mercedes-s63.glb',
    paint: { by: 'material', match: 'paint' },
  },

]

export const defaultCar = cars[0]
