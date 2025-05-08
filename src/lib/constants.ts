export const colorOptions = [
  'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal',
  'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'
] as const;

export const intensities = ['300', '400', '500', '600', '700'] as const;

export const directions = ['to-r', 'to-l', 'to-t', 'to-b', 'to-tr', 'to-tl', 'to-br', 'to-bl'] as const;

export type ColorOption = typeof colorOptions[number];
export type Intensity = typeof intensities[number];
export type Direction = typeof directions[number];