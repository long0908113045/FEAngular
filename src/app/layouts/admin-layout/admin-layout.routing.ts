import { Routes } from '@angular/router';

import { DashboardComponent } from '../../views/admin/dashboard/dashboard.component';
import { AdminProfileComponent } from 'src/app/views/admin/admin-profile/admin-profile.component';
import { AdminProfileEditComponent } from 'src/app/views/admin/admin-profile-edit/admin-profile-edit.component';
import { AdminChangePasswordComponent } from 'src/app/views/admin/admin-change-password/admin-change-password.component';

import { MapsComponent } from 'src/app/views/admin/maps/maps.component';
import { AdminManageUserComponent } from 'src/app/views/admin/admin-manage-user/admin-manage-user.component';
import { UserDetailsComponent } from 'src/app/views/admin/user-details/user-details.component';
import { UserDetailsEditComponent } from 'src/app/views/admin/user-details-edit/user-details-edit.component';
import { InsertUserComponent } from 'src/app/views/admin/insert-user/insert-user.component';
import { ManageOrderComponent } from 'src/app/views/admin/manage-order/manage-order.component';
//manageBook
import { AdminManageBookComponent } from 'src/app/views/admin/manage-book/admin-manage-book/admin-manage-book.component';
import { InsertBookComponent } from 'src/app/views/admin/manage-book/insert-book/insert-book.component';
import { AdminBookDetailsComponent } from 'src/app/views/admin/manage-book/admin-book-details/admin-book-details.component';
import { UpdateBookComponent } from 'src/app/views/admin/manage-book/update-book/update-book.component';
//manageAuthor
import { AdminManageAuthorComponent } from 'src/app/views/admin/manage-author/admin-manage-author/admin-manage-author.component';
import { AdminAuthorDetailComponent } from 'src/app//views/admin/manage-author/admin-author-detail/admin-author-detail.component';
import { InsertAuthorComponent } from 'src/app//views/admin/manage-author/insert-author/insert-author.component';
import { UpdateAuthorComponent } from 'src/app//views/admin/manage-author/update-author/update-author.component';
//category
import { AdminManageCategoryComponent } from 'src/app/views/admin/manage-category/admin-manage-category/admin-manage-category.component';
import { AdminCategoryDetailComponent } from 'src/app/views/admin/manage-category/admin-category-detail/admin-category-detail.component';
import { InsertCategoryComponent } from 'src/app/views/admin/manage-category/insert-category/insert-category.component';
import { UpdateCategoryComponent } from 'src/app/views/admin/manage-category/update-category/update-category.component';
//seri
import { AdminManageSeriComponent } from 'src/app/views/admin/manage-seri/admin-manage-seri/admin-manage-seri.component';
import { AdminSeriDetailComponent } from 'src/app/views/admin/manage-seri/admin-seri-detail/admin-seri-detail.component';
import { InsertSeriComponent } from 'src/app/views/admin/manage-seri/insert-seri/insert-seri.component';
import { UpdateSeriComponent } from 'src/app/views/admin/manage-seri/update-seri/update-seri.component';
//event
import { AdminEventDetailComponent } from 'src/app/views/admin/manage-event/admin-event-detail/admin-event-detail.component';
import { AdminManageEventComponent } from 'src/app/views/admin/manage-event/admin-manage-event/admin-manage-event.component';
import { InsertEventComponent } from 'src/app/views/admin/manage-event/insert-event/insert-event.component';
import { UpdateEventComponent } from 'src/app/views/admin/manage-event/update-event/update-event.component';
import { ManagePageComponent } from 'src/app/views/admin/manage-page/manage-page.component';
import { WheelDetailsComponent } from 'src/app/views/admin/admin-wheel/wheel-details/wheel-details.component';
import { InsertWheelComponent } from 'src/app/views/admin/admin-wheel/insert-wheel/insert-wheel.component';
import { ManageWheelComponent } from 'src/app/views/admin/admin-wheel/manage-wheel/manage-wheel.component';
import { UpdateWheelComponent } from 'src/app/views/admin/admin-wheel/update-wheel/update-wheel.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },

    { path: 'adminProfile', component: AdminProfileComponent },
    { path: 'managePage', component: ManagePageComponent },
    { path: 'adminProfileEdit/:id', component: AdminProfileEditComponent },
    { path: 'adminChangePassword/:id', component: AdminChangePasswordComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'manageWheel',component: ManageWheelComponent},
    { path: 'insertWheel', component: InsertWheelComponent },
    { path: 'wheelDetails/:id',component: WheelDetailsComponent},
    { path: 'updateWheel/:id',component: UpdateWheelComponent},
    { path: 'manageUser', component: AdminManageUserComponent },
    { path: 'userDetail/:id', component: UserDetailsComponent },
    { path: 'userDetailEdit/:id', component: UserDetailsEditComponent },
    { path: 'insertUser', component: InsertUserComponent },

    { path: 'manageOrder', component: ManageOrderComponent },
   //manageBook
    { path: 'manageBook', component: AdminManageBookComponent },
    { path: 'bookDetails/:id', component: AdminBookDetailsComponent },
    { path: 'insertBook', component: InsertBookComponent },
    { path: 'updateBook/:id', component: UpdateBookComponent },
    //manageAuthor
    { path: 'manageAuthor',component: AdminManageAuthorComponent},
    { path: 'authorDetails/:id',component: AdminAuthorDetailComponent},
    { path: 'insertAuthor',component: InsertAuthorComponent},
    { path: 'updateAuthor/:id',component: UpdateAuthorComponent},
    //manageCategory
    { path: 'manageCategory',component: AdminManageCategoryComponent},
    { path: 'categoryDetails/:id',component: AdminCategoryDetailComponent},
    { path: 'insertCategory',component: InsertCategoryComponent},
    { path: 'updateCategory/:id',component: UpdateCategoryComponent},
    //manageSeri
    { path: 'manageSeri',component: AdminManageSeriComponent},
    { path: 'seriDetails/:id',component: AdminSeriDetailComponent},
    { path: 'insertSeri',component: InsertSeriComponent},
    { path: 'updateSeri/:id',component: UpdateSeriComponent},
      //manageSeri
      { path: 'manageEvent',component: AdminManageEventComponent},
      { path: 'eventDetails/:id',component: AdminEventDetailComponent},
      { path: 'insertEvent',component: InsertEventComponent},
      { path: 'updateEvent/:id',component: UpdateEventComponent}
];
