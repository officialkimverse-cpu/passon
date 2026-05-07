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

function getStore() {
  if (!globalThis.__PASS_ON_INVITES__) globalThis.__PASS_ON_INVITES__ = new Map();
  return globalThis.__PASS_ON_INVITES__;
}

export function saveInvite(payload: InvitePayload) {
  getStore().set(payload.id, payload);
}

export function getInvite(id: string) {
  return getStore().get(id) ?? null;
}

