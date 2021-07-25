import { firestore } from 'firebase-admin';

import { LimitPredicate } from '../predicate/limit.predicate';
import { MaxPredicate } from '../predicate/max.predicate';
import { MinPredicate } from '../predicate/min.predicate';
import { OrderByPredicate } from '../predicate/order-by.predicate';
import { Predicate } from '../predicate/predicate.interface';
import { WherePredicate } from '../predicate/where.predicate';

type ComparatorType = '==' | '>=' | '>' | '<=' | '<' | 'array-contains' | 'array-contains-any' | 'in';

export class Query {
  private _predicates: Predicate[];

  constructor() {
    this._predicates = [];
  }

  /**
   * Add where statement to query
   *
   * @param fieldName  'Targetted fieldname in the database'
   * @param comparitor '==', '>=', >', '<=', '<'
   * @param value      'Value for targetted fieldname
   */
  where(fieldName: string, comparitor: ComparatorType, value: unknown): Query {
    this._addPredicate(new WherePredicate(fieldName, comparitor, value));

    return this;
  }

  /**
   * Add orderBy statement to query
   *
   * @param fieldName The field on which to order
   * @param order The order - asc, desc
   */
  orderBy(fieldName: string, order: 'asc' | 'desc'): Query {
    this._addPredicate(new OrderByPredicate(fieldName, order));

    return this;
  }

  /**
   * Add limit statement to query
   *
   * @param n Number to take.
   */
  limit(n: number): Query {
    this._addPredicate(new LimitPredicate(n));

    return this;
  }

  /** Get (n?) record(s) with last value for fieldName */
  max(fieldName: string, n?: number): Query {
    this._addPredicate(new MaxPredicate(fieldName, n));

    return this;
  }

  /** Get (n?) record(s) with first value for fieldName */
  min(fieldName: string, n?: number): Query {
    this._addPredicate(new MinPredicate(fieldName, n));

    return this;
  }

  private _addPredicate(p: Predicate) {
    this._predicates.push(p);
  }

  /**
   * Builds query for FireStore.
   */
  public __buildForFireStore<T>(collRef: firestore.CollectionReference<T>): firestore.Query<T> {
    let query = <firestore.Query<T>>collRef;

    for (const pred of this._predicates) {
      query = pred.build<T>(query);
    }

    return query;
  }
}
