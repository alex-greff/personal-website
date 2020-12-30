import * as Constants from "@/constants";
import ScrollReveal, { sync } from "scrollreveal";
import Color from "color";

export enum Breakpoint {
  phone = 0,
  tabPort = 1,
  tabLand = 2,
  normal = 3,
  bigDesktop = 4,
}

/**
 * Gets the current breakpoint for the given screen width.
 *
 * @param width The screen width.
 */
export const getBreakpoint = (width: number): Breakpoint => {
  if (width <= 600) {
    return Breakpoint.phone;
  } else if (width <= 900) {
    return Breakpoint.tabPort;
  } else if (width <= 1200) {
    return Breakpoint.tabLand;
  } else if (width <= 1800) {
    return Breakpoint.normal;
  } else {
    return Breakpoint.bigDesktop;
  }
};

/* Converts a location hash to its corresponding section id tag. */
export const hashToSectionId = (hash: string) => {
  hash = hash.replace("#", "").replace("/", "");
  return `${Constants.SECTION_PREFIX}_${hash}`;
};

export const srConfig = (delay = 200, viewFactor = 0.25) => ({
  origin: "bottom",
  distance: "20px",
  duration: 500,
  delay,
  rotate: { x: 0, y: 0, z: 0 },
  opacity: 0,
  scale: 1,
  easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  mobile: true,
  reset: false,
  useDelay: "always",
  viewFactor,
  viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
});

export const isSSR = typeof window === "undefined";
// export const sr = (typeof window === 'undefined') ? null : ScrollReveal();

export enum PageType {
  ROOT,
  PROJECT,
}

export const getPageType = (pathname: string) => {
  const projectPageRegex = /^\/projects\/(.+)\/?$/g;

  if (pathname === "/") return PageType.ROOT;
  else if (projectPageRegex.test(pathname)) return PageType.PROJECT;

  throw "Should not reach here";
};

interface SalConfig {
  duration?: string;
  delay?: string;
  easing?: string;
}

export const salConfig = ({ duration, delay, easing }: SalConfig) => {
  let style: {
    "--sal-duration"?: string;
    "--sal-delay"?: string;
    "--sal-easing"?: string;
  } = {};
  if (duration) style = { ...style, "--sal-duration": duration };
  if (delay) style = { ...style, "--sal-delay": delay };
  if (easing) style = { ...style, "--sal-easing": easing };
  return style;
};

/**
 * Returns a standardized version of the given color.
 * Ex: "rgb(30, 56, 60)" -> "30, 56, 60"
 *
 * @param color The color.
 */
export function standardizeColor(color: string) {
  let aColorRgb = Color(color).rgb().array();
  aColorRgb = aColorRgb.slice(0, 3); // Remove alpha value, if it exists
  const sColorString = aColorRgb.join(", ");

  return sColorString;
}

/**
 * Sorts an array by start and end date fields, with the most recent
 * items first.
 * Note: the fields at the start and end date keys must be Date Objects.
 *
 * @param items The array to sort
 * @param nameKey The key of the name item
 * @param startDateKey The key of the start date field
 * @param endDateKey The key of the end date field
 * @param sortBy Sort by either start or end dates first
 */
