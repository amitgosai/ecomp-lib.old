// tslint:disable no-string-literal
// tslint:disable max-classes-per-file
import { DbFields, IdbFields } from '../../data/data'; 
import { IClassDescription } from '../../security/security';
import { Util } from '../../util/util';
import { AppValidations } from '../../validations/validation'; 
import { ICompany, IJobTitle } from '../business/business';

export const Gender = {
    Male: "M", 
    Female: "F", 
    Other: "O"
}; 
export type tGender = "M" | "F" | "O"; 

export const EmailTypes = {
    Personal: "Personal", 
    Work: "Work", 
    Sales: "Sales", 
    Support: "Support", 
    TechSupport: "Tech Support", 
    CustomerCare: "Customer Care", 
    Other: "Other"
}
export type tEmailTypes = "Personal" | "Work" | "Sales" | "Support" | "Tech Support" | "Customer Care" | "Other"; 

export const PhoneTypes = {
    Mobile: "Mobile", 
    Home: "Home", 
    Work: "Work", 
    CustomerCare: "Customer Care", 
    Sales: "Sales", 
    Main: "Main", 
    Workfax: "Work fax", 
    Homefax: "Home fax", 
    Pager: "Pager", 
    Other: "Other"
}
export type tPhoneTypes = "Mobile" | "Home" | "Work" | "Customer Care" | "Sales" | "Main" | "Work fax" | "Home fax" | "Pager" | "Other"; 

export const SocialMediaTypes = {
    LinkedIn: "LinkedIn", 
    Google: "Google", 
    Twitter: "Twitter", 
    Insta: "Instagram", 
    WhatsApp: "WhatsApp", 
    Signal: "Signal", 
    Telegram: "Telegram", 
    YouTube: "YouTube", 
    Facebook: "Facebook", 
    Other: "Other"
}
export type tSocialMediaTypes = "LinkedIn" | "Google" | "Twitter" | "Instagram" | "WhatsApp" | "Signal" | "Telegram" | "YouTube" | "Facebook" | "Other"; 

export type ContactType = "Person" | "Company"; 

export const perCompAssocType = {
    Owner: "Owner", 
    Customer: "Customer", 
    Employee: "Employee", 
    ServiceProvider: "Service Provider", 
    Vendor: "Vendor", 
    Supplier: "Supplier", 
    Contractor: "Contractor", 
    Other: "Other"
}
export type tPerCompAssocType = "Owner" | "Customer" | "Employee" | "Service Provider" | "Vendor" | "Supplier" | "Contractor" | "Other"; 

export interface IPhoneType extends IdbFields {
    companyId: string; 
    phoneType: string; 
}

export interface IEmailType extends IdbFields {
    companyId: string; 
    emailType: string; 
}

export interface ISocialMediaTypes extends IdbFields {
    socialMedia: string; 
}

export interface IContactEmail extends IdbFields {
    companyId?: string | null | undefined; 
    personId?: string | null | undefined; 
    email: string; 
    emailType?: string | null | undefined;
    isPrimary?: boolean | null | undefined; 
    isVerified?: boolean | null | undefined; 
}

export interface IContactPhone extends IdbFields {
    companyId?: string | null | undefined;  
    personId?: string | null | undefined; 
    phoneType?: string | null | undefined; 
    countryCode?: string | null | undefined; 
    phoneNumber: string; 
    isPrimary?: boolean | null | undefined; 
    isVerified?: boolean | null | undefined; 
}

export interface IContactAddress extends IdbFields {
    companyId?: string | null | undefined; 
    personId?: string | null | undefined; 
    addressLine1: string;  
    addressLine2?: string | null | undefined; 
    areaName?: string | null | undefined; 
    city?: string | null | undefined; 
    state?: string | null | undefined;  
    country?: string | null | undefined; 
    zipCode?: string | null | undefined; 
    lat?: number | null | undefined; 
    long?: number | null | undefined; 
}

export interface ISocialMediaID extends IdbFields {
    personId?: string | null | undefined; 
    companyId?: string | null | undefined; 
    socialMedia: string; 
    socialMediaID: string; 
    profileURL?: string | null | undefined; 
}

