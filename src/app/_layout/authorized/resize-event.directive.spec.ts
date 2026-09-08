import { ElementRef } from '@angular/core';
import { ResizeEventDirective } from './resize-event.directive';
import { Globals } from '../../globals';

describe('ResizeEventDirective', () => {
  let directive: ResizeEventDirective;
  let globals: Globals;
  const elementRef = new ElementRef(document.createElement('div'));

  beforeEach(() => {
    globals = new Globals();
    directive = new ResizeEventDirective(elementRef, globals);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('updates the screen size on window resize', () => {
    const setScreenSizeSpy = spyOn(globals, 'setScreenSize');

    directive.onResize();

    expect(setScreenSizeSpy).toHaveBeenCalledWith(window.innerWidth);
  });
});
