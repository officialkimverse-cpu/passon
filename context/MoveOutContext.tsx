"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type UploadItem = {
  file: File;
  url: string;
  id: string;
};

export type MoveOutGroup = {
  id: string;
  title: string;
  photoIds: string[];
};

export type MoveOutDraftListing = {
  groupId: string;
  name: string;
  description: string;
  category?: string;
  condition?: string;
  marketPrice?: number;
};

export type MoveOutItemCondition =
  | "new"
  | "nearly new"
  | "used but fine"
  | "a little damaged"
  | "very damaged";

export type MoveOutItemNotes = {
  groupId: string;
  condition?: MoveOutItemCondition;
  yearsOfUse?: number;
  negotiable: boolean;
  usageNotes: string;
  salePercent?: number;
  customPrice?: number;
};

type MoveOutState = {
  photos: UploadItem[];
  setPhotos: React.Dispatch<React.SetStateAction<UploadItem[]>>;
  groups: MoveOutGroup[];
  setGroups: React.Dispatch<React.SetStateAction<MoveOutGroup[]>>;
  drafts: Record<string, MoveOutDraftListing>;
  setDrafts: React.Dispatch<React.SetStateAction<Record<string, MoveOutDraftListing>>>;
  notes: Record<string, MoveOutItemNotes>;
  setNotes: React.Dispatch<React.SetStateAction<Record<string, MoveOutItemNotes>>>;
};

const MoveOutContext = createContext<MoveOutState | null>(null);

export function MoveOutProvider({ children }: { children: React.ReactNode }) {
  const [photos, setPhotos] = useState<UploadItem[]>([]);
  const [groups, setGroups] = useState<MoveOutGroup[]>([]);
  const [drafts, setDrafts] = useState<Record<string, MoveOutDraftListing>>({});
  const [notes, setNotes] = useState<Record<string, MoveOutItemNotes>>({});

  const value = useMemo(
    () => ({ photos, setPhotos, groups, setGroups, drafts, setDrafts, notes, setNotes }),
    [photos, groups, drafts, notes],
  );

  return <MoveOutContext.Provider value={value}>{children}</MoveOutContext.Provider>;
}

export function useMoveOut() {
  const ctx = useContext(MoveOutContext);
  if (!ctx) throw new Error("useMoveOut must be used within MoveOutProvider");
  return ctx;
}

