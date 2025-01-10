// import { Injectable } from '@angular/core';
// import { ContractCreateComponent } from '../../modules/users/contracts/contract-create/contract-create.component';
// import { CanDeactivateFn } from '@angular/router';

// export const canDeactivateGuard: CanDeactivateFn<ContractCreateComponent> = (component, currentRoute, currentState, nextState) => {
//   if (component.hasUnsavedChanges()) {
//     // Navigasyonu durdur ve dialog'u tetikle
//     component.unsavedDataDialogVisible = true;
//     component.pendingNavigation = { nextUrl: nextState?.url ?? '/' };
//     return false; // Navigasyonu durdur
//   }
//   return true; // Navigasyona izin ver
// };