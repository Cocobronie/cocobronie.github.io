---
title: 用dumi创建一个属于自己的组件库！
date: 2023-05-28 19:06:05
tags: 前端工程化 react
swiper_index: 999
cover: mycover.png
ai: false
typora-root-url: ./.. 
---

# 用dumi创建一个属于自己的组件库！

## 1、初始化配置

### 1.1 生成网页

参考官网：[初始化 (umijs.org)](https://d.umijs.org/guide/initialize)

```shell
$ npx create-dumi #通过官方工具创建项目
? Pick template type › - Use arrow-keys. Return to submit.
$ ❯   Static Site # 用于构建网站
$     React Library # 用于构建组件库，有组件例子(选这个)
$     Theme Package # 主题包开发脚手架，用于开发主题包
$ npm start		# 安装依赖后启动项目
```

### 1.2 左上角顶部Nav配置

<img src="/../../images/dumiNote/image-20230528191442525.png" alt="image-20230528191442525" style="zoom:70%;" />

参考：[【前端工程化】使用dumi2搭建React组件库和函数库详细教程和最佳实践 - 掘金 (juejin.cn)](https://juejin.cn/post/7222804347830206525)

在`dumic.ts`中配置：

```shell
export default defineConfig({
  // ...
  themeConfig: {
    name: 'dumi2-demo',
    nav: [
      { title: '介绍', link: '/guide' },
      { title: '组件', link: '/components/Foo' }, // components会默认自动对应到src文件夹
    ],
  },
  // ...
```



## 2、开发组件Button

参考：[【前端工程化】使用dumi2搭建React组件库和函数库详细教程和最佳实践 - 掘金 (juejin.cn)](https://juejin.cn/post/7222804347830206525)

### 2.1 编写组件源码

- 新建`src/Button/index.tsx`：组件源码

```tsx
import React, { memo } from 'react';
import './styles/index.less' // 引入样式
export interface ButtonProps {
  /** 按钮类型 */
  type?: 'primary' | 'default';
  /** 按钮文字 */
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

/** 按钮组件 */
const Button: React.FC<ButtonProps> = (props) => {
  const { type = 'default', children, onClick } = props
  return (
    <button
      type='button'
      className={`dumi-btn ${type ? 'dumi-btn-' + type : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default memo(Button);
```

- 新建`src/Button/index.less`：组件样式

```less
@import '../../variables.less';

.dumi-btn {
  font-size: 14px;
  height: 32px;
  padding: 4px 15px;
  border-radius: 6px;
  transition: all .3s;
  cursor: pointer;
}

.dumi-btn-default {
  background: #fff;
  color: #333;
  border: 1px solid #d9d9d9;

  &:hover {
    color: @dumi-primary;
    border-color: @dumi-primary;
  }
}

.dumi-btn-primary {
  color: #fff;
  background: @dumi-primary;
  border: 1px solid @dumi-primary;
}
```

- 在`src/index.ts`中引入后暴露一下

```typescript
export { default as Button } from './Button';
```



### 2.2 添加demo示例

- 新建`src/Button/demo/base.tsx`：组件的演示代码

```tsx
import React from 'react';
import { Button } from 'cocolib';

export default () => {

  return (
    <>
      <Button type="default">默认按钮</Button> &nbsp;
      <Button type="primary">主要按钮</Button>
    </>
  );
}
```



### 2.3 添加组件文档

- 新建`src/Button/index.md`：组件文档

```markdown
---
category: Components
title: Button 按钮 # 组件的标题，会在菜单侧边栏展示
toc: content # 在页面右侧展示锚点链接
group: # 分组
  title: 基础组件 # 所在分组的名称
  order: 1 # 分组排序，值越小越靠前
---

# Button 按钮

## 介绍

基础的按钮组件 Button。

## 示例 

<!-- 可以通过code加载示例代码，dumi会帮我们做解析 -->
<code src="./demo/base.tsx">基础用法</code>

## APi

<!-- 会生成api表格 -->
| 属性 | 类型                   | 默认值   | 必填 | 说明 |
| ---- | --------------------- | -------- | ---- | ---- |
| type | 'primary' | 'default' | 'default |  false  | 按钮类型 |
```



### 2.4 添加单元测试 

- 测试框架采用react最常用的jest工具，再配合react配套的单元测试库，安装依赖:

```shell
npm i jest @testing-library/react @types/jest ts-jest jest-environment-jsdom jest-less-loader typescript@4 -D
```

- 新建`/jest.config.js`：在项目根目录新建jest的配置文件，配置信息如下：

```javascript
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest', // 使用ts-jest预设，支持用ts写单元测试
  testEnvironment: 'jsdom', // 设置测试环境为jsdom环境
  roots: ['./src'], // 查找src目录中的文件
  collectCoverage: true, // 统计覆盖率
  coverageDirectory: 'coverage', // 覆盖率结果输出的文件夹
  transform: {
    '\.(less|css)$': 'jest-less-loader' // 支持less
  },
  // 单元覆盖率统计的文件
  collectCoverageFrom: ['src/**/*.tsx', 'src/**/*.ts', '!src/index.ts', '!src/**/demo/*'],
};
```

- 新建`src/Button/__tests__/index.test.tsx`：单元测试代码

```tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '..';

describe('Button组件', () => {
  it('能够正确渲染按钮文字', () => {
    const buttonText = '按钮文字';
    const { getByRole } = render(<Button>{buttonText}</Button>);
    const buttonElement = getByRole('button');
    expect(buttonElement.innerHTML).toBe(buttonText);
  });

  it('能够正确渲染默认样式的按钮', () => {
    const { getByRole } = render(<Button >默认按钮</Button>);
    const buttonElement = getByRole('button');
    expect(buttonElement.classList.contains('dumi-btn')).toBe(true);
  });

  it('能够正确渲染主要样式的按钮', () => {
    const { getByRole } = render(<Button type="primary">主要按钮</Button>);
    const buttonElement = getByRole('button');
    expect(buttonElement.classList.contains('dumi-btn-primary')).toBe(true);
  });

  it('能够触发点击事件', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button type="primary" onClick={handleClick}>点击按钮</Button>);
    const buttonElement = getByRole('button');
    fireEvent.click(buttonElement);
    // 断言函数被调用了一次。
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

- 执行一下单元测试:

```shell
$ npx jest
```

- 项目根目录下会生成测试报告的静态站点**coverage**文件夹，在浏览器打开`coverage/lcov-report/index.html`文件，即可看到测试报告

<img src="/../../images/dumiNote/image-20230528203012828.png" alt="image-20230528203012828" style="zoom:67%;" />

## 3、二次开发

有时候除了从0封装基础组件之外，还会基于antd等组件库进行二次开发，方式和开发基础组件是一样的。





## 4、函数库开发

