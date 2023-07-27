export type GenerateActions<TData extends Record<string, unknown>> = {
  [TKey in keyof TData as TData[TKey] extends
    | string
    | number
    | null
    | Record<string, unknown>
    | unknown[]
    ? TKey
    : never]: TData[TKey] extends string | number | null
    ? (updatedValue: NonNullable<TData[TKey]>) => void
    : TData[TKey] extends unknown[]
    ? Record<string, unknown>
    : TData[TKey] extends Record<string, unknown>
    ? GenerateActions<TData[TKey]>
    : never;
};
