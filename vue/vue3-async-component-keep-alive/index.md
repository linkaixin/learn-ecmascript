# Provide 提供 / Inject 注入

主要用于开发深层次嵌套的组件，允许一个祖先组件向其所有子孙组件传递数据，而无需通过每一层组件逐个传递作为 prop

## 使用场景

1. 在一个组件体系下，如果有深度嵌套
2. 在一个组件体系下，多层级多个组件使用时

## 缺陷

1. 绑定时不是响应式的
2. 父组件是不知道谁使用了我的 provide 数据
3. 子组件也不知道谁提供了这个数据
