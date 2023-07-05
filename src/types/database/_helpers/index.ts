export type DocPartialWithId<TDoc extends { id: string }> = {
  id: string;
} & Partial<TDoc>;
