/* eslint-disable */
import * as moment from 'moment';

export const commondashboard = {
    bugStatus      : {
        overview: {
            'this-week': {
                'new-issues'   : 214,
                'closed-issues': 75,
                'fixed'        : 3,
                'wont-fix'     : 4,
                're-opened'    : 8,
                'needs-triage' : 6
            },
            'this-month': {
                'new-issues'   : 197,
                'closed-issues': 72,
                'fixed'        : 6,
                'wont-fix'     : 11,
                're-opened'    : 6,
                'needs-triage' : 5
            }
        },
        labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        series  : {
            'this-week': [
                {
                    name: 'New issues',
                    type: 'line',
                    data: [42, 28, 43, 34, 20, 25, 22]
                },
                {
                    name: 'Closed issues',
                    type: 'column',
                    data: [11, 10, 8, 11, 8, 10, 17]
                }
            ],
            'last-month': [
                {
                    name: 'New issues',
                    type: 'line',
                    data: [37, 32, 39, 27, 18, 24, 20]
                },
                {
                    name: 'Closed issues',
                    type: 'column',
                    data: [9, 8, 10, 12, 7, 11, 15]
                }
            ]
        }
    },
    schedule          : {
        today   : [
            {
                title   : 'Group Meeting',
                time    : 'in 32 minutes',
                location: 'Conference room 1B'
            },
            {
                title: 'Coffee Break',
                time : '10:30 AM'
            },
            {
                title: 'Public Beta Release',
                time : '11:00 AM'
            },
            {
                title: 'Lunch',
                time : '12:10 PM'
            },
            {
                title   : 'Dinner with David',
                time    : '05:30 PM',
                location: 'Magnolia'
            },
            {
                title   : 'Jane\'s Birthday Party',
                time    : '07:30 PM',
                location: 'Home'
            },
            {
                title   : 'Overseer\'s Retirement Party',
                time    : '09:30 PM',
                location: 'Overseer\'s room'
            }
        ],
        tomorrow: [
            {
                title   : 'Marketing Meeting',
                time    : '09:00 AM',
                location: 'Conference room 1A'
            },
            {
                title: 'Public Announcement',
                time : '11:00 AM'
            },
            {
                title: 'Lunch',
                time : '12:10 PM'
            },
            {
                title   : 'Meeting with Beta Testers',
                time    : '03:00 PM',
                location: 'Conference room 2C'
            },
            {
                title: 'Live Stream',
                time : '05:30 PM'
            },
            {
                title   : 'Release Party',
                time    : '07:30 PM',
                location: 'CEO\'s house'
            },
            {
                title   : 'CEO\'s Private Party',
                time    : '09:30 PM',
                location: 'CEO\'s Penthouse'
            }
        ]
    },
    teamMembers       : [
        {
            id    : 'b8258ccf-48b5-46a2-9c95-e0bd7580c645',
            avatar: 'assets/images/avatars/female-02.jpg',
            name  : 'Tina Harris',
            email : 'tinaharris@xeditpro.com',
            phone : '+1-933-464-2431',
            title : 'Project Editor'
        },
        {
            id    : '2bfa2be5-7688-48d5-b5ac-dc0d9ac97f14',
            avatar: 'assets/images/avatars/female-10.jpg',
            name  : 'Nadia Mcknight',
            email : 'nadiamcknight@xeditpro.com',
            phone : '+1-943-511-2203',
            title : 'Project Manager'
        },
        {
            id    : '77a4383b-b5a5-4943-bc46-04c3431d1566',
            avatar: 'assets/images/avatars/male-19.jpg',
            name  : 'Best Blackburn',
            email : 'blackburn.best@xeditpro.com',
            phone : '+1-814-498-3701',
            title : 'Author'
        },
        {
            id    : '8bb0f597-673a-47ca-8c77-2f83219cb9af',
            avatar: 'assets/images/avatars/male-14.jpg',
            name  : 'Duncan Carver',
            email : 'duncancarver@xeditpro.com',
            phone : '+1-968-547-2111',
            title : 'Co Author'
        },
        {
            id    : 'c318e31f-1d74-49c5-8dae-2bc5805e2fdb',
            avatar: 'assets/images/avatars/male-01.jpg',
            name  : 'Martin Richards',
            email : 'martinrichards@xeditpro.com',
            phone : '+1-902-500-2668',
            title : 'Copy Editor'
        },
        {
            id    : '0a8bc517-631a-4a93-aacc-000fa2e8294c',
            avatar: 'assets/images/avatars/female-20.jpg',
            name  : 'Candice Munoz',
            email : 'candicemunoz@xeditpro.com',
            phone : '+1-838-562-2769',
            title : 'Copy Editor'
        },
        {
            id    : 'a4c9945a-757b-40b0-8942-d20e0543cabd',
            avatar: 'assets/images/avatars/female-01.jpg',
            name  : 'Vickie Mosley',
            email : 'vickiemosley@xeditpro.com',
            phone : '+1-939-555-3054',
            title : 'Copy Editor'
        },
        {
            id    : 'f004ea79-98fc-436c-9ba5-6cfe32fe583d',
            avatar: 'assets/images/avatars/male-02.jpg',
            name  : 'Holt Manning',
            email : 'holtmanning@xeditpro.com',
            phone : '+1-822-531-2600',
            title : 'Typesetter'
        },
        {
            id    : '8b69fe2d-d7cc-4a3d-983d-559173e37d37',
            avatar: 'assets/images/avatars/female-03.jpg',
            name  : 'Misty Ramsey',
            email : 'mistyramsey@xeditpro.com',
            phone : '+1-990-457-2106',
            title : 'Typesetter'
        }
    ]
};
