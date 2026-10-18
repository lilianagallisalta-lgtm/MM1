import { HkFormsModule } from './hk-forms.module';

describe('HkFormsModule', () => {
  let hkFormsModule: HkFormsModule;

  beforeEach(() => {
    hkFormsModule = new HkFormsModule();
  });

  it('should create an instance', () => {
    expect(hkFormsModule).toBeTruthy();
  });
});