export interface IPerson extends IdbFields {
    firstName: string; 
    lastName?: string | null | undefined;  
    fullName: string; 
    fullNameLower: string; 
    gender?: string | null | undefined; 
    dateOfBirth?: Date | null | undefined; 
    contactGroup?: string[] | null | undefined; 
    websites: string[] | null | undefined; 
    phones: Phone[] | null | undefined; 
    emails: Email[] | null | undefined; 
    addresses: Address[] | null | undefined; 
    socialMediaIDs: SocialMediaID[] | null | undefined; 
}

export interface IPersonCompanyAssociation extends IdbFields {
    associationType: tPerCompAssocType; 
    personId: string; 
    person?: IPerson | null | undefined; 
    companyId: string; 
    company?: ICompany | null | undefined; 
    isShareholder?: boolean | null | undefined; 
    isThirdPartyAssociate?: boolean | null | undefined; 
    jobTitleId?: string | null | undefined; 
    jobTitle?: IJobTitle | null | undefined; 
    sharePercent?: number | null | undefined; 
}

// Depreciated
/*
export interface IContact {
    personOrCompany: string //Person OR Company
    contactName?: string | null | undefined; //Name of the contact. I.e. Home, Office, etc. 
    person?: IPerson | null | undefined; 
    company?: ICompany | null | undefined; //Used when selected from the dropdown in front-end. OR when a new company is created. 
    employedCompany?: string | null | undefined; //A freeform text for contact. This is used in case company is not cerated within eBusiness.  
    addresses?: IContactAddress[] | null | undefined; 
    emails?: IContactEmail[] | null | undefined; 
    phones?: IContactPhone[] | null | undefined; 
    socialMediaIDs?: ISocialMediaID[] | null | undefined; 
    websites?: string[] | null | undefined;  
    jobTitle?: IJobTitle | null | undefined; 
    isShareholder?: boolean | null | undefined; 
    sharePercent?: number | null | undefined; 
    contactGroups?: string[] | null | undefined;  
    notes?: string | null | undefined; 
} */

export class Person extends DbFields implements IPerson {
    public firstName: string = ""; 
    public lastName: string | null | undefined; 
    public fullName: string = "";
    private _fullNameLower: string = ""; 
    public gender?: string | null | undefined; 
    public dateOfBirth: Date | null | undefined; 
    public contactGroup: string[] | null | undefined; 
    public websites: string[] | null | undefined; 
    public phones: Phone[] | null | undefined;
    public emails: Email[] | null | undefined; 
    public addresses: Address[] | null | undefined; 
    public socialMediaIDs: SocialMediaID[] | null | undefined; 

    constructor(person?: any)
    constructor(person?: string, lastName?: string, gender?: tGender, dob?: Date, contGroup?: string[]) {
        super();
        // Check on the Arguments here. 
        if(person && typeof person === "object") {
            // Then we have the person object with us. 
            if(person["id"]) {
                this.id = person["id"]; 
            }
            if(person["firstName"]) {
                this.firstName = person["firstName"]; 
                this.fullName = this.firstName; 
            }
            if(person["lastName"]) {
                this.lastName = person["lastName"]; 
                this.fullName = this.fullName + this.lastName; 
            }
            if(person["fullName"]) {
                this.fullName = person["fullName"]; 
            }
            if(person["gender"]) {
                this.gender = person["gender"]; 
            }
            if(person["dateOfBirth"]) {
                this.dateOfBirth = person["dateOfBirth"]; 
            }
            if(person["contactGroup"]) {
                this.contactGroup = person["contactGroup"]; 
            }
            if(person["notes"]) {
                this.notes = person["notes"]; 
            }
        } else {
            if(typeof person === "string" && !AppValidations.isNullOrEmpty(person)) { // Then take it as first Name. 
                this.firstName = person!;
                this.fullName = this.firstName; 
            }

            if(!AppValidations.isNullOrEmpty(lastName)) {
                this.lastName = lastName!; 
                this.fullName = this.fullName + " " + this.lastName; 
            }

            if(!AppValidations.isNullOrEmpty(gender)) {
                this.gender = gender; 
            }

            if(!AppValidations.isNullOrEmpty(dob)) {
                this.dateOfBirth = dob; 
            }
            if(!AppValidations.isNullOrEmpty(contGroup)) {
                this.contactGroup = contGroup; 
            }
        }
    }

