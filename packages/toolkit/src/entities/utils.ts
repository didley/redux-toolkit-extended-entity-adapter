import type {
  EntityState,
  IdSelector,
  Update,
  EntityId,
  Comparer,
} from './models'

export function selectIdValue<T>(entity: T, selectId: IdSelector<T>) {
  const key = selectId(entity)

  if (process.env.NODE_ENV !== 'production' && key === undefined) {
    console.warn(
      'The entity passed to the `selectId` implementation returned undefined.',
      'You should probably provide your own `selectId` implementation.',
      'The entity that was passed:',
      entity,
      'The `selectId` implementation:',
      selectId.toString()
    )
  }

  return key
}

export function ensureEntitiesArray<T>(
  entities: readonly T[] | Record<EntityId, T>
): readonly T[] {
  if (!Array.isArray(entities)) {
    entities = Object.values(entities)
  }

  return entities
}

export function splitAddedUpdatedEntities<T>(
  newEntities: readonly T[] | Record<EntityId, T>,
  selectId: IdSelector<T>,
  state: EntityState<T>
): [T[], Update<T>[]] {
  newEntities = ensureEntitiesArray(newEntities)

  const added: T[] = []
  const updated: Update<T>[] = []

  for (const entity of newEntities) {
    const id = selectIdValue(entity, selectId)
    if (id in state.entities) {
      updated.push({ id, changes: entity })
    } else {
      added.push(entity)
    }
  }
  return [added, updated]
}

export function isNonNullable<T>(input: T): input is NonNullable<T> {
  return input !== undefined && input !== null
}

export function definedOrThrow<T>(val: T): NonNullable<T> {
  if (!isNonNullable(val)) {
    throw new Error(val + ' is undefined or null')
  }

  return val
}

export function reSortEntitiesMutably<T>(
  state: EntityState<T>,
  selectById: IdSelector<T>,
  sortComparer: Comparer<T>
) {
  const allEntities = Object.values(state.entities) as T[]
  allEntities.sort(sortComparer)

  const newSortedIds = allEntities.map(selectById)
  const { ids } = state

  if (!areArraysEqual(ids, newSortedIds)) {
    state.ids = newSortedIds
  }
}

function areArraysEqual(a: readonly unknown[], b: readonly unknown[]) {
  if (a.length !== b.length) {
    return false
  }

  for (let i = 0; i < a.length && i < b.length; i++) {
    if (a[i] === b[i]) {
      continue
    }
    return false
  }
  return true
}

export function isEntityState<T>(
  input: EntityState<T> | any
): input is EntityState<T> {
  return (
    typeof input === 'object' &&
    input !== null &&
    input.hasOwnProperty('entities') &&
    input.hasOwnProperty('ids') &&
    Object.keys(input).length === 2
  )
}
