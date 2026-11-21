Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

Get-Command ffmpeg, ffprobe, py -ErrorAction Stop | Out-Null
if (-not (Test-Path '.venv/Scripts/python.exe')) {
    py -3 -m venv .venv
    if ($LASTEXITCODE -ne 0) { throw 'Could not create the Python environment.' }
    & '.venv/Scripts/python.exe' -m pip install -r requirements.txt
    if ($LASTEXITCODE -ne 0) { throw 'Could not install the studio dependencies.' }
}

if (Test-Path '.env') {
    foreach ($line in Get-Content '.env') {
        if ($line -match '^([A-Z][A-Z0-9_]*)=(.*)$') {
            [Environment]::SetEnvironmentVariable($Matches[1], $Matches[2], 'Process')
        }
    }
}
if (-not $env:BASE_URL) { $env:BASE_URL = 'http://localhost:10000' }
if (-not $env:STUDIO_PASSWORD) {
    $password = Read-Host 'Studio password (at least 16 characters)' -AsSecureString
    $env:STUDIO_PASSWORD = [System.Net.NetworkCredential]::new('', $password).Password
}
if ($env:STUDIO_PASSWORD.Length -lt 16) { throw 'Use a studio password of at least 16 characters.' }

Write-Host 'Studio listening on http://localhost:10000/upload'
& '.venv/Scripts/python.exe' -m uvicorn app:app --host 127.0.0.1 --port 10000 --no-access-log
