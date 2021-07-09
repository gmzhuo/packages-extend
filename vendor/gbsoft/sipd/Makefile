#
# Openwrt Makefile for libwebservice
#
#

#### Includes ###################################
include $(TOPDIR)/rules.mk

#### Package Info ############################### 
PKG_NAME:=sipd
PKG_VERSION:=1.0.10.0
PKG_RELEASE:=1
PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)-$(PKG_VERSION)

PKG_SOURCE_PROTO:=git
PKG_SOURCE_URL= git@github.com:gmzhuo/sipd.git
PKG_SOURCE_DATE:=2021-06-24
PKG_SOURCE_VERSION:=HEAD

#PKG_CONFIG_DEPENDS:=\
#	CONFIG_FULL_PACKAGE


PKG_USE_NINJA=0
include $(INCLUDE_DIR)/package.mk
include $(INCLUDE_DIR)/cmake.mk


CMAKE_SOURCE_SUBDIR:=src/

define Package/$(PKG_NAME)
  SECTION:=utils
  CATEGORY:=GBSoft
  SUBMENU:=config store server daemon
  TITLE:=cli
  MAINTAINER:=gbsoft
  MENU:=1
endef

define Package/$(PKG_NAME)/description
	libwebservice c++ header files
endef



$(eval $(call BuildPackage,$(PKG_NAME)))

