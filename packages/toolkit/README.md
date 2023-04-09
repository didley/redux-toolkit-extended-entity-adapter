# Redux Toolkit Extended `entityAdapter`
See [original README](./OG_README.md)

This is a fork of the official official `reduxjs/redux-toolkit` repo. It extends `createEntityAdapter` with some additional utils.


## Additional `createEntityAdapter` methods

### `selectByIdOrThrow`
Throws if selected entity is not found. Useful for when a the passed entity id will be known, to reduce unnecessary undefined checks.

### `selectByIds` (TODO)

### `initialize` (TODO)