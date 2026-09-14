@echo off
cd /d "%~dp0"
set "PATH=C:\Program Files\nodejs;%PATH%"
title Admin JFK - laisse cette fenetre ouverte
echo.
echo  ==============================================
echo   Admin du site Jesus Family Kingdom
echo  ==============================================
echo.
echo  Le navigateur va s'ouvrir tout seul dans quelques secondes.
echo  Laisse cette fenetre ouverte pendant que tu travailles.
echo  Pour arreter l'admin : ferme cette fenetre.
echo.
if not exist node_modules (
  echo  Premiere utilisation : installation des outils, 2 a 3 minutes...
  call npm install
)
call npm run admin
pause
