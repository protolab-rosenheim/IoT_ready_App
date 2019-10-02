export interface VirtualCarriage {
    id: number;
    name: string;
    type: string;
    parts: Part[];
    slotsAvailable: number;
    order_id: number;
}
