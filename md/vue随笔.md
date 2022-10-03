# vue随笔

## 脚手架文件结构:
```
├─ node_modules
│  public
│   ├── faviton.ico:页签图标
│   └── index.html:主页面
│
├─ src
│   ├── assets：存放静态资源
│   │   └─logo.png
│   │   component：存放组件
│   │   └─Hel loWorld.vue
│   ├── App.vue：汇总所有组件
│   └── main.js：入口文件
│
│───.gitgnore：git版本管制忽略的配置
│───babel.config.js：babel的配置文件
│───packge.json：应用包配置文件
│───README.md：应用描述文件
└──.package-lock.json：包版本控制文件
```

## 关于不同版本Vue：
-关于不同版本的vue：
1. vue.js与vue.runtime.xxx.js的区别：
（1）.vue.js是完整版的Vue，包含核心功能和模板解析器
（2）.vue.runtime.xxx.jx是运行版的Vue，只包含：核心功能，没有模板解析器
2. 因为vue.runtime.xxx.js没有模板解析器，所以不能是同template配置项，需要使用render函数接收到的createElement函数去指定具体内容


## vue.config.js配置文件
1. 使用vue inspect > output.js可以查看到Vue脚手架的默认配置。
2. 使用vue.config.js可以对脚手架个性化定制

## ref属性
1. 被用来给元素或子组件注册引用信息（id的替代者）
2. 应用在html标签上获取的是真实的DOM元素，应用在组件标签上是组件实例对象（vc）
3. 使用方式：
打标识：`<h1 ref="xx">...</h1> 或 <School ref="xxx"></School>`
获取：`this.$refs.xxx`

## 配置项props
##### 功能：让组件接收外部传过来的数据
1. 传递数据：
`Demo name="xxx"`
2. 接收数据：
第一种方式(只接受)
`props:['name']`

    第二种方式(限制类型)：
`props:{
name:Number
}`

    第三种方式(限制类型、限制必要性、指定默认值)：
`
props:{
name:{
    type='String',//类型
    reauired:true,//必要性
    default:'null'//默认值
}
}
`
###### 备注：props是只读的、Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data种的一份，然后去修改data中的数据


## mixin(混入)
1. 功能：可以把多个组件共用的配置提取成一个混入对象
2. 使用方式：
     定义混合，例如：

```
{
    data()(....),
    methods:{....}
    ....
}
```
3. 使用混入，例如：
(1).全局混入：`Vue.mixin(xxx)`
(2).局部混入(在配置项中):`mixin:{'xxx'}`

## 插件
1. 功能：用于增强Vue
2. 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据
3. 定义插件：
```
    对象名.install= function(Vue,options) {
        //例一：添加全局过滤器
        Vue.filter(....)
        //例二：添加全局指令
        Vue.directive(...)
        //例三：添加实例方法
        Vue.prototype.$myMethod=function(){...}
        Vue.prototype.$myProperty=xxxx
        //例四：配置全局混入（合）
        Vue.mixin(....)
    }
```
4. 使用插件：Vue.use()

## scoped样式
作用：让样式在局部生效，防止冲突
写法：`<style scoped>`

## 总结TodoList案例
1. 组件化编码流程：
    （1）.拆分静态组件：组件要按照功能拆分，命名不要与html元素冲突
    （2）.实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：
        （1）.一个组件在用：放在组件自身即可
        （2）.一些组件在用：放在他们共同的父组件上（状态提升）
    （3）实现交互：从绑定事件开始

2. props适用于：
（1）.父组件===>子组件 通信
（1）.子组件===>父组件 通信（要求父先给子一个函数）

3. 使用v-model要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的
4. props传过来的若是对象类型的值，修改对象中的属性时对Vue不会报错，但不推荐这样做。

