/** SMS API Configuration */
export const txtLocal = {
    url: "https://api.textlocal.in/send/",
    transactional: { 
        apiKey: "JNn8Evl07h0-B2HWiejLhoSv2ObRdiqchLUWORNhJV", 
        sender: "CRYTYM"
    }, 
    promotional: {
        apiKey: "s2u19vdcGBg-mtk10lETVdY4u5YyP71AMQeNkHxCNS", 
        sender: "TXTLCL"
    }
}; 

/** Email Account Configuration */
export const axesSupportMailConf = {
    loginURL: "https://sso.godaddy.com/?app=email&realm=pass&username=support@axessolutions.com", 
    displayName: "Axes Solutions Support", 
    incoming: {
        server: "imap.secureserver.net", 
        port: 993, 
        encryption: "SSL/TLS", 
        secure: true
    }, 
    outgoing: {
        server: "smtpout.secureserver.net", 
        port: 465, 
        alternatePort: 587, 
        encryption: "SSL/TLS", 
        secure: true
    },  
    auth: {
        user: "support@axessolutions.com", 
        pass: "CmnPwd@1520"
    }
}; 

export interface IHttpHeaders {
    header: string; 
    value: string | string[];
}

export interface IHttpParams {
    param: string; 
    value: string | number | boolean; 
}