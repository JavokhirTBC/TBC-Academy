const RE=[[/(\d+) дн\. Таймер запустится при открытии первого урока/,'$1 kun. Taymer birinchi dars ochilganda ishga tushadi'],[/^(Направление|Продукт|Навык)(?= · )/,m=>({'Направление':'Yo‘nalish','Продукт':'Mahsulot','Навык':'Ko‘nikma'}[m])],[/(\d+)\s*мин(?![а-яё])/g,'$1 daq'],[/Вас ждет урок (\d+)!/,'Sizni $1-dars kutmoqda!'],[/Тест к уроку (\d+)/g,'$1-dars testi'],[/Урок (\d+)\./,'$1-dars.'],[/Вы на этапе (\d+) из 6/,'Siz $1-bosqichdasiz (6 tadan)'],[/Осталось: уроков (\d+); тестов (\d+)/,'Qoldi: darslar — $1; testlar — $2'],[/Нужно ответить верно минимум на (\d+) из (\d+) вопросов\./,'Kamida $1 ta savolga (jami $2 tadan) to‘g‘ri javob bering.'],[/Ваш ответ: вариант (\d+)/,'Sizning javobingiz: $1-variant'],[/Попыток осталось: (\d+)\. Лучший результат: (\d+) из (\d+)/,'Qolgan urinishlar: $1. Eng yaxshi natija: $2 / $3'],[/Попыток: (\d+)\./,'Urinishlar: $1.'],[/вес (\d+)% · (\d+) из 100/,'ulushi $1% · $2 / 100'],[/(\d+) дн\./g,'$1 kun'],[/(\d+) ч\./g,'$1 soat'],[/\s*из\s+(\d+)/g,' / $1']];
const PAIRS=[['Ежемесячно миллионы клиентов пользуются услугами TBC Bank: совершают платежи и переводы, оформляют кредиты, управляют счетами и вкладами. Но как работают эти продукты? В чем их особенности?','Har oy millionlab mijozlar TBC Bank xizmatlaridan foydalanadi: to‘lov va o‘tkazmalar qiladi, kredit rasmiylashtiradi, hisob raqamlari va omonatlarni boshqaradi. Lekin bu mahsulotlar qanday ishlaydi? Ularning o‘ziga xos jihatlari qanday?'],
['Отдел взыскания — это важное звено в финансовой системе компании. Его основная задача — взаимодействие с клиентами, имеющими просроченную задолженность, и поиск оптимальных решений для ее погашения','Undirish bo‘limi — kompaniyaning moliyaviy tizimidagi muhim bo‘g‘in. Uning asosiy vazifasi — muddati o‘tgan qarzdorligi bo‘lgan mijozlar bilan muloqot qilish va qarzni to‘lashning eng maqbul yechimlarini topish'],
['Дебетовая карта Humo для клиентов приложения TBC UZ. Выпуск и доставка бесплатны, переводы между картами в приложении без комиссии, возврат комиссии за снятие и пополнение.','TBC UZ ilovasi mijozlari uchun Humo debet kartasi. Chiqarish va yetkazib berish bepul, ilovada kartalar o‘rtasidagi o‘tkazmalar komissiyasiz, naqd pul yechish va hisobni to‘ldirish komissiyasi qaytariladi.'],
['Первый возобновляемый кредитный продукт банка. Льготный период: до 30 дней на покупки и до 25 дней на оплату после выписки, всего до 55 дней без процентов.','Bankning birinchi qayta tiklanuvchi kredit mahsuloti. Imtiyozli davr: xaridlar uchun 30 kungacha va ko‘chirmadan keyin to‘lash uchun 25 kungacha, jami 55 kungacha foizsiz.'],
['Срочные вклады от 3 месяцев в национальной валюте. Ставка и условия зависят от срока и суммы, актуальные данные смотрите на tbcbank.uz.','Milliy valyutada 3 oydan boshlab muddatli omonatlar. Foiz va shartlar muddat va summaga bog‘liq, dolzarb ma’lumotlar tbcbank.uz saytida.'],
['Потребительские и образовательные кредиты. Условия каждого продукта (график платежей, досрочное погашение) указаны в его продуктовой карточке на сайте банка.','Iste’mol va ta’lim kreditlari. Har bir mahsulot shartlari (to‘lov jadvali, muddatidan oldin so‘ndirish) bank saytidagi mahsulot kartochkasida ko‘rsatilgan.'],
['В приложении TBC UZ можно отправлять деньги на карты любых банков Узбекистана по номеру телефона или карты и оплачивать услуги.','TBC UZ ilovasida pulni telefon yoki karta raqami bo‘yicha O‘zbekistondagi istalgan bank kartasiga yuborish va xizmatlar uchun to‘lash mumkin.'],
['Банк TBC UZ, платёжное приложение Payme, рассрочка TBC Nasiya и платформа объявлений OLX Uzbekistan.','TBC UZ banki, Payme to‘lov ilovasi, TBC Nasiya muddatli to‘lovi va OLX Uzbekistan e’lonlar platformasi.'],
['Информация носит учебный характер. Актуальные условия продуктов уточняйте на tbcbank.uz.','Ma’lumotlar o‘quv xarakteriga ega. Mahsulotlarning dolzarb shartlarini tbcbank.uz saytida aniqlang.'],
['Прочитайте его и пройдите тесты, тогда вам будет доступен следующий урок!','Uni o‘qing va testlardan o‘ting, shunda keyingi dars ochiladi!'],
['Проверьте знания после каждого урока. Правильные ответы не показываются, в истории виден номер выбранного вами варианта.','Har bir darsdan keyin bilimingizni tekshiring. To‘g‘ri javoblar ko‘rsatilmaydi, tarixda siz tanlagan variant raqami ko‘rinadi.'],
['Рейтинг растёт, когда вы читаете уроки, сдаёте тесты с высоким результатом и регулярно занимаетесь на сайте.','Darslarni o‘qisangiz, testlarni yuqori natija bilan topshirsangiz va saytda muntazam shug‘ullansangiz, reyting o‘sadi.'],
['Введите номер телефона, указанный при регистрации, и код доступа: последние 4 цифры этого номера.','Ro‘yxatdan o‘tishda ko‘rsatilgan telefon raqamingizni va kirish kodini kiriting: bu raqamning oxirgi 4 ta raqami.'],
['Неверный номер или код. Проверьте данные или обратитесь к организатору обучения.','Raqam yoki kod noto‘g‘ri. Ma’lumotlarni tekshiring yoki o‘quv tashkilotchisiga murojaat qiling.'],
['Этот номер уже используется на другом устройстве. Завершите ту сессию или подождите, пока она закроется.','Bu raqam boshqa qurilmada ishlatilmoqda. O‘sha seansni yakunlang yoki u yopilguncha kuting.'],
['Окно неактивно. Вернитесь на вкладку, чтобы продолжить.','Oyna nofaol. Davom etish uchun varaqqa qayting.'],
['Тест не пройден. Перечитайте урок и пройдите тест снова.','Test topshirilmadi. Darsni qayta o‘qib, testni yana topshiring.'],
['Сначала прочитайте урок, тогда откроется тест','Avval darsni o‘qing, shunda test ochiladi'],
['Попытки закончились. Обратитесь к тренеру','Urinishlar tugadi. Trenerga murojaat qiling'],

['Нужно набрать: ','To‘plash kerak: '],['Осталось набрать: ','Yana kerak: '],['Осталось времени: ','Qolgan vaqt: '],['Осталось: ','Qoldi: '],['Место в потоке: ','Oqimdagi o‘rningiz: '],['Слишком много попыток. Подождите 15 минут.','Juda ko‘p urinish. 15 daqiqa kuting.'],
['Посмотрите на свой прогресс','Natijalaringizni ko‘ring'],['Изучено уроков','O‘rganilgan darslar'],['Пройдено тестов','Topshirilgan testlar'],['Средний процент верных ответов','To‘g‘ri javoblarning o‘rtacha foizi'],
['Из чего складывается рейтинг','Reyting nimalardan tashkil topadi'],['Прохождение уроков и тестов','Darslar va testlarni o‘tish'],['Качество тестов','Testlar sifati'],['Активность на сайте','Saytdagi faollik'],['Таблица потока','Oqim jadvali'],['Имена других участников скрыты.','Boshqa ishtirokchilarning ismlari yashirilgan.'],['Баллов рейтинга: ','Reyting ballari: '],['Ваше место: ','Sizning o‘rningiz: '],['участников: ',' ishtirokchilar: '],['Поток с ','Oqim: '],['Участник ','Ishtirokchi '],
['Вперед за знаниями!','Bilimlar sari olg‘a!'],['Вы прошли все уроки!','Barcha darslarni tugatdingiz!'],['Вас ждет первый урок!','Sizni birinchi dars kutmoqda!'],['Ничего не найдено.','Hech narsa topilmadi.'],
['← К списку уроков','← Darslar ro‘yxatiga'],['Прочитали урок? Переходите к тесту.','Darsni o‘qidingizmi? Testga o‘ting.'],['Я прочитал(а) урок, к тесту','Darsni o‘qidim, testga'],['Перейти к тесту','Testga o‘tish'],['Тест к этому уроку пройден.','Bu darsning testi topshirilgan.'],['К списку уроков','Darslar ro‘yxatiga'],['Этот урок пока закрыт.','Bu dars hozircha yopiq.'],['К урокам','Darslarga'],
['Перейти к итоговому тесту','Yakuniy testga o‘tish'],['Продолжить: тест к уроку ','Davom etish: test, dars '],['Начнем учиться','O‘qishni boshlaymiz'],['Начать тесты','Testlarni boshlash'],['Итоговое тестирование','Yakuniy test'],['Итоговый тест','Yakuniy test'],['К итоговому тесту','Yakuniy testga'],
['Отправить ответы','Javoblarni yuborish'],['Попытка одна.','Urinish bitta.'],['Ваши ответы','Sizning javoblaringiz'],['Ваш ответ: не отвечено','Sizning javobingiz: javob berilmagan'],['Мои ответы','Mening javoblarim'],['Пройти заново','Qayta topshirish'],['Открыть следующий урок','Keyingi darsni ochish'],['К списку тестов','Testlar ro‘yxatiga'],['Тест пройден.','Test topshirildi.'],['Проходной результат не достигнут.','O‘tish natijasi to‘planmadi.'],['Ответьте на все вопросы','Barcha savollarga javob bering'],
['Вход в обучение','O‘qishga kirish'],['Номер телефона','Telefon raqami'],['Код доступа (последние 4 цифры номера)','Kirish kodi (raqamning oxirgi 4 ta raqami)'],['Доступ до: ','Kirish muddati: '],['Доступ до','Kirish muddati'],['Срок курса: ','Kurs muddati: '],['Срок курса закончился','Kurs muddati tugadi'],
['Не пройден','Topshirilmagan']].sort((a,b)=>b[0].length-a[0].length);
const EX={'Главная':'Bosh sahifa','Уроки':'Darslar','Тесты':'Testlar','Прогресс':'Natijalar','Рейтинг':'Reyting','Личный кабинет':'Shaxsiy kabinet','Баллы':'Ballar','Выйти':'Chiqish','Продукты TBC':'TBC mahsulotlari','Доступен':'Ochiq','Закрыто':'Yopiq','Пройден':'Topshirilgan','Пройти':'Topshirish','Кандидат':'Nomzod','Обучение':'O‘qish','Отдел':'Bo‘lim','Поток':'Oqim','Вы':'Siz','Войти':'Kirish','Поиск':'Qidiruv','Отправить':'Yuborish','Тест':'Test','Кредитная карта Osmon':'Osmon kredit kartasi','Вклады':'Omonatlar','Кредиты':'Kreditlar','Переводы и платежи':'O‘tkazmalar va to‘lovlar','Экосистема TBC Uzbekistan':'TBC Uzbekistan ekotizimi'};
function tr(s){RE.forEach(([r,t])=>{s=s.replace(r,t)});PAIRS.forEach(([a,b])=>{s=s.split(a).join(b)});const k=s.trim();return EX[k]!==undefined?s.replace(k,EX[k]):s}
const trs=s=>S.lang==='uz'?tr(s):s;

