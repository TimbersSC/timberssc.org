/**
 * Normalize a value between two bounds
 *
 * @param  {number} min Minimum boundary
 * @param  {number} max Maximum boundary
 * @param  {number} x   Value to normalize
 * @return {number}     Normalized value
 */
export function normalize(min: number, max: number, x: number): number {
  return (x - min) / (max - min);
}
