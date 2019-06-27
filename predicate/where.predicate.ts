import { Query as FirebaseQuery } from '@firebase/firestore-types';
import { Predicate } from "./predicate";

export class WherePredicate extends Predicate {

  constructor(private _fieldName, private _comparitor, private _value) {
    super('where');
  }

  build(query: FirebaseQuery): FirebaseQuery {
    return query.where(this._fieldName, this._comparitor, this._value);
  }

}
