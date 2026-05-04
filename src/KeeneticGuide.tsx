import { useState } from "react";
import { GuideLayout, CodeBlock, Img, IC, B, NP, A, Note } from "./shared";
import type { StepDef } from "./shared";
import { Download } from "lucide-react";

const routeFiles = [
  { label: "Brawl Stars", url: "https://raw.githubusercontent.com/sumayu/-/main/BrawlStars%20(1).bat", filename: "BrawlStars.bat" },
  { label: "ChatGPT (OpenAI)", url: "https://raw.githubusercontent.com/sumayu/-/main/ChatGPT(OpenAI)_0.0.5%20(1).bat", filename: "ChatGPT_OpenAI.bat" },
  { label: "Clash Royale", url: "https://raw.githubusercontent.com/sumayu/-/main/Clash%20Royale_0.0.2%20(1).bat", filename: "ClashRoyale.bat" },
  { label: "Discord", url: "https://raw.githubusercontent.com/sumayu/-/main/Discord.bat", filename: "Discord.bat" },
  { label: "Facebook", url: "https://raw.githubusercontent.com/sumayu/-/main/Facebook_0.0.2%20(1).bat", filename: "Facebook.bat" },
  { label: "Hay Day", url: "https://raw.githubusercontent.com/sumayu/-/main/Hay%20Day_0.0.1%20(1).bat", filename: "HayDay.bat" },
  { label: "Telegram", url: "https://raw.githubusercontent.com/sumayu/-/main/Telegram.bat", filename: "Telegram.bat" },
  { label: "Deezer", url: "https://raw.githubusercontent.com/sumayu/-/main/deezer.com%20(1).bat", filename: "Deezer.bat" },
  { label: "Epic Games", url: "https://raw.githubusercontent.com/sumayu/-/main/epic%20games%20(1).bat", filename: "EpicGames.bat" },
  { label: "Figma Routes", url: "https://raw.githubusercontent.com/sumayu/-/main/figma_routes%20(1).bat", filename: "Figma.bat" },
  { label: "Kinopab", url: "https://raw.githubusercontent.com/sumayu/-/main/kinopab.bat", filename: "Kinopab.bat" },
  { label: "YouTube / Instagram / Meta / Torrent", url: "https://raw.githubusercontent.com/sumayu/-/main/youtube_m.youtube_insta_meta_torrent_0.0.7.bat", filename: "YouTube_Insta_Meta_Torrent.bat" },
];

