import * as CSS from 'csstype';

declare module 'csstype' {
  interface Properties {
    // Sal CSS variables
    '--sal-duration'?: string;
    '--sal-delay'?: string;
    '--sal-easing'?: string;
  }
}
