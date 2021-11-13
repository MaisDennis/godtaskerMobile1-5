import React from 'react';

export function signInSuccess(worker) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { workerPhoneNumber, workerData },
  };
};

// export function signFailure() {
//   return {
//     type: '@worker/SIGN_IN_FAILURE',
//   }
// }

// export function signOut() {
//   return {
//     type: '@worker/SIGN_OUT',
//   }
// }

// export function workerCheckIn(workerData) {
//   return {
//     type: '@worker/WORKER_DATA',
//     payload: { workerData },
//   };
// }
