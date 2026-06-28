import { GuideLayout, CodeBlock, Img, IC, B, NP, A } from "./shared";
import type { StepDef } from "./shared";

const sharedSteps0to2: StepDef[] = [
  {
    id: 0,
    title: "Прошивка OpenWrt на роутер",
    body: (
      <>
        <p className="mb-3">
          Инструкция написана на примере роутера <B>Asus RT-AX53U</B>. У каждого
          роутера способ прошивки свой - найди инструкцию для своей модели:
        </p>
        <p className="mb-1">1. Зайди на <A href="https://openwrt.org/toh/start">openwrt.org/toh/start</A></p>
        <p className="mb-1">2. Найди свой роутер в таблице по бренду и модели</p>
        <p className="mb-1">3. Нажми на ссылку в колонке "Device Page"</p>
        <p className="mb-3">4. На странице найди раздел "Installation" - там будет инструкция для твоей модели</p>
        <Img src="/images/o_01_compat.png" alt="Таблица совместимых роутеров" />
        <p className="mb-3">
          Если в колонке "Device Page" ничего нет - поищи модель через{" "}
          <A href="https://firmware-selector.openwrt.org">firmware-selector.openwrt.org</A>.
          Если роутера нет в таблице вообще - он не поддерживается OpenWrt, прошивать его нельзя.
        </p>
        <p className="mb-3">
          Подключись к роутеру по кабелю (LAN). Wi-Fi в процессе прошивки
          может пропасть - используй только проводное соединение.
        </p>
        <p className="mb-3">
          Открой браузер и перейди по адресу <IC>192.168.50.1</IC> или{" "}
          <IC>http://asusrouter.com</IC>. Войди с логином и паролем{" "}
          <IC>admin</IC>.
        </p>
        <Img src="/images/o_02_login.png" alt="Страница входа Asus" />
        <p className="mb-3">
          Перейди:{" "}
          <NP items={["Администрирование / Administration", "Система / System"]} />{" "}
          - включи SSH по "LAN & WAN" - нажми "Применить / Apply".
        </p>
        <Img src="/images/o_03_ssh.png" alt="Включение SSH в Asus" />
        <p className="mb-3">
          Установи PuTTY:{" "}
          <A href="https://putty.org.ru/download">putty.org.ru/download</A>
        </p>
        <Img src="/images/o_04_putty_dl.png" alt="Скачивание PuTTY" />
        <p className="mb-3">
          Запусти PuTTY - Host Name: <IC>asusrouter.com</IC> - Open - Accept -
          логин <IC>admin</IC>, пароль <IC>admin</IC>.
        </p>
        <Img src="/images/o_07_putty_cfg.png" alt="Настройка PuTTY" />
        <Img src="/images/o_08_accept.png" alt="Окно безопасности PuTTY" />
        <Img src="/images/o_09_creds.png" alt="Ввод логина и пароля" />
        <p className="mb-2">В PuTTY выполни поочередно:</p>
        <CodeBlock code="wget https://downloads.openwrt.org/releases/25.12.3/targets/ramips/mt7621/openwrt-25.12.3-ramips-mt7621-asus_rt-ax53u-squashfs-factory.bin" />
        <Img src="/images/o_11_wget.png" alt="Выполнение wget в PuTTY" />
        <CodeBlock code="mtd-write -i openwrt-25.12.3-ramips-mt7621-asus_rt-ax53u-squashfs-factory.bin -d Kernel" />
        <Img src="/images/o_13_mtd2.png" alt="Выполнение mtd-write в PuTTY" />
        <CodeBlock code="reboot" />
        <Img src="/images/o_14_reboot.png" alt="reboot" />
        <p className="mt-3">
          Подожди 1-2 минуты. После этого веб-интерфейс OpenWrt будет доступен
          по адресу <IC>192.168.1.1</IC>.
        </p>
      </>
    ),
  },
  {
    id: 1,
    title: "Первоначальная настройка OpenWrt",
    body: (
      <>
        <p className="mb-3">
          Открой <IC>192.168.1.1</IC> в браузере. Логин: <IC>root</IC>, пароль
          пустой - просто нажми Enter.
        </p>
        <Img src="/images/o_15_owrt_login.png" alt="Вход в OpenWRT" />
        <p className="mb-3">
          Включи SSH: перейди{" "}
          <NP items={["System / Система", "Administration / Администрирование"]} />{" "}
          - вкладка "SSH Access / Доступ по SSH" - Interface / Интерфейс:{" "}
          <IC>lan</IC> - Save / Сохранить. Без этого PuTTY не подключится.
        </p>
        <Img src="/images/o_41_ssh.png" alt="SSH доступ в OpenWRT" />
        <p className="mb-3">
          Включи Wi-Fi: перейди{" "}
          <NP items={["Network / Сеть", "Wireless / Беспроводная сеть"]} /> -
          нажми "Enable / Включить" напротив своей сети. При необходимости
          отредактируй название и пароль через "Edit / Изменить".
        </p>
        <Img src="/images/o_18_wifi.png" alt="Включение Wi-Fi" />
        <p className="mb-3">
          Если провайдер использует PPPoE или статический IP: перейди{" "}
          <NP items={["Network / Сеть", "Interfaces / Интерфейсы"]} /> - нажми
          "Edit / Изменить" рядом с WAN - выбери нужный протокол и введи данные
          от провайдера. При обычном подключении (DHCP) этот шаг пропускай.
        </p>
        <Img src="/images/o_16_ifaces.png" alt="Network Interfaces" />
        <Img src="/images/o_17_proto.png" alt="Выбор протокола" />
        <p className="mb-3">
          Если у тебя уже есть роутер провайдера в сети <IC>192.168.1.x</IC> -
          возникнет конфликт адресов. Смени адрес OpenWrt роутера:{" "}
          <NP items={["Network / Сеть", "Interfaces / Интерфейсы", "br-lan", "Edit / Изменить"]} />{" "}
          - поле "IPv4 address" - смени на например <IC>192.168.6.1</IC> -
          Save / Сохранить - Apply / Применить. После этого используй новый
          адрес вместо <IC>192.168.1.1</IC>.
        </p>
      </>
    ),
  },
  {
    id: 2,
    title: "Подключение по SSH через PuTTY",
    body: (
      <>
        <p className="mb-3">
          Перед началом выключи VPN на своем компьютере если он включен.
        </p>
        <p className="mb-3">
          Запусти PuTTY - Host Name: <IC>192.168.1.1</IC> (или твой новый
          адрес если менял) - Open - Accept - логин <IC>root</IC>, пароль
          пустой (просто нажми Enter).
        </p>
        <p className="mb-3">
          При вводе пароля символы не отображаются - это нормально.
        </p>
        <Img src="/images/o_42_putty2.png" alt="PuTTY подключение к роутеру" />
        <p className="mb-2">Проверь что роутер видит интернет:</p>
        <CodeBlock code="ping vk.com" />
        <p className="mt-2 mb-0">
          Если пинг идет - нажми <IC>Ctrl+C</IC> и продолжай.
        </p>
      </>
    ),
  },
];

