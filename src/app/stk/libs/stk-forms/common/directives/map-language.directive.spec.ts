import { MapLanguageDirective } from './map-language.directive';

describe('MapLanguageDirective', () => {
  it('should create an instance', () => {
    const directive = new MapLanguageDirective();
    expect(directive).toBeTruthy();
  });

  it('should not modify the input if it does not contain only digits and math symbols', () => {
    const directive = new MapLanguageDirective();
    const str = '123A+3';
  });
});
