export type MyPick<T, K extends keyof T> = {
  [Key in K]: T[Key];
};

export type MyOmit<T, K extends keyof T> = HandleEmptyObject<
  Pick<T, Exclude<keyof T, K>>
>;

type HandleEmptyObject<T> = T extends Record<string, never> ? void : T;

// type MyNonNullable<T> = Exclude<T, null | undefined>;

type RequiredNotNull<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};

type RemoveUndefinedField<T, TKey extends keyof T> = {
  [P in keyof T as T[P] extends TKey ? never : P]-?: NoUndefinedField<
    NonNullable<T[P]>
  >;
};

export type Ensure<T, K extends keyof T> = RemoveUndefinedField<
  T & RequiredNotNull<Pick<T, K>>,
  K
>;
