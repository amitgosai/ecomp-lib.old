export const Database = {
    Firestore: "Firestore"
}; 

export const documentDb = {
  generalCols: {
    id: "id", 
    createdOn: "createdOn", 
    createdBy: "createdBy", 
    updatedOn: "updatedOn", 
    updatedBy: "updatedBy", 
    isDeleted: "isDeleted", 
    deletedOn: "deletedOn", 
    deletedBy: "deletedBy"
  }, 
  applications: {
    collection: "applications", 
    doc: {
      ids: {
        eCompanyAdmin: "eCompanyAdmin"
      }, 
      name: "name", 
      tagLine: "tagLine"
    }
  }, 
  userGroups: {
    collection: "userGroups", 
    doc: {
      ids: {
        Administrator: "Administrator", 
        Root: "Root", 
        User: "User"
      }, 
      appId: "appId", 
      groupName: "groupName"
    }
  }, 
  appResources: {
    collection: "appResources", 
    doc: {
      resourceName: "resourceName", 
      appId: "appId"
    }
  }, 
  mailOTPs: {
    collection: "mailOTPs", 
    doc: {
      email: "email", 
      otp: "otp"
    }
  }, 
  smsOTPs: {
    collection: "smsOTPs", 
    doc: {
      mobileNumber: "mobileNumber", 
      otp: "otp"
    }
  }, 
  persons: {
    collection: "persons", 
    doc: {
      firstName: "firstName", 
      lastName: "lastName", 
      gender: "gender", 
      dateOfBirth: "dateOfBirth"
    }
  }, 
  companies: {
    collection: "companies", 
    doc: {
      companyName: "companyName", 
      companyType: "companyType", 
      registrationNumber: "registrationNumber", //Company Identification Number OR CIN
      dateOfIncorporation: "dateOfIncorporation", 
      taxIDs: "taxIDs"
    }
  }, 
  mailTemplates: {
    collection: "mailTemplates", 
    doc: {
      ids: {
        CurryTym_Reg_OTP_Mail: "CurryTym_Reg_OTP_Mail"
      }, 
      companyId: "companyId", 
      mailTemplate: "mailTemplate"
    }
  }, 
  jobTitles: {
    collection: "jobTitles", 
    doc: {
      companyId: "companyId", 
      jobTitle: "jobTitle"
    }
  }, 
  contacts: {
    collection: "contacts", 
    doc: {
      personOrCompany: "personOrCompany", 
      contactName: "contactName", 
      personId: "personId", 
      companyId: "companyId", 
      employedCompany: "employedCompany",
      websites: "websites", 
      jobTitleId: "jobTitleId", 
      isShareholder: "isShareholder", 
      sharePercent: "sharePercent", 
      contactGroups: "contactGroups", 
      notes: "notes"
    }
  }, 
  contactAddresses: {
    collection: "contactAddresses", 
    doc: {
      contactId: "contactId", 
      addLine1: "addLine1", 
      addLine2: "addLine2", 
      areaName: "areaName", 
      city: "city", 
      province: "province", 
      country: "country", 
      zipCode: "zipCode", 
      lat: "lat", 
      long: "long"
    }
  }, 
  contactEmails: {
    collection: "contactEmails", 
    doc: {
      contactId: "contactId", 
      email: "email", 
      emailType: "emailType", 
      isPrimary: "isPrimary", 
      isVerified: "isVerified"
    }
  }, 
  contactPhones: {
    collection: "contactPhones", 
    doc: {
      contactId: "contactId", 
      countryCode: "countryCode", 
      phoneNumber: "phoneNumber", 
      phoneType: "phoneType", 
      isPrimary: "isPrimary", 
      isVerified: "isVerified"
    }
  }, 
  contactSocialMediaIDs: {
    collection: "contactSocialMediaIDs", 
    doc: {
      contactId: "contactId", 
      socialMedia: "socialMedia", 
      socialMediaId: "socialMediaId", 
      profileURL: "profileURL"
    }
  }, 
  users: {
    collection: "users", 
    doc: {
      photoURL: "photoURL", 
      userName: "userName", 
      displayName: "displayName", 
      registeredEmail: "registeredEmail", 
      registeredMobile: "registeredMobile", 
      isApproved: "isApproved", 
      lastOTP: "lastOTP", 
      mailVerified: "mailVerified", 
      mobileVerified: "mobileVerified", 
      isAnonymous: "isAnonymous", 
      lastLoginDateTime: "lastLoginDateTime", 
      privacyAgreedOn: "privacyAgreedOn", 
      privacyAgreeDevice: "privacyAgreeDevice", 
      tncAgreedOn: "tncAgreedOn", 
      tncAgreeDevice: "tncAgreeDevice", 
      contactId: "contactId", 
      appAccess: "appAccess",
      userGroups: "userGroups"
    }
  }
}; 

export interface Idb {
    dbName: string
}

export interface IdbFields {
    id?: string | null | undefined, 
    createdOn?: Date | null | undefined, 
    createdBy?: string | null | undefined, 
    updatedOn?: Date | null | undefined, 
    updatedBy?: string | null | undefined, 
    isDeleted?: boolean | null | undefined, 
    deletedOn?: Date | null | undefined, 
    deletedBy?: string | null | undefined, 
}

export class WhereParam {
    public columnName: string = ""; 
    public operator: string = ""; 
    public value: any;  
  
    constructor(columnName: string, operator: string, value: any) {
      this.columnName = columnName; 
      this.operator = operator; 
      this.value = value; 
    }
  }

  export class DbFields implements IdbFields {
    public id?: string | null | undefined; 
    public createdOn?: Date | null | undefined; 
    public createdBy?: string | null | undefined; 
    public updatedOn?: Date | null | undefined; 
    public updatedBy?: string | null | undefined; 
    public isDeleted?: boolean | null | undefined; 
    public deletedOn?: Date | null | undefined; 
    public deletedBy?: string | null | undefined; 
  }