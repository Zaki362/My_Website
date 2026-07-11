export function getSiteUrl() {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL
  ];

  for (const candidate of candidates) {
    const normalized = normalizeSiteUrl(candidate);
    if (normalized) {
      return normalized;
    }
  }

  return "http://localhost:3000";
}

function normalizeSiteUrl(value?: string) {
  const candidate = value?.trim();
  if (!candidate) {
    return null;
  }

  const withProtocol = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;

  try {
    return new URL(withProtocol).origin;
  } catch {
    return null;
  }
}
