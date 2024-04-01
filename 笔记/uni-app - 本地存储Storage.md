### uni-app —— 本地存储Storage

1. `uni.setStorageSync(key,data)`：将数据同步保存在本地缓存中

   - key为字符串类型，表示要保存数据的键

   - data可以是任何支持 JSON 序列化的数据类型

2. `uni.getStorageSync(key)`：从本地缓存中同步获取指定 key 的数据

3. `uni.removeStorageSync(key)`：从本地缓存中同步移除指定 key

4. `uni.clearStorageSync()`：同步清空本地缓存中的所有数据

```js
// 存储数据
uni.setStorageSync('phone','19892183116')
// 获取数据
uni.getStorageSync('phone')
// 移除数据
uni.removeStorageSync('phone')
```

除此之外，还有异步存储方式。适用于存储较大的数据，以免阻塞主线程导致界面卡顿

[更多请查看uni-app官方文档](https://uniapp.dcloud.net.cn/api/storage/storage.html#setstorage)

1. `uni.setStorage(obj)`：将数据异步保存在本地缓存中

   **obj 参数说明**

   | **参数名** | **类型** | **必填** | **说明**                                                     |
   | :--------- | :------- | :------- | :----------------------------------------------------------- |
   | key        | String   | 是       | 本地缓存中的指定的 key                                       |
   | data       | any      | 是       | 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象 |
   | success    | function | 否       | 接口调用成功的回调函数                                       |
   | fail       | function | 否       | 接口调用失败的回调函数                                       |
   | complete   | function | 否       | 接口调用结束的回调函数（调用成功、失败都会执行）             |

2. `uni.getStorage(obj)`：从本地缓存中异步获取指定key的数据

   **obj 参数说明**

   | **参数名** | **类型** | **必填** | **说明**                                                |
   | :--------- | :------- | :------- | :------------------------------------------------------ |
   | key        | String   | 是       | 本地缓存中的指定的 key                                  |
   | success    | function | 是       | 成功的回调，回调参数：<br />res = {data: key对应的内容} |
   | fail       | function | 否       | 接口调用失败的回调函数                                  |
   | complete   | function | 否       | 接口调用结束的回调函数（调用成功、失败都会执行）        |

3. `uni.removeStorage(obj)`

   **obj 参数说明**

   | **参数名** | **类型** | **必填** | **说明**                                         |
   | :--------- | :------- | :------- | :----------------------------------------------- |
   | key        | String   | 是       | 本地缓存中的指定的 key                           |
   | success    | function | 是       | 回掉函数，在数据移除成功时触发                   |
   | fail       | function | 否       | 接口调用失败的回调函数                           |
   | complete   | function | 否       | 接口调用结束的回调函数（调用成功、失败都会执行） |

4. `uni.clearStorage()` ：清理本地数据缓存

```js
// 异步存储数据
uni.setStorage({
    key: 'userInfo',
    data: {
        id: '12345',
        password: 'aaa1!'
    }
})
// 异步获取数据
uni.getStorage({
	key: 'userInfo',
	success: function (res) {
		console.log(res.data)  // {id: '12345',password: 'aaa1!'}
	}
})
// 异步移除数据
uni.removeStorage({
	key: 'userInfo',
	success: function (res) {
		console.log('移除成功')
	}
})
```