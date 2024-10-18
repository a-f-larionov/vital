rem @echo off

cd ..
cd client
call npm run build

cd ..
cd server
call mvn clean package -DskipTests

ssh root@prod-server-2.ru "rm -Rf /var/job/vp/client"
ssh root@prod-server-2.ru "mkdir /var/job/vp/client"
ssh root@prod-server-2.ru "mkdir /var/job/vp/client/build"

scp -pr ../client/build/ root@prod-server-2.ru:/var/job/vp/client/

ssh root@prod-server-2.ru "mkdir /var/job/vp/server"
ssh root@prod-server-2.ru "mkdir /var/job/vp/server/target"

scp -pr ./docker-compose.yml root@prod-server-2.ru:/var/job/vp/server/
scp -pr ./Dockerfile root@prod-server-2.ru:/var/job/vp/server/
scp -pr ./.prod.env root@prod-server-2.ru:/var/job/vp/server/.env

ssh root@prod-server-2.ru "mkdir /var/job/vp/server/nginx"
ssh root@prod-server-2.ru "mkdir /var/job/vp/server/nginx/prod/"
rem ssh root@prod-server-2.ru "mkdir /var/job/vp/server/nginx/prod/conf.d/"
scp -pr ./nginx/prod/conf.d/ root@prod-server-2.ru:/var/job/vp/server/nginx/

scp -pr ./target/vp-0.0.1-SNAPSHOT.jar root@prod-server-2.ru:/var/job/vp/server/target/vp-0.0.1-SNAPSHOT.jar

ssh root@prod-server-2.ru "cd /var/job/vp/server && docker compose up -d --build"