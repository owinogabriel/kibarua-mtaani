import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";

// The length of the derived password hash in bytes.
const KEYLEN = 64;

// Wrap Node.js's callback-based scrypt function in a Promise
// so we can use it with async/await.
const scrypt = (password: string, salt: Buffer, keylen: number) =>
  new Promise<Buffer>((resolve, reject) => {
    scryptCb(password, salt, keylen, (err, key) =>
      // If hashing fails, reject the Promise with the error.
      // Otherwise, resolve with the generated key (hash).
      err ? reject(err) : resolve(key),
    );
  });

// HASH PASSWORD
export async function hashPassword(password: string) {
  // Generate a random 16-byte salt for this password.
  // A salt ensures that identical passwords produce different hashes.
  const salt = randomBytes(16);

  // Use scrypt to derive a cryptographic hash from the password and salt.
  const hash = await scrypt(password, salt, KEYLEN);

  // Convert both the salt and hash to hexadecimal strings.
  // Store them together in the format: salt:hash
  // We need the salt later to verify the password.
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

// VERIFY PASSWORD
export async function verifyPassword(password: string, stored: string) {
  // Split the stored value into its salt and hash.
  const [saltHex, hashHex] = stored.split(":");

  // If either the salt or hash is missing, the stored value
  if (!saltHex || !hashHex) return false;

  // This is the hash we expect the entered password to produce.
  const expected = Buffer.from(hashHex, "hex");

  // Re-hash the password entered during login using the SAME salt
  // and the same hash length as the originally stored hash.
  const actual = await scrypt(
    password,
    Buffer.from(saltHex, "hex"),
    expected.length,
  );

  // Check that both hashes have the same length and compare them
  // using timingSafeEqual to reduce timing-attack risk.
  // If they match, the password is correct; otherwise, it's incorrect.
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
