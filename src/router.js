import Vue from 'vue';
import Router from 'vue-router';

// 引入组件
import home from "@/pages/home/home";
import about from "@/pages/about/about";
import submit from "@/pages/submit/submit";
import change from "@/pages/change/change";

Vue.use(Router);

const router = new Router({
    mode:"history",
    // base:"/public",
    routes:[
        {
			path: '/',
			redirect:"/home",
			hidden:true
		},
		{
			path: '/home',
			name: 'home',
			meta:{
		      	title:"网站首页",
		      	auth:["admin","person","manager"]
		    },
			hidden:false,
			component: home
        },
        {
			path: '/about',
			name: 'about',
			meta:{
		      	title:"关于我们",
		      	auth:["admin","person","manager"]
		    },
			hidden:false,
			component: about
		},
		{
			path: '/submit',
			name: 'submit',
			meta:{
		      	title:"新增数据",
		      	auth:["admin","person","manager"]
		    },
			hidden:false,
			component: submit
		},
		{
			path: '/change',
			name: 'change',
			meta:{
		      	title:"新增数据",
		      	auth:["admin","person","manager"]
		    },
			hidden:false,
			component: change
		}
    ]

})

export default router