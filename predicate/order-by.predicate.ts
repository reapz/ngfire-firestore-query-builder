import { firestore } from 'firebase-admin';

import { Predicate } from './predicate.interface';

export class OrderByPredicate extends Predicate {
  constructor(private _fieldName: string, private _order: 'asc' | 'desc') {
    super('orderBy');
  }

  build<T>(query: firestore.Query<T>): firestore.Query<T> {
    return this._order == 'asc' ? query.orderBy(this._fieldName) : query.orderBy(this._fieldName, this._order);
  }
}
