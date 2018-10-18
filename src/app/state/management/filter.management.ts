import { Observable } from 'rxjs';
import { scan, map } from 'rxjs/operators';

import { Action } from '../model/app';
import { VisibilityState, SetVisibilityFilter } from '../model/visibility';

function filter(initState: VisibilityState, actions: Observable<Action>): Observable<VisibilityState> {

  return actions.pipe(
    scan((state: VisibilityState,action: Action)=>{
      if (action instanceof SetVisibilityFilter) {
        return {
          ...state,
          visibilityFilter : action.filter
        }
      }
      return state;
    }, initState));
}

export { filter }
