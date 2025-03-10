import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
})
export class TemplateFormComponent implements OnInit {
  addressFormGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addressFormGroup = this.fb.group({
      previousAddresses: this.fb.array([]),
    });

    this.addNewAddress();
  }

  addNewAddress() {
    this.previousAddress.push(this.getAddressGroup());
  }

  removeAddress(i: number) {
    this.previousAddress.removeAt(i);
  }

  get previousAddress(): FormArray {
    return <FormArray>this.addressFormGroup.get('previousAddresses');
  }

  getAddressGroup() {
    return this.fb.group({
      currentAddressAutoComplete: [''],
      isCurrentManualAddress: [false],
      currentAddress: this.createAddressFormGroup(),
    });
  }

  private createAddressFormGroup(): FormGroup {
    const formGroup = this.fb.group({
      streetName: [''],
      streetNumber: [''],
    });

    return formGroup;
  }

  onSubmit(data: any) {}

  getPreviousAddressedControls() {
    return (this.addressFormGroup.get('previousAddresses') as FormArray)
      .controls;
  }

  toggleIsCurrentManualAddress(i: number) {
    const isCurrentManualAddressControl = this.previousAddress
      ?.at(i)
      ?.get('isCurrentManualAddress');
    if (isCurrentManualAddressControl) {
      this.previousAddress
        ?.at(i)
        ?.get('currentAddressAutoComplete')
        ?.patchValue('Canada');
    } else {
      this.previousAddress
        ?.at(i)
        ?.get('currentAddressAutoComplete')
        ?.patchValue('');
    }
    isCurrentManualAddressControl?.setValue(
      !isCurrentManualAddressControl.value
    );
  }

  getControlValue(i: number, key: string) {
    return this.previousAddress?.at(i)?.get(key)?.value;
  }
}
