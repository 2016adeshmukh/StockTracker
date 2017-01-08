require "http"
require "json"

username = "0678c8e25152e0d0274b9d63c7b8eb23" #input own username
password = "265f1d71952832034406481041f3e6c1" #input own password

request_url = "https://api.intrinio.com/companies?ticker=TSLA"

response = HTTP.basic_auth(:user => username, :pass => password)
			   .get(request_url)
			   .body

company = JSON.parse(response)
puts company