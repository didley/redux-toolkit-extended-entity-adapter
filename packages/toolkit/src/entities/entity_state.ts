import type { EntityState, EntityDefinition, IdSelector } from './models'
import { isEntityState, reSortEntitiesMutably, selectIdValue } from './utils'

export function createInitialStateFactory<V>(options: EntityDefinition<V>) {
  function getInitialState(): EntityState<V>
  function getInitialState<S extends object>(
    additionalState: S
  ): EntityState<V> & S
  function getInitialState(additionalState: any = {}): any {
    return Object.assign(getInitialEntityState(options), additionalState)
  }

  return { getInitialState }
}

export function getInitialEntityState<V>(
  options: EntityDefinition<V>
): EntityState<V> {
  const { initialState, selectId, sortComparer } = options
  let initialEntityState = initialStateToEntityState(initialState, selectId)

  if (sortComparer) {
    reSortEntitiesMutably(initialEntityState, selectId, sortComparer)
  }

  return initialEntityState
}

function initialStateToEntityState<T>(
  initialState: EntityDefinition<T>['initialState'],
  selectId: IdSelector<T>
) {
  if (initialState === undefined) {
    return { ids: [], entities: {} }
  } else if (Array.isArray(initialState)) {
    return {
      ids: initialState.map((entity) => selectIdValue(entity, selectId)),
      entities: Object.fromEntries(
        initialState.map((entity) => [selectIdValue(entity, selectId), entity])
      ),
    }
  } else if (isEntityState(initialState)) {
    return initialState
  } else {
    return {
      ids: Object.keys(initialState),
      entities: initialState,
    }
  }
}
