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

   - 这么设置 default-active 有bug：当我刷新页面后el-menu组件会重新渲染，那么就会渲染default-active，导致和页面路由不一致
   
   - 解决办法：把 default-active 动态绑定 route.path
   
   	还得修改 el-menu-item  中的 index 值，或者切割一下 route.path
   
   	```js
   	:default-active="$route.path"
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
   | height  | 轮播图的高度               | string | —                                                      |
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

   | 属性名             | 说明                  | 类型               | 可选值                                                       |
   | ------------------ | --------------------- | ------------------ | ------------------------------------------------------------ |
   | type               | 输入框类型            | string             | text 文本（默认值）<br />textarea 文本域<br />password 密码框<br />…等原生 input 的 type 值 |
   | value<br />v-model | 绑定值                | string<br />number | ——                                                           |
   | placeholder        | 输入框占位文本        | string             | ——                                                           |
   | prefix-icon        | 输入框头部图标        | string             | 值为 Icon 图标提供的那些                                     |
   | suffix-icon        | 输入框尾部图标        | string             | 值为 Icon 图标提供的那些                                     |
   | clearable          | 是否可清空            | 布尔值             | 默认值为false                                                |
   | show-password      | 显示/隐藏密码的小眼睛 | 布尔值             | 默认值为 false                                               |
   |                    |                       |                    |                                                              |
   |                    |                       |                    |                                                              |

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
   | size   | 尺寸     | string   | medium / small / mini                              |
   | icon   | 图标类名 | 图标类名 | 值为 Icon 图标提供的那些                           |

3. 使用

1. 按需引入&注册组件
2. 组件属性的介绍
3. 使用

#### `<el-form></el-form>` 表单

1. 按需引入：

	- Form 表单

	```js
	import { Form } from 'element-ui'
	Vue.component(Form.name, Form)
	```

2. 属性及方法：

	Form Attributes

	| 属性           | 说明                                   | 类型   | 可选值                                                       |
	| -------------- | -------------------------------------- | ------ | ------------------------------------------------------------ |
	| model          | 表单数据对象                           | object | ——                                                           |
	| label-position | 表单域标签（输入框左侧提示文字）的位置 | string | 可选值：right / left / top<br />默认值：right<br />如果值为 left 或 right 时，需要设置 `label-width` |
	| label-width    | 表单域标签的宽度                       | string | 例如： `'50px'`<br />作为 Form 直接子元素的 form-item 会继承该值。支持 `auto` |
	| size           | 设置表单内组件的尺寸（如输入框、按钮） | string | 可选值：large/medium / small / mini                          |

#### `<el-form-item></el-form-item>  `表单域

在 Form 组件中，每一个表单域由一个 Form-Item 组件构成，表单域中可以放置各种类型的表单控件，包括 Input、Select、Checkbox、Radio、Switch、DatePicker、TimePicker

1. 按需引入：

	```js
	import { FormItem } from 'element-ui'
	Vue.component(FormItem.name, FormItem)
	```

2. 属性及方法：

	Form-Item Attributes

	| 属性        | 说明                                       | 类型   | 可选值                                                       |
	| ----------- | ------------------------------------------ | ------ | ------------------------------------------------------------ |
	| label       | 标签文本                                   | string |                                                              |
	| label-width | 表单域标签的宽度                           | string | 例如：`'50px'`<br />给 form-item 设置 label-width 后，会覆盖 el-form 的 label-width<br />支持 `auto` |
	| size        | 设置该表单域内组件的尺寸（如输入框、按钮） | string | 可选值：large/medium / small / mini                          |

	Form-Item Slot

	| 属性  | 说明                              |
	| ----- | --------------------------------- |
	| label | 可以在 label 插槽中自定义标签文本 |

	- 例如：设置 label 标签文本的样式（因为不能直接通过添加类名去设置样式）

		1. 去掉 el-form-item 的 label 属性
		2. 在 el-form-item 中使用 span 标签，并添加上 `slot="label"`

		```vue
		<el-form-item>
		    <span slot="label" class="txt">
		        用户名:
		    </span>
			<el-input v-model="form.userName" placeholder="请输入 用户名/手机号/邮箱"></el-input>
		</el-form-item>
		```

		
