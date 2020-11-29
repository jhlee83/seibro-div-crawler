const puppeteer = require("puppeteer");

const column = {
  rank: 1,
  isin: 2,
  sec_name: 3,
  sec_cat: 4,
  mkt: 5,
  dps: 6,
  dy_price: 7,
  dy_notional: 8,
  notional: 9,
  closing_m: 10,
};

const getRowData = async (page, index) => {
  let data = {};
  for (key in column) {
    data[key] = await page.$eval(
      `#grid1_cell_${index}_${column[key] - 1} > nobr`,
      (e) => e.textContent
    );
  }
  return Promise.resolve(data);
};

const getPageData = async (page) => {
  let data = [];
  const num_sec = await page.$$eval("tr.grid_body_row", (data) => data.length);
  for (let index = 0; index < num_sec; index++) {
    data.push(await getRowData(page, index));
  }
  return Promise.resolve(data);
};

const run = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const url =
      "https://seibro.or.kr/websquare/control.jsp?w2xPath=/IPORTAL/user/company/BIP_CNTS01042V.xml&menuNo=286";

    await page.goto(url, { waitUntil: "networkidle2" });
    await page.click("#image1");
    // grabbing team data
    const pageload_selector = "#grid1_cell_0_0 > nobr";
    await page.waitForSelector(pageload_selector);
    await page.waitFor(5000);
    let data = [];

    for (let pg_index = 1; pg_index <= 2; pg_index++) {
      await page.click(`#cntsPaging01_page_${pg_index}`);

      await page.waitForSelector(pageload_selector);
      data.push(await getPageData(page));
      await page.waitForNavigation();
    }
    console.log(data);

    await browser.close();
  } catch (e) {
    console.log(e);
  }
};

run();
