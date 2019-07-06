const puppeteer = require('puppeteer');
const sleep = require('sleep')

async function hasVacantRoom(url) {
  const browser = await puppeteer.launch();

  let page = await browser.newPage();

  await page.goto(url);
  await page.close();

  page = await new Promise((resolve) => browser.once('targetcreated', (target) => resolve(target.page()))); // Get a page created by window.open
  await page.waitFor('table', { timeout: 3000 });

  sleep.sleep(1);

  const content = await page.evaluate(() => document.body.innerText.trim());

  const hasVacantRoom = content.includes('内見'); // Be sure this script is saved as UTF-8.

  await browser.close();

  return hasVacantRoom;
}

async function doIt(url) {
  if (await hasVacantRoom(url)) {
    const browser = await puppeteer.launch({ headless: false }); // default is true
    const page = await browser.newPage();
    await page.goto(url);
    await page.close();
  }
}

// Replace the value of jutaku_name with the jutaku_name value of the apartment of your choice.
doIt('https://jhomes.to-kousya.or.jp/search/jkknet/service/akiyaJyokenDirect?jutaku_name=30B330FC30B730E430CF30A430E030CA30AB30E030E930AD30BF');

// await page.screenshot({path: 'screenshot.png', fullPage: true});
