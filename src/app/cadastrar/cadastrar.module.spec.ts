import { CadastrarModule } from './cadastrar.module';

describe('CadastrarModule', () => {
  let cadastrarModule: CadastrarModule;

  beforeEach(() => {
    cadastrarModule = new CadastrarModule();
  });

  it('should create an instance', () => {
    expect(cadastrarModule).toBeTruthy();
  });
});
