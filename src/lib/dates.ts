/**
 * Date helpers for event handling.
 * Events come in as Date objects (Astro coerces from YAML).
 * We use UTC methods so YYYY-MM-DD dates render as written,
 * regardless of the viewer's timezone.
 */

export interface DateParts {
  month: string;
  monthLong: string;
  day: number;
  year: number;
  weekday: string;
  weekdayLong: string;
  full: string;
}

export function formatDateParts(date: Date): DateParts {
  const opts = (o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en-US', { ...o, timeZone: 'UTC' }).format(date);

  return {
    month:       opts({ month: 'short' }).toUpperCase(),
    monthLong:   opts({ month: 'long'  }).toUpperCase(),
    day:         date.getUTCDate(),
    year:        date.getUTCFullYear(),
    weekday:     opts({ weekday: 'short' }).toUpperCase(),
    weekdayLong: opts({ weekday: 'long'  }).toUpperCase(),
    full:        opts({ weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
  };
}

export function isUpcoming(date: Date): boolean {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return date.getTime() >= today.getTime();
}

export function sortByDateAsc(
  a: { data: { date: Date } },
  b: { data: { date: Date } }
): number {
  return a.data.date.getTime() - b.data.date.getTime();
}

export function sortByDateDesc(
  a: { data: { date: Date } },
  b: { data: { date: Date } }
): number {
  return b.data.date.getTime() - a.data.date.getTime();
}
