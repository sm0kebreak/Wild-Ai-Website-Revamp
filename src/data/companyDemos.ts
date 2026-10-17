import { meetupTitle } from '@/lib/meetupSchedule';
import { pastEvents, type LineupSpeaker } from '@/data/speakerArchive';

export type CompanyDemo = {
  speakerName: string;
  eventTitle: string;
  displayDate: string;
  date: string;
  path: string;
};

const keyOf = (name: string) => name.trim().toLowerCase();

/** Companies named as that night's affiliation. A blank role falls back to the speaker's company list. */
const creditedNames = (speaker: LineupSpeaker) => {
  if (speaker.role) return [speaker.role];
  return speaker.companies;
};

const demos = new Map<string, CompanyDemo[]>();

for (const event of pastEvents) {
  for (const speaker of event.speakers) {
    for (const name of creditedNames(speaker)) {
      const key = keyOf(name);
      const list = demos.get(key) ?? [];
      if (list.some((item) => item.speakerName === speaker.name && item.date === event.date)) continue;
      list.push({
        speakerName: speaker.name,
        eventTitle: meetupTitle(event.date),
        displayDate: event.displayDate,
        date: event.date,
        path: `/events/archive-${event.date}`,
      });
      demos.set(key, list);
    }
  }
}

/** Nights a company was the stated affiliation, newest first. */
export const demosForCompany = (name: string) => demos.get(keyOf(name)) ?? [];
