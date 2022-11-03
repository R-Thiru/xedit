
/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'Dashboards',
        subtitle: 'Dashboards & Analysis',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [           
            {
                id   : 'dashboards.common',
                title: 'Common Dashboard',
                type : 'basic',
                icon : 'heroicons_outline:chart-pie',
                link : '/dashboard/common',
            
            },
            {
                id   : 'dashboards.usage',
                title: 'Usage Analytics',
                type : 'basic',
                icon : 'heroicons_outline:chart-bar',
                link : '/dashboard/analytics'
            }
        
        ]
    },
    {
        id      : 'masters',
        title   : 'Masters',
        subtitle: 'XEditPro Master Data',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'masters.publishers',
                title: 'Publisher',
                type : 'basic',
                icon : 'heroicons_outline:academic-cap',
                link : '/master/publisher/list'
            },
           
            {
                id   : 'masters.teams',
                title: 'Team',
                type : 'basic',
                icon : 'heroicons_outline:credit-card',
                link : '/master/teams'
            },
            {
                id   : 'masters.role',
                title: 'Role',
                type : 'basic',
                icon : 'heroicons_outline:user-group',
                link : '/master/roles'
            },
            {
                id   : 'masters.book',
                title: 'BookMaking',
                type : 'basic',
                icon : 'heroicons_outline:book-open',
                link : '/master/book'
            },
            {
                id   : 'masters.users',
                title: 'Users',
                type : 'basic',
                icon : 'heroicons_outline:users',
                link : '/master/users'
            },
            {
                id   : 'masters.chapterReoder',
                title: 'ChapterReoder',
                type : 'basic',
                icon : 'heroicons_outline:users',
                link : '/master/chapterReoder'
            },
            {
                id   : 'masters.menumapping',
                title: 'Menu Mapping',
                type : 'basic',
                icon : 'heroicons_outline:users',
                link : '/master/menu-map'
            },
            {
                id   : 'masters.patUpload',
                title: 'PatUpload',
                type : 'basic',
                icon : 'heroicons_outline:users',
                link : '/master/pat-upload'
            },
            {
                id   : 'masters.stage',
                title: 'Stages & Process',
                type : 'collapsable',
                icon : 'heroicons_outline:newspaper',
                children : [
                    {
                        id : 'stage.stageList',
                        title : 'Stages',
                        type : 'basic',
                        link : '/master/stages',
                        exactMatch: true
                    },
                    {
                        id : 'stage.teamMapping',
                        title : 'Team Mapping',
                        type : 'basic',
                        link : '/master/stages/team'
                    }
                ]
                
            },
        ]
    },
    {
        id      : 'projects',
        title   : 'Projects',
        subtitle: 'Books & Journals',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'projects.projects',
                title: 'Projects',
                type : 'basic',
                icon : 'heroicons_outline:folder',
                link : '/projects'
            },
            {
                id   : 'StageMap',
                title: 'StageMap',
                type : 'basic',
                icon : 'heroicons_outline:folder',
                link : '/stagemapping'
            }
        ]
    },
    
    // {
    //     id : 'config',
    //     title: 'Configuration',
    //     type : 'group',
    //     icon :'',
    //     children: [
    //         {
    //             id   : 'config.settings',
    //             title: 'Settings',
    //             type : 'basic',
    //             icon : 'heroicons_outline:cog',
    //             link : '/config/settings'
    //         },
    //         {
    //             id   : 'config.urlendpoint',
    //             title: 'URL End Point',
    //             type : 'basic',
    //             icon : 'heroicons_outline:link',
    //             link : '/config/url-endpoint'
    //         },
    //         {
    //             id   : 'config.externalstorage',
    //             title: 'External Storage',
    //             type : 'basic',
    //             icon : 'heroicons_outline:cloud',
    //             link : '/config/external-storage'
    //         }
    //     ]

    // },
    // {
    //     id      : 'users',
    //     title   : 'Users',
    //     subtitle: 'Users and User Group Management',
    //     type    : 'group',
    //     icon    : 'heroicons_outline:users',
    //     children: [
    //         {
    //             id   : 'users.user',
    //             title: 'User',
    //             type : 'basic',
    //             icon : 'heroicons_outline:user',
    //             link : '/users/management'
    //         },
    //         {
    //             id   : 'users.gruop',
    //             title: 'User Group',
    //             type : 'basic',
    //             icon : 'heroicons_outline:user-group',
    //             link : '/users/group'
    //         }

    //     ]
    // },
    // {
    //     id  : 'divider-2',
    //     type: 'divider'
    // },
    // {
    //     id : 'developer',
    //     title: 'Developer',
    //     type : 'group',
    //     icon :'',
    //     children: [
    //         {
    //             id   : 'config.developer',
    //             title: 'Developer Options',
    //             type : 'basic',
    //             icon : 'heroicons_outline:code',
    //             link : '/developer/options'
    //         }
    //     ]

    // },
    
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'Dashboards',
        subtitle: 'Dashboards & Analysis',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [           
            {
                id   : 'dashboards.common',
                title: 'Common Dashboard',
                type : 'basic',
                icon : 'heroicons_outline:chart-pie',
                link : '/dashboard/common',
            
            },
            {
                id   : 'dashboards.usage',
                title: 'Usage Analytics',
                type : 'basic',
                icon : 'heroicons_outline:chart-bar',
                link : '/dashboard/analytics'
            }
        
        ]
    },
    {
        id      : 'masters',
        title   : 'Masters',
        subtitle: 'XEditPro Master Data',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'masters.publishers',
                title: 'Publisher',
                type : 'basic',
                icon : 'heroicons_outline:academic-cap',
                link : '/master/publisher/list'
            },
           
            {
                id   : 'masters.teams',
                title: 'Team',
                type : 'basic',
                icon : 'heroicons_outline:credit-card',
                link : '/master/teams'
            },
            {
                id   : 'masters.role',
                title: 'Role',
                type : 'basic',
                icon : 'heroicons_outline:user-group',
                link : '/master/roles'
            },
            {
                id   : 'masters.book',
                title: 'BookMaking',
                type : 'basic',
                icon : 'heroicons_outline:book-open',
                link : '/master/book'
            },
            {
                id   : 'masters.users',
                title: 'Users',
                type : 'basic',
                icon : 'heroicons_outline:users',
                link : '/master/users'
            },
            {
                id   : 'masters.chapterReoder',
                title: 'ChapterReoder',
                type : 'basic',
                icon : 'heroicons_outline:users',
                link : '/master/chapterReoder'
            },
            {
                id   : 'masters.menumapping',
                title: 'Menu Mapping',
                type : 'basic',
                icon : 'heroicons_outline:users',
                link : '/master/menu-map'
            },
            {
                id   : 'masters.stage',
                title: 'Stages & Process',
                type : 'collapsable',
                icon : 'heroicons_outline:newspaper',
                children : [
                    {
                        id : 'stage.stageList',
                        title : 'Stages',
                        type : 'basic',
                        link : '/master/stages',
                        exactMatch: true
                    },
                    {
                        id : 'stage.teamMapping',
                        title : 'Team Mapping',
                        type : 'basic',
                        link : '/master/stages/team'
                    }
                ]
                
            },
        ]
    },
    {
        id      : 'projects',
        title   : 'Projects',
        subtitle: 'Books & Journals',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'projects.projects',
                title: 'Projects',
                type : 'basic',
                icon : 'heroicons_outline:folder',
                link : '/projects'
            },
            {
                id   : 'StageMap',
                title: 'StageMap',
                type : 'basic',
                icon : 'heroicons_outline:folder',
                link : '/stagemapping'
            }
        ]
    }
];