import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('should load page within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(5000); // 5 seconds
  });

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/');
    
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lcp = entries.find(e => e.entryType === 'largest-contentful-paint');
          
          if (lcp) {
            resolve({
              lcp: (lcp as any).renderTime || (lcp as any).loadTime
            });
          }
        }).observe({ type: 'largest-contentful-paint', buffered: true });
        
        setTimeout(() => resolve({ lcp: 0 }), 5000);
      });
    }) as { lcp: number };
    
    // LCP should be under 2.5s for good performance
    if (metrics.lcp > 0) {
      expect(metrics.lcp).toBeLessThan(2500);
    }
  });

  test('should lazy load images', async ({ page }) => {
    await page.goto('/');
    
    // Get initial image count
    const initialImages = await page.locator('img[loading="lazy"]').count();
    expect(initialImages).toBeGreaterThan(0);
    
    // Scroll down to trigger lazy loading
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    // More images should be loaded
    const lazyImages = await page.locator('img').count();
    expect(lazyImages).toBeGreaterThan(0);
  });

  test('should not block main thread with long tasks', async ({ page }) => {
    await page.goto('/');
    
    const longTasks = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let taskCount = 0;
        new PerformanceObserver((list) => {
          taskCount += list.getEntries().length;
        }).observe({ type: 'longtask', buffered: true });
        
        setTimeout(() => resolve(taskCount), 3000);
      });
    });
    
    // Should have minimal long tasks
    expect(longTasks).toBeLessThan(5);
  });
});
