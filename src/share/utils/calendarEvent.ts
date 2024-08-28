let eventGuid = 0
const todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
const lengthId = 8;

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
    resourceId: "invoice1"
  }
]

function getRandom(length: number): number {

  return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));

}
export function createEventId() {
  return `${getRandom(lengthId)}${eventGuid++}`
}

export function getFirstOfWeek(date: Date) {
  const today = date.getDate();
  const currentDay = date.getDay();
  const newDate = date.setDate(today - currentDay + 6);
  return new Date(newDate);
}

export function getLastOfWeek(date: Date) {
  const today = date.getDate();
  const currentDay = date.getDay();
  const newDate = date.setDate(today - (currentDay || 6));
  return new Date(newDate);
}
