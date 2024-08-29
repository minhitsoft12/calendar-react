import {faker} from "@faker-js/faker";

let eventGuid = 0
const lengthId = 8;

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

export const initData = () => {
  const INITIAL_EVENTS = []
  const INITIAL_EXTERNAL_EVENTS = []

  for (let i = 0; i < 10; i++) {
    const isFuture = faker.datatype.boolean();
    INITIAL_EXTERNAL_EVENTS.push({
      id: createEventId(),
      resourceId: `invoice${faker.number.int({min: 1, max: 2})}`,
      title: faker.company.catchPhrase(),
      start: isFuture ? faker.date.soon({days: 15}).toISOString() : faker.date.recent({days: 15}).toISOString(),
      end: isFuture ? faker.date.soon({days: 15}).toISOString() : faker.date.recent({days: 15}).toISOString(),
      backgroundColor: faker.color.rgb({css: true}),
      color: faker.color.rgb({css: true})
    });
    INITIAL_EVENTS.push({
      id: createEventId(),
      title: faker.company.catchPhrase(),
      start: isFuture ? faker.date.soon({days: 15}).toISOString() : faker.date.recent({days: 15}).toISOString(),
      end: isFuture ? faker.date.soon({days: 15}).toISOString() : faker.date.recent({days: 15}).toISOString(),
      resourceId: `invoice${faker.number.int({min: 1, max: 2})}`,
      backgroundColor: faker.color.rgb({css: true}),
      color: faker.color.rgb({css: true})
    });
  }

  return {events: INITIAL_EVENTS, externalEvents: INITIAL_EXTERNAL_EVENTS}
}
