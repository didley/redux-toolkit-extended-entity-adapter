import type { Selector } from 'reselect'
import { createDraftSafeSelector } from '../createDraftSafeSelector'
import type {
  EntityState,
  EntitySelectors,
  Dictionary,
  EntityId,
} from './models'
import { definedOrThrow } from './utils'

export function createSelectorsFactory<T>() {
  function getSelectors(): EntitySelectors<T, EntityState<T>>
  function getSelectors<V>(
    selectState: (state: V) => EntityState<T>
  ): EntitySelectors<T, V>
  function getSelectors<V>(
    selectState?: (state: V) => EntityState<T>
  ): EntitySelectors<T, any> {
    const selectIds = (state: EntityState<T>) => state.ids

    const selectEntities = (state: EntityState<T>) => state.entities

    const selectAll = createDraftSafeSelector(
      selectIds,
      selectEntities,
      (ids, entities): T[] => ids.map((id) => entities[id]!)
    )

    const selectId = (_: unknown, id: EntityId) => id

    const pickIds = (_: unknown, ids: EntityId[]) => ids

    const selectById = (entities: Dictionary<T>, id: EntityId) => entities[id]

    const selectByIdOrThrow = (entities: Dictionary<T>, id: EntityId) => definedOrThrow(entities[id]);

    const selectByIds = (entities: Dictionary<T>, ids: EntityId[]) => ids.map(id => entities[id]).filter(e => e !== undefined) as T[]

    const selectTotal = createDraftSafeSelector(selectIds, (ids) => ids.length)

    if (!selectState) {
      return {
        selectIds,
        selectEntities,
        selectAll,
        selectTotal,
        selectById: createDraftSafeSelector(
          selectEntities,
          selectId,
          selectById
        ),
        selectByIdOrThrow: createDraftSafeSelector(
          selectEntities,
          selectId,
          selectByIdOrThrow
        ),
        selectByIds: createDraftSafeSelector(
          selectEntities,
          pickIds,
          selectByIds
        ),
      }
    }

    const selectGlobalizedEntities = createDraftSafeSelector(
      selectState as Selector<V, EntityState<T>>,
      selectEntities
    )

    return {
      selectIds: createDraftSafeSelector(selectState, selectIds),
      selectEntities: selectGlobalizedEntities,
      selectAll: createDraftSafeSelector(selectState, selectAll),
      selectTotal: createDraftSafeSelector(selectState, selectTotal),
      selectById: createDraftSafeSelector(
        selectGlobalizedEntities,
        selectId,
        selectById
      ),
      selectByIdOrThrow: createDraftSafeSelector(
        selectGlobalizedEntities,
        selectId,
        selectByIdOrThrow
      ),
      selectByIds: createDraftSafeSelector(
        selectGlobalizedEntities,
        pickIds,
        selectByIds
      ),
    }
  }

  return { getSelectors }
}
