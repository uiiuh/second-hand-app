<template>
    <header class="header">
      <el-menu
        class="menu"
        mode="horizontal"
        background-color="#E7E8FB"
        text-color="#9EA3F3"
        active-text-color="#5f479a"
        :default-active="$route.path"
        router
      >
        <router-link class="logo" to="/home">校园二手交易平台</router-link>
        <el-menu-item
          v-for="menuItem in filteredMenuItems"
          :key="menuItem.path"
          :index="menuItem.path"
          :class="{ 'is-active': $route.path === menuItem.path }"
        >
          {{ menuItem.title }}
        </el-menu-item>
      </el-menu>
    </header>
  </template>
  
<script>
  export default {
    name: 'Header',
    computed: {
      // 根据用户登录状态动态过滤菜单项
      filteredMenuItems() {
        const token = localStorage.getItem('token')
        if (token) {
          // 用户已登录，显示首页、消息中心、我的
          return this.menuItems.filter(
            menuItem =>
              menuItem.path === '/home' ||
              menuItem.path === '/message' ||
              menuItem.path === '/center'
          );
        } else {
          // 用户未登录，只显示首页、登录、注册
          return this.menuItems.filter(
            menuItem =>
              menuItem.path === '/home' ||
              menuItem.path === '/login' ||
              menuItem.path === '/register'
          );
        }
      }
    },
    data() {
      return {
        // 定义所有菜单项
        menuItems: [
          {
            title: '首页',
            path: '/home'
          },
          {
            title: '消息中心',
            path: '/message'
          },
          {
            title: '我的',
            path: '/center'
          },
          {
            title: '登录',
            path: '/login'
          },
          {
            title: '注册',
            path: '/register'
          }
        ]
      };
    }
  };
</script>
  
<style scoped lang="less">
    .header {
        background-color: #e7e8fb;
    }
    .menu {
        padding: 0 20px;
        width: 80%;
        margin: 0 auto;
        display: flex;
        .logo {
        padding: 0 20px;
        flex: 1;
        line-height: 60px;
        color: #9ea3f3;
        }
    }
    .is-active {
        color: #5f479a;
    }
</style>  