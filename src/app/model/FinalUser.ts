/**
 * Created by hoangdaoduc on 11/8/17.
 */
export class FinalUser {
    public index: number;
    public SBD: string;
    public STT: number;
    public ho: string;
    public ten: string;
    public lopnc: string;
    public sdt: string;
    public phongthi: string;
    public cathi: string;
    public cachnhap: string;
    public Email: string;

    public get hoten(): string {
        return this.ho + ' ' + this.ten;
    }
    public get searchKey(): string {
        return this.hoten + this.lopnc;
    }



    constructor(user: any) {
        this.index = user.$key;
        this.SBD = user.SBD;
        this.STT = user.STT;
        this.ho = user.ho;
        this.ten = user.ten;
        this.lopnc = user.lopnc;
        this.sdt = user.sdt;
        this.phongthi = user.phongthi;
        this.cathi = user.cathi;
        this.cachnhap = user.cachnhap;
        this.Email = user.Email;
    }
}