## WebSorage
1. 存储内容大小一般支持5mb左右（不同浏览器可能还不一样）
2. 浏览器端通过Window.sessionStorage和Window.localStorage属性来实现本地存储机制
3. 相关API：
    1. `xxxxxStorage.setItem('key','value')` 
                该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值
    2. `xxxxxStorage.getItem('key')`
                该方法接受一个键名作为参数，返回键名对应的值
    3. `xxxxxStorage.removeItem('key')`
                该方法接受一个键名作为参数，并把键名从该存储中删除
    4. `xxxxxStorage.clear()`
                该方法会清空存储中的所有数据
4. 备注：
    1. sessionStorage存储的内容会随着浏览器窗口的关闭而消失
    2. localStorage存储的内容需要手动清除才会消失
    3. `xxxxxStorage.getItem('xxx')`如果xxx对应的value获取不到，那么getItem的返回值是null
    4. `JSON.parse(null)`的结果依然是null
        
## 组件的自定义事件
1. 一种组件间的通信的方式，适用于：子组件===>父组件
2. 使用场景：
A是父组件，B是子组件，B想给A传数据，那么要在A中给B绑定自定义事件(自定义事件的回调在A中)
3. 绑定自定义事件：
    1. 第一种方式在父组件中：`<Demo @Sakura='test' />或<Demo v-on:Sakura='test' />`
    2. 第二种方式，在父组件中
    ```
    <Demo ref='demo' />
    ....
    mounted(){
        this.$refs.demo.$on('Sakura',this.xxx)
    }
    ```    
    3. 若想让自定义事件只能触发一次，可以用`once`修饰符或`$once`方法
4. 触发自定义事件 `this.$emit('Sakura',数据)`
5. 解绑自定义事件 `this.$off('Sakura')`
6. 组件上也可以绑定原生DOM事件，需要使用`native`修饰符
###### 注意：通过`this.$refs.xxx.$on('Sakura',回调)`绑定自定义事件时，回调要么配置在methods中，要么用箭头函数，否则this指向会出问题

## 全局事件总线（GlobalEventBus）
1. 一种组件间的通信的方式，适用与任意组件间通信
2. 安装全局事件总线：
```
new Vue({
    ...
    beforeCreate(){
        Vue.prototype.$bus=this//安装全局事件总线，$bus就是当前应用的vm
    },
    ...
})
```
3. 使用事件总线
    1. 接收数据：A组件想接受数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身
    ```
    methods(){
        demo(data){.....}
    }
    ......
    mounted(){
        this.$bus.$on('xxxx',this.demo)
    }
    ```

    2. 提供数据：`this.$bus.$emit('xxxx',数据)`

###### 4.最好在beforeDestroy钩子种，用$off去解绑当前组件所用到的事件

## 消息订阅与发布(pubsub)
1. 一种组件间的通信的方式，适用与任意组件间通信
2. 使用步骤
    1. 安装pubsub:`npm i pubsub-js`
    2. 引入：`import pubsub from 'pubsub-js`
    3. 接受数据：A组件想接受数据,则在A组件中订阅消息，订阅的回调留在A组件自身。
    ```
    methods:{
        demo(data)(...)
    }
    ...
    mounted(){
        this.pid=pubsub.subscribe('xxx',this.demo)
    }
    ```
    4. 提供数据：`pubsub.publish('xxx',数据)`
    5. 最好在beforeDestroy钩子中，用`publish.unsubscribe(pid)`去取消订阅消息

## nextTick
1. 语法:`this.$nextTick(回调函数)`
2. 作用：在下一次DOM更新结束后执行其指定的回调
3. 什么时候用：当改变数据后，要基于更新后的DOM进行某些操作时，要在nextTick所指定的回调函数中执行

## Vue封装的过度与动画
1. 作用：在插入、更新或移除DOM元素时 在合适的时候给元素添加样式类名
2. 写法：
    1. 准备好样式：
    *元素进入的样式：
        1.v-enter:进入的起点
        2.v-enter-active:进入过程中
        3.v-enter-to:进入的终点
    *元素离开的样式：
        1.v-leave:离开的起点
        2.v-leave-active:离开过程中
        3.v-leave-to:离开的终点
    2. 使用`<transition>`包裹要过渡的元素，并配置name属性：
