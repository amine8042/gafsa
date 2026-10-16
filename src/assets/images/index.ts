import heroImg from './hero_jugurtha_palace_1792168615686.jpg';
import poolImg from './pool_jugurtha_palace_1792168616954.jpg';
import suiteImg from './suite_jugurtha_palace_1792168617490.jpg';
import diningImg from './dining_jugurtha_palace_1792168619051.jpg';
import oasisImg from './gafsa_oasis_jugurtha_1792168619641.jpg';

export const ASSET_IMAGES = {
  hero: heroImg,
  pool: poolImg,
  suite: suiteImg,
  dining: diningImg,
  oasis: oasisImg,
};

/**
 * Ensures any path (including legacy localStorage string paths like '/src/assets/images/...')
 * resolves to the valid bundled Vite asset URL.
 */
export function resolveHotelImage(path?: string): string {
  if (!path) return heroImg;
  const p = path.toLowerCase();
  if (p.includes('hero') || p.includes('1792168615686')) return heroImg;
  if (p.includes('pool') || p.includes('1792168616954')) return poolImg;
  if (p.includes('suite') || p.includes('1792168617490')) return suiteImg;
  if (p.includes('dining') || p.includes('1792168619051')) return diningImg;
  if (p.includes('oasis') || p.includes('1792168619641')) return oasisImg;
  return path;
}
