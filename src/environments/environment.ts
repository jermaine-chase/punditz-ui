// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  region: 'us-east-2',
  auth_token_key: 'X-Auth-Token',
  auth_token_val: '10581ec8e3a54e2d876899ed5f33faf3',
  cycleUrl: '/cycle/file',
  eplteams: '/epl/teams',
  eplmatches: '/epl/matches',
  euroteams: '/euro/teams',
  euromatches: '/euro/matches',
  cognito: {
    userPoolId: 'us-east-1_mUGF86owd',
    userPoolWebClientId: '3agf7c7dt5gjl01uia8dqibtfm',
  },
  dbUrl: '/punditz'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
