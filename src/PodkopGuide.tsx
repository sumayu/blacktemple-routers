import { useState } from "react";
import { GuideLayout, CodeBlock, Img, IC, B, NP, A } from "./shared";
import type { StepDef } from "./shared";

const awgSteps: StepDef[] = [
  {
    id: 0,
    title: "Прошивка OpenWrt на роутер",
    body: (
      <>
        <p className="mb-3">
          Инструкция написана на примере роутера <B>Asus RT-AX53U</B>. Под свой
          роутер ищите инструкцию тут:{" "}
          <A href="https://openwrt.org/toh/start">openwrt.org/toh/start</A>
        </p>
        <p className="mb-3">
          Подключись к роутеру по кабелю (LAN). Открой браузер и перейди по
          адресу <IC>192.168.50.1</IC> или{" "}
          <IC>http://asusrouter.com</IC>. Войди с логином и паролем{" "}
          <IC>admin</IC>.
        </p>
        <p className="mb-3">
          Перейди: <NP items={["Администрирование", "Система"]} /> - включи SSH
          по "LAN & WAN" - нажми "Применить".
        </p>
        <p className="mb-3">
          Установи PuTTY:{" "}
          <A href="https://putty.org.ru/download">putty.org.ru/download</A>
        </p>
        <p className="mb-3">
          Запусти PuTTY - Host Name: <IC>asusrouter.com</IC> - Open - Accept -
          логин <IC>admin</IC>, пароль <IC>admin</IC>.
        </p>
        <p className="mb-2">В PuTTY выполни поочередно:</p>
        <CodeBlock code="wget https://downloads.openwrt.org/releases/25.12.3/targets/ramips/mt7621/openwrt-25.12.3-ramips-mt7621-asus_rt-ax53u-squashfs-factory.bin" />
        <CodeBlock code="mtd-write -i openwrt-25.12.3-ramips-mt7621-asus_rt-ax53u-squashfs-factory.bin -d Kernel" />
        <CodeBlock code="reboot" />
        <p className="mt-3">
          Подожди 1-2 минуты. После этого веб-интерфейс будет доступен по
          адресу <IC>192.168.1.1</IC>.
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
          пустой.
        </p>
        <p className="mb-3">
          Включи SSH: <NP items={["Система", "Администрирование"]} /> - вкладка
          "Доступ по SSH" - Интерфейс: <IC>lan</IC> - Сохранить.
        </p>
        <p className="mb-3">
          Если у тебя уже есть роутер провайдера в сети <IC>192.168.1.x</IC> -
          смени адрес OpenWrt роутера:{" "}
          <NP items={["Сеть", "Интерфейсы", "br-lan", "Изменить"]} /> - поле
          "IPv4 address" - смени на например <IC>192.168.6.1</IC> - Сохранить -
          Применить.
        </p>
        <Img src="/images/o_41_ssh.png" alt="SSH доступ в OpenWRT" />
      </>
    ),
  },
  {
    id: 2,
    title: "Подключение по SSH через PuTTY",
    body: (
      <>
        <p className="mb-3">
          Запусти PuTTY - Host Name: <IC>192.168.1.1</IC> (или твой новый
          адрес) - Open - Accept - логин <IC>root</IC>, пароль пустой (просто
          нажми Enter).
        </p>
        <p className="mb-3">
          При вводе пароля символы не отображаются - это нормально. Перед
          началом выключи VPN на своем компьютере.
        </p>
        <p className="mb-2">
          Проверь что роутер видит интернет:
        </p>
        <CodeBlock code="ping vk.com" />
        <p className="mt-2">
          Если пинг идет - нажми <IC>Ctrl+C</IC> и продолжай.
        </p>
        <Img src="/images/o_42_putty2.png" alt="PuTTY подключение к роутеру" />
      </>
    ),
  },
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
          <NP items={["Сеть", "Интерфейсы", "Добавить новый интерфейс"]} />.
        </p>
        <p className="mb-1">
          Название: <IC>awg0</IC>
        </p>
        <p className="mb-3">
          Протокол: <IC>AmneziaWG VPN</IC> - нажми "Создать интерфейс".
        </p>
        <p className="mb-3">
          Если <IC>AmneziaWG VPN</IC> нет в списке - перезагрузи роутер через{" "}
          <NP items={["Система", "Перезагрузка"]} />.
        </p>
        <p className="mb-3">
          Нажми "Загрузка конфигурации" - перетащи файл{" "}
          <IC>config.conf</IC> - нажми "Импорт настроек".
        </p>
        <p className="mb-3">
          Вкладка "Дополнительные настройки" - сними галочку{" "}
          <B>"Использовать шлюз по умолчанию"</B>.
        </p>
        <p className="mb-3">
          Вкладка "Настройки межсетевого экрана" - в поле ниже списка зон введи{" "}
          <IC>awg</IC> - нажми Enter.
        </p>
        <p className="mb-3">
          Вкладка "Peers" - нажми "Изменить" рядом с конфигурацией - включи{" "}
          <B>"Route Allowed IPs"</B> - нажми "Сохранить" дважды.
        </p>
        <p className="mb-3">
          Нажми "Изменить" рядом с зоной <IC>wan</IC> - вкладка
          "Дополнительные настройки" - поле "Use Gateway Metric" установи{" "}
          <IC>100</IC> - нажми "Сохранить".
        </p>
        <p>Нажми "Сохранить и применить".</p>
      </>
    ),
  },
  {
    id: 6,
    title: "Настройка межсетевого экрана",
    body: (
      <>
        <p className="mb-3">
          Перейди: <NP items={["Сеть", "Межсетевой экран"]} />.
        </p>
        <p className="mb-3">
          Нажми "Изменить" рядом с зоной <IC>lan</IC> - в поле "Разрешить
          перенаправление в зоны назначения" выбери <IC>awg</IC> - нажми
          "Сохранить".
        </p>
        <p className="mb-3">
          Нажми "Изменить" рядом с зоной <IC>awg</IC> - включи галочки{" "}
          <B>"Маскардинг"</B> и <B>"Ограничение MSS"</B> - нажми "Сохранить".
        </p>
        <p>Нажми "Сохранить и применить".</p>
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
          <NP items={["Система", "Система", "Синхронизация времени"]} />.
        </p>
        <p>
          Добавь сервер: <IC>194.190.168.1</IC> - нажми "Сохранить и
          применить".
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
          Перейди: <NP items={["Сеть", "Маршрутизация"]} />.
        </p>
        <p className="mb-2">Нажми "Добавить" (первый маршрут):</p>
        <p className="mb-1">
          Интерфейс: <IC>wan</IC>
        </p>
        <p className="mb-1">
          Цель: <IC>194.190.168.1/32</IC>
        </p>
        <p className="mb-3">
          Вкладка "Дополнительные настройки" - Metric: <IC>1</IC> - нажми
          "Сохранить".
        </p>
        <p className="mb-2">Нажми "Добавить" (второй маршрут):</p>
        <p className="mb-1">
          Интерфейс: <IC>awg0</IC>
        </p>
        <p className="mb-1">
          Цель: <IC>0.0.0.0/0</IC>
        </p>
        <p className="mb-3">
          Вкладка "Дополнительные настройки" - Metric: <IC>20</IC> - нажми
          "Сохранить".
        </p>
        <p className="mb-3">Нажми "Сохранить и применить".</p>
        <p>
          Перезагрузи роутер:{" "}
          <NP items={["Система", "Перезагрузка", "Выполнить перезагрузку"]} />.
        </p>
      </>
    ),
  },
];