```
<transition name='hello'>
    <h1 v-show='isShow'>你好啊！</h1>
</transition>
```
备注：若有多个元素需要过度，则需使用:`<transition-group>`,且每个元素要指定唯一的值key

## Vue中脚手架配置代理
##### 方法一：在Vue.config.js中添加如下配置
```
devServer: {
    proxy: 'http://localhost:5000'
},
```
说明：
1.优点：配置简单，请求资源时直接发给前端8080即可
2.缺点：不能配置多个代理，不能灵活的控制请求是否走代理
3.工作方式：若按照上述配置代理，当请求了不存在的资源时，那么该请求会转发给服务器（优先匹配前端资源）

##### 方法二：编写Vue.config.js配置具体代理规则
```
devServer: {
    proxy: {
      '/tohsaka': {//匹配所有以'/tohsaka'开头的请求路径
        target: 'http://localhost:5000',//代理目标的基础路径
        pathRewrite: { '^/tohsaka': '' },//正则校验，用于清除路径中的/tohsaka
        ws: true,//用于支持websocket
        changeOrign: true//用于控制请求头中的host值
      },
      '/sakura': {
        target: 'http://localhost:5001',
        pathRewrite: { '^/sakura': '' },
        ws: true,//用于支持websocket
        changeOrign: true//用于控制请求头中的host值
      },
    }
  }
  <!-- 
  changeOrign设置为true时，服务器收到的请求头中的host为:localhost:5000
  changeOrign设置为false时，服务器收到的请求头中的host为:localhost:8000
  changeOrign默认值是true
   -->
```
说明：
1.优点：可以配置多个代理，且可以灵活的控制请求是否走代理
2.缺点：配置略微繁琐，请求资源时必须加前缀

## 插槽
1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间的通信方式。使用于父组件===>子组件
2. 分类：默认插槽，具名插槽，作用域插槽
3. 使用方式：
    1. 默认插槽：
    ```
    父组件中：
            <Category>
                <div>要给子组件的html结构<div>
            </Category>
    子组件中：
            <template>
                <div>
                <!-- 定义插槽 -->
                    <slot>插槽默认内容</slot>
                </div>
            </template>
    ```

    2. 具名插槽：
    ```
    父组件中：
            <Category>
                <template slot='center>
                    <div>要给子组件的html1结构<div>
                <template>
                 <template v-slot='footer>
                    <div>要给子组件的html2结构<div>
                <template>
            </Category>
    子组件中：
            <template>
                <div>
                <!-- 定义插槽 -->
                    <slot name='center'>插槽默认内容</slot>
                    <slot name='footer'>插槽默认内容</slot>
                </div>
            </template>
    ```
    3. 作用域插槽
        1. 理解：数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定（animals数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）
        2. 具体编码：
         ```
        父组件中：
            <Category>
                <template scope='scopeData'>
                         <!-- 生成的是ul列表 -->
                    <ul>
                         <li v-for:'a,index in scopeData.animals' :key='index'>{{a}}</li>
                    </ul>
                <template>
            </Category>

            <Category>
                <template scope='scopeData'>
                         <!-- 生成的是ol列表 -->
                    <ol>
                         <li v-for:'a,index in scopeData.animals' :key='index'>{{a}}</li>
                    </ol>
                <template>
            </Category>

            <Category>
                <template scope='scopeData'>
                         <!-- 生成的是h4 -->
                    <h4>
                         <li v-for:'a,index in scopeData.animals' :key='index'>{{a}}</li>
                    </h4>
                <template>
            </Category>

            
        子组件中：
            <template>
                <div>
                <!-- 定义插槽 -->
                    <slot>插槽默认内容</slot>
                </div>
            </template>
         ```

