@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  Reescribiendo las tarjetas de recursos.html
echo  a partir de los datos de script-recursos.js
echo.
node scripts/generar-recursos.mjs
echo.
if errorlevel 1 (
  echo  ALGO FALLO. Lee el mensaje de arriba.
) else (
  echo  Listo. Ya puedes subir los cambios.
)
echo.
pause
