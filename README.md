luci-app-chinesecalendar
===
Chinese calender for OpenWrt overview page

Compilation notes / 编译
---
**OpenWrt >= 21.02:**

```bash
git clone https://github.com/debugdoctor/luci-app-chinesecalendar.git

mv luci-app-chinesecalendar /path/to/openwrt/package

cd /path/to/openwrt

./scripts/feeds update -a

./scripts/feeds install -a

make menuconfig
# Select luci-app-chinesecalendar as "M" in Luci -> Applications

cd package/luci-app-chinesecalendar/tools/po2lmo

make && make install

cd ../../../../ 
# Back to top_dir : openwrt

make package/luci-app-chinesecalendar/compile V=s
```

Installtion notes / 安装
---

```bash
wget https://github.com/debugdoctor/luci-app-chinesecalendar/releases/download/v1.0.1/luci-app-chinesecalendar_1.0.1_all.ipk

opkg install luci-app-chinesecalendar_1.0.1_all.ipk
```