const vlessSteps: StepDef[] = [
  {
    id: 0,
    title: "Прошивка OpenWrt на роутер",
    body: (
      <>
        <p className="mb-3">
          Инструкция написана на примере роутера <B>Asus RT-AX53U</B>. Под свой
          роутер ищите инструкцию тут:{" "}
          <A href="https://openwrt.org/toh/start">openwrt.org/toh/start</A>
        </p>
        <p className="mb-3">
          Подключись к роутеру по кабелю (LAN). Открой браузер и перейди по
          адресу <IC>192.168.50.1</IC> или{" "}
          <IC>http://asusrouter.com</IC>. Войди с логином и паролем{" "}
          <IC>admin</IC>.
        </p>
        <p className="mb-3">
          Перейди: <NP items={["Администрирование", "Система"]} /> - включи SSH
          по "LAN & WAN" - нажми "Применить".
        </p>
        <p className="mb-3">
          Установи PuTTY:{" "}
          <A href="https://putty.org.ru/download">putty.org.ru/download</A>
        </p>
        <p className="mb-3">
          Запусти PuTTY - Host Name: <IC>asusrouter.com</IC> - Open - Accept -
          логин <IC>admin</IC>, пароль <IC>admin</IC>.
        </p>
        <p className="mb-2">В PuTTY выполни поочередно:</p>
        <CodeBlock code="wget https://downloads.openwrt.org/releases/25.12.3/targets/ramips/mt7621/openwrt-25.12.3-ramips-mt7621-asus_rt-ax53u-squashfs-factory.bin" />
        <CodeBlock code="mtd-write -i openwrt-25.12.3-ramips-mt7621-asus_rt-ax53u-squashfs-factory.bin -d Kernel" />
        <CodeBlock code="reboot" />
        <p className="mt-3">
          Подожди 1-2 минуты. После этого веб-интерфейс будет доступен по
          адресу <IC>192.168.1.1</IC>.
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
          пустой.
        </p>
        <p className="mb-3">
          Включи SSH: <NP items={["Система", "Администрирование"]} /> - вкладка
          "Доступ по SSH" - Интерфейс: <IC>lan</IC> - Сохранить.
        </p>
        <p className="mb-3">
          Если у тебя уже есть роутер провайдера в сети <IC>192.168.1.x</IC> -
          смени адрес OpenWrt роутера:{" "}
          <NP items={["Сеть", "Интерфейсы", "br-lan", "Изменить"]} /> - поле
          "IPv4 address" - смени на например <IC>192.168.6.1</IC> - Сохранить -
          Применить.
        </p>
        <Img src="/images/o_41_ssh.png" alt="SSH доступ в OpenWRT" />
      </>
    ),
  },
  {
    id: 2,
    title: "Подключение по SSH через PuTTY",
    body: (
      <>
        <p className="mb-3">
          Запусти PuTTY - Host Name: <IC>192.168.1.1</IC> (или твой новый
          адрес) - Open - Accept - логин <IC>root</IC>, пароль пустой (просто
          нажми Enter).
        </p>
        <p className="mb-3">
          При вводе пароля символы не отображаются - это нормально. Перед
          началом выключи VPN на своем компьютере.
        </p>
        <p className="mb-2">
          Проверь что роутер видит интернет:
        </p>
        <CodeBlock code="ping vk.com" />
        <p className="mt-2">
          Если пинг идет - нажми <IC>Ctrl+C</IC> и продолжай.
        </p>
        <Img src="/images/o_42_putty2.png" alt="PuTTY подключение к роутеру" />
      </>
    ),
  },
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
          <NP items={["Службы", "Podkop"]} /> - выбери протокол{" "}
          <B>VLESS</B> - вставь ключ <IC>vless://...</IC> в поле "URL
          конфигурации прокси" - Сохранить и применить - перезагрузи роутер.
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
          <NP items={["Службы", "Podkop", "Секции", "Добавить секцию"]} /> - в
          поле "Community list" выбери нужный сервис - Сохранить - Применить.
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
          Нажми "Сохранить и применить" и перейди в <B>Диагностику</B> - статус
          подключения должен быть активным. Если что-то не работает:{" "}
          <NP items={["Службы", "Podkop", "Диагностика"]} />.
        </p>
      </>
    ),
  },
];

