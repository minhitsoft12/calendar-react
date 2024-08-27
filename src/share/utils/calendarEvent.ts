import { v4 as uuidv4 } from "uuid"

let eventGuid = 0
const todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
    resourceId: "invoice1"
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
    resourceId: "invoice1"
  }
]

export function createEventId() {
  return `${uuidv4()}${eventGuid++}`
}