    public get fullNameLower(): string { return !AppValidations.isNullOrEmpty(this.fullName)? this.fullName.toLowerCase() : ""; }

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

export class Email extends DbFields implements IContactEmail {
    public personId?: string | null | undefined;  
    public companyId?: string | null | undefined; 
    public email: string = ""; 
    public emailTypeId?: string | null | undefined; 
    public emailType?: string | null | undefined; 
    public isPrimary?: boolean | null | undefined; 
    public isVerified: boolean | null | undefined; 

    constructor(contact?: any);
    constructor(contact?: ContactType, contactId?: string, email?:string, emailTypeId?: string, emailType?: tEmailTypes, isPrimary?: boolean, isVerified?: boolean){ 
        super(); 
        if(contact && typeof contact === "object") {
            Util.setCommonDbOjectProps(this, contact); // Set All the default properties. 
            if(!AppValidations.isNullOrEmpty(contact["personId"])) {
                this.personId = contact["personId"]; 
            }
            if(!AppValidations.isNullOrEmpty(contact["companyId"])) {
                this.companyId = contact["companyId"]; 
            }
            if(!AppValidations.isNullOrEmpty(contact["email"])) {
                this.email = contact["email"]; 
            }
            if(!AppValidations.isNullOrEmpty(contact["emailTypeId"])) {
                this.emailTypeId = contact["emailTypeId"]; 
            }
            if(!AppValidations.isNullOrEmpty(contact["emailType"])) {
                this.emailType = contact["emailType"]; 
            }
            if(!AppValidations.isNullOrEmpty(contact["isPrimary"])) {
                this.isPrimary = contact["isPrimary"]; 
            }
            if(!AppValidations.isNullOrEmpty(contact["isVerified"])) {
                this.isVerified = contact["isVerified"]; 
            }
            
        } else {
            if(!AppValidations.isNullOrEmpty(contactId)) {
                if(contact === "Person") {
                    this.personId = contactId; 
                } else {
                    this.companyId = contactId; 
                }
            }
            if(!AppValidations.isNullOrEmpty(email)) {
                this.email = email!; 
            }
            if(!AppValidations.isNullOrEmpty(emailTypeId)) {
                this.emailTypeId = emailTypeId; 
            }
            if(!AppValidations.isNullOrEmpty(emailType)) {
                this.emailType = emailType; 
            }
            if(!AppValidations.isNullOrEmpty(isPrimary)) {
                this.isPrimary = isPrimary; 
            }
            if(!AppValidations.isNullOrEmpty(isVerified)) {
                this.isVerified = isVerified; 
            }
        }
    }
}

export class PhoneType extends DbFields implements IPhoneType {
    public companyId: string = ""; 
    public phoneType: tPhoneTypes = "Mobile";  

    constructor(phoneType?: any)
    constructor(phoneType?: tPhoneTypes, companyId?: string) {
        super(); 
        if(phoneType && typeof phoneType === "object") {
            if(!AppValidations.isNullOrEmpty(phoneType["companyId"])) {
                this.companyId = phoneType["companyId"]; 
            }
            if(!AppValidations.isNullOrEmpty(phoneType["phoneType"])) {
                this.phoneType = phoneType["phoneType"]; 
            }
        } else {
            if(!AppValidations.isNullOrEmpty(companyId)) {
                this.companyId = companyId!; 
            }
            if(!AppValidations.isNullOrEmpty(phoneType)) {
                this.phoneType = phoneType!; 
            }
        }
    }
}

export class EmailType extends DbFields implements IEmailType {
    public companyId: string = ""; 
    public emailType: tEmailTypes = "Work"; 

    constructor(emailType?: any)
    constructor(emailType?: tEmailTypes, companyId?: string) {
        super(); 
        if(emailType && typeof emailType === "object") {
            if(!AppValidations.isNullOrEmpty(emailType["companyId"])) {
                this.companyId = emailType["companyId"]; 
            }
            if(!AppValidations.isNullOrEmpty(emailType["emailType"])) {
                this.emailType = emailType["emailType"]; 
            }
        } else {
            if(!AppValidations.isNullOrEmpty(companyId)) {
                this.companyId = companyId!; 
            }
            if(!AppValidations.isNullOrEmpty(emailType)) {
                this.emailType = emailType!; 
            }
        }
    }
}

export class Phone extends DbFields implements IContactPhone {
    public personId: string = ""; 
    public companyId: string = ""; 
    public phoneTypeId?: string | null | undefined; 
    public phoneType?: string | null | undefined; 
    public countryCode?: string | null | undefined; 
    public phoneNumber: string = ""; 
    public isPrimary?: boolean | null | undefined; 
    public isVerified?: boolean | null | undefined; 

