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
PKG_SOURCE_DATE:=2020-09-25
PKG_SOURCE_VERSION:=4b765284d44b3911b99b56edabc31449ff27be4f

#PKG_CONFIG_DEPENDS:=\
#	CONFIG_FULL_PACKAGE

include $(INCLUDE_DIR)/package.mk
include $(INCLUDE_DIR)/cmake.mk

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
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/webd $(1)/usr/bin/webd
endef

$(eval $(call BuildPackage,$(PKG_NAME)))

