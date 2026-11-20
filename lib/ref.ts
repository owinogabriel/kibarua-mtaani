import { randomBytes } from "node:crypto";

const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // defined alphabet

export function makeRef(prefix: string) {
  let code = "";

  for (const byte of randomBytes(6)) {
    code += alphabet[byte % alphabet.length]; // Pick random letter from the alpha..
  }
  return `${prefix} -${code}`;
}
