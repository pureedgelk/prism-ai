param(
  [Parameter(Mandatory = $true)]
  [ValidateSet('new-prompt', 'new-tutorial', 'publish')]
  [string]$Action
)

$ErrorActionPreference = 'Stop'
$root = Resolve-Path (Join-Path $PSScriptRoot '..')
$date = Get-Date -Format 'yyyy-MM-dd'

function New-DailyContent {
  param(
    [string]$Kind,
    [string]$SubDir,
    [string]$TemplateName
  )

  $targetDir = Join-Path $root "src\content\$SubDir"
  $template = Join-Path $root "templates\$TemplateName"

  Write-Host ''
  Write-Host "正在新建【$Kind】……" -ForegroundColor Cyan
  $slug = Read-Host '请输入英文短名（小写字母/数字/连字符，直接回车则自动编号）'
  if ($slug) { $slug = $slug.Trim().ToLower() }

  if ($slug) {
    $file = Join-Path $targetDir "$date-$slug.md"
  } else {
    $i = 1
    $file = Join-Path $targetDir "$date-$i.md"
    while (Test-Path $file) {
      $i++
      $file = Join-Path $targetDir "$date-$i.md"
    }
  }

  if (Test-Path $file) {
    throw "文件已经存在：$file，换个英文短名再试。"
  }

  $raw = [IO.File]::ReadAllText($template, [Text.Encoding]::UTF8)
  $raw = $raw.Replace('__DATE__', $date)
  [IO.File]::WriteAllText($file, $raw, (New-Object Text.UTF8Encoding($false)))

  Write-Host "已创建文件：$file" -ForegroundColor Green
  Write-Host '现在用记事本打开，按提示填完保存即可。' -ForegroundColor Green
  Start-Process notepad -ArgumentList $file
}

function Publish-Daily {
  Push-Location $root
  try {
    Write-Host ''
    Write-Host '第 1 步：本地构建检查……' -ForegroundColor Cyan
    npm run build
    if ($LASTEXITCODE -ne 0) {
      throw '构建失败，请根据上面的报错修改内容后再发布。'
    }

    Write-Host '第 2 步：检查改动……' -ForegroundColor Cyan
    git add -A
    $porcelain = git status --porcelain
    if (-not $porcelain) {
      Write-Host '没有需要提交的改动，无需发布。' -ForegroundColor Yellow
      return
    }

    Write-Host '第 3 步：提交并推送……' -ForegroundColor Cyan
    git commit -m "update: 每日更新 $date"
    if ($LASTEXITCODE -ne 0) { throw 'git 提交失败。' }
    git push
    if ($LASTEXITCODE -ne 0) { throw 'git 推送失败，请检查网络后重试。' }

    Write-Host ''
    Write-Host '发布成功！等待 1-2 分钟后刷新线上页面即可看到新内容。' -ForegroundColor Green
  }
  finally {
    Pop-Location
  }
}

switch ($Action) {
  'new-prompt' { New-DailyContent -Kind '提示词' -SubDir 'prompts' -TemplateName 'prompt-template.md' }
  'new-tutorial' { New-DailyContent -Kind '教程' -SubDir 'tutorials' -TemplateName 'tutorial-template.md' }
  'publish' { Publish-Daily }
}
