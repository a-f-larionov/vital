rem @echo off

cd ..
cd client
call npm run build

ssh root@prod-server-2.ru "rm -Rf /var/job/vp/client"
ssh root@prod-server-2.ru "mkdir /var/job/vp/client"
ssh root@prod-server-2.ru "mkdir /var/job/vp/client/build"

scp -pr ../client/build/ root@prod-server-2.ru:/var/job/vp/client/

ssh root@prod-server-2.ru "cd /var/job/vp/server && docker compose restart"