import { firestore } from 'firebase-admin';

import { Predicate } from './predicate.interface';

export type WhereComparitor = '<' | '>' | '<=' | '==' | '>=' | 'array-contains' | 'in' | 'array-contains-any';

export class WherePredicate extends Predicate {
  constructor(private _fieldName: string, private _comparitor: WhereComparitor, private _value: unknown) {
    super('where');
  }

  build<T>(query: firestore.Query<T>): firestore.Query<T> {
    return query.where(this._fieldName, this._comparitor, this._value);
  }
}
