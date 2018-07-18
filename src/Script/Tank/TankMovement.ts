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
     * 射线队列
     */
    RayArray: Array<Laya.Ray>;

    RayForward: Array<Laya.Vector3> = new Array<Laya.Vector3>();
    /**
     * 射线1
     */
    _ray1:Laya.Ray;
    /**
     * 射线2
     */
    _ray2:Laya.Ray;
    /**
     * 射线3
     */
    _ray3:Laya.Ray;
    /**
     * 射线4
     */
    _ray4:Laya.Ray;

    /**
     * 碰撞盒8个定点坐标
     */
    _boxColliderCorners: Array<Laya.Vector3>;

    /**
     * 碰撞信息
     */
    _outHitInfo:Laya.RaycastHit;

    public BoxCollider: Laya.BoxCollider;

    public Camera: Laya.Camera;

    private phasorSprite3D:Laya.PhasorSpriter3D;

    constructor() {
        super();
        this._ray1 = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, -2, .1));
        this._ray2 = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, -2, -.1));
        this._ray3 = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, -2, -.1));
        this._ray4 = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, -2, .1));
        this.RayArray = new Array<Laya.Ray>();
        this.RayArray.push(this._ray1);
        this.RayArray.push(this._ray2);
        this.RayArray.push(this._ray3);
        this.RayArray.push(this._ray4);

        this._boxColliderCorners = [
            new Laya.Vector3(),
            new Laya.Vector3(),
            new Laya.Vector3(),
            new Laya.Vector3(),
            new Laya.Vector3(),
            new Laya.Vector3(),
            new Laya.Vector3(),
            new Laya.Vector3()
        ];

        this._outHitInfo = new Laya.RaycastHit();
        this.phasorSprite3D = new Laya.PhasorSpriter3D();
    }

    public _initialize(owner: Laya.Sprite3D): void {
        super._initialize(owner);
        this._tank = owner as Laya.Sprite3D;
        var tank = this._tank.getChildByName('Tank') as Laya.Sprite3D;
        this.BoxCollider = tank.getComponentByType(Laya.BoxCollider) as Laya.BoxCollider;

        this.BoxCollider.boundBox.getCorners(this._boxColliderCorners);
        this.RayArray.forEach((ray,index) => {
            ray.origin = this._boxColliderCorners[index];
            var angleForward = new Laya.Vector3();
            Laya.Vector3.subtract(ray.origin, this._tank.transform.position, angleForward);
            this.RayForward.push(angleForward);
        });

        tank.removeComponentByType(Laya.BoxCollider);
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
        var result = [];
        //射线原点位置更新
        this.RayArray.forEach((ray, index) => {
            var newOrigin = new Laya.Vector3(0, 0, 0);
            Laya.Vector3.add(this._tank.transform.position, this.RayForward[index], newOrigin);
            Laya.Vector3.add(newOrigin, new Laya.Vector3(offset.x, 2, offset.z), newOrigin);
            ray.origin = newOrigin;
            Laya.Physics.rayCast(ray, this._outHitInfo, 2);
            if (this._outHitInfo.distance > 0) console.log(this._outHitInfo.sprite3D.name);
            result.push(this._outHitInfo.distance > 0);
        })

        return result.some(p => p);
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