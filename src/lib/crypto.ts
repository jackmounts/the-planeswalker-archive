export async function deriveKey(
  password: string,
  salt: Uint8Array
): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const secret = process.env.NEXT_PUBLIC_CRYPTO_SECRET || "";
  const combinedPassword = password + secret;

  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(combinedPassword),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100_000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encryptPassword(
  password: string,
  key: CryptoKey,
  iv: Uint8Array
): Promise<Uint8Array> {
  const enc = new TextEncoder();
  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(password)
  );
  return new Uint8Array(encrypted);
}

export function getRandomBytes(length: number): Uint8Array {
  return window.crypto.getRandomValues(new Uint8Array(length));
}

export async function decryptPassword(
  encrypted: Uint8Array,
  key: CryptoKey,
  iv: Uint8Array
): Promise<string> {
  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    encrypted
  );
  const dec = new TextDecoder();
  return dec.decode(decrypted);
}
