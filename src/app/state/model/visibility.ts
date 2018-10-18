interface VisibilityState{
  visibilityFilter: string;
}

class SetVisibilityFilter {
  constructor(public filter: string){}
}

type VisiblityAction = SetVisibilityFilter;

export { VisibilityState }
export { VisiblityAction, SetVisibilityFilter }
