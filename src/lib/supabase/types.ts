/**
 * Minimal public-table typings for the marketing site.
 * Matches JordanCreate-Admin `types/database.ts` for speakers + agenda only.
 * Never import Admin code into this package.
 */

export type SpeakerRow = {
  handle: string;
  tagline: string | null;
  category: string | null;
  followers_range: string | null;
  known_for: string | null;
  availability: string | null;
  bio_status: "confirmed" | "missing" | "unconfirmed";
  photo_url: string | null;
  tags: string[] | null;
  archived: boolean;
  updated_at: string;
};

export type SpeakerSocialLinkRow = {
  id: number;
  speaker_handle: string;
  platform: string;
  handle: string;
  url: string;
  sort_order: number;
};

export type AgendaSessionRow = {
  session_id: string;
  start_time: string;
  end_time: string;
  session_type: string;
  title: string;
  description: string | null;
  speaker_handles: string[];
  moderator_handle: string | null;
  duration_minutes: number;
  interest_tag_ids: string[] | null;
  location_within_venue: string | null;
  status: "draft" | "confirmed";
  flag_notes: string | null;
  sort_order: number;
  archived: boolean;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      speakers: { Row: SpeakerRow };
      speaker_social_links: { Row: SpeakerSocialLinkRow };
      agenda_sessions: { Row: AgendaSessionRow };
    };
  };
};
