class SceneScript extends Laya.Script {
    private scene: Laya.Scene;
    /**3D摄像机**/
    public camera: Laya.Camera;
    /**用于鼠标检测的射线**/
    public ray: Laya.Ray;
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
        //创建一条射线
        // this.ray = new Laya.Ray(new Laya.Vector3(), new Laya.Vector3());
        //创建矢量3D精灵
        this.phasorSprite3D = new Laya.PhasorSpriter3D();
        // Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        Laya.stage.on(Laya.Event.CLICK, this, this.onMouseDown);
        // Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        // Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
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
        //画参考线
        //根据鼠标屏幕2D座标修改生成射线数据 
        // this.camera.viewportPointToRay(new Laya.Vector2(Laya.stage.mouseX,Laya.stage.mouseY),ray);
        // this.camera.viewportPointToRay(new Laya.Vector2(Laya.MouseManager.instance.mouseX, Laya.MouseManager.instance.mouseY), this.ray);
        //射线检测，最近物体碰撞器信息，最大检测距离为300米，默认检测第0层
        // Laya.Physics.rayCast(this.ray, this.rayCastHit, 300);
        //摄像机位置
        // var position: Laya.Vector3 = new Laya.Vector3(this.camera.position.x,
        //     0, this.camera.position.z);
        //开始绘制矢量3D精灵，类型为线型

        var angle = Math.atan2(this.ray.direction.z , this.ray.direction.x);
        var x = Math.cos(angle) * 1.5;
        var z = Math.sin(angle) * 1.5;
        var endPos = new Laya.Vector3(this.ray.origin.x + x, -0.5, this.ray.origin.z + z);
        this.phasorSprite3D.begin(Laya.WebGLContext.LINES, this.camera);
        // 根据射线的原点绘制参考直线（为了观察方便而绘制，但矢量线并不是射线真正的路径）
        this.phasorSprite3D.line(this.ray.origin, new Laya.Vector4(1, 0, 0, 1),
            endPos, new Laya.Vector4(0, 0, 0, 0));
        //如果与物品相交,画三面边线
        // if (this.rayCastHit.sprite3D) {
            //从碰撞信息中获取碰撞处的三角面顶点
            // var trianglePositions:Array<any>= this.rayCastHit.trianglePositions;
            // var pos = this.rayCastHit.position;
            // //矢量绘制三角面边线
            // this.phasorSprite3D.line(trianglePositions[0], new Laya.Vector4(1,0,0,1), 
            //                     trianglePositions[1], new Laya.Vector4(1,0,0,1));
            // this.phasorSprite3D.line(trianglePositions[1], new Laya.Vector4(1,0,0,1), 
            //                     trianglePositions[2], new Laya.Vector4(1,0,0,1));
            // this.phasorSprite3D.line(trianglePositions[2], new Laya.Vector4(1,0,0,1),
            //                     trianglePositions[0], new Laya.Vector4(1,0,0,1));
                            
        // }
        //结束绘制
            // console.log('----------------------------')
            // console.log(this.ray.origin.x + ',' + this.ray.origin.y + ',' + this.ray.origin.z);
            // console.log(this.endPosition.x + ',' + this.endPosition.y + ',' + this.endPosition.z)
            // console.log('---------- end -------------')
        this.phasorSprite3D.end();
    }

    /**
     * 鼠标点击拾取
     */
    private onMouseDown(): void {
        //如果碰撞信息中的模型不为空,删除模型
        // if (this.rayCastHit.sprite3D) {
        //     var parent = this.rayCastHit.sprite3D.parent as Laya.Sprite3D;
        //     var target = parent.getComponentByType(CardScript) as CardScript;
        //     if (target != null) {
        //         target.Select();
        //     }
        // }     
    }
}