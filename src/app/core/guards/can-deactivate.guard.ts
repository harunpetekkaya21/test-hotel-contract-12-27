import { Injectable } from '@angular/core';
import { ContractCreateComponent } from '../../modules/users/contracts/contract-create/contract-create.component';
import { CanDeactivateFn } from '@angular/router';


export const canDeactivateGuard: CanDeactivateFn<ContractCreateComponent> = (component) => {
  if (!component.isDataSaved) {
    component.showUnsavedModal = true; // Modal açılır
    return false; // Sayfa değişimini engeller
  }
  return true; // Sayfa değişimine izin verir
};