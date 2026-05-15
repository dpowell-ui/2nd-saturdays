/**
 * Date helpers. Defensively accepts Date, ISO string, or YYYY-MM-DD
 * and avoids "Invalid Date" failures across SSR boundaries.
 */

function asValidDate(input: unknown): Date | null {
  let d: Date | null = null;

  if (input instanceof Date) {
    d = input;
  } else if (typeof input === 'string') {
    // YYYY-MM-DD -> local noon (avoids timezone roll-back)
    const m = input.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) {
      d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 12);
    } else {
      d = new Date(input);
    }
  } else if (typeof input === 'number') {
    d = new Date(input);
  }

  return d && !isNaN(d.getTime()) ? d : null;
}

export interface DateParts {
  month: string;
  monthLong: string;
  day: number;
  year: number;
  weekday: string;
  weekdayLong: string;
  full: string;
}

export function formatDateParts(input: unknown): DateParts {
  const d = asValidDate(input);
  if (!d) {
    return { month: '—', monthLong: '—', day: 0, year: 0, weekday: '—', weekdayLong: '—', full: '—' };
  }
  return {
    month:       d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    monthLong:   d.toLocaleDateString('en-US', { month: 'long' }).toUpperCase(),
    day:         d.getDate(),
    year:        d.getFullYear(),
    weekday:     d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
    weekdayLong: d.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase(),
    full:        d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
  };
}

export function isUpcoming(input: unknown): boolean {
  const d = asValidDate(input);
  if (!d) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d.getTime() >= today.getTime();
}

export function sortByDateAsc(
  a: { data: { date: unknown } },
  b: { data: { date: unknown } }
): number {
  const dA = asValidDate(a.data.date);
  const dB = asValidDate(b.data.date);
  return (dA?.getTime() ?? 0) - (dB?.getTime() ?? 0);
}

export function sortByDateDesc(
  a: { data: { date: unknown } },
  b: { data: { date: unknown } }
): number {
  const dA = asValidDate(a.data.date);
  const dB = asValidDate(b.data.date);
  return (dB?.getTime() ?? 0) - (dA?.getTime() ?? 0);
}
