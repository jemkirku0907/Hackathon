Add-Type -AssemblyName System.Drawing

function Generate-Smooth-Bird([string]$sourcePath, [string]$outputPath, [bool]$isDark) {
    $src = [System.Drawing.Bitmap]::FromFile($sourcePath)
    $w = $src.Width
    $h = $src.Height

    # Find bounds
    $minX = $w; $maxX = 0; $minY = $h; $maxY = 0
    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $p = $src.GetPixel($x, $y)
            $diff = if ($isDark) { [Math]::Max($p.R, [Math]::Max($p.G, $p.B)) } else { 255 - [Math]::Min($p.R, [Math]::Min($p.G, $p.B)) }
            if ($diff -gt 15) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }

    $cropW = $maxX - $minX + 1
    $cropH = $maxY - $minY + 1
    $padding = [int]([Math]::Max($cropW, $cropH) * 0.05)
    $targetDim = [Math]::Max($cropW, $cropH) + ($padding * 2)

    $dest = New-Object System.Drawing.Bitmap $targetDim, $targetDim, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $offsetX = [int](($targetDim - $cropW) / 2)
    $offsetY = [int](($targetDim - $cropH) / 2)

    for ($cy = 0; $cy -lt $cropH; $cy++) {
        for ($cx = 0; $cx -lt $cropW; $cx++) {
            $p = $src.GetPixel($minX + $cx, $minY + $cy)
            if ($isDark) {
                # Dark background: brightness from black is luminance
                $maxVal = [Math]::Max($p.R, [Math]::Max($p.G, $p.B))
                if ($maxVal -le 10) {
                    continue
                } elseif ($maxVal -lt 50) {
                    $alpha = [int](($maxVal / 50.0) * 255)
                    $dest.SetPixel($offsetX + $cx, $offsetY + $cy, [System.Drawing.Color]::FromArgb($alpha, $p.R, $p.G, $p.B))
                } else {
                    $dest.SetPixel($offsetX + $cx, $offsetY + $cy, [System.Drawing.Color]::FromArgb(255, $p.R, $p.G, $p.B))
                }
            } else {
                # Light background: difference from white
                $minVal = [Math]::Min($p.R, [Math]::Min($p.G, $p.B))
                $inv = 255 - $minVal
                if ($inv -le 8) {
                    continue
                } elseif ($inv -lt 60) {
                    $alpha = [int](($inv / 60.0) * 255)
                    # Unmultiply white
                    $dest.SetPixel($offsetX + $cx, $offsetY + $cy, [System.Drawing.Color]::FromArgb($alpha, $p.R, $p.G, $p.B))
                } else {
                    $dest.SetPixel($offsetX + $cx, $offsetY + $cy, [System.Drawing.Color]::FromArgb(255, $p.R, $p.G, $p.B))
                }
            }
        }
    }

    $src.Dispose()
    $dest.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $dest.Dispose()
    Write-Host "Generated: $outputPath ($targetDim x $targetDim)"
}

Generate-Smooth-Bird 'C:\Users\Cyril Jhune.CYRIL\.gemini\antigravity\brain\51274f68-d047-4b48-8d61-7e922508f455\.user_uploaded\media_1791862500945_8276c161.png' 'public\taga-bird-light.png' $false
Generate-Smooth-Bird 'C:\Users\Cyril Jhune.CYRIL\.gemini\antigravity\brain\51274f68-d047-4b48-8d61-7e922508f455\.user_uploaded\media_1791862500945_d36e3ac2.png' 'public\taga-bird-dark.png' $true
# Also create taga-bird.png as standard
Copy-Item 'public\taga-bird-light.png' 'public\taga-bird.png' -Force
