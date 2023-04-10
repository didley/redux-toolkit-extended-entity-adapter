import type { EntityState, Dictionary } from '../../models'

export interface BookModel {
  id: string
  title: string
  author?: string
}

export const AClockworkOrange: BookModel = Object.freeze({
  id: 'aco',
  title: 'A Clockwork Orange',
})

export const AnimalFarm: BookModel = Object.freeze({
  id: 'af',
  title: 'Animal Farm',
})

export const TheGreatGatsby: BookModel = Object.freeze({
  id: 'tgg',
  title: 'The Great Gatsby',
})

export const TheHobbit: BookModel = Object.freeze({
  id: 'th',
  title: 'The Hobbit',
  author: 'J. R. R. Tolkien',
})

export const AllBooksUnsorted: BookModel[] = [
  AnimalFarm,
  TheGreatGatsby,
  AClockworkOrange,
  TheHobbit,
]
export const AllBookEntities: Dictionary<BookModel> = Object.fromEntries(
  AllBooksUnsorted.map((b) => [b.id, b])
)
export const AllBookEntityState: EntityState<BookModel> = {
  ids: Object.keys(AllBookEntities),
  entities: AllBookEntities,
}

const AllBooksByTitle: BookModel[] = [
  AClockworkOrange,
  AnimalFarm,
  TheGreatGatsby,
  TheHobbit,
]
const AllBookEntitiesByTitle: Dictionary<BookModel> = Object.fromEntries(
  AllBooksByTitle.map((b) => [b.id, b])
)
export const AllBookEntityStateByTitle: EntityState<BookModel> = {
  ids: Object.keys(AllBookEntitiesByTitle),
  entities: AllBookEntitiesByTitle,
}
