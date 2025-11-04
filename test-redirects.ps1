# SEO Redirect Test Script
# Use this to verify redirects are working correctly

Write-Host "`n=== Testing PetYears.net Redirects ===" -ForegroundColor Cyan
Write-Host "This script tests HTTP→HTTPS and www→non-www redirects`n" -ForegroundColor Gray

# Test 1: HTTP non-www → HTTPS non-www
Write-Host "[Test 1] HTTP non-www → HTTPS non-www" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://petyears.net/" -MaximumRedirection 0 -ErrorAction Stop
    Write-Host "   ✓ Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   ✓ Location: $($response.Headers.Location)" -ForegroundColor Green
} catch {
    if ($_.Exception.Response.StatusCode -eq 301) {
        Write-Host "   ✓ Status: 301 Moved Permanently" -ForegroundColor Green
        Write-Host "   ✓ Location: $($_.Exception.Response.Headers.Location)" -ForegroundColor Green
    } else {
        Write-Host "   ✗ Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Test 2: HTTP www → HTTPS non-www
Write-Host "`n[Test 2] HTTP www → HTTPS non-www" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://www.petyears.net/" -MaximumRedirection 0 -ErrorAction Stop
    Write-Host "   ✓ Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   ✓ Location: $($response.Headers.Location)" -ForegroundColor Green
} catch {
    if ($_.Exception.Response.StatusCode -eq 301) {
        Write-Host "   ✓ Status: 301 Moved Permanently" -ForegroundColor Green
        Write-Host "   ✓ Location: $($_.Exception.Response.Headers.Location)" -ForegroundColor Green
    } else {
        Write-Host "   ✗ Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Test 3: HTTPS www → HTTPS non-www
Write-Host "`n[Test 3] HTTPS www → HTTPS non-www" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://www.petyears.net/" -MaximumRedirection 0 -ErrorAction Stop
    Write-Host "   ✓ Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   ✓ Location: $($response.Headers.Location)" -ForegroundColor Green
} catch {
    if ($_.Exception.Response.StatusCode -eq 301) {
        Write-Host "   ✓ Status: 301 Moved Permanently" -ForegroundColor Green
        Write-Host "   ✓ Location: $($_.Exception.Response.Headers.Location)" -ForegroundColor Green
    } else {
        Write-Host "   ✗ Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Test 4: Canonical URL (should load without redirect)
Write-Host "`n[Test 4] Canonical URL (should load normally)" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://petyears.net/" -MaximumRedirection 0 -ErrorAction Stop
    Write-Host "   ✓ Status: $($response.StatusCode) OK" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== Test Complete ===" -ForegroundColor Cyan
Write-Host "`nExpected Results:" -ForegroundColor Gray
Write-Host "   • Tests 1-3: Should return 301 redirect to https://petyears.net/" -ForegroundColor Gray
Write-Host "   • Test 4: Should return 200 OK (no redirect)" -ForegroundColor Gray
Write-Host "`nIf tests fail, ensure you've deployed the correct redirect configuration for your hosting platform." -ForegroundColor Gray
Write-Host "See .github/SEO_FIXES.md for deployment instructions.`n" -ForegroundColor Gray
