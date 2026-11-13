/**
 * Accepts: 0712345678, 0112345678, +254712345678, 254712345678, 712345678
 * (spaces dashes allowed). Returns 2547XXXXXXXX or null.
 **/

export function normalizeKenyanPhone(input: string): string | null {
  const cleaned = input.replace(/[\s\-()]/g, ""); // Remove spaces, dashes, and parentheses
  const match = cleaned.match(/^(?:\+?254|0)?([71]\d{8})$/); // Match Kenyan phone numbers starting with 07, 01, or 71
  return match ? `254${match[1]}` : null; // Return in the format 2547XXXXXXXX
}
