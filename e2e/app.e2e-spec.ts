import { MessagesAppDemoPage } from './app.po';

describe('messages-app-demo App', () => {
  let page: MessagesAppDemoPage;

  beforeEach(() => {
    page = new MessagesAppDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