    public constructor(contact?: any)
    public constructor(contact?: ContactType, contactId?: string, phoneNumber?: string | null | undefined, isPrimary?: boolean, isVerified?: boolean, countryCode?: string, phoneTypeId?: string, phoneType?: tPhoneTypes) {
        super(); 
        if(contact && typeof contact === "object") {
            Util.setCommonDbOjectProps(this, contact); 
            if(!AppValidations.isNullOrEmpty(contact["personId"])) {
                this.personId = contact["personId"]; 
            }
            if(!AppValidations.isNullOrEmpty(contact["companyId"])) {
                this.companyId = contact["companyId"]; 
            }
            if(!AppValidations.isNullOrEmpty(contact["phoneTypeId"])) {
                this.phoneTypeId = contact["phoneTypeId"]; 
            }
            if(!AppValidations.isNullOrEmpty(contact["phoneType"])) {
                this.phoneType = contact["phoneType"]; 
            }
            if(!AppValidations.isNullOrEmpty(contact["countryCode"])) {
                this.countryCode = contact["countryCode"]; 
            }
            if(!AppValidations.isNullOrEmpty(contact["phoneNumber"])) {
                this.phoneNumber = contact["phoneNumber"]; 
            }
            if(!AppValidations.isNullOrEmpty(contact["isPrimary"])) {
                this.isPrimary = contact["isPrimary"]; 
            }
            if(!AppValidations.isNullOrEmpty(contact["isVerified"])) {
                this.isVerified = contact["isVerified"]; 
            }
        } else {
            if(!AppValidations.isNullOrEmpty(contact)) {
                if(contactId) {
                    if(contact === "Person") {
                        this.personId = contactId; 
                    } else {
                        this.companyId = contactId; 
                    }
                }
            }
            if(!AppValidations.isNullOrEmpty(phoneNumber)) {
                this.phoneNumber = phoneNumber!; 
            }
            if(!AppValidations.isNullOrEmpty(isPrimary)) {
                this.isPrimary = isPrimary; 
            }
            if(!AppValidations.isNullOrEmpty(isVerified)) {
                this.isVerified = isVerified; 
            }
            if(!AppValidations.isNullOrEmpty(countryCode)) {
                this.countryCode = countryCode; 
            }
            if(!AppValidations.isNullOrEmpty(phoneTypeId)) {
                this.phoneTypeId = phoneTypeId; 
            }
            if(!AppValidations.isNullOrEmpty(phoneType)) {
                this.phoneType = phoneType; 
            }
        }
    }
}

export class Address extends DbFields implements IContactAddress {
    public personId?: string | null | undefined; 
    public companyId?: string | null | undefined; 
    public addressLine1: string = ""; 
    public addressLine2?: string | null | undefined; 
    public areaName?: string | null | undefined; 
    public city?: string | null | undefined; 
    public state?: string | null | undefined; 
    public country?: string | null | undefined; 
    public zipCode?: string | null | undefined; 
    public lat?: number | null | undefined; 
    public long?: number | null | undefined; 

