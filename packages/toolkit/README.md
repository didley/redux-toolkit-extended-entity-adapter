# Redux Toolkit Extended `entityAdapter`
This is a fork of the official official `reduxjs/redux-toolkit` repo. It extends `createEntityAdapter` with some additional utils.

See [original README](OG_README.md)

See [createEntityAdapter docs](https://redux-toolkit.js.org/api/createEntityAdapter)


## Additional `createEntityAdapter` methods

### `selectByIdOrThrow`
Throws if selected entity is not found. Useful for when a the passed entity id will be known, to reduce unnecessary undefined checks.
### `selectByIds`
### `initialize` (TODO)

## Installing
```bash
yarn add @didley/reduxjs-toolkit
```
`reduxjs/redux-toolkit` is not required and can be uninstalled