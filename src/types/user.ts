export interface User {
    userId: string
    username: string
    displayName: string
    zaloName: string
    avatar: string
    bgavatar: string
    cover: string
    gender: number
    dob: number
    sdob: string
    status: string
    phoneNumber: string
    isFr: number
    isBlocked: number
    lastActionTime: number
    lastUpdateTime: number
    isActive: number
    key: number
    type: number
    isActivePC: number
    isActiveWeb: number
    isValid: number
    userKey: string
    accountStatus: number
    oaInfo: null | never
    user_mode: number
    globalId: string
    bizPkg: {
        label: null | string
        pkgId: number
    }
    createdTs: number
    oa_status: null | never
}

