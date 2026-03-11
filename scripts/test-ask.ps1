param(
  [Parameter(Mandatory = $false)]
  [string]$ProfileId = "thiag",

  [Parameter(Mandatory = $false)]
  [string]$BaseUrl = "http://127.0.0.1:3000",

  [Parameter(Mandatory = $false)]
  [int]$PreviewMaxChars = 220,

  [Parameter(Mandatory = $false)]
  [string[]]$Questions = @(
    "Faça um resumo profissional deste candidato em até 5 linhas.",
    "Quais são as principais habilidades técnicas dele?",
    "Quais experiências profissionais ele teve e em quais empresas?",
    "Que projetos de IA ou dados aparecem no CV?",
    "Qual formação acadêmica e certificações estão no perfil?",
    "Qual é o nível de inglês informado no currículo?"
  )
)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

function Invoke-Ask {
  param(
    [string]$Url,
    [string]$ProfileKey,
    [string]$Question,
    [int]$MaxChars
  )

  $payload = @{
    profileId = $ProfileKey
    question  = $Question
  } | ConvertTo-Json -Compress

  $bytes = [System.Text.Encoding]::UTF8.GetBytes($payload)

  try {
    $params = @{
      UseBasicParsing = $true
      Uri             = "$Url/ask"
      Method          = "POST"
      ContentType     = "application/json; charset=utf-8"
      Body            = $bytes
      ErrorAction     = "Stop"
    }

    $resp = Invoke-WebRequest @params
    $json = $resp.Content | ConvertFrom-Json

    $fullAnswer = if ($json.answer) { [string]$json.answer } else { "" }

    [PSCustomObject]@{
      question        = $Question
      status          = [int]$resp.StatusCode
      ok              = [bool]$json.ok
      citations_count = ($json.citations | Measure-Object).Count
      top_score       = if (($json.citations | Measure-Object).Count -gt 0) { $json.citations[0].score } else { $null }
      answer_preview  = if ($fullAnswer) { $fullAnswer.Substring(0, [Math]::Min($MaxChars, $fullAnswer.Length)) } else { "" }
      answer_full     = $fullAnswer
      error_code      = $null
      error_message   = $null
    }
  }
  catch {
    if ($_.Exception.Response) {
      $r = $_.Exception.Response
      $bodyText = ""
      try {
        $reader = New-Object IO.StreamReader($r.GetResponseStream())
        $bodyText = $reader.ReadToEnd()
      }
      catch { }

      $errorCode = $null
      $errorMsg = $bodyText
      try {
        $obj = $bodyText | ConvertFrom-Json
        $errorCode = $obj.error.code
        $errorMsg = $obj.error.message
      }
      catch { }

      [PSCustomObject]@{
        question        = $Question
        status          = [int]$r.StatusCode
        ok              = $false
        citations_count = 0
        top_score       = $null
        answer_preview  = ""
        answer_full     = ""
        error_code      = $errorCode
        error_message   = $errorMsg
      }
    }
    else {
      [PSCustomObject]@{
        question        = $Question
        status          = -1
        ok              = $false
        citations_count = 0
        top_score       = $null
        answer_preview  = ""
        answer_full     = ""
        error_code      = "REQUEST_FAILED"
        error_message   = $_.Exception.Message
      }
    }
  }
}

Write-Host "Running ask tests for profileId='$ProfileId' at $BaseUrl" -ForegroundColor Cyan
$results = foreach ($q in $Questions) {
  Invoke-Ask -Url $BaseUrl -ProfileKey $ProfileId -Question $q -MaxChars $PreviewMaxChars
}

$results | Select-Object question, status, ok, citations_count, top_score, answer_preview | Format-Table -AutoSize

$outPath = Join-Path (Get-Location) "ask-test-results.json"
$results | ConvertTo-Json -Depth 8 | Set-Content -Encoding UTF8 $outPath
Write-Host "Saved JSON results to: $outPath" -ForegroundColor Green
