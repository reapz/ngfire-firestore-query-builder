import { Query as FirestoreQuery, CollectionReference } from '@firebase/firestore-types';

import { Predicate } from '../predicate/predicate.interface';
import { WherePredicate } from '../predicate/where.predicate';
import { OrderByPredicate } from '../predicate/order-by.predicate';
import { LimitPredicate } from '../predicate/limit.predicate';

export class Query {

  private _predicates: Predicate[];

  constructor() { this._predicates = []; }

  /**
   * Add where statement to query
   * 
   * @param fieldName  'Targetted fieldname in the database'
   * @param comparitor '==', '>=', >', '<=', '<'
   * @param value      'Value for targetted fieldname
   */
  where(fieldName: string, comparitor: '==' | '>=' | '>' | '<=' | '<' | 'array-contains', value: string) {
    this._addPredicate(new WherePredicate(fieldName, comparitor, value));
    
    return this;
  }

  /**
   * Add orderBy statement to query
   * 
   * @param fieldName The field on which to order
   * @param order The order - asc, desc
   */
  orderBy(fieldName: string, order: 'asc' | 'desc') {
    this._addPredicate(new OrderByPredicate(fieldName, order));

    return this;
  }

  /**
   * Add limit statement to query
   * 
   * @param n Number to take.
   */
  limit(n: number) {
    this._addPredicate(new LimitPredicate(n));

    return this;
  }

  private _addPredicate(p: Predicate) {
    this._predicates.push(p);
  }

  /** 
   * Builds query for FireStore.
   */
  public __buildForFireStore(collRef: CollectionReference)
  { 
    let query = <FirestoreQuery> collRef;

    for (const pred of this._predicates) {
      query = pred.build(query);
    }

    return query;
  }

}
