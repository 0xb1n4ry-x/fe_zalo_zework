export interface QRCodeData {
    success: boolean
    qrImage?: string
    sessionId?: string
    message?: string
    status?: string
}

export interface UserData {
    avatar: string
    display_name: string
}

export  interface zaloAccount{
    userId : string,
    zaloAccountId : string,
    "zpw_sek": string,
    "zpw_enk": string,
    "imei": string,
    "display_name": string,
    "avatar": string,
    "phone_number": boolean,
    "sessionId": string,
    "is_active": boolean,
    "isDefault": boolean,
    "isAuthenticated": true,
    "createdAt": string,
    "lastActiveAt": string,


}


