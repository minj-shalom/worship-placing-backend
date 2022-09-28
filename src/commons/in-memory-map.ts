import { WorshipPlace } from "./place";

export const InMemoryMap = new Map<string, WorshipPlace>();
export const DisplayPlaceId = new Map<string, string>();

export const koreaTimezone = 1000 * 60 * 60 * 9;
export const createdAt = new Date(Date.now() + koreaTimezone).toISOString();
