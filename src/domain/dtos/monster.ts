
export interface MonsterData {
  name: string
  category: string
  description: string
  isCatched: boolean
  types: Array<string>
	stats: {
      hp: number,
      attack: number,
      def: number,
      speed: number
	},
  imageUrl: string,
}

export interface MonsterFilter {
  name: string
  types: Array<string>
}

export interface Pagination {
  page: number
  limit: number
}

export interface Sort {
  name: string
  id: string
}
