rem @echo off

cd ..
cd client
call npm run build

cd ..
cd server
call mvn clean install -DskipTests

docker compose up -d --build"