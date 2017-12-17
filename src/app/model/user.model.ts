/**
 * Created by hoangdaoduc on 9/25/17.
 */
export class User {
    public email: string;
    public fullName: string;
    public lopNc: string;
    public lopTc: string;
    public phoneNumber: string;
    public roomKey: string;
    public sectionKey: string;
    public id: string;
    public status: string;

    public get hidePhoneNumber(): string {
        return this.phoneNumber.substring(0, this.phoneNumber.length - 3) + 'xxx';

    }

    public get searchKey(): string {
        return this.fullName + this.lopNc;
    }

    public get statusText(): string {
        return this.status ? 'Ok' : 'Chưa xác nhận';
    }


    constructor(user: any) {
        this.email = user.email || '';
        this.fullName = user.fullName || '';
        this.lopNc = user.lopNc || '';
        this.lopTc = user.lopTc || '';
        this.phoneNumber = user.phoneNumber || '';
        this.roomKey = user.roomKey || '';
        this.sectionKey = user.sectionKey || '';
        this.id = user.id || '';
        this.status = user.status || 0;
    }
}

