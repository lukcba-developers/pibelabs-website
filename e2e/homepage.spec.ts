import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load and display hero section', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText(/PibeLabs|Innovación/i);
  });

  test('should navigate through sections', async ({ page }) => {
    // Test navigation
    await page.click('a[href="#services"]');
    await expect(page.locator('#services')).toBeInViewport();

    await page.click('a[href="#portfolio"]');
    await expect(page.locator('#portfolio')).toBeInViewport();

    await page.click('a[href="#contact"]');
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('should have no accessibility violations', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toBeVisible();
    
    // Test mobile menu
    const menuButton = page.locator('button[aria-label*="menu"]').first();
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await expect(page.locator('nav')).toBeVisible();
    }
  });

  test('should load images efficiently', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < Math.min(count, 5); i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('alt');
      await expect(img).toHaveJSProperty('complete', true);
    }
  });
});
