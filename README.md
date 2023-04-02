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
  FromValidationSmartConstructor,
  makeValidationSmartConstructor,
  Ok,
  Err
} from "@himanoa/ntd";

declare const UserNameSym: unique symbol;

const numberValidator: Validator<string, { kind: "notNumber" }> = (
  v: string,
) => {
  if (!isNaN(v as any)) {
    return Err({ kind: "notNumber" });
  }
  return Ok(v);
};

export const userNameSmartConstructor = makeValidationSmartConstructor<
  string,
  typeof UserNameSym
>()(numberValidator);

export type UserName = FromValidationSmartConstructor<
  typeof userNameSmartConstructor
>;

// Use definied UserName type(createUesr.ts)
import { UserName, userNameSmartConstructor } from "./user";

const validUser = userNameSmartConstructor("xxx");

if (validUser.ok) {
  storeUser(validUser.v);
}

if (!validUser.ok) {
  validUser.e; // access validation error
}
```

## Contributing

Contributions are welcome! Please feel free to open an issue or pull request.

## License

This library is licensed under the MIT license. See the [LICENSE](./LICENSE)
file for more information.
