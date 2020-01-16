echo OFF

set serviceName=W3SVC


set ambiente=%1
set pathWebsites=%2
set pathBuild=%3



if "%ambiente%" == "" (
	echo "No se ha definido el ambiente a deployar.."
	goto :eof
)

if "%pathWebsites%" == "" set "pathWebsites=C:\website"
if "%pathBuild%" == "" set "pathBuild=C:\repo\paquery-scripts\windows\out-api"


if "%ambiente%" == "preprod" (
	echo "Se defino ambiente de PREPROD"
	set "pathDestino=%pathWebsites%\api-pre.paquery.com"
)

if "%ambiente%" == "PRODUCTION" (
	echo "Se definio ambiente de PRODUCTION"
	set "pathDestino=%pathWebsites%\api.paquery.com"
)


set "timestamp=%date:~-4%%date:~4,2%%date:~7,2%_%time:~0,2%;%time:~3,2%;%time:~6,2%.%time:~9,2%"
set "pathBackups=%pathWebsites%\backups\api\%timestamp%"


if not exist "%pathBackups%"  mkdir "%pathBackups%"

echo "creando backup... "
xcopy "%pathDestino%"  "%pathBackups%" /O /X /E /H /K /Q
echo "backup en %pathBackups%"


echo "Parando servicio de IIS"
iisreset /stop 


xcopy "%pathBuild%\_PublishedWebSites\Application.Api"  "%pathDestino%" /O /X /E /H /K /Y /Q
::echo "copiando: " "%pathBuild%\_PublishedWebSites\Application.Api"  "%pathDestino%" /O /X /E /H /K /Y


echo "Reiniciando servicio de IIS"
iisreset /start


echo ---- Post Deploy ----
cacls "%pathDestino%\Pdf" /t /e /g Users:F


echo ON