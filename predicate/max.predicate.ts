import { firestore } from 'firebase-admin';

import { Predicate } from './predicate.interface';

export class MaxPredicate extends Predicate {
  constructor(private _fieldName: string, private _n?: number) {
    super('max');
  }

  build<T>(query: firestore.Query<T>): firestore.Query<T> {
    return query.orderBy(this._fieldName, 'desc').limit(this._n ? this._n : 1);
  }
}
