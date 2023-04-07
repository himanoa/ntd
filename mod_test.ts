import { assertEquals } from "https://deno.land/std@0.181.0/testing/asserts.ts";
import { makeValidationSmartConstructor, makeValidator } from "./mod.ts";

declare const UserSym: unique symbol;

Deno.test("It return Ok value when ValidationSmartConstructor is received valid value", () => {
  const alwaysValidValidator = makeValidator<string, unknown>((ok) => (value) =>
    ok(value)
  );
  const userSmartConstructor = makeValidationSmartConstructor<
    string,
    typeof UserSym
  >()(alwaysValidValidator);

  assertEquals(userSmartConstructor("xxx").v, "xxx");
});

Deno.test("It return Err value when ValidationSmartConstructor is received invalid value", () => {
  const numberValidator = makeValidator<string, { kind: "notNumber" }>(
    (ok, err) => (value) => {
      if (isNaN(parseInt(value, 10))) {
        return err({ "kind": "notNumber" });
      }
      return ok(value);
    },
  );
  const userSmartConstructor = makeValidationSmartConstructor<
    string,
    typeof UserSym
  >()(numberValidator);

  assertEquals(userSmartConstructor("xxx").e, { kind: "notNumber" });
});
