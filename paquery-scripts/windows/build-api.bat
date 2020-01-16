echo OFF
echo Buileando branch

set "cdOriginal=%cd%"

set "branchName=%1"
set "buildMode=%2"
set "pathRepo=%3"
::set pathApplication=%4
set "pathBuilder=%4"

set "initScript=VsDevCmd.bat"

set "targets=Build;Compile"

if "%pathRepo%" == "" 	set "pathRepo=C:\repo\api\paquery\webapp"

::if "%pathApplication%" == "" 	set "pathApplication=C:\website\api-pre.paquery.com"

if "%buildMode%" == "" 	set "buildMode=Release"


set "outDir=%cdOriginal%\out-api"

set "resultBuildPath=%outDir%\_PublishedWebSites\Application.Api"



if "%pathBuilder%" == "" set "pathBuilder=C:\Program Files (x86)\Microsoft Visual Studio\2017\BuildTools\Common7\Tools"

if not defined VSCMD_VER (
	call "%pathBuilder%\%initScript%"
)

:: del /S /Q "%outDir%\"*
if exist "%outDir%" (
	echo limpienado build anterior...
	rd /S /Q "%outDir%"
)



echo preparando el branch %branchName%

cd "%pathRepo%"

git fetch origin "%branchName%"
git checkout "%branchName%"
git reset --hard "origin/%branchName%"
git pull origin "%branchName%"

echo Restaurando packages NuGet...
nuget restore

echo buildeando aplicacion en %cd%...
MSBuild.exe   /target:%targets%   /property:Configuration=%buildMode%;OutDir="%outDir%"  "PaQuery Application.sln"


echo "eliminando archivos de config generados (Web.Config y packages.Config)"
del "%resultBuildPath%\Web.Config"
del "%resultBuildPath%\packages.config"
del "%resultBuildPath%\Global.asax"

echo volviendo a directorio original
cd "%cdOriginal%"

echo ON
