$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Net.Http
$s = Get-Content -Raw 'C:\Users\USER\Documents\Codex\Barry\secrets\development-2-elementor-mcp.json' | ConvertFrom-Json
$sec = ConvertTo-SecureString $s.application_password_dpapi
$ptr = [IntPtr]::Zero
try {
    $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec)
    $pw = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
    $client = [Net.Http.HttpClient]::new()
    $client.Timeout = [TimeSpan]::FromMinutes(3)
    $pair = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("$($s.username):$pw"))
    $client.DefaultRequestHeaders.Authorization = [Net.Http.Headers.AuthenticationHeaderValue]::new('Basic', $pair)
    $client.DefaultRequestHeaders.Accept.ParseAdd('application/json')
    $client.DefaultRequestHeaders.Accept.ParseAdd('text/event-stream')
    function Send-Mcp([hashtable]$message, [string]$session = '') {
        $req = [Net.Http.HttpRequestMessage]::new([Net.Http.HttpMethod]::Post, $s.endpoint)
        if ($session) { $req.Headers.Add('Mcp-Session-Id', $session) }
        $json = $message | ConvertTo-Json -Depth 30 -Compress
        $req.Content = [Net.Http.StringContent]::new($json, [Text.Encoding]::UTF8, 'application/json')
        $res = $client.SendAsync($req).GetAwaiter().GetResult()
        $body = $res.Content.ReadAsStringAsync().GetAwaiter().GetResult()
        if (-not $res.IsSuccessStatusCode) { throw "MCP $([int]$res.StatusCode): $body" }
        [pscustomobject]@{ Response=$res; Body=$body }
    }
    $ir = Send-Mcp @{jsonrpc='2.0';id=1;method='initialize';params=@{protocolVersion='2025-03-26';capabilities=@{};clientInfo=@{name='Barry';version='1.0'}}}
    $sid = ($ir.Response.Headers.GetValues('Mcp-Session-Id') | Select-Object -First 1)
    Send-Mcp @{jsonrpc='2.0';method='notifications/initialized';params=@{}} $sid | Out-Null
    $calls = @(
        @{name='elementor-mcp-update-container';arguments=@{post_id=2747;element_id='aa69916';settings=@{background_background='classic';background_color='#15325E';background_image=@{id=6679;url='https://dev2.mynewwebsite.co.za/wp-content/uploads/2026/06/solar-repair-pros-technician-tablet-dfw-ai-01.png';alt='Solar technician reviewing system data at a Dallas-Fort Worth home';source='library';size='full'};background_position='center center';background_repeat='no-repeat';background_size='cover';background_attachment='scroll';background_overlay_background='classic';background_overlay_color='#15325E';background_overlay_opacity=@{unit='px';size=0.82;sizes=@()};background_video_link=''}}},
        @{name='elementor-mcp-update-element';arguments=@{post_id=2747;element_id='8c6cd38';settings=@{typography_font_weight='700'}}},
        @{name='elementor-mcp-update-element';arguments=@{post_id=2747;element_id='780caa5';settings=@{ekit_heading_extra_title='<p>Customers receive clear explanations, practical options and careful checks before a repair or upgrade path is recommended.</p>'}}},
        @{name='elementor-mcp-update-element';arguments=@{post_id=2747;element_id='68b1cf1';settings=@{description_text='Service planning is shaped around Dallas-Fort Worth homes and businesses, common system layouts and practical property access conditions.';selected_icon=@{value='fas fa-map-marker-alt';library='fa-solid'}}}},
        @{name='elementor-mcp-update-element';arguments=@{post_id=2747;element_id='84bec0c';settings=@{description_text='Findings are explained in plain language, with realistic repair or upgrade paths and any remaining checks identified before work begins.';selected_icon=@{value='fas fa-list-alt';library='fa-solid'}}}},
        @{name='elementor-mcp-update-element';arguments=@{post_id=2747;element_id='7b4adf7';settings=@{description_text='Solar output, visible components, electrical capacity and equipment compatibility are reviewed before a recommendation is made.';selected_icon=@{value='fas fa-search';library='fa-solid'}}}}
    )
    $id = 10
    foreach ($call in $calls) {
        $r = Send-Mcp @{jsonrpc='2.0';id=$id;method='tools/call';params=$call} $sid
        $payload = $r.Body
        if ($payload.StartsWith('event:')) { $payload = (($payload -split "`n") | Where-Object { $_ -like 'data:*' } | Select-Object -First 1).Substring(5).Trim() }
        $obj = $payload | ConvertFrom-Json
        if ($obj.error) { throw ($obj.error | ConvertTo-Json -Compress) }
        $text = $obj.result.content[0].text
        Write-Output "CALL $id $text"
        $id++
    }
}
finally {
    if ($client) { $client.Dispose() }
    if ($ptr -ne [IntPtr]::Zero) { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr) }
}
