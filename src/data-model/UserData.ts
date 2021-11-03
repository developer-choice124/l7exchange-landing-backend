export interface NewUser {
    username: string;
    name: string;
    password: any;
    role: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
    commission: string;
    parent_id: number;
    mobileno: number;
    message: string;
}

export interface UserLogin {
    username: string,
    password: string
}
export interface ChangePassword {
    user_id: number,
    newpassword: string,
    cnewpassword: string
}

export interface NewImage {
    type: string,
    link: string,
    image: Blob,
    logoTitle: string,
    mediaName: string,
    polcisypolicy: string
    ads_title: string,
    ads_desc: string,
}

export interface Question {
    question: string,
    answer: string
}