const steps: StepDef[] = [
  {
    id: 1, title: "Подготовка",
    body: <>
      <p className="mb-3">Откройте браузер, введите <IC>192.168.1.1</IC>. Войдите с логином и паролем (обычно <IC>admin</IC> / <IC>admin</IC>).</p>
      <p className="mb-3"><B>Обновление прошивки:</B> перейдите в <NP items={["Общие настройки системы", "Канал обновления системы"]} /> — смените на канал разработчика. Обновите ПО до версии <B>4.2 beta 2</B> — обязательное условие.</p>
      <Img src="/images/k_01_channel.png" alt="Канал обновления KeeneticOS" />
    </>,
  },
  {
    id: 2, title: "Установка компонента WireGuard",
    body: <>
      <p className="mb-3">Перейдите в <NP items={["Общие настройки системы", "Изменить набор компонентов"]} />. Найдите и установите <B>WireGuard</B>.</p>
      <Note>AWG (Amnezia WireGuard) работает поверх стандартного WireGuard — устанавливаем стандартный компонент.</Note>
      <Img src="/images/k_02_wg.png" alt="Установка компонента WireGuard" />
    </>,
  },
  {
    id: 3, title: "Получение конфигурации AWG",
    body: <>
      <p style={{ marginBottom: 16 }}>Войдите в личный кабинет — откройте <A href="https://blacktemple.online">blacktemple.online</A> или <A href="https://t.me/blacktemple_space_bot">@blacktemple_space_bot</A> в зависимости от того, где вы пополняли баланс.</p>

      <p style={{ marginBottom: 8 }}>Пролистайте главную страницу вниз до списка ваших активных устройств и выберите нужное:</p>
      <ul style={{ marginBottom: 16, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
        <li>— Если устройство <B>«Основной»</B> свободно (не используется на другом девайсе) — выбираете его</li>
        <li>— Если занято — нажмите <B>«+»</B> и создайте новое устройство</li>
      </ul>

      <p style={{ marginBottom: 8 }}>В меню устройства найдите пункт <B>«Протокол»</B>, нажмите на него и выберите <B>AmneziaWG</B> из списка.</p>

      <Note>
        Сайт и бот — это две разные учётные записи. Если пополняли на сайте — заходите на сайт, если через бота — в бота.
      </Note>

      <p style={{ marginBottom: 8 }}>После смены протокола нажмите на файл <IC>.conf</IC> — он придёт в чат с ботом или появится для скачивания на сайте.</p>

      <Img src="/images/k_03_bot_menu.png" alt="Меню — список устройств" />
      <Img src="/images/k_04_bot_conf.png" alt="Файл конфигурации .conf" />
    </>,
  },
  {
    id: 4, title: "Загрузка конфига в роутер",
    body: <>
      <p className="mb-3">Перейдите в <NP items={["Интернет", "Другие подключения"]} />. Выберите <B>Загрузить из файла</B> и загрузите скачанный конфиг.</p>
      <Img src="/images/k_05_connections.png" alt="Другие подключения" />
      <Img src="/images/k_06_settings.png" alt="Настройки подключения" />
      <p className="mb-2">Отметьте <B>Использовать для выхода в интернет</B>:</p>
      <Img src="/images/k_07_checkbox.png" alt="Чекбокс — выход в интернет" />
      <p className="mb-2">Добавьте второй DNS: <IC>1.0.0.1</IC></p>
      <Img src="/images/k_08_dns.png" alt="DNS 1.0.0.1" />
      <p className="mb-2">Укажите имя пира:</p>
      <Img src="/images/k_09_peername.png" alt="Имя пира" />
    </>,
  },
  {
    id: 5, title: "Активация Amnezia через CLI",
    body: <>
      <p className="mb-2">Откройте в браузере: <IC>192.168.1.1/a</IC></p>
      <Img src="/images/k_10_cli.png" alt="CLI интерфейс Keenetic" />
      <p className="mb-2">Скопируйте и вставьте в поле <B>Команда</B>:</p>
      <CodeBlock code="interface Wireguard0 wireguard asc 5 40 70 2 10 1302747048 648455965 127828946 325101495" />
      <Img src="/images/k_11_cmd.png" alt="Поле команды" />
      <Img src="/images/k_12_cmd_filled.png" alt="Команда введена" />
      <p className="mb-2">Нажмите <B>Отправить запрос</B>. Результат:</p>
      <Img src="/images/k_13_ok.png" alt="Результат команды" />
      <Note>
        <p><B>Ошибка</B> <IC>argument parse error</IC>? Выполните команду ниже, найдите имя интерфейса и подставьте вместо <IC>Wireguard0</IC>:</p>
        <CodeBlock code="show interface | grep interface-name" />
      </Note>
      <p className="mb-2">Сохраните конфигурацию:</p>
      <CodeBlock code="system configuration save" />
      <p className="mb-2">В <NP items={["Интернет", "Другие подключения"]} /> должен появиться зелёный индикатор Peer:</p>
      <Img src="/images/k_14_green.png" alt="Зелёный индикатор Peer" />
    </>,
  },
  {
    id: 6, title: "Настройка DNS",
    body: <>
      <p className="mb-3">Перейдите в <NP items={["Сетевые правила", "Интернет фильтры", "Настройка DNS"]} />. Добавьте серверы Google и AdGuard.</p>
      <Img src="/images/k_15_dns1.png" alt="Настройка DNS" />
      <Img src="/images/k_16_dns2.png" alt="Добавление DNS" />
      <Img src="/images/k_17_dns3.png" alt="DNS добавлены" />
      <Img src="/images/k_18_dns4.png" alt="DNS настроен" />
    </>,
  },
  {
    id: 7, title: "Настройка маршрутизации",
    body: <>
      <p className="mb-3">Перейдите в <NP items={["Сетевые правила", "Маршрутизация"]} />. Нажмите <B>Загрузить из файла</B> и загрузите .bat файл (скачайте ниже). <B>Выберите VPN-интерфейс</B> <IC>config</IC>.</p>
      <Img src="/images/k_19_routes.png" alt="Раздел маршрутизации" />
      <Img src="/images/k_20_routes_load.png" alt="Загрузка маршрутов" />
      <Img src="/images/k_21_routes_iface.png" alt="Выбор VPN интерфейса" />
      <p className="mb-2">Нажмите <B>Добавить маршрут</B> → <B>маршрут по умолчанию</B> → интерфейс провайдера → <B>Сохранить</B>:</p>
      <Img src="/images/k_22_routes_def.png" alt="Маршрут по умолчанию" />
    </>,
  },
  {
    id: 8, title: "Приоритет подключения",
    body: <>
      <p className="mb-3">Перейдите в <NP items={["Интернет", "Приоритеты подключений", "Политики доступа в интернет"]} />. Создайте политику: VPN первым, провайдер вторым.</p>
      <Img src="/images/k_23_policy1.png" alt="Создание политики" />
      <Img src="/images/k_24_policy2.png" alt="Порядок интерфейсов" />
      <p className="mb-2">Примените политику через <NP items={["Домашняя сеть", "Правила использования интернет-трафика"]} />:</p>
      <Img src="/images/k_25_apply.png" alt="Применение политики" />
    </>,
  },
  {
    id: 9, title: "Финальная правка",
    body: <>
      <p className="mb-3">Перейдите в настройки вашего WireGuard-подключения (<NP items={["Интернет", "Другие подключения"]} /> → ваш интерфейс → <B>Изменить</B>).</p>
      <p className="mb-3">Найдите поле <B>Постоянный keepalive</B> и выставьте значение <B>10</B>.</p>
      <Note>
        Это значение keepalive в секундах. Оно удерживает туннель активным и не даёт соединению разрываться при простое. Без этого AWG может периодически отваливаться.
      </Note>
      <p>Нажмите <B>Сохранить</B> — после этого соединение будет стабильным.</p>
    </>,
  },
];

function DownloadButton({ url, filename, label }: { url: string; filename: string; label: string }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch {
      // fallback — open in new tab
      window.open(url, "_blank");
    } finally {
      setLoading(false);
    }
  };

  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={handleDownload}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "11px 16px",
        borderRadius: 10,
        border: `1px solid ${hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.07)"}`,
        background: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
        cursor: loading ? "wait" : "pointer",
        textAlign: "left",
        width: "100%",
        transition: "border-color 0.15s, background 0.15s",
        opacity: loading ? 0.6 : 1,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        <span style={{
          flexShrink: 0,
          fontSize: 10,
          fontFamily: "monospace",
          color: "rgba(255,255,255,0.3)",
          background: "rgba(255,255,255,0.06)",
          padding: "2px 6px",
          borderRadius: 4,
        }}>.bat</span>
        <span style={{
          fontSize: 13,
          color: "rgba(255,255,255,0.7)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>{label}</span>
      </div>
      <Download size={14} style={{ flexShrink: 0, color: loading ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.22)" }} />
    </button>
  );
}

function RoutingFiles() {
  return (
    <div style={{ marginTop: 16, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <Download size={15} style={{ color: "rgba(255,255,255,0.35)", flexShrink: 0 }} />
        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "rgba(255,255,255,0.9)", margin: 0 }}>
          Файлы для настройки маршрутизации
        </h2>
        <span style={{
          fontSize: 11, fontWeight: 500,
          color: "rgba(255,255,255,0.35)",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.03)",
          padding: "2px 8px", borderRadius: 20,
        }}>Автоматически</span>
      </div>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.42)", lineHeight: 1.65, marginBottom: 20 }}>
        Скачайте нужный файл и загрузите через{" "}
        <span style={{ color: "rgba(255,255,255,0.65)" }}>Сетевые правила → Маршрутизация → Загрузить из файла</span>.
        Выберите интерфейс <IC>config</IC>.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 8 }}>
        {routeFiles.map(f => (
          <DownloadButton key={f.label} url={f.url} filename={f.filename} label={f.label} />
        ))}
      </div>
    </div>
  );
}

export default function KeeneticGuide() {
  return (
    <GuideLayout
      title="Настройка Amnezia WireGuard на роутере с KeeneticOS"
      subtitle="Пошаговая настройка AWG через CLI Keenetic для обхода блокировок на уровне роутера."
      steps={steps}
      extra={<RoutingFiles />}
    />
  );
}