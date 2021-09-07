// tslint:disable no-string-literal
import { DbFields, IdbFields } from '../../data/data';
import { Util } from '../../util/util';
import { AppValidations } from '../../validations/validation';
import { Address, Email, IContactAddress, IContactEmail, IContactPhone, ISocialMediaID, PersonCompanyAssociation, Phone, SocialMediaID } from '../person/person';

export const companyRegistrationType = {
    PvtLtd: "Private Limited", 
    PubLtd: "Public Limited", 
    Partnership: "Partnerships", 
    LLP: "Limited Liability Partnership", 
    OnePerson: "One Person", 
    SoleProp: "Sole Proprietorship", 
    SecEight: "Section 8 Company", 
    Other: "Other"
}; 
export type tCompanyTypes = "Private Limited" | "Public Limited" | "Partnerships" | "Limited Liability Partnership" | "One Person" | "Sole Proprietorship" | "Section 8 Company" | "Other"; 

export type tTaxIDType = "GST" | "PAN Card" | "Aadhaar Card" | "Other"; 

export interface ITaxID extends IdbFields {
    taxID: string; 
    taxIDType: string; 
}

export interface ICompanyTypes extends IdbFields {
    companyType: string; 
}

export interface ICompany extends IdbFields {
    publicId: string; 
    companyLogo?: string | null | undefined; 
    companyName: string; 
    companyNameLower?: string | null | undefined; 
    companyType?: string | null | undefined; 
    registrationNumber?: string | null | undefined; 
    dateOfIncorporation?: Date | null | undefined; 
    taxIDs?: ITaxID[] | null | undefined; 
    websites?: string[] | null | undefined; 
    contactGroup: string[] | null | undefined; 
    phones: IContactPhone[] | null | undefined; 
    emails: IContactEmail[] | null | undefined; 
    addresses: IContactAddress[] | null | undefined; 
    socialMediaIDs: ISocialMediaID[] | null | undefined; 
}

export interface IJobTitle extends IdbFields {
    companyId: string; 
    jobTitle: string;
}

export class TaxID extends DbFields implements ITaxID {
    public taxID: string = ""; 
    public taxIDType: string = ""; 

    constructor(taxId?: string, taxIdType?: tTaxIDType) {
        super(); 
        if(!AppValidations.isNullOrEmpty(taxId)) {
            this.taxID = taxId!; 
        }
        if(!AppValidations.isNullOrEmpty(taxIdType)) {
            this.taxIDType = taxIdType!; 
        }
    }
}

// tslint:disable-next-line: max-classes-per-file
export class JobTitle extends DbFields implements IJobTitle {
    public companyId: string = ""; 
    public company?: Company | null | undefined; 
    public jobTitle: string = ""; 

    constructor(jobTitle?: any)
    constructor(jobTitle?: string, companyId?: string) {
        super(); 
        if(jobTitle && typeof jobTitle === "object") {
            Util.setCommonDbOjectProps(this, jobTitle); 
            if(!AppValidations.isNullOrEmpty(jobTitle["companyId"])) {
                this.companyId = jobTitle["companyId"]
            }
            if(!AppValidations.isNullOrEmpty(jobTitle["jobTitle"])) {
                this.companyId = jobTitle["jobTitle"]
            }
            if(!AppValidations.isNullOrEmpty(jobTitle["company"])) {
                this.company = jobTitle["company"]
            }
        } else {
            if(jobTitle) {
                if(!AppValidations.isNullOrEmpty(companyId)) {
                    this.companyId = companyId!; 
                }
                if(!AppValidations.isNullOrEmpty(jobTitle))
                {
                    this.jobTitle = jobTitle!; 
                }
            }
        }
    }
}

// tslint:disable-next-line: max-classes-per-file
export class CompanyTypes extends DbFields implements ICompanyTypes {
    constructor() { super(); }
    public companyType: string = ""; 
}

// tslint:disable-next-line: max-classes-per-file
export class Company extends DbFields implements ICompany {
    public publicId: string = ""; 
    public companyLogo?: string | null | undefined; 
    public companyName: string = ""; 
    private _companyNameLower: string | null | undefined; 
    public companyType?: string | null | undefined; 
    public registrationNumber?: string | null | undefined; 
    public dateOfIncorporation?: Date | null | undefined; 
    public taxIDs?: TaxID[] | null | undefined = [];
    public websites?: string[] | null | undefined = []; 
    public contactGroup: string[] | null | undefined = [];  
    public phones: Phone[] | null | undefined = []; 
    public emails: Email[] | null | undefined = []; 
    public addresses: Address[] | null | undefined = []; 
    public socialMediaIDs: SocialMediaID[] | null | undefined = []; 
    public personCompany: PersonCompanyAssociation | null | undefined; 

