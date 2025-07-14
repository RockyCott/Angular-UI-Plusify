import {
  animation,
  style,
  animate,
  trigger,
  transition,
  useAnimation,
} from '@angular/animations';

/**
 * Animation for swinging elements in from different directions.
 */
export const swingIn = animation(
  [
    style({
      opacity: 0,
      transform: '{{startTransform}}',
      transformOrigin: '{{origin}}',
    }),
    animate(
      '{{duration}} {{easing}}',
      style({
        opacity: 1,
        transform: 'translate(0, 0) scale(1) rotate(0)',
      })
    ),
  ],
  {
    params: {
      startTransform: 'translateY(50px) rotateX(-90deg)',
      origin: 'bottom',
      duration: '600ms',
      easing: 'cubic-bezier(.36,-0.64,.34,1.76)',
    },
  }
);

/**
 * Animation for swinging elements in from the bottom.
 */
export const swingFromBottom = trigger('swingFromBottom', [
  transition(':enter', [
    useAnimation(swingIn, {
      params: {
        startTransform: 'translateY(50px)',
        origin: 'bottom',
      },
    }),
  ]),
  transition(':leave', [
    animate(
      '400ms',
      style({
        opacity: 0,
        transform: 'translateY(50px)',
      })
    ),
  ]),
]);

/**
 * Animation for swinging elements in from the left.
 */
export const swingFromLeft = trigger('swingFromLeft', [
  transition(':enter', [
    useAnimation(swingIn, {
      params: {
        startTransform: 'translateX(-50px)',
        origin: 'left',
      },
    }),
  ]),
  transition(':leave', [
    animate(
      '400ms',
      style({
        opacity: 0,
        transform: 'translateX(-50px)',
      })
    ),
  ]),
]);

/**
 * Animation for swinging elements in from the right.
 */
export const swingFromRight = trigger('swingFromRight', [
  transition(':enter', [
    useAnimation(swingIn, {
      params: {
        startTransform: 'translateX(50px)',
        origin: 'right',
      },
    }),
  ]),
  transition(':leave', [
    animate(
      '400ms',
      style({
        opacity: 0,
        transform: 'translateX(50px)',
      })
    ),
  ]),
]);

/**
 * Duration for the swing scale center animation
 * Value is set to ms
 */
export const SWING_SCALE_CENTER_DURATION = 250;

/**
 * Animation for swinging elements in from the center with scaling.
 */
export const swingScaleCenter = trigger('swingScaleCenter', [
  transition(':enter', [
    useAnimation(swingIn, {
      params: {
        startTransform: 'scale(0.5)',
        origin: 'center',
        easing: 'ease-out',
      },
    }),
  ]),
  transition(':leave', [
    animate(
      `${SWING_SCALE_CENTER_DURATION}ms`,
      style({
        opacity: 0,
        transform: 'scale(0.5)',
      })
    ),
  ]),
]);
