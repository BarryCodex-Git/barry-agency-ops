$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Net.Http
$secretPath = 'C:\Users\USER\Documents\Codex\Barry\secrets\development-2-elementor-mcp.json'
$s = Get-Content -Raw $secretPath | ConvertFrom-Json
$sec = ConvertTo-SecureString $s.application_password_dpapi
$ptr = [IntPtr]::Zero
try {
    $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec)
    $pw = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
    $client = [Net.Http.HttpClient]::new()
    $pair = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("$($s.username):$pw"))
    $client.DefaultRequestHeaders.Authorization = [Net.Http.Headers.AuthenticationHeaderValue]::new('Basic', $pair)
    $client.DefaultRequestHeaders.Accept.ParseAdd('application/json')
    $client.DefaultRequestHeaders.Accept.ParseAdd('text/event-stream')
    function Send-Mcp([string]$json, [string]$session = '') {
        $req = [Net.Http.HttpRequestMessage]::new([Net.Http.HttpMethod]::Post, $s.endpoint)
        if ($session) { $req.Headers.Add('Mcp-Session-Id', $session) }
        $req.Content = [Net.Http.StringContent]::new($json, [Text.Encoding]::UTF8, 'application/json')
        $res = $client.SendAsync($req).GetAwaiter().GetResult()
        $body = $res.Content.ReadAsStringAsync().GetAwaiter().GetResult()
        if (-not $res.IsSuccessStatusCode) { throw "MCP $([int]$res.StatusCode): $body" }
        [pscustomobject]@{ Response = $res; Body = $body }
    }
    $init = @{jsonrpc='2.0';id=1;method='initialize';params=@{protocolVersion='2025-03-26';capabilities=@{};clientInfo=@{name='Barry';version='1.0'}}} | ConvertTo-Json -Depth 8 -Compress
    $ir = Send-Mcp $init
    $sid = ($ir.Response.Headers.GetValues('Mcp-Session-Id') | Select-Object -First 1)
    Send-Mcp (@{jsonrpc='2.0';method='notifications/initialized';params=@{}} | ConvertTo-Json -Compress) $sid | Out-Null
    $lr = Send-Mcp (@{jsonrpc='2.0';id=2;method='tools/list';params=@{}} | ConvertTo-Json -Compress) $sid
    $payload = $lr.Body
    if ($payload.StartsWith('event:')) { $payload = (($payload -split "`n") | Where-Object { $_ -like 'data:*' } | Select-Object -First 1).Substring(5).Trim() }
    $tools = ($payload | ConvertFrom-Json).result.tools
    $tools | Select-Object name,description,inputSchema | ConvertTo-Json -Depth 20
}
finally {
    if ($client) { $client.Dispose() }
    if ($ptr -ne [IntPtr]::Zero) { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr) }
}