    constructor(company?: any)
    constructor(company?: string, companyType?: tCompanyTypes, registrationNumber?: string, dateOfInc?: Date, companyLogo?: string) { 
        super(); 
        if(company && typeof company === "object") {
            Util.setCommonDbOjectProps(this, company); 
            if(!AppValidations.isNullOrEmpty(company["publicId"])) {
                this.publicId = company["publicId"]; 
            }
            if(!AppValidations.isNullOrEmpty(company["companyLogo"])) {
                this.companyLogo = company["companyLogo"]; 
            }
            if(!AppValidations.isNullOrEmpty(company["companyName"])) {
                this.companyName = company["companyName"]; 
            }
            if(!AppValidations.isNullOrEmpty(company["companyType"])) {
                this.companyType = company["companyType"]; 
            }
            if(!AppValidations.isNullOrEmpty(company["registrationNumber"])) {
                this.registrationNumber = company["registrationNumber"]; 
            }
            if(!AppValidations.isNullOrEmpty(company["dateOfIncorporation"])) {
                this.dateOfIncorporation = company["dateOfIncorporation"]; 
            }
            if(!AppValidations.isNullOrEmpty(company["taxIDs"])) {
                this.taxIDs = company["taxIDs"]; 
            }
            if(!AppValidations.isNullOrEmpty(company["websites"])) {
                this.websites = company["websites"]; 
            }
            if(!AppValidations.isNullOrEmpty(company["contactGroup"])) {
                this.contactGroup = company["contactGroup"]; 
            }
            if(!AppValidations.isNullOrEmpty(company["phones"])) {
                this.phones = company["phones"]; 
            }
            if(!AppValidations.isNullOrEmpty(company["emails"])) {
                this.emails = company["emails"]; 
            }
            if(!AppValidations.isNullOrEmpty(company["addresses"])) {
                this.addresses = company["addresses"]; 
            }
            if(!AppValidations.isNullOrEmpty(company["socialMediaIDs"])) {
                this.socialMediaIDs = company["socialMediaIDs"]; 
            }
            if(!AppValidations.isNullOrEmpty(company["personCompany"])) {
                this.personCompany = company["personCompany"]; 
            }
        } else {
            if(!AppValidations.isNullOrEmpty(company)) {
                this.companyName = company!; 
            }
            if(!AppValidations.isNullOrEmpty(companyType)) {
                this.companyType = companyType!; 
            }
            if(!AppValidations.isNullOrEmpty(registrationNumber)) {
                this.registrationNumber = registrationNumber!; 
            }
            if(!AppValidations.isNullOrEmpty(dateOfInc)) {
                this.dateOfIncorporation = dateOfInc!; 
            }
            if(!AppValidations.isNullOrEmpty(companyLogo)) {
                this.companyLogo = companyLogo!; 
            }
        }
    }

    public get companyNameLower(): string | null | undefined { return !AppValidations.isNullOrEmpty(this.companyName)? this.companyName.toLowerCase() : null; }

    public addTaxId(taxId: string, taxIdType: tTaxIDType) {
        this.taxIDs?.push(new TaxID(taxId, taxIdType)); 
    }
    public removeTaxId(taxId: string) {
        if(this.taxIDs) {
            this.taxIDs = Util.removeArrayObject(this.taxIDs, "taxId", taxId); 
        }
    }
    public addWebsite(website: string) {
        this.websites?.push(website); 
    }
    public removeWebsite(website: string) {
        if(this.websites) {
            const index = this.websites.indexOf(website); 
            if(index > -1) {
                this.websites.splice(index); 
            }
        }
    }
    public addContactGroup(contactGroup: string) {
        this.contactGroup?.push(contactGroup); 
    }
    public removeContactGroup(contactGroup: string) {
        if(this.contactGroup) {
            const index = this.contactGroup.indexOf(contactGroup);
            if(index > -1) {
                this.contactGroup.splice(index); 
            }
        }
    }
    public addPhone(phone: Phone) {
        this.phones?.push(phone); 
    }
    public removePhone(id: string) {
        if(!AppValidations.isNullOrEmpty(this.phones)) {
            Util.removeArrayObject(this.phones!, "id", id); 
        }
    }
    public addEmail(email: Email) {
        this.emails?.push(email); 
    }
    public removeEmail(id: string) {
        if(!AppValidations.isNullOrEmpty(this.emails)) {
            Util.removeArrayObject(this.emails!, "id", id); 
        }
    }
    public addAddress(address: Address) {
        this.addresses?.push(address); 
    }
    public removeAddress(id: string) {
        if(!AppValidations.isNullOrEmpty(this.addresses)) {
            Util.removeArrayObject(this.addresses!, "id", id); 
        }
    }
    public addSocialMediaID(socialMedia: SocialMediaID) {
        this.socialMediaIDs?.push(socialMedia); 
    }
    public removeSocialMediaID(id: string) {
        if(!AppValidations.isNullOrEmpty(this.socialMediaIDs)) {
            Util.removeArrayObject(this.socialMediaIDs!, "id", id); 
        }
    }
    
}