const IC={main:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',lessons:'<path d="M4 5h6a2 2 0 012 2v12a2 2 0 00-2-2H4zM20 5h-6a2 2 0 00-2 2"/>',tests:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM8.5 12h7M8.5 16h5"/>',progress:'<path d="M4 19V5M4 19h16"/><path d="M8 15l4-4 3 3 5-6"/>',rating:'<path d="M8 4h8v5a4 4 0 01-8 0z"/><path d="M8 6H4v1a3 3 0 003 3M16 6h4v1a3 3 0 01-3 3M12 13v4M8 20h8"/>',profile:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'};
Object.keys(IC).forEach(k=>IC[k]=`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${IC[k]}</svg>`);
const PR=[{e:'💳',t:'Salom Card',d:'Дебетовая карта Humo для клиентов приложения TBC UZ. Выпуск и доставка бесплатны, переводы между картами в приложении без комиссии, возврат комиссии за снятие и пополнение.',g:'linear-gradient(135deg,#ffd1ea,#e6defc)'},
{e:'🛍️',t:'Кредитная карта Osmon',d:'Первый возобновляемый кредитный продукт банка. Льготный период: до 30 дней на покупки и до 25 дней на оплату после выписки, всего до 55 дней без процентов.',g:'linear-gradient(135deg,#d6f7f1,#e6defc)'},
{e:'🏦',t:'Вклады',d:'Срочные вклады от 3 месяцев в национальной валюте. Ставка и условия зависят от срока и суммы, актуальные данные смотрите на tbcbank.uz.',g:'linear-gradient(135deg,#ffe6c7,#ffd1ea)'},
{e:'💸',t:'Кредиты',d:'Потребительские и образовательные кредиты. Условия каждого продукта (график платежей, досрочное погашение) указаны в его продуктовой карточке на сайте банка.',g:'linear-gradient(135deg,#e6defc,#d6f7f1)'},
{e:'📲',t:'Переводы и платежи',d:'В приложении TBC UZ можно отправлять деньги на карты любых банков Узбекистана по номеру телефона или карты и оплачивать услуги.',g:'linear-gradient(135deg,#d6f7f1,#ffe6c7)'},
{e:'🌐',t:'Экосистема TBC Uzbekistan',d:'Банк TBC UZ, платёжное приложение Payme, рассрочка TBC Nasiya и платформа объявлений OLX Uzbekistan.',g:'linear-gradient(135deg,#ffd1ea,#d6f7f1)'}];
const prc=x=>`<div class="pc"><div class="im" style="background:${x.g}">${x.e}</div><div class="bd"><h3>${x.t}</h3><p class="mu" style="margin:0">${x.d}</p></div></div>`;
const note='<p class="note">Информация носит учебный характер. Актуальные условия продуктов уточняйте на tbcbank.uz.</p>';
function gauge(p,s){const r=s/2-6,c=2*Math.PI*r,col=p>=70?'#16d1a8':'#ff5a36',em=p===0?'😐':p<50?'🙂':p<80?'😊':'😎',m=s/2;
 return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}"><circle cx="${m}" cy="${m}" r="${r}" fill="none" stroke="#e3e6ee" stroke-width="5"/>${p?`<circle cx="${m}" cy="${m}" r="${r}" fill="none" stroke="${col}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${c*p/100} ${c}" transform="rotate(-90 ${m} ${m})"/>`:''}<text x="${m}" y="${m+5}" text-anchor="middle" font-size="14" font-weight="700" fill="#6b7280">${p}%</text><text x="${s-10}" y="12" font-size="13" text-anchor="middle">${em}</text></svg>`}


// ===== Академия Soft Collection: клиентская часть =====
const LOGO = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAL30lEQVR42u2deZAcVR3HP927m012ExJFIocaDzwCSQFKxCJUMKAQYwVjIsipWFEBxTtELdFC0UIRiUlplZZVHvyBQlmKF2KRkChEJYUigkIoFaE0eGwC5DLZnZn2j/79sr+8vJ7pnunu2c32q+qa2d6e6fd+x/d39huoRjWqMX5GWJGgeyNION8j/wuA3ibXVSMH4h8H9KVgSsWEHEePvF4NRMBy+VsZsQz4JXAf8GlgcgVX+RP/dCF+A1hopPwMOW+Pu4CpwoBKEzqEnR5gANgixP2H/K3jHmHKPqAurxHwE/l/ZRM6GL3y+mUj3XeY/78MqAkDrAYMy+u1zvdUow3omS/E3OcQFWCFnBtxGNAw5xY531eNDNAzCXjQkeql5rqvJTAgEjhqAE8CzxV7UBnljNDzKYfAIwI7OjbI+ZqHAfb8jyooyh7pHgfsFSIqIZ8AphhibjHSHiUcyrx3V1CUDfs3GilWBmww1z0b2G4wP4kBDWHQTuDFAm8VFLUg/goP9ESC+TqONeebMcBC0bpKC5pDTwjMBIZEausOAz5krj85JfFdKLq8YkJz6b/JY1j1/Tnm+telwH8fFD0NPL+CIj/xz0jwalTKTzKfWd7CA2oGRbdVWnCwz98P/Nkj1Ur83cDR5nNvbxIDpGHCuWOFCeEYkP46cBUwWwhk5xTJ6zbxejSvM9ABwyNgNTBD3k/YXJFmK18iEu7L66g23O8EUx9pUwOsFnx1LARoYZfhJwLWGol2pVE1YMiZ76QO11wXj+gUYUjPRGOAQs8yYLG89xHBZUCQAwMCs/avmPsGE4UBKvnTgBtT4vA2h0hBDgJQk3jichGAcKIwIBSs/yQwK+Xiny5ICxvEKe6j5H14qDNA8fd44ANNoMcdzxSoic8CvtAtjyjsAvwArDE4nmbRO52/R3K2RZcAp2UQiHHJAF3sBcCZGRe7x/l7uID5remGQQ5LlPwImA58MYO66zX7nPN7cxaMGvBK4LKyDXJY4n0axFWuY9pY5D7HLd1T0Pw+Axwh9wkPFQao4Z0DXNkmzjacv3flDBWhEP1w4LNyv+BQYYAuZHVGw2uvG3E0YEcBWK2CsgJ4VVkGuWgGqOE9jziH3+6iopLcUp3zag6BoUWPacDjjBZF2kmcLXFSEHMYTdw1yJ6QS3PP8w1DxqUGqGH7GPCCDr2L0NGEZ3L2hHwe2+eJe0wLDdDCgon/UuDD8r4TSerzQNCugp2GWcCqbqUo8sB+gB+TvXTog4OL5Pt6zfc/Qra6cJZD4XI38CIKrCGHBRG/TpxmXtKhN6GQ0++R0KEEA50nDA0IFBUGQ2FBE+8HvpTjxAc83srWAhngenCnF+WWhgVMugG8D3hFjvg5zcOAJ0qE1BvGAwSp4T0K+ETOxuswz7m/l2TL6sSFm4uL0IIwZ/hpSCg/I2fcPMxjFx4rIBpuBqvXFbCu3BigknIKcGkBkjLdEF8Z8DijSbOoQAaoZh9NXD0bc26pNlf1Ej+p2InbmeSG/swQQ6VvhnhCRUTDSW7pCDDXrHlM+fzvypn49rt+a5gdGCb8rsBYIGkud5SRosia75kubmE9Z2Lodz1s1N5K382036DVCRMW58WEMCd8XEkxnQUWbnyxwB+6IHQRcRG/jy63Nioez5K8TL0ALPY154ZG8s4sEYJcLbii21CkN/5OAdjvY8RcjyGeSVycKcMQu09g/ou4paUrT+Qr8U+WCdUKXnBE/PyAvbdC3T0lCEDSEzfXdaoFneL19SX4xOrjH+ngv953fcE5oWYpl/dLtrRt2xe2efM68SNDCym+dqqEPcY5r4X62yixi8GTLb22TGOsbuck4E+0V2ZsV93XyBx6PQJ0V8nuqIVHzRWVYpB18VeUiLtK1O96FmltUa0Ee5TkEa0vgwEq/TOI92AoQ/rtIn+RAJu66Hc6TGswToOzVp7P57oUfd7dxG7p3N4APOp8tl7S/B4QhCjELbVB186Cgq5WC9zYwnFQJkwFPi71AovVtRLm+A6PncpV+r/VBWOncHJzChXvcWoI75F0hQ3oagUIjwrkY8Bg3lqg20KeKMQoU/p9O570prBVrqF+M3CnR2obBWjBVXlrgS7m9i5EnOrmDRE3zgZk6yt1ibAAuJWDt0Jo5KgF/zVzDfMi/sIuEN/ulHVZBx6GaoQlxonAN4m76/JkxIjJluaWrg6B33SBAcNN/H93jr1y9DjvA49AWUYcT7wNzh4PlHRSOdtJ3I7ZkRao+i7rIvHXEW/E6jNqacuCPR5mhM5nZzsa0ehgvaoF30ijBc22/lUMvV8mWFa+ZUSKHeuAN4l0Bk6yTfNRSJ1giUTD0yU9vQXYLHPf4YHUhllPYL5rDnFLzflOvinLuq0mnSTVvICDHzJJJf2Xlij9drvJ75O8BbHObYC4BWZ7k+/8J/A94t7SIzzfEyZoxHzjdLRjH5Ret7RjCxS3BsWvLSPlYGvJaxOytXbryQXAHx21H5GFjySkIv4jxaOzHe+ox6kxWGItlQi3Hfuga5qXlQk6ufeWJP01owEf9FS93MlfzYHbmbXatK/mWcNDxM8tvNBjUwKH2f3Eu7MMeYQlzbp+noUBevOpxL2XRUv/iJHORUYAAo8v/zwDC+3Mq+HJDe0QrZifEHxaos0Cvu2Ze5pq3mvTMsHdj6dWIN7rd28i3jMIDzToOIe47SWvTGfdQ8D1xFuhhR5G2HktYnRH31YNAWnzWAd4PjOk4FyU9FumrmX0ua9ejyBMJn5gLipIIHy5ofvE+ej3xA8qFFOkHlxLoQ16zRtbaUHR0m+9nCHj6uF4Iwo/8xhtdaxTTlrZ3uNByW72JxhsgFPNHJMEVum4uVlgptI/SLxHf97SX3NU/VgP3veauaxidMf0bpQZaw4jLnSaAXrMfPulOaGZluq5pUmJOj1xZc7Sb6V+n+TpXYy3Uj+X0U25y264asWIX0vBx87fEvJsU4Nw7ZSvaHOQ9E8G/paj9NvJ32v84cAQ3Ur9SuIOuLJLilkZ8UOJmK3w6jpmAj9IgKTE54/1wxfnJP3Ww9lLvEFHnwM5FkfnAb8q0NAWESzuEdg53GixfZR2lRGgmhNNP+RqgQYdv+8wCeXi9QbiPRfc++iNp4knMVxQgaTowDESyLnErLHPCNfrpXnB0kU/e4FrCxZ2iLl2Uv9mtHHV5lwsXr7FUzyPxtHRcITtp8QPJWL6piDumttsmJCoBbe06XFYtawDX2e0gy3wGKoTGH14e6xhfadwu9OkUjDu66BU4SwTIuCtGC7tIluHsWuYbgdek2CYIH524EaTb6912cMpEpbuNJG93d/0elPrqItmhADXZIABl/CbJWdvCd/ndCZ8VGBpvMJNu4HmhU7FDuJ9MyzULwX4q3y40YLDbnBykTE4PQ63B4g3RP1LgV0I40Eb1joBG8DbDAM2kYKjlmgPOOF56ITqg1JAf3gCEj7JNmwg/iktTJHpXMOE/amHYVPQcGHibnGd+jyWXgOQlR6Jr08wwie55Y8aL2mSqbottwGYe2wVr+a0Fl0FN3gwfqIT3seErSYH1ucW5c8SCR+Q4GKTSP1TRuIbRo3OEihabDhap/ptlqRRMw0OpwraBGSs+J8gRfAt+Hs3K2lPpwnn2Si4lwO3E6s7RJ8tUr5UOBd62jqqnwhM365SB17uS0MrQadIf80CSb2+2vHra1Q/jJmlN8huLqL2c6O5Zj8DdBuwmyRP4+KXTVs3WjQZBSmav7Ju3FoUkbJeEzX5X+Ck2n1zv0Zsq9J7PwP0y26VBqYjgedId0T/GJGovEaWX+FoVwB2E//qx5Pimj8iKYp7cbrkkm7QL8Q/TNLGU+VVj0E5NyjHFPGgpoiXpEe/eEl95rXPpCxCkxV0j6AEDYiMRjdMclG7JoalkjcM/E9yWbvk2CHHdiH2Nmmv0den5DM4KflGMw73mEnlPXpNUdsefea9vSZ02kIiDu5cS0vomllrjQP7+esmx2UDUfeI2tS2sBl0BynVNK3aRp7XiENjBA4dghbGNxV0BiVOPo95BB3ATafXHSqCVI1qjKHxf3VkJUl+o1orAAAAAElFTkSuQmCC';
const $ = s => document.querySelector(s);
(function () { const s = document.createElement('style'); s.textContent = '.mg{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:12px}.mg>div{border:1px solid var(--bd);border-radius:14px;padding:10px}.mthumb{height:110px;display:flex;align-items:center;justify-content:center;background:var(--pr2);border-radius:10px;overflow:hidden;font-size:36px;margin-bottom:6px}.mthumb img{width:100%;height:100%;object-fit:cover}'; document.head.appendChild(s); const t = document.createElement('style'); t.textContent = `body.adm{background:#fff;color:#2b2f36}
.adm .top{background:#fff;border-bottom:1px solid #e3e8ee}.adm .brand{color:#0d8abf;font-weight:600}
.adm .wrap.lay{max-width:none;padding:16px 24px 60px;grid-template-columns:230px minmax(0,1fr)}
.adm aside{background:#fff;border:1px solid #e3e8ee;border-radius:4px;padding:6px 0;top:12px}
.adm nav button{border:0;border-left:3px solid transparent;border-radius:0;padding:11px 16px;font-weight:500;background:none;color:#2b2f36}\n.adm button.lnk{background:none;border:0;color:#0d8abf;text-decoration:underline;padding:4px 0}
.adm nav button.on{background:#eaf5fa;border-left-color:#0d8abf;color:#0d8abf}.adm nav button.on::after{display:none}
.adm .card{border-radius:4px;border:1px solid #e3e8ee;background:#fff}.adm h1{font-size:19px;font-weight:500}.adm h2{font-size:16px;font-weight:600}
.adm button{border-radius:4px;background:#0d8abf;border:1px solid #0d8abf;color:#fff;font-weight:500;padding:9px 16px}
.adm button.sec{background:#fff;color:#0d8abf;border-color:#0d8abf}.adm button.sm{padding:5px 11px;font-size:13px}
.adm button.bgreen{background:#3cb371;border-color:#3cb371;color:#fff}.adm button.bgreen.sec{background:#fff;color:#2e9c5d}
.adm button.borange{background:#e8960c;border-color:#e8960c;color:#fff}.adm button.bblue{background:#5bc0de;border-color:#5bc0de;color:#fff}.adm button.bred{background:#e8402c;border-color:#e8402c;color:#fff}
.adm button[onclick*="Del"]:not(.bred):not(.ic){background:#fff;color:#e8402c;border-color:#e8402c}
.adm button.ic{background:none;border:0;color:#6a6e7a;padding:4px 7px;font-size:16px;line-height:1}.adm button.ic.red{color:#e8402c}.adm button.ic:disabled{opacity:.3}.adm button.ic:hover{background:#eef1f5}
.adm input[type=text],.adm input[type=number],.adm input[type=email],.adm input[type=password],.adm input[type=date],.adm select,.adm textarea{border-radius:4px;background:#fff;border:1px solid #cfd6df;padding:9px 12px;font-size:14px}
.adm label.f{font-size:12px;color:#6a6e7a;margin:14px 0 4px;font-weight:400}.adm .tag{border-radius:3px}.adm .tag.ok{background:#e1f4e8;color:#2e8b57}
.adm .crumb{font-size:12px;margin:0 0 8px}.adm .crumb a{color:#0d8abf;text-decoration:none}
.tb{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;background:#eef1f5;margin-bottom:22px}.tb h1{font-size:17px;font-weight:500;margin:0;padding:11px 16px}
.tabs{display:flex;flex-wrap:wrap}.tabs a{padding:13px 16px;color:#0d8abf;text-decoration:none;font-size:13px}.tabs a.on{background:#0d8abf;color:#fff}
.form{max-width:760px;margin:0 auto}.form.wide{max-width:1000px}.grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0 18px}.req{color:#e8402c}
.fb{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;background:#f1f2f4;border-top:1px solid #e3e8ee;padding:14px 18px;margin-top:26px}
.badge{display:inline-block;font-size:11px;font-weight:700;color:#fff;border-radius:3px;padding:2px 8px}.badge.l{background:#0d8abf}.badge.t{background:#3cb371}.badge.m{background:#6c757d}
.mrow{display:flex;align-items:center;gap:10px;padding:13px 6px;border-top:1px solid #e9edf2}.mrow.mh{background:#f6f8fa}.mrow a.tt{color:#0d8abf;text-decoration:none}.mrow a.tt:hover{text-decoration:underline}
.imgbox{display:flex;align-items:flex-start;gap:12px}.imgup{width:200px;height:200px;border:1px dashed #cfd6df;border-radius:4px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-size:13px;cursor:pointer;color:#2b2f36;background:#fff}
.imgprev{width:200px;height:120px;border-radius:4px;background-size:cover;background-position:center;cursor:pointer;border:1px solid #cfd6df}
.split{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:20px;align-items:start}@media(max-width:900px){.split{grid-template-columns:1fr}}
.pvwrap{background:#f4f6f9;border-radius:4px;padding:10px;position:sticky;top:12px}.pvbar{font-size:12px;color:#6a6e7a;margin-bottom:8px}.pv{background:#fff;border-radius:4px;overflow:hidden;max-height:72vh;overflow-y:auto}
.pvh{min-height:150px;background:linear-gradient(135deg,#1f6f64,#6a4c93 60%,#c2589c);background-size:cover;background-position:center;color:#fff;padding:18px;display:flex;flex-direction:column;justify-content:flex-end;gap:8px}.pvh h2{margin:0;font-size:22px;color:#fff}.pvb{align-self:flex-start;background:#111;color:#fff;font-size:12px;padding:3px 10px;border-radius:3px}
.pvc{padding:16px 18px}.pvc p{max-width:none}.tbr{display:flex;gap:6px;margin-bottom:4px}
.seg{display:flex;background:#eeedfb;border-radius:999px;padding:4px;margin:12px 0}.seg button{flex:1;background:transparent;border:0;color:#111216;border-radius:999px;padding:9px 12px}.seg button.on{background:#111216;color:#fff}
.lgh{display:flex;align-items:center;gap:10px;font-weight:800;line-height:1.15;margin-bottom:14px}`; document.head.appendChild(t); })();
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmt = d => { d = String(d || '').slice(-9); return '+998 ' + d.slice(0, 2) + ' ' + d.slice(2, 5) + ' ' + d.slice(5, 7) + ' ' + d.slice(7); };
[['Модуль', 'Modul'], ['Уроки модуля', 'Modul darslari'], ['Тест модуля', 'Modul testi'], ['Откроется в день ', 'Ochiladi: '], ['Сначала пройдите предыдущий модуль', 'Avval oldingi modulni tugating'], ['Прочитано', 'O‘qilgan'], ['Не прочитано', 'O‘qilmagan'], ['Открыть', 'Ochish'], ['Далее', 'Keyingi'], ['Назад', 'Orqaga'], ['К тесту', 'Testga'], ['Прочитайте все уроки модуля, чтобы открыть тест', 'Testni ochish uchun modulning barcha darslarini o‘qing'], ['Начать тест', 'Testni boshlash'], ['Продолжить тест', 'Testni davom ettirish'], ['Попыток: ', 'Urinishlar: '], ['Лучший результат: ', 'Eng yaxshi natija: '], ['Выберите язык обучения', 'O‘qish tilini tanlang'], ['Русский', 'Русский'], ['Статус', 'Holat'], ['Курс', 'Kurs'], ['Приглашён', 'Taklif qilingan'], ['Обучение идёт', 'O‘qish davom etmoqda'], ['Онлайн-часть пройдена', 'Onlayn qism tugatilgan'], ['Не пройдено', 'O‘tilmagan'], ['Срок истёк', 'Muddat tugagan'], ['Показать правильные ответы нельзя: в истории виден только номер выбранного варианта.', 'To‘g‘ri javoblar ko‘rsatilmaydi: tarixda faqat tanlangan variant raqami ko‘rinadi.'], ['Вариант ', 'Variant '], ['не отвечено', 'javob berilmagan'], ['Ошибка', 'Xatolik']].forEach(x => PAIRS.push(x));
PAIRS.sort((a, b) => b[0].length - a[0].length);
[['Выберите, кто вы, и введите данные для входа.', 'Kim ekaningizni tanlang va kirish ma’lumotlarini kiriting.'], ['Нет доступа? Обратитесь к организатору обучения.', 'Kirish yo‘qmi? O‘quv tashkilotchisiga murojaat qiling.'], ['Рабочая почта', 'Ish pochtasi'], ['Введите рабочую почту', 'Ish pochtangizni kiriting'], ['Для входа по почте выберите «Сотрудник»', 'Pochta orqali kirish uchun «Xodim»ni tanlang']].forEach(x => PAIRS.push(x));
Object.assign(EX, { 'Пароль': 'Parol', 'Сотрудник': 'Xodim', 'Войти': 'Kirish' });
PAIRS.sort((a, b) => b[0].length - a[0].length);
let S = { lang: localStorage.getItem('lang') || 'ru', tok: localStorage.getItem('tok') || '', me: null, st: null, scr: 'main', p: {}, q: '', m: '', ad: {}, att: null, tm: null, res: null, lesson: null, hist: null };
function toast(m) { const t = document.createElement('div'); t.className = 'toast'; t.textContent = trs(m); document.body.appendChild(t); setTimeout(() => t.remove(), 3200); }
async function api(p, o = {}) {
  const C = window.CFG || {};
  const h = { 'Content-Type': 'application/json' };
  if (C.useKey && C.key) { h.apikey = C.key; h.Authorization = 'Bearer ' + C.key; }
  if (S.tok) h['X-Token'] = S.tok;
  h['x-region'] = C.region || 'eu-central-1';
  let r;
  try { r = await fetch((C.api || '/api') + p, { method: o.method || 'GET', headers: h, body: o.body ? JSON.stringify(o.body) : undefined }); }
  catch (e) { throw Object.assign(new Error('Нет связи с сервером. Проверьте интернет и повторите.'), { status: 0 }); }
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { if (r.status === 401 && S.tok && p !== '/login') { dropSession(); render(); } throw Object.assign(new Error(j.error || j.message || j.msg || j.error_description || ('Сервер вернул ошибку ' + r.status)), { status: r.status }); }
  return j;
}
function dropSession() { S.tok = ''; S.me = null; S.st = null; localStorage.removeItem('tok'); }
const isC = () => S.me && S.me.role === 'candidate';
async function refresh() { S.st = await api('/state'); }
async function boot() {
  api('/health').catch(() => { });
  if (S.tok) { try { S.me = (await api('/me')).user; if (isC()) await refresh(); else { S.scr = 'a_stats'; await adLoad('a_stats'); } } catch (e) { dropSession(); } }
  render();
}
async function go(scr, p = {}) {
  if (S.me && !isC()) return adGo(scr, p);
  clearInterval(S.tm); S.m = '';
  try {
    if (scr === 'lesson') S.lesson = await api('/lessons/' + p.id);
    else if (scr === 'hist') S.hist = await api('/blocks/' + p.id + '/attempts');
    else if (scr === 'test') S.att = await api('/blocks/' + p.id + '/attempts', { method: 'POST' });
  } catch (e) {
    toast(e.message); try { await refresh(); } catch (x) { }
    if (scr === 'test') { scr = 'block'; p = { id: p.id }; } else if (scr === 'lesson') { scr = 'lessons'; p = {}; } else return;
  }
  S.scr = scr; S.p = p; render(); scrollTo(0, 0);
  if (scr === 'test') startTimer();
  if (isC() && ['main', 'lessons', 'tests', 'progress', 'rating', 'profile', 'block', 'lesson'].includes(scr)) quietRefresh(scr);
}
async function quietRefresh(scr) {
  try { const n = await api('/state'), strip = o => JSON.stringify({ ...o, now: 0 }), changed = strip(n) !== strip(S.st); S.st = n; if (changed && S.scr === scr && scr !== 'lesson' && !S.m) { const y = scrollY; render(); scrollTo(0, y); } } catch (e) { }
}

function logout() { api('/logout', { method: 'POST' }).catch(() => { }); dropSession(); S.scr = 'main'; render(); }
function setLang(l) { S.lang = l; localStorage.setItem('lang', l); render(); }
setInterval(() => { if (S.tok && isC()) api('/ping').catch(() => { }); }, 120000);

// ---------- вспомогательное ----------
const blk = id => S.st.blocks.find(b => b.id == id);
const idx = id => S.st.blocks.findIndex(b => b.id == id);
const isFinal = b => b.label === 'final';
const dateRu = iso => new Date(iso).toLocaleDateString('ru-RU');
function leftTxt() {
  const st = S.st, e = st.enrollment, dur = st.course.duration_sec * 1000;
  if (!e.started_at) return 'Срок курса: ' + Math.round(st.course.duration_sec / 86400) + ' дн. Таймер запустится при открытии первого урока';
  const r = Math.min(Date.parse(e.access_until) - Date.now(), dur - (Date.now() - Date.parse(e.started_at)));
  return r <= 0 ? 'Срок курса закончился' : 'Осталось: ' + Math.floor(r / 864e5) + ' дн. ' + Math.floor(r % 864e5 / 36e5) + ' ч.';
}
const coverCls = (b, i) => isFinal(b) ? 'it' : 'ci' + (i % 5);
const siteBg = k => { const u = (S.st && S.st.site && S.st.site[k]) || (k === 'hero' && S.st && S.st.course && S.st.course.image) || ''; return u ? `style="background-image:url('${esc(u)}')"` : ''; };
const cvBg = b => b.cover ? `background-image:url('${esc(b.cover)}')` : '';
const statusPill = b => b.status === 'passed' ? ['dn', 'Пройден'] : b.status === 'locked' ? ['lk', 'Закрыто'] : b.status === 'failed' ? ['no', 'Не пройден'] : ['ok', 'Доступен'];

// ---------- оболочка кандидата ----------
function sidebar() {
  const st = S.st, p = st.points, on = { main: 'main', lessons: 'lessons', block: 'lessons', lesson: 'lessons', tests: 'tests', test: 'tests', tres: 'tests', hist: 'tests', progress: 'progress', rating: 'rating', profile: 'profile' }[S.scr];
  const n = [['main', 'Главная'], ['lessons', 'Уроки'], ['tests', 'Тесты'], ['progress', 'Прогресс'], ['rating', 'Рейтинг'], ['profile', 'Личный кабинет']];
  return `<div class="logo"><img src="${LOGO}" alt="TBC" width="34" height="34"><span>TBC<br>Uzbekistan</span></div><nav>${n.map(([k, t]) => `<button class="${on === k ? 'on' : ''}" onclick="go('${k}')"><span>${t}</span>${IC[k]}</button>`).join('')}</nav>
<div class="score"><div>Баллы</div><div class="sc"><b>${p.got}</b> из ${p.max}</div><div class="mu">Нужно набрать: ${p.need}<br>Осталось набрать: ${Math.max(0, p.need - p.got)}</div>${st.rating ? `<div class="mu" style="margin-top:8px">Место в потоке: <b>${st.rating.place}</b> из ${st.rating.n}</div>` : ''}</div>
<div class="mu" style="margin-top:10px;font-size:12px">Доступ до: ${dateRu(st.enrollment.access_until)}<br>${leftTxt()}</div>
<div class="lng"><button class="lg ${S.lang !== 'uz' ? 'on' : ''}" onclick="setLang('ru')">RU</button><button class="lg ${S.lang === 'uz' ? 'on' : ''}" onclick="setLang('uz')">UZ</button></div><button class="lnk side-out" onclick="logout()">Выйти</button>`;
}
function shell(v) { return `<div class="shell"><aside class="side">${sidebar()}</aside><main><div class="search"><input type="text" placeholder="Поиск" value="${esc(S.q)}" onkeydown="if(event.key==='Enter'){S.q=this.value;go('lessons')}"></div>${v}</main></div><div class="shield">Окно неактивно. Вернитесь на вкладку, чтобы продолжить.</div>`; }

// ---------- экраны кандидата ----------
function nextAct() {
  const bs = S.st.blocks, i = bs.findIndex(b => b.status !== 'passed'); if (i < 0) return '';
  const b = bs[i];
  if (b.status === 'locked') return `<p class="mu2" style="color:#fff">${b.reason === 'day' ? 'Откроется в день ' + b.day : 'Сначала пройдите предыдущий модуль'}</p>`;
  if (b.status === 'failed') return '';
  if (b.ready) return isFinal(b) ? `<button class="tq" onclick="go('test',{id:${b.id}})">Перейти к итоговому тесту</button>` : `<button class="tq" onclick="go('test',{id:${b.id}})">Продолжить: тест к уроку ${i + 1}</button>`;
  const l = b.lessons.find(x => !x.viewed) || b.lessons[0];
  return `<button class="tq" onclick="go('lesson',{id:${l.id}})">Начнем учиться</button>`;
}
const V = {};
V.main = () => `<div class="hero ih" ${siteBg('hero')}><h1>Продукты TBC</h1><p>Ежемесячно миллионы клиентов пользуются услугами TBC Bank: совершают платежи и переводы, оформляют кредиты, управляют счетами и вкладами. Но как работают эти продукты? В чем их особенности?</p>${nextAct()}</div><div class="plain">Отдел взыскания — это важное звено в финансовой системе компании. Его основная задача — взаимодействие с клиентами, имеющими просроченную задолженность, и поиск оптимальных решений для ее погашения</div><div class="g3">${PR.slice(0, 3).map(prc).join('')}</div>${note}`;
V.lessons = () => {
  const bs = S.st.blocks, q = S.q.toLowerCase(), i0 = bs.findIndex(b => b.status !== 'passed');
  const head = i0 < 0 ? 'Вы прошли все уроки!' : i0 === 0 ? 'Вас ждет первый урок!' : 'Вас ждет урок ' + (i0 + 1) + '!';
  return `<p class="lead">${head}<br>Прочитайте его и пройдите тесты, тогда вам будет доступен следующий урок!</p><h1 class="bigh">Вперед за знаниями!</h1><div class="g3">${bs.map((b, i) => ({ b, i })).filter(x => x.b.title.toLowerCase().includes(q)).map(({ b, i }) => {
    const [c, t] = statusPill(b), can = b.status !== 'locked';
    return `<div class="pc ${can ? 'click' : ''}" ${can ? `onclick="go('block',{id:${b.id}})"` : ''}><div class="im ${coverCls(b, i)}" style="${cvBg(b)}"></div><div class="bd"><h3>${esc(b.title)}</h3><div class="foot"><span class="mu">${b.status === 'locked' && b.reason === 'day' ? 'Откроется в день ' + b.day : ''}</span><span class="pill ${c}">${t}</span></div></div></div>`;
  }).join('') || '<p class="mu">Ничего не найдено.</p>'}</div>`;
};
V.block = () => {
  const b = blk(S.p.id), i = idx(b.id), [c, t] = statusPill(b);
  return `<p><button class="lnk" onclick="go('lessons')">← К списку уроков</button></p><div class="cover ${coverCls(b, i)}" style="${cvBg(b)}"></div><div class="card"><h1>${esc(b.title)}</h1><span class="pill ${c}">${t}</span>${S.q ? '' : ''}</div>
${b.lessons.length ? `<div class="card"><h2>Уроки модуля</h2>${b.lessons.map(l => `<div class="row"><div class="t"><b>${esc(l.title)}</b><span class="mu">${l.viewed ? 'Прочитано' : 'Не прочитано'}</span></div><button class="${l.viewed ? 'sec' : ''}" onclick="go('lesson',{id:${l.id}})">Открыть</button></div>`).join('')}</div>` : ''}
<div class="card"><h2>Тест модуля</h2><p class="mu">Вопросов: ${b.questions_count}. Проходной результат: ${b.pass_percent}%. Попыток: ${b.used} / ${b.max_attempts}${b.time_limit_min ? '. Время: ' + b.time_limit_min + ' мин' : ''}</p>${b.best !== null ? `<p class="mu">Лучший результат: ${b.best}%</p>` : ''}
${b.status === 'open' ? (b.ready ? `<button onclick="go('test',{id:${b.id}})">${b.openAttempt ? 'Продолжить тест' : 'Начать тест'}</button>` : `<p class="mu">Прочитайте все уроки модуля, чтобы открыть тест</p>`) : b.status === 'passed' ? '<p>Тест пройден.</p>' : b.status === 'failed' ? '<p>Попытки закончились. Обратитесь к тренеру.</p>' : '<p class="mu">Сначала пройдите предыдущий модуль</p>'}
${b.used ? `<p><button class="sec sm" onclick="go('hist',{id:${b.id}})">Мои ответы</button></p>` : ''}</div>`;
};
const cb = b => ({ heading: x => `<h2>${esc(x.text)}</h2>`, text: x => md(x.text), callout: x => `<div class="callout">${md(x.text)}</div>`, accordion: x => `<details class="acc"><summary>${esc(x.title)}</summary>${md(x.text)}</details>`, image: x => `<img class="mi" src="${esc(x.url)}" alt="${esc(x.caption || '')}">`, video: x => { const u = String(x.url || ''); let m = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/); if (m) return `<iframe class="mi" style="width:100%;aspect-ratio:16/9;border:0" src="https://www.youtube-nocookie.com/embed/${m[1]}" allowfullscreen loading="lazy"></iframe>`; m = u.match(/vimeo\.com\/(\d+)/); if (m) return `<iframe class="mi" style="width:100%;aspect-ratio:16/9;border:0" src="https://player.vimeo.com/video/${m[1]}" allowfullscreen loading="lazy"></iframe>`; return `<video class="mi" controls preload="metadata" src="${esc(u)}"></video>`; }, file: x => `<p><a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.title || 'Файл')}</a></p>`, divider: () => '<hr>' }[b.type] || (() => ''))(b);
V.lesson = () => {
  const l = S.lesson, b = blk(l.block_id), i = idx(b.id), li = b.lessons.findIndex(x => x.id === l.id), nx = b.lessons[li + 1], pv = b.lessons[li - 1];
  return `<p><button class="lnk" onclick="go('block',{id:${b.id}})">← ${esc(b.title)}</button></p><div class="cover ${coverCls(b, i)}" style="${l.image ? `background-image:url('${esc(l.image)}')` : cvBg(b)}"></div><div class="card"><div class="mu">${b.lessons.length > 1 ? (li + 1) + ' / ' + b.lessons.length : ''}</div>${l.content.map(cb).join('')}</div>
<div class="card"><div class="acts">${pv ? `<button class="sec" onclick="go('lesson',{id:${pv.id}})">Назад</button>` : ''}${nx ? `<button onclick="go('lesson',{id:${nx.id}})">Далее</button>` : (b.status === 'open' ? `<button onclick="go('test',{id:${b.id}})">К тесту</button>` : `<button class="sec" onclick="go('block',{id:${b.id}})">К списку уроков</button>`)}</div></div>`;
};
V.tests = () => `<div class="hero it" ${siteBg('tests')}><h1>Тесты</h1><p>Проверьте знания после каждого урока. Правильные ответы не показываются, в истории виден номер выбранного вами варианта.</p><button class="tq" onclick="startNext()">Начать тесты</button></div><div class="g3">${S.st.blocks.map((b, i) => {
  const [c, t] = statusPill(b), can = b.status === 'open' && b.ready;
  return `<div class="pc"><div class="im ${coverCls(b, i)}" style="height:90px;${cvBg(b)}"></div><div class="bd"><h3>${esc(b.title)}</h3><span class="mu">Тесты</span><div class="foot"><span class="pill ${c}">${t}${b.best !== null ? ': ' + b.best + '%' : ''}</span>${b.used ? `<button class="sec sm" onclick="go('hist',{id:${b.id}})">Мои ответы</button>` : `<button class="sm" ${can ? '' : 'disabled'} onclick="go('test',{id:${b.id}})">Пройти</button>`}</div></div></div>`;
}).join('')}</div>`;
function startNext() { const b = S.st.blocks.find(x => x.status === 'open' && x.ready); if (b) go('test', { id: b.id }); else toast('Сначала прочитайте урок, тогда откроется тест'); }
V.test = () => {
  const a = S.att, b = blk(a.block_id);
  return `<div class="card"><h1>${esc(b.title)}</h1>${a.limit_min ? `<p class="mu">Осталось времени: <span class="timer" id="tm"></span></p>` : ''}<p class="mu">Нужно ответить верно минимум на ${b.pass_percent}%</p></div><div class="card">${a.questions.map((q, i) => `<div class="q"><p>${i + 1}. ${esc(q.text)}</p>${q.options.map(o => `<label class="opt"><input type="${q.type === 'multi' ? 'checkbox' : 'radio'}" name="q${q.id}" value="${o.pos}"><span>${o.pos}. ${esc(o.text)}</span></label>`).join('')}</div>`).join('')}<button onclick="submitTest(false)">Отправить ответы</button></div>`;
};
function startTimer() {
  const a = S.att; if (!a.limit_min) return;
  const end = Date.now() + a.limit_min * 60e3 - (Date.parse(a.now) - Date.parse(a.started_at));
  const tick = () => { const r = Math.max(0, Math.round((end - Date.now()) / 1000)), e = $('#tm'); if (e) e.textContent = Math.floor(r / 60) + ':' + String(r % 60).padStart(2, '0'); if (r <= 0) { clearInterval(S.tm); submitTest(true); } };
  tick(); S.tm = setInterval(tick, 1000);
}
async function submitTest(auto) {
  const a = S.att, answers = {}; let miss = false;
  a.questions.forEach(q => { const v = [...document.querySelectorAll(`input[name="q${q.id}"]:checked`)].map(x => +x.value); answers[q.id] = v; if (!v.length) miss = true; });
  if (miss && !auto) return toast('Ответьте на все вопросы');
  clearInterval(S.tm);
  try { const r = await api('/attempts/' + a.id + '/submit', { method: 'POST', body: { answers } }); S.st = r.state; S.res = { ...r, block_id: a.block_id }; S.hist = await api('/blocks/' + a.block_id + '/attempts'); S.scr = 'tres'; render(); scrollTo(0, 0); }
  catch (e) { toast(e.message); try { await refresh(); } catch (x) { } go('lessons'); }
}
V.tres = () => {
  const r = S.res, b = blk(r.block_id), i = idx(b.id), last = S.hist[S.hist.length - 1], en = S.st.enrollment.status;
  const done = en === 'completed' ? S.st.course.success : en === 'failed' ? S.st.course.fail : '';
  return `<div class="card"><h1>${esc(b.title)}</h1><div class="res ${r.passed ? 'ok' : 'no'}"><b style="font-size:26px">${r.score} из ${r.total}</b> (${r.percent}%)<br>${r.passed ? 'Тест пройден.' : 'Тест не пройден. Перечитайте урок и пройдите тест снова.'} Попыток: ${b.used}.</div>${done ? `<div class="plain">${esc(done)}</div>` : ''}
<p class="mu">Попыток осталось: ${Math.max(0, b.max_attempts - b.used)}. Лучший результат: ${b.best}%</p><h2>Ваши ответы</h2>${answersV(last)}
<p style="margin-top:16px">${!r.passed && b.status === 'open' ? `<button onclick="go('block',{id:${b.id}})">Пройти заново</button> ` : ''}${r.passed && S.st.blocks[i + 1] && S.st.blocks[i + 1].status === 'open' ? `<button onclick="go('${S.st.blocks[i + 1].ready ? 'test' : 'block'}',{id:${S.st.blocks[i + 1].id}})">Открыть следующий урок</button> ` : ''}<button class="sec" onclick="go('tests')">К списку тестов</button></p></div>`;
};
const answersV = a => a.answers.map((x, i) => `<div class="ans"><div>${i + 1}. ${esc(x.text)}</div><div class="mu">${x.pos.length ? 'Ваш ответ: вариант ' + x.pos.join(', ') : 'Ваш ответ: не отвечено'}</div></div>`).join('');
V.hist = () => { const b = blk(S.p.id); return `<p><button class="lnk" onclick="go('tests')">← К списку тестов</button></p><div class="card"><h1>${esc(b.title)}</h1><p class="mu">Правильные ответы не показываются: в истории виден только номер выбранного варианта.</p>${S.hist.map((a, k) => `<h2 style="margin-top:16px">Попытка ${k + 1}: ${a.score} из ${a.total} (${a.percent}%)</h2>${answersV(a)}`).join('') || '<p class="mu">Попыток пока нет.</p>'}</div>`; };
V.progress = () => {
  const bs = S.st.blocks, tl = bs.reduce((a, b) => a + b.lessons.length, 0), rd = bs.reduce((a, b) => a + b.lessons.filter(l => l.viewed).length, 0), dn = bs.filter(b => b.status === 'passed').length, tk = bs.filter(b => b.best !== null), avg = tk.length ? Math.round(tk.reduce((a, b) => a + b.best, 0) / tk.length) : 0;
  return `<div class="card prog"><div><h2>Посмотрите на свой прогресс</h2><p style="margin:0">Вы на этапе ${Math.min(dn + 1, bs.length)} из ${bs.length}<br>Осталось: уроков ${tl - rd}; тестов ${bs.length - dn}</p></div><div class="gs">${[[tl ? Math.round(rd / tl * 100) : 0, 'Изучено уроков', rd + '/' + tl], [Math.round(dn / bs.length * 100), 'Пройдено тестов', dn + '/' + bs.length], [avg, 'Средний процент верных ответов', '']].map(g => `<div class="gi">${gauge(g[0], 64)}<div class="mu">${g[1]}<br><b>${g[2]}</b></div></div>`).join('')}</div></div><div class="g3">${bs.map((b, i) => `<div class="pc"><div class="bd"><div class="pg"><h3>${esc(b.title)}</h3>${gauge(b.best || 0, 64)}</div></div><div class="im ${coverCls(b, i)}" style="height:56px;${cvBg(b)}"></div></div>`).join('')}</div>`;
};
V.rating = () => {
  const r = S.st.rating; if (!r) return '<div class="card"><h1>Рейтинг</h1><p>Рейтинг доступен участникам потока.</p></div>';
  const bars = [['Прохождение уроков и тестов', r.parts[0], 40], ['Качество тестов', r.parts[1], 40], ['Активность на сайте', r.parts[2], 20]], row = x => `<div class="row" style="${x.me ? 'font-weight:600;background:var(--pr2);padding-left:10px;padding-right:10px;border-radius:6px' : ''}"><span style="width:28px">${x.i}</span><div class="t">${x.me ? 'Вы' : 'Участник ' + x.i}</div><span>${x.s}</span></div>`;
  return `<div class="card"><h1>Рейтинг</h1><p class="mu">${esc(S.st.enrollment.cohort || '')} · участников: ${r.n}</p><div class="big">Ваше место: <b>${r.place}</b> из ${r.n}</div><p class="mu">Баллов рейтинга: ${r.score} из 100</p></div><div class="card"><h2>Из чего складывается рейтинг</h2>${bars.map(b => `<div class="ans"><div style="display:flex;justify-content:space-between;gap:10px"><span>${b[0]}</span><span class="mu">вес ${b[2]}% · ${b[1]} из 100</span></div><div class="bar"><i style="width:${b[1]}%"></i></div></div>`).join('')}<p class="mu">Рейтинг растёт, когда вы читаете уроки, сдаёте тесты с высоким результатом и регулярно занимаетесь на сайте.</p></div><div class="card"><h2>Таблица потока</h2><p class="mu">Имена других участников скрыты.</p>${r.board.slice(0, 10).map(row).join('')}${r.place > 10 ? '<div class="mu" style="padding:6px 0">…</div>' + row(r.board[r.place - 1]) : ''}</div>`;
};
const STAT = { invited: 'Приглашён', in_progress: 'Обучение идёт', completed: 'Онлайн-часть пройдена', failed: 'Не пройдено', expired: 'Срок истёк' };
V.profile = () => `<div class="hero prof ip" ${siteBg('profile')}><div class="ph"><h1>${fmt(S.me.login)}</h1><span class="tagw">Кандидат</span></div><div class="pr"><span class="mu2">Обучение</span><br><b style="font-size:20px">${S.st.points.got}/${S.st.points.max}</b></div><div class="pf"><div><span class="mu2">Отдел</span><br>${esc(S.st.direction)}</div><div><span class="mu2">Поток</span><br>${esc((S.st.enrollment.cohort || '—').replace('Поток с ', ''))}</div><div><span class="mu2">Доступ до</span><br>${dateRu(S.st.enrollment.access_until)}</div><div><span class="mu2">Статус</span><br>${STAT[S.st.enrollment.status]}</div></div></div><div class="g3">${PR.slice(3).map(prc).join('')}</div>${note}<p><button class="sec" onclick="logout()">Выйти</button></p>`;

