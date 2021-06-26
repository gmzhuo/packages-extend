include $(TOPDIR)/rules.mk

PKG_NAME:=CAPWAP
PKG_VERSION:=v1.2
PKG_RELEASE:=2

PKG_SOURCE_PROTO:=git
PKG_SOURCE_URL=git@github.com:gmzhuo/capwap.git
PKG_SOURCE_DATE:=2021-06-24
PKG_SOURCE_VERSION:=HEAD
include $(INCLUDE_DIR)/package.mk
include $(INCLUDE_DIR)/cmake.mk

TARGET_CXXFLAGS += -I$(STAGING_DIR)/usr/include/libnl-tiny/ -std=c++17 -Wall -fpermissive
EXTRA_CFLAGS += -Wall

CMAKE_SOURCE_SUBDIR:=/src

define Package/WTP
  SECTION:=gbsoft app
  CATEGORY:=gbsoft
  TITLE:=WTP
  DEPENDS:=+libcurl +libuuid +libjson-c +libubox +libblobmsg-json \
  +libuci +libubus +libstdcpp +librt +libpthread  +libev \
  +libnl-tiny +libiwinfo +libcore +libgnutls +libopenssl \
  +libunwind
endef

define Package/WTP/description
WTP
endef

define Package/AC
  SECTION:=gbsoft app
  CATEGORY:=gbsoft
  TITLE:=AC
  DEPENDS:=+libcurl +libuuid +libjson-c +libubox +libblobmsg-json \
  +libuci +libubus +libstdcpp +librt +libpthread \
  +libnl-tiny +libiwinfo +libcore +libgnutls \
  +libnetfilter-conntrack +libopenssl +libev +libunwind
endef

define Package/AC/description
AC
endef

define Package/RADIOD
  SECTION:=gbsoft app
  CATEGORY:=gbsoft
  TITLE:=RADIOD
  DEPENDS:=+libcurl +libuuid +libjson-c +libubox +libblobmsg-json \
  +libuci +libubus +libstdcpp +librt +libpthread \
  +libnl-tiny +libiwinfo +libcore +libgnutls \
  +libnetfilter-conntrack +libopenssl +libev \
  +libunwind
endef

define Package/RADIOD/description
RADIOD
endef


define Package/WTP/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/WTP $(1)/usr/bin/WTP
	$(INSTALL_BIN) ./files/wtp.init $(1)/etc/init.d/wtp
	$(INSTALL_DATA) ./files/wtp.conf $(1)/etc/config/wtp
	$(INSTALL_DATA) ./files/vendor.conf $(1)/etc/config/vendor
	$(INSTALL_DATA) ./files/hardware.conf $(1)/etc/config/hardware
endef

define Package/AC/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_DIR) $(1)/etc/jsoncfg/ac
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/AC $(1)/usr/bin
	$(INSTALL_BIN) ./files/ac.init $(1)/etc/init.d/ac
	$(INSTALL_DATA) ./files/ac.conf $(1)/etc/config/ac
	$(INSTALL_DATA) ./files/config.json $(1)/etc/jsoncfg/ac/
	cp ./files/capwap/ $(1)/etc/ -rfd
endef

define Package/RADIOD/install
	$(INSTALL_DIR) $(1)/usr/sbin
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/RADIOD $(1)/usr/sbin
	$(INSTALL_BIN) ./files/radio.init $(1)/etc/init.d/radio
endef

$(eval $(call BuildPackage,WTP))
$(eval $(call BuildPackage,AC))
$(eval $(call BuildPackage,RADIOD))
