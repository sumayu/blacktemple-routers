import { GuideLayout, CodeBlock, Img, IC, B, NP, A, Note } from "./shared";
import type { StepDef } from "./shared";

const trafficRules = `default: direct

# write your own rules below
ip(geoip:refilter)->proxy
domain(ext:"LoyalsoldierSite.dat:refilter")->proxy

# port's for viber
port(4244, 7985, 5242-5243) -> proxy`;

const sshCommands = `wget -O /usr/share/xray/geoip.dat https://github.com/1andrevich/Re-filter-lists/releases/latest/download/geoip.dat
wget -O /usr/share/xray/LoyalsoldierSite.dat https://github.com/1andrevich/Re-filter-lists/releases/latest/download/geosite.dat`;

const steps: StepDef[] = [
  {
    id: 1, title: "Установка пакетов v2RayA",
    body: <>
      <p className="mb-3">Перейдите в <NP items={["Система", "Менеджер пакетов"]} /> и установите два пакета:</p>
      <ul className="space-y-1 mb-4 list-none pl-0">
        <li><IC>v2raya</IC></li>
        <li><IC>luci-app-v2raya</IC></li>
      </ul>
      <p>После установки во вкладке <B>Службы</B> появится служба v2raya.</p>
    </>,
  },
  {
    id: 2, title: "Включение службы v2RayA",
    body: <>
      <p className="mb-3">В <NP items={["Службы", "v2RayA"]} /> нажмите <B>Включить</B>, затем <B>Применить</B> и перезагрузите роутер.</p>
      <p>После перезагрузки нажмите <B>Открыть веб-интерфейс</B> — откроется панель по адресу <IC>192.168.1.1:2017</IC>.</p>
    </>,
  },
  {
    id: 3, title: "Настройка режима трафика",
    body: <>
      <p className="mb-3">Введите логин <IC>root</IC> и пароль от роутера. Перейдите в <B>Настройки</B> в правом верхнем углу.</p>
      <p className="mb-3">Нажмите <B>Настройка</B> напротив <B>Режим разделения трафика на порте с правилами</B>. Замените весь текст на:</p>
      <CodeBlock code={trafficRules} />
      <p>Нажмите <B>Сохранить</B>.</p>
    </>,
  },
  {
    id: 4, title: "Импорт Vless-подписки",
    body: <>
      <p className="mb-3">Получите подписку в боте: <NP items={["Профиль", "Сменить VPN", "Vless подписка"]} />.</p>
      <Note>Перед импортом проверьте работоспособность подписки на другом устройстве!</Note>
      <p>Нажмите <B>Импортировать</B> и вставьте ссылку на подписку.</p>
    </>,
  },
  {
    id: 5, title: "Настройка SSH для маршрутизации",
    body: <>
      <p className="mb-3">Перейдите в <NP items={["Система", "Администрирование"]} />, вкладка <B>Доступ по SSH</B>. Интерфейс — <IC>lan</IC>. Нажмите <B>Сохранить</B>.</p>
      <Img src="/images/o_41_ssh.png" alt="SSH доступ" />
      <p className="mb-3">Откройте PuTTY, введите <IC>192.168.1.1</IC>. Логин: <IC>root</IC>, пароль пустой.</p>
      <Img src="/images/o_42_putty2.png" alt="PuTTY" />
      <p className="mb-2">Вставьте команды правой кнопкой мыши в PuTTY:</p>
      <CodeBlock code={sshCommands} />
    </>,
  },
  {
    id: 6, title: "Активация подключения",
    body: <>
      <p className="mb-3">Вернитесь в веб-интерфейс v2RayA. Нажмите <B>Подключиться</B> напротив вашего ключа, затем <B>Готово</B> в верхнем левом углу.</p>
      <p>После нажатия <B>Готово</B> кнопка изменит цвет — VPN на роутере работает.</p>
    </>,
  },
];

export default function V2RayAGuide() {
  return (
    <GuideLayout
      section="OpenWrt"
      title="Настройка Vless на роутере с OpenWrt (v2RayA)"
      subtitle="Пошаговая настройка v2RayA с раздельной маршрутизацией трафика."
      steps={steps}
    />
  );
}