// ---------- вход ----------
const loginV = () => { const staff = S.lr === 'staff'; return `<div class="wrap login"><div class="card"><div class="lgh"><img src="${LOGO}" width="38" height="38" alt=""><span>TBC<br>Uzbekistan</span></div><h1>Вход в обучение</h1><p class="mu">Выберите, кто вы, и введите данные для входа.</p><div class="seg"><button class="${staff ? '' : 'on'}" onclick="setRole('cand')">Кандидат</button><button class="${staff ? 'on' : ''}" onclick="setRole('staff')">Сотрудник</button></div><label class="f" for="lg">${staff ? 'Рабочая почта' : 'Номер телефона'}</label><input id="lg" type="${staff ? 'email' : 'text'}" autocomplete="username" placeholder="${staff ? 'name@tbcbank.uz' : '+998 90 123 45 67'}"><label class="f" for="pw">Пароль</label><input id="pw" type="password" autocomplete="current-password" maxlength="64"><div class="err" id="er"></div><button id="go" style="width:100%">Войти</button><p class="mu" style="margin-top:14px">Нет доступа? Обратитесь к организатору обучения.</p></div><div class="lng" style="justify-content:center"><button class="lg ${S.lang !== 'uz' ? 'on' : ''}" onclick="setLang('ru')">RU</button><button class="lg ${S.lang === 'uz' ? 'on' : ''}" onclick="setLang('uz')">UZ</button></div></div>`; };
const setRole = r => { S.lr = r; render(); };
function bindLogin() {
  const go2 = async () => {
    const staff = S.lr === 'staff', lg = $('#lg').value.trim();
    if (staff && !lg.includes('@')) return $('#er').textContent = trs('Введите рабочую почту');
    if (!staff && lg.includes('@')) return $('#er').textContent = trs('Для входа по почте выберите «Сотрудник»');
    try { const r = await api('/login', { method: 'POST', body: { login: lg, password: $('#pw').value } }); S.tok = r.token; localStorage.setItem('tok', r.token); S.me = r.user; S.scr = isC() ? 'main' : 'a_stats'; if (isC()) await refresh(); else await adLoad('a_stats'); render(); }
    catch (e) { $('#er').textContent = trs(e.message); }
  };
  $('#go').onclick = go2; $('#pw').onkeydown = $('#lg').onkeydown = e => { if (e.key === 'Enter') go2(); };
}
const chooseV = () => `<div class="wrap login"><div class="card"><h1>Выберите язык обучения</h1><p class="mu">${esc(S.st.choose.direction)}</p>${S.st.choose.langs.map(l => `<p><button style="width:100%" onclick="chooseLang('${l}')">${l === 'ru' ? 'Русский' : 'O‘zbekcha'}</button></p>`).join('')}</div></div>`;
async function chooseLang(l) { try { S.st = await api('/choose', { method: 'POST', body: { lang: l } }); setLang(l); } catch (e) { toast(e.message); } }

