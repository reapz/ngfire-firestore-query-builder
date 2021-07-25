import { firestore } from 'firebase-admin';

export type PredicateType = 'where' | 'and' | 'orderBy' | 'limit' | 'min' | 'max';

export abstract class Predicate {
  public readonly type: PredicateType;

  constructor(type: PredicateType) {
    this.type = type;
  }

  abstract build<T>(query: firestore.Query<T>): firestore.Query<T>;
}
