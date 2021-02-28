import {Apartment} from './apartment.model';

export interface AgentInfo {
    firstname: string;
    lastname: string;
    company: string;
    splashMessage: string;
    customHeader: string;
}

export interface Agent {
    agentInfo: AgentInfo;
    records: Apartment[];
    role: string;
    showContactInfo: boolean;
}
