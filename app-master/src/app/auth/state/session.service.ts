import {Injectable} from '@angular/core';
import {createInitialState, SessionStore} from './session.store';
import {MeGQL, SigninGQL, SignupGQL, User} from '../../../graphql/generated/graphql';
import {MutationOptions} from 'apollo-client';
import {Storage} from '@ionic/storage';
import {Apollo} from 'apollo-angular';
import {NavController} from '@ionic/angular';
import {filter, finalize, pluck, tap} from 'rxjs/operators';
import {OnesignalService} from '../../shared/services/onesignal.service';

@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private apollo: Apollo,
    private sessionStore: SessionStore,
    private signinGQL: SigninGQL,
    private meGQL: MeGQL,
    private signupGQL: SignupGQL,
    private onesignalService: OnesignalService,
  ) { }

  async signin(variables: any, options?: MutationOptions) {
    this.sessionStore.setLoading(true);

    this.signinGQL
      .mutate(variables, options)
      .subscribe(async ({data}) => {
        if (data.signin) {
          await this.storage.clear();

          await this.storage.set('token', data.signin);

          await this.apollo.getClient().clearStore();

          this.check().subscribe((me: User) => {
            setTimeout(() => {
              this.onesignalService.register();
              this.navCtrl.navigateRoot(['/home']);
            }, 50);
          });
        }

        this.sessionStore.setLoading(false);
      }, () => this.sessionStore.setLoading(false));
  }

  signup(variables: any) {
    this.sessionStore.setLoading(true);

    return this.signupGQL
      .mutate(variables)
      .pipe(
        pluck('data', 'signup'),
        tap(async (jwt) => {
          if (jwt) {
            await this.storage.set('token', jwt);

            await this.apollo.getClient().clearStore();

            return this.check()
              .pipe(
                tap((me: User) => {
                  this.onesignalService.register();
                  this.navCtrl.navigateRoot(['/walkthrough']);
                })
              )
              .subscribe();
          }
        }),
        finalize(() => this.sessionStore.setLoading(false)),
      );
  }

  check() {
    // this.sessionStore.setLoading(true);

    return this.meGQL
      .fetch({}, {fetchPolicy: 'network-only'})
      .pipe(
        filter(result => result && result.data !== null && typeof result.data !== 'undefined'),
        pluck('data', 'me'),
        tap((me: User) => {
          if (me) {
            this.sessionStore.update(state => ({
              me: me,
              roles: me.roles ? me.roles.data : [],
            }));
          }
        }),
        finalize(() => this.sessionStore.setLoading(false)),
      );
  }

  async logout() {
    this.sessionStore.setLoading(true);

    await this.storage.remove('token');

    await this.apollo.getClient().clearStore();

    this.sessionStore.update(createInitialState());

    await this.navCtrl.navigateRoot(['/main']);

    this.sessionStore.setLoading(false);

    // location.reload();
  }

}
