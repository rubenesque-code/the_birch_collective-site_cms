export type GenerateNonArrActions<TData extends Record<string, unknown>> = {
  [TKey in keyof TData as TData[TKey] extends
    | string
    | number
    | null
    | Record<string, unknown>
    | unknown[]
    ? TKey extends "id" | "index"
      ? never
      : TKey
    : never]: TData[TKey] extends string | number | null
    ? (updatedValue: NonNullable<TData[TKey]>) => void
    : TData[TKey] extends unknown[]
    ? Record<string, unknown>
    : TData[TKey] extends Record<string, unknown>
    ? GenerateNonArrActions<TData[TKey]>
    : never;
};

export type GenerateEntityNonArrActions<TData extends Record<string, unknown>> =
  {
    [TKey in keyof TData as TData[TKey] extends
      | string
      | number
      | null
      | Record<string, unknown>
      | unknown[]
      ? TKey extends "id" | "index"
        ? never
        : TKey
      : never]: TData[TKey] extends string | number | null
      ? (arg0: { id: string; updatedValue: NonNullable<TData[TKey]> }) => void
      : TData[TKey] extends unknown[]
      ? Record<string, unknown>
      : TData[TKey] extends Record<string, unknown>
      ? GenerateEntityNonArrActions<TData[TKey]>
      : never;
  };

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  ...0[],
];

export type OmitObjArrProps<TObj> = {
  [K in keyof TObj as TObj[K] extends unknown[]
    ? never
    : K]: TObj[K] extends Record<string, unknown>
    ? OmitObjArrProps<TObj[K]>
    : TObj[K];
};

export type ObjFieldsToStr<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? { [K in keyof T]-?: Join<K, ObjFieldsToStr<T[K], Prev[D]>> }[keyof T]
  : "";

export type GetObjValue<
  TObj extends Record<string, unknown>,
  TKeys extends string,
> = Split<TKeys, "."> extends string[]
  ? MyGen3<TObj, Split<TKeys, ".">>
  : never;

type MyGen3<
  TObj extends Record<string, unknown>,
  TKeys extends string[],
> = TKeys extends [
  infer TKey1 extends string,
  ...infer TRestOfKeysArr extends string[],
]
  ? TObj[TKey1] extends string | number | null
    ? NonNullable<TObj[TKey1]>
    : TObj[TKey1] extends Record<string, unknown>
    ? MyGen3<TObj[TKey1], TRestOfKeysArr>
    : never
  : never;

type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ""
  ? []
  : S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S];

/* type Leaves<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : ""; */
