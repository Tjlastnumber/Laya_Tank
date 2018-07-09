/*
* name;
*/
class TankMovement extends Laya.Script {
    _moveSpeed: number = 12;
    _trunSpeed: number = 180;
    _tank: Laya.Sprite3D;

    constructor() {
        super();
    }

    public _initialize(owner: Laya.Sprite3D): void {
        super._initialize(owner);
        this._tank = owner as Laya.Sprite3D;
    }

    public _update(state: Laya.RenderState): void {
        super._update(state);
        this.move(state.elapsedTime);
        this.trun(state.elapsedTime);

    }

    protected move(elapsedTime: number): void {

        // var forward = Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.W) ? -1 : 
        //               Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.S) ? 1 : 0;
        // var forward = this.getVerticalForce(elapsedTime);
        var forward = this._getVerticalForce(elapsedTime);
                      
        var x = this._tank.transform.forward.x * this._moveSpeed * elapsedTime / 1000 * forward;
        var y = this._tank.transform.forward.y * this._moveSpeed * elapsedTime / 1000 * forward;
        var z = this._tank.transform.forward.z * this._moveSpeed * elapsedTime / 1000 * forward;

        var movement = new Laya.Vector3(x, y, z);
        this._tank.transform.translate(movement, false);
    }

    protected trun(elapsedTime: number): void {
        // var forward = Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.A) ? 1 :
        //               Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.D) ? -1 : 0;
        var forward = this._getHorizontalForce(elapsedTime);

        var turn:number = forward * this._trunSpeed * elapsedTime / 1000;

        var turnQuaternion: Laya.Quaternion = new Laya.Quaternion(0, turn, 0);

        this._tank.transform.rotate(
            new Laya.Vector3(turnQuaternion.x, turnQuaternion.y, turnQuaternion.z), true, false);
    }

    private _verticalForceValue = 0;
    private _getVerticalForce(elapsedTime: number): number {
        if (Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.S)) {
            this._verticalForceValue = this._verticalForceValue + 1 / elapsedTime >= 1 ?
                1 :
                this._verticalForceValue + 1 / elapsedTime;
        }
        else if (Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.W)) {
            this._verticalForceValue = this._verticalForceValue - 1 / elapsedTime <= -1 ?
                -1 :
                this._verticalForceValue - 1 / elapsedTime;
        } else {
            if (this._verticalForceValue > 0) {
                this._verticalForceValue = this._verticalForceValue - 1 / elapsedTime <= 0 ?
                    0 :
                    this._verticalForceValue - 1 / elapsedTime;
            } else {
                this._verticalForceValue = this._verticalForceValue + 1 / elapsedTime >= 0 ?
                    0 :
                    this._verticalForceValue + 1 / elapsedTime;
            }
        }
        return this._verticalForceValue;
    }

    private _horizontalForceValue = 0;
    private _getHorizontalForce(elapsedTime: number): number {
        if (Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.A)) {
            this._horizontalForceValue = this._horizontalForceValue + 1 / elapsedTime >= 1 ?
                1 :
                this._horizontalForceValue + 1 / elapsedTime;
        }
        else if (Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.D)) {
            this._horizontalForceValue = this._horizontalForceValue - 1 / elapsedTime <= -1 ?
                -1 :
                this._horizontalForceValue - 1 / elapsedTime;
        } else {
            if (this._horizontalForceValue > 0) {
                this._horizontalForceValue = this._horizontalForceValue - 1 / elapsedTime <= 0 ?
                    0 :
                    this._horizontalForceValue - 1 / elapsedTime;
            } else {
                this._horizontalForceValue = this._horizontalForceValue + 1 / elapsedTime >= 0 ?
                    0 :
                    this._horizontalForceValue + 1 / elapsedTime;
            }
        }
        return this._horizontalForceValue;

    }
}