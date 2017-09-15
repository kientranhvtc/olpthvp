import { OlpthvpPage } from './app.po';

describe('olpthvp App', () => {
  let page: OlpthvpPage;

  beforeEach(() => {
    page = new OlpthvpPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
