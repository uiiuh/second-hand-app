#### `<el-menu>` 导航菜单

- 是使用 ul > li 、浮动实现的布局

1. 按需引入&注册组件

   - Menu 导航菜单
   - MenuItem 菜单每一项
   - Submenu 子菜单

   ```js
   import { Menu, MenuItem, Submenu } from 'element-ui'
   // 全局注册组件
   Vue.component(Menu.name, Menu)
   Vue.component(MenuItem.name, MenuItem)
   Vue.component(Submenu.name, Submenu)
   ```

2. 组件属性的介绍

   el-menu Attribute

   | 属性名            | 说明                                                         | 类型   | 可选值                                                       |
   | ----------------- | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
   | mode              | 菜单模式                                                     | string | horizontal（水平模式）、vertical（垂直模式）<br />默认值为垂直模式 |
   | default-active    | 默认激活的菜单的 index                                       | string | ——                                                           |
   | background-color  | 菜单的背景色                                                 | string | 默认值为#ffffff                                              |
   | text-color        | 菜单的文字颜色                                               | string | 默认值为#303133                                              |
   | active-text-color | 激活菜单的文字颜色                                           | string | 默认值为#409EFF                                              |
   | router            | 是否使用 vue-router 模式，启用该模式会在激活菜单时以 index 作为 path 进行路由跳转<br />**注意：使用时直接写属性名即可，或者使用 `:router=“true”`，而不是 `router=“true”`** | 布尔值 | 默认值为false                                                |

   el-menu-item Attribute

   | 属性名 | 说明           | 类型   | 可选值 |
   | ------ | -------------- | ------ | ------ |
   | index  | 菜单项唯一标识 | string | ——     |

3. 使用

   ```vue
   <el-menu
       class="menu"
       mode="horizontal"
       default-active="home"
       background-color="#E7E8FB"
       text-color="#9EA3F3"
       active-text-color="#5f479a"
       router
   >
       <a href="javascript:;" class="logo">校园二手交易平台</a>
       <el-menu-item index="home">首页</el-menu-item>
       <el-menu-item index="message">消息中心</el-menu-item>
       <el-menu-item index="center">我的</el-menu-item>
       <el-menu-item index="login">登录</el-menu-item>
       <el-menu-item index="register">注册</el-menu-item>
   </el-menu>
   ```

   

#### `<el-carousel>` 走马灯（轮播图）

1. 按需引入&注册组件

   - Carousel 走马灯

   - CarouselItem 走马灯每一项

     ```js
     import { Carousel, CarouselItem } from 'element-ui'
     // 全局注册组件
     Vue.component(Carousel.name, Carousel)
     Vue.component(CarouselItem.name, CarouselItem)
     ```

2. 组件属性的介绍

   el-carousel Attributes

   | 属性名  | 说明                       | 类型   | 可选值                                                 |
   | ------- | -------------------------- | ------ | ------------------------------------------------------ |
   | trigger | 轮播图底部指示器的触发方式 | string | click<br />默认在鼠标 hover 底部的指示器时就会触发切换 |

3. 使用

   - 设置每张轮播图的样式

     ```css
     .el-carousel__item:nth-child(2n) {
         background-color: #99a9bf;
     }
     
     .el-carousel__item:nth-child(2n+1) {
         background-color: #d3dce6;
     }
     ```

   - 设置底部指示器的样式

     ```css
     .el-carousel__button {
         height: 3px;
     }
     ```

#### `<el-input>` 输入框

1. 按需引入&注册组件

   - Input 输入框

   ```js
   import { Input } from 'element-ui'
   // 全局注册饿了么组件
   Vue.component(Input.name, Input)
   ```

2. 组件属性的介绍

   el-input Attributes

   | 属性名          | 说明           | 类型            | 可选值                   |
   | --------------- | -------------- | --------------- | ------------------------ |
   | value / v-model | 绑定值         | string / number | ——                       |
   | placeholder     | 输入框占位文本 | string          | ——                       |
   | prefix-icon     | 输入框头部图标 | string          | 值为 Icon 图标提供的那些 |
   | suffix-icon     | 输入框尾部图标 | string          | 值为 Icon 图标提供的那些 |
   | clearable       | 是否可清空     | 布尔值          | 默认值为false            |

   Input Slots：可通过 slot 来指定在 input 中前置或者后置内容

   | 属性名  | 说明                                    |
   | ------- | --------------------------------------- |
   | prepend | 输入框前置内容，只对 `type="text"` 有效 |
   | append  | 输入框后置内容，只对 `type="text"` 有效 |

   ```vue
   <template slot="prepend">Http://</template>
   <el-button slot="append" icon="el-icon-search"></el-button><el-button slot="append" icon="el-icon-search"></el-button>
   ```

3. 使用

#### `<el-button>`  按钮

1. 按需引入&注册组件

   - Button 按钮

   ```js
   import { Button } from 'element-ui'
   // 全局注册饿了么组件
   Vue.component(Button.name, Button)
   ```

2. 组件属性的介绍

   | 属性名 | 说明     | 类型     | 可选值                                             |
   | ------ | -------- | -------- | -------------------------------------------------- |
   | type   | 类型     | string   | primary / success / warning / danger / info / text |
   | icon   | 图标类名 | 图标类名 | 值为 Icon 图标提供的那些                           |

3. 使用

#### `1` 

1. 按需引入&注册组件
2. 组件属性的介绍
3. 使用

