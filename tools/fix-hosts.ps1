# 临时注释 hosts 中所有指向 127.0.0.1 的 GitHub 相关屏蔽规则（保留可恢复）
$hostsPath = 'C:\Windows\System32\drivers\etc\hosts'
$lines = [IO.File]::ReadAllLines($hostsPath)
$out = New-Object System.Collections.Generic.List[string]
$changed = 0

foreach ($line in $lines) {
  if (($line -match '^\s*127\.0\.0\.1\s') -and ($line -match 'github')) {
    $out.Add('# [prism临时解除] ' + $line)
    $changed++
  }
  else {
    $out.Add($line)
  }
}

[IO.File]::WriteAllLines($hostsPath, $out, (New-Object Text.UTF8Encoding($false)))
ipconfig /flushdns | Out-Null
$message = "已注释 $changed 条 GitHub 屏蔽规则，并刷新 DNS 缓存。"
Write-Output $message
[IO.File]::WriteAllText(
  (Join-Path $PSScriptRoot 'fix-hosts.log'),
  ("{0}`r`n{1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $message),
  (New-Object Text.UTF8Encoding($false))
)
