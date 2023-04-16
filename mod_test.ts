import { assertEquals } from "https://deno.land/std@0.181.0/testing/asserts.ts";
import {
  makeValidationSmartConstructor,
  makeValidator,
  Validator,
} from "./mod.ts";

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
  const urlVaidator: Validator<string, { kind: "invalidFormat" }> =
    makeValidator<string, { kind: "invalidFormat" }>((ok, err) => (value) => {
      try {
        new URL(value);
        return ok(value);
      } catch {
        return err({ kind: "invalidFormat" });
      }
    });

  const userSmartConstructor = makeValidationSmartConstructor<
    string,
    typeof UserSym
  >()(urlVaidator);

  assertEquals(userSmartConstructor("xxx").e, { kind: "invalidFormat" });
});