    constructor(contact?: any) 
    constructor(contact?: ContactType, contactId?: string, addressLine1?: string, country?: string, state?: string, city?: string, zipCode?: string, lat?: number, long?: number)
    { 
        super(); 
        if(contact && typeof contact === "object") {
            Util.setCommonDbOjectProps(this, contact); 
            if(!AppValidations.isNullOrEmpty(contact["personId"])) {
                this.personId = contact["personId"]; 
            }
            if(!AppValidations.isNullOrEmpty(contact["companyId"])) {
                this.companyId = contact["companyId"]; 
            }
            if(!AppValidations.isNullOrEmpty(contact["addressLine1"])) {
                this.addressLine1 = contact["addressLine1"]; 
            }
            if(!AppValidations.isNullOrEmpty(contact["addressLine2"])) {
                this.addressLine2 = contact["addressLine2"]; 
            }
            if(!AppValidations.isNullOrEmpty(contact["areaName"])) {
                this.areaName = contact["areaName"]; 
            }
            if(!AppValidations.isNullOrEmpty(contact["city"])) {
                this.city = contact["city"]; 
            }
            if(!AppValidations.isNullOrEmpty(contact["state"])) {
                this.state = contact["state"]; 
            }
            if(!AppValidations.isNullOrEmpty(contact["country"])) {
                this.country = contact["country"]; 
            }
            if(!AppValidations.isNullOrEmpty(contact["zipCode"])) {
                this.zipCode = contact["zipCode"]; 
            }
            if(!AppValidations.isNullOrEmpty(contact["lat"])) {
                this.lat = contact["lat"]; 
            }
            if(!AppValidations.isNullOrEmpty(contact["long"])) {
                this.long = contact["long"]; 
            }
        } else {
            if(!AppValidations.isNullOrEmpty(contact)) {
                if(contact === "Person") {
                    this.personId = contactId; 
                } else {
                    this.companyId = contactId; 
                }
                if(!AppValidations.isNullOrEmpty(addressLine1)) {
                    this.addressLine1 = addressLine1!; 
                }
                if(!AppValidations.isNullOrEmpty(country)) {
                    this.country = country; 
                }
                if(!AppValidations.isNullOrEmpty(state)) {
                    this.state = state!; 
                }
                if(!AppValidations.isNullOrEmpty(city)) {
                    this.city = city!; 
                }
                if(!AppValidations.isNullOrEmpty(zipCode)) {
                    this.zipCode = zipCode!; 
                }
                if(!AppValidations.isNullOrEmpty(lat)) {
                    this.lat = lat!; 
                }
                if(!AppValidations.isNullOrEmpty(long)) {
                    this.long = long!; 
                }
            }
        }
    }
}

export class SocialMediaID extends DbFields implements ISocialMediaID {
    public personId?: string | null | undefined; 
    public companyId?: string | null | undefined; 
    public socialMedia: string = ""; 
    public socialMediaID: string = ""; 
    public profileURL?: string | null | undefined; 

    constructor(contact?: any)
    constructor(contact?: ContactType, contactId?:string,  socialMediaName?:tSocialMediaTypes, socialMediaID?: string) {
        super(); 
        if(contact && typeof contact === "object") {
            Util.setCommonDbOjectProps(this, contact); 
            if(!AppValidations.isNullOrEmpty(contact["personId"])) {
                this.personId = contact["personId"]; 
            } 
            if(!AppValidations.isNullOrEmpty(contact["companyId"])) {
                this.companyId = contact["companyId"]; 
            } 
            if(!AppValidations.isNullOrEmpty(contact["socialMedia"])) {
                this.socialMedia = contact["socialMedia"]; 
            } 
            if(!AppValidations.isNullOrEmpty(contact["socialMediaID"])) {
                this.socialMediaID = contact["socialMediaID"]; 
            } 
            if(!AppValidations.isNullOrEmpty(contact["profileURL"])) {
                this.profileURL = contact["profileURL"]; 
            } 
        } else {
            if(contact) {
                if(!AppValidations.isNullOrEmpty(contactId)) {
                    if(contact === "Person") {
                        this.personId = contactId; 
                    } else {
                        this.companyId = contactId; 
                    }
                }
            }
            if(!AppValidations.isNullOrEmpty(socialMediaName)) {
                this.socialMedia = socialMediaName!; 
            }
            if(!AppValidations.isNullOrEmpty(socialMediaID)) {
                this.socialMediaID = socialMediaID!;
            }
        }
    }
}

export class PersonCompanyAssociation extends DbFields implements IPersonCompanyAssociation  {
    public associationType: tPerCompAssocType = "Other"; 
    public personId: string = ""; 
    public person?: IPerson | null | undefined; 
    public companyId: string = ""; 
    public company?: ICompany | null | undefined; 
    public isShareholder?: boolean | null | undefined; 
    public isThirdPartyAssociate?: boolean | null | undefined; 
    public jobTitleId?: string | null | undefined; 
    public jobTitle?: IJobTitle | null | undefined; 
    public sharePercent?: number | null | undefined; 

    constructor(personCompany?: any)
    constructor(personCompany?: tPerCompAssocType, personId?: string, companyId?: string, jobTitleId?: string) {
        super(); 

        if(personCompany && typeof personCompany === "object") {
            Util.setCommonDbOjectProps(this, personCompany); 
            if(!AppValidations.isNullOrEmpty(personCompany["associationType"])) {
                this.associationType = personCompany["associationType"]; 
            }
            if(!AppValidations.isNullOrEmpty(personCompany["personId"])) {
                this.personId = personCompany["personId"]; 
            }
            if(!AppValidations.isNullOrEmpty(personCompany["person"])) {
                this.person = personCompany["person"]; 
            }
            if(!AppValidations.isNullOrEmpty(personCompany["companyId"])) {
                this.companyId = personCompany["companyId"]; 
            }
            if(!AppValidations.isNullOrEmpty(personCompany["company"])) {
                this.company = personCompany["company"]; 
            }
            if(!AppValidations.isNullOrEmpty(personCompany["isShareholder"])) {
                this.isShareholder = personCompany["isShareholder"]; 
            }
            if(!AppValidations.isNullOrEmpty(personCompany["isThirdPartyAssociate"])) {
                this.isThirdPartyAssociate = personCompany["isThirdPartyAssociate"]; 
            }
            if(!AppValidations.isNullOrEmpty(personCompany["jobTitleId"])) {
                this.jobTitleId = personCompany["jobTitleId"]; 
            }
            if(!AppValidations.isNullOrEmpty(personCompany["jobTitle"])) {
                this.jobTitle = personCompany["jobTitle"]; 
            }
            if(!AppValidations.isNullOrEmpty(personCompany["associationType"])) {
                this.sharePercent = personCompany["sharePercent"]; 
            }
        } else {
            if(personCompany) {
                this.associationType = personCompany; 
            }
            if(!AppValidations.isNullOrEmpty(personId)) {
                this.personId = personId!; 
            }
            if(!AppValidations.isNullOrEmpty(companyId)) {
                this.companyId = companyId!; 
            }
            if(!AppValidations.isNullOrEmpty(jobTitleId)) {
                this.jobTitleId = jobTitleId!; 
            }
        }
    }
}

// Deprecated
/*
export class Contact extends DbFields implements IContact {
    public personOrCompany: string = "Person"; //Default to Person. 
    public contactName?: string | null | undefined  = ""; 
    public person?: Person | null | undefined = new Person(); 
    public company?: Company = new Company();  
    public employedCompany?: string | null | undefined; 
    public addresses?: Address[] | null | undefined = new Array(1); 
    public emails?: Email[] | null | undefined = new Array(1); 
    public phones?: Phone[] | null | undefined = new Array(1); 
    public socialMediaIDs?: SocialMediaID[] | null | undefined = new Array(1); 
    public websites?: string[] | null | undefined = new Array(1); 
    public jobTitle?: JobTitle = new JobTitle(); 
    public isShareholder?: boolean | null | undefined; 
    public sharePercent?: number | null | undefined; 
    public contactGroups?: string[] | null | undefined = new Array(1); 
    public notes?: string | null | undefined; 

    constructor() {
        super(); 
    }
    public addPhone(value: Phone): boolean {
        let _retVal = false; 
        let _contactPhone: Phone = new Phone();
        try {
            _contactPhone = value; 
            if(AppValidations.isNullOrEmpty(this.phones![0])){ //If first element to be added, then set it to 0th position. 
                this.phones![0] = _contactPhone; 
            } else {
                this.phones?.push(_contactPhone);
            }
            _retVal = true; 
        } catch {
            _retVal = false; 
        }
        finally {
            return _retVal; 
        }
    }
    public addPhoneDetails(phoneNumber: string, isdCode?: string, isPrimary: boolean = false, isVerified:boolean = false, phoneType?: string): boolean {
        let _retVal: boolean = false; 
        let _contactPhone: Phone = new Phone(); 

        try {
            _contactPhone.contactId = this.id!; 
            _contactPhone.phoneType = phoneType; 
            _contactPhone.countryCode = isdCode; 
            _contactPhone.phoneNumber = phoneNumber; 
            _contactPhone.isPrimary = isPrimary; 
            _contactPhone.isVerified = isVerified; 
            if(AppValidations.isNullOrEmpty(this.phones![0])){ //If first element to be added, then set it to 0th position. 
                this.phones![0] = _contactPhone; 
            } else {
                this.phones?.push(_contactPhone);
            }
            _retVal = true; 
        } catch {
            _retVal = false; 
        } finally {
            return _retVal; 
        }
    }
    public addEmail(email: Email) : boolean {
        let _retVal: boolean = false; 
        let _contactEmail: Email = new Email(); 
        try {
            _contactEmail = email; 
            if(AppValidations.isNullOrEmpty(this.emails![0])){ //If first element to be added, then set it to 0th position. 
                this.emails![0] = _contactEmail; 
            } else {
                this.emails?.push(_contactEmail);
            }
            _retVal = true; 
        } catch {
            _retVal = false; 
        } finally {
            return _retVal; 
        }
    }
    public addEmailDetails(email:string, isPrimary: boolean = false, isVerified: boolean = false, emailType?: string) : boolean {
        let _retVal: boolean = false; 
        let _contactEmail: Email = new Email(); 
        try {
            _contactEmail.contactId = this.id!; 
            _contactEmail.email = email; 
            _contactEmail.emailType = emailType; 
            _contactEmail.isPrimary = isPrimary; 
            _contactEmail.isVerified = isVerified;  
            if(AppValidations.isNullOrEmpty(this.emails![0])){ //If first element to be added, then set it to 0th position. 
                this.emails![0] = _contactEmail; 
            } else {
                this.emails?.push(_contactEmail);
            }
            _retVal = true; 
        } catch {
            _retVal = false; 
        } finally {
            return _retVal; 
        }
    }
    public addAddress(address: Address) : boolean {
        let _retVal: boolean = false; 
        let _contactAddress: Address = new Address(); 
        try {
            _contactAddress = address; 
            if(AppValidations.isNullOrEmpty(this.addresses![0])) {
                this.addresses![0] = _contactAddress; 
            } else {
                this.addresses?.push(_contactAddress); 
            }
            _retVal = true; 
        } catch {
            _retVal = false; 
        } finally {
            return _retVal; 
        }
    }
    public addAddressDetails(addLine1: string, addLine2?:string, areaName?: string, city?: string, provience?:string, country?: string, zipCode?: string, lat?: number, long?: number) : boolean {
        let _retVal: boolean = false; 
        let _contactAddress: Address = new Address(); 
        try {
            _contactAddress.contactId = this.id!; 
            _contactAddress.addressLine1 = addLine1; 
            _contactAddress.addressLine2 = addLine2;
            _contactAddress.areaName = areaName;  
            _contactAddress.city = city; 
            _contactAddress.provience = provience; 
            _contactAddress.country = country; 
            _contactAddress.zipCode = zipCode; 
            _contactAddress.lat = lat; 
            _contactAddress.long = long; 

            this.addresses?.push(_contactAddress); 
            _retVal = true; 
        } catch {
            _retVal = false; 
        } finally {
            return _retVal; 
        }
    }
    public addSocialMediaID(socialMedia: SocialMediaID) : boolean {
        let _retVal: boolean = false; 
        let _sslMedia: SocialMediaID = new SocialMediaID(); 
        try {
            _sslMedia = socialMedia; 
            if(AppValidations.isNullOrEmpty(this.socialMediaIDs![0])) {
                this.socialMediaIDs![0] = _sslMedia; 
            } else {
                this.socialMediaIDs?.push(_sslMedia); 
            }
            _retVal = true; 
        } catch {
            _retVal = false; 
        } finally {
            return _retVal; 
        }
    }
    public addSocialMediaDetails(socialMediaName:string, socialMediaID: string) : boolean {
        let _retVal: boolean = false; 
        let _sslMedia: SocialMediaID = new SocialMediaID(); 
        try {
            _sslMedia.contactId = this.id!; 
            _sslMedia.socialMedia = socialMediaName; 
            _sslMedia.socialMediaID = socialMediaID; 
            this.socialMediaIDs?.push(_sslMedia); 
            _retVal = true; 
        } catch {
            _retVal = false; 
        } finally {
            return _retVal; 
        }
    }
    public addWebsite(website: string) : boolean {
        let _retVal: boolean = false; 
        try {
            if(AppValidations.isNullOrEmpty(this.websites![0])) {
                this.websites![0] = website; 
            } else {
                this.websites?.push(website);  
            }
            _retVal = true; 
        } catch {
            _retVal = false; 
        } finally {
            return _retVal; 
        }
    }
    public addContactGroup(groupName: string) : boolean {
        let _retVal: boolean = false; 
        try {
            if(AppValidations.isNullOrEmpty(this.contactGroups![0])) {
                this.contactGroups![0] = groupName; 
            } else {
                this.contactGroups?.push(groupName); 
            }
            _retVal = true; 
        } catch {
            _retVal = false; 
        } finally {
            return _retVal; 
        }
    }
} */