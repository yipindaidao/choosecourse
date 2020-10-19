import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import Login from "../views/login/Login"
import Home from "../views/home/Home"
import Arrange from "../views/arrange/Arrange"
import Choose from "../views/choose/Choose"
import Classroom from "../views/classroom/Classroom"
import Course from "../views/course/Course"
import Grade from "../views/grade/Grade"
import MyChoose from "../views/mychoose/MyChoose"
import MyCourse from "../views/mycourse/MyCourse"
import Student from "../views/student/Student"
import Teacher from "../views/teacher/Teacher"
import Term from "../views/term/Term"
import User from "../views/user/User"
import NotFound from "../views/notfound/NotFound"

// router文件夹-->index.js文件
//cv以下代码解决路由地址重复的报错问题(一劳永逸)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
// 不需要权限控制的路由
const constantsRoutes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  }
]
// 需要权限控制的路由
const asyncRoutes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      { path: 'arrange', name: 'arrange', component: Arrange },
      { path: 'choose', name: 'choose', component: Choose },
      { path: 'classroom', name: 'classroom', component: Classroom },
      { path: 'course', name: 'course', component: Course },
      { path: 'grade', name: 'grade', component: Grade },
      { path: 'mychoose', name: 'mychoose', component: MyChoose },
      { path: 'mycourse', name: 'mycourse', component: MyCourse },
      { path: 'student', name: 'student', component: Student },
      { path: 'teacher', name: 'teacher', component: Teacher },
      { path: 'term', name: 'term', component: Term },
      { path: 'user', name: 'user', component: User }
    ]
  }
]
// 初始化路由对象
const router = new VueRouter({
  routes: constantsRoutes
})

// 定义一个生成动态路由的方法
function generateRoutes(menus,routes) {
  let ary = []
  menus.forEach((item) => {

    if (item.children && item.children.length!=0) {
      item.children.forEach((sub) => {
        let rt = routes.find(r => r.name == sub.name)
        ary.push(rt)
      })
    }else {
      let rt = routes.find(r => r.name == item.name)
      ary.push(rt)
    }
  })
  return ary
}
// 全局导航守卫
router.beforeEach((to,from,next) => {
  if (store.state.permission.length == 0) {
    // 根据角色获取用户菜单
    store.dispatch('getPermission',store.state.currentUser).then((menus) => {
      // 根据菜单与路由找到当前用户的路由
      const rt = generateRoutes(menus,asyncRoutes[0].children)
      // 创建一个过滤好的路由
      const newRoutes = [
        {
          path: '/home',
          name: 'Home',
          component: Home,
          children: rt
        },
        { path: '*', name: 'notfound', component: NotFound }
      ]
      // 动态添加路由
      router.addRoutes(newRoutes)
      next(to.path)
    })
  }
  if (to.path == '/') {
    next()
  }
  else {
    if(store.state.currentUser != null) { // 说明已经登录
      next()
    }
    else {
      next('/')
    }
  }
})





export default router
