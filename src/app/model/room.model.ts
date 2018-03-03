export class Room {
    public roomName: string;
    public capacity: number;
    public $key: string;

    constructor(pRoomname, pCapacity) {
        this.roomName = pRoomname;
        this.capacity = pCapacity;
    }

}
