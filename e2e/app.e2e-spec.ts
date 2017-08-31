import { TalbertPage } from './app.po';

describe('talbert App', () => {
  let page: TalbertPage;

  beforeEach(() => {
    page = new TalbertPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
