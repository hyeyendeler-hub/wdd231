Add-Type -AssemblyName System.Web
Add-Type -AssemblyName System.Net.Http
$html = Get-Content -Raw site-plan.html
$client = [System.Net.Http.HttpClient]::new()
$client.DefaultRequestHeaders.Add('User-Agent', 'PowerShell HTML Validator/1.0')
$client.DefaultRequestHeaders.Accept.Add([System.Net.Http.Headers.MediaTypeWithQualityHeaderValue]::new('application/json'))
$form = [System.Net.Http.MultipartFormDataContent]::new()
$form.Add([System.Net.Http.StringContent]::new($html), 'content')
$form.Add([System.Net.Http.StringContent]::new('json'), 'out')
$form.Add([System.Net.Http.StringContent]::new('html'), 'parser')
$response = $client.PostAsync('https://validator.w3.org/nu/?out=json', $form).Result
$responseString = $response.Content.ReadAsStringAsync().Result
Write-Output "STATUS: $($response.StatusCode)"
Write-Output "LENGTH: $($responseString.Length)"
$responseString.Substring(0, [Math]::Min(800, $responseString.Length))
