import { Catalyst } from '@theferant/catalyst';

import Config from '../../config';

class _Analytics {
  /**
   * F-OZNO8OAKS : Production, my.ferant.io
   * F-VFSLOKC1S : Development, dev-my.ferant.io
   */
  protected trackingId = {
    catalyst: Config.app.IS_LOCAL ? 'F-OZNO8OAKS' : 'F-VFSLOKC1S',
    google: Config.app.IS_LOCAL ? 'G-BFCTTV76Q0' : 'G-7RMXTPWJVV',
  };

  public init(): void {
    Catalyst.init({ trackingId: this.trackingId.catalyst });
  }
}

export const Analytics = new _Analytics();
