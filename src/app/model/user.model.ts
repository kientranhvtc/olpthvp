/**
 * Created by hoangdaoduc on 9/25/17.
 */
export class User {
    public $key: string;
    public email: string;
    public fullName: string;
    public lopNc: string;
    public lopTc: string;
    public phoneNumber: string;
    public roomKey: string;
    public sectionKey: string;

    public get hidePhoneNumber(): string {
        return this.phoneNumber.substring(0, this.phoneNumber.length - 3) + 'xxx';

    }

    constructor(email: string, fullName: string, lopNc: string, lopTc: string, phoneNumber: string, roomKey: string, sectionKey: string) {
        this.email = email;
        this.fullName = fullName;
        this.lopNc = lopNc;
        this.lopTc = lopTc;
        this.phoneNumber = phoneNumber;
        this.roomKey = roomKey;
        this.sectionKey = sectionKey;
    }
}

