export class Section {
    public sectionName: string;
    public numberAttend: number;
    public maxSection: number;
    public $key: string;

    public get hidePhoneNumber(): string {
        return 'ok';

    }

    constructor(sectioname: string, numberattend: number, maxSection: number) {
        this.sectionName = sectioname;
        this.numberAttend = numberattend;
        this.maxSection = maxSection;
    }


}
