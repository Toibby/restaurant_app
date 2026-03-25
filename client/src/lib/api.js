const rawBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

export async function fetchWithTimeout(url, options = {}, timeout = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}