import { WorkStationType } from './WorkStationType';

export interface WorkStation {
    id: string;
    name: string;
    type: WorkStationType;
    side?: number;
    ip?: string;
}