// ---------- панель сотрудников ----------
const ROLE = { admin: 'Администратор', recruiter: 'Рекрутер', trainer: 'Тренер' };
const AD = { d: {}, f: { q: '', st: '', co: '' }, sc: { course: 0, cohort: 0 }, meta: null, cands: [], cohorts: [], courses: [], course: null, dirs: [], staff: [], set: {}, audit: [], stats: null, media: [] };
const can = r => (r || ['admin', 'recruiter']).includes(S.me.role);
const fld = (id, l, v, t, ph) => `<label class="f" for="${id}">${l}</label><input id="${id}" type="${t || 'text'}" value="${esc(v == null ? '' : v)}" ${ph ? `placeholder="${esc(ph)}"` : ''}>`;
const ta = (id, l, v, h) => `<label class="f" for="${id}">${l}</label><textarea id="${id}" style="min-height:${h || 110}px">${esc(v == null ? '' : v)}</textarea>`;
const sel = (id, l, o, v) => `<label class="f" for="${id}">${l}</label><select id="${id}">${o.map(([k, t]) => `<option value="${esc(k)}" ${String(k) === String(v) ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select>`;
const val = id => { const e = $('#' + id); return e ? e.value.trim() : ''; };
const chk = id => { const e = $('#' + id); return e && e.checked ? 1 : 0; };
const mclose = () => { S.m = ''; S.mw = 0; render(); };
const mbtn = (ok, t, extra) => `<div class="acts" style="margin-top:14px"><button onclick="${ok}">${t}</button><button class="sec" onclick="mclose()">Отмена</button>${extra || ''}</div>`;
const mopen = (h, w) => { S.m = h; S.mw = w ? 1 : 0; render(); };
const perr = t => { const e = $('#pe'); if (e) e.textContent = t; };
const dform = iso => (iso || '').slice(0, 10);
async function copyText(t) { try { await navigator.clipboard.writeText(t); return true; } catch (e) { const a = document.createElement('textarea'); a.value = t; document.body.appendChild(a); a.select(); let ok = false; try { ok = document.execCommand('copy'); } catch (x) { } a.remove(); return ok; } }
const SB = { invited: ['', 'Приглашён'], in_progress: ['', 'Обучение идёт'], completed: ['ok', 'Прошёл'], failed: ['no', 'Не прошёл'], expired: ['no', 'Срок истёк'] };
const NAV = [['a_stats', 'Аналитика'], ['a_cands', 'Кандидаты'], ['a_cohorts', 'Потоки'], ['a_courses', 'Курсы', ['admin', 'trainer']], ['a_dirs', 'Направления', ['admin']], ['a_staff', 'Сотрудники', ['admin']], ['a_media', 'Медиатека', ['admin', 'trainer']], ['a_set', 'Настройки', ['admin']], ['a_audit', 'Журнал', ['admin']]];
async function adGo(scr, p = {}) { S.m = ''; S.scr = scr; S.p = p; S.loading = true; render(); try { await adLoad(scr, p); } catch (e) { toast(e.message); } S.loading = false; render(); scrollTo(0, 0); }
async function adLoad(scr, p = {}) {
  const jobs = [];
  if (!AD.meta) jobs.push(api('/meta').then(m => { AD.meta = m; }));
  if (scr === 'a_stats') jobs.push(api('/analytics?course=' + (AD.sc.course || 0) + '&cohort=' + (AD.sc.cohort || 0)).then(x => { AD.stats = x; }));
  else if (scr === 'a_cands') jobs.push(api('/candidates').then(x => { AD.cands = x; }));
  else if (scr === 'a_cohorts') jobs.push(api('/cohorts').then(x => { AD.cohorts = x; }));
  else if (scr === 'a_courses') jobs.push(api('/courses').then(x => { AD.courses = x; }));
  else if (scr === 'a_course' || scr === 'a_block' || scr === 'a_lesson') { if (scr === 'a_course' || p.fresh || !AD.course || AD.course.course.id !== p.id) jobs.push(api('/courses/' + p.id).then(x => { AD.course = x; })); }
  else if (scr === 'a_dirs') jobs.push(api('/directions').then(x => { AD.dirs = x; }));
  else if (scr === 'a_staff') jobs.push(api('/staff').then(x => { AD.staff = x; }));
  else if (scr === 'a_set') jobs.push(api('/settings').then(x => { AD.set = x; }));
  else if (scr === 'a_media') jobs.push(api('/media').then(x => { AD.media = x; }));
  else if (scr === 'a_audit') jobs.push(api('/audit').then(x => { AD.audit = x; }));
  await Promise.all(jobs);
  if (scr === 'a_lesson') initLesson(p);
}
const adRefresh = async () => { AD.meta = null; await adGo(S.scr, S.p); };
function adminV() {
  const nav = NAV.filter(n => !n[2] || n[2].includes(S.me.role));
  return `<div class="top"><div class="brand"><img src="${LOGO}" width="26" height="26" alt="" style="vertical-align:middle;margin-right:8px">Админ-панель<small>${ROLE[S.me.role]} · ${esc(S.me.login)}</small></div><button class="lnk" onclick="logout()">Выйти</button></div><div class="wrap lay"><aside><nav>${nav.map(([k, t]) => `<button class="${S.scr === k || (k === 'a_courses' && ['a_course', 'a_block', 'a_lesson'].includes(S.scr)) ? 'on' : ''}" onclick="adGo('${k}')"><span>${t}</span></button>`).join('')}</nav></aside><main>${S.loading ? '<p class="mu">Загрузка…</p>' : ''}${({ a_stats: aStats, a_cands: aCands, a_cohorts: aCohorts, a_courses: aCourses, a_course: aCourse, a_block: aBlock, a_lesson: aLesson, a_dirs: aDirs, a_staff: aStaff, a_set: aSet, a_media: aMedia, a_audit: aAudit }[S.scr] || aStats)()}</main></div>${S.m ? `<div class="mod" onclick="if(event.target===this)mclose()"><div class="mbox ${S.mw ? 'wide' : ''}">${S.m}</div></div>` : ''}`;
}
// ===== Аналитика =====
function aStats() {
  const s = AD.stats; if (!s) return '<div class="card"><p class="mu">Нет данных</p></div>';
  const k = s.kpi, tiles = [['Всего кандидатов', k.total], ['Приглашены', k.invited], ['Учатся', k.in_progress], ['Прошли', k.completed], ['Не прошли', k.failed], ['Срок истёк', k.expired], ['Заходили за 7 дней', k.active7d]];
  const mx = Math.max(1, ...s.activity.map(a => a.n));
  return `<div class="card"><h1>Аналитика</h1><div class="acts" style="gap:14px">${sel('as_c', 'Курс', s.courses.map(c => [c.id, c.title + ' (' + c.lang.toUpperCase() + ')']), s.course_id)}${sel('as_h', 'Поток', [[0, 'Все потоки']].concat(AD.meta.cohorts.map(c => [c.id, c.title])), s.cohort_id)}</div><p><button class="sec sm" onclick="AD.sc.course=+val('as_c');AD.sc.cohort=+val('as_h');adGo('a_stats')">Показать</button></p></div>
<div class="grid">${tiles.map(([t, v]) => `<div><b style="font-size:26px">${v}</b>${t}</div>`).join('')}</div>
<div class="card" style="margin-top:16px"><h2>Воронка по модулям</h2><div class="tw"><table><tr><th>Модуль</th><th>Дошли до теста</th><th>Сдали</th><th>Средний лучший результат</th></tr>${s.funnel.map(f => `<tr><td><b>${esc(f.title)}</b></td><td>${f.attempted}</td><td>${f.passed}${f.attempted ? ' (' + Math.round(f.passed / f.attempted * 100) + '%)' : ''}</td><td style="min-width:160px">${f.avg == null ? '—' : f.avg + '%'}<div class="bar"><i style="width:${f.avg || 0}%"></i></div></td></tr>`).join('')}</table></div></div>
<div class="card"><h2>Самые сложные вопросы</h2>${s.hard.length ? s.hard.map(h => `<div class="ans"><div>${esc(h.text)}</div><div class="bar"><i style="width:${h.rate}%"></i></div><span class="mu">${h.rate}% ответили верно · ответов: ${h.asked}</span></div>`).join('') : '<p class="mu">Пока недостаточно ответов (нужно хотя бы 3 на вопрос).</p>'}</div>
<div class="card"><h2>Потоки</h2><div class="tw"><table><tr><th>Поток</th><th>Кандидатов</th><th>Прошли</th><th>Не прошли</th><th>Средний результат</th></tr>${s.cohorts.map(c => `<tr><td><b>${esc(c.title)}</b></td><td>${c.total}</td><td>${c.completed}</td><td>${c.failed}</td><td>${c.avg == null ? '—' : c.avg + '%'}</td></tr>`).join('') || '<tr><td colspan="5" class="mu">Потоков нет</td></tr>'}</table></div></div>
<div class="card"><h2>Активность (дни входов за 2 недели)</h2><div style="display:flex;gap:6px;align-items:flex-end;height:110px">${s.activity.map(a => `<div style="flex:1;text-align:center"><div style="background:#16d1a8;border-radius:6px 6px 0 0;height:${Math.max(4, a.n / mx * 90)}px"></div><div class="mu" style="font-size:11px">${a.day.slice(5)}<br><b>${a.n}</b></div></div>`).join('') || '<span class="mu">Входов пока не было</span>'}</div></div>`;
}
// ===== Кандидаты =====
function candRows() {
  const f = AD.f, q = f.q.toLowerCase();
  return AD.cands.filter(r => (!q || (r.full_name || '').toLowerCase().includes(q) || r.phone.replace(/\D/g, '').includes(q.replace(/\D/g, '') || '@@')) && (!f.st || (f.st === 'off' ? !r.active : r.active && r.status === f.st)) && (!f.co || (f.co === 'none' ? !r.cohort_id : String(r.cohort_id) === f.co)));
}
function candTable() {
  const rows = candRows();
  return `<p class="mu">Показано: ${rows.length} из ${AD.cands.length}</p><div class="tw"><table><tr><th>Кандидат</th><th>Поток</th><th>Статус</th><th>Прогресс</th><th>Доступ до</th><th>Последний вход</th><th></th></tr>${rows.map(r => `<tr><td><b>${esc(r.full_name || '—')}</b><br><span class="mu">${fmt(r.phone)}</span></td><td>${esc(r.cohort || '—')}</td><td><span class="tag ${r.active ? SB[r.status][0] : 'no'}">${r.active ? SB[r.status][1] : 'Отключён'}</span></td><td>${r.passed} из ${r.total || '—'}${r.percent !== null ? '<br><span class="mu">' + r.percent + '% верных</span>' : ''}</td><td>${dateRu(r.access_until)}</td><td>${r.last_login_at ? new Date(r.last_login_at).toLocaleString('ru-RU') : '—'}</td><td><button class="sec sm" onclick="candCard(${r.id})">Карточка</button></td></tr>`).join('') || '<tr><td colspan="7" class="mu">Никого не найдено</td></tr>'}</table></div>`;
}
function aCands() {
  const f = AD.f;
  return `<div class="card"><h1>Кандидаты</h1><p class="mu">Логин кандидата — номер телефона. Пароль по умолчанию — последние 4 цифры номера, его можно изменить в карточке кандидата.</p><div class="acts">${can() ? '<button onclick="candForm()">+ Добавить</button><button class="sec" onclick="candImport()">Импорт списком</button>' : ''}<button class="sec" onclick="copyTable()">Копировать таблицу</button></div>
<div class="acts" style="margin-top:12px;gap:12px"><input id="fq" type="text" placeholder="Поиск по имени или номеру" value="${esc(f.q)}" style="max-width:280px" oninput="AD.f.q=this.value;$('#ct').innerHTML=candTable()">
<select id="fs" style="width:auto" onchange="AD.f.st=this.value;$('#ct').innerHTML=candTable()">${[['', 'Все статусы'], ['invited', 'Приглашены'], ['in_progress', 'Учатся'], ['completed', 'Прошли'], ['failed', 'Не прошли'], ['expired', 'Срок истёк'], ['off', 'Отключены']].map(([k, t]) => `<option value="${k}" ${f.st === k ? 'selected' : ''}>${t}</option>`).join('')}</select>
<select id="fc" style="width:auto" onchange="AD.f.co=this.value;$('#ct').innerHTML=candTable()">${[['', 'Все потоки'], ['none', 'Без потока']].concat(AD.meta.cohorts.map(c => [String(c.id), c.title])).map(([k, t]) => `<option value="${k}" ${f.co === k ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select></div><div id="ct" style="margin-top:8px">${candTable()}</div></div>`;
}
async function copyTable() {
  const t = ['ФИО\tТелефон\tПоток\tСтатус\tМодулей пройдено\tСредний результат %\tДоступ до'].concat(candRows().map(r => [r.full_name, fmt(r.phone), r.cohort || '', r.active ? SB[r.status][1] : 'Отключён', r.passed + '/' + r.total, r.percent == null ? '' : r.percent, dateRu(r.access_until)].join('\t'))).join('\n');
  toast(await copyText(t) ? 'Таблица скопирована, вставьте в Excel' : 'Не удалось скопировать');
}
const invText = (lang, name, login, until) => (AD.meta.invite[lang] || '').replace('{name}', name || '').replace('{link}', location.origin + location.pathname).replace('{phone}', fmt(login)).replace('{code}', String(login).slice(-4)).replace('{deadline}', dateRu(until));
function invModal(name, login, until, title) {
  S.inv = { name, login, until, lang: 'ru' };
  mopen(`<h2>${title || 'Приглашение'}</h2>${sel('iv_l', 'Язык', [['ru', 'Русский'], ['uz', 'Узбекский']], 'ru')}<label class="f" for="inv">Текст</label><textarea id="inv" readonly style="min-height:170px">${esc(invText('ru', name, login, until))}</textarea><div class="acts" style="margin-top:12px"><button onclick="copyInv()">Копировать текст</button><button class="sec" onclick="mclose()">Закрыть</button></div>`);
  $('#iv_l').onchange = e => { $('#inv').value = invText(e.target.value, name, login, until); };
}
async function copyInv() { toast(await copyText($('#inv').value) ? 'Текст скопирован' : 'Выделите текст и скопируйте вручную'); }
function candForm() {
  const m = AD.meta;
  mopen(`<h2>Новый кандидат</h2>${fld('cn', 'ФИО', '')}${fld('cp', 'Телефон (логин)', '', 'tel', '+998 90 123 45 67')}${sel('cd', 'Направление', m.directions.map(d => [d.id, d.name]), m.directions[0] && m.directions[0].id)}${sel('cc', 'Поток', [['', 'Без потока']].concat(m.cohorts.map(c => [c.id, c.title])), '')}${sel('cl', 'Язык обучения', [['', 'Кандидат выберет сам'], ['ru', 'Русский'], ['uz', 'Узбекский']], '')}${fld('cy', 'Срок доступа, дней (если без потока)', 14, 'number')}<div class="err" id="pe"></div>${mbtn('candSave()', 'Добавить')}`);
}
async function candSave() {
  try {
    const r = await api('/candidates', { method: 'POST', body: { full_name: val('cn'), phone: val('cp'), direction_id: val('cd'), cohort_id: val('cc') || null, lang: val('cl'), days: +val('cy') } });
    AD.cands = await api('/candidates'); invModal(val('cn') || 'коллега', r.login, r.access_until, 'Кандидат добавлен');
  } catch (e) { perr(e.message); }
}
function candImport() {
  const m = AD.meta;
  mopen(`<h2>Импорт списком</h2><p class="mu">Каждая строка: ФИО и телефон (через точку с запятой, запятую, табуляцию или пробел). Можно вставить столбцы из Excel. До 300 строк.</p>${ta('im_t', 'Список', '', 160)}${sel('cd', 'Направление', m.directions.map(d => [d.id, d.name]), m.directions[0] && m.directions[0].id)}${sel('cc', 'Поток', [['', 'Без потока']].concat(m.cohorts.map(c => [c.id, c.title])), '')}${sel('cl', 'Язык обучения', [['', 'Кандидат выберет сам'], ['ru', 'Русский'], ['uz', 'Узбекский']], '')}${fld('cy', 'Срок доступа, дней (если без потока)', 14, 'number')}<div class="err" id="pe"></div>${mbtn('candImportGo()', 'Импортировать')}`, 1);
}
async function candImportGo() {
  const rows = [];
  for (const line of val('im_t').split('\n').map(x => x.trim()).filter(Boolean)) {
    const m = line.match(/^(.*?)[;\t,|]\s*([+\d][\d\s()+\-]{7,})$/) || line.match(/^(.*?)\s+([+\d][\d\s()+\-]{8,})$/) || line.match(/^()([+\d][\d\s()+\-]{8,})$/);
    rows.push(m ? { full_name: m[1].trim(), phone: m[2].trim() } : { full_name: line, phone: '' });
  }
  if (!rows.length) return perr('Вставьте список');
  try {
    const r = await api('/candidates/import', { method: 'POST', body: { rows, direction_id: val('cd'), cohort_id: val('cc') || null, lang: val('cl'), days: +val('cy') } });
    AD.cands = await api('/candidates'); S.imp = r;
    mopen(`<h2>Импорт завершён</h2><p>Добавлено: <b>${r.created.length}</b>. Ошибок: <b>${r.errors.length}</b>.</p>${r.errors.length ? `<div class="res no">${r.errors.map(e => `Строка ${e.row} (${esc(e.phone || '—')}): ${esc(e.error)}`).join('<br>')}</div>` : ''}<div class="acts"><button onclick="copyImp()">Копировать список (ФИО, телефон, код)</button><button class="sec" onclick="mclose()">Закрыть</button></div>`);
  } catch (e) { perr(e.message); }
}
async function copyImp() { toast(await copyText(S.imp.created.map(x => [x.full_name, fmt(x.login), x.password].join('\t')).join('\n')) ? 'Список скопирован' : 'Не удалось скопировать'); }
async function candCard(id) {
  mopen('<p>Загрузка…</p>', 1);
  try { const d = await api('/candidates/' + id); AD.cc = d; candCardView(); } catch (e) { mclose(); toast(e.message); }
}
function candCardView() {
  const d = AD.cc, u = d.user, e = d.enrollment, m = AD.meta, st = u.active ? SB[e.status] : ['no', 'Отключён'];
  mopen(`<h2>${esc(u.name || 'Без имени')}</h2><p class="mu">${fmt(u.login)} · <span class="tag ${st[0]}">${st[1]}</span><br>Доступ до ${dateRu(e.access_until)} · последний вход ${u.last_login_at ? new Date(u.last_login_at).toLocaleString('ru-RU') : '—'}</p>
<div class="tw"><table><tr><th>Модуль</th><th>Статус</th><th>Попыток</th><th>Лучший результат</th></tr>${d.blocks.map(b => `<tr><td>${esc(b.title)}</td><td><span class="tag ${b.status === 'passed' ? 'ok' : b.status === 'failed' ? 'no' : ''}">${{ passed: 'Пройден', locked: 'Закрыт', failed: 'Не пройден', open: 'Идёт' }[b.status]}</span></td><td>${b.used} / ${b.max_attempts}</td><td>${b.best == null ? '—' : b.best + '%'}</td></tr>`).join('') || '<tr><td colspan="4" class="mu">Курс ещё не выбран</td></tr>'}</table></div>
<div class="acts" style="margin:14px 0">${can() ? `<button class="sec sm" onclick="cAct(${u.id},'extend',{days:3})">Продлить на 3 дня</button><button class="sec sm" onclick="cAct(${u.id},'extend',{days:7})">+7 дней</button><button class="sec sm" onclick="cAct(${u.id},'end-session')">Завершить сеанс</button><button class="sec sm" onclick="cAct(${u.id},'reset-password')">Сбросить пароль</button><button class="sec sm" onclick="cAct(${u.id},'reset-direction')">Сбросить язык</button><button class="sec sm" onclick="cAct(${u.id},'active',{active:${u.active ? 0 : 1}})">${u.active ? 'Отключить' : 'Включить'}</button>` : ''}${can(['admin', 'trainer']) ? `<button class="sec sm" onclick="cAct(${u.id},'reset-attempts')">Сбросить попытки</button>` : ''}<button class="sec sm" onclick="invModal('${esc((u.name || 'коллега').replace(/'/g, ''))}','${u.login}','${e.access_until}')">Приглашение</button></div>
${can() ? `<h2>Данные</h2>${fld('ce_n', 'ФИО', u.name)}${sel('ce_c', 'Поток', [['', 'Без потока']].concat(m.cohorts.map(c => [c.id, c.title])), e.cohort_id || '')}${sel('ce_l', 'Язык обучения', [['', 'Не выбран'], ['ru', 'Русский'], ['uz', 'Узбекский']], e.lang || '')}${fld('ce_d', 'Доступ до', dform(e.access_until), 'date')}${fld('ce_t', 'Заметка', e.note || '')}${fld('ce_pw', 'Новый пароль (оставьте пустым, чтобы не менять)', '', 'text')}<div class="err" id="pe"></div><div class="acts" style="margin-top:12px"><button onclick="candEdit(${u.id})">Сохранить</button>${S.me.role === 'admin' ? `<button class="sec" onclick="candDel(${u.id})">Удалить кандидата</button>` : ''}<button class="sec" onclick="mclose()">Закрыть</button></div>` : '<div class="acts"><button class="sec" onclick="mclose()">Закрыть</button></div>'}`, 1);
}
async function cAct(id, a, body) {
  try { const r = await api('/candidates/' + id + '/' + a, { method: 'POST', body: body || {} }); toast(a === 'reset-password' ? 'Пароль сброшен: ' + r.password : 'Готово'); AD.cands = await api('/candidates'); AD.cc = await api('/candidates/' + id); candCardView(); } catch (e) { toast(e.message); }
}
async function candEdit(id) {
  try { const e = AD.cc.enrollment, b = { full_name: val('ce_n'), cohort_id: val('ce_c') || null, note: val('ce_t'), access_until: val('ce_d') }; if (val('ce_l') && val('ce_l') !== (e.lang || '')) b.lang = val('ce_l'); await api('/candidates/' + id, { method: 'PUT', body: b }); if (val('ce_pw')) await api('/candidates/' + id + '/set-password', { method: 'POST', body: { password: val('ce_pw') } }); toast('Сохранено'); AD.cands = await api('/candidates'); AD.cc = await api('/candidates/' + id); candCardView(); } catch (x) { perr(x.message); }
}
function candDel(id) { mopen(`<h2>Удалить кандидата?</h2><p>Данные и результаты будут стёрты безвозвратно. Если нужно закрыть доступ, лучше «Отключить».</p><div class="acts"><button onclick="candDelOk(${id})">Удалить навсегда</button><button class="sec" onclick="mclose()">Отмена</button></div>`); }
async function candDelOk(id) { try { await api('/candidates/' + id, { method: 'DELETE' }); S.m = ''; AD.cands = await api('/candidates'); render(); toast('Удалено'); } catch (e) { toast(e.message); } }
// ===== Потоки =====
function aCohorts() {
  const c = AD.cohorts;
  return `<div class="card"><h1>Потоки</h1><p class="mu">Поток — группа кандидатов с одной датой старта и сроком доступа. Участники потока видят рейтинг друг друга (без имён).</p>${can() ? '<button onclick="cohForm(0)">+ Новый поток</button>' : ''}<div class="tw" style="margin-top:14px"><table><tr><th>Поток</th><th>Направление</th><th>Старт</th><th>Доступ до</th><th>Кандидатов</th><th></th></tr>${c.map(x => `<tr><td><b>${esc(x.title)}</b></td><td>${esc(x.direction || '—')}</td><td>${dateRu(x.mass_date)}</td><td>${dateRu(x.deadline)}</td><td>${x.students}</td><td><div class="acts">${can() ? `<button class="sec sm" onclick="cohForm(${x.id})">Изменить</button><button class="sec sm" onclick="cohAssign(${x.id})">Состав</button><button class="sec sm" onclick="cohDel(${x.id})">Удалить</button>` : ''}</div></td></tr>`).join('') || '<tr><td colspan="6" class="mu">Потоков пока нет</td></tr>'}</table></div></div>`;
}
function cohForm(id) {
  const m = AD.meta, x = AD.cohorts.find(y => y.id === id) || { title: 'Поток с ', mass_date: '', direction_id: m.directions[0] && m.directions[0].id }, days = x.deadline && x.mass_date ? Math.round((Date.parse(x.deadline) - Date.parse(x.mass_date)) / 864e5) : 14;
  mopen(`<h2>${id ? 'Изменить поток' : 'Новый поток'}</h2>${fld('hn', 'Название', x.title)}${fld('hd', 'Дата старта', dform(x.mass_date), 'date')}${sel('hr', 'Направление', m.directions.map(d => [d.id, d.name]), x.direction_id)}${fld('hy', 'Срок доступа, дней', days, 'number')}${id ? '<label class="opt"><input id="hs" type="checkbox"><span>Обновить срок доступа у всех кандидатов потока</span></label>' : ''}<div class="err" id="pe"></div>${mbtn('cohSave(' + id + ')', 'Сохранить')}`);
}
async function cohSave(id) {
  try { const b = { title: val('hn'), mass_date: val('hd'), direction_id: val('hr'), days: +val('hy'), sync_deadline: chk('hs') }; await api(id ? '/cohorts/' + id : '/cohorts', { method: id ? 'PUT' : 'POST', body: b }); S.m = ''; await adRefresh(); toast('Сохранено'); } catch (e) { perr(e.message); }
}
function cohDel(id) { const x = AD.cohorts.find(y => y.id === id); mopen(`<h2>Удалить поток?</h2><p>Поток «${esc(x.title)}» будет удалён. Кандидаты (${x.students}) останутся в системе, но без потока и без рейтинга.</p><div class="acts"><button onclick="cohDelOk(${id})">Удалить</button><button class="sec" onclick="mclose()">Отмена</button></div>`); }
async function cohDelOk(id) { try { await api('/cohorts/' + id, { method: 'DELETE' }); S.m = ''; await adRefresh(); toast('Удалено'); } catch (e) { toast(e.message); } }
async function cohAssign(id) {
  mopen('<p>Загрузка…</p>', 1);
  try {
    AD.cands = await api('/candidates'); const x = AD.cohorts.find(y => y.id === id);
    mopen(`<h2>Состав потока «${esc(x.title)}»</h2><p class="mu">Отметьте кандидатов, которых нужно добавить в поток. Убрать кандидата из потока можно в его карточке.</p><div style="max-height:360px;overflow:auto">${AD.cands.map(r => `<label class="opt"><input type="checkbox" name="as" value="${r.id}" ${r.cohort_id === id ? 'checked disabled' : ''}><span><b>${esc(r.full_name || '—')}</b> · ${fmt(r.phone)}${r.cohort_id && r.cohort_id !== id ? ' <span class="mu">(сейчас: ' + esc(r.cohort) + ')</span>' : ''}</span></label>`).join('')}</div><label class="opt"><input id="as_s" type="checkbox" checked><span>Установить им срок доступа потока</span></label>${mbtn('cohAssignGo(' + id + ')', 'Добавить отмеченных')}`, 1);
  } catch (e) { mclose(); toast(e.message); }
}
async function cohAssignGo(id) { try { const ids = [...document.querySelectorAll('input[name="as"]:checked:not(:disabled)')].map(x => +x.value); if (!ids.length) return toast('Никто не отмечен'); await api('/cohorts/' + id + '/assign', { method: 'POST', body: { user_ids: ids, sync_deadline: chk('as_s') } }); S.m = ''; await adRefresh(); toast('Добавлено: ' + ids.length); } catch (e) { toast(e.message); } }
// ===== Курсы =====
function aCourses() {
  const c = AD.courses;
  return `<div class="card"><h1>Курсы</h1><p class="mu">Курс создаётся для направления и языка. Чтобы сделать перевод, дублируйте курс на другой язык.</p><button onclick="courseForm(0)">+ Новый курс</button><div class="tw" style="margin-top:14px"><table><tr><th>Курс</th><th>Язык</th><th>Направление</th><th>Модулей</th><th>Уроков</th><th>Вопросов</th><th>Кандидатов</th><th>Статус</th><th></th></tr>${c.map(x => `<tr><td><b>${esc(x.title)}</b></td><td>${x.lang.toUpperCase()}</td><td>${esc(x.direction)}</td><td>${x.blocks}</td><td>${x.lessons}</td><td>${x.questions}</td><td>${x.students}</td><td><span class="tag ${x.published ? 'ok' : ''}">${x.published ? 'Опубликован' : 'Черновик'}</span></td><td><div class="acts"><button class="sm" onclick="adGo('a_course',{id:${x.id}})">Редактор</button><button class="sec sm" onclick="coursePub(${x.id},${x.published ? 0 : 1})">${x.published ? 'Снять' : 'Опубликовать'}</button><button class="sec sm" onclick="courseForm(${x.id})">Дублировать</button><button class="sec sm" onclick="courseDel(${x.id})">Удалить</button></div></td></tr>`).join('')}</table></div></div>`;
}
function courseForm(copy) {
  const m = AD.meta, src = AD.courses.find(x => x.id === copy);
  mopen(`<h2>${copy ? 'Дублировать курс' : 'Новый курс'}</h2>${fld('cf_t', 'Название', src ? src.title + ' (копия)' : '')}${sel('cf_d', 'Направление', m.directions.map(d => [d.id, d.name]), src ? src.direction_id : m.directions[0] && m.directions[0].id)}${sel('cf_l', 'Язык', [['ru', 'Русский'], ['uz', 'Узбекский']], src ? (src.lang === 'ru' ? 'uz' : 'ru') : 'ru')}${copy ? '<p class="mu">Будут скопированы модули, уроки и вопросы. Если выбран другой язык, копия станет переводом исходного курса.</p>' : ''}<div class="err" id="pe"></div>${mbtn('courseSave(' + copy + ')', copy ? 'Дублировать' : 'Создать')}`);
}
async function courseSave(copy) { try { const r = await api('/courses', { method: 'POST', body: { title: val('cf_t'), direction_id: val('cf_d'), lang: val('cf_l'), copy_from: copy || null } }); S.m = ''; AD.meta = null; await adGo('a_course', { id: r.id }); toast('Курс создан'); } catch (e) { perr(e.message); } }
async function coursePub(id, v) { try { await api('/courses/' + id, { method: 'PUT', body: { published: v } }); await adRefresh(); toast(v ? 'Опубликован' : 'Снят с публикации'); } catch (e) { toast(e.message); } }
function courseDel(id) { const x = AD.courses.find(y => y.id === id); mopen(`<h2>Удалить курс?</h2><p>«${esc(x.title)}» со всеми модулями, уроками и вопросами будет удалён безвозвратно.${x.students ? ' У курса есть кандидаты (' + x.students + '), удаление будет отклонено. Снимите курс с публикации вместо удаления.' : ''}</p><div class="acts"><button onclick="courseDelOk(${id})">Удалить</button><button class="sec" onclick="mclose()">Отмена</button></div>`); }
async function courseDelOk(id) { try { await api('/courses/' + id, { method: 'DELETE' }); S.m = ''; await adRefresh(); toast('Удалено'); } catch (e) { S.m = ''; render(); toast(e.message); } }
async function mv(kind, id, dir) { try { await api('/' + kind + '/' + id + '/move', { method: 'POST', body: { dir } }); AD.course = await api('/courses/' + S.p.id); render(); } catch (e) { toast(e.message); } }
const reloadCourse = async () => { S.m = ''; AD.course = await api('/courses/' + S.p.id); render(); };
function blockDel(id) { mopen(`<h2>Удалить модуль?</h2><p>Модуль со всеми уроками и вопросами будет удалён. Результаты кандидатов по этому модулю тоже пропадут.</p><div class="acts"><button onclick="delOk('blocks',${id})">Удалить</button><button class="sec" onclick="mclose()">Отмена</button></div>`); }
const lessonDel = id => mopen(`<h2>Удалить урок?</h2><p>Урок будет удалён безвозвратно.</p><div class="acts"><button onclick="delOk('lessons',${id})">Удалить</button><button class="sec" onclick="mclose()">Отмена</button></div>`);
const qDel = id => mopen(`<h2>Удалить вопрос?</h2><div class="acts"><button onclick="delOk('questions',${id})">Удалить</button><button class="sec" onclick="mclose()">Отмена</button></div>`);
async function delOk(kind, id) { try { await api('/' + kind + '/' + id, { method: 'DELETE' }); await reloadCourse(); toast('Удалено'); } catch (e) { toast(e.message); } }
// --- редактор урока ---
const BT = { heading: 'Заголовок', text: 'Текст', callout: 'Выноска', accordion: 'Раскрывающийся блок', image: 'Картинка (ссылка)', video: 'Видео (ссылка на файл)', file: 'Файл (ссылка)', divider: 'Разделитель' };
let DR = { l: [], q: null };
function lbDraw() {
  const e = $('#lb'); if (!e) return;
  const inp = (k, f, ph, rows) => rows ? `<div class="tbr"><button class="sec sm" type="button" onclick="fmtB(${k})" title="Жирный"><b>Ж</b></button><button class="sec sm" type="button" onclick="fmtL(${k})" title="Список">• Список</button></div><textarea id="tb${k}" style="min-height:${rows}px" placeholder="${ph}" oninput="DR.l[${k}].${f}=this.value;lpDraw()">${esc(DR.l[k][f] || '')}</textarea>` : `<input type="text" placeholder="${ph}" value="${esc(DR.l[k][f] || '')}" oninput="DR.l[${k}].${f}=this.value;lpDraw()">`;
  e.innerHTML = DR.l.map((b, k) => `<div class="ans"><div class="acts" style="justify-content:space-between"><b>${BT[b.type]}</b><span class="acts"><button class="sec sm" ${k ? '' : 'disabled'} onclick="lbMv(${k},-1)">↑</button><button class="sec sm" ${k < DR.l.length - 1 ? '' : 'disabled'} onclick="lbMv(${k},1)">↓</button><button class="sec sm" onclick="DR.l.splice(${k},1);lbDraw()">✕</button></span></div>${{ heading: () => inp(k, 'text', 'Текст заголовка'), text: () => inp(k, 'text', 'Текст (можно **жирный** и списки с «- »)', 130), callout: () => inp(k, 'text', 'Текст выноски', 80), accordion: () => inp(k, 'title', 'Заголовок блока') + inp(k, 'text', 'Скрытый текст', 90), image: () => inp(k, 'url', 'https://… ссылка на картинку') + pk(k, 'image') + inp(k, 'caption', 'Подпись'), video: () => inp(k, 'url', 'Ссылка на видео: YouTube, Vimeo или файл mp4') + pk(k, 'video'), file: () => inp(k, 'url', 'https://… ссылка на файл') + pk(k, 'any') + inp(k, 'title', 'Название ссылки'), divider: () => '<hr>' }[b.type]()}</div>`).join('') || '<p class="mu">Блоков нет. Добавьте первый блок.</p>';
  lpDraw();
}
function fmtB(k) { const t = $('#tb' + k); if (!t) return; const s = t.selectionStart, e = t.selectionEnd, v = t.value; t.value = v.slice(0, s) + '**' + (v.slice(s, e) || 'текст') + '**' + v.slice(e); DR.l[k].text = t.value; lpDraw(); }
function fmtL(k) { const t = $('#tb' + k); if (!t) return; const v = t.value, s = v.lastIndexOf('\n', t.selectionStart - 1) + 1, e = t.selectionEnd; t.value = v.slice(0, s) + v.slice(s, e).split('\n').map(l => l.startsWith('- ') ? l : '- ' + l).join('\n') + v.slice(e); DR.l[k].text = t.value; lpDraw(); }
const pk = (k, kind) => `<button class="sec sm" type="button" style="margin:4px 0" onclick="pickFor(${k},'${kind}')">Выбрать из медиатеки</button>`;
const pickFor = (k, kind) => pickMedia(kind, (url, x) => { DR.l[k].url = url; if (DR.l[k].type === 'file' && !DR.l[k].title) DR.l[k].title = x.name; });
const lbMv = (k, d) => { [DR.l[k], DR.l[k + d]] = [DR.l[k + d], DR.l[k]]; lbDraw(); };
// --- редактор вопроса ---
function qForm(id, blockId) {
  const b = AD.course.blocks.find(x => x.id === blockId || x.questions.some(q => q.id === id)), q = id ? b.questions.find(x => x.id === id) : { text: '', type: 'single', options: [{ text: '', correct: true }, { text: '', correct: false }, { text: '', correct: false }] };
  DR.q = JSON.parse(JSON.stringify(q));
  mopen(`<h2>${id ? 'Изменить вопрос' : 'Новый вопрос'}</h2>${ta('qq_t', 'Вопрос', q.text, 70)}${sel('qq_y', 'Тип', [['single', 'Один правильный ответ'], ['multi', 'Несколько правильных ответов']], q.type)}<h3 style="font-size:15px;margin:14px 0 4px">Варианты ответа (отметьте правильные)</h3><div id="qo"></div><p><button class="sec sm" onclick="DR.q.options.push({text:'',correct:false});qoDraw()">+ Вариант</button></p><div class="err" id="pe"></div>${mbtn('qSave(' + id + ',' + b.id + ')', 'Сохранить вопрос')}`, 1);
  $('#qq_y').onchange = e => { DR.q.type = e.target.value; if (DR.q.type === 'single') { const f = DR.q.options.findIndex(o => o.correct); DR.q.options.forEach((o, i) => { o.correct = i === (f < 0 ? 0 : f); }); } qoDraw(); };
  qoDraw();
}
function qoDraw() {
  const e = $('#qo'); if (!e) return; const multi = DR.q.type === 'multi';
  e.innerHTML = DR.q.options.map((o, k) => `<div class="acts" style="margin-bottom:6px;flex-wrap:nowrap"><input type="${multi ? 'checkbox' : 'radio'}" name="qc" ${o.correct ? 'checked' : ''} onchange="qoCorrect(${k},this.checked)" aria-label="Правильный ответ" style="flex:none"><input type="text" style="flex:1" placeholder="Вариант ответа" value="${esc(o.text)}" oninput="DR.q.options[${k}].text=this.value"><button class="sec sm" onclick="DR.q.options.splice(${k},1);qoDraw()">✕</button></div>`).join('');
}
function qoCorrect(k, on) { if (DR.q.type === 'multi') DR.q.options[k].correct = on; else DR.q.options.forEach((o, i) => { o.correct = i === k; }); }
async function qSave(id, blockId) { try { DR.q.text = val('qq_t'); DR.q.type = val('qq_y'); if (id) await api('/questions/' + id, { method: 'PUT', body: DR.q }); else await api('/blocks/' + blockId + '/questions', { method: 'POST', body: DR.q }); await reloadCourse(); toast('Сохранено'); } catch (e) { perr(e.message); } }
function qImport(blockId) {
  mopen(`<h2>Импорт вопросов текстом</h2><p class="mu">Вопросы разделяются пустой строкой. Первая строка — вопрос, дальше варианты: «+» в начале правильного, «-» неправильного. Если «+» несколько, вопрос получит несколько ответов.</p>${ta('qi_t', 'Текст', 'Что такое просрочка?\n+ Нарушение срока платежа\n- Закрытие договора\n- Смена тарифа\n\nСледующий вопрос?\n+ ответ\n- ответ', 220)}<label class="opt"><input id="qi_r" type="checkbox"><span>Заменить существующие вопросы модуля</span></label><div class="err" id="pe"></div>${mbtn('qImportGo(' + blockId + ')', 'Импортировать')}`, 1);
}
async function qImportGo(blockId) { try { const r = await api('/blocks/' + blockId + '/questions/import', { method: 'POST', body: { text: val('qi_t'), replace: chk('qi_r') } }); if (r.errors.length) return perr(r.errors.map(e => 'Вопрос ' + e.n + ' («' + e.text + '»): ' + e.error).join('. ')); await reloadCourse(); toast('Добавлено вопросов: ' + r.added); } catch (e) { perr(e.message); } }
// ===== Курсы: редактор в стиле референса =====
const crumb = (t, fn) => `<p class="crumb"><a href="#" onclick="${fn};return false">${t}</a></p>`;
const titleBar = (title, tabs, active, fn) => `<div class="tb"><h1>${title}</h1><div class="tabs">${tabs.map(([k, t]) => `<a href="#" class="${k === active ? 'on' : ''}" onclick="${fn}('${k}');return false">${t}</a>`).join('')}</div></div>`;
const footBar = (l, r) => `<div class="fb"><div class="acts">${l}</div><div class="acts">${r || ''}</div></div>`;
const imgInner = (id, url) => url ? `<div class="imgprev" style="background-image:url('${esc(url)}')" onclick="imgPick('${id}')"></div><button class="sec sm" type="button" onclick="imgSet('${id}','')">Убрать</button>` : `<div class="imgup" onclick="imgPick('${id}')"><span style="font-size:46px;line-height:1">☁</span><br>Загрузить изображение</div>`;
const imgBox = (id, url) => `<div id="${id}_b" class="imgbox"><input type="hidden" id="${id}" value="${esc(url || '')}">${imgInner(id, url || '')}</div>`;
const imgSet = (id, u) => { $('#' + id + '_b').innerHTML = `<input type="hidden" id="${id}" value="${esc(u)}">` + imgInner(id, u); };
const imgPick = id => pickMedia('image', u => imgSet(id, u));
const ctab = k => { S.p.tab = k; render(); };
const btab = k => { S.p.tab = k; render(); };
const ltab = k => { syncLesson(); S.p.tab = k; render(); };
function cSettings(c) {
  return `<div class="form">${fld('ct_t', 'Название <span class="req">*</span>', c.title)}<label class="opt"><input id="ct_p" type="checkbox" ${c.published ? 'checked' : ''}><span>Курс активен (опубликован, виден кандидатам)</span></label>${ta('ct_d', 'Описание', c.description, 120)}<label class="f">Изображение (превью)</label>${imgBox('ct_i', c.image)}<div class="grid2">${fld('ct_n', 'Нужно набрать, % от всех баллов', c.need_percent, 'number')}${fld('ct_y', 'Срок курса, дней', Math.round(c.duration_sec / 86400), 'number')}</div>${ta('ct_s', 'Сообщение при успехе', c.success_message, 60)}${ta('ct_f', 'Сообщение при неудаче', c.fail_message, 60)}<div class="err" id="pe"></div></div>` + footBar(`<button class="bgreen" onclick="courseUpd(${c.id},1)">Сохранить</button><button class="bgreen sec" onclick="courseUpd(${c.id},0)">Применить</button>`, `<button class="borange" onclick="adGo('a_course',{id:${c.id},tab:'settings'})">Отменить</button><button class="bblue" onclick="courseForm(${c.id})">Копировать</button><button class="bred" onclick="courseDel(${c.id})">Удалить</button>`);
}
function cContent(d) {
  const c = d.course;
  return `<div class="form wide"><div class="acts"><button class="bgreen" onclick="blockNew(${c.id})">Добавить модуль</button></div><div style="margin-top:14px">${d.blocks.map((b, i) => `
<div class="mrow mh"><span class="ic">≡</span><span class="badge m">Модуль</span><a class="tt" href="#" onclick="adGo('a_block',{id:${c.id},bid:${b.id},tab:'settings'});return false"><b>${esc(b.title)}</b></a>${b.label === 'final' ? '<span class="badge t">Итоговый</span>' : ''}<span class="mu" style="flex:1">день ${b.day}</span><span class="acts"><button class="ic" title="Выше" ${i ? '' : 'disabled'} onclick="mv('blocks',${b.id},-1)">↑</button><button class="ic" title="Ниже" ${i < d.blocks.length - 1 ? '' : 'disabled'} onclick="mv('blocks',${b.id},1)">↓</button><button class="ic" title="Параметры модуля" onclick="adGo('a_block',{id:${c.id},bid:${b.id},tab:'settings'})">⚙</button><button class="ic red" title="Удалить модуль" onclick="blockDel(${b.id})">🗑</button></span></div>
${b.lessons.map((l, k) => `<div class="mrow"><span class="ic" style="margin-left:26px">≡</span><span class="badge l">Урок</span><a class="tt" href="#" onclick="adGo('a_lesson',{id:${c.id},bid:${b.id},lid:${l.id},tab:'content'});return false">${esc(l.title)}</a><span style="flex:1"></span><span class="acts"><button class="ic" ${k ? '' : 'disabled'} onclick="mv('lessons',${l.id},-1)">↑</button><button class="ic" ${k < b.lessons.length - 1 ? '' : 'disabled'} onclick="mv('lessons',${l.id},1)">↓</button><button class="ic" title="Предпросмотр" onclick="lessonPreview(${l.id},${b.id})">👁</button><button class="ic red" title="Удалить урок" onclick="lessonDel(${l.id})">🗑</button></span></div>`).join('')}
<div class="mrow"><span class="ic" style="margin-left:26px"></span><span class="badge t">Тест</span><a class="tt" href="#" onclick="adGo('a_block',{id:${c.id},bid:${b.id},tab:'questions'});return false">Тест модуля (вопросов: ${b.questions.length})</a><span class="mu" style="flex:1">в тесте ${b.questions_count} · проходной ${b.pass_percent}% · попыток ${b.max_attempts}${b.time_limit_min ? ' · ' + b.time_limit_min + ' мин' : ''}</span></div>
<div class="mrow" style="border:0;padding-top:0"><span style="margin-left:62px"><button class="sec sm" onclick="lessonNew(${b.id})">+ Добавить урок</button></span></div>`).join('') || '<p class="mu">Модулей пока нет. Нажмите «Добавить модуль».</p>'}</div></div>`;
}
function aCourse() {
  const d = AD.course; if (!d) return ''; const c = d.course, tab = S.p.tab || 'settings';
  return crumb('Курсы', "adGo('a_courses')") + titleBar('Редактирование курса', [['settings', 'Настройки'], ['content', 'Материалы']], tab, 'ctab') + (tab === 'content' ? cContent(d) : cSettings(c));
}
async function courseUpd(id, leave) {
  try { await api('/courses/' + id, { method: 'PUT', body: { title: val('ct_t'), description: val('ct_d'), image: val('ct_i'), need_percent: val('ct_n'), duration_days: val('ct_y'), success_message: val('ct_s'), fail_message: val('ct_f'), published: chk('ct_p') } }); toast('Сохранено'); AD.meta = null; if (leave) adGo('a_courses'); else adGo('a_course', { id, tab: 'settings' }); } catch (e) { perr(e.message); }
}
function blockNew(courseId) { mopen(`<h2>Новый модуль</h2>${fld('nb_t', 'Название модуля', '')}<div class="err" id="pe"></div>${mbtn('blockNewGo(' + courseId + ')', 'Создать')}`); }
async function blockNewGo(courseId) { try { const t = val('nb_t'); if (!t) return perr('Введите название'); const r = await api('/courses/' + courseId + '/blocks', { method: 'POST', body: { title: t } }); S.m = ''; await adGo('a_block', { id: courseId, bid: r.id, tab: 'settings', fresh: 1 }); } catch (e) { perr(e.message); } }
function lessonNew(blockId) { mopen(`<h2>Новый урок</h2>${fld('nl_t', 'Название урока', '')}<div class="err" id="pe"></div>${mbtn('lessonNewGo(' + blockId + ')', 'Создать')}`); }
async function lessonNewGo(blockId) { try { const t = val('nl_t'); if (!t) return perr('Введите название'); const r = await api('/blocks/' + blockId + '/lessons', { method: 'POST', body: { title: t, content: [{ type: 'text', text: '' }] } }); S.m = ''; await adGo('a_lesson', { id: S.p.id, bid: blockId, lid: r.id, tab: 'content', fresh: 1 }); } catch (e) { perr(e.message); } }
// --- страница модуля ---
function aBlock() {
  const d = AD.course; if (!d) return ''; const b = d.blocks.find(x => x.id === S.p.bid); if (!b) return ''; const c = d.course, tab = S.p.tab || 'settings';
  return crumb(esc(c.title), `adGo('a_course',{id:${c.id},tab:'content'})`) + titleBar('Редактирование модуля', [['settings', 'Настройки'], ['questions', 'Вопросы теста']], tab, 'btab') + (tab === 'questions' ? bQuestions(b) : bSettings(b)) + footBar(`<button class="bgreen" onclick="blockSave(${b.id},1)">Сохранить</button><button class="bgreen sec" onclick="blockSave(${b.id},0)">Применить</button>`, `<button class="borange" onclick="adGo('a_course',{id:${c.id},tab:'content'})">Отменить</button><button class="bred" onclick="blockDel(${b.id})">Удалить</button>`);
}
function bSettings(b) {
  return `<div class="form">${fld('bk_t', 'Название модуля <span class="req">*</span>', b.title)}<label class="f">Обложка модуля</label>${imgBox('bk_c', b.cover)}<div class="grid2">${fld('bk_d', 'День открытия (с начала курса)', b.day, 'number')}${fld('bk_q', 'Вопросов в тесте', b.questions_count, 'number')}${fld('bk_p', 'Проходной результат, %', b.pass_percent, 'number')}${fld('bk_a', 'Число попыток', b.max_attempts, 'number')}${fld('bk_m', 'Время теста, минут (0 — без ограничения)', b.time_limit_min, 'number')}</div><label class="opt"><input id="bk_f" type="checkbox" ${b.label === 'final' ? 'checked' : ''}><span>Итоговый тест (последний модуль курса)</span></label><div class="err" id="pe"></div></div>`;
}
function bQuestions(b) {
  return `<div class="form wide"><div class="acts"><button class="bgreen" onclick="qForm(0,${b.id})">Добавить вопрос</button><button class="sec" onclick="qImport(${b.id})">Импорт текстом</button></div><div style="margin-top:14px">${b.questions.map((q, k) => `<div class="mrow" style="align-items:flex-start"><span class="badge t">${k + 1}</span><div style="flex:1"><a class="tt" href="#" onclick="qForm(${q.id},${b.id});return false"><b>${esc(q.text)}</b></a> ${q.type === 'multi' ? '<span class="badge m">несколько ответов</span>' : ''}${q.options.map(o => `<div class="${o.correct ? '' : 'mu'}">${o.correct ? '✓ ' : '· '}${esc(o.text)}</div>`).join('')}</div><span class="acts"><button class="ic" title="Изменить" onclick="qForm(${q.id},${b.id})">✎</button><button class="ic red" title="Удалить" onclick="qDel(${q.id})">🗑</button></span></div>`).join('') || '<p class="mu">Вопросов пока нет</p>'}</div></div>`;
}
async function blockSave(id, leave) {
  try { const cid = S.p.id; await api('/blocks/' + id, { method: 'PUT', body: { title: val('bk_t'), day: val('bk_d'), questions_count: val('bk_q'), pass_percent: val('bk_p'), max_attempts: val('bk_a'), time_limit_min: val('bk_m'), label: chk('bk_f') ? 'final' : '', cover: val('bk_c') } }); toast('Сохранено'); if (leave) adGo('a_course', { id: cid, tab: 'content' }); else adGo('a_block', { id: cid, bid: id, tab: 'settings', fresh: 1 }); } catch (e) { perr(e.message); }
}
// --- страница урока ---
const md = s => { let out = '', ul = false; for (const l of esc(s || '').split('\n')) { const m = l.match(/^\s*[-•]\s+(.*)$/); if (m) { if (!ul) { out += '<ul>'; ul = true; } out += '<li>' + m[1] + '</li>'; } else { if (ul) { out += '</ul>'; ul = false; } if (l.trim()) out += '<p>' + l + '</p>'; } } if (ul) out += '</ul>'; return out.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>'); };
function initLesson(p) {
  const b = AD.course.blocks.find(x => x.id === p.bid), l = p.lid && b ? b.lessons.find(x => x.id === p.lid) : null;
  S.ld = l ? JSON.parse(JSON.stringify({ title: l.title, image: l.image || '', content: l.content })) : { title: '', image: '', content: [{ type: 'text', text: '' }] };
}
function syncLesson() { if (!S.ld) return; if ($('#ls_t')) S.ld.title = $('#ls_t').value; if ($('#ls_i')) S.ld.image = $('#ls_i').value; }
function aLesson() {
  const d = AD.course; if (!d || !S.ld) return ''; const c = d.course, b = d.blocks.find(x => x.id === S.p.bid), tab = S.p.tab || 'content';
  return crumb(esc(c.title) + ' / ' + esc(b.title), `adGo('a_course',{id:${c.id},tab:'content'})`) + titleBar('Редактирование урока', [['settings', 'Настройки'], ['content', 'Контент']], tab, 'ltab') + (tab === 'settings' ? `<div class="form">${fld('ls_t', 'Название урока <span class="req">*</span>', S.ld.title)}<label class="f">Изображение урока (необязательно, иначе используется обложка модуля)</label>${imgBox('ls_i', S.ld.image)}<div class="err" id="pe"></div></div>` : `<div class="split"><div><div class="acts" style="margin-bottom:8px"><select id="lb_t" style="width:auto">${Object.entries(BT).map(([k, t]) => `<option value="${k}">${t}</option>`).join('')}</select><button class="bgreen sm" onclick="DR.l.push({type:val('lb_t'),text:'',title:'',url:'',caption:''});lbDraw()">+ Добавить блок</button></div><div id="lb"></div></div><div class="pvwrap"><div class="pvbar">Предпросмотр урока</div><div id="lpv" class="pv"></div></div></div><div class="err" id="pe"></div>`) + footBar(`<button class="bgreen" onclick="lessonSave(1)">Сохранить</button><button class="bgreen sec" onclick="lessonSave(0)">Применить</button>`, `<button class="borange" onclick="adGo('a_course',{id:${c.id},tab:'content'})">Отменить</button>${S.p.lid ? `<button class="bred" onclick="lessonDel(${S.p.lid})">Удалить</button>` : ''}`);
}
function lpHtml(L, b) {
  const bg = L.image ? `background-image:url('${esc(L.image)}')` : (b && b.cover ? `background-image:url('${esc(b.cover)}')` : '');
  return `<div class="pvh" style="${bg}"><span class="pvb">Урок</span><h2>${esc(L.title || 'Без названия')}</h2></div><div class="pvc">${L.content.map(cb).join('') || '<p class="mu">Блоков пока нет</p>'}</div>`;
}
function lpDraw() { const e = $('#lpv'); if (e && S.ld) { const b = AD.course.blocks.find(x => x.id === S.p.bid); e.innerHTML = lpHtml(S.ld, b); } }
function adAfter() { if (S.scr === 'a_lesson' && (S.p.tab || 'content') === 'content' && S.ld) { DR.l = S.ld.content; lbDraw(); lpDraw(); } }
async function lessonSave(leave) {
  try {
    syncLesson(); if (!S.ld.title.trim()) { S.p.tab = 'settings'; render(); return perr('Введите название урока'); }
    const cid = S.p.id, body = { title: S.ld.title, image: S.ld.image, content: S.ld.content }; let lid = S.p.lid;
    if (lid) await api('/lessons/' + lid, { method: 'PUT', body }); else lid = (await api('/blocks/' + S.p.bid + '/lessons', { method: 'POST', body })).id;
    toast('Сохранено'); if (leave) adGo('a_course', { id: cid, tab: 'content' }); else adGo('a_lesson', { id: cid, bid: S.p.bid, lid, tab: S.p.tab || 'content', fresh: 1 });
  } catch (e) { perr(e.message); }
}
function lessonPreview(lid, bid) { const b = AD.course.blocks.find(x => x.id === bid), l = b.lessons.find(x => x.id === lid); mopen(`<div class="pv">${lpHtml({ title: l.title, image: l.image, content: l.content }, b)}</div><div class="acts" style="margin-top:12px"><button class="sec" onclick="mclose()">Закрыть</button></div>`, 1); }

// ===== Направления =====
function aDirs() {
  return `<div class="card"><h1>Направления</h1><p class="mu">Направление — это профиль обучения (например, Soft Collection). У каждого направления свои курсы.</p><button onclick="dirForm(0)">+ Новое направление</button><div class="tw" style="margin-top:14px"><table><tr><th>Название</th><th>Срок доступа по умолчанию</th><th>Кандидатов</th><th>Статус</th><th></th></tr>${AD.dirs.map(d => `<tr><td><b>${esc(d.name)}</b></td><td>${d.deadline_days} дн.</td><td>${d.students}</td><td><span class="tag ${d.active ? 'ok' : ''}">${d.active ? 'Активно' : 'Отключено'}</span></td><td><div class="acts"><button class="sec sm" onclick="dirForm(${d.id})">Изменить</button><button class="sec sm" onclick="dirDel(${d.id})">Удалить</button></div></td></tr>`).join('')}</table></div></div>`;
}
function dirForm(id) { const d = AD.dirs.find(x => x.id === id) || { name: '', deadline_days: 14, active: 1 }; mopen(`<h2>${id ? 'Изменить направление' : 'Новое направление'}</h2>${fld('dn', 'Название', d.name)}${fld('dd', 'Срок доступа по умолчанию, дней', d.deadline_days, 'number')}${id ? `<label class="opt"><input id="da" type="checkbox" ${d.active ? 'checked' : ''}><span>Активно</span></label>` : ''}<div class="err" id="pe"></div>${mbtn('dirSave(' + id + ')', 'Сохранить')}`); }
async function dirSave(id) { try { const b = { name: val('dn'), deadline_days: val('dd'), active: id ? (chk('da') ? 1 : 0) : 1 }; await api(id ? '/directions/' + id : '/directions', { method: id ? 'PUT' : 'POST', body: b }); S.m = ''; await adRefresh(); toast('Сохранено'); } catch (e) { perr(e.message); } }
function dirDel(id) { mopen(`<h2>Удалить направление?</h2><p>Вместе с направлением удалятся его курсы. Если в нём есть кандидаты, удаление будет отклонено.</p><div class="acts"><button onclick="dirDelOk(${id})">Удалить</button><button class="sec" onclick="mclose()">Отмена</button></div>`); }
async function dirDelOk(id) { try { await api('/directions/' + id, { method: 'DELETE' }); S.m = ''; await adRefresh(); toast('Удалено'); } catch (e) { S.m = ''; render(); toast(e.message); } }
// ===== Сотрудники =====
function aStaff() {
  return `<div class="card"><h1>Сотрудники</h1><p class="mu">Администратор — всё. Тренер — курсы, уроки, вопросы и сброс попыток. Рекрутер — кандидаты, потоки и приглашения.</p><button onclick="staffForm(0)">+ Добавить сотрудника</button><div class="tw" style="margin-top:14px"><table><tr><th>Сотрудник</th><th>Роль</th><th>Статус</th><th>Последний вход</th><th></th></tr>${AD.staff.map(u => `<tr><td><b>${esc(u.full_name || '—')}</b><br><span class="mu">${esc(u.login)}</span></td><td>${ROLE[u.role]}</td><td><span class="tag ${u.active ? 'ok' : 'no'}">${u.active ? 'Активен' : 'Отключён'}</span></td><td>${u.last_login_at ? new Date(u.last_login_at).toLocaleString('ru-RU') : '—'}</td><td><div class="acts"><button class="sec sm" onclick="staffForm(${u.id})">Изменить</button>${u.login === S.me.login ? '' : `<button class="sec sm" onclick="staffDel(${u.id})">Удалить</button>`}</div></td></tr>`).join('')}</table></div></div>`;
}
function staffForm(id) { const u = AD.staff.find(x => x.id === id) || { login: '', full_name: '', role: 'recruiter', active: 1 }; mopen(`<h2>${id ? 'Изменить сотрудника' : 'Новый сотрудник'}</h2>${id ? `<p class="mu">${esc(u.login)}</p>` : fld('sf_l', 'Рабочая почта (логин)', '', 'email')}${fld('sf_n', 'ФИО', u.full_name)}${sel('sf_r', 'Роль', [['admin', 'Администратор'], ['trainer', 'Тренер'], ['recruiter', 'Рекрутер']], u.role)}${fld('sf_p', id ? 'Новый пароль (оставьте пустым, чтобы не менять)' : 'Пароль (не короче 8 символов)', '', 'password')}${id ? `<label class="opt"><input id="sf_a" type="checkbox" ${u.active ? 'checked' : ''}><span>Активен</span></label>` : ''}<div class="err" id="pe"></div>${mbtn('staffSave(' + id + ')', 'Сохранить')}`); }
async function staffSave(id) { try { const b = { full_name: val('sf_n'), role: val('sf_r'), password: $('#sf_p').value, active: id ? (chk('sf_a') ? 1 : 0) : 1 }; if (!id) b.login = val('sf_l'); if (id && !b.password) delete b.password; await api(id ? '/staff/' + id : '/staff', { method: id ? 'PUT' : 'POST', body: b }); S.m = ''; await adRefresh(); toast('Сохранено'); } catch (e) { perr(e.message); } }
function staffDel(id) { mopen(`<h2>Удалить сотрудника?</h2><div class="acts"><button onclick="staffDelOk(${id})">Удалить</button><button class="sec" onclick="mclose()">Отмена</button></div>`); }
async function staffDelOk(id) { try { await api('/staff/' + id, { method: 'DELETE' }); S.m = ''; await adRefresh(); toast('Удалено'); } catch (e) { toast(e.message); } }
// ===== Настройки и журнал =====
function aSet() {
  const s = AD.set, img = (id, t, v, kind) => `<div class="acts" style="align-items:end;flex-wrap:nowrap"><div style="flex:1">${fld(id, t, v || '', 'text', 'Ссылка на картинку')}</div><button class="sec sm" type="button" onclick="pickMedia('image',u=>{$('#${id}').value=u})">Из медиатеки</button></div>`;
  return `<div class="card"><h1>Настройки</h1><h2>Картинки сайта</h2><p class="mu">Загрузите картинки в разделе «Медиатека», затем выберите их здесь. Если поле пустое, показывается стандартное оформление.</p>${img('st_ih', 'Главная страница (большой баннер)', s.img_hero)}${img('st_it', 'Раздел «Тесты» (баннер)', s.img_tests)}${img('st_ip', 'Личный кабинет (баннер)', s.img_profile)}</div>
<div class="card"><h2>Текст приглашения кандидату</h2><p class="mu">Подстановки: {name} — имя, {link} — ссылка на сайт, {phone} — номер, {code} — код доступа, {deadline} — срок.</p>${ta('st_ru', 'Русский', s.invite_ru, 150)}${ta('st_uz', 'Узбекский', s.invite_uz, 150)}<div class="err" id="pe"></div><p style="margin-top:12px"><button onclick="setSave()">Сохранить настройки</button></p></div>`;
}
async function setSave() { try { await api('/settings', { method: 'PUT', body: { invite_ru: $('#st_ru').value, invite_uz: $('#st_uz').value, img_hero: val('st_ih'), img_tests: val('st_it'), img_profile: val('st_ip') } }); AD.meta = null; AD.set = await api('/settings'); toast('Сохранено'); } catch (e) { perr(e.message); } }
// ===== Медиатека =====
const mediaUrl = id => ((window.CFG && window.CFG.api) || '') + '/media/' + id + '/file';
const mSize = n => n > 1048576 ? (n / 1048576).toFixed(1) + ' МБ' : Math.max(1, Math.round(n / 1024)) + ' КБ';
const mthumb = x => `<div class="mthumb">${x.mime.startsWith('image/') ? `<img src="${esc(mediaUrl(x.id))}" alt="" loading="lazy">` : x.mime.startsWith('video/') ? '🎬' : '📄'}</div>`;
function aMedia() {
  const m = AD.media;
  return `<div class="card"><h1>Медиатека</h1><p class="mu">Загружайте картинки (JPG, PNG, WebP, GIF), короткие видео (MP4, WebM) и PDF до 4 МБ. Большие картинки уменьшаются автоматически. Длинные видео лучше вставлять в урок ссылкой на YouTube или Vimeo.</p><div class="acts"><button onclick="$('#mf').click()">+ Загрузить файлы</button><span id="mu" class="mu"></span></div><input id="mf" type="file" multiple accept="image/*,video/mp4,video/webm,application/pdf" style="display:none" onchange="mediaUpload(this.files)"><div class="mg" style="margin-top:14px">${m.map(x => `<div>${mthumb(x)}<b style="font-size:13px;word-break:break-all">${esc(x.name)}</b><span class="mu" style="display:block">${mSize(x.size)}</span><div class="acts" style="margin-top:6px"><button class="sec sm" onclick="mediaCopy(${x.id})">Копировать ссылку</button><button class="sec sm" onclick="mediaDel(${x.id})">Удалить</button></div></div>`).join('') || '<p class="mu">Файлов пока нет</p>'}</div></div>`;
}
const readB64 = f => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result).split(',')[1]); r.onerror = () => rej(new Error('Не удалось прочитать файл')); r.readAsDataURL(f); });
async function shrink(f) {
  const url = URL.createObjectURL(f);
  try {
    const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('Не удалось открыть картинку')); i.src = url; });
    const k = Math.min(1, 1600 / Math.max(img.width, img.height)); if (k === 1 && f.size < 1500000) return { mime: f.type, data: await readB64(f) };
    const cv = document.createElement('canvas'); cv.width = Math.round(img.width * k); cv.height = Math.round(img.height * k); cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
    return { mime: 'image/jpeg', data: cv.toDataURL('image/jpeg', 0.85).split(',')[1] };
  } finally { URL.revokeObjectURL(url); }
}
async function mediaUpload(files) {
  let ok = 0; const out = () => $('#mu');
  for (const f of [...files]) {
    try { if (out()) out().textContent = 'Загрузка: ' + f.name + '…'; let mime = f.type, data; if (/^image\/(jpeg|png|webp)$/.test(mime)) { const r = await shrink(f); mime = r.mime; data = r.data; } else data = await readB64(f); await api('/media', { method: 'POST', body: { name: f.name, mime, data } }); ok++; }
    catch (e) { toast(f.name + ': ' + e.message); }
  }
  AD.media = await api('/media'); render(); if (ok) toast('Загружено файлов: ' + ok);
}
async function mediaCopy(id) { toast(await copyText(mediaUrl(id)) ? 'Ссылка скопирована' : 'Не удалось скопировать'); }
const mediaDel = id => mopen(`<h2>Удалить файл?</h2><p>Если он вставлен в урок или обложку, там картинка пропадёт.</p><div class="acts"><button onclick="mediaDelOk(${id})">Удалить</button><button class="sec" onclick="mclose()">Отмена</button></div>`);
async function mediaDelOk(id) { try { await api('/media/' + id, { method: 'DELETE' }); S.m = ''; AD.media = await api('/media'); render(); toast('Удалено'); } catch (e) { toast(e.message); } }
async function pickMedia(kind, cb) {
  const snap = { m: S.m, mw: S.mw, vals: [...document.querySelectorAll('.mbox input[id],.mbox textarea[id],.mbox select[id]')].map(e => [e.id, e.type === 'checkbox' ? e.checked : e.value]) };
  S.pk = { snap, cb, list: [] }; mopen('<p>Загрузка…</p>', 1);
  try {
    AD.media = await api('/media'); S.pk.list = AD.media.filter(x => kind === 'image' ? x.mime.startsWith('image/') : kind === 'video' ? x.mime.startsWith('video/') : true);
    mopen(`<h2>Выбрать из медиатеки</h2><div class="acts" style="margin-bottom:10px"><button class="bgreen sm" type="button" onclick="$('#pf').click()">+ Загрузить новый файл</button><input id="pf" type="file" accept="image/*,video/mp4,video/webm,application/pdf" style="display:none" onchange="pickUpload(this.files)"></div>${S.pk.list.length ? `<div class="mg">${S.pk.list.map((x, i) => `<div style="cursor:pointer" onclick="pickDone(${i})">${mthumb(x)}<b style="font-size:13px;word-break:break-all">${esc(x.name)}</b></div>`).join('')}</div>` : '<p class="mu">Подходящих файлов нет. Сначала загрузите их в разделе «Медиатека».</p>'}<div class="acts" style="margin-top:12px"><button class="sec" onclick="pickBack()">Назад</button></div>`, 1);
  } catch (e) { pickBack(); toast(e.message); }
}
function pickBack(after) {
  const p = S.pk; if (!p) return; S.m = p.snap.m; S.mw = p.snap.mw; render();
  p.snap.vals.forEach(([id, v]) => { const e = $('#' + id); if (e) { if (e.type === 'checkbox') e.checked = v; else e.value = v; } });
  if (after) after(); if ($('#lb')) lbDraw(); if ($('#qo')) qoDraw();
}
async function pickUpload(files) { const f = files[0]; if (!f) return; try { toast('Загрузка…'); let mime = f.type, data; if (/^image\/(jpeg|png|webp)$/.test(mime)) { const r = await shrink(f); mime = r.mime; data = r.data; } else data = await readB64(f); const r = await api('/media', { method: 'POST', body: { name: f.name, mime, data } }); pickBack(() => S.pk.cb(mediaUrl(r.id), { name: f.name })); } catch (e) { toast(e.message); } }
const pickDone = i => { const x = S.pk.list[i]; pickBack(() => S.pk.cb(mediaUrl(x.id), x)); };
const ACT = { candidate_update: 'Изменён кандидат', candidates_import: 'Импорт кандидатов', cohort_create: 'Создан поток', cohort_update: 'Изменён поток', cohort_delete: 'Удалён поток', cohort_assign: 'Состав потока', direction_create: 'Создано направление', direction_update: 'Изменено направление', direction_delete: 'Удалено направление', course_create: 'Создан курс', course_update: 'Изменён курс', course_delete: 'Удалён курс', block_delete: 'Удалён модуль', questions_import: 'Импорт вопросов', staff_create: 'Добавлен сотрудник', staff_update: 'Изменён сотрудник', staff_delete: 'Удалён сотрудник', settings_update: 'Изменены настройки' };
function aAudit() { return `<div class="card"><h1>Журнал действий</h1><div class="tw"><table><tr><th>Когда</th><th>Кто</th><th>Действие</th><th>Подробности</th></tr>${AD.audit.map(a => `<tr><td>${new Date(a.at).toLocaleString('ru-RU')}</td><td>${esc(a.login || '—')}</td><td>${ACT[a.action] || esc(a.action)}</td><td>${esc(a.detail)}</td></tr>`).join('') || '<tr><td colspan="4" class="mu">Записей пока нет</td></tr>'}</table></div></div>`; }

