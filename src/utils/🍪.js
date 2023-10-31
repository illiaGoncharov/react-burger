// Функция для получения значения куки по имени
export function getCookie(name) {
    // Ищем совпадения в document.cookie с использованием регулярного выражения
    const matches = document.cookie.match(
        new RegExp(
            // Создаем регулярное выражение, которое ищет куку с заданным именем
            '(?:^|; )' +
            // eslint-disable-next-line no-useless-escape
            name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + // Экранируем специальные символы
            '=([^;]*)' // Захватываем значение куки
        )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Функция для установки значения куки
export function setCookie(name, value, props) {
    props = props || {}; // По умолчанию props - пустой объект
    let exp = props.expires; // Получаем срок действия куки из props
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000); // Вычисляем время истечения в миллисекундах
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString(); // Преобразуем дату истечения в строку
    }
    value = encodeURIComponent(value); // Кодируем значение куки
    let updatedCookie = name + '=' + value; // Создаем строку куки
    for (const propName in props) {
        updatedCookie += '; ' + propName; // Добавляем параметры куки
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue; // Добавляем значение параметра (если не равно true)
        }
    }
    document.cookie = updatedCookie; // Устанавливаем куку в документе
}

export function deleteCookie(name) {
    setCookie(name, '', { expires: new Date(0) }); // Устанавливаем куку с истекшим сроком действия
}

export function setCookieFromResponce(responce) {
    if (responce.success) {
        setCookie(
            "accessToken",
            responce.accessToken.split('Bearer ')[1]
        );
        setCookie("refreshToken", responce.refreshToken);
    }
}

export function getAccessToken() {
    return getCookie("accessToken");
}

export function getRefreshToken() {
    return getCookie("refreshToken");
}