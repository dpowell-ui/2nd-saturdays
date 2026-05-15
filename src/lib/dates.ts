/**
 * Date helpers for event handling.
 * Events come in as YYYY-MM-DD strings; we parse with a noon offset
 * so timezone shifts don't roll dates backward.
 */

export function parseEventDate(iso: string): Date {
  return new Date(iso + 'T12:00:00');
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

export function formatDateParts(iso: string): DateParts {
  const d = parseEventDate(iso);
  return {
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    monthLong: d.toLocaleDateString('en-US', { month: 'long' }).toUpperCase(),
    day: d.getDate(),
    year: d.getFullYear(),
    weekday: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
    weekdayLong: d.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase(),
    full: d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
  };
}

export function isUpcoming(iso: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return parseEventDate(iso) >= today;
}

export function sortByDateAsc(a: { data: { date: string } }, b: { data: { date: string } }): number {
  return parseEventDate(a.data.date).getTime() - parseEventDate(b.data.date).getTime();
}

export function sortByDateDesc(a: { data: { date: string } }, b: { data: { date: string } }): number {
  return parseEventDate(b.data.date).getTime() - parseEventDate(a.data.date).getTime();
}
