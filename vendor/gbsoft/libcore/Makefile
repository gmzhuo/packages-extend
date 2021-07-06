include $(TOPDIR)/rules.mk

PKG_NAME:=libcore
PKG_RELEASE=1

PKG_SOURCE_PROTO:=git
PKG_SOURCE_URL=git@github.com:gmzhuo/libcore.git
PKG_SOURCE_DATE:=2022-06-24
PKG_SOURCE_VERSION:=HEAD
CMAKE_INSTALL:=1

PKG_LICENSE:=ISC
PKG_LICENSE_FILES:=

PKG_MAINTAINER:=Joey.Zhuo <18414710@qq.com>

PKG_BUILD_DEPENDS:=libcore

CMAKE_SOURCE_SUBDIR:=/src
CMAKE_OPTIONS:= "-DCMAKE_INSTALL_INCLUDEDIR=$(PKG_INSTALL_DIR)/usr/include/"

PKG_USE_NINJA=0
include $(INCLUDE_DIR)/package.mk
include $(INCLUDE_DIR)/cmake.mk

define Package/libcore
  SECTION:=libs
  CATEGORY:=Libraries
  TITLE:=Basic utility library
  ABI_VERSION:=20191228
  DEPENDS:=+libcurl +libuuid +libjson-c +libubox +libblobmsg-json +libuci +libubus +libstdcpp +librt +libpthread +libmnl
endef

define Package/libcore/description
  Library for parsing and generating JSON from shell scripts
endef

TARGET_CFLAGS += -I$(STAGING_DIR)/usr/include

define Package/libcore/install
	$(INSTALL_DIR) $(1)/lib/
	$(INSTALL_DATA) $(PKG_INSTALL_DIR)/usr/lib/libservice.so $(1)/lib/
	$(INSTALL_DATA) $(PKG_INSTALL_DIR)/usr/lib/libservice.so.2 $(1)/lib/
	$(INSTALL_DATA) $(PKG_INSTALL_DIR)/usr/lib/libservice.so.2.0.0 $(1)/lib/
endef


$(eval $(call BuildPackage,libcore))
