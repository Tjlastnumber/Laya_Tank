// 程序入口
class LayaAir3D {

    _SCENE: string = "LayaScene_GameScene/GameScene.ls";
    _TANK: string = "LayaScene_tank/tank.lh";

    _scene: Laya.Scene;
    _tank: Laya.Sprite3D;

    constructor() {
        //初始化引擎
        Laya3D.init(0, 0, true);

        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;

        //开启统计信息
        Laya.Stat.show();

        Laya.loader.create([this._SCENE, this._TANK], Laya.Handler.create(this, this._sceneLoadCompleted));
    }

    _sceneLoadCompleted():void {
        this._scene = Laya.loader.getRes(this._SCENE);
        this._tank = Laya.loader.getRes(this._TANK);
        
        this._scene.addChild(this._tank);
        
        var camera: Laya.Camera = this._scene.getChildByName("Main Camera") as Laya.Camera;
        var control = camera.addComponent(CameraControl) as CameraControl;
        control.Target = this._tank;

        var tank = this._tank.getChildByName('Tank') as Laya.Sprite3D;

        var tankCollider = tank.getChildByName('TankCollider') as Laya.MeshSprite3D;
        tankCollider.addComponent(Laya.Rigidbody);

        var colliderScript = tankCollider.addComponent(ColliderScript) as ColliderScript;
        colliderScript.Tank = this._tank;

        var tankMovement = this._tank.addComponent(TankMovement) as TankMovement;
        tankMovement.Camera = camera;

        Laya.stage.addChild(this._scene);
        var sceneScript = this._scene.addScript(SceneScript) as SceneScript;
        sceneScript.camera = camera;
    }
}
new LayaAir3D();