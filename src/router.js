import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/components/home/home'
import login from '@/components/auth/Loginhome'
import loginAD from '@/components/auth/loginwithAD'
import navbar from '@/components/publicData/navbar'
// import about from '@/components/about'
import bar from '@/components/bar'
// import contact from '@/components/contact'
import PrivacyPolicy from '@/components/home/footer/PrivacyPolicy'
import TermConditionofUse from '@/components/home/footer/TermConditionofUse'
import CookiesPolicy from '@/components/home/footer/CookiesPolicy'
import policy from '@/components/auth/policy'
import navbarAdmin from '@/components/admin/navbar'
import management from '@/components/admin/managementConsole'
// import userprofile from '@/components/auth/userprofile'
import mgmtPermission from '@/components/admin/managementMenu/mgmtPermission'
import metadata from '@/components/admin/metadata/metadata'
// import ConsentAgreement from '@/components/admin/ConsentAgreement'
// import monitoring from '@/components/admin/monitoring'
import permission from '@/components/admin/permission'
import SystemReport from '@/components/admin/SystemReport/SystemReport'
import viewdashboard from '@/components/publicData/dashboard/viewdashboard'
import api from '@/components/publicData/dashboard/api'
import favorite from '@/components/home/favorite'
import AddFile from "@/components/admin/metadata/AddFile";
// import workbench from "@/components/admin/metadata/workbench";
import organization from "@/components/admin/Organization/Organization";
import Category from "@/components/admin/Category/Category";
import Cookienbtc from '@/components/auth/cookienbtc.vue';
// import Callback from '@/components/auth/Callback.vue';
import SecuredPage from "@/components/auth/SecuredPage.vue";
// import OpenIdLogin from "../src/components/auth/SamlLogin.vue";
// import saml from '@/components/auth/testsaml.vue';
import OpenIdCallback from '@/components/auth/OpenIdCallback.vue';
import { Encode, Decode } from "@/services";
import loginlocal from '@/components/auth/Loginlocal'
import store from '@/stores/store.js'
import apidocs from '@/components/publicData/apiswagger';
import APIConfiguration from '@/components/admin/api/apiconf';
import APIManagement from '@/components/admin/api/apimgmt';



Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/loginOpenID',
      name: 'OpenIdCallback',
      component: OpenIdCallback
    },
    {
      path: '/login/local', name: 'name', component: loginlocal, meta: { logincheck: true },
      children: [
        { path: '/user/:id', component: loginlocal },
        { path: '/verify/:id', component: loginlocal },
        { path: '/unlock/:id', component: loginlocal },
        { path: '/resetpassword/:id', component: loginlocal },
        { path: '/secured', component: SecuredPage },
      ]
    },
    {
      path: '/login', name: 'name', component: login, meta: { logincheck: true },
      children: [
        { path: '/user/:id', component: login },
        { path: '/verify/:id', component: login },
        { path: '/unlock/:id', component: login },
        { path: '/resetpassword/:id', component: login },
        { path: '/secured', component: SecuredPage },
        // {
        //   path: '/openid-login',
        //   name: 'openidLogin',
        //   component: OpenIdLogin
        // },
      ]
    },
    {
      path: '/loginAD', component: loginAD, meta: { logincheck: true },
    },
    {
      path: '/',
      component: bar,
      meta: { requiresAuth: true },
      children: [
        // { path: '/home', component: home},
        // { path: '/', component: home },
        // { path: '/opendata/:id', component: navbar },
        // { path: '/home/about', component: about },
        // { path: '/home/favorite', component: favorite },
        // { path: '/home/contact', component: contact },
        { path: '/home/PrivacyPolicy', component: PrivacyPolicy },
        { path: '/home/TermConditionofUse', component: TermConditionofUse },
        { path: '/home/CookiesPolicy', component: CookiesPolicy },
        { path: '/admin/navbarAdmin', component: navbarAdmin },
        { path: '/admin/management', component: management,  meta: { requiresAuth: true, menuName: 'Management' } },
        { path: '/admin/PermissionManagement', component: navbarAdmin, meta: { requiresAuth: true, menuName: 'Permission Management' } },
        { path: '/admin/DatasetConfiguration', component: navbarAdmin, meta: { requiresAuth: true, menuName: 'Dataset Configuration' }},
        // { path: '/admin/TaskMonitoring', component: navbarAdmin },
        { path: '/admin/UserManagement', component: navbarAdmin, meta: { requiresAuth: true, menuName: 'User Management' } },
        { path: '/admin/ConsentAgreement', component: navbarAdmin, meta: { requiresAuth: true, menuName: 'Consent Agreement' } },
        { path: '/admin/GroupDatasetManagement', component: navbarAdmin, meta: { requiresAuth: true, menuName: 'Group Dataset Management' } },
        { path: '/admin/addfile', component: navbarAdmin, meta: { requiresAuth: true, menuName: 'Add File' }},
        // { path: '/admin/WorkBench', component: navbarAdmin,  meta: { requiresAuth: true, menuName: 'Work Bench' } },
        // { path: '/admin/DataSource', component: navbarAdmin, meta: { requiresAuth: true, menuName: 'Data Source' } },
        { path: '/admin/GroupUserManagement', component: navbarAdmin, meta: { requiresAuth: true, menuName: 'Group User Management' } },
        { path: '/admin/DatasetManagement', component: navbarAdmin, meta: { requiresAuth: true, menuName: 'Dataset Management' } },
        { path: '/admin/DatasetPermissionMonitor', component: navbarAdmin,  meta: { requiresAuth: true, menuName: 'Dataset Permission Monitor' } },
        // { path: '/view/dashboard/:id', component: viewdashboard },
        // { path: '/view/api/:id', component: api },
        // { path: '/userprofile/:id', component: userprofile },
        // { path: '/workbench/:id', component: workbench },
        { path: '/admin/Organization', component: navbarAdmin, meta: { requiresAuth: true, menuName: 'Organization' }  },
        { path: '/admin/Category', component: navbarAdmin, meta: { requiresAuth: true, menuName: 'Category' } },
        { path: '/admin/APIConfiguration', component: navbarAdmin, meta: { requiresAuth: true, menuName: 'API Configuration' } },
        { path: '/admin/APIManagement', component: navbarAdmin, meta: { requiresAuth: true, menuName: 'API Management' } },
        { path: '/docs', name: 'ApiDocs', component: apidocs },
      ]
    },
    { path: '/policy', component: policy },
    // { path: '/Cookie-list.aspx', component: Cookienbtc },
    // { path: '/callback', component: Callback },
    // { path: '/loginOpenID', name: 'OpenIdCallback', components: OpenIdCallback},
    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((x) => x.meta.requiresAuth)) {
    if (!window.$cookies.isKey('information')) {
      next({ path: '/login' })
    } else {
      Vue.prototype.$isLoading = true;
      next()
    }
    return
  }
  next()
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((x) => x.meta.logincheck)) {
    var param = window.location.href
    var name = param.substring(param.lastIndexOf("/") + 1, param.length);
    if (window.$cookies.isKey('information') && ( name === 'login' || name === 'loginAD')) {
      Vue.prototype.$isLoading = true;
      next({ path: '/' })
    } else {
      next()
    }
    return
  }
  next()
})




