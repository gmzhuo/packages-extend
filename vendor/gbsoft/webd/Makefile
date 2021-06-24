#
# Openwrt Makefile for csd
#
#

#### Includes ###################################
include $(TOPDIR)/rules.mk
include $(INCLUDE_DIR)/kernel.mk

#### Package Info ############################### 
PKG_NAME:=webd
PKG_VERSION:=1.0.10.0
PKG_RELEASE:=1
PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)-$(PKG_VERSION)

PKG_SOURCE_PROTO:=git
PKG_SOURCE_URL=git@github.com:gmzhuo/webd.git
PKG_SOURCE_DATE:=2021-06-24
PKG_SOURCE_VERSION:=12eb7aa4e76342257c39046f04dca1d45a8fba74

#PKG_CONFIG_DEPENDS:=\
#	CONFIG_FULL_PACKAGE


PKG_USE_NINJA=0
include $(INCLUDE_DIR)/package.mk
include $(INCLUDE_DIR)/cmake.mk
PKG_USE_NINJA=0

CMAKE_SOURCE_SUBDIR:=/src

define Package/$(PKG_NAME)
  SECTION:=utils
  CATEGORY:=GBSoft
  SUBMENU:=config store server daemon
  TITLE:=cli
  MAINTAINER:=gbsoft
  DEPENDS:= +libubox +libjson-c +libreadline +libncurses +libubus \
	  +libblobmsg-json +libstdcpp +fcgi +fcgixx +libcore +libev \
	  +libcurl
  MENU:=1
endef

define Package/$(PKG_NAME)/description
	gbsoft servd2
endef


define Package/$(PKG_NAME)/install
	$(CP) ./files/* $(1)/
	$(INSTALL_DIR) $(1)/usr/sbin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/webd $(1)/usr/sbin/webd
endef

$(eval $(call BuildPackage,$(PKG_NAME)))

