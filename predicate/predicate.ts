import { Query as FirestoreQuery } from '@firebase/firestore-types';

export abstract class Predicate {

  public readonly type: 'where' | 'and' | 'orderBy' | 'limit';

  constructor(type) {
    this.type = type;
  }
  
  abstract build(query: FirestoreQuery): FirestoreQuery;
}
