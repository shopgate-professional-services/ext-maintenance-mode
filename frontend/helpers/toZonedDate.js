/**
 * Determines the offset (in ms) of the given IANA time zone at a given instant.
 * Uses Intl.DateTimeFormat so daylight saving time is handled automatically.
 * @param {Date} date The instant to evaluate.
 * @param {string} timeZone An IANA time zone name, e.g. "Europe/Berlin".
 * @returns {number} The offset in milliseconds (zone time minus UTC).
 */
const getZoneOffsetMs = (date, timeZone) => {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const parts = dtf.formatToParts(date).reduce((acc, part) => {
    if (part.type !== 'literal') {
      acc[part.type] = part.value;
    }
    return acc;
  }, {});

  const asUTC = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );

  return asUTC - date.getTime();
};

/**
 * Interprets a wall-clock date string as a time in a fixed IANA time zone and
 * returns the corresponding absolute Date. When no time zone is given (or the
 * runtime lacks Intl time zone support) it falls back to the native parsing,
 * i.e. the device's local time zone (the previous behaviour).
 * @param {string} isoLike A wall-clock string like "2026-07-20T22:00".
 * @param {string} [timeZone] An IANA time zone name, e.g. "Europe/Berlin".
 * @returns {Date}
 */
const toZonedDate = (isoLike, timeZone) => {
  if (!timeZone) {
    return new Date(isoLike);
  }

  try {
    // Treat the wall-clock time provisionally as UTC, then correct by the
    // zone's offset. A second pass fixes daylight-saving boundary cases where
    // the offset differs between the provisional and the corrected instant.
    const naive = new Date(`${isoLike}Z`);
    let result = new Date(naive.getTime() - getZoneOffsetMs(naive, timeZone));
    result = new Date(naive.getTime() - getZoneOffsetMs(result, timeZone));
    return result;
  } catch (e) {
    return new Date(isoLike);
  }
};

export default toZonedDate;
