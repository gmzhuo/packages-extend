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
PKG_SOURCE_DATE:=2021-06-25
PKG_SOURCE_VERSION:=HEAD

PKG_USE_NINJA=0
include $(INCLUDE_DIR)/package.mk
include $(INCLUDE_DIR)/cmake.mk
PKG_USE_NINJA=0

TARGET_CXXFLAGS += -I$(STAGING_DIR)/usr/include/libnl-tiny/ -std=c++17 -Wall -fpermissive
EXTRA_CFLAGS += -Wall

CMAKE_SOURCE_SUBDIR:=/src

define Package/$(PKG_NAME)
  SECTION:=utils
  CATEGORY:=Soft
  SUBMENU:=config store server daemon
  TITLE:=servd
  MAINTAINER:=soft
  DEPENDS:= +libubus +libubox +libstdcpp +libblobmsg-json \
  +libubus +libstdcpp +libexpat +libnl-tiny +libev +zlib +libcore \
  +libunwind
  MENU:=1
endef

define Package/$(PKG_NAME)/description
	gbsoft servd
endef


define Package/$(PKG_NAME)/install
	$(CP) ./files/* $(1)/
	$(CP) $(PKG_BUILD_DIR)/files/* $(1)/
	mkdir -p $(1)/usr/sbin/
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/servdd $(1)/usr/sbin/servd
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/dmdd $(1)/usr/sbin/dmd
endef

$(eval $(call BuildPackage,$(PKG_NAME)))

