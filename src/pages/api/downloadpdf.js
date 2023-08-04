import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/resumeonly', {
      waitUntil: 'networkidle0',
    });

    const pdf = await page.pdf({ format: 'letter', printBackground: true });

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
  } catch (error) {
    console.error('Failed to generate PDF', error);
    res.status(500).json({ message: 'Failed to generate PDF' });
  }
}
