# webpack4_learn
learn webpack4

## 一、代码分割 & 长缓存 （splitChunks）
### 1、第三方库分割
#### 如lodash、jquery等，可能做浏览器持久化缓存
### 2、异步代码分割（按需加载，prefetch、preload）
#### 可以按需加载，也可以使用webpackPrefetch、webpackPreload(Prefetch 会等待核心代码加载完之后，有空闲之后再去加载。Preload 会和核心的代码并行加载),针对优化，不仅仅是局限于缓存，缓存能带来的代码性能提升是非常有限的，而是如何让代码的使用率最高，有一些交互后才用的代码，可以写到异步组件里面去，通过懒加载的形式，去把代码逻辑加载进来，这样会使得页面访问速度变的更快，如果你觉得懒加载会影响用户体验，可以使用 Prefetch 这种方式来预加载，不过在某些游览器不兼容，会有兼容性的问题，重点不是在 Prefetch 怎么去用，而是在做前端代码性能优化的时候，缓存不是最重要的点，最重要的是代码使用的覆盖率上(coverage)
### 3、提取&合并css