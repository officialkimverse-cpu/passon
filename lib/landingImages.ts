/**
 * Landing listing photos — Unsplash IDs aligned with “What is PassOn” (reliable on the site).
 * Optional: add your own JPGs under public/images/listings/ (see README there).
 */

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

/** Proven on this project */
const PROVEN = {
  moving: u("photo-1714647211902-bb711d643a17"),
  livingRoom: u("photo-1555041469-a586c61ea9bc"),
  keys: u("photo-1741156386380-0236c72eb6f9"),
  plant: u("photo-1525695230005-efd074980869"),
  turnover: u("photo-1600585154340-be6161a56a0c"),
  planning: u("photo-1454165804606-c3d57bc86b40"),
} as const;

export const listingPhotoUrls = {
  standingDesk: PROVEN.planning,
  officeChair: PROVEN.livingRoom,
  bedFrame: PROVEN.moving,
  floorLamp: PROVEN.plant,
  microwave: PROVEN.turnover,
  storageShelf: PROVEN.keys,
} as const;

export const listingLocalPaths = {
  standingDesk: "/images/listings/standing-desk.jpg",
  officeChair: "/images/listings/office-chair.jpg",
  bedFrame: "/images/listings/bed-frame.jpg",
  floorLamp: "/images/listings/floor-lamp.jpg",
  microwave: "/images/listings/microwave.jpg",
  storageShelf: "/images/listings/storage-shelf.jpg",
} as const;

export type ListingPhotoKey = keyof typeof listingPhotoUrls;

export function listingImageSrc(key: ListingPhotoKey): string {
  return listingLocalPaths[key];
}

export function listingImageFallback(key: ListingPhotoKey): string {
  return listingPhotoUrls[key];
}

export const simulationPhotos = [
  listingPhotoUrls.standingDesk,
  listingPhotoUrls.officeChair,
  listingPhotoUrls.bedFrame,
] as const;
