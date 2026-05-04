import { GuideLayout, CodeBlock, Img, IC, B, NP, A, Note } from "./shared";
import type { StepDef } from "./shared";

const steps: StepDef[] = [
  {
    id: 1, title: "Подготовка системы",
    body: <>
      <p className="mb-3">Ваш роутер должен быть прошит на OpenWrt версии <B>не ниже 24.10</B>. После установки <IC>luci-i18n-base-ru</IC> и перезагрузки — роутер готов.</p>
      <p className="mb-3">Перейдите в <NP items={["Система", "Администрирование"]} />, вкладка <B>Доступ по SSH</B>. Интерфейс — <IC>lan</IC>. Проставьте галочки как на скриншоте и нажмите <B>Сохранить</B>.</p>
      <Img src="/images/o_41_ssh.png" alt="SSH доступ в OpenWRT" />
    </>,
  },
  {
    id: 2, title: "Подключение по SSH",
    body: <>
      <p className="mb-3">Откройте <B>PuTTY</B>, введите <IC>192.168.1.1</IC>. Нажмите <B>Accept</B>. Логин: <IC>root</IC>, пароль — пустой.</p>
      <Img src="/images/o_42_putty2.png" alt="PuTTY подключение к роутеру" />
    </>,
  },
  {
    id: 3, title: "Установка скрипта Podkop",
    body: <>
      <p className="mb-3">Зайдите в нашего бота и скопируйте команду установки. Вставьте её в PuTTY <B>правой кнопкой мыши</B> и нажмите Enter.</p>
      <Img src="/images/o_43_paste.png" alt="Вставка команды в PuTTY" />
    </>,
  },
  {
    id: 4, title: "Конфигурация и перезагрузка",
    body: <>
      <p className="mb-3">На все запросы в консоли отвечайте <IC>y</IC> (yes). По завершении введите:</p>
      <CodeBlock code="reboot" />
    </>,
  },
  {
    id: 5, title: "Добавление ключа Vless",
    body: <>
      <p className="mb-3">Откройте <A href="https://t.me/blacktemple_space_bot">наш Telegram-бот</A>. Перейдите в <NP items={["Профиль", "Сменить VPN", "Vless подписка/ключ"]} /> и скопируйте ключ.</p>
      <p className="mb-3">В веб-интерфейсе роутера перейдите в <NP items={["Службы", "Podkop"]} />. Вставьте ключ в поле <B>URL конфигурации прокси</B>. Нажмите <B>Сохранить и применить</B>.</p>
    </>,
  },
  {
    id: 6, title: "Настройка маршрутизации",
    body: <>
      <p>В поле <B>Список сервисов</B> выберите нужные сервисы из предустановленного списка или переключитесь на <B>текстовый список</B> и добавьте адреса вручную.</p>
    </>,
  },
  {
    id: 7, title: "Проверка работы",
    body: <>
      <p>Нажмите <B>Сохранить и применить</B> и перейдите в <B>Диагностику</B> — статус подключения должен быть активным. Заблокированные ресурсы теперь доступны через роутер.</p>
    </>,
  },
];

export default function PodkopGuide() {
  return (
    <GuideLayout
      section="OpenWrt"
      title="Настройка Vless на роутере с OpenWrt (Podkop)"
      subtitle="Пошаговая настройка скрипта Podkop для выборочного обхода блокировок на уровне роутера."
      steps={steps}
    />
  );
}
