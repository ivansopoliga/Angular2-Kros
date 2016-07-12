import { KrosbookAngular2Page } from './app.po';

describe('krosbook-angular2 App', function() {
  let page: KrosbookAngular2Page;

  beforeEach(() => {
    page = new KrosbookAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
