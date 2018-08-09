
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.control {
    export class ControllerUI extends View {

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"top":0,"right":0,"renderType":"mask","left":0,"bottom":0,"alpha":0.5},"child":[{"type":"Image","props":{"width":80,"skin":"comp/arrow.png","name":"down","mouseEnabled":true,"left":50,"height":100,"bottom":50}},{"type":"Image","props":{"width":80,"skin":"comp/arrow.png","rotation":-180,"pivotY":50,"pivotX":40,"name":"up","mouseEnabled":true,"left":50,"height":100,"bottom":200}},{"type":"Image","props":{"width":80,"skin":"comp/arrow.png","rotation":90,"right":200,"pivotY":50,"pivotX":40,"name":"left","mouseEnabled":true,"height":100,"bottom":50}},{"type":"Image","props":{"width":80,"skin":"comp/arrow.png","rotation":-90,"right":50,"pivotY":50,"pivotX":40,"name":"right","mouseEnabled":true,"height":100,"bottom":50}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.control.ControllerUI.uiView);

        }

    }
}
