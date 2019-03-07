const puppeteer = require('puppeteer');

async function hasVacantRoom(url) {
  const browser = await puppeteer.launch();
  let page = await browser.newPage();

  await page.goto(url);
  await page.close();

  page = await new Promise((resolve) => browser.once('targetcreated', (target) => resolve(target.page()))); // Get a page created by window.open
  await page.waitFor('table', { timeout: 3000 });
  const html = await page.evaluate(() => document.body.innerText);

  const hasVacantRoom = html.includes('該当しました');

  await browser.close();

  return hasVacantRoom;
}

async function openJKK(url) {
  const browser = await puppeteer.launch({ headless: false }); // default is true
  const page = await browser.newPage();
  await page.goto(url);
  await page.close();
}

(async () => {
  // Nakamurakita
  const url = 'https://jhomes.to-kousya.or.jp/search/jkknet/service/akiyaJyokenDirect?jutaku_name=30B330FC30B730E430CF30A430E030CA30AB30E030E930AD30BF';

  // Tanashi
  // const url = 'https://jhomes.to-kousya.or.jp/search/jkknet/service/akiyaJyokenDirect?jutaku_name=30BF30CA30B730CB30B730CF30E9';

  if (await hasVacantRoom(url)) {
    openJKK(url);
  }
})();

// await page.screenshot({path: 'screenshot.png', fullPage: true});
