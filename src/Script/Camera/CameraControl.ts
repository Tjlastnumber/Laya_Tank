/*
* name;
*/
class CameraControl extends Laya.Script{

    // 当前摄像机
    private _camera: Laya.Camera;
    // 与目标的距离
    private _targetDistance: Laya.Vector3;
    // 捕捉目标
    public Target: Laya.Sprite3D;
    

    constructor(){
        super();
    }

    _initialize(owner: Laya.Sprite3D): void {
        super._initialize(owner);

        this._camera = owner as Laya.Camera;
        this._targetDistance = new Laya.Vector3();
    }

    public _start(): void {
        // 计算摄像机与目标间距离
        Laya.Vector3.subtract(this._camera.transform.position, this.Target.transform.position, this._targetDistance);
    }

    public _update (state: Laya.RenderState): void {
        super._update(state);

        this.move(state.elapsedTime);
    }

    /**
     * 摄像机移动
     * @param elapsedTime 
     */
    protected move(elapsedTime: number): void {
        var resultPos = new Laya.Vector3();
        Laya.Vector3.add(this.Target.transform.position, this._targetDistance, resultPos);
        this._camera.transform.position = resultPos;
    }
}