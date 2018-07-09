/*
* name;
*/
class CameraControl extends Laya.Script{

    _camera: Laya.Camera;
    _posSubtract: Laya.Vector3;

    public Target: Laya.Sprite3D;
    

    constructor(){
        super();
    }

    _initialize(owner: Laya.Sprite3D): void {
        super._initialize(owner);

        this._camera = owner as Laya.Camera;
        this._posSubtract = new Laya.Vector3();
    }

    public _start(): void {
         Laya.Vector3.subtract(this._camera.transform.position, this.Target.transform.position, this._posSubtract);
    }

    public _update (state: Laya.RenderState): void {
        super._update(state);

        this._move(state.elapsedTime);
    }

    private _move(elapsedTime: number): void {
        var resultPos = new Laya.Vector3();
        Laya.Vector3.add(this.Target.transform.position, this._posSubtract, resultPos);
        this._camera.transform.position = resultPos;
    }
}