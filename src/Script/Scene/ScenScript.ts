class SceneScript extends Laya.Script {
    private scene: Laya.Scene;
    /**3D摄像机**/
    public camera: Laya.Camera;
    /**用于鼠标检测的射线**/
    public RayArray: Array<Laya.Ray>;
    /**画矢量线的3D显示对象**/
    private phasorSprite3D: Laya.PhasorSpriter3D;
    
    public startPosition: Laya.Vector3;
    public endPosition: Laya.Vector3;


    constructor() {
        super()
    }
    /**
     * 覆写3D对象加载组件时执行的方法
     * @param owner 加载此组件的3D对象
     */
    public _load(owner: any): void {
        //获取脚本所属对象
        this.scene = owner;
    }
    /**
     * 覆写加载组件的3D对象实例化完成后，第一次更新时执行
     */
    public _start(state: Laya.RenderState): void {
        //创建矢量3D精灵
        this.phasorSprite3D = new Laya.PhasorSpriter3D();
        Laya.stage.on(Laya.Event.CLICK, this, this.onMouseDown);
    }

    public _update(state: Laya.RenderState): void {
        super._update(state);
    }

    /**
    * 渲染的最后阶段执行
    * @param  state 渲染状态参数。
    */
    public _postRenderUpdate(state: Laya.RenderState): void {
        if (!this.camera) {
            throw "not find camera";
        }
        // this.phasorSprite3D.begin(Laya.WebGLContext.LINES, this.camera);
        // this.RayArray.forEach(ray => {
        //     var normalize = new Laya.Vector3();
        //     Laya.Vector3.normalize(ray.direction, normalize);
        //     var endPos = new Laya.Vector3(ray.origin.x + normalize.x * 2, 0, ray.origin.z + normalize.z * 2);
        //     // 根据射线的原点绘制参考直线（为了观察方便而绘制，但矢量线并不是射线真正的路径）
        //     this.phasorSprite3D.line(ray.origin, new Laya.Vector4(0, 1, 0, 1),
        //         endPos, new Laya.Vector4(0, 0, 0, 0));
        // });
        // this.phasorSprite3D.end();
    }

    /**
     * 鼠标点击拾取
     */
    private onMouseDown(): void {
    }
}