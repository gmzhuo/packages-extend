#
# Openwrt Makefile for csd
#
#

#### Includes ###################################
include $(TOPDIR)/rules.mk

#### Package Info ############################### 
PKG_NAME:=servd
PKG_VERSION:=1.0.10.2
PKG_RELEASE:=1
PKG_SOURCE_PROTO:=git
PKG_SOURCE_URL=git@github.com:gmzhuo/servd.git
PKG_SOURCE_DATE:=2021-01-06
PKG_SOURCE_VERSION:=2b14bb2d69e7e3901f7afc1af7ba027c02eedcf7

include $(INCLUDE_DIR)/package.mk
include $(INCLUDE_DIR)/cmake.mk

TARGET_CXXFLAGS += -I$(STAGING_DIR)/usr/include/libnl-tiny/ -std=c++17 -Wall -fpermissive
EXTRA_CFLAGS += -Wall

CMAKE_SOURCE_SUBDIR:=/src

define Package/$(PKG_NAME)
  SECTION:=utils
  CATEGORY:=Soft
  SUBMENU:=config store server daemon
  TITLE:=servd
  MAINTAINER:=soft
  DEPENDS:= +libubus +libubox +libstdcpp +libezxml +libblobmsg-json \
  +libubus +libstdcpp +libexpat +libnl-tiny +libev +zlib +libcore
  MENU:=1
endef

define Package/$(PKG_NAME)/description
	gbsoft servd
endef


define Package/$(PKG_NAME)/install
	$(CP) ./files/* $(1)/
	mkdir -p $(1)/usr/sbin/
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/servdd $(1)/usr/sbin/servd
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/dmdd $(1)/usr/sbin/dmd
endef

$(eval $(call BuildPackage,$(PKG_NAME)))

