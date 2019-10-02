interface Slot {
    id: number;
    slot_name: string;
    part_number: number;
    module_number: number;
    max_length: number;
    max_width: number;
    max_thickness: number;
    coating?: TowerCoating;
}
