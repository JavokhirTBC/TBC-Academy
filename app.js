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
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmt = d => { d = String(d || '').slice(-9); return '+998 ' + d.slice(0, 2) + ' ' + d.slice(2, 5) + ' ' + d.slice(5, 7) + ' ' + d.slice(7); };
[['Модуль', 'Modul'], ['Уроки модуля', 'Modul darslari'], ['Тест модуля', 'Modul testi'], ['Откроется в день ', 'Ochiladi: '], ['Сначала пройдите предыдущий модуль', 'Avval oldingi modulni tugating'], ['Прочитано', 'O‘qilgan'], ['Не прочитано', 'O‘qilmagan'], ['Открыть', 'Ochish'], ['Далее', 'Keyingi'], ['Назад', 'Orqaga'], ['К тесту', 'Testga'], ['Прочитайте все уроки модуля, чтобы открыть тест', 'Testni ochish uchun modulning barcha darslarini o‘qing'], ['Начать тест', 'Testni boshlash'], ['Продолжить тест', 'Testni davom ettirish'], ['Попыток: ', 'Urinishlar: '], ['Лучший результат: ', 'Eng yaxshi natija: '], ['Выберите язык обучения', 'O‘qish tilini tanlang'], ['Русский', 'Русский'], ['Статус', 'Holat'], ['Курс', 'Kurs'], ['Приглашён', 'Taklif qilingan'], ['Обучение идёт', 'O‘qish davom etmoqda'], ['Онлайн-часть пройдена', 'Onlayn qism tugatilgan'], ['Не пройдено', 'O‘tilmagan'], ['Срок истёк', 'Muddat tugagan'], ['Показать правильные ответы нельзя: в истории виден только номер выбранного варианта.', 'To‘g‘ri javoblar ko‘rsatilmaydi: tarixda faqat tanlangan variant raqami ko‘rinadi.'], ['Вариант ', 'Variant '], ['не отвечено', 'javob berilmagan'], ['Ошибка', 'Xatolik']].forEach(x => PAIRS.push(x));
PAIRS.sort((a, b) => b[0].length - a[0].length);
let S = { lang: localStorage.getItem('lang') || 'ru', tok: localStorage.getItem('tok') || '', me: null, st: null, scr: 'main', p: {}, q: '', m: '', ad: {}, att: null, tm: null, res: null, lesson: null, hist: null };
function toast(m) { const t = document.createElement('div'); t.className = 'toast'; t.textContent = trs(m); document.body.appendChild(t); setTimeout(() => t.remove(), 3200); }
async function api(p, o = {}) {
  const C = window.CFG || {};
  const h = { 'Content-Type': 'application/json' };
  if (C.useKey && C.key) { h.apikey = C.key; h.Authorization = 'Bearer ' + C.key; }
  if (S.tok) h['X-Token'] = S.tok;
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
  if (S.tok) { try { S.me = (await api('/me')).user; if (isC()) await refresh(); else await loadAd(); } catch (e) { dropSession(); } }
  render();
}
async function go(scr, p = {}) {
  clearInterval(S.tm); S.m = '';
  try {
    if (scr === 'lesson') { S.lesson = await api('/lessons/' + p.id); await refresh(); }
    else if (scr === 'hist') { S.hist = await api('/blocks/' + p.id + '/attempts'); }
    else if (scr === 'test') { S.att = await api('/blocks/' + p.id + '/attempts', { method: 'POST' }); }
    else if (isC() && ['main', 'lessons', 'tests', 'progress', 'rating', 'profile', 'block'].includes(scr)) await refresh();
    else if (!isC() && S.me) await loadAd(scr);
  } catch (e) { toast(e.message); if (isC()) { try { await refresh(); } catch (x) { } scr = scr === 'test' ? 'block' : scr === 'lesson' ? 'lessons' : S.scr; p = scr === 'block' ? { id: p.id } : {}; } else return; }
  S.scr = scr; S.p = p; render(); scrollTo(0, 0);
  if (scr === 'test') startTimer();
}
async function loadAd(scr) {
  const s = scr || S.scr;
  if (!S.ad.meta) S.ad.meta = await api('/meta');
  if (s === 'a_cands' || !['a_cohorts', 'a_courses'].includes(s)) S.ad.cands = await api('/candidates');
  if (s === 'a_cohorts') S.ad.cohorts = await api('/cohorts');
  if (s === 'a_courses') S.ad.courses = await api('/courses');
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
const statusPill = b => b.status === 'passed' ? ['dn', 'Пройден'] : b.status === 'locked' ? ['lk', 'Закрыто'] : b.status === 'failed' ? ['no', 'Не пройден'] : ['ok', 'Доступен'];

// ---------- оболочка кандидата ----------
function sidebar() {
  const st = S.st, p = st.points, on = { main: 'main', lessons: 'lessons', block: 'lessons', lesson: 'lessons', tests: 'tests', test: 'tests', tres: 'tests', hist: 'tests', progress: 'progress', rating: 'rating', profile: 'profile' }[S.scr];
  const n = [['main', 'Главная'], ['lessons', 'Уроки'], ['tests', 'Тесты'], ['progress', 'Прогресс'], ['rating', 'Рейтинг'], ['profile', 'Личный кабинет']];
  return `<div class="logo"><svg class="lg0" viewBox="0 0 100 100" width="30" height="30"><path d="M50 8 L93 87 Q50 97 7 87 Z" fill="#111" stroke="#111" stroke-width="6" stroke-linejoin="round"/><path d="M50 57 L50 10 M50 57 L89 86 M50 57 L11 86" stroke="#fff" stroke-width="5" fill="none"/></svg><span>TBC<br>Uzbekistan</span></div><nav>${n.map(([k, t]) => `<button class="${on === k ? 'on' : ''}" onclick="go('${k}')"><span>${t}</span>${IC[k]}</button>`).join('')}</nav>
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
V.main = () => `<div class="hero ih"><h1>Продукты TBC</h1><p>Ежемесячно миллионы клиентов пользуются услугами TBC Bank: совершают платежи и переводы, оформляют кредиты, управляют счетами и вкладами. Но как работают эти продукты? В чем их особенности?</p>${nextAct()}</div><div class="plain">Отдел взыскания — это важное звено в финансовой системе компании. Его основная задача — взаимодействие с клиентами, имеющими просроченную задолженность, и поиск оптимальных решений для ее погашения</div><div class="g3">${PR.slice(0, 3).map(prc).join('')}</div>${note}`;
V.lessons = () => {
  const bs = S.st.blocks, q = S.q.toLowerCase(), i0 = bs.findIndex(b => b.status !== 'passed');
  const head = i0 < 0 ? 'Вы прошли все уроки!' : i0 === 0 ? 'Вас ждет первый урок!' : 'Вас ждет урок ' + (i0 + 1) + '!';
  return `<p class="lead">${head}<br>Прочитайте его и пройдите тесты, тогда вам будет доступен следующий урок!</p><h1 class="bigh">Вперед за знаниями!</h1><div class="g3">${bs.map((b, i) => ({ b, i })).filter(x => x.b.title.toLowerCase().includes(q)).map(({ b, i }) => {
    const [c, t] = statusPill(b), can = b.status !== 'locked';
    return `<div class="pc ${can ? 'click' : ''}" ${can ? `onclick="go('block',{id:${b.id}})"` : ''}><div class="im ${coverCls(b, i)}"></div><div class="bd"><h3>${esc(b.title)}</h3><div class="foot"><span class="mu">${b.status === 'locked' && b.reason === 'day' ? 'Откроется в день ' + b.day : ''}</span><span class="pill ${c}">${t}</span></div></div></div>`;
  }).join('') || '<p class="mu">Ничего не найдено.</p>'}</div>`;
};
V.block = () => {
  const b = blk(S.p.id), i = idx(b.id), [c, t] = statusPill(b);
  return `<p><button class="lnk" onclick="go('lessons')">← К списку уроков</button></p><div class="cover ${coverCls(b, i)}"></div><div class="card"><h1>${esc(b.title)}</h1><span class="pill ${c}">${t}</span>${S.q ? '' : ''}</div>
${b.lessons.length ? `<div class="card"><h2>Уроки модуля</h2>${b.lessons.map(l => `<div class="row"><div class="t"><b>${esc(l.title)}</b><span class="mu">${l.viewed ? 'Прочитано' : 'Не прочитано'}</span></div><button class="${l.viewed ? 'sec' : ''}" onclick="go('lesson',{id:${l.id}})">Открыть</button></div>`).join('')}</div>` : ''}
<div class="card"><h2>Тест модуля</h2><p class="mu">Вопросов: ${b.questions_count}. Проходной результат: ${b.pass_percent}%. Попыток: ${b.used} / ${b.max_attempts}${b.time_limit_min ? '. Время: ' + b.time_limit_min + ' мин' : ''}</p>${b.best !== null ? `<p class="mu">Лучший результат: ${b.best}%</p>` : ''}
${b.status === 'open' ? (b.ready ? `<button onclick="go('test',{id:${b.id}})">${b.openAttempt ? 'Продолжить тест' : 'Начать тест'}</button>` : `<p class="mu">Прочитайте все уроки модуля, чтобы открыть тест</p>`) : b.status === 'passed' ? '<p>Тест пройден.</p>' : b.status === 'failed' ? '<p>Попытки закончились. Обратитесь к тренеру.</p>' : '<p class="mu">Сначала пройдите предыдущий модуль</p>'}
${b.used ? `<p><button class="sec sm" onclick="go('hist',{id:${b.id}})">Мои ответы</button></p>` : ''}</div>`;
};
const cb = b => ({ heading: x => `<h2>${esc(x.text)}</h2>`, text: x => `<p>${esc(x.text).replace(/\n/g, '<br>')}</p>`, callout: x => `<div class="callout">${esc(x.text).replace(/\n/g, '<br>')}</div>`, accordion: x => `<details class="acc"><summary>${esc(x.title)}</summary><p>${esc(x.text).replace(/\n/g, '<br>')}</p></details>`, image: x => `<img class="mi" src="${esc(x.url)}" alt="${esc(x.caption || '')}">`, video: x => `<video class="mi" controls src="${esc(x.url)}"></video>`, file: x => `<p><a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.title || 'Файл')}</a></p>`, divider: () => '<hr>' }[b.type] || (() => ''))(b);
V.lesson = () => {
  const l = S.lesson, b = blk(l.block_id), i = idx(b.id), li = b.lessons.findIndex(x => x.id === l.id), nx = b.lessons[li + 1], pv = b.lessons[li - 1];
  return `<p><button class="lnk" onclick="go('block',{id:${b.id}})">← ${esc(b.title)}</button></p><div class="cover ${coverCls(b, i)}"></div><div class="card"><div class="mu">${b.lessons.length > 1 ? (li + 1) + ' / ' + b.lessons.length : ''}</div>${l.content.map(cb).join('')}</div>
