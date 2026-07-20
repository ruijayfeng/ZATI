import { test,expect } from '@playwright/test';

async function completeQuickTest(page:import('@playwright/test').Page){await page.goto('/test/quick');await expect(page.getByText('请选择更接近你平时第一反应的一侧，而不是更正确的一侧。')).toBeVisible();for(let i=0;i<24;i++){await page.getByRole('radio',{name:'5 · 多数时候右侧反应'}).check();await page.getByRole('button',{name:i===23?'生成结果':'下一题'}).click()}await expect(page).toHaveURL(/\/reveal$/);await page.getByRole('button',{name:'跳过动画'}).click();await expect(page).toHaveURL(/\/result$/)}

test('homepage is framed without horizontal overflow',async({page})=>{await page.goto('/');await expect(page.getByRole('heading',{name:'以选择看见自己'})).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);await expect(page.getByText('从一次真实选择开始')).toBeVisible()});

test('answer scale fits a 320px viewport without horizontal overflow',async({page})=>{await page.setViewportSize({width:320,height:844});await page.goto('/test/quick');await expect(page.getByText('请选择更接近你平时第一反应的一侧，而不是更正确的一侧。')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true)});

test('quick assessment reaches an identity-first result',async({page})=>{await completeQuickTest(page);await expect(page.getByRole('heading',{level:1})).toBeVisible();await expect(page.getByRole('heading',{name:'四维人格轴'})).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true)});

test('reduced motion disables the long reveal animation',async({page})=>{await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');const duration=await page.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--z-route').trim());expect(duration).toBe('280ms')});

test('captures visual review artifacts',async({page},testInfo)=>{await page.goto('/');await page.screenshot({path:testInfo.outputPath('home.png'),fullPage:true});await page.goto('/test/quick');await page.screenshot({path:testInfo.outputPath('assessment.png'),fullPage:true});await page.evaluate(()=>localStorage.setItem('zati:result',JSON.stringify({version:1,mode:'quick',code:'AVLH',scores:{AR:50,VS:74,LI:59,DH:81},boundaries:{AR:true,VS:false,LI:false,DH:false},completedAt:new Date().toISOString()})));await page.goto('/result');await page.screenshot({path:testInfo.outputPath('result.png'),fullPage:true})});
