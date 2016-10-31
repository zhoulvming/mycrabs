import { Angular2Material2Page } from './app.po';

describe('angular2-material2 App', function() {
  let page: Angular2Material2Page;

  beforeEach(() => {
    page = new Angular2Material2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
