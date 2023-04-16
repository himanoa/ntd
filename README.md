# @himanoa/ntd

ntd is TypeScript library that helps implement the new type pattern.

whici is used to treat two types with same structure as different types in
TypeScript.

## Installation

For npm users:

```bash
npm install @himanoa/ntd
```

## Usages

```typescript
// Type definition(user.ts)

import {
  makeValidator,
  makeValidationSmartConstructor,
  Ok,
  Err
} from "@himanoa/ntd";

declare const UrlStringSym: unique symbol;

const urlVaidator: Validator<string, { kind: "invalidFormat" }> = makeVaidator<string, { kind: 'invalidFormat' }>((ok, err) => (value) => {
  try {
    new URL(value)
    return ok(value)
  } catch {
    return err({kind: 'invalidFormat'})
  }
})

export const makeUrlString = makeValidationSmartConstructor<
  string,
  typeof UserNameSym
>()(urlValidator);

export type UrlString = FromValidationSmartConstructor<
  typeof makeUrlString
>;

// Use defined types

const validUrlStringResult = makeUrlString("https://example.com/");
const invalidUrlStringResult = makeUrlString("example!!!"); // 

if (validUrlStringResult.ok) {
  validUrlStringResult.v // https://example.com/
}

if (!invalidUrlStringResult.ok) {
  invalidUrlStringResult.e // { kind: 'invalidFormat' }
}
```

## Contributing

Contributions are welcome! Please feel free to open an issue or pull request.

## License

This library is licensed under the MIT license. See the [LICENSE](./LICENSE)
file for more information.