<div class="card"><div class="acts">${pv ? `<button class="sec" onclick="go('lesson',{id:${pv.id}})">Назад</button>` : ''}${nx ? `<button onclick="go('lesson',{id:${nx.id}})">Далее</button>` : (b.status === 'open' ? `<button onclick="go('test',{id:${b.id}})">К тесту</button>` : `<button class="sec" onclick="go('block',{id:${b.id}})">К списку уроков</button>`)}</div></div>`;
};
V.tests = () => `<div class="hero it"><h1>Тесты</h1><p>Проверьте знания после каждого урока. Правильные ответы не показываются, в истории виден номер выбранного вами варианта.</p><button class="tq" onclick="startNext()">Начать тесты</button></div><div class="g3">${S.st.blocks.map((b, i) => {
  const [c, t] = statusPill(b), can = b.status === 'open' && b.ready;
  return `<div class="pc"><div class="im ${coverCls(b, i)}" style="height:90px"></div><div class="bd"><h3>${esc(b.title)}</h3><span class="mu">Тесты</span><div class="foot"><span class="pill ${c}">${t}${b.best !== null ? ': ' + b.best + '%' : ''}</span>${b.used ? `<button class="sec sm" onclick="go('hist',{id:${b.id}})">Мои ответы</button>` : `<button class="sm" ${can ? '' : 'disabled'} onclick="go('test',{id:${b.id}})">Пройти</button>`}</div></div></div>`;
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
  return `<div class="card prog"><div><h2>Посмотрите на свой прогресс</h2><p style="margin:0">Вы на этапе ${Math.min(dn + 1, bs.length)} из ${bs.length}<br>Осталось: уроков ${tl - rd}; тестов ${bs.length - dn}</p></div><div class="gs">${[[tl ? Math.round(rd / tl * 100) : 0, 'Изучено уроков', rd + '/' + tl], [Math.round(dn / bs.length * 100), 'Пройдено тестов', dn + '/' + bs.length], [avg, 'Средний процент верных ответов', '']].map(g => `<div class="gi">${gauge(g[0], 64)}<div class="mu">${g[1]}<br><b>${g[2]}</b></div></div>`).join('')}</div></div><div class="g3">${bs.map((b, i) => `<div class="pc"><div class="bd"><div class="pg"><h3>${esc(b.title)}</h3>${gauge(b.best || 0, 64)}</div></div><div class="im ${coverCls(b, i)}" style="height:56px"></div></div>`).join('')}</div>`;
};
V.rating = () => {
  const r = S.st.rating; if (!r) return '<div class="card"><h1>Рейтинг</h1><p>Рейтинг доступен участникам потока.</p></div>';
  const bars = [['Прохождение уроков и тестов', r.parts[0], 40], ['Качество тестов', r.parts[1], 40], ['Активность на сайте', r.parts[2], 20]], row = x => `<div class="row" style="${x.me ? 'font-weight:600;background:var(--pr2);padding-left:10px;padding-right:10px;border-radius:6px' : ''}"><span style="width:28px">${x.i}</span><div class="t">${x.me ? 'Вы' : 'Участник ' + x.i}</div><span>${x.s}</span></div>`;
  return `<div class="card"><h1>Рейтинг</h1><p class="mu">${esc(S.st.enrollment.cohort || '')} · участников: ${r.n}</p><div class="big">Ваше место: <b>${r.place}</b> из ${r.n}</div><p class="mu">Баллов рейтинга: ${r.score} из 100</p></div><div class="card"><h2>Из чего складывается рейтинг</h2>${bars.map(b => `<div class="ans"><div style="display:flex;justify-content:space-between;gap:10px"><span>${b[0]}</span><span class="mu">вес ${b[2]}% · ${b[1]} из 100</span></div><div class="bar"><i style="width:${b[1]}%"></i></div></div>`).join('')}<p class="mu">Рейтинг растёт, когда вы читаете уроки, сдаёте тесты с высоким результатом и регулярно занимаетесь на сайте.</p></div><div class="card"><h2>Таблица потока</h2><p class="mu">Имена других участников скрыты.</p>${r.board.slice(0, 10).map(row).join('')}${r.place > 10 ? '<div class="mu" style="padding:6px 0">…</div>' + row(r.board[r.place - 1]) : ''}</div>`;
};
const STAT = { invited: 'Приглашён', in_progress: 'Обучение идёт', completed: 'Онлайн-часть пройдена', failed: 'Не пройдено', expired: 'Срок истёк' };
V.profile = () => `<div class="hero prof ip"><div class="ph"><h1>${fmt(S.me.login)}</h1><span class="tagw">Кандидат</span></div><div class="pr"><span class="mu2">Обучение</span><br><b style="font-size:20px">${S.st.points.got}/${S.st.points.max}</b></div><div class="pf"><div><span class="mu2">Отдел</span><br>${esc(S.st.direction)}</div><div><span class="mu2">Поток</span><br>${esc((S.st.enrollment.cohort || '—').replace('Поток с ', ''))}</div><div><span class="mu2">Доступ до</span><br>${dateRu(S.st.enrollment.access_until)}</div><div><span class="mu2">Статус</span><br>${STAT[S.st.enrollment.status]}</div></div></div><div class="g3">${PR.slice(3).map(prc).join('')}</div>${note}<p><button class="sec" onclick="logout()">Выйти</button></p>`;

// ---------- вход ----------
const loginV = () => `<div class="wrap login"><div class="card"><h1>Вход в обучение</h1><p class="mu">Введите номер телефона, указанный при регистрации, и код доступа: последние 4 цифры этого номера.</p><label class="f" for="lg">Номер телефона</label><input id="lg" type="text" autocomplete="username" placeholder="+998 90 123 45 67"><label class="f" for="pw">Код доступа (последние 4 цифры номера)</label><input id="pw" type="password" autocomplete="current-password" maxlength="64"><div class="err" id="er"></div><button id="go" style="width:100%">Войти</button><p class="mu" style="margin-top:14px">Сотрудники вводят рабочую почту и пароль в те же поля.</p></div><div class="lng" style="justify-content:center"><button class="lg ${S.lang !== 'uz' ? 'on' : ''}" onclick="setLang('ru')">RU</button><button class="lg ${S.lang === 'uz' ? 'on' : ''}" onclick="setLang('uz')">UZ</button></div></div>`;
function bindLogin() {
  const go2 = async () => {
    try { const r = await api('/login', { method: 'POST', body: { login: $('#lg').value, password: $('#pw').value } }); S.tok = r.token; localStorage.setItem('tok', r.token); S.me = r.user; S.scr = isC() ? 'main' : 'a_cands'; if (isC()) await refresh(); else await loadAd(); render(); }
    catch (e) { $('#er').textContent = trs(e.message); }
  };
  $('#go').onclick = go2; $('#pw').onkeydown = $('#lg').onkeydown = e => { if (e.key === 'Enter') go2(); };
}
const chooseV = () => `<div class="wrap login"><div class="card"><h1>Выберите язык обучения</h1><p class="mu">${esc(S.st.choose.direction)}</p>${S.st.choose.langs.map(l => `<p><button style="width:100%" onclick="chooseLang('${l}')">${l === 'ru' ? 'Русский' : 'O‘zbekcha'}</button></p>`).join('')}</div></div>`;
async function chooseLang(l) { try { S.st = await api('/choose', { method: 'POST', body: { lang: l } }); setLang(l); } catch (e) { toast(e.message); } }

// ---------- панель сотрудников ----------
const ROLE = { admin: 'Администратор', recruiter: 'Рекрутер', trainer: 'Тренер' };
function adminV() {
  const n = [['a_cands', 'Кандидаты'], ['a_cohorts', 'Потоки'], ['a_courses', 'Курсы']];
  return `<div class="top"><div class="brand">Админ-панель<small>${ROLE[S.me.role]} · ${esc(S.me.login)}</small></div><button class="lnk" onclick="logout()">Выйти</button></div><div class="wrap lay"><aside><nav>${n.map(([k, t]) => `<button class="${S.scr === k ? 'on' : ''}" onclick="go('${k}')"><span>${t}</span></button>`).join('')}</nav></aside><main>${({ a_cands: aCands, a_cohorts: aCohorts, a_courses: aCourses }[S.scr] || aCands)()}</main></div>${S.m ? `<div class="mod" onclick="if(event.target===this){S.m='';render()}"><div class="mbox">${S.m}</div></div>` : ''}`;
}
const can = r => ['admin', 'recruiter'].includes(S.me.role) && (r !== 'admin' || S.me.role === 'admin');
const fld = (id, l, v, t) => `<label class="f" for="${id}">${l}</label><input id="${id}" type="${t || 'text'}" value="${esc(v || '')}">`;
const sel = (id, l, o, v) => `<label class="f" for="${id}">${l}</label><select id="${id}">${o.map(([k, t]) => `<option value="${esc(k)}" ${String(k) === String(v) ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select>`;
const val = id => $('#' + id).value.trim();
const SB = { invited: ['', 'Приглашён'], in_progress: ['', 'Обучение идёт'], completed: ['ok', 'Прошёл'], failed: ['no', 'Не прошёл'], expired: ['no', 'Срок истёк'] };
function aCands() {
  const c = S.ad.cands || [];
  return `<div class="card"><h1>Кандидаты</h1><p class="mu">Всего: ${c.length}. Логин кандидата — номер телефона, код доступа — последние 4 цифры номера.</p>${can() ? '<button onclick="candForm()">+ Добавить кандидата</button>' : ''}<div class="tw" style="margin-top:14px"><table><tr><th>Кандидат</th><th>Поток</th><th>Статус</th><th>Прогресс</th><th>Доступ до</th><th>Последний вход</th><th>Действия</th></tr>${c.map(r => `<tr><td><b>${esc(r.full_name || '—')}</b><br><span class="mu">${fmt(r.phone)}</span></td><td>${esc(r.cohort || '—')}</td><td><span class="tag ${r.active ? SB[r.status][0] : 'no'}">${r.active ? SB[r.status][1] : 'Отключён'}</span></td><td>${r.passed} из ${r.total || '—'}${r.percent !== null ? '<br><span class="mu">' + r.percent + '% верных</span>' : ''}</td><td>${dateRu(r.access_until)}</td><td>${r.last_login_at ? new Date(r.last_login_at).toLocaleString('ru-RU') : '—'}</td><td><div class="acts">${can() ? `<button class="sec sm" onclick="cAct(${r.id},'extend')">Продлить</button><button class="sec sm" onclick="cAct(${r.id},'end-session')">Завершить сеанс</button><button class="sec sm" onclick="cAct(${r.id},'reset-password')">Сброс кода</button><button class="sec sm" onclick="cAct(${r.id},'active',${r.active ? 0 : 1})">${r.active ? 'Отключить' : 'Включить'}</button>` : ''}${['admin', 'trainer'].includes(S.me.role) ? `<button class="sec sm" onclick="cAct(${r.id},'reset-attempts')">Сброс попыток</button>` : ''}${S.me.role === 'admin' ? `<button class="sec sm" onclick="cDel(${r.id})">Удалить</button>` : ''}</div></td></tr>`).join('')}</table></div></div>`;
}
function candForm() { const m = S.ad.meta; S.m = `<h2>Новый кандидат</h2>${fld('cn', 'ФИО', '')}${fld('cp', 'Телефон (логин)', '', 'tel')}${sel('cd', 'Направление', m.directions.map(d => [d.id, d.name]), m.directions[0] && m.directions[0].id)}${sel('cc', 'Поток', [['', 'Без потока']].concat(m.cohorts.map(c => [c.id, c.title])), '')}${sel('cl', 'Язык обучения', [['', 'Кандидат выберет сам'], ['ru', 'Русский'], ['uz', 'Узбекский']], '')}${fld('cy', 'Срок доступа, дней (если без потока)', 14, 'number')}<div class="err" id="pe"></div><div class="acts" style="margin-top:14px"><button onclick="candSave()">Добавить</button><button class="sec" onclick="S.m='';render()">Отмена</button></div>`; render(); }
async function candSave() {
  try { const r = await api('/candidates', { method: 'POST', body: { full_name: val('cn'), phone: val('cp'), direction_id: val('cd'), cohort_id: val('cc') || null, lang: val('cl'), days: +val('cy') } });
    await loadAd('a_cands'); const link = location.origin + location.pathname;
    S.m = `<h2>Кандидат добавлен</h2><p>Отправьте ему приглашение:</p><textarea id="inv" readonly style="min-height:170px">Здравствуйте! Для вас открыт доступ к онлайн-обучению перед очной частью.\nСсылка: ${link}\nВход: номер телефона ${fmt(r.login)}, код доступа — последние 4 цифры номера (${r.password}).\nДоступ открыт до ${dateRu(r.access_until)}.</textarea><div class="acts" style="margin-top:12px"><button onclick="copyInv()">Копировать текст</button><button class="sec" onclick="S.m='';render()">Закрыть</button></div>`; render();
  } catch (e) { $('#pe').textContent = e.message; }
}
function copyInv() { const t = $('#inv'); t.select(); try { document.execCommand('copy'); toast('Текст скопирован'); } catch (e) { toast('Выделите текст и скопируйте вручную'); } }
async function cAct(id, a, v) { try { const r = await api('/candidates/' + id + '/' + a, { method: 'POST', body: a === 'active' ? { active: !!v } : a === 'extend' ? { days: 3 } : {} }); await loadAd('a_cands'); render(); toast(a === 'reset-password' ? 'Код сброшен: ' + r.password : 'Готово'); } catch (e) { toast(e.message); } }
function cDel(id) { S.m = `<h2>Удалить кандидата?</h2><p>Данные и результаты будут стёрты безвозвратно. Если нужно закрыть доступ, лучше «Отключить».</p><div class="acts"><button onclick="cDelOk(${id})">Удалить навсегда</button><button class="sec" onclick="S.m='';render()">Отмена</button></div>`; render(); }
async function cDelOk(id) { try { await api('/candidates/' + id, { method: 'DELETE' }); S.m = ''; await loadAd('a_cands'); render(); } catch (e) { toast(e.message); } }
function aCohorts() {
  const c = S.ad.cohorts || [];
  return `<div class="card"><h1>Потоки</h1><p class="mu">Поток — группа кандидатов с одной датой старта и сроком доступа. Участники потока видят рейтинг друг друга (без имён).</p>${can() ? '<button onclick="cohForm()">+ Новый поток</button>' : ''}<div class="tw" style="margin-top:14px"><table><tr><th>Поток</th><th>Старт</th><th>Доступ до</th><th>Кандидатов</th></tr>${c.map(x => `<tr><td><b>${esc(x.title)}</b></td><td>${dateRu(x.mass_date)}</td><td>${dateRu(x.deadline)}</td><td>${x.students}</td></tr>`).join('')}</table></div></div>`;
}
function cohForm() { const m = S.ad.meta; S.m = `<h2>Новый поток</h2>${fld('hn', 'Название', 'Поток с ')}${fld('hd', 'Дата старта', '', 'date')}${sel('hr', 'Направление', m.directions.map(d => [d.id, d.name]), m.directions[0] && m.directions[0].id)}${fld('hy', 'Срок доступа, дней', 14, 'number')}<div class="err" id="pe"></div><div class="acts" style="margin-top:14px"><button onclick="cohSave()">Создать</button><button class="sec" onclick="S.m='';render()">Отмена</button></div>`; render(); }
async function cohSave() { try { await api('/cohorts', { method: 'POST', body: { title: val('hn'), mass_date: val('hd'), direction_id: val('hr'), days: +val('hy') } }); S.m = ''; S.ad.meta = await api('/meta'); await loadAd('a_cohorts'); render(); } catch (e) { $('#pe').textContent = e.message; } }
function aCourses() { const c = S.ad.courses || []; return `<div class="card"><h1>Курсы</h1><p class="mu">Курс создаётся для направления и языка. Редактор курсов, уроков и вопросов появится на следующем этапе.</p><div class="tw"><table><tr><th>Курс</th><th>Язык</th><th>Направление</th><th>Модулей</th><th>Уроков</th><th>Вопросов</th><th>Статус</th></tr>${c.map(x => `<tr><td><b>${esc(x.title)}</b></td><td>${x.lang.toUpperCase()}</td><td>${esc(x.direction)}</td><td>${x.blocks}</td><td>${x.lessons}</td><td>${x.questions}</td><td><span class="tag ${x.published ? 'ok' : ''}">${x.published ? 'Опубликован' : 'Черновик'}</span></td></tr>`).join('')}</table></div></div>`; }

// ---------- отрисовка ----------
function trans() { const w = document.createTreeWalker($('#app'), NodeFilter.SHOW_TEXT); let n; while (n = w.nextNode()) { if (n.nodeValue.trim()) n.nodeValue = tr(n.nodeValue); } document.querySelectorAll('#app [placeholder]').forEach(e => { e.placeholder = tr(e.placeholder); }); }
function render() {
  const a = $('#app'), c = isC(); document.body.classList.toggle('prot', !!c); const wm = $('#wm'); wm.hidden = !c;
  if (c) { const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='420' height='280'><text x='40' y='140' font-size='12' font-family='sans-serif' fill='%23808a99' fill-opacity='.17'>${fmt(S.me.login)}</text></svg>`; wm.style.background = `url("data:image/svg+xml;utf8,${svg}")`; }
  if (!S.me) a.innerHTML = loginV(); else if (!c) a.innerHTML = adminV(); else if (S.st && S.st.choose) a.innerHTML = chooseV(); else if (!S.st || !S.st.enrollment) a.innerHTML = '<div class="wrap login"><div class="card"><p>Для вас ещё не назначено обучение. Обратитесь к организатору.</p><button class="sec" onclick="logout()">Выйти</button></div></div>'; else a.innerHTML = shell((V[S.scr] || V.main)());
  if (!S.me) bindLogin(); if (S.lang === 'uz' && (!S.me || c)) trans();
}
['contextmenu', 'copy', 'cut', 'dragstart'].forEach(e => document.addEventListener(e, x => { if (document.body.classList.contains('prot')) x.preventDefault(); }));
document.addEventListener('keydown', e => { if (document.body.classList.contains('prot') && (e.key === 'PrintScreen' || ((e.ctrlKey || e.metaKey) && ['p', 's', 'c', 'a'].includes(e.key.toLowerCase())))) e.preventDefault(); });
const hide = () => { if (document.body.classList.contains('prot')) document.body.classList.add('blur'); }, unhide = () => document.body.classList.remove('blur');
document.addEventListener('visibilitychange', () => document.hidden ? hide() : unhide()); addEventListener('blur', hide); addEventListener('focus', unhide);
boot();