## Vuex
##### 1. 概念
    在Vue中实现集中式状态(数据)管理的一个Vue插件，对Vue应用中多个组件的共享状态进行集中式的管理(读/写)，也是一种组件间通信的方式，且适用于任意组件间通信。
##### 2. 何时使用？
    多个组件需要共享数据时
##### 3. 搭建vuex环境
1. 创建文件:`src/store/index.js`
    ```
    //该文件用于创建Vuex中最为核心的store
    //引入Vue核心库
    import Vue from 'vue'
    //引入Vuex
    import Vuex from 'vuex'
    //应用Vuex插件
    Vue.use(Vuex)

    //准备actions==用于响应组件中的动作
    const actions = {}

    //准备mutations==用于操作数据(state)
    const mutations = {}

    //准备state==用于存储数据
    const state = {}

    //创建并暴露（导出）store
    export default new Vuex.Store({
        actions,
        mutations,
        state,
    })

    ```
2. 在`main.js`中创建vm时传入`store`配置项
    ```
    ......
    //引入store
    import store from './store/index.js'
    ......
    //创建vm
    new Vue({
        el'#app',
        render:h=>(App),
        store
    })
    ```
##### 4. 基本使用
1. 初始化数据、配置`actions`,配置`mutations`,操作文件`store`
    ```
        //该文件用于创建Vuex中最为核心的store
    //引入Vuex于Vue
    import Vue from 'vue'
    import Vuex from 'vuex'
    //应用Vuex插件
    Vue.use(Vuex)

    //准备actions==用于响应组件中的动作
    const actions = {
        // jia(context, value) {
        //     context.commit('JIA', value)
        // },
        // jian(context, value) {
        //     context.commit('JIAN', value)
        // },
        jiaOdd(context, value) {
            if (context.state.sum % 2) {
                context.commit('JIAODD', value)
            }
        },
        jiaWait(context, value) {
            setTimeout(() => {
                context.commit('JIAWAIT', value)
            }, 1000);
        }
    }

    //准备mutations==用于操作数据(state)
    const mutations = {
        JIA(state, value) {
            state.sum += value
            console.log(state.sum)
        },
        JIAN(state, value) {
            state.sum -= value
        },
        JIAODD(state, value) {
            state.sum += value
        },
        JIAWAIT(state, value) {
            state.sum += value
        }
    }

    //准备state==用于存储数据
    const state = {
        sum: 0,
    }

    //创建并暴露（导出）store
    export default new Vuex.Store({
        actions,
        mutations,
        state,
    })
    ```
2. 组件中读取vuex中的数据:`$store.state.sum`
3. 组件中修改vuex中的数据:`$store.dispatch('jia',this.n)或$store.commit('JIA,this.n)`
##### 5. getters的使用
1. 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工
2. 在`store.js`中追加`getters`配置
    ```
        ......
    //准备getters——用于将state中的数据进行加工
    const getters = {
        bigSum(state) {
            return state.sum * 10
        }
    }
    //创建并暴露（导出）store
    export default new Vuex.Store({
        ......
        getters,
    })
    ```
3. 组件中读取数据:`$store.getters.bigSum`

##### 6. 四个map方法的使用
1. mapState方法:用于帮助我们映射state中的数据为计算属性
    ```
    computed:{
        //借助mapState生成计算属性，从state中获取数据（对象写法）
    ...mapState({ sum: "sum", school: "school", subject: "subject" }),

    //借助mapState生成计算属性，从state中获取数据（数组写法）
    ...mapState(["sum", "school", "subject"]),
    }
    ```
2. mapGetters方法:用于帮助我们映射getters中的数据为计算属性
    ```
    computed:{
    //借助mapGetters生成计算属性，从getters中获取数据（对象写法）
    ...mapGetters({ bigSum: "bigSum" }),
    //借助mapGetters生成计算属性，从getters中获取数据（数组写法）
    ...mapGetters(["bigSum"]),
    }
    ```
