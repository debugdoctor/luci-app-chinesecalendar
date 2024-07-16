#
# This is free software, licensed under the MIT License.
#


include $(TOPDIR)/rules.mk

PKG_VERSION:=1.0.0
LUCI_TITLE:=Show Chinese calendar in overview
LUCI_PKGARCH:=all
PKG_LICENSE:=MIT

#include ../../luci.mk
include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature