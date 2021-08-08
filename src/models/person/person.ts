import { DbFields } from '../../data/data'; 
import { AppValidations } from '../../validations/validation'; 
import { Company, ICompany, IJobTitle, JobTitle } from '../business/business';

export const Gender = {
    Male: "M", 
    Female: "F", 
    Other: "O"
}; 

export const EmailType = {
    Personal: "Personal", 
    Work: "Work",
    Other: "Other"
}

export const PhoneTypes = {
    Mobile: "Mobile", 
    Personal: "Personal", 
    Work: "Work", 
    Main: "Main", 
    WorkFax: "Work Fax", 
    HomeFax: "Home Fax", 
    Pager: "Pager", 
    Other: "Other"
}

export interface IContactEmail {
    contactId: string; 
    email: string; 
    emailType?: string | null | undefined;
    isPrimary?: boolean | null | undefined; 
    isVerified?: boolean | null | undefined; 
}

export interface IContactPhone {
    contactId: string; 
    phoneType?: string | null | undefined; 
    countryCode?: string | null | undefined; 
    phoneNumber: string; 
    isPrimary?: boolean | null | undefined; 
    isVerified?: boolean | null | undefined; 
}

export interface IContactAddress {
    contactId: string; 
    addressLine1: string;  
    addressLine2?: string | null | undefined; 
    areaName?: string | null | undefined; 
    city?: string | null | undefined; 
    province?: string | null | undefined;  
    country?: string | null | undefined; 
    zipCode?: string | null | undefined; 
    lat?: number | null | undefined; 
    long?: number | null | undefined; 
}

export interface ISocialMediaID {
    contactId: string; 
    socialMedia: string; 
    socialMediaID: string; 
    profileURL?: string | null | undefined; 
}

export interface IPerson {
    firstName: string, 
    lastName?: string | null | undefined, 
    gender?: string | null | undefined, 
    dateOfBirth?: Date | null | undefined, 
}

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
} 

export class Person extends DbFields implements IPerson {
    public firstName: string = ""; 
    public lastName: string | null | undefined; 
    public gender?: string | null | undefined; 
    public dateOfBirth: Date | null | undefined; 

    constructor(firstName?: string, lastName?: string) {
        super(); 
        if(!AppValidations.isNullOrEmpty(firstName)) {
            this.firstName = firstName!;
        }
        if(!AppValidations.isNullOrEmpty(lastName)) {
            this.lastName = lastName!; 
        }
    }
}

export class Email extends DbFields implements IContactEmail {
    public contactId: string = ""; 
    public email: string = ""; 
    public emailType?: string | null | undefined; 
    public isPrimary?: boolean | null | undefined; 
    public isVerified: boolean | null | undefined; 

    constructor(contactId?: string, email?:string){ 
        super(); 
        if(!AppValidations.isNullOrEmpty(contactId)) {
            this.contactId = contactId!; 
        }
        if(!AppValidations.isNullOrEmpty(email)) {
            this.email = email!; 
        }
    }
}

export class Phone extends DbFields implements IContactPhone {
    public contactId: string = ""; 
    public phoneType?: string | null | undefined; 
    public countryCode?: string | null | undefined; 
    public phoneNumber: string = ""; 
    public isPrimary?: boolean | null | undefined; 
    public isVerified?: boolean | null | undefined; 

    constructor(contactId?: string, phoneNumber?: string | null | undefined) {
        super(); 
        if(!AppValidations.isNullOrEmpty(contactId)) {
            this.contactId = contactId!; 
        }
        if(!AppValidations.isNullOrEmpty(phoneNumber)) {
            this.phoneNumber = phoneNumber!; 
        }
    }
}

export class Address extends DbFields implements IContactAddress {
    public contactId: string = ""; 
    public addressLine1: string = ""; 
    public addressLine2?: string | null | undefined; 
    public areaName?: string | null | undefined; 
    public city?: string | null | undefined; 
    public provience?: string | null | undefined; 
    public country?: string | null | undefined; 
    public zipCode?: string | null | undefined; 
    public lat?: number | null | undefined; 
    public long?: number | null | undefined; 

    constructor() { super(); }
}

export class SocialMediaID extends DbFields implements ISocialMediaID {
    public contactId: string = ""; 
    public socialMedia: string = ""; 
    public socialMediaID: string = ""; 
    public profileURL?: string | null | undefined; 

    constructor(socialMediaName?:string, socialMediaID?: string) {
        super(); 
        if(!AppValidations.isNullOrEmpty(socialMediaName)) {
            this.socialMedia = socialMediaName!; 
        }
        if(!AppValidations.isNullOrEmpty(socialMediaID)) {
            this.socialMediaID = socialMediaID!;
        }
    }
}

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
}