3. mapActions方法:用于帮助我们生成与`actions`对话的方法，即:包含`$store.dispatch(xxx)`
    ```
    methods:{
    //借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(对象写法)
    ...mapActions({ incrementOdd: "jiaOdd", incrementWait: "jiaWait" }),
    
    //借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(数组写法)
    ...mapActions(["jiaOdd","jiaWait"]),
    }
    ```
4. mapMutations方法:用于帮助我们生成与mutations对话的方法,即包含：`$store.commit(xxx)`的函数
     ```
    methods:{
     //借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(对象写法)
    ...mapMutations({ increment: "JIA", decrement: "JIAN" }),
   
    //借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(数组写法)
    ...mapMutations(["JIA", "JIAN"]),
    ```

    ###### 备注：mapActions与mapMutations使用时，若要传递参数需要，则应在模板中绑定事件时传递好参数，否则参数是事件对象

##### 7. 模块化+命名空间
目的：让代码更好维护，让多种数据分类更加明确
1. 修改store.js
    ```
    const countAbout = {
    namespaced: true,//开启命名空间
    actions: {
        jiaOdd(context, value) {
            if (context.state.sum % 2) {
                context.commit('JIAODD', value)
            }
        },
    },
    mutations: {
        JIA(state, value) {
            state.sum += value
            console.log(state.sum)
        },
    },
    state: {
        sum: 0,
    },
    getters: {
        bigSum(state) {
            return state.sum * 10
        }
    }
    }

    const personAbout = {
    namespaced: true,//开启命名空间
    actions: {
        addPersonServe(context) {
            axios.get('https://api.uixsj.cn/hitokoto/get?type=game').then(
                response => {
                    context.commit('ADD', response.data)
                },
                error => {
                    alert(error.message)
                }
            )
        }
    },
    mutations: {
        ADD(state, value) {
            state.personList.unshift({ id: nanoid(), name: value })
        }
    },
    state: {
        personList: [
            { id: '001', name: '特别周' },
            { id: '002', name: '目白麦昆' },
            { id: '003', name: '东海帝王' },
            { id: '004', name: '无声铃鹿' },
        ]
    },
    getters: {
        personFirst(state) {
            return state.personList[0].name
        }
    }
    }
    ```
2. 开启命名空间后，组件中读取state数据
    ```
    //方式一：自己直接读取
    this.$store.state.personAbout.personList
    //方式二：借助mapState读取(需事先import)
    ...mapState('countAbout',['sum'])
    ```
3. 开启命名空间后，组件中读取getters数据
    ```
    //方式一：自己直接读取
    this.$store.getters['personAbout/personFirst']
    //方式二：借助mapGetters读取(需事先import)
    ...mapGetters('countAbout',['bigsum'])
    ```
4. 开启命名空间后，组件中调用dispatch
    ```
    //方式一：自己直接dispatch
    this.$store.dispatch('personAbout/addPersonServe')
    //方式二：借助mapActions读取(需事先import)
    ...mapActions('countAbout',{incrementOdd:'jiaOdd'})
    ```
5. 开启命名空间后，组件中调用commit
    ```
    //方式一：自己直接commit
    this.$store.commit('personAbout/addPersonServe')
    //方式二：借助mapActions读取(需事先import)
    ...mapMutations('countAbout',{increment:'JIA'})
    ```
    ###### 备注：可以将store里的index.js文件引出Count.js与Person.js文件用于分别维护不同的功能


## 路由
1. 理解：一个路由（route）就是一组映射关系（key-value)，多个路由需要路由器（router）进行管理
2. 前端路由：key是路径，value是组件

#### 1.基本使用
1. 安装vue-router，命令(vue2版本只能安装3.x版本的vue-router)：`npm i vue-router`
2. 应用插件：`Vue.use(VueRouter)`
3. 编写router配置项:
  ```
    import VueRouter from "vue-router";
    import Home from '../components/pages/Home';
    import About from "../components/pages/About";
    //创建并暴露router实例对象，去管理一组一组的路由规则
    export default new VueRouter({
        routes: [
            {
                path: '/about',
                component: About
            },
            {
                path: '/home',
                component: Home
            },
        ]
  ```
