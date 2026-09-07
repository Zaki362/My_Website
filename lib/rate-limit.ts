type RateLimitPolicy = { windowMs: number; maxRequests: number; maxClients?: number };

// Per-instance protection only; a distributed quota requires a shared store.
export function createRateLimiter({ windowMs, maxRequests, maxClients = 5000 }: RateLimitPolicy) {
  const clients = new Map<string, number[]>();
  if (windowMs <= 0 || maxRequests < 1 || maxClients < 1) throw new Error("Invalid rate limit policy");

  return (clientId: string, now = Date.now()) => {
    const windowStart = now - windowMs;
    // Entries are ordered by their most recent accepted request, so cleanup
    // stops at the first live entry without scanning every active client.
    for (const [key, requests] of clients) {
      if (requests[requests.length - 1] > windowStart) break;
      clients.delete(key);
    }

    const recent = (clients.get(clientId) ?? []).filter((timestamp) => timestamp > windowStart);
    if (recent.length >= maxRequests) {
      return { limited: true, retryAfter: Math.max(1, Math.ceil((recent[0] + windowMs - now) / 1000)) };
    }
    // Do not evict active clients: eviction would let callers bypass their quota.
    if (!clients.has(clientId) && clients.size >= maxClients) {
      return { limited: true, retryAfter: Math.ceil(windowMs / 1000) };
    }
    recent.push(now);
    clients.delete(clientId);
    clients.set(clientId, recent);
    return { limited: false, retryAfter: 0 };
  };
}
