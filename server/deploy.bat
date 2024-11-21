rem @echo off

call deploy-client.bat


cd ..
cd server
call mvn clean package

ssh root@prod-server-2.ru "mkdir /var/job/vp/server"
ssh root@prod-server-2.ru "mkdir /var/job/vp/server/target"

scp -pr ./docker-compose.yml root@prod-server-2.ru:/var/job/vp/server/
scp -pr ./Dockerfile root@prod-server-2.ru:/var/job/vp/server/
scp -pr ./.prod.env root@prod-server-2.ru:/var/job/vp/server/.env


ssh root@prod-server-2.ru "mkdir /var/job/vp/server/nginx"
ssh root@prod-server-2.ru "mkdir /var/job/vp/server/nginx/prod/"
scp -pr ./nginx/prod/conf.d/ root@prod-server-2.ru:/var/job/vp/server/nginx/prod/

scp -pr ./target/vp-0.0.1-SNAPSHOT.jar root@prod-server-2.ru:/var/job/vp/server/target/vp-0.0.1-SNAPSHOT.jar

ssh root@prod-server-2.ru "cd /var/job/vp/server && docker compose up -d --build"