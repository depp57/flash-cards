import {
  animate,
  animation,
  group,
  query,
  style,
  transition,
  trigger,
  useAnimation
} from '@angular/animations';

const ROUTE_TRANSITION_TIME = 300;
const TIMING_FUNCTION       = 'ease';

const swipeLeft = animation([
  style({transform: 'translateX(-100%)'}),
  animate(`${ROUTE_TRANSITION_TIME}ms ${TIMING_FUNCTION}`, style({transform: 'translateX(0)'}))
]);

const swipeLeftOut = animation([
  animate(`${ROUTE_TRANSITION_TIME}ms ${TIMING_FUNCTION}`, style({transform: 'translateX(-100%)'}))
]);

const swipeRightOut = animation([
  animate(`${ROUTE_TRANSITION_TIME}ms ${TIMING_FUNCTION}`, style({transform: 'translateX(100%)'}))
]);

const swipeRight = animation([
  style({transform: 'translateX(100%)'}),
  animate(`${ROUTE_TRANSITION_TIME}ms ${TIMING_FUNCTION}`, style({transform: 'translateX(0)'}))
]);

export const routeTransitions = trigger('routeAnimations', [
  transition('0 => *, 1 => 2, 1 => 3, 2 => 3', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    group([
      query(':leave', useAnimation(swipeLeftOut)),
      query(':enter', useAnimation(swipeRight))
    ]),
  ]),
  transition('3 => *, 2 => 1, 2 => 0, 1 => 0', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ]),
    group([
      query(':leave', useAnimation(swipeRightOut)),
      query(':enter', useAnimation(swipeLeft))
    ]),
  ])
]);
