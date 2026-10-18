import { StageModule } from './stage.module';

describe('StageModule', () => {
  let stageModule: StageModule;

  beforeEach(() => {
    stageModule = new StageModule();
  });

  it('should create an instance', () => {
    expect(stageModule).toBeTruthy();
  });
});
