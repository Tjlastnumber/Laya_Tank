class ColliderScript extends Laya.Script {
    _owner: Laya.MeshSprite3D;
    _tankMovement: TankMovement;

    Tank: Laya.Sprite3D;

    private _color: Laya.Vector4 = new Laya.Vector4(1, 0, 0, 1);
    private _tempColor1: Laya.Vector4 = new Laya.Vector4(2.5, 2.5, 2.5, 1);
    private _tempColor2: Laya.Vector4 = new Laya.Vector4(0.4, 0.4, 0.4, 1);
    public IsCollision: Boolean = false;

    constructor() {
        super();
    }

    _initialize(owner: Laya.Sprite3D): void {
        super._initialize(owner);

        this._owner = owner as Laya.MeshSprite3D;
    }

    _update(state: Laya.RenderState) {
    }

    public onTriggerEnter(other: Laya.Collider): void {
        super.onTriggerEnter(other);
        // var mat:any = (other.owner as Laya.MeshSprite3D).meshRender.material;
        // Laya.Vector4.multiply(mat.albedoColor, this._tempColor1, this._color);
        // mat.albedoColor = new Laya.Vector4(this._color.x, this._color.y, this._color.z, this._color.w);
    }

    public onTriggerExit(other: Laya.Collider): void {
        super.onTriggerExit(other);
        // var mat:any = (other.owner as Laya.MeshSprite3D).meshRender.material;
        // Laya.Vector4.multiply(mat.albedoColor, this._tempColor2, this._color);
        // mat.albedoColor = new Laya.Vector4(this._color.x, this._color.y, this._color.z, this._color.w);

        this.IsCollision = false;
    }

    public onTriggerStay(other: Laya.Collider): void {
        super.onTriggerStay(other);
        this.IsCollision = true;
    }

    private _offset: Laya.Vector3 = Laya.Vector3.ZERO;
    public movePosition(mover: Laya.Sprite3D, offset: Laya.Vector3) {
        if (!this.IsCollision) {
            mover.transform.position.cloneTo(this._offset);
        } else {
            this._offset.cloneTo(mover.transform.position);
        }
        mover.transform.translate(offset, false);
    }
}