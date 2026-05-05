import { GuideLayout, CodeBlock, Img, IC, B, NP, A, Note } from "./shared";
import type { StepDef } from "./shared";

const steps: StepDef[] = [
  {
    id: 1,
    title: "Что понадобится",
    body: <>
      <p style={{ marginBottom: 12 }}>Перед началом подготовьте следующее:</p>
      <ul style={{ paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {[
          ["Роутер Keenetic", "с прошивкой KeeneticOS 3.x или выше"],
          ["USB-накопитель", "флешка от 2 ГБ или внешний диск — Entware устанавливается на него"],
          ["ПК с Windows", "для форматирования флешки и подключения по SSH"],
          ["Подписка BlackTemple", "с протоколом Vless"],
        ].map(([t, d]) => (
          <li key={t} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }}>—</span>
            <span><B>{t}</B> — {d}</span>
          </li>
        ))}
      </ul>
      <Note>
        Если раньше пытались настроить XKeen и что-то пошло не так — сбросьте роутер до заводских настроек и отформатируйте флешку заново. Это избавит от 90% проблем.
      </Note>
    </>,
  },
  {
    id: 2,
    title: "Определяем архитектуру роутера",
    body: <>
      <p style={{ marginBottom: 12 }}>
        Посмотрите модель на наклейке снизу роутера и найдите её в таблице:
      </p>
      {[
        { arch: "mipsel", color: "#3b82f6", models: "4G (KN-1212), Omni (KN-1410), Extra (KN-1710/1711/1713), Giga (KN-1010/1011), Ultra (KN-1810), Viva (KN-1910/1912/1913), Giant (KN-2610), Hero 4G (KN-2310/2311), Hopper (KN-3810)" },
        { arch: "mips",   color: "#10b981", models: "Ultra SE (KN-2510), Giga SE (KN-2410), DSL (KN-2010), Skipper DSL (KN-2112), Duo (KN-2110), Hopper DSL (KN-3610)" },
        { arch: "aarch64",color: "#f59e0b", models: "Peak (KN-2710), Ultra (KN-1811), Giga (KN-1012), Hopper (KN-3811), Hopper SE (KN-3812)" },
      ].map(({ arch, color, models }) => (
        <div key={arch} style={{ marginBottom: 8, padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", display: "flex", gap: 14, alignItems: "flex-start" }}>
          <code style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color, flexShrink: 0, paddingTop: 1, minWidth: 64 }}>{arch}</code>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{models}</span>
        </div>
      ))}
      <Note>Не нашли свою модель? Уточните в нашем боте или на сайте Keenetic.</Note>
    </>,
  },
  {
    id: 3,
    title: "Форматирование USB-накопителя в EXT4",
    body: <>
      <p style={{ marginBottom: 12 }}>
        Менеджер пакетов OPKG требует файловую систему <B>EXT4</B> — обычный FAT32 не подойдёт.
        Скачайте бесплатную программу{" "}
        <A href="https://www.aomeitech.com/pa/standard.html">AOMEI Partition Assistant Standard</A>{" "}
        и установите её.
      </p>
      <p style={{ marginBottom: 8 }}>Подключите флешку к ПК. Откройте AOMEI, выберите флешку в списке дисков.</p>
      <p style={{ marginBottom: 8 }}>Рекомендуется создать два раздела:</p>
      <ul style={{ paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        <li style={{ display: "flex", gap: 10 }}>
          <span style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }}>—</span>
          <span><B>SWAP</B> — 512 МБ. Это виртуальная оперативная память, помогает роутеру не зависать</span>
        </li>
        <li style={{ display: "flex", gap: 10 }}>
          <span style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }}>—</span>
          <span><B>EXT4</B> — оставшееся место. Сюда установится Entware и XKeen</span>
        </li>
      </ul>
      <Img src="/images/xk_paragon1.png" alt="Форматирование в EXT4 через AOMEI" />
      <Img src="/images/xk_paragon2.png" alt="Разметка SWAP + EXT4" />
      <p style={{ marginBottom: 8 }}>
        После форматирования подключите флешку к <B>USB-порту роутера</B>.
        Войдите в веб-интерфейс <IC>192.168.1.1</IC> и убедитесь что флешка отображается
        в <NP items={["Приложения", "Диски и принтеры"]} />:
      </p>
      <Img src="/images/xk_apps.jpg" alt="Флешка видна в разделе Приложения" />
    </>,
  },
  {
    id: 4,
    title: "Установка компонентов роутера",
    body: <>
      <p style={{ marginBottom: 12 }}>
        Перейдите в <NP items={["Общие настройки системы", "Изменить набор компонентов"]} /> и установите:
      </p>
      <ul style={{ paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
        {[
          ["Интерфейс USB", "нужен для работы с флешкой"],
          ["Файловая система Ext", "без этого роутер не увидит EXT4"],
          ["Поддержка открытых пакетов (OPKG)", "обязательно — это и есть Entware"],
          ["Прокси-сервер DNS-over-TLS", "для шифрования DNS-запросов"],
          ["Модули ядра подсистемы Netfilter", "нужны для маршрутизации трафика"],
          ["Сервер SSH", "для подключения через PuTTY"],
        ].map(([name, hint]) => (
          <li key={name} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }}>—</span>
            <span><B>{name}</B> <span style={{ color: "rgba(255,255,255,0.35)" }}>— {hint}</span></span>
          </li>
        ))}
      </ul>
      <Img src="/images/xk_components.jpg" alt="Установка компонентов в роутере" />
      <Note>
        Встроенный <B>«Сервер SSH»</B> Keenetic работает на порту <IC>22</IC> — он нужен только для первоначальной настройки.
        После установки Entware появится второй SSH-сервер (Dropbear) на порту <IC>222</IC> — именно через него вы будете работать с XKeen.
        Конфликта между ними нет, они работают независимо.
      </Note>
    </>,
  },
  {
    id: 5,
    title: "Установка Entware",
    body: <>
      <p style={{ marginBottom: 12 }}>
        Entware — это менеджер пакетов для роутера, через него потом установится XKeen.
      </p>
      <p style={{ marginBottom: 8 }}>
        Перейдите в <NP items={["Приложения", "Диски и принтеры"]} /> →
        нажмите на вашу флешку → выберите <B>Установить Entware</B>:
      </p>
      <Img src="/images/xk_opkg.jpg" alt="Установка Entware — выбор флешки" />
      <p style={{ marginBottom: 8 }}>
        Выберите архив нужной архитектуры (из шага 2) и дождитесь завершения установки:
      </p>
      <Img src="/images/xk_explorer_install.jpg" alt="Выбор архива Entware" />
      <p style={{ marginBottom: 8 }}>После установки проверьте что файлы появились на флешке:</p>
      <Img src="/images/xk_explorer_configs.jpg" alt="Файлы Entware на флешке" />
    </>,
  },
  {
    id: 6,
    title: "Подключение по SSH через PuTTY",
    body: <>
      <p style={{ marginBottom: 12 }}>
        SSH — это способ управлять роутером через командную строку.
        PuTTY — бесплатная программа для Windows которая это позволяет.
      </p>
      <p style={{ marginBottom: 8 }}>
        <B>Шаг 1.</B> Скачайте PuTTY:{" "}
        <A href="https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html">
          chiark.greenend.org.uk — PuTTY
        </A>.
        Скачайте файл <IC>putty-64bit-X.XX-installer.msi</IC> и установите нажимая «Далее».
      </p>
      <p style={{ marginBottom: 8 }}>
        <B>Шаг 2.</B> Откройте PuTTY. В поле <B>Host Name</B> введите <IC>192.168.1.1</IC>,
        порт <IC>222</IC> (не 22!), тип — <B>SSH</B>. Нажмите <B>Open</B>:
      </p>
      <Img src="/images/xk_putty_light.png" alt="Настройка PuTTY" />
      <p style={{ marginBottom: 8 }}>
        <B>Шаг 3.</B> Появится окно безопасности — нажмите <B>Accept</B>:
      </p>
      <Img src="/images/xk_putty_accept.png" alt="Окно Accept в PuTTY" />
      <p style={{ marginBottom: 8 }}>
        <B>Шаг 4.</B> Введите логин и пароль Entware:
      </p>
      <CodeBlock code={`login as: root\nroot@192.168.1.1's password: keenetic`} />
      <Note>
        Символы пароля и звёздочки не отображаются, курсор будет стоять на месте — это нормально в Linux. Просто введите пароль вслепую и нажмите Enter.
        Пароль по умолчанию: <IC>keenetic</IC>
      </Note>
      <p style={{ marginBottom: 8 }}>
        Хотите установить свой пароль? Введите команду <IC>passwd</IC> и следуйте инструкциям:
      </p>
      <CodeBlock code={`passwd\nNew password: впишите свой пароль\nRetype password: подтвердите пароль`} />
    </>,
  },
  {
    id: 7,
    title: "Обновление пакетов",
    body: <>
      <p style={{ marginBottom: 8 }}>
        После успешного входа вы окажетесь в оболочке <B>BusyBox</B>.
        Сначала обновите список пакетов — вставляйте команды <B>правой кнопкой мыши</B>:
      </p>
      <CodeBlock code="opkg update" />
      <p style={{ marginBottom: 8 }}>Затем обновите установленные пакеты:</p>
      <CodeBlock code="opkg upgrade" />
      <p>Дождитесь завершения — это займёт 1–2 минуты. Теперь можно устанавливать XKeen.</p>
    </>,
  },
  {
    id: 8,
    title: "Установка XKeen",
    body: <>
      <p style={{ marginBottom: 8 }}>Вставьте команды в PuTTY правой кнопкой мыши и нажмите Enter:</p>
      <CodeBlock code={`opkg update && opkg upgrade && opkg install curl tar && cd /tmp\nsh -c "$(curl -sSL https://raw.githubusercontent.com/jameszeroX/XKeen/main/install.sh)"`} />
      <p style={{ marginBottom: 8 }}>
        Скрипт задаст несколько вопросов в процессе установки.
        На все отвечайте <IC>y</IC> (yes) и нажимайте Enter.
        На вопрос про автозапуск — тоже <IC>y</IC>, чтобы XKeen запускался сам при включении роутера.
      </p>
      <Img src="/images/xk_install.png" alt="Установка XKeen" />
      <Note>
        Установка занимает 2–5 минут и требует интернета. Если прервалась — введите команду заново.
      </Note>
    </>,
  },
  {
    id: 9,
    title: "Получение Vless-ключа",
    body: <>
      <p style={{ marginBottom: 12 }}>
        Войдите в личный кабинет — откройте{" "}
        <A href="https://blacktemple.online">blacktemple.online</A> или{" "}
        <A href="https://t.me/blacktemple_space_bot">@blacktemple_space_bot</A>{" "}
        в зависимости от того, где вы пополняли баланс.
      </p>
      <ul style={{ paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
        <li style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }}>—</span>
          <span>Если устройство <B>«Основной»</B> свободно (не используется на другом девайсе) — выбираете его</span>
        </li>
        <li style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }}>—</span>
          <span>Если занято — нажмите <B>«+»</B> и создайте новое устройство для роутера</span>
        </li>
      </ul>
      <p style={{ marginBottom: 12 }}>
        В меню устройства найдите пункт <B>«Протокол»</B> → выберите <B>Vless</B>.
        Скопируйте ссылку-подписку — она выглядит как обычная ссылка (не <IC>vless://</IC>, а обычный URL).
      </p>
      <Note>
        Сайт и бот — две разные учётные записи. Заходите именно туда, где пополняли баланс.
      </Note>
      <p style={{ marginBottom: 8 }}>
        <B>Шаг 2.</B> Вставьте эту ссылку в адресную строку браузера и нажмите Enter.
        Откроется страница <B>User Information</B> с тремя Vless-ключами:
      </p>
      <div style={{ margin: "14px 0", padding: "14px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "#111" }}>
        <p style={{ marginBottom: 8, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Пример страницы:</p>
        <p style={{ margin: "4px 0", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>• <code style={{ fontFamily: "monospace", color: "rgba(255,255,255,0.85)" }}>vless://f362b7de-b71c-47e7-b...</code> <span style={{ color: "rgba(255,255,255,0.3)" }}>Copy</span></p>
        <p style={{ margin: "4px 0", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>• <code style={{ fontFamily: "monospace", color: "rgba(255,255,255,0.85)" }}>vless://f362b7de-b71c-47e7-b...</code> <span style={{ color: "rgba(255,255,255,0.3)" }}>Copy</span></p>
        <p style={{ margin: "4px 0", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>• <code style={{ fontFamily: "monospace", color: "rgba(255,255,255,0.85)" }}>vless://f362b7de-b71c-47e7-b...</code> <span style={{ color: "rgba(255,255,255,0.3)" }}>Copy</span></p>
      </div>
      <p>Нажмите <B>Copy</B> напротив любого из ключей — скопируйте полную <IC>vless://...</IC> строку. Она понадобится на следующем шаге.</p>
    </>,
  },
  {
    id: 10,
    title: "Настройка конфига Xray",
    body: <>
      <p style={{ marginBottom: 12 }}>
        Теперь нужно сгенерировать JSON-конфиг из вашего Vless-ключа и загрузить его в роутер.
      </p>
      <p style={{ marginBottom: 8 }}>
        <B>Шаг 1.</B> Откройте в браузере генератор конфигов:{" "}
        <A href="https://xkeen.pages.dev">xkeen.pages.dev</A>.
        В поле <B>«Введите ссылку»</B> вставьте скопированный <IC>vless://...</IC> ключ
        и нажмите <B>«Сгенерировать конфиг»</B>:
      </p>
      <Img src="/images/xk_config_gen1.png" alt="Генератор конфига XKeen" />
      <p style={{ marginBottom: 8 }}>
        Появится JSON-конфиг. Нажмите <B>«Сохранить в файл»</B> — скачается файл <IC>02_outbounds.json</IC>.
        Либо выделите весь текст (Ctrl+A) и скопируйте (Ctrl+C).
      </p>
      <Note>
        Генератор покажет предупреждение «Рекомендуется использовать порт 443» — это нормально, просто рекомендация.
      </Note>
      <p style={{ marginBottom: 8 }}>
        <B>Шаг 2.</B> Загрузите конфиг на роутер. Выберите удобный способ:
      </p>

      <div style={{ marginBottom: 16 }}>
        <p style={{ marginBottom: 6, fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>Способ А — через WinSCP (проще для новичков):</p>
        <ul style={{ paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
          <li style={{ display: "flex", gap: 10 }}>
            <span style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }}>1.</span>
            <span>Скачайте <A href="https://winscp.net/eng/download.php">WinSCP</A> и установите</span>
          </li>
          <li style={{ display: "flex", gap: 10 }}>
            <span style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }}>2.</span>
            <span>Подключитесь: хост <IC>192.168.1.1</IC>, порт <IC>222</IC>, логин <IC>root</IC>, пароль <IC>keenetic</IC></span>
          </li>
          <li style={{ display: "flex", gap: 10 }}>
            <span style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }}>3.</span>
            <span>Перейдите в папку <IC>/opt/etc/xray/</IC> и перетащите туда скачанный <IC>02_outbounds.json</IC></span>
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: 8 }}>
        <p style={{ marginBottom: 6, fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>Способ Б — через PuTTY (если не хотите скачивать WinSCP):</p>
        <CodeBlock code="cat > /opt/etc/xray/02_outbounds.json" />
        <p style={{ marginBottom: 8 }}>
          Нажмите Enter — курсор перейдёт на новую строку и будет ждать.
          Вставьте JSON <B>правой кнопкой мыши</B>.
          Затем нажмите <B>Enter</B>, потом <B>Ctrl+D</B> — файл сохранится.
        </p>
      </div>

      <Note>
        <IC>Ctrl+D</IC> — сигнал «конец ввода». После него файл записывается на диск.
        Если всё прошло без ошибок — командная строка просто вернётся без сообщений. Это нормально.
        После сохранения обязательно проверьте конфиг: <IC>xkeen -test</IC>. Если ошибок нет — всё супер. Если есть ошибка синтаксиса — конфиг вставился криво, используйте Способ А (WinSCP).
      </Note>
    </>,
  },
  {
    id: 11,
    title: "Настройка DNS",
    body: <>
      <p style={{ marginBottom: 8 }}>
        Чтобы провайдер не блокировал сайты по DNS — нужно зашифровать DNS-запросы.
        В веб-интерфейсе перейдите в{" "}
        <NP items={["Сетевые правила", "Интернет фильтры", "Настройка DNS"]} />.
        Нажмите <B>Добавить</B> и выберите <B>Google</B> и <B>Cloudflare</B>:
      </p>
      <Img src="/images/xk_dns.png" alt="Настройка DNS-over-TLS" />
      <p style={{ marginBottom: 8 }}>В PuTTY включите перехват DNS через XKeen:</p>
      <CodeBlock code="xkeen -dns on" />
    </>,
  },
  {
    id: 12,
    title: "Запуск и проверка",
    body: <>
      <p style={{ marginBottom: 8 }}>Запустите XKeen:</p>
      <CodeBlock code="xkeen -start" />
      <Img src="/images/xk_start.png" alt="Запуск XKeen" />
      <p style={{ marginBottom: 8 }}>Проверьте статус:</p>
      <CodeBlock code="xkeen -status" />
      <p style={{ marginBottom: 12 }}>
        Если видите <B>Running</B> — всё работает.
        Откройте YouTube, ChatGPT или Instagram — они должны открываться.
      </p>
      <p style={{ marginBottom: 8 }}>Обновите базы заблокированных сайтов:</p>
      <CodeBlock code="xkeen -ug" />
      <p style={{ marginBottom: 8 }}>Включите автообновление раз в сутки:</p>
      <CodeBlock code="xkeen -ugc" />
      <Note>
        Если что-то не работает — проверьте конфиг: <IC>xkeen -test</IC>. Покажет ошибки в JSON.
      </Note>
    </>,
  },
  {
    id: 13,
    title: "Шпаргалка по командам",
    body: <>
      <p style={{ marginBottom: 12 }}>Сохраните — пригодится:</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {[
          ["xkeen -start",    "Запустить XKeen"],
          ["xkeen -stop",     "Остановить XKeen"],
          ["xkeen -restart",  "Перезапустить"],
          ["xkeen -status",   "Проверить статус работы"],
          ["xkeen -test",     "Проверить конфиг на ошибки"],
          ["xkeen -ug",       "Обновить базы заблокированных сайтов"],
          ["xkeen -ux",       "Обновить ядро Xray"],
          ["xkeen -dns on",   "Включить перехват DNS"],
          ["xkeen -dns off",  "Отключить перехват DNS"],
          ["xkeen -remove",   "Полностью удалить XKeen"],
          ["xkeen -h",        "Показать все команды"],
        ].map(([cmd, desc]) => (
          <div key={cmd} style={{
            display: "flex", alignItems: "center", gap: 14,
            padding: "9px 14px", borderRadius: 8,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            flexWrap: "wrap",
          }}>
            <code style={{ fontFamily: "monospace", fontSize: 13, color: "rgba(255,255,255,0.85)", flexShrink: 0, minWidth: 180 }}>{cmd}</code>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{desc}</span>
          </div>
        ))}
      </div>
    </>,
  },
];

export default function XKeenGuide() {
  return (
    <GuideLayout
      title="Настройка Vless на роутере с KeeneticOS (XKeen)"
      subtitle="Подробная инструкция для начинающих: от форматирования флешки до запуска VPN."
      steps={steps}
    />
  );
}