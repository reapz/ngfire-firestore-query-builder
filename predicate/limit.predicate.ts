import { firestore } from 'firebase-admin';

import { Predicate } from './predicate.interface';

export class LimitPredicate extends Predicate {
  constructor(private _n: number) {
    super('limit');
  }

  build<T>(query: firestore.Query<T>): firestore.Query<T> {
    return query.limit(this._n);
  }
}
