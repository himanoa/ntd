type Branded<T, K extends symbol> = T & { [key in K]: never };

type Result<T, E> = { ok: true; v: T; e: never } | {
  ok: false;
  e: E;
  v: never;
};

export type ValidationSmartConstructor<T, K extends symbol, E extends unknown> =
  (value: T) => Result<Branded<T, K>, E>;

export type ValidationSmartConstructorBuilder<
  T,
  K extends symbol,
  E extends unknown,
  V extends (v: T) => Result<T, E>,
> = ValidationSmartConstructor<T, K, ReturnType<V>["e"]>;

export type FromValidationSmartConstructor<T> = T extends
  ValidationSmartConstructorBuilder<infer U, infer K, infer _, infer _>
  ? Branded<U, K>
  : never;

export type Validator<T, E> = (v: T) => Result<T, E>;

export const Ok = <T, E>(v: T) => {
  return { ok: true, v } as Result<T, E>;
};

export const Err = <T, E>(e: E) => {
  return { ok: false, e } as Result<T, E>;
};

export function makeValidationSmartConstructor<T, K extends symbol>(): <
  V extends (v: T) => Result<T, E>,
  E extends unknown,
>(validator: V) => ValidationSmartConstructorBuilder<T, K, E, V> {
  return (validator) => {
    return (dirtyValue) => {
      const validated = validator(dirtyValue) as Result<
        Branded<T, K>,
        ReturnType<typeof validator>["e"]
      >;
      return validated;
    };
  };
}
