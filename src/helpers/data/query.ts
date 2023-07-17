export function getIds<TEntity extends { id: string }>(entities: TEntity[]) {
  return entities.map((entity) => entity.id);
}
