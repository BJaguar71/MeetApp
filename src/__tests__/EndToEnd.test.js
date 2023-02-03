import puppeteer from 'puppeteer';


describe("show/hide an event details", () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    // launch the browser usin puppeteer
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250, // slow down by 250ms
      ignoreDefaultArgs: ["--disable-extensions"] //// ignores default setting that causes timeout errors
    });
    // create a new page and navigate to localhost
    page = await browser.newPage();
    await page.goto("http://localhost:3000");
    // waite for the event component to be loaded 
    await page.waitForSelector(".event");
  });

  afterAll(() => {
    browser.close();
  });

  // first scenario
  test("an event element is collapsed by default.", async () => {

    // select the element containing event description 
    const eventDetails = await page.$(".event .details");
    expect(eventDetails).toBeNull();
  });

  // scenario 2
  test("user can expand an event to see its details", async() => {
    
    await page.click(".event .details-button");
    const eventDetails = await page.$(".event .details");
    expect(eventDetails).toBeDefined();
  });

  // scenario 3
  test("user can collapse an event to hide its details", async() => {
    await page.click(".event .details-button");
    const eventDetails = await page.$(".event .details");
    expect(eventDetails).toBeNull(); 
  })
});