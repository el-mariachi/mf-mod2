# Учебный проект в рамках курса "Яндекс-практикум. Мидл фронтенд-разработчик": Игра 

## О проекте

Проект по созданию браузерной игры на 
- TypeScript, 
- Canvas API,  
и игрового сайта с использованием в клиентской части:
- React & Redux,
- React-Router, 
- Redux-toolkit, 
- SCSS,
- Axios, 
- OAuth,
а также браузерных Web API: 
- Web Workers
- Performance API, 
- Fullscreen API, 
- Notifications API, 
- localStorage;
использованием в серверной части:
- ExpressJS,
- SSR (custom),
- Nginx,
- PostgreSQL, 
- Sequelize;
использованием для сборки и проч.:
- NodeJS, 
- Lerna,
- Vite,
- Lefthook,
- Docker(Compose), 
- Jest & RTL, 
- ESlint,
- Prettier,
- Yandex Cloud.

Для левел-дизайна игры использовался тайлсет [Pixel_Poem](https://pixel-poem.itch.io/dungeon-assetpuck), для создания иллюстраций на главной сайта использовалась нейросеть [Stable Diffusion](https://beta.dreamstudio.ai/) (UI от DreamStudio). 

Итоговое приложение - сайт игры "One Bit Dungeon", - развернуто в яндекс-облаке по [этому адресу](https://team7-onebit-dungeon.ya-praktikum.tech/sign-in).

## Команды

#### Cборка проекта:

Выполнить последовательно
```
yarn bootstrap — для установки зависимостей и создания нужных папок 
make run-db — запуск сервера БД в докер-контейнере (либо make run-admin для запуска БД с админкой), выполнить в корне; возможно потребуется предварительно почистить tmp/pgdata 
```
далее, для production-режима
```
yarn build — сборка клиентской части в production-режиме, выполнить в packages/client
yarn build — сборка серверной части в production-режиме, выполнить в packages/server
yarn start — запуск проекта, выполнить в packages/server
```
для development-режима
```
yarn dev — запуск проекта, выполнить в packages/server
```

#### Cборка проекта в докере:

Выполнить последовательно
```
yarn bootstrap — для установки зависимостей и создания нужных папок 
make run — сборка в production-режиме 
make run-dev — сборка в development-режиме 
make stop — остановка контейнеров
```

#### Прочие команды
```
yarn test - тесты
yarn lint - линтинг
yarn format - форматирование с помощью prettier
```

## Особенности реализации игры

Где живет функционал игры по папкам (относительно packages/client/src):

- game/controllers - бизнес-логика игры, разбитая на специализированные контроллеры
- game/data - данные для построения уровней
- game/objects - классы игровых объектов и их иерархии, в индексном файле инициализация типов игровых объектов по сериализованному представлению из game/data
- game/behaviors - аспекты поведения, которыми можно в различных комбинациях "обогащать" юнитов (игровые объекты с анимируемым поведением), в индексном файле функционал, связывающий поведения со спрайтовой анимацией
- game/ai - ИИ юнитов с правом хода (NPC) для генерации их поведения
- game/sprite - функционал спрайтовой анимации
- game/views - вьювки игровых объектов, анимирующие поведение объектов с помощью спрайтов
- game/animations - описания для анимации игровых объектов (motions), проч. функционал анимации (progress bar)
- game/scenes - экраны (страницы) игры, реакт-компоненты на базе канваса
- game/components - компоненты UI
- store/slices/game+hero, store/selectors - тут живет функционал redux для игры
- hooks/useGameController+useGameModalClose - хуки для реакт-компонентов игры
- types/game, constants/game, utils/game - типы, константы и утилиты для функционала игры

Интерфейс игры разбит на экраны (scene; в наст. момент - загрузки, игрового поля, результатов). Основа экрана - реакт-компонент на базе канваса. Экран игрового поля состоит из нескольких слоев - канвас статических игровых объектов, канвас анимируемых игровых объектов, канвас эффектов (пока не задействован), сверху слой html для UI игрового поля. Игровое поле - карта клеток, по которым в процессе игры перемещаются юниты в порядке предоставления хода, инициализируется из сериализованного представления текущего уровня в json формате. Redux используется для навигации по игре, хранения игровой статистики в процессе, передачи информации о событиях/взаимодействиях (interactions) в игре для UI и слоя эффектов игрового поля.
