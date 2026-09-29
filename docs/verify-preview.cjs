const { chromium } = require('C:/Users/wesleydev/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const out = path.resolve(__dirname, 'screenshots');
  fs.mkdirSync(out, { recursive: true });
  const report = [];
  for (const width of [390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 1000 }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => {
      document.querySelectorAll('img[loading="lazy"]').forEach(i=>i.loading='eager');
      for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) {
        window.scrollTo(0,y); await new Promise(r=>setTimeout(r,50));
      }
      await Promise.race([Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))),new Promise(r=>setTimeout(r,5000))]);
    });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: path.join(out, `nortgo-${width}.png`), fullPage: true, animations: 'disabled' });
    if (width === 390) await page.screenshot({path:path.join(out,'hero-mobile.png')});
    const checks = await page.evaluate(() => ({
      width: innerWidth, documentWidth: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
      headingCount: document.querySelectorAll('h1').length,
      missingImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src),
      brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => !document.getElementById(a.hash.slice(1))).map(a => a.hash),
      fonts: document.fonts.status,
      appOverflow: [...document.querySelectorAll('.ng-app-screen')].map(e => ({title:e.querySelector('h3').textContent,overflow:e.scrollHeight-e.clientHeight})),
      contentOverlap: [...document.querySelectorAll('.ng-app-content')].map(e=>({title:e.parentElement.querySelector('h3').textContent,overlap:Math.max(0,e.scrollHeight-e.clientHeight)})),
      forbiddenCopy: /captura inteligente/i.test(document.body.innerText),
    }));
    if (width === 390) {
      await page.getByRole('button', { name: 'Abrir menu' }).click();
      await page.getByRole('navigation', { name: 'Navegação móvel' }).getByRole('link', { name: 'Seu dia' }).click();
      checks.mobileMenuClosed = await page.locator('#ng-mobile-menu').count() === 0;
      checks.anchorNavigated = await page.evaluate(() => location.hash === '#seu-dia');
    }
    checks.moduleTabs = [];
    for (const name of ['Agenda','Tarefas','Rotinas','Finanças','Saúde','Notas']) {
      const tab = page.getByRole('tab',{name,exact:true});
      await tab.click();
      checks.moduleTabs.push({name, selected:await tab.getAttribute('aria-selected'), panel:await page.getByRole('tabpanel').getAttribute('aria-labelledby')});
    }
    await page.getByRole('tab',{name:'Notas',exact:true}).press('Home');
    checks.keyboardTab = await page.getByRole('tab',{name:'Agenda',exact:true}).getAttribute('aria-selected');
    await page.getByRole('link', {name:'Começar agora'}).first().click();
    checks.registerRoute = new URL(page.url()).pathname === '/register';
    await page.goto('http://127.0.0.1:5173/bem-vindo', {waitUntil:'networkidle'});
    checks.legacyRoute = await page.locator('h1').innerText();
    await page.getByRole('contentinfo').getByRole('link', {name:'Entrar'}).click();
    checks.loginRoute = new URL(page.url()).pathname === '/login';
    report.push({...checks, errors});
    await page.close();
  }
  const page = await browser.newPage({ viewport: {width:1440,height:1000}, reducedMotion:'no-preference' });
  await page.goto('http://127.0.0.1:5173/', {waitUntil:'networkidle'});
  await page.waitForTimeout(1000);
  await page.screenshot({path:path.join(out,'hero-desktop.png')});
  const hero = await page.locator('.ng-cinema-hero').evaluate(e=>({top:e.offsetTop,height:e.offsetHeight,viewport:innerHeight}));
  for(const p of [.25,.7]) {
    await page.evaluate(({top,height,viewport,p})=>window.scrollTo(0,top+(height-viewport)*p),{...hero,p});
    await page.waitForTimeout(180);
    await page.screenshot({path:path.join(out,`hero-scroll-${p}.png`)});
    report.push({heroProgress:p,phoneTransform:await page.locator('.ng-cinema-device').evaluate(e=>getComputedStyle(e).transform)});
  }
  await page.locator('.ng-module-tabs').scrollIntoViewIfNeeded();
  await page.waitForTimeout(850);
  await page.screenshot({path:path.join(out,'modulos-interativos.png')});
  const day = page.locator('#seu-dia');
  const positions = await day.evaluate(e=>({top:e.offsetTop,height:e.offsetHeight,viewport:innerHeight}));
  for(const p of [.1,.5,.9]) {
    await page.evaluate(({top,height,viewport,p})=>window.scrollTo(0,top+(height-viewport)*p),{...positions,p});
    await page.waitForTimeout(150);
    report.push({scrollProgress:p,activeStep:await page.locator('.ng-day-step-active h3').allTextContents()});
  }
  await page.screenshot({path:path.join(out,'centro-de-acao-desktop.png')});
  fs.writeFileSync(path.resolve(__dirname,'verification.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
