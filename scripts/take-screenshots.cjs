const { chromium } = require('playwright');
const path = require('path');

async function capture() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  // 1. Desktop 1440x900
  console.log('Capturing Desktop 1440x900...');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://localhost:3000/?intro=1', { waitUntil: 'networkidle' });
  // Wait for stage 3 animation (hero text and Get Started button)
  await desktopPage.waitForTimeout(2500);
  const desktopPath = path.join(__dirname, '../public/screenshots/desktop-1440x900.png');
  await desktopPage.screenshot({ path: desktopPath });
  console.log('Desktop screenshot saved to:', desktopPath);

  // 2. Mobile 390x844
  console.log('Capturing Mobile 390x844...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000/?intro=1', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(2500);
  const mobilePath = path.join(__dirname, '../public/screenshots/mobile-390x844.png');
  await mobilePage.screenshot({ path: mobilePath });
  console.log('Mobile screenshot saved to:', mobilePath);

  // 3. Auth Rejection Banner Desktop
  console.log('Capturing Auth Rejection State...');
  const authErrPage = await desktopContext.newPage();
  await authErrPage.goto('http://localhost:3000/?intro=1&auth_error=domain', { waitUntil: 'networkidle' });
  await authErrPage.waitForTimeout(2500);
  const authErrPath = path.join(__dirname, '../public/screenshots/auth-error-state.png');
  await authErrPage.screenshot({ path: authErrPath });
  console.log('Auth error screenshot saved to:', authErrPath);

  await browser.close();
  console.log('All screenshots captured successfully.');
}

capture().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
