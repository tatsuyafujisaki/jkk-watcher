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

// Nakamurakita
doIt('https://jhomes.to-kousya.or.jp/search/jkknet/service/akiyaJyokenDirect?jutaku_name=30B330FC30B730E430CF30A430E030CA30AB30E030E930AD30BF');

// Kotakecho
doIt('https://jhomes.to-kousya.or.jp/search/jkknet/service/akiyaJyokenDirect?jutaku_name=30B330FC30B730E330CF30A430E030B330BF30B130C130E730A6')

// Chihaya
doIt('https://jhomes.to-kousya.or.jp/search/jkknet/service/akiyaJyokenDirect?jutaku_name=30B330FC30B730E330CF30A430E030C130CF30E4');

// Kasumidai
doIt('https://jhomes.to-kousya.or.jp/search/jkknet/service/akiyaJyokenDirect?jutaku_name=30AB30B930DF30C030A4');

// await page.screenshot({path: 'screenshot.png', fullPage: true});