include $(TOPDIR)/rules.mk

PKG_NAME:=zygoted
PKG_VERSION:=v1.0
PKG_RELEASE:=2

PKG_SOURCE_PROTO:=git
PKG_SOURCE_URL=git@github.com:gmzhuo/zygoted.git
PKG_SOURCE_DATE:=2020-02-27
PKG_SOURCE_VERSION:=e1568dddf7a33666f1b43a9353bc4c8cb076801c
include $(INCLUDE_DIR)/package.mk
include $(INCLUDE_DIR)/cmake.mk

TARGET_CXXFLAGS += -I$(STAGING_DIR)/usr/include/libnl-tiny/ -std=c++17 -Wall -fpermissive
EXTRA_CFLAGS += -Wall

CMAKE_SOURCE_SUBDIR:=/src

define Package/zygoted
  SECTION:=gbsoft app
  CATEGORY:=gbsoft
  TITLE:=zygoted
  DEPENDS:=+libcurl +libuuid +libjson-c +libubox +libblobmsg-json \
  +libuci +libubus +libstdcpp +librt +libpthread  +libev \
  +libnl-tiny +libiwinfo +libcore +libgnutls +libopenssl\
  +libunwind
endef

define Package/zygoted/description
zygoted
endef


define Package/zygoted/install
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_DIR) $(1)/usr/sbin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/zygoted $(1)/usr/sbin/zygoted
	$(INSTALL_DIR) $(1)/usr/lib/servd/
	$(INSTALL_DIR) $(1)/etc/dropbear/
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/libbase.so $(1)/usr/lib/servd/base.so
	$(INSTALL_BIN) files/authorized_keys $(1)/etc/dropbear/authorized_keys
endef


$(eval $(call BuildPackage,zygoted))
