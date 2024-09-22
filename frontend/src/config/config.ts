import {
  IconCalendarEvent,
  IconFolder,
  IconHome,
  IconLayout,
} from "@tabler/icons-react";
import { link } from "fs";

// Site metadata
export const SITE_NAME = "Supabase Mantine Starter";
export const SITE_DESCRIPTION = "A starter template using Supabase and Mantine";
export const SITE_URL = "https://yoursitedomain.com";

// SEO
export const DEFAULT_TITLE_TEMPLATE = "%s | Your Site Name";
export const DEFAULT_DESCRIPTION = "Default description for SEO";
export const DEFAULT_KEYWORDS = ["keyword1", "keyword2", "keyword3"];

// Theme
export const PRIMARY_COLOR = "#2D80BE"; // Your primary color
export const SECONDARY_COLOR = "#17146B"; // Your secondary color
export const ACCENT_COLOR = "#4C3BCF"; // Your accent color

export const SUCCESS_COLOR = "#4CAF50"; // Your success color
export const FAILURE_COLOR = "#F44336"; // Your failure color

// Dashboard Navigation
export const DASHBOARD_NAV_ITEMS = [
  { link: "/dashboard", label: "Home", key: "home", icon: IconHome },
  { link: "", label: "Projects", key: "projects", icon: IconLayout },
  { link: "", label: "Schedule", key: "schedule", icon: IconCalendarEvent },
  { link: "", label: "Files", key: "files", icon: IconFolder },
];
