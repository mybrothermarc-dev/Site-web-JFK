@echo off
cd /d "%~dp0"
set "PATH=C:Program Files
odejs;%PATH%"
title Publier le site JFK
echo.
echo  ==============================================
echo   Publication du site Jesus Family Kingdom
echo  ==============================================
echo.
echo  1/3  Verification du site, environ 1 minute...
call npm run build -- --force > build.log 2>&1
if errorlevel 1 (
  echo.
  echo  [ERREUR] Le site ne peut pas etre construit. Rien n a ete publie.
  echo  Envoie le fichier build.log a Claude pour qu il corrige le probleme.
  echo.
  pause
  exit /b 1
)
echo       OK
echo.
echo  2/3  Enregistrement des modifications...
git add -A
git diff --cached --quiet
if errorlevel 1 git commit -q -m "Mise a jour du contenu depuis l admin - %date%"
echo       OK
echo.
echo  3/3  Envoi vers GitHub...
git push -q
if errorlevel 1 (
  echo.
  echo  [ERREUR] L envoi vers GitHub a echoue. Verifie ta connexion internet puis relance.
  echo.
  pause
  exit /b 1
)
echo       OK
echo.
echo  C est publie ! Le site en ligne sera a jour dans 2 minutes environ.
echo.
pause
