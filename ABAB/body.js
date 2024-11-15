//abab编组形式，例：长岛铁路M9型

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
        if(i % 2 == 0){
        //单数，即为正朝向的a部分，在这里添加常加载的部分，如车身，座位等
        ctx.drawCarModel(bodyModelCluster["ext_body"], i , matrices);
        ctx.drawCarModel(bodyModelCluster["int_body"], i , matrices);
        ctx.drawCarModel(bodyModelCluster["int_furniture"], i , matrices);
        matrices.popPushPose();
        }else{
        //双数，即为反朝向的b部分，在这里添加常加载的部分，如车身，座位等
        matrices.rotateY(Math.PI);
        ctx.drawCarModel(bodyModelCluster["ext_body"], i , matrices);
        ctx.drawCarModel(bodyModelCluster["int_body"], i , matrices);
        ctx.drawCarModel(bodyModelCluster["int_furniture"], i , matrices);
        matrices.popPushPose();
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