const awgSteps: StepDef[] = [
  ...sharedSteps0to2,
  {
    id: 3,
    title: "Установка AmneziaWG",
    body: (
      <>
        <p className="mb-2">В PuTTY выполни:</p>
        <CodeBlock code="sh <(wget -O - https://raw.githubusercontent.com/Slava-Shchipunov/awg-openwrt/refs/heads/master/amneziawg-install.sh)" />
        <p className="mb-3 mt-3">
          Если ошибка <IC>connecting to 2606:...</IC> - выполни с
          принудительным IPv4:
        </p>
        <CodeBlock code="sh <(wget -4 -O - https://raw.githubusercontent.com/Slava-Shchipunov/awg-openwrt/refs/heads/master/amneziawg-install.sh)" />
        <p className="mb-3 mt-3">
          Если скрипт не скачивается (GitHub заблокирован) - сначала выполни:
        </p>
        <CodeBlock code={`printf "#github\\n185.199.109.133 raw.githubusercontent.com\\n185.199.108.133 raw.githubusercontent.com\\n" >> /etc/hosts && /etc/init.d/dnsmasq restart`} />
        <p className="mb-3 mt-3">
          Затем повтори команду установки. Когда скрипт спросит{" "}
          <IC>Do you want to configure the AmneziaWG interface?</IC> - введи{" "}
          <IC>n</IC>.
        </p>
        <p className="mb-2">После завершения перезагрузи роутер:</p>
        <CodeBlock code="reboot" />
      </>
    ),
  },
  {
    id: 4,
    title: "Получение конфига AmneziaWG",
    body: (
      <>
        <p className="mb-3">
          Войди в личный кабинет на{" "}
          <A href="https://blacktemple.online">blacktemple.online</A> или через{" "}
          <A href="https://t.me/blacktemple_space_bot">@blacktemple_space_bot</A>
          .
        </p>
        <p className="mb-3">
          Если устройство "Основной" свободно - выбери его. Если занято - нажми
          "+" и создай новое устройство для роутера.
        </p>
        <p>
          В меню устройства перейди в раздел "Протокол" - выбери{" "}
          <B>AmneziaWG</B> - нажми "Скачать конфиг". Получишь файл{" "}
          <IC>config.conf</IC> - он понадобится в следующем шаге.
        </p>
      </>
    ),
  },
  {
    id: 5,
    title: "Создание VPN-интерфейса",
    body: (
      <>
        <p className="mb-3">
          Открой веб-интерфейс -{" "}
          <NP items={["Network / Сеть", "Interfaces / Интерфейсы"]} /> - нажми
          "Add new interface / Добавить новый интерфейс".
        </p>
        <p className="mb-1">
          Название: <IC>awg0</IC>
        </p>
        <p className="mb-3">
          Протокол: <IC>AmneziaWG VPN</IC> - нажми "Create interface / Создать
          интерфейс".
        </p>
        <p className="mb-3">
          Если <IC>AmneziaWG VPN</IC> нет в списке - перезагрузи роутер через{" "}
          <NP items={["System / Система", "Reboot / Перезагрузка"]} />.
        </p>
        <p className="mb-3">
          Нажми "Load configuration / Загрузка конфигурации" - перетащи файл{" "}
          <IC>config.conf</IC> - нажми "Import settings / Импорт настроек".
        </p>
        <p className="mb-3">
          Вкладка "Advanced Settings / Дополнительные настройки" - сними
          галочку <B>"Use default gateway / Использовать шлюз по умолчанию"</B>.
        </p>
        <p className="mb-3">
          Вкладка "Firewall Settings / Настройки межсетевого экрана" - в поле
          ниже списка зон введи <IC>awg</IC> - нажми Enter.
        </p>
        <p className="mb-3">
          Вкладка "Peers" - нажми "Edit / Изменить" рядом с конфигурацией -
          включи <B>"Route Allowed IPs"</B> - нажми "Save / Сохранить" дважды.
        </p>
        <p className="mb-3">
          Нажми "Edit / Изменить" рядом с зоной <IC>wan</IC> - вкладка
          "Advanced Settings / Дополнительные настройки" - поле "Use Gateway
          Metric" установи <IC>100</IC> - нажми "Save / Сохранить".
        </p>
        <p>Нажми "Save & Apply / Сохранить и применить".</p>
      </>
    ),
  },
  {
    id: 6,
    title: "Настройка межсетевого экрана",
    body: (
      <>
        <p className="mb-3">
          Перейди:{" "}
          <NP items={["Network / Сеть", "Firewall / Межсетевой экран"]} />.
        </p>
        <p className="mb-3">
          Нажми "Edit / Изменить" рядом с зоной <IC>lan</IC> - в поле
          "Allow forward to destination zones / Разрешить перенаправление в
          зоны назначения" выбери <IC>awg</IC> - нажми "Save / Сохранить".
        </p>
        <p className="mb-3">
          Нажми "Edit / Изменить" рядом с зоной <IC>awg</IC> - включи галочки{" "}
          <B>"Masquerading / Маскардинг"</B> и{" "}
          <B>"MSS Clamping / Ограничение MSS"</B> - нажми "Save / Сохранить".
        </p>
        <p>Нажми "Save & Apply / Сохранить и применить".</p>
      </>
    ),
  },
  {
    id: 7,
    title: "Синхронизация времени",
    body: (
      <>
        <p className="mb-3">
          Перейди:{" "}
          <NP
            items={[
              "System / Система",
              "System / Система",
              "Time Synchronization / Синхронизация времени",
            ]}
          />.
        </p>
        <p>
          Добавь сервер: <IC>194.190.168.1</IC> - нажми "Save & Apply /
          Сохранить и применить".
        </p>
      </>
    ),
  },
  {
    id: 8,
    title: "Настройка маршрутизации",
    body: (
      <>
        <p className="mb-3">
          Перейди:{" "}
          <NP items={["Network / Сеть", "Routing / Маршрутизация"]} />.
        </p>
        <p className="mb-2">Нажми "Add / Добавить" (первый маршрут):</p>
        <p className="mb-1">
          Interface / Интерфейс: <IC>wan</IC>
        </p>
        <p className="mb-1">
          Target / Цель: <IC>194.190.168.1/32</IC>
        </p>
        <p className="mb-3">
          Вкладка "Advanced Settings / Дополнительные настройки" - Metric:{" "}
          <IC>1</IC> - нажми "Save / Сохранить".
        </p>
        <p className="mb-2">Нажми "Add / Добавить" (второй маршрут):</p>
        <p className="mb-1">
          Interface / Интерфейс: <IC>awg0</IC>
        </p>
        <p className="mb-1">
          Target / Цель: <IC>0.0.0.0/0</IC>
        </p>
        <p className="mb-3">
          Вкладка "Advanced Settings / Дополнительные настройки" - Metric:{" "}
          <IC>20</IC> - нажми "Save / Сохранить".
        </p>
        <p className="mb-3">
          Нажми "Save & Apply / Сохранить и применить".
        </p>
        <p>
          Перезагрузи роутер:{" "}
          <NP
            items={[
              "System / Система",
              "Reboot / Перезагрузка",
              "Perform reboot / Выполнить перезагрузку",
            ]}
          />.
        </p>
      </>
    ),
  },
];

