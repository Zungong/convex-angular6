import { RouteInfo } from './sidebar.metadata';

// menu items for left sidebar
export const ROUTES: RouteInfo[] = [

    {
        path: '/dashboard', title: 'Tablero', icon: 'icon-grid', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '', title: 'Servidores', icon: 'icon-screen-desktop', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/secondary/fisico', title: 'Físicos', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/secondary/virtual', title: 'Virtuales', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/secondary/virtualplus', title: 'Virtual Plus', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    {
        path: '', title: 'Storage & Backup', icon: 'icon-layers', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: 'javascript:;', title: 'Synology', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: 'javascript:;', title: 'Cloud Storage', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
        ]
    },
    {
        path: '', title: 'Microsoft', icon: 'icon-briefcase', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: 'javascript:;', title: 'Exchange', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: 'javascript:;', title: 'Office', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
        ]
    },
    {
        path: '', title: 'Tickets de Soporte', icon: 'icon-support', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '', title: 'Facturación', icon: 'icon-docs', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }
];