type Protocol = "awg" | "vless";

export default function RouterGuide() {
  const [protocol, setProtocol] = useState<Protocol | null>(null);

  if (!protocol) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-2">
          Установка VPN на роутере с OpenWrt
        </h1>
        <p className="text-gray-500 mb-8 text-sm">blacktemple.space</p>

        <p className="mb-6">
          В blacktemple.space доступны два протокола VPN. Они отличаются
          способом настройки и скоростью работы, поэтому сначала реши какой
          будешь использовать.
        </p>

        <div className="space-y-4 mb-8">
          <div className="border rounded-lg p-4">
            <p className="font-semibold mb-1">AmneziaWG</p>
            <p className="text-sm text-gray-600">
              Классический VPN. Весь трафик с роутера идет через VPN. Работает
              значительно быстрее за счет легкого протокола. Но весь трафик
              идет через зарубежный сервер, поэтому ВК, Госуслуги, Сбер и
              другие российские сервисы работать не будут.
            </p>
          </div>
          <div className="border rounded-lg p-4 border-blue-400 bg-blue-50">
            <p className="font-semibold mb-1">
              VLESS{" "}
              <span className="text-blue-600 text-xs font-normal ml-1">
                рекомендуем
              </span>
            </p>
            <p className="text-sm text-gray-600">
              VPN с выборочной маршрутизацией. Заблокированные сайты открываются
              через VPN, российские сервисы работают напрямую. Трафик
              маскируется под обычный HTTPS - провайдеру и Роскомнадзору
              сложнее его заблокировать. Работает медленнее чем AmneziaWG, но
              для большинства пользователей это лучший выбор так как российские
              сервисы не ломаются.
            </p>
          </div>
        </div>

        <p className="mb-4 font-medium">Выбери протокол:</p>
        <div className="flex gap-3">
          <button
            onClick={() => setProtocol("awg")}
            className="px-6 py-2 rounded-lg border border-gray-300 hover:border-gray-500 font-medium transition-colors"
          >
            AmneziaWG
          </button>
          <button
            onClick={() => setProtocol("vless")}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors"
          >
            VLESS
          </button>
        </div>
      </div>
    );
  }

  const isAwg = protocol === "awg";

  return (
    <div>
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-2">
        <button
          onClick={() => setProtocol(null)}
          className="text-sm text-gray-500 hover:text-gray-700 mb-4 flex items-center gap-1"
        >
          <span>&#8592;</span> Сменить протокол
        </button>
      </div>
      <GuideLayout
        title={
          isAwg
            ? "Настройка AmneziaWG на роутере с OpenWrt"
            : "Настройка VLESS на роутере с OpenWrt (Podkop)"
        }
        subtitle={
          isAwg
            ? "Пошаговая настройка AmneziaWG для полного VPN-туннеля на уровне роутера."
            : "Пошаговая настройка скрипта Podkop для выборочного обхода блокировок на уровне роутера."
        }
        steps={isAwg ? awgSteps : vlessSteps}
      />
    </div>
  );
}
