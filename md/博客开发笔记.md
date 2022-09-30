# TokBlog开发说明

#### 1.promise解决回调地狱
一种是利用`then((value)=>{})`函数的第一个参数(第二个参数是rejecte的)直接获取promise内`resolved`.
promise内部直接return即可代表resolved状态，rejecte则需要`return Promise.rejecte(new Error('xxx')))`返回的值

第二种是利用`async`与`await`联合使用，async代表异步函数，能够用await的只能是异步函数，所以要在使用await的函数外加上async使之变为异步，不影响整体同步执行。因为await能够阻塞一个promise，只有被添加的promise变为resolve，await后面的语句才能够继续向下执行，若为rejecte，则会一直阻塞一下，通常会配合`try``catch`联合使用

#### 2.获取父组件的dom元素
给父组件添加`ref`，再在子组件中调`this.$parent.$refs.xxx`即可获取到父组件的ref，从而调用dom节点

#### 3.关于实现图片动态加载
由于图片标签的`src`中引入的图片应该为图片的本身路径（相对路径或者绝对路径），而 vue 项目通过 webpack 的 devServer 运行之后，默认的 vue-cli 配置下，图片会被打包成 name.hash 的图片名，在这种情况下，如果我们使用固定的 字符串路径则无法找到该图片，url-loader无法解析图片路径，执行`npm run dev`或者`npm run build`之后导致路径没有被加工所以需要使用 `require` 方法来返回图片的编译路径,所以如果想要实现动态加载大量图片，需要图片在`created`的时候require处理后再push到需要渲染到页面的data数组里。注意：`require`里所需的参数不能为变量，只能是一段路径，所以不能用变量的方式处理，所以需要将参数分割处理，先获取到所需加载图片的`name`(我是根据后端接口获取)，再将图片的地址放在`name`前面，将图片格式接再`name`后面(所以需要大量渲染的图片应该是统一格式)，具体如：
```
for (let i in result) {
    result[i] = require("../../" + result[i] + ".jpg")
    }
```

#### 4.关于无限加载瀑布流
目前使用的是网上找的代码，自己根据想实现的效果进行修改，变成了我的嘿嘿（不要脸
但如果不需要实现滚轮到底懒加载的话可以使用：给需要使用的图片添加一个盒子包裹，再在需要瀑布流的容器中添加`flex`，并设置固定的`height`，主轴为`colum`并设置允许换行，便可以简单的实现瀑布流，但这种瀑布流不能够实现无限滚动懒加载，因此适合图片数量少的情况，具体代码如下：
```
<template>
<div :style="{ height: scrollerHeight }" class="scrollBox" ref="cont">
    <div
      class="item"
      v-for="(image, index) in showImage"
      ref="water"
      :key="index"
    >
      <img :src="image" alt="" />
    </div>
  </div>
</template>
<style> 
  .scrollBox {
  display: flex;
  flex-direction: column;
  height: 130rem;
  width: 100%;
  flex-wrap: wrap;
  padding: 2rem;
}
.scrollBox ul {
  position: relative;
  box-sizing: border-box;
  padding: 2px;
  counter-increment: itemCount;
}
.item::after {
  position: absolute;
  height: 30px;
  line-height: 30px;
  width: 30px;
  z-index: -1;
  text-align: center;
  background-color: #000;
  color: #fff;
  top: 10px;
  left: 10px;
  content: counter(itemCount);
}
.scrollBox img {
  width: 29rem;
  position: relative;
  z-index: -1;
  display: block;
  margin: 0.4rem;
  border-radius: 5px;
}
</style> 
```