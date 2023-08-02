const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const port = 3001;

// Enable all CORS requests
app.use(cors());

app.get('/pdf', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/resumeonly', {
    waitUntil: 'networkidle0',
  });

  const pdf = await page.pdf({ format: 'letter', printBackground: true });

  await browser.close();

  res.contentType('application/pdf');
  res.send(pdf);
});

app.listen(port, () => {
  console.log(`PDF server listening at http://localhost:${port}`);
});
