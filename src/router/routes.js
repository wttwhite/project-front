import projectManage from '@/views/project-manage/index.vue'
import projectManageAddEdit from '@/views/project-manage/add-edit.vue'
import projectManageDetail from '@/views/project-manage/detail.vue'

export default [
  {
    path: '/',
    redirect: '/projectManage',
  },
  {
    path: '/projectManage',
    name: 'project-manage',
    meta: {
      keepAlive: true,
      menu: true,
      title: '项目管理',
    },
    component: projectManage,
  },
  {
    path: '/projectManageAddEdit',
    name: 'project-manage-add-edit',
    meta: {
      title: '项目管理-新增',
    },
    component: projectManageAddEdit,
  },
  {
    path: '/projectManageDetail',
    name: 'project-manage-detail',
    meta: {
      title: '项目管理-详情',
    },
    component: projectManageDetail,
  },
]
