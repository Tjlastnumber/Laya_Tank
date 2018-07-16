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

    /**
     * 射线
     */
    _ray:Laya.Ray;

    /**
     * 碰撞信息
     */
    _outHitInfo:Laya.RaycastHit;

    public camera: Laya.Camera;

    private phasorSprite3D:Laya.PhasorSpriter3D;

    constructor() {
        super();
        this._ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, -2, 0));
        this._outHitInfo = new Laya.RaycastHit();
        this.phasorSprite3D = new Laya.PhasorSpriter3D();
    }

    public _initialize(owner: Laya.Sprite3D): void {
        super._initialize(owner);
        this._tank = owner as Laya.Sprite3D;
    }

    public _update(state: Laya.RenderState): void {
        super._update(state);
        this.move(state.elapsedTime);
        this.trun(state.elapsedTime);

        // this.phasorSprite3D.begin(Laya.WebGLContext.LINES, this.camera);
        // var tankPos = new Laya.Vector3(this._tank.transform.position.x, 0, this._tank.transform.position.z);
        // var pos = new Laya.Vector3(this._ray.origin.x + 100, this._ray.origin.y, this._ray.origin.z + 100);
        // this.phasorSprite3D.line(this._ray.origin, new Laya.Vector4(1, 0, 0, 1), pos, new Laya.Vector4(1, 0, 0, 1));
        // console.log(pos.x + ',' + pos.y + ',' + pos.z);
        // console.log(this._ray.direction.x + ',' + this._ray.direction.y + ',' + this._ray.direction.z);
        // this.phasorSprite3D.end();
    }

    /**
     * 坦克移动
     * @param elapsedTime 
     */
    protected move(elapsedTime: number): void {
        var forward = this._getVerticalForce(elapsedTime);
                      
        var x = this._tank.transform.forward.x * this._moveSpeed * elapsedTime / 1000 * forward;
        var y = this._tank.transform.forward.y * this._moveSpeed * elapsedTime / 1000 * forward;
        var z = this._tank.transform.forward.z * this._moveSpeed * elapsedTime / 1000 * forward;

        var offset = new Laya.Vector3(x, y, z);

        if (this._collision(offset)) return;

        this._tank.transform.translate(offset, false);
    }

    /**
     * 坦克旋转
     * @param elapsedTime 
     */
    protected trun(elapsedTime: number): void {
        var forward = this._getHorizontalForce(elapsedTime);

        var turn:number = forward * this._trunSpeed * elapsedTime / 1000;

        var turnQuaternion: Laya.Quaternion = new Laya.Quaternion(0, turn, 0);

        this._tank.transform.rotate(new Laya.Vector3(turnQuaternion.x, turnQuaternion.y, turnQuaternion.z), true, false);
    }


    private _collision(offset: Laya.Vector3) {
        //射线原点
        var rayOrigin:Laya.Vector3 = new Laya.Vector3(0,0,0);
        //根据角色位置计算射线原点
        Laya.Vector3.add(this._tank.transform.position, new Laya.Vector3(offset.x, 1, offset.z), rayOrigin);
        //射线原点位置更新
        this._ray.origin = rayOrigin;

        this._ray.direction = new Laya.Vector3(this._tank.transform.forward.x * -1, -0.5, this._tank.transform.forward.z * -1);

        Laya.Physics.rayCast(this._ray, this._outHitInfo, 1.5);

        return this._outHitInfo.distance > 0;
    }

    private _verticalForceValue = 0;
    /**
     * 获取前进后退按键力度
     * @param elapsedTime 
     */
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
    /**
     * 获取转向按键力度
     * @param elapsedTime 
     */
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