4. 实现切换(active-class可配置高亮样式，意为点击该标签时添加active的class)
    ` <router-link to="/about" active-class="active">About</router-link>`
5. 指定展示位置
    `<router-view></router-view>`
#### 2.几个注意点
1. 路由组件通常存放在`pages`文件夹，一般组件通常存放在components文件夹。
2. 通过切换，‘隐藏’了的路由组件，默认是被销毁的，需要的时候再去挂载
3. 每个组件都有自己的`$route`属性，里面存储着自己的路由信息
4. 整个应用只有一个router，可以通过组件的`$router`属性获取到

#### 3.多级路由
1. 配置路由规则，使用children配置项：
```
 routes: [
            {
                path: '/about',
                component: About,
                children: [
                {
                    path: 'lycories',
                    component: Lycories
                },
                ]
            },
            {
                path: '/home',
                component: Home,
                children: [
                {
                    path: 'recoil',
                    component: Recoil
                },
                ]
                              
            },
        ]
```
2. 跳转(要写完整路径)：
`   <router-link to="/about/recoil" active-class="active">Recoil</router-link>`

#### 4.路由的query参数
1. 传递参数
```
    <!-- 跳转路由携带query参数，to的字符串写法 -->
        <router-link :to="`/about/lycories/image?id=${i.id}&name=${i.name}`">{{i.name}}</router-link>

    <!-- 跳转路由携带query参数，to的对象写法 -->
        <router-link
          :to="{
            path: '/about/lycories/image',
            query: {
              id: i.id,
              name: i.name,
            },
          }"
        >
          {{ i.name }}
        </router-link>
```
2. 接收参数
```
$route.query.id
$route.query.name
```

#### 5.命名路由
1. 作用：可以简化路由的跳转。
2. 如何使用
    1. 给路由命名
    ```
     routes: [
            {
                name:'about'//给路由命名
                path: '/about',
                component: About
            },
            {
                name:'home'//给路由命名
                path: '/home',
                component: Home
            },
        ]
    ```
    2. 简化跳转：
    ```
    <!-- 简化前：需要写完整的路径 -->
     <router-link to="/home/lycories" active-class="active"><li>lycories</li></router-link>
    <!-- 简化后：可以直接通过名字跳转 -->
     <router-link :to="{name:'image',}">  {{ i.name }} </router-link>
     <!-- 简化写法配合参数： -->
      <router-link
          :to="{
            name: 'image',
            query: {
              id: i.id,
              name: i.name,
            },
          }"
        >
          {{ i.name }}
        </router-link>
    ```

#### 路由的params参数
1. 配置路由，声明接受params参数
```
     routes: [
            {
               name: 'about',
            path: '/about',
            component: About,
            children: [
                {
                    name: 'lycories',
                    path: 'lycories',
                    component: Lycories,
                    children: [
                        {
                            name: "image",
                            path: 'image/:id/:name',//使用占位符声明接收params参数
                            component: Image
                        }
                    ]
                },
            },
            ]
            }
        ]
```

2. 传递参数
```
 <!-- 跳转路由携带params参数，to的字符串写法 -->
       <router-link :to="`/about/lycories/image/${i.id}/${i.name}`">{{ i.name }}</router-link>

        <!-- 跳转路由携带paprams参数，to的对象写法 -->
        <router-link
          :to="{
            name: 'image',
            params: {
              id: i.id,
              name: i.name,
            },
          }"
        >
          {{ i.name }}
        </router-link>
```

###### 特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置

3. 接受参数
`$route.params.id`
`$route.params.name`