router.beforeEach(async (to, from, next) => {
  console.log("Routing to:", to.path); // Log จุดเริ่มต้น

  if (to.matched.some(record => record.path.startsWith('/admin'))) {
    if (!window.$cookies.isKey('information')) {
      console.log('No information cookie found, redirecting to login.');
      next({ path: '/login' });
      return;
    }

    const user = JSON.parse(Decode.decode(Vue.prototype.$cookies.get('information')));
    console.log('User info:', user);

    if (user.isAdmin === "false") {
      console.log('User is not admin, redirecting to home.');
      next({ path: '/' });
      return;
    }

    // รอจนกว่าการ fetch ข้อมูลจะเสร็จสิ้น
    if (store.getters.menuPermissions.length === 0 || store.getters.getMenuCategory.length === 0) {
      console.log('Fetching menu names and permissions');
      await store.dispatch('getMenuName');
      await store.dispatch('getMenuPermission');
    }

    const permissions = store.getters.menuPermissions.map(item => item.menu_name_id);
    const menuCategory = store.getters.getMenuCategory.find(item => item.menu_name === to.meta.menuName);

    console.log('Permissions:', permissions);
    console.log('Menu Category:', menuCategory);

    if (menuCategory && permissions.includes(menuCategory.menu_name_id)) {
      console.log('User has permission, proceeding.');
      next();
    } else {
      console.log('User does not have permission, redirecting to home.');
      next({ path: '/' });
    }
  } else {
    console.log('No admin route, proceeding.');
    next();
  }
});

router.beforeEach((to, from, next) => {
  const isMobile = window.innerWidth <= 700; // เช็คว่าเป็นอุปกรณ์มือถือหรือไม่
  const isAdminRoute = to.path.startsWith('/admin'); // เช็คว่าเป็นเส้นทางของแอดมินหรือไม่

  if (isMobile && isAdminRoute) {
    // ถ้าเป็นมือถือและพยายามเข้าถึงเส้นทางของแอดมิน
    alert('เมนูผู้ดูแลระบบไม่สามารถเข้าใช้งานผ่าน mobile ได้');
    next('/home'); // เปลี่ยนเส้นทางกลับไปหน้า home หรือหน้าอื่น ๆ ตามที่คุณต้องการ
  } else {
    next(); // ดำเนินการต่อถ้าเงื่อนไขไม่ตรง
  }
});


router.afterEach(() => {
  Vue.prototype.$isLoading = false;
});

export default router;
