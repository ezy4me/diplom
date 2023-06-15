# Информационная система для автоматизации сферы по продаже одежды

Этот проект представляет собой информационную систему для автоматизации сферы по продаже одежды с использованием технологий PEVN (PostgreSQL, Express.js, Vue.js, Node.js). 

# Установка

Для начала работы с проектом, вам необходимо склонировать ветку master репозитория с помощью следующей команды:  
`git clone -b master https://github.com/ezy4me/diplom`
После того, как репозиторий успешно склонирован, вам потребуется установить зависимости для клиентской и серверной частей приложения.

# Установка зависимостей для серверной части

Перейдите в папку server:
`cd server`
Затем выполните следующую команду, чтобы установить необходимые зависимости:
`npm install`

# Установка зависимостей для клиентской части

Перейдите в папку app:
`cd app`
Выполните следующую команду для установки зависимостей:
`npm install`

# Запуск

После установки зависимостей вы можете запустить серверную и клиентскую части приложения.

## Запуск серверной части

В первую очередь необходимо задать серверные настройки:
1) Создать файл .env
2) Задать следующую конфигурацию:
`
PORT = YOUR_PORT, где YOUR_PORT Ваше значение порта (желательно установить значение либо 7000, либо 5000)

DB_NAME = YOUR_DB_NAME, где YOUR_DB_NAME имя Вашей Базы Данных.
DB_USER = YOUR_DB_USER, где YOUR_DB_USER имя пользователя (по умолчанию postgres)
DB_PASSWORD = YOUR_DB_PASSWORD, где YOUR_DB_PASSWORD пароль для доступа к Базе Данных, которое Вы указали
DB_HOST = localhost.
DB_PORT = YOUR_DB_PORT, где YOUR_DB_PORT порт сервера СУБД PostgreSQL (по умолчанию 5432).

SECRET_KEY = YOUR_SECRET_KEY, где YOUR_SECRET_KEY секретный ключ (значением может быть все что угодно)
`
В папке server выполните следующую команду:
`npm run dev`
Эта команда запустит серверную часть приложения, которая будет слушать соединения на указанном порту.

## Запуск клиентской части

В первую очередь необходимо создать файл переменных окружения:
1) Создать файл .env
2) Задать следующие настроки:
`
VUE_APP_API_URL = 'http://localhost:5000/'
VUE_APP_FURNITURE_API_URL = 'api/furniture/'
VUE_APP_MATERIAL_API_URL = 'api/material/'
VUE_APP_COLOR_API_URL = 'api/color/'
VUE_APP_SIZE_API_URL = 'api/size/'
VUE_APP_CUT_API_URL = 'api/cut/'
VUE_APP_CATEGORY_API_URL = 'api/category/'
VUE_APP_ORDER_API_URL = 'api/order/'
VUE_APP_ORDERSTATUS_API_URL = 'api/orderStatus/'
VUE_APP_PAYMENT_API_URL = 'api/payment/'
VUE_APP_SALE_API_URL = 'api/sale/'
VUE_APP_PRODUCT_API_URL = 'api/product/'
VUE_APP_SERVICE_API_URL = 'api/service/'
VUE_APP_REQUEST_API_URL = 'api/request/'
VUE_APP_REQUESTSTATUS_API_URL = 'api/requestStatus/'
VUE_APP_REQUESTTYPE_API_URL = 'api/requestType/'
VUE_APP_USER_API_URL = 'api/user/'
`

В папке app выполните команду:
`npm run serve`
Эта команда запустит клиентскую часть приложения и предоставит вам локальный IP-адрес, по которому можно открыть приложение в браузере.