// ---------- отрисовка ----------
function trans() { const w = document.createTreeWalker($('#app'), NodeFilter.SHOW_TEXT); let n; while (n = w.nextNode()) { if (n.nodeValue.trim()) n.nodeValue = tr(n.nodeValue); } document.querySelectorAll('#app [placeholder]').forEach(e => { e.placeholder = tr(e.placeholder); }); }
function render() {
  const a = $('#app'), c = isC(); document.body.classList.toggle('prot', !!c); document.body.classList.toggle('adm', !!(S.me && !c)); const wm = $('#wm'); wm.hidden = !c;
  if (c) { const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='420' height='280'><text x='40' y='140' font-size='12' font-family='sans-serif' fill='%23808a99' fill-opacity='.17'>${fmt(S.me.login)}</text></svg>`; wm.style.background = `url("data:image/svg+xml;utf8,${svg}")`; }
  if (!S.me) a.innerHTML = loginV(); else if (!c) a.innerHTML = adminV(); else if (S.st && S.st.choose) a.innerHTML = chooseV(); else if (!S.st || !S.st.enrollment) a.innerHTML = '<div class="wrap login"><div class="card"><p>Для вас ещё не назначено обучение. Обратитесь к организатору.</p><button class="sec" onclick="logout()">Выйти</button></div></div>'; else a.innerHTML = shell((V[S.scr] || V.main)());
  if (!S.me) bindLogin(); if (S.me && !c) adAfter(); if (S.lang === 'uz' && (!S.me || c)) trans();
}
['contextmenu', 'copy', 'cut', 'dragstart'].forEach(e => document.addEventListener(e, x => { if (document.body.classList.contains('prot')) x.preventDefault(); }));
document.addEventListener('keydown', e => { if (document.body.classList.contains('prot') && (e.key === 'PrintScreen' || ((e.ctrlKey || e.metaKey) && ['p', 's', 'c', 'a'].includes(e.key.toLowerCase())))) e.preventDefault(); });
const hide = () => { if (document.body.classList.contains('prot')) document.body.classList.add('blur'); }, unhide = () => document.body.classList.remove('blur');
document.addEventListener('visibilitychange', () => document.hidden ? hide() : unhide()); addEventListener('blur', hide); addEventListener('focus', unhide);
boot();
