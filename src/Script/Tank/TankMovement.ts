/*
* name;
*/
class TankMovement extends Laya.Script {
    /**
     * 移动速率
     */
    _moveSpeed: number = 12;
    /**
     * 转向速率
     */
    _trunSpeed: number = 180;
    /**
     * 当前坦克对象
     */
    _tank: Laya.Sprite3D;
    _tankCollider: Laya.MeshSprite3D;
    _colliderScript: ColliderScript;
    _colliderLocalPos: Laya.Vector3 = new Laya.Vector3();
 
    public Camera: Laya.Camera;
    public isMove: Boolean = true;

    constructor() {
        super();
    }

    public _initialize(owner: Laya.Sprite3D): void {
        super._initialize(owner);
        this._tank = owner as Laya.Sprite3D;
        this._tankCollider = this._tank.getChildByName("Tank").getChildByName('TankCollider') as Laya.MeshSprite3D;
        this._colliderScript = this._tankCollider.getComponentByType(ColliderScript) as ColliderScript;
    }

    public _update(state: Laya.RenderState): void {
        super._update(state);
        this.move(state.elapsedTime);
        this.trun(state.elapsedTime);
    }

    /**
     * 坦克移动
     * @param elapsedTime 
     */
    protected move(elapsedTime: number): void {
        var force = this._getVerticalForce(elapsedTime);
                      
        var x = this._tank.transform.forward.x * this._moveSpeed * elapsedTime / 1000 * force;
        var y = this._tank.transform.forward.y * this._moveSpeed * elapsedTime / 1000 * force;
        var z = this._tank.transform.forward.z * this._moveSpeed * elapsedTime / 1000 * force;

        var offset = new Laya.Vector3(x, y, z);

        this._colliderScript.movePosition(this._tank, offset);
    }

    /**
     * 坦克旋转
     * @param elapsedTime 
     */
    protected trun(elapsedTime: number): void {
        var force = this._getHorizontalForce(elapsedTime);

        var turn:number = force * this._trunSpeed * elapsedTime / 1000;

        var turnQuaternion: Laya.Quaternion = new Laya.Quaternion(0, turn, 0);

        this._tank.transform.rotate(new Laya.Vector3(turnQuaternion.x, turnQuaternion.y, turnQuaternion.z), true, false);
    }

    private _verticalForceValue = 0;
    /**
     * 获取前进后退按键力度
     * @param elapsedTime 
     */
    private _getVerticalForce(elapsedTime: number): number {
        // if (Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.S)) {
        if (ControllerUI.DOWN) {
            this._verticalForceValue = this._verticalForceValue + 1 / elapsedTime >= 1 ?
                this._verticalForceValue :
                this._verticalForceValue + 1 / elapsedTime;
        }
        else if (ControllerUI.UP) {
        // else if (Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.W)) {
            this._verticalForceValue = this._verticalForceValue - 1 / elapsedTime <= -1 ?
                this._verticalForceValue :
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
    /**
     * 获取转向按键力度
     * @param elapsedTime 
     */
    private _getHorizontalForce(elapsedTime: number): number {
        // if (Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.A)) {
        if (ControllerUI.LEFT) {
            this._horizontalForceValue = this._horizontalForceValue + 1 / elapsedTime >= 1 ?
                1 :
                this._horizontalForceValue + 1 / elapsedTime;
        }
        // else if (Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.D)) {
        else if (ControllerUI.RIGHT) {
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