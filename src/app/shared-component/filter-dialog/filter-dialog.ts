export interface FilterOption {
    hour?: number;
    startTime?: string;
    endTime?: string;
    peakHour?: string[];
    dayType?: string[];
    dataType?: any;
    roadName?: string;
    roads?: checkboxes;
    district?: string;
    parkName?: string;
    type?: string;
    option?: string;
}

interface checkboxes {
    allChecked: boolean;
    checked: string[];
}