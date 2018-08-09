/*
* name;
*/
class ControllerUI extends ui.control.ControllerUI{

    public static DOWN:boolean = false;
    public static UP:boolean = false;
    public static LEFT:boolean = false;
    public static RIGHT:boolean = false;

    constructor(touchSp: Laya.Sprite) {
        super();

        this.on(Laya.Event.MOUSE_DOWN, this, this.onKeyDown);
        this.on(Laya.Event.MOUSE_UP, this, this.onKeyUp)
    }

    private onKeyDown(e: Laya.Event) {
        console.log('down');
        switch (e.target.name) {
            case "down":
                ControllerUI.DOWN = true;
                break;
            case "up":
                ControllerUI.UP = true;
                break;
            case "left":
                ControllerUI.LEFT = true;
                break;
            case "right":
                ControllerUI.RIGHT = true;
                break;
        }
    }

    private onKeyUp(e: Laya.Event) {
        console.log('up');
        switch (e.target.name) {
            case "down":
                ControllerUI.DOWN = false;
                break;
            case "up":
                ControllerUI.UP = false;
                break;
            case "left":
                ControllerUI.LEFT = false;
                break;
            case "right":
                ControllerUI.RIGHT = false;
                break;
        }
    }

}