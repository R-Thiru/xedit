import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';


// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    // {path: '', pathMatch : 'full', redirectTo: 'example'},
    { path: '', pathMatch: 'full', redirectTo: 'dashboard/common' },



    { path: 'error', loadChildren: () => import('app/modules/error/error.module').then(m => m.ErrorModule) },
    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard/common' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule) },
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule) },
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule) },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            // {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
            { path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule) }
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule) },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule) },
        ]
    },

    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            // Projects
            {
                path: '', children: [
                    // Settings
                    { path: 'projects', loadChildren: () => import('app/modules/projects/projects.module').then(m => m.ProjectsModule) },
                    { path: 'stagemapping', loadChildren: () => import('app/modules/stagemapping/stagemapping.module').then(m => m.StagemappingModule) }
                ]
            },
            //master routes
            {
                path: 'master', children: [
                    // Publisher
                    { path: 'publisher', loadChildren: () => import('app/modules/publishers/publishers.module').then(m => m.PublishersModule) },
                    { path: 'roles', loadChildren: () => import('app/modules/roles/roles.module').then(m => m.RolesModule) },
                    { path: 'teams', loadChildren: () => import('app/modules/teams/teams.module').then(m => m.TeamsModule) },
                    { path: 'stages', loadChildren: () => import('app/modules/stages/stages.module').then(m => m.StagesModule) },
                    { path: 'book', loadChildren: () => import('app/modules/bookmaking/bookmaking.module').then(m => m.BookmakingModule) },
                    { path: 'users', loadChildren: () => import('app/modules/user/user.module').then(m => m.UserModule) },
                    { path: 'chapterReoder', loadChildren: () => import('app/modules/chapter-reorder/chapter-reorder.module').then(m => m.ChapterReorderModule) },
                    { path: 'userprofile', loadChildren: () => import('app/modules/profile/profile.module').then(m => m.ProfileModule) },
                    { path: 'menu-map', loadChildren: () => import('app/modules/menu-map/menu-map.module').then(m => m.MenuMapModule) },
                    { path: 'pat-upload',loadChildren:() => import('app/modules/patupload/patupload.module').then(m => m.PatuploadModule)}

                ]
            },
            //Dashboard Routes
            {
                path: '', children: [
                    // Dashboard
                    { path: 'dashboard', loadChildren: () => import('app/modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
                ]
            },


        ]
    },

    // Editor Routes
    {
        path: 'edit',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'editor'
        },
        children: [

            {
               // Editor
                path: '', loadChildren: () => import('app/modules/editor/editor.module').then(m => m.EditorModule),
            },
        ]
    },




];
