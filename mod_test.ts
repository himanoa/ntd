import { assertEquals } from "https://deno.land/std@0.181.0/testing/asserts.ts";
import { Err, makeValidationSmartConstructor, Ok, Validator } from "./mod.ts";

declare const UserSym: unique symbol;

Deno.test("It return Ok value when ValidationSmartConstructor is received valid value", () => {
  const validValidator: Validator<string, { kind: "notNumber" }> = (
    v: string,
  ) => {
    return Ok(v);
  };
  const userSmartConstructor = makeValidationSmartConstructor<
    string,
    typeof UserSym
  >()(validValidator);

  assertEquals(userSmartConstructor("xxx").v, "xxx");
});

Deno.test("It return Err value when ValidationSmartConstructor is received invalid value", () => {
  const numberValidator: Validator<string, { kind: "notNumber" }> = (
    v: string,
  ) => {
    if (isNaN(parseInt(v, 10))) {
      return Err({ "kind": "notNumber" });
    }
    return Ok(v);
  };
  const userSmartConstructor = makeValidationSmartConstructor<
    string,
    typeof UserSym
  >()(numberValidator);

  assertEquals(userSmartConstructor("xxx").e, { kind: "notNumber" });
});
