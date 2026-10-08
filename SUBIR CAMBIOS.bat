@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Subir cambios a jarconline.com

echo.
echo ===========================================
echo   SUBIR CAMBIOS A jarconline.com
echo ===========================================
echo.

REM --- Hay algo que subir? ---
git status --porcelain > "%TEMP%\jarc_estado.txt"
for %%A in ("%TEMP%\jarc_estado.txt") do if %%~zA==0 (
  echo   No hay nada nuevo. Todo lo que tienes ya esta subido.
  echo.
  del "%TEMP%\jarc_estado.txt" 2>nul
  pause
  exit /b 0
)
del "%TEMP%\jarc_estado.txt" 2>nul

echo   Esto es lo que cambiaste:
echo   -------------------------
git status --short
echo.
echo   -------------------------
echo.
echo   Escribe en una linea QUE cambiaste.
echo   Ejemplo: Actualiza suscriptores y agrega el cable UGREEN
echo.
set "mensaje="
set /p "mensaje=   Mensaje: "

if "%mensaje%"=="" (
  echo.
  echo   Sin mensaje no se sube nada. Cancelado.
  echo.
  pause
  exit /b 1
)

echo.
echo   Guardando...
git add -A
if errorlevel 1 goto :error

git commit -m "%mensaje%"
if errorlevel 1 goto :error

echo.
echo   Subiendo a GitHub...
git push origin main
if errorlevel 1 goto :error

echo.
echo ===========================================
echo   LISTO
echo ===========================================
echo.
echo   Netlify ya esta desplegando.
echo   En 1 o 2 minutos se ve en jarconline.com
echo.
echo   Si no lo ves, recarga con Ctrl + F5
echo   (eso ignora la copia guardada del navegador)
echo.
pause
exit /b 0

:error
echo.
echo ===========================================
echo   ALGO FALLO
echo ===========================================
echo.
echo   Lee el mensaje rojo de arriba.
echo   Lo mas comun:
echo.
echo     "rejected" o "non-fast-forward"
echo        Alguien subio algo antes que tu.
echo        Corre:  git pull origin main
echo        y vuelve a intentar.
echo.
echo     Pide usuario y contrasena
echo        GitHub ya no acepta la contrasena normal.
echo        Hay que usar un token. Pideselo a Claude.
echo.
echo   Tus cambios NO se perdieron: siguen aqui.
echo.
pause
exit /b 1