export const dateSortArray = (
  items: any[],
  nameKey = "title",
  startDateKey = "startDate",
  endDateKey = "endDate",
  sortBy: "start-dates" | "end-dates" = "start-dates"
) => {
  // Make a copy
  let sortedItems = [...items];

  // Sort the items by date and sub-sorted by name, when needed
  sortedItems.sort((itemA, itemB) => {
    const nameA = itemA[nameKey] as string;
    const startDateA = itemA[startDateKey] as Date | null;
    const endDateA = itemA[endDateKey] as Date | null;

    const nameB = itemB[nameKey] as string;
    const startDateB = itemB[startDateKey] as Date | null;
    const endDateB = itemB[endDateKey] as Date | null;

    // Case 1: both start dates are defined

    if (sortBy === "start-dates") {
      // Case 1: both start dates are defined
      if (startDateA && startDateB) {
        // Case 1a: start dates are the same
        if (startDateA.getTime() === startDateB.getTime()) {
          // Sort by name
          return `${nameA}`.localeCompare(nameB);
        }
        // Case 1b: start dates are different
        else {
          // Sort by start date
          return (startDateB as any) - (startDateA as any);
        }
      }
      // Case 2: A's start date is not defined but B's is
      else if (!startDateA && startDateB) {
        // Sort B in front of A
        return 1;
      }
      // Case 3: B's start date is not defined but A's is
      else if (startDateA && !startDateB) {
        // Sort A in front of B
        return -1;
      }
      // Case 4: both start dates are not defined but both their end dates are
      else if (endDateA && endDateB) {
        // Case 4a: end dates are the same
        if (endDateA.getTime() === endDateB.getTime()) {
          // Sort by name
          return `${nameA}`.localeCompare(nameB);
        }
        // Case 4b: end dates are different
        else {
          // Sort by end date
          return (endDateB as any) - (endDateA as any);
        }
      }
      // Case 5: both start dates are not defined and A's end date is not defined but B's is
      else if (!endDateA && endDateB) {
        // Sort B in front of A
        return 1;
      }
      // Case 6: both start dates are not defined and B's end date is not defined but A's is
      else if (endDateA && !endDateB) {
        // Sort A in front of B
        return -1;
      }
      // Case 7: both start and end dates are not defined
      else {
        // Sort by name
        return `${nameA}`.localeCompare(nameB);
      }
    } else { // end-dates
      if (endDateA && endDateB) {
        // Case 1a: end dates are the same
        if (endDateA.getTime() === endDateB.getTime()) {
          // Sort by name
          return `${nameA}`.localeCompare(nameB);
        }
        // Case 1b: end dates are different
        else {
          // Sort by end date
          return (endDateB as any) - (endDateA as any);
        }
      }
      // Case 2: A's end date is not defined but B's is
      else if (!endDateA && endDateB) {
        // Sort A in front of B
        return -1;
      }
      // Case 3: B's end date is not defined but A's is
      else if (endDateA && !endDateB) {
        // Sort B in front of A
        return 1;
      }
      // Case 4: both end dates are not defined but both their start dates are
      else if (startDateA && startDateB) {
        // Case 4a: start dates are the same
        if (startDateA.getTime() === startDateB.getTime()) {
          // Sort by name
          return `${nameA}`.localeCompare(nameB);
        }
        // Case 4b: start dates are different
        else {
          // Sort by start date
          return (startDateB as any) - (startDateA as any);
        }
      }
      // Case 5: both end dates are not defined and A's start date is not defined but B's is
      else if (!startDateA && startDateB) {
        // Sort A in front of B
        return -1;
      }
      // Case 6: both end dates are not defined and B's start date is not defined but A's is
      else if (startDateA && !startDateB) {
        // Sort B in front of A
        return 1;
      }
      // Case 7: both start and end dates are not defined
      else {
        // Sort by name
        return `${nameA}`.localeCompare(nameB);
      }
    }
  });

  // Return the sorted items list
  return sortedItems;
};

/**
 * Returns a formatted version of the given date.
 *
 * @param date The date object.
 * @param showDay Show the day.
 */
export function getFormattedDate(date: Date, showDay = false) {
  const month_names = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const month_index = date.getMonth();
  const month = month_names[month_index];
  const year = date.getFullYear();

  if (!showDay) {
    return `${month} ${year}`;
  }

  return `${month} ${day}, ${year}`;
}

/**
 * Returns a formatted version of the given start date.
 *
 * @param startDate The start date.
 * @param showDay Show the day.
 */
export function getFormattedStartDate(startDate: Date | null, showDay = false) {
  return startDate ? getFormattedDate(startDate, showDay) : "Unknown";
}

/**
 * Returns a formatted version of the given end date.
 *
 * @param endDate The end date.
 * @param showDay Show the day.
 */
export function getFormattedEndDate(endDate: Date | null, showDay = false) {
  return endDate ? getFormattedDate(endDate, showDay) : "Present";
}

// Source: https://stackoverflow.com/questions/36532307/rem-px-in-javascript
/**
 * Converts the given rem value to its corresponding pixel length.
 */
export function remToPixel(rem: number) {    
  const BASE_FONT_SIZE = 10;
  return rem * BASE_FONT_SIZE;
}