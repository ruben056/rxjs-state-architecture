redux like state management using only rxjs dependencies

* in /state/model:
per 'modelgroup'
** model definitions
** model actions

* in /state/management:
* per 'modelgroup'
** a function to handle all the actions (cfr a reducer in redux)
* one statemgmt function combining all these: stateFn in app.management
This is passed a subject which can then be used to send actions.
When an action is passed via the subject, it gets delegated to the correct handler
resulting in the updating of the substate and subsequently the general state.
It returns an observable which can be used to subscribe to state(changes)
This is a behaviorSubject so when you subscribe you get the last known states
