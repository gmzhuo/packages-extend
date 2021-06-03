#
# Openwrt Makefile for csd
#
#

#### Includes ###################################
include $(TOPDIR)/rules.mk
include $(INCLUDE_DIR)/kernel.mk

#### Package Info ############################### 
PKG_NAME:=web
PKG_VERSION:=1.0.10.0
PKG_RELEASE:=1
PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)-$(PKG_VERSION)
PKG_DEFAULT_CUSTOM_SOURCE_DIR:=$(shell pwd)/src


include $(INCLUDE_DIR)/package.mk

define Package/$(PKG_NAME)
  SECTION:=utils
  CATEGORY:=Soft
  SUBMENU:=config store server daemon
  TITLE:=web
  MAINTAINER:=soft
  MENU:=1
endef

define Package/$(PKG_NAME)/description
	gbsoft web
endef

#### Target Rules ###############################
define Build/Prepare
endef

define Build/Compile
endef

define Package/$(PKG_NAME)/install
	cp ./files/* $(1)/ -rfd
endef

$(eval $(call BuildPackage,$(PKG_NAME)))

