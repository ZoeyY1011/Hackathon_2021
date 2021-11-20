/**
 * @author Di Wang
 */
import Field from './containers/field';
import Extension from './containers/extension';
import Dashboard from './containers/dashboard';

export default [{
	icon: 'home',
	name: 'Dashboard',
	route: '/home',
	component: Dashboard,
},{
	icon: 'border-outer',
	name: 'Fields',
	route: '/field',
	component: Field,
}, {
	icon: 'pie-chart',
	name: 'Extension',
	route: '/extension',
	component: Extension,
}
// , {
// 	icon: 'pie-chart',
// 	name: 'Fertilizers',
// 	route: '/fertilizer',
// 	component: Fertilizer,
// },
];