const vlessSteps: StepDef[] = [
  ...sharedSteps0to2,
  {
    id: 3,
    title: "Получение VLESS-ключа",
    body: (
      <>
        <p className="mb-3">
          Войди в личный кабинет на{" "}
          <A href="https://blacktemple.online">blacktemple.online</A> или через{" "}
          <A href="https://t.me/blacktemple_space_bot">@blacktemple_space_bot</A>
          .
        </p>
        <p className="mb-3">
          Если устройство "Основной" свободно - выбери его. Если занято - нажми
          "+" и создай новое устройство для роутера.
        </p>
        <p className="mb-3">
          В меню устройства перейди в раздел "Протокол" - выбери <B>VLESS</B> -
          скопируй ссылку-подписку. Это обычная ссылка, не <IC>vless://</IC>.
        </p>
        <p>
          Вставь её в адресную строку браузера и нажми Enter. Откроется
          страница User Information с тремя ключами вида <IC>vless://...</IC>.
          Нажми Copy напротив любого из них.
        </p>
      </>
    ),
  },
  {
    id: 4,
    title: "Установка Podkop",
    body: (
      <>
        <p className="mb-3">
          Требования: OpenWrt 24.10 или новее, минимум 20 МБ свободного места.
        </p>
        <p className="mb-2">В PuTTY выполни:</p>
        <CodeBlock code="sh <(wget -O - https://raw.githubusercontent.com/itdoginfo/podkop/refs/heads/main/install.sh)" />
        <p className="mb-3 mt-3">
          Если скрипт не скачивается (GitHub заблокирован) - сначала выполни:
        </p>
        <CodeBlock code={`printf "#github\\n185.199.109.133 raw.githubusercontent.com\\n185.199.108.133 raw.githubusercontent.com\\n" >> /etc/hosts && /etc/init.d/dnsmasq restart`} />
        <p className="mb-3 mt-3">
          Затем повтори команду установки. Если ранее был установлен getdomains
          или https-dns-proxy - скрипт предложит их удалить, соглашайся.
        </p>
        <p className="mb-2">После установки:</p>
        <CodeBlock code="reboot" />
        <Img src="/images/o_43_paste.png" alt="Вставка команды в PuTTY" />
      </>
    ),
  },
  {
    id: 5,
    title: "Настройка VLESS в Podkop",
    body: (
      <>
        <p className="mb-3">
          Открой веб-интерфейс -{" "}
          <NP items={["Services / Службы", "Podkop"]} /> - выбери протокол{" "}
          <B>VLESS</B> - вставь ключ <IC>vless://...</IC> в поле "Proxy
          configuration URL / URL конфигурации прокси" - Save & Apply /
          Сохранить и применить - перезагрузи роутер.
        </p>
      </>
    ),
  },
  {
    id: 6,
    title: "Добавление сервисов",
    body: (
      <>
        <p className="mb-3">
          Если какой-то сервис не работает через VPN (например Telegram) -
          добавь его вручную.
        </p>
        <p>
          <NP
            items={[
              "Services / Службы",
              "Podkop",
              "Sections / Секции",
              "Add section / Добавить секцию",
            ]}
          />{" "}
          - в поле "Community list" выбери нужный сервис - Save / Сохранить -
          Apply / Применить.
        </p>
      </>
    ),
  },
  {
    id: 7,
    title: "Проверка работы",
    body: (
      <>
        <p>
          Нажми "Save & Apply / Сохранить и применить" и перейди в{" "}
          <B>Diagnostics / Диагностика</B> - статус подключения должен быть
          активным. Если что-то не работает:{" "}
          <NP items={["Services / Службы", "Podkop", "Diagnostics / Диагностика"]} />.
        </p>
      </>
    ),
  },
];

