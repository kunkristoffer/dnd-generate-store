export interface dndItem {
  name: string,
  type: string,
  base?: string[],
  rarity: string,
  price: number,
  desc?: string,
  image?: string,
  src?: string,
}

export interface dndItemBase {
  name: string,
  type: string,
  price: number,
  desc?: string,
  image?: string,
  src?: string,
}

export interface dndRarity {
  mundane?: number,
  common?: number,
  uncommon?: number,
  rare?: number,
  veryrare?: number,
  legendary?: number,
  artifact?: number
}