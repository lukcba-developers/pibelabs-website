import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#contact');
  });

  test('should display contact form', async ({ page }) => {
    await expect(page.locator('form')).toBeVisible();
    await expect(page.getByLabel(/name|nombre/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/message|mensaje/i)).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    
    // Check for validation messages
    const nameField = page.getByLabel(/name|nombre/i);
    await expect(nameField).toBeFocused();
  });

  test('should validate email format', async ({ page }) => {
    await page.getByLabel(/name|nombre/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('invalid-email');
    await page.getByLabel(/message|mensaje/i).fill('Test message');
    
    await page.locator('button[type="submit"]').click();
    
    // Should show email validation error
    await expect(page.locator('text=/email.*valid/i')).toBeVisible({ timeout: 2000 });
  });

  test('should submit form successfully', async ({ page }) => {
    await page.getByLabel(/name|nombre/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('john@example.com');
    await page.getByLabel(/message|mensaje/i).fill('This is a test message from E2E test');
    
    // Intercept API call
    await page.route('**/api/contact', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Message sent' })
      });
    });

    await page.locator('button[type="submit"]').click();
    
    // Check for success message
    await expect(page.locator('text=/success|enviado|sent/i')).toBeVisible({ timeout: 5000 });
  });

  test('should handle form errors gracefully', async ({ page }) => {
    await page.getByLabel(/name|nombre/i).fill('Test User');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/message|mensaje/i).fill('Test message');
    
    // Simulate API error
    await page.route('**/api/contact', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' })
      });
    });

    await page.locator('button[type="submit"]').click();
    
    // Check for error message
    await expect(page.locator('text=/error|failed/i')).toBeVisible({ timeout: 5000 });
  });
});
