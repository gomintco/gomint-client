export interface TokenMetadata {
  name: string;
  creator?: string;
  creatorDID?: string;
  description?: string;
  image?: string;
  type?: string;
  files?: FileMetadata;
  format?: string;
  properties?: object;
  localization?: Localization;
}

export interface TokenCollectionMetadata {
  description?: string;
  smallestUnitName?: string;
  smallestUnitSymbol?: string;
  creator?: string;
  creatorDID?: string;
  admin?: string;
  website?: string;
  discussion?: string;
  whitepaper?: string;
  properties?: object;
  socials?: SocialLink[];
  lightLogo?: string;
  lightLogoType?: string;
  lightBanner?: string;
  lightBannerType?: string;
  lightFeaturedImage?: string;
  lightFeaturedImageType?: string;
  darkLogo?: string;
  darkLogoType?: string;
  darkBanner?: string;
  darkBannerType?: string;
  darkFeaturedImage?: string;
  darkFeaturedImageType?: string;
}

interface SocialLink {
  url: string;
  label: string;
  info?: string;
}

interface FileMetadata {
  uri: string;
  type: string;
  metadata?: FileMetadata;
}

interface Localization {
  uri: string;
  locale: string;
}

