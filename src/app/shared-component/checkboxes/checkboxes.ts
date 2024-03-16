export interface Checkboxes {
  name: string;
  value: string;
  checked: boolean;
  group?: string;
}

export interface CheckedEvent {
  allChecked: boolean;
  checked: Checkboxes[];
}
