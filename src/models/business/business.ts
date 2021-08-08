import { DbFields } from '../../data/data';
import { AppValidations } from '../../validations/validation';

export const companyRegistrationType = {
    PrivateLimited: "Private Limited", 
    LLP: "LLP"
}; 

export interface ITaxID {
    taxID: string; 
    taxIDType: string; 
}

export interface ICompany {
    name: string; 
    companyType?: string | null | undefined; 
    registrationNumber?: string | null | undefined; 
    dateOfIncorporation?: Date | null | undefined; 
    taxIDs?: ITaxID[] | null | undefined; 
}

export interface IJobTitle {
    companyId: string; 
    jobTitle: string;
}

export class TaxID extends DbFields implements ITaxID {
    public taxID: string = ""; 
    public taxIDType: string = ""; 

    constructor(taxId?: string, taxIdType?: string) {
        super(); 
        if(!AppValidations.isNullOrEmpty(taxId)) {
            this.taxID = taxId!; 
        }
        if(!AppValidations.isNullOrEmpty(taxIdType)) {
            this.taxIDType = taxIdType!; 
        }
    }
}

export class JobTitle extends DbFields implements IJobTitle {
    public companyId: string = ""; 
    public jobTitle: string = ""; 

    constructor(jobTitle?: string, companyId?: string) {
        super(); 
        if(!AppValidations.isNullOrEmpty(companyId)) {
            this.companyId = companyId!; 
        }
        if(!AppValidations.isNullOrEmpty(jobTitle))
        {
            this.jobTitle = jobTitle!; 
        }
    }
}

export class Company extends DbFields implements ICompany {
    public name: string = ""; 
    public companyType?: string | null | undefined; 
    public registrationNumber?: string | null | undefined; 
    dateOfIncorporation?: Date | null | undefined; 
    taxIDs?: TaxID[] | null | undefined = new Array(1); 

    constructor() { 
        super(); 
    }

    public addTaxId(taxId: string, taxIdType: string) {
        if(!AppValidations.isNullOrEmpty(this.taxIDs![0])) {
            this.taxIDs![0] = new TaxID(taxId, taxIdType);
        } else {
            this.taxIDs?.push(new TaxID(taxId, taxIdType)); 
        }
    }
}