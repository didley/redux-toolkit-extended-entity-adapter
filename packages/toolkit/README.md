# Redux Toolkit Extended `entityAdapter`
This is a fork of the official official `reduxjs/redux-toolkit` repo. It extends `createEntityAdapter` with some additional utils.

See [original README](OG_README.md)

See [createEntityAdapter docs](https://redux-toolkit.js.org/api/createEntityAdapter)


## Additional `createEntityAdapter` features

### createEntityAdapter({`initialState`})
Improves API to setting initial sate, see https://github.com/reduxjs/redux-toolkit/issues/493#issuecomment-612471868

`initialState` can be multiple shapes and will all return `EntityState`
```ts
const one = [{ id: 1, title: 'The Hobbit' }]
const two =  { 1 : { id: 1, title: 'The Hobbit' } }
const three = { ids: [1], entities: { 1: { id: 1, title: 'The Hobbit' } }
```
Example
```ts
const initialState = [{ id: 1, title: 'The Hobbit' }]

const bookAdapter = createEntityAdapter({ initialState })

bookAdapter.getInitialState() // { ids: [1], entities: { 1: { id: 1, title: 'The Hobbit' } }
```
### getSelectors().`selectByIdOrThrow`
Throws if selected entity is not found. Useful for when a the passed entity id will be known, to reduce unnecessary undefined checks.
### getSelectors().`selectByIds`
### (TODO) getSelectors().selectAll(state, `filterPredicate`)

## Installing
```bash
yarn add @didley/reduxjs-toolkit
```
`reduxjs/redux-toolkit` is not required and can be uninstalled