#### 7.路由的props配置
作用:让路由组件更方便的收到参数
```
{
    name: "image",
    path: 'image/:id/:name',
    component: Image,
    //props的第一种写法，值为对象,该对象中的所有key-value值都会一props形式传给Image组件
    // props: { a: 1, b: 'hello' }
    //props的第二种写法：值为布尔值，若布尔值为真，就会把该路由组件收到的所有params参数，以params的形式传递给Image组件
    //props: true
    //props的第三种写法：值为函数
    props($route) {
        return {
            id: $route.params.id,
            name: $route.params.name
        }
    }
}
```

#### 8.`<router-like>`的replace属性
1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入方式：分别是push和replace，push是追加历史记录，replace是替换当前记录，默认为push
3. 如何开启replace模式：`<router-like replace....>Home</router-like>`

#### 9.编程式路由导航
1. 作用：不借助`<router-like>`实现路由跳转，让路由跳转更加灵活
2. 具体编码：
```
methods: {
    pushShow(i) {
      this.$router.push({
        name: "image",
        params: {
          id: i.id,
          name: i.name,
        },
      });
    },
    replaceShow(i) {
      this.$router.replace({
        name: "image",
        params: {
          id: i.id,
          name: i.name,
        },
      });
    },
  },



      this.$router.back() 回退路由
      this.$router.forward(); 前进路由
      this.$router.go(3); 指定前进或后退路由
```

#### 10.缓存路由组件
1. 作用：让不展示的路由组件保持挂载，不被销毁
2. 具体编码
```
<keep-alive include='Image2'>
    <router-view>/<router-view>
</keep-alive>
```

#### 11.两个信道生命周期钩子
1. 作用：路由器组件所独有的两个钩子，用于捕获路由组件的激活状态
2. 具体:
    1. `activated`路由组件被激活时触发
    2. `deactivated`路由组件失活时触发

#### 12.路由守卫
1. 作用：对路由进行权限控制
2. 分类：全局守卫，独享守卫，组件内守卫
3. 全局守卫
```
//全局前置守卫——————初始化的时候被调用，每次路由切换之前被调用
router.beforeEach((to, from, next) => {

    if (to.meta.isAuth) {//判断是否需要判断权限
        if (localStorage.getItem('school') === 'Sakura') {
            next()//放行
        }
        else {
            alert('权限不够捏，请修改localStora的值捏')
        }
    }
    else {
        next()//放行
    }

})

//全局后置守卫——————每次路由切换之后被调用
router.afterEach((to, from) => {
    document.title = to.meta.title || 'Tohsaka'//修改网页的title
})
```
4. 独享守卫
```
    name: 'about',
    path: '/about',
    component: About,
    beforeEnter: (to, from, next) => {//判断当前路由是否需要进行权限控制
        if (localStorage.getItem('school') === 'Sakura') {
            next()
        }
        else {
            alert('权限不够捏，请修改localStora的值捏')
        }
    },
```
5. 组件内守卫
```
 //通过路由规则，进入该组件时被调用
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("school") === "Sakura") {
      next();
    } else {
      alert("权限不够捏，请修改localStora的值捏");
    }
  },
  //通过路由规则，离开该组件时被调用
  beforeRouteLeave(to, from, next) {
    next();
  },
```

#### 13.路由器的两种工作模式
1. 对于一个`url`来说，什么是hash值？-----#及其后面的内容就是hash值
2. hash值不会包含在HTTP请求中，即:hash值不会带给服务器
3. hash模式：
    1. 地址中永远带着#号，不美观
    2. 若以后将地址通过第三方手机app分享，若app校验严格，则会标记为不合法
    3. 兼容性好
4. history模式:
    1. 地址干净，美观
    2. 兼容性和hash模式相比略差
    3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题


## 防抖与节流

1. 防抖：类似与英雄联盟的回城，多次点击回城会取消上一次，只实现最后一次的回城。即多次触发，但执行的回调函数只执行最后一次

2. 节流：类似与英雄联盟的技能cd，每释放一次技能都会有cd，即固定秒数内只能执行一次，即在规定的间隔时间范围内不会重复触发回调事件，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发filetimeis=2022-10-3 22:55