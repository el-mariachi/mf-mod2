# Конфигурации docker-compose

## docker-compose.yml

Продакшн конфиг для запуска на сервере. Запускает пакеты client, server, postgres. В пакете client работает nginx с конфигом из packages/client/nginx.conf и сертификатами от Let's Encrypt, которые собираются в контейнер из папки на виртуалке.

## docker-compose-local.yml

То же, что и выше, но используется другая сборка клиента, где используется локально выпущенный сертификат, а конфиги для nginx прокинуты в локальную папку packages/client/nginx_configs для отладки.
В браузере открывать http://localhost:3000

## docker-compose-dev.yml

Запускается сервер в контейнере с пробросом папок с исходниками в контейнер для отладки, а также postgres и админка&
В браузере открывать http://localhost:3001

## docker-compose-admin.yml

Запускается postgres и админка, сервер надо запускать локально.
В браузере открывать http://localhost:3001

## docker-compose-db.yml

Запускается только база.
В браузере открывать http://localhost:3001
