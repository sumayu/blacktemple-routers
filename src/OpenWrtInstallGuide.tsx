import { GuideLayout, CodeBlock, Img, IC, B, NP, A, Note } from "./shared";
import type { StepDef } from "./shared";

// All image URLs from the Telegraph article
// telegra.ph images load fine in browsers — referrerPolicy="no-referrer" is set in shared Img component

const steps: StepDef[] = [
  {
    id: 1,
    title: "Подготовка",
    body: (
      <>
        <p className="mb-3">
          Перед началом подключитесь к роутеру <B>проводом по LAN</B> — Wi-Fi в процессе обновления прошивки может пропасть.
        </p>
        <p className="mb-3">
          Проверьте совместимость: откройте{" "}
          <A href="https://openwrt.org/toh/start">openwrt.org/toh/start</A>{" "}
          и введите бренд/модель устройства. Если модели нет в таблице — инструкция не подходит.
        </p>
        <Img src="/images/o_01_compat.png" alt="Таблица совместимых роутеров RT-AX" />
        <p className="mb-3">
          Откройте браузер и введите <IC>192.168.1.1</IC> (для Asus также{" "}
          <IC>http://asusrouter.com/Main_Login.asp</IC>). Логин и пароль: <IC>admin</IC> / <IC>admin</IC>.
        </p>
        <Img src="/images/o_02_login.png" alt="Страница входа Asus" />
        <p className="mb-2">
          Перейдите в <NP items={["Администрирование", "Система"]} /> — включите SSH по{" "}
          <B>LAN & WAN</B> и нажмите <B>Применить</B>.
        </p>
        <Img src="/images/o_03_ssh.png" alt="Включение SSH в Asus" />
      </>
    ),
  },
  {
    id: 2,
    title: "Установка PuTTY",
    body: (
      <>
        <p className="mb-3">
          Скачайте PuTTY с{" "}
          <A href="https://putty.org.ru/download">putty.org.ru/download</A>{" "}
          и установите, нажимая «Далее», ничего не меняя. По завершению — «Finish».
        </p>
        <Img src="/images/o_04_putty_dl.png" alt="Скачивание PuTTY" />
        <Img src="/images/o_05_putty_inst.png" alt="Установка PuTTY" />
        <p className="mb-3">Запустите PuTTY и настройте подключение:</p>
        <Img src="/images/o_06_putty_run.png" alt="Запуск PuTTY" />
        <Img src="/images/o_07_putty_cfg.png" alt="Настройка PuTTY — вводим asusrouter.com" />
        <p className="mb-2">
          Нажмите <B>Open</B>, затем <B>Accept</B> в окне безопасности. Введите логин <IC>admin</IC>{" "}
          и пароль (символы при вводе не отображаются — это нормально).
        </p>
        <Img src="/images/o_08_accept.png" alt="Окно безопасности PuTTY" />
        <Img src="/images/o_09_creds.png" alt="Ввод логина и пароля" />
      </>
    ),
  },
  {
    id: 3,
    title: "Прошивка на OpenWRT",
    body: (
      <>
        <p className="mb-3">
          Откройте страницу роутера на openwrt.org, например для RT-AX53U:{" "}
          <A href="https://openwrt.org/toh/asus/rt-ax53u">openwrt.org/toh/asus/rt-ax53u</A>.
          Прокрутите вниз, скопируйте команду <IC>wget</IC> и вставьте в PuTTY правой кнопкой мыши.
        </p>
        <Img src="/images/o_10_owrt_page.png" alt="Страница OpenWRT — команда wget" />
        <Img src="/images/o_11_wget.png" alt="Выполнение wget в PuTTY" />
        <p className="mb-3">
          Дождитесь загрузки файла. Затем скопируйте вторую команду <IC>mtd-write</IC> (до значения <IC>-r</IC>):
        </p>
        <Img src="/images/o_12_mtd1.png" alt="Команда mtd-write на сайте" />
        <Img src="/images/o_13_mtd2.png" alt="Выполнение mtd-write в PuTTY" />
        <p className="mb-2">Введите <IC>reboot</IC> для перезагрузки:</p>
        <Img src="/images/o_14_reboot.png" alt="reboot" />
      </>
    ),
  },
  {
    id: 4,
    title: "Первичная настройка OpenWRT",
    body: (
      <>
        <p className="mb-3">
          Войдите в веб-интерфейс OpenWRT по адресу <IC>192.168.1.1</IC> через LAN-кабель.
          Логин: <IC>root</IC>, пароль — пустой (или ранее установленный).
        </p>
        <Img src="/images/o_15_owrt_login.png" alt="Вход в OpenWRT" />
        <p className="mb-3">
          Перейдите в <NP items={["Network", "Interfaces"]} /> — настройте WAN под вашего провайдера, нажмите <B>Edit</B>.
        </p>
        <Img src="/images/o_16_ifaces.png" alt="Network Interfaces" />
        <Img src="/images/o_17_proto.png" alt="Выбор протокола" />
        <p className="mb-3">Включите Wi-Fi кнопкой <B>Enable</B>, при необходимости отредактируйте через <B>Edit</B>.</p>
        <Img src="/images/o_18_wifi.png" alt="Включение Wi-Fi" />
        <p className="mb-3">
          <B>Русификация:</B> перейдите в <NP items={["System", "Software"]} />, нажмите <B>Update lists</B>, затем <B>Dismiss</B>.
          В поле Filter введите <IC>luci-i18n-base-ru</IC> и нажмите <B>Install</B>.
        </p>
        <Img src="/images/o_19_sw.png" alt="System — Software" />
        <Img src="/images/o_20_update.png" alt="Update lists" />
        <Img src="/images/o_21_filter.png" alt="Поиск luci-i18n-base-ru" />
        <Img src="/images/o_22_install.png" alt="Install" />
      </>
    ),
  },
  {
    id: 5,
    title: "Установка AmneziaWG",
    body: (
      <>
        <p className="mb-3">
          Скачайте три пакета для вашей модели. Для Asus RT-AX53U / AX1800U:
        </p>
        <CodeBlock
          code={`https://github.com/Slava-Shchipunov/awg-openwrt/releases/download/v23.05.4/amneziawg-tools_v23.05.4_mipsel_24kc_ramips_mt7621.ipk\nhttps://github.com/Slava-Shchipunov/awg-openwrt/releases/download/v23.05.4/kmod-amneziawg_v23.05.4_mipsel_24kc_ramips_mt7621.ipk\nhttps://github.com/Slava-Shchipunov/awg-openwrt/releases/download/v23.05.4/luci-app-amneziawg_v23.05.4_mipsel_24kc_ramips_mt7621.ipk`}
        />
        <p className="mb-3">
          Перейдите в <NP items={["Система", "Менеджер пакетов"]} />, нажмите <B>Загрузить пакет</B>{" "}
          и установите все три файла поочерёдно.
        </p>
        <Img src="/images/o_23_pkgmgr.png" alt="Менеджер пакетов" />
        <Img src="/images/o_24_upload.png" alt="Загрузить пакет" />
        <Img src="/images/o_25_ipk1.png" alt="amneziawg-tools" />
        <Img src="/images/o_26_ipk2.png" alt="kmod-amneziawg" />
        <p className="mb-3">
          Перейдите в <NP items={["Система", "Перезагрузка"]} /> и нажмите <B>Выполнить перезагрузку</B>.
        </p>
        <Img src="/images/o_27_reboot2.png" alt="Перезагрузка" />
        <p className="mb-3">
          В <NP items={["Сеть", "Интерфейс"]} /> добавьте новый интерфейс: имя <IC>Awg0</IC>,
          протокол — <B>AmneziaWG VPN</B>. Нажмите <B>Создать интерфейс</B>.
        </p>
        <Img src="/images/o_28_iface_add.png" alt="Создание интерфейса Awg0" />
        <p className="mb-3">
          Скачайте файл <IC>config.conf</IC> из нашего бота. Выберите <B>Загрузка конфигурации</B>
          и перетащите файл в окно импорта.
        </p>
        <Img src="/images/o_29_conf_load.png" alt="Загрузка конфигурации" />
        <Img src="/images/o_30_conf_import.png" alt="Импорт конфигурации" />
        <Img src="/images/o_31_conf_drag.png" alt="Перетащить config.conf" />
        <p className="mb-3">
          Во вкладке <B>Настройки межсетевого экрана</B> выберите «не определено»,
          в поле «пользовательский» напишите <IC>Awg0</IC> и нажмите Enter.
        </p>
        <Img src="/images/o_32_fw_zone.png" alt="Firewall — Awg0" />
        <p className="mb-3">
          Во вкладке <B>AmneziaWG Settings</B> проверьте и при необходимости заполните поля из файла config.conf.
        </p>
        <Img src="/images/o_33_awg_set.png" alt="AmneziaWG Settings" />
        <Img src="/images/o_34_notepad.png" alt="config.conf в Notepad++" />
        <p className="mb-3">
          Во вкладке <B>Peers</B> выберите «Импортировать конфигурацию как узел…»,
          перетащите config.conf и нажмите <B>Сохранить</B>.
        </p>
        <Img src="/images/o_35_peers.png" alt="Импорт узла Peer" />
        <p className="mb-3">
          Нажмите <B>НЕ ПРИНЯТЫЕ ИЗМЕНЕНИЯ</B>, прокрутите до конца и нажмите <B>Применить</B>.
        </p>
        <Img src="/images/o_36_unapplied.png" alt="Неприменённые изменения" />
        <Img src="/images/o_37_apply.png" alt="Применить" />
        <p className="mb-3">
          Перейдите в <NP items={["Сеть", "Межсетевой экран"]} /> — для <IC>Awg0</IC> нажмите <B>Изменить</B>.
          Проставьте галочки <B>Маскардинг</B> и <B>Ограничение MSS</B>.
          В поле «Разрешить перенаправление» выберите <B>lan</B> и сохраните.
        </p>
        <Img src="/images/o_38_fw.png" alt="Межсетевой экран — Awg0" />
        <Img src="/images/o_39_fw_rules.png" alt="Правила firewall" />
        <Img src="/images/o_40_fw_apply.png" alt="Применить изменения firewall" />
      </>
    ),
  },
  {
    id: 6,
    title: "Установка Ruantiblock",
    body: (
      <>
        <p className="mb-3">
          Перейдите в <NP items={["Система", "Администрирование"]} />, вкладка <B>Доступ по SSH</B>.
          Интерфейс — <IC>lan</IC>. Проставьте галочки как на скриншоте и нажмите <B>Сохранить</B>.
        </p>
        <Img src="/images/o_41_ssh.png" alt="SSH доступ" />
        <p className="mb-3">
          Откройте PuTTY, введите <IC>192.168.1.1</IC>. Нажмите <B>Accept</B>.
          Логин: <IC>root</IC>, пароль — пустой.
        </p>
        <Img src="/images/o_42_putty2.png" alt="PuTTY подключение к OpenWRT" />
        <p className="mb-2">
          Скопируйте команды и вставьте в PuTTY правой кнопкой мыши. После выполнения роутер перезагрузится:
        </p>
        <CodeBlock code={`opkg update
opkg --force-overwrite install dnsmasq-full
wget --no-check-certificate -O /tmp/ruantiblock_1.5.0-2_all.ipk https://raw.githubusercontent.com/gSpotx2f/packages-openwrt/master/current/ruantiblock_1.5.0-2_all.ipk
opkg install /tmp/ruantiblock_1.5.0-2_all.ipk
rm /tmp/ruantiblock_1.5.0-2_all.ipk
wget --no-check-certificate -O /tmp/luci-app-ruantiblock_1.5.0-r2_all.ipk https://raw.githubusercontent.com/gSpotx2f/packages-openwrt/master/current/luci-app-ruantiblock_1.5.0-r2_all.ipk
opkg install /tmp/luci-app-ruantiblock_1.5.0-r2_all.ipk
wget --no-check-certificate -O /tmp/luci-i18n-ruantiblock-ru_1.5.0-r2_all.ipk https://raw.githubusercontent.com/gSpotx2f/packages-openwrt/master/current/luci-i18n-ruantiblock-ru_1.5.0-r2_all.ipk
opkg install /tmp/luci-i18n-ruantiblock-ru_1.5.0-r2_all.ipk
rm /tmp/luci-app-ruantiblock_1.5.0-r2_all.ipk /tmp/luci-i18n-ruantiblock-ru_1.5.0-r2_all.ipk
rm -f /tmp/luci-modulecache/* /tmp/luci-indexcache*
/etc/init.d/rpcd restart
/etc/init.d/uhttpd restart
reboot`} />
        <Img src="/images/o_43_paste.png" alt="PuTTY — вставка команд" />
        <p className="mb-3">
          После перезагрузки перейдите в{" "}
          <NP items={["Службы", "RuantiBlock", "Настройки", "Основные настройки"]} />.
          В поле <B>Режим прокси</B> выберите <B>VPN</B>.
        </p>
        <Img src="/images/o_44_ruanti_vpn.png" alt="RuantiBlock — Режим VPN" />
        <p className="mb-3">
          В поле <B>VPN-интерфейс</B> выберите <IC>Awg0</IC> и нажмите <B>Сохранить</B>.
        </p>
        <Img src="/images/o_45_ruanti_if.png" alt="Выбор интерфейса Awg0" />
        <p className="mb-3">
          Перейдите в <NP items={["Система", "Перезагрузка"]} /> и перезагрузите роутер.
        </p>
        <Img src="/images/o_46_reboot3.png" alt="Перезагрузка" />
        <p>Через несколько минут поднимется VPN-соединение. Настройка завершена.</p>
      </>
    ),
  },
];

export default function OpenWrtInstallGuide() {
  return (
    <GuideLayout
      section="OpenWrt"
      title="Установка OpenWRT на примере Asus RT-AX53U"
      subtitle="Прошивка роутера, настройка AmneziaWG и установка Ruantiblock для выборочного обхода блокировок."
      steps={steps}
    />
  );
}