export default function RouterGuide() {
  return (
    <div>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 0" }}>
        <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.52)", lineHeight: 1.75, marginBottom: 24 }}>
          В blacktemple.space доступны два протокола VPN. Они отличаются
          способом настройки и скоростью работы, поэтому сначала реши какой
          будешь использовать.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 0 }}>
          <a
            href="#vless"
            style={{
              display: "block",
              border: "1px solid rgba(96,165,250,0.4)",
              borderRadius: 10,
              padding: "14px 18px",
              background: "rgba(96,165,250,0.06)",
              textDecoration: "none",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(96,165,250,0.12)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(96,165,250,0.06)")}
          >
            <p style={{ fontWeight: 600, color: "rgba(255,255,255,0.95)", margin: "0 0 4px", fontSize: "0.95rem" }}>
              VLESS{" "}
              <span style={{ fontSize: 11, fontWeight: 400, color: "rgba(96,165,250,0.9)", marginLeft: 6 }}>
                рекомендуем
              </span>
            </p>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.42)", margin: 0, lineHeight: 1.65 }}>
              VPN с выборочной маршрутизацией. Заблокированные сайты
              открываются через VPN, российские сервисы работают напрямую.
              Трафик маскируется под обычный HTTPS - провайдеру и
              Роскомнадзору сложнее его заблокировать. Работает медленнее чем
              AmneziaWG, но для большинства пользователей это лучший выбор так
              как российские сервисы не ломаются.
            </p>
          </a>
          <a
            href="#amneziawg"
            style={{
              display: "block",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10,
              padding: "14px 18px",
              background: "rgba(255,255,255,0.025)",
              textDecoration: "none",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.025)")}
          >
            <p style={{ fontWeight: 600, color: "rgba(255,255,255,0.95)", margin: "0 0 4px", fontSize: "0.95rem" }}>
              AmneziaWG
            </p>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.42)", margin: 0, lineHeight: 1.65 }}>
              Классический VPN. Весь трафик с роутера идет через VPN. Работает
              значительно быстрее за счет легкого протокола. Но весь трафик
              идет через зарубежный сервер, поэтому ВК, Госуслуги, Сбер и
              другие российские сервисы работать не будут.
            </p>
          </a>
        </div>
      </div>
      <div id="vless">
        <GuideLayout
          title="Настройка VLESS на роутере с OpenWrt (Podkop)"
          subtitle="Пошаговая настройка скрипта Podkop для выборочного обхода блокировок на уровне роутера."
          steps={vlessSteps}
        />
      </div>
      <div id="amneziawg">
        <GuideLayout
          title="Настройка AmneziaWG на роутере с OpenWrt"
          subtitle="Пошаговая настройка AmneziaWG для полного VPN-туннеля на уровне роутера."
          steps={awgSteps}
        />
      </div>
    </div>
  );
}
