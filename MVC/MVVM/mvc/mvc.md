MVC
后端 MVC
M: Model 模型层 -> 操作数据库，对数据进行增删改查的操作
V: View 视图层 -> 显示视图或视图模版
C: Controller 控制器层 -> 逻辑层 数据和视图关联挂载和基本的逻辑操作
服务端渲染
view 需要数据，Controller 对应的方法调用 Model 获取数据，返回给 Contraoller 对应的方法，render 到 View 中
前端渲染
API 层，前端请求的 API 对应的是控制器中的方法
前端异步请求 URL，控制器中的一个方法去调用 Model 层的方法，操作数据库获取数据，返回给控制器方法，再响应给前端

前端 MVC
M: Model 模型层->管理视图所需要的数据，数据与视图的关联
V: View 视图层-> HTML 模版和视图渲染
C: Controller 控制器层-> 管理事件逻辑

Model -> Controller -> View
View -> Controller -> Model

MVC 是 MVVM 的雏形
vue 不是完全的 MVVM 模型，
