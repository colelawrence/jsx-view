import { Subscription } from "rxjs"
import type { Observable } from "rxjs"

/**
 * ### `subscribeState` helper
 *
 * Note: I'm using "closed" & "unsubscribed" interchangeably below.
 *
 * Helper provides your next function another subscription which will be closed each time obs emits.
 *
 * This is especially useful for creating nesting subscribers that should be closed anytime there is a new emission.
 *
 * This is common when subscribing to a "state" or "view" observable, because each `next` emitted value
 * essentially means that everything dependent on the previous value should be disposed of (closed / unsubscribed),
 * hence the name `subscribeState`.
 */
export function subscribeState<T>(
  /** if */
  parentSub: Subscription,
  obs: Observable<T>,
  next: (value: T, subscriptionUntilNext: Subscription) => void,
) {
  let sub = Subscription.EMPTY
  parentSub.add(
    obs.subscribe({
      next: (value) => {
        sub.unsubscribe()
        sub = new Subscription()
        next(value, sub)
      },
      complete: () => sub.unsubscribe(),
    }),
  )
  parentSub.add(() => {
    // unsubscribe current
    sub.unsubscribe()
  })
}
