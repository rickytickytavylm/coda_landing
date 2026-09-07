# Лендинг флагманского курса «Любить, не теряя себя» (landing_coda)

Отдельный продукт и автономный лендинг Школы доктора Шурова.
Структура и верстка полностью соответствуют высококонверсионному лендингу `open_week`, но перекрашены в фирменную фиолетово-лавандовую палитру `shurov-education` с текстами и модулями утвержденного курса (29 990 ₽).

```
landing_coda/
  index.html     разметка лендинга курса
  styles.css     стили (палитра violet/aura/ink из shurov-education)
  app.js         логика анимаций, модального окна и виджета оплаты
  config.js      конфиг цен (29 990 ₽), дат и интеграции GetCourse
  assets/        фото Василия Шурова и логотипы
```

## Как подключить форму GetCourse

В файле `landing_coda/config.js` укажите параметры виджета формы GetCourse:

```js
window.COURSE_CONFIG = {
  TITLE: "Любить, не теряя себя",
  DATES: "4 недели · 4 вебинара",
  TIME: "онлайн, видео + практика",
  PRICE: "29 990 ₽",
  GC_WIDGET_ID: "ваш_id",
  GC_WIDGET_HASH: "ваш_hash",
  GC_WIDGET_SRC: "https://ваш_домен.online/pl/lite/widget/script?id=..."
};
```

## Локальный просмотр

Открыть файл `landing_coda/index.html` в браузере или запустить любой статический локальный веб-сервер:

```bash
cd landing_coda
npx serve .
# или python -m http.server 8795
```
