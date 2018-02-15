export const routeLayers = [
  'arteries',
  'freeways',
  'neighborhoods',
  // 'streets'
];

export const routeLayerUrls = routeLayers.map(layer => `/assets/google-map-layers/${layer}.json`);

export const routes = ['6', 'N'];

export const routeColors = {
  6: 'yellow',
  N: 'blue',
};
