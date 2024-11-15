//加载列车在库中停靠时所更改的部分，如客室灯，车门灯等

var bodyRawModel = ModelManager.loadPartedRawModel(Resources.manager(), Resources.idRelative("m9.obj"), null)
var bodyModelCluster = uploadModel(bodyRawModel);

//----------

function create (ctx, state, train) {
    state.matrices = new Matrices();
}

//----------

function render(ctx, state, train) {
    matrices = state.matrices;
    matrices.pushPose();
    for (let i = 0; i < train.trainCars(); i++) {
        if(train.isOnRoute()){
            }else{
            if(i % 2 == 0){
                //a部分
                ctx.drawCarModel(bodyModelCluster["ext_headlight_off"], i , matrices);
                ctx.drawCarModel(bodyModelCluster["ext_tail_light_off"], i , matrices);
                ctx.drawCarModel(bodyModelCluster["ext_running_light_on"], i , matrices);
                ctx.drawCarModel(bodyModelCluster["ext_stopping_light_off"], i , matrices);
                ctx.drawCarModel(bodyModelCluster["int_body_light_off"], i , matrices);
                matrices.popPushPose();
             }else{
                //b部分
                matrices.rotateY(Math.PI);
                ctx.drawCarModel(bodyModelCluster["ext_headlight_off"], i , matrices); 
                ctx.drawCarModel(bodyModelCluster["ext_tail_light_off"], i , matrices); 
                ctx.drawCarModel(bodyModelCluster["ext_running_light_off"], i , matrices);
                ctx.drawCarModel(bodyModelCluster["ext_stopping_light_off"], i , matrices);
                ctx.drawCarModel(bodyModelCluster["int_body_light_off"], i , matrices);
                matrices.popPushPose();
            }
        }
    }    
} 

//----------

function uploadModel(rawModels) {
    let result = {};
    for (it = rawModels.entrySet().iterator(); it.hasNext(); ) {
      entry = it.next();
      entry.getValue().applyUVMirror(false, true);
      result[entry.getKey()] = ModelManager.uploadVertArrays(entry.getValue());
    }
    return result;
}