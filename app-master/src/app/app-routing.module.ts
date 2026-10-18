import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadChildren: './home/pages/home/home.module#HomePageModule'},
  { path: 'main', loadChildren: './main/pages/main/main.module#MainPageModule' },
  {
    path: 'signup',
    loadChildren: './auth/pages/signup/signup.module#SignupPageModule'
  },
  {
    path: 'signin',
    loadChildren: './auth/pages/signin/signin.module#SigninPageModule'
  },

  { path: 'walkthrough', loadChildren: './main/pages/walkthrough/walkthrough.module#WalkthroughPageModule' },

  { path: 'child-create', loadChildren: './child/pages/child-create/child-create.module#ChildCreatePageModule' },
  { path: 'children/:childId', loadChildren: './child/pages/child-see/child-see.module#ChildSeePageModule' },
  { path: 'children/:childId/purchase-license', loadChildren: './child/pages/purchase-license/purchase-license.module#PurchaseLicensePageModule' },
  { path: 'children/:childId/history', loadChildren: './child/pages/child-history/child-history.module#ChildHistoryPageModule' },
  { path: 'children/:childId/premium-code', loadChildren: './child/pages/child-premium-code/child-premium-code.module#ChildPremiumCodePageModule' },
  { path: 'children/:childId/plans/:planId', loadChildren: './child/pages/child-plan/child-plan.module#ChildPlanPageModule' },
  { path: 'children/:childId/plans/:planId/stages/:stageId', loadChildren: './child/pages/child-stage/child-stage.module#ChildStagePageModule' },
  { path: 'children/:childId/plans/:planId/stages/:stageId/results/areas/:areaId', loadChildren: './result/pages/area-results/area-results.module#AreaResultsPageModule' },
  { path: 'children/:childId/plans/:planId/stages/:stageId/results/:resultId', loadChildren: './result/pages/result/result.module#ResultPageModule' },

  { path: 'about', loadChildren: './main/pages/about/about.module#AboutPageModule' },
  { path: 'rapitips', loadChildren: './rapitip/pages/rapitips/rapitips.module#RapitipsPageModule' },
  { path: 'rapitips/:rapiTipId', loadChildren: './rapitip/pages/rapitip/rapitip.module#RapitipPageModule' },
  { path: 'tos', loadChildren: './main/pages/tos/tos.module#TosPageModule' },
  { path: 'privacy', loadChildren: './shared/pages/privacy/privacy.module#PrivacyPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
