describe("WWW Apply Now Functionality", () => {
  it("Apply Guaranteed Mastercard from WWW", async () => {
    await browser.url("https://www.capitalone.ca/credit-cards/compare/");
    const title = await browser.getTitle();
    await browser.waitUntil(() => title.match(/Which credit card is right for you? | Capital One Canada/i), {
      timeout: 5000,
      timeoutMsg: "Title didn't match with BrowserStack"
    });
    
    const gmApplyBtn = await $('#gm>#card>#card-card-item>#card-apply-now-button-below>a');
    await gmApplyBtn.waitForClickable({
      timeout: 8000,
    });

    await gmApplyBtn.click();

    // await browser.switchContext('NATIVE_APP');
    // const allowBtn = await $('#Allow');
    // await allowBtn.waitForClickable({
    //   timeout: 8000,
    // });
    // await allowBtn.click();

    await browser.switchWindow(/Apply for a Capital One Card/i);
    browser.waitUntil(() => browser.getTitle().match(/Apply for a Capital One Card/i), {
      timeout: 8000,
      timeoutMsg: "Title didn't match with Dynamic App"
    });

  });
});
