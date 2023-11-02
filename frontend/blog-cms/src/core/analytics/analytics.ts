import { Catalyst } from '@theferant/catalyst';
import { GoogleAnalytics } from './google';

import Config from '../../config';

import { getDomain } from '../../utils';
import { Scope } from '../user/types';

class _Analytics {
  /**
   * F-OZNO8OAKS : Production, my.ferant.io
   * F-VFSLOKC1S : Development, dev-my.ferant.io
   */
  protected trackingId = {
    catalyst: Config.app.IS_LOCAL ? 'F-OZNO8OAKS' : 'F-VFSLOKC1S',
    google: Config.app.IS_LOCAL ? 'G-BFCTTV76Q0' : 'G-7RMXTPWJVV',
  };

  public init(scope: Scope): void {
    const { account_type, email, fid, username } = scope.getUser() || {};

    Catalyst.init({ trackingId: this.trackingId.catalyst });

    GoogleAnalytics.setup(this.trackingId.google, fid || '');
    GoogleAnalytics.setUserDomain(getDomain(email || ''));
    GoogleAnalytics.setUserAccountType(account_type || 'User');

    // Get user type and domain for who logged in onto my.Ferant.io
    Catalyst.setUser({
      id: fid,
      email: email,
      username: username,
      type: account_type,
      domain: getDomain(email || ''),
    });
    Catalyst.gaEmit('user', getDomain(email || ''), account_type || 'User');
  }
}

export const Analytics = new _Analytics();
