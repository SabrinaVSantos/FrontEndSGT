import { InstituicoesModule } from './instituicoes.module';

describe('InstituicoesModule', () => {
  let instituicoesModule: InstituicoesModule;

  beforeEach(() => {
    instituicoesModule = new InstituicoesModule();
  });

  it('should create an instance', () => {
    expect(instituicoesModule).toBeTruthy();
  });
});
