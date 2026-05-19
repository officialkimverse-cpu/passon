/**
 * Landing listing photos — each URL matches the item title (furniture / appliance).
 * Optional override: add JPGs in `public/images/listings/` (see README there).
 */

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

export const listingPhotoUrls = {
  /** Adjustable standing desk with monitor */
  standingDesk: u("photo-1592078615290-03300735428e"),
  /** Ergonomic rolling office chair */
  officeChair: u("photo-1580480055273-a1033438c0cc"),
  /** Queen / double bed in a bedroom */
  bedFrame: u("photo-1522771739844-6a9f81d6303f"),
  /** Floor lamp in a living space */
  floorLamp: u("photo-1513506003901-1e6a229e2d15"),
  /** Microwave on kitchen counter */
  microwave: u("photo-1574269905072-6e3d4d231ecc"),
  /** Wooden shelving / storage unit */
  storageShelf: u("photo-1595428774221-9ecd5c47d0d1"),
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
