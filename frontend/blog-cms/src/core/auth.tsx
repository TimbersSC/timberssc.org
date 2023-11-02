import React from 'react';

import { Auth, Hub } from 'aws-amplify';

import { useHotkeys } from '@components/shortcuts';

import { SHORTCUTS } from './data';
import Config from '../config';

export const signIn = async (username: string, password: string) => {
  try {
    const user = await Auth.signIn(username, password);
  } catch (error) {
    console.log('error signing in', error);
  }
};
const redirectExternal = () => {
  const params = new URL(document.location.href).searchParams;
  let url = params.get('continue') || undefined;
  if (url) {
    if (url.indexOf('http://') == 0 || url.indexOf('https://') == 0) {
      url = `https://${url}`;
    }
    window.location.href = new URL(url).toString();
  } else {
    window.location.href = new URL(
      'https://' + Config.app.MAIN_APP_URL,
    ).toString();
  }
};

export const AuthApp = (props: any) => {
  const { children } = props;

  const [user, setUser] = React.useState(null);

  useHotkeys(
    SHORTCUTS.general.signout.sequence,
    () => {
      Auth.signOut();
    },
    {
      preventDefault: true,
    },
  );

  React.useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then((userData) => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser().then((userData) => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.error('Not signed in'));
  }

  return <>{children}</>;
};
