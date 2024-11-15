//加载列车在行驶过程中更改的部分，如客室灯，车门灯等

var bodyRawModel = ModelManager.loadPartedRawModel(Resources.manager(), Resources.idRelative("m9.obj"), null)
var bodyModelCluster = uploadModel(bodyRawModel);

//----------

function create (ctx, state, train) {
    state.matrices = new Matrices();
}

//----------

function render(ctx, state, train) {
    let matrices = state.matrices;
    matrices.pushPose();

    for (let i = 0; i < train.trainCars(); i++) {
        if (train.isOnRoute()) {
            if (i == 0 && train.isReversed()) { //头车在后，亮尾灯
                ctx.drawCarModel(bodyModelCluster["ext_headlight_off"], i, matrices);
                ctx.drawCarModel(bodyModelCluster["ext_tail_light_on"], i, matrices);
                ctx.drawCarModel(bodyModelCluster["int_body_light_on"], i , matrices);
                ctx.drawCarModel(bodyModelCluster["int_furniture_light_on"], i , matrices);
            } else if (i == train.trainCars() - 1 && train.isReversed()) { //尾车在前，亮头灯
                matrices.rotateY(Math.PI);
                ctx.drawCarModel(bodyModelCluster["ext_headlight_on"], i, matrices);
                ctx.drawCarModel(bodyModelCluster["ext_tail_light_off"], i, matrices);
                ctx.drawCarModel(bodyModelCluster["int_body_light_on"], i , matrices);
                ctx.drawCarModel(bodyModelCluster["int_furniture_light_on"], i , matrices);
                matrices.popPushPose();
            } else if (i == 0) { //头车在前，亮头灯
                ctx.drawCarModel(bodyModelCluster["ext_headlight_on"], i, matrices);
                ctx.drawCarModel(bodyModelCluster["ext_tail_light_off"], i, matrices);
                ctx.drawCarModel(bodyModelCluster["int_body_light_on"], i , matrices);
                ctx.drawCarModel(bodyModelCluster["int_furniture_light_on"], i , matrices);
            } else if (i == train.trainCars() - 1) { //尾车在后，亮尾灯
                matrices.rotateY(Math.PI);
                ctx.drawCarModel(bodyModelCluster["ext_headlight_off"], i, matrices);
                ctx.drawCarModel(bodyModelCluster["ext_tail_light_on"], i, matrices);
                ctx.drawCarModel(bodyModelCluster["int_body_light_on"], i , matrices);
                ctx.drawCarModel(bodyModelCluster["int_furniture_light_on"], i , matrices);
                matrices.popPushPose();
            } else {
                if (i % 2 === 0) { // 双数中间车，什么都不亮
                ctx.drawCarModel(bodyModelCluster["ext_headlight_off"], i, matrices);
                ctx.drawCarModel(bodyModelCluster["ext_tail_light_off"], i, matrices);
                ctx.drawCarModel(bodyModelCluster["int_body_light_on"], i , matrices);
                ctx.drawCarModel(bodyModelCluster["int_furniture_light_on"], i , matrices);
            } else { // 单数中间车，什么都不亮
                matrices.rotateY(Math.PI);
                ctx.drawCarModel(bodyModelCluster["ext_headlight_off"], i, matrices);
                ctx.drawCarModel(bodyModelCluster["ext_tail_light_off"], i, matrices);
                ctx.drawCarModel(bodyModelCluster["int_body_light_on"], i , matrices);
                ctx.drawCarModel(bodyModelCluster["int_furniture_light_on"], i , matrices);
                matrices.popPushPose();
                }
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