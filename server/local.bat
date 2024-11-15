rem   @echo off

echo %1

if "%1" EQU "skip" ( goto :server )

cd ..
cd client
call npm run build

:server

cd ..
cd server
call mvn clean package

docker compose up -d --build
