import { firestore } from 'firebase-admin';

import { Predicate } from './predicate.interface';

export class MinPredicate extends Predicate {
  constructor(private _fieldName: string, private _n?: number) {
    super('min');
  }

  build<T>(query: firestore.Query<T>): firestore.Query<T> {
    return query.orderBy(this._fieldName, 'asc').limit(this._n ? this._n : 1);
  }
}
