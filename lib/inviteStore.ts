import { Redis } from "@upstash/redis";

export type InviteItem = {
  id: string;
  title: string;
  description: string;
  marketPrice?: number;
  salePercent?: number;
  customPrice?: number;
  finalPrice?: number;
  condition?: string;
  yearsOfUse?: number;
  negotiable: boolean;
  usageNotes: string;
  thumbnailDataUrl?: string;
};

export type InvitePayload = {
  id: string;
  createdAt: string;
  items: InviteItem[];
};

declare global {
  // eslint-disable-next-line no-var
  var __PASS_ON_INVITES__: Map<string, InvitePayload> | undefined;
}

const INVITE_KEY_PREFIX = "passon:invite:";
/** 90 days — enough for a typical lease handoff window */
const INVITE_TTL_SECONDS = 60 * 60 * 24 * 90;

function getMemoryStore() {
  if (!globalThis.__PASS_ON_INVITES__) globalThis.__PASS_ON_INVITES__ = new Map();
  return globalThis.__PASS_ON_INVITES__;
}

let redisClient: Redis | null | undefined;

function getRedis(): Redis | null {
  if (redisClient !== undefined) return redisClient;
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    redisClient = null;
    return null;
  }
  redisClient = new Redis({ url, token });
  return redisClient;
}

/**
 * Saves an invite. On Vercel, set Upstash Redis (or Vercel KV) env vars so publish/read
 * hit the same storage across serverless instances.
 */
export async function saveInvite(payload: InvitePayload): Promise<void> {
  const redis = getRedis();
  if (redis) {
    await redis.set(`${INVITE_KEY_PREFIX}${payload.id}`, JSON.stringify(payload), {
      ex: INVITE_TTL_SECONDS,
    });
    return;
  }
  getMemoryStore().set(payload.id, payload);
}

export async function getInvite(id: string): Promise<InvitePayload | null> {
  const redis = getRedis();
  if (redis) {
    const raw = await redis.get(`${INVITE_KEY_PREFIX}${id}`);
    if (raw == null) return null;
    if (typeof raw === "string") {
      try {
        return JSON.parse(raw) as InvitePayload;
      } catch {
        return null;
      }
    }
    return raw as InvitePayload;
  }
  return getMemoryStore().get(id) ?? null;
}

/** Whether production-style persistence is configured (for diagnostics). */
export function inviteStorageMode(): "redis" | "memory" {
  return getRedis() !== null ? "redis" : "memory";
}
