import {
  it,
  describe,
  expect,
  inject,
  beforeEach,
  beforeEachProviders
} from 'angular2/testing';
import {TNSFontIconPipe} from './fonticon.pipe';

describe('Pipe: TNSFontIconPipe', () => {
  let pipe;
  
  //setup
  beforeEachProviders(() => [
    TNSFontIconPipe
  ]);
  
  beforeEach(inject([TNSFontIconPipe], p => {
    pipe = p;
  }));
  
  //specs
  it('should get correct unicode for classname', () => {
    expect(pipe.transform('fa-bluetooth')).toBe(``);
  });
}) 
