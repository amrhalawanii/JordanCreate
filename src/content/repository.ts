/**
 * Content repository — the only thing components are allowed to import
 * content through. Selects the static or api adapter based on
 * CONTENT_SOURCE so swapping in a real backend later is a one-line change
 * here, never a component edit.
 */
import * as staticAdapter from "./adapters/static";
import * as apiAdapter from "./adapters/api";

const adapter = process.env.CONTENT_SOURCE === "api" ? apiAdapter : staticAdapter;

export const getDesktopNavItems = adapter.getDesktopNavItems;
export const getMobileNavItems = adapter.getMobileNavItems;
export const getFooterNavItems = adapter.getFooterNavItems;
export const getSiteSettings = adapter.getSiteSettings;
export const getHomeHero = adapter.getHomeHero;
