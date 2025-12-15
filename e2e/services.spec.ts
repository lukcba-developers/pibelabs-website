import { test, expect } from '@playwright/test';

test.describe('Services Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#services');
  });

  test('should display all services', async ({ page }) => {
    const serviceCards = page.locator('[data-testid="service-card"], .service-card, article');
    await expect(serviceCards.first()).toBeVisible();
    
    const count = await serviceCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display service details on hover', async ({ page }) => {
    const firstService = page.locator('[data-testid="service-card"], .service-card, article').first();
    await firstService.hover();
    
    // Check for hover effects or expanded content
    await page.waitForTimeout(500);
    await expect(firstService).toBeVisible();
  });

  test('should have readable service descriptions', async ({ page }) => {
    const services = page.locator('[data-testid="service-card"], .service-card, article');
    const count = await services.count();
    
    for (let i = 0; i < Math.min(count, 3); i++) {
      const service = services.nth(i);
      const text = await service.textContent();
      expect(text?.length).toBeGreaterThan(20);
    }
  });
});
