# JavaScript модуль для Битрикс CMS для интеграции видео Rutube

## Описание
Модуль обрабатывает ссылки на странице где он подключен и при клике открывает всплывающее окно в котором проигрывается видео. Модуль может работать с композитным режимом.

## Установка

Разместите данные файлы в каталоге /local/js/ вашего сайта. Таким образом, что бы был следующий путь /local/js/vasoft/rutube

## Подключение

Для подключения модуля в некешируемой области разместите код 
```php
\Bitrix\Main\UI\Extension::load(['vasoft.rutube']);
```

Сформируйте ссылки следующим образом:
```html
<a href="https://rutube.ru/video/1be9f3696dc0908cccf275c8a4c5958a/" data-rutube target="_blank">Просмотр видео</a>
```

Это должен быть тег ссылки, обязательно заполнен атрибут href ссылкой на видео, которое необходимо проигрывать, а так-же задан атрибут data-rutube

Для активизации модуля на странице необходимо разместить следующий код
```html
<script type="text/javascript">
    if (typeof rutubeLinks === 'undefined' || rutubeLinks === null) {
        const rutubeLinks = new BX.Vasoft.RutubeLinks;
        rutubeLinks.init('');
    }
</script>
```
В качестве параметра методу init можно передать дополнительный селектор для отбора ссылок

## Сборка

Если требуется пересобрать модуль. Для этого необходимо использовать [@bitrix/cli](https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=43&LESSON_ID=12435&LESSON_PATH=3913.3516.4776.3635.12435)

Сборка во время разработки (наблюдение за изменениями) из каталога /local/js/vasoft/rutube
```bash
bitrix build -w 
```

Сборка для боевого сайта 
```bash
bitrix build --prod 
```


