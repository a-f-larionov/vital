rem @echo off

cd ..
cd client
call npm run build

cd ..
cd server
call mvn clean install -DskipTests

ssh root@prod-server-2.ru "mkdir /var/job/lm/client"
ssh root@prod-server-2.ru "mkdir /var/job/lm/client/build"

scp -pr ../client/build/ root@prod-server-2.ru:/var/job/lm/client/

ssh root@prod-server-2.ru "mkdir /var/job/lm/server"
ssh root@prod-server-2.ru "mkdir /var/job/lm/server/target"

scp -pr ./docker-compose.yml root@prod-server-2.ru:/var/job/lm/server/
scp -pr ./Dockerfile root@prod-server-2.ru:/var/job/lm/server/
scp -pr ./.prod.env root@prod-server-2.ru:/var/job/lm/server/.env

ssh root@prod-server-2.ru "mkdir /var/job/lm/server/nginx"
ssh root@prod-server-2.ru "mkdir /var/job/lm/server/nginx/prod/"
rem ssh root@prod-server-2.ru "mkdir /var/job/lm/server/nginx/prod/conf.d/"
scp -pr ./nginx/prod/conf.d/ root@prod-server-2.ru:/var/job/lm/server/nginx/prod/conf.d/

scp -pr ./target/lm-0.0.1-SNAPSHOT.jar root@prod-server-2.ru:/var/job/lm/server/target/lm-0.0.1-SNAPSHOT.jar

ssh root@prod-server-2.ru "cd /var/job/lm/server && docker compose up -d --build"