interface ClientRecord {
  minuteRequests: number[];
  hourRequests: number[];
}

const clientMap = new Map<string, ClientRecord>();

const MAX_PER_MINUTE = 5;
const MAX_PER_HOUR = 20;

export function checkRateLimit(clientId: string): { allowed: boolean; retryAfter?: number; error?: string } {
  const now = Date.now();
  const minuteWindow = now - 60 * 1000;
  const hourWindow = now - 60 * 60 * 1000;

  let record = clientMap.get(clientId);
  if (!record) {
    record = { minuteRequests: [], hourRequests: [] };
    clientMap.set(clientId, record);
  }

  // Clean old timestamps
  record.minuteRequests = record.minuteRequests.filter(ts => ts > minuteWindow);
  record.hourRequests = record.hourRequests.filter(ts => ts > hourWindow);

  if (record.minuteRequests.length >= MAX_PER_MINUTE) {
    const oldestInMinute = record.minuteRequests[0];
    const retryAfterSec = Math.ceil((oldestInMinute + 60 * 1000 - now) / 1000);
    return {
      allowed: false,
      retryAfter: Math.max(1, retryAfterSec),
      error: `Rate limit exceeded. Maximum ${MAX_PER_MINUTE} requests per minute. Please retry in ${retryAfterSec} seconds.`
    };
  }

  if (record.hourRequests.length >= MAX_PER_HOUR) {
    const oldestInHour = record.hourRequests[0];
    const retryAfterSec = Math.ceil((oldestInHour + 60 * 60 * 1000 - now) / 1000);
    return {
      allowed: false,
      retryAfter: Math.max(1, retryAfterSec),
      error: `Hourly rate limit exceeded. Maximum ${MAX_PER_HOUR} requests per hour. Please retry later.`
    };
  }

  // Record this request
  record.minuteRequests.push(now);
  record.hourRequests.push(now);

  return { allowed: true };
}
