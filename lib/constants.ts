export const EVENT_NAME = "JEC CSE '26 Farewell";
export const EVENT_SUBTITLE =
  "Crafted with respect by your juniors, to celebrate your journey.";
export const EVENT_DATE_LABEL = "2nd March";
export const EVENT_VENUE_LABEL = "To Be Revealed Soon";
export const CONTRIBUTION_AMOUNT = 1000;

export function getNextFarewellDate(reference = new Date()) {
  const currentYear = reference.getFullYear();
  const candidate = new Date(`${currentYear}-03-02T18:00:00+05:30`);

  if (candidate.getTime() > reference.getTime()) {
    return candidate;
  }

  return new Date(`${currentYear + 1}-03-02T18:00:00+05:30`);
}
