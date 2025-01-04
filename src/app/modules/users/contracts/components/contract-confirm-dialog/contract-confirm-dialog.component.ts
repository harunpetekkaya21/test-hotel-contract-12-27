import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'contract-confirm-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, DropdownModule, ButtonModule, CommonModule,FormsModule,MultiSelectModule],
  templateUrl: './contract-confirm-dialog.component.html',
  styleUrl: './contract-confirm-dialog.component.scss'
})
export class ContractConfirmDialogComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() saveContract = new EventEmitter<any>();



  COUNTRIES = [
    { name: 'Türkiye', code: 'TR', flag: 'https://flagcdn.com/tr.svg' },
    { name: 'Afghanistan', code: 'AF', flag: 'https://flagcdn.com/w320/af.png' },
    { name: 'Albania', code: 'AL', flag: 'https://flagcdn.com/w320/al.png' },
    { name: 'Algeria', code: 'DZ', flag: 'https://flagcdn.com/w320/dz.png' },
    { name: 'Andorra', code: 'AD', flag: 'https://flagcdn.com/w320/ad.png' },
    { name: 'Angola', code: 'AO', flag: 'https://flagcdn.com/w320/ao.png' },
    { name: 'Argentina', code: 'AR', flag: 'https://flagcdn.com/w320/ar.png' },
    { name: 'Armenia', code: 'AM', flag: 'https://flagcdn.com/w320/am.png' },
    { name: 'Australia', code: 'AU', flag: 'https://flagcdn.com/w320/au.png' },
    { name: 'Austria', code: 'AT', flag: 'https://flagcdn.com/w320/at.png' },
    { name: 'Azerbaijan', code: 'AZ', flag: 'https://flagcdn.com/w320/az.png' },
    { name: 'Bahamas', code: 'BS', flag: 'https://flagcdn.com/w320/bs.png' },
    { name: 'Bahrain', code: 'BH', flag: 'https://flagcdn.com/w320/bh.png' },
    { name: 'Bangladesh', code: 'BD', flag: 'https://flagcdn.com/w320/bd.png' },
    { name: 'Barbados', code: 'BB', flag: 'https://flagcdn.com/w320/bb.png' },
    { name: 'Belarus', code: 'BY', flag: 'https://flagcdn.com/w320/by.png' },
    { name: 'Belgium', code: 'BE', flag: 'https://flagcdn.com/w320/be.png' },
    { name: 'Belize', code: 'BZ', flag: 'https://flagcdn.com/w320/bz.png' },
    { name: 'Benin', code: 'BJ', flag: 'https://flagcdn.com/w320/bj.png' },
    { name: 'Bhutan', code: 'BT', flag: 'https://flagcdn.com/w320/bt.png' },
    { name: 'Bolivia', code: 'BO', flag: 'https://flagcdn.com/w320/bo.png' },
    { name: 'Bosnia and Herzegovina', code: 'BA', flag: 'https://flagcdn.com/w320/ba.png' },
    { name: 'Botswana', code: 'BW', flag: 'https://flagcdn.com/w320/bw.png' },
    { name: 'Brazil', code: 'BR', flag: 'https://flagcdn.com/w320/br.png' },
    { name: 'Brunei', code: 'BN', flag: 'https://flagcdn.com/w320/bn.png' },
    { name: 'Bulgaria', code: 'BG', flag: 'https://flagcdn.com/w320/bg.png' },
    { name: 'Burkina Faso', code: 'BF', flag: 'https://flagcdn.com/w320/bf.png' },
    { name: 'Burundi', code: 'BI', flag: 'https://flagcdn.com/w320/bi.png' },
    { name: 'Cambodia', code: 'KH', flag: 'https://flagcdn.com/w320/kh.png' },
    { name: 'Cameroon', code: 'CM', flag: 'https://flagcdn.com/w320/cm.png' },
    { name: 'Canada', code: 'CA', flag: 'https://flagcdn.com/w320/ca.png' },
    { name: 'Cape Verde', code: 'CV', flag: 'https://flagcdn.com/w320/cv.png' },
    { name: 'Central African Republic', code: 'CF', flag: 'https://flagcdn.com/w320/cf.png' },
    { name: 'Chad', code: 'TD', flag: 'https://flagcdn.com/w320/td.png' },
    { name: 'Chile', code: 'CL', flag: 'https://flagcdn.com/w320/cl.png' },
    { name: 'China', code: 'CN', flag: 'https://flagcdn.com/w320/cn.png' },
    { name: 'Colombia', code: 'CO', flag: 'https://flagcdn.com/w320/co.png' },
    { name: 'Comoros', code: 'KM', flag: 'https://flagcdn.com/w320/km.png' },
    { name: 'Congo (Congo-Brazzaville)', code: 'CG', flag: 'https://flagcdn.com/w320/cg.png' },
    { name: 'Congo (DRC)', code: 'CD', flag: 'https://flagcdn.com/w320/cd.png' },
    { name: 'Costa Rica', code: 'CR', flag: 'https://flagcdn.com/w320/cr.png' },
    { name: 'Croatia', code: 'HR', flag: 'https://flagcdn.com/w320/hr.png' },
    { name: 'Cuba', code: 'CU', flag: 'https://flagcdn.com/w320/cu.png' },
    { name: 'Cyprus', code: 'CY', flag: 'https://flagcdn.com/w320/cy.png' },
    { name: 'Czechia (Czech Republic)', code: 'CZ', flag: 'https://flagcdn.com/w320/cz.png' },
    { name: 'Denmark', code: 'DK', flag: 'https://flagcdn.com/w320/dk.png' },
    { name: 'Djibouti', code: 'DJ', flag: 'https://flagcdn.com/w320/dj.png' },
    { name: 'Dominica', code: 'DM', flag: 'https://flagcdn.com/w320/dm.png' },
    { name: 'Dominican Republic', code: 'DO', flag: 'https://flagcdn.com/w320/do.png' },
    { name: 'Ecuador', code: 'EC', flag: 'https://flagcdn.com/w320/ec.png' },
    { name: 'Egypt', code: 'EG', flag: 'https://flagcdn.com/w320/eg.png' },
    { name: 'El Salvador', code: 'SV', flag: 'https://flagcdn.com/w320/sv.png' },
    { name: 'Equatorial Guinea', code: 'GQ', flag: 'https://flagcdn.com/w320/gq.png' },
    { name: 'Eritrea', code: 'ER', flag: 'https://flagcdn.com/w320/er.png' },
    { name: 'Estonia', code: 'EE', flag: 'https://flagcdn.com/w320/ee.png' },
    { name: 'Eswatini', code: 'SZ', flag: 'https://flagcdn.com/w320/sz.png' },
    { name: 'Ethiopia', code: 'ET', flag: 'https://flagcdn.com/w320/et.png' },
    { name: 'Fiji', code: 'FJ', flag: 'https://flagcdn.com/w320/fj.png' },
    { name: 'Finland', code: 'FI', flag: 'https://flagcdn.com/w320/fi.png' },
    { name: 'France', code: 'FR', flag: 'https://flagcdn.com/w320/fr.png' },
    { name: 'Gabon', code: 'GA', flag: 'https://flagcdn.com/w320/ga.png' },
    { name: 'Gambia', code: 'GM', flag: 'https://flagcdn.com/w320/gm.png' },
    { name: 'Georgia', code: 'GE', flag: 'https://flagcdn.com/w320/ge.png' },
    { name: 'Germany', code: 'DE', flag: 'https://flagcdn.com/w320/de.png' },
    { name: 'Ghana', code: 'GH', flag: 'https://flagcdn.com/w320/gh.png' },
    { name: 'Greece', code: 'GR', flag: 'https://flagcdn.com/w320/gr.png' },
    { name: 'Grenada', code: 'GD', flag: 'https://flagcdn.com/w320/gd.png' },
    { name: 'Guatemala', code: 'GT', flag: 'https://flagcdn.com/w320/gt.png' },
    { name: 'Guinea', code: 'GN', flag: 'https://flagcdn.com/w320/gn.png' },
    { name: 'Guinea-Bissau', code: 'GW', flag: 'https://flagcdn.com/w320/gw.png' },
    { name: 'Guyana', code: 'GY', flag: 'https://flagcdn.com/w320/gy.png' },
    { name: 'Haiti', code: 'HT', flag: 'https://flagcdn.com/w320/ht.png' },
    { name: 'Honduras', code: 'HN', flag: 'https://flagcdn.com/w320/hn.png' },
    { name: 'Hungary', code: 'HU', flag: 'https://flagcdn.com/w320/hu.png' },
    { name: 'Iceland', code: 'IS', flag: 'https://flagcdn.com/w320/is.png' },
    { name: 'India', code: 'IN', flag: 'https://flagcdn.com/w320/in.png' },
    { name: 'Indonesia', code: 'ID', flag: 'https://flagcdn.com/w320/id.png' },
    { name: 'Iran', code: 'IR', flag: 'https://flagcdn.com/w320/ir.png' },
    { name: 'Iraq', code: 'IQ', flag: 'https://flagcdn.com/w320/iq.png' },
    { name: 'Ireland', code: 'IE', flag: 'https://flagcdn.com/w320/ie.png' },
    { name: 'Israel', code: 'IL', flag: 'https://flagcdn.com/w320/il.png' },
    { name: 'Italy', code: 'IT', flag: 'https://flagcdn.com/w320/it.png' },
    { name: 'Jamaica', code: 'JM', flag: 'https://flagcdn.com/w320/jm.png' },
    { name: 'Japan', code: 'JP', flag: 'https://flagcdn.com/w320/jp.png' },
  ];

  contractName: string = '';
  selectedClosedMarkets: any[] = [];
  selectedOpenMarkets: any[] = [];
  countries = this.COUNTRIES;

  save() {
    this.saveContract.emit({
      contractName: this.contractName,
      closedMarkets: this.selectedClosedMarkets,
      openMarkets: this.selectedOpenMarkets,
    });
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  cancel() {
    
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
