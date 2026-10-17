import React from 'react';
import type { LineupSpeaker } from '@/data/speakerArchive';
import { cn } from '@/lib/utils';

const speakerInitials = (name: string) => {
  const parts = name
    .replace(/\./g, '')
    .split(/\s+/)
    .filter(Boolean);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
};

export const SpeakerFace = ({
  speaker,
  className,
}: {
  speaker: LineupSpeaker;
  className?: string;
}) => {
  if (speaker.photo) {
    return (
      <img
        src={speaker.photo}
        alt=""
        loading="lazy"
        decoding="async"
        className={cn('avatar-photo h-7 w-7 shrink-0', className)}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-[0.625rem] font-semibold tracking-wide text-foreground',
        className,
      )}
    >
      {speakerInitials(speaker.name)}
    </span>
  );
};

const SpeakerChip = ({ speaker, detailed }: { speaker: LineupSpeaker; detailed?: boolean }) => {
  const body = (
    <>
      <SpeakerFace speaker={speaker} />
      <span className={cn('min-w-0', detailed && 'max-w-[18rem]')}>
        <span className="block text-sm font-medium leading-tight">{speaker.name}</span>
        {detailed && speaker.role && (
          <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{speaker.role}</span>
        )}
      </span>
    </>
  );

  const className = cn(
    'inline-flex gap-2 rounded-full',
    detailed ? 'items-start' : 'items-center',
    speaker.linkedin && 'transition-colors hover:text-accent',
  );

  if (!speaker.linkedin) {
    return <span className={className}>{body}</span>;
  }

  return (
    <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" className={className}>
      {body}
    </a>
  );
};

const SpeakerRow = ({
  speakers,
  detailed = false,
}: {
  speakers: LineupSpeaker[];
  detailed?: boolean;
}) => (
  <ul className="flex flex-wrap gap-x-4 gap-y-2.5">
    {speakers.map((speaker) => (
      <li key={speaker.id}>
        <SpeakerChip speaker={speaker} detailed={detailed} />
      </li>
    ))}
  </ul>
);

export default SpeakerRow;
