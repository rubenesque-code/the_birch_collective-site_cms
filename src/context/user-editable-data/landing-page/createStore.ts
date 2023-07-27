import { produce } from "immer";
import { createStore } from "zustand";

import type { Store } from "./types";

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

type Leaves<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : "";

type MyGen<
  TObj extends Record<string, unknown>,
  TKeys extends Leaves<TObj>,
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
    ? (arg: NonNullable<TObj[TKey1]>) => void
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

type UpdateX = MyGen<Store["data"], "bannerImage.position.x">;
// myFunc("bannerImage.dbConnections.imageId");

export const createLandingPageStore = (input: { initData: Store["data"] }) =>
  createStore<Store>((set) => {
    function generateFunc(val: number | string, str: string) {
      return set(
        produce((store: Store) => {
          store.data.bannerImage.dbConnections.imageId = "";
        }),
      );
    }

    return {
      data: input.initData,
      actions: {
        bannerImage: {
          dbConnections: {
            imageId: (newValue) =>
              set(
                produce((store: Store) => {
                  store.data.bannerImage.dbConnections.imageId = newValue;
                }),
              ),
          },
        },
      },
    };
  });

/* type Concat<TArr extends string[]> = TArr extends [
  infer TKey1 extends string,
  ...infer TRestOfKeysArr1,
]
  ? TRestOfKeysArr1 extends [
      infer TKey2 extends string,
      ...infer TRestOfKeysArr2,
    ]
    ? TKey2 extends string
      ? TRestOfKeysArr2 extends []
        ? `${TKey1}${TKey2}`
        : ""
      : TKey1
    : "bad2"
  : "bad 1"; */
