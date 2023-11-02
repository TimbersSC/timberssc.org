const awsExports = {
  Auth: {
    region: 'us-east-2',
    userPoolId: 'us-east-2_mzyt1oAM0',
    userPoolWebClientId: '5doulu8gumhdts1ucj0ulm1ju1',
    IdentityPoolId: 'us-east-2:00da456d-0cb4-4c7d-bc1b-496ca885c229',
    mandatorySignIn: true,
    oauth: {
      domain: 'auth.ferant.io',
      scope: [
        'phone',
        'email',
        'openid',
        'profile',
        'aws.cognito.signin.user.admin',
      ],
      redirectSignIn: 'https://localhost:4500/',
      redirectSignOut: 'https://localhost:4500/',
      responseType: 'code',
    },
    federationTarget: 'COGNITO_USER_POOLS',
    cookieStorage: {
      domain: 'localhost',
      path: '/',
      expires: 30,
      // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
      sameSite: 'none',
      secure: true,
    },
  }
};

export default awsExports;
