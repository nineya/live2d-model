const {readJson, writeJson, relativePath, transformModel, transformPhysics, transformPose, transformTextures, transformMotions, transformExpressions} = require("../utils")
const config = require('../config.json')

const textures = ["shizuku-48/", "shizuku-pajama/"]

exports.build = function (modelId, modelPath, message) {
    let apiModelPath = config.apiHome + modelId + "-";
    let textureNum = textures.length
    for (let i = 0; i < textureNum; i++) {
        let texture = textures[i]
        let indexJson = readJson(modelPath + texture + config.indexFile)
        let relativeDistPath = relativePath(config.apiHome, modelPath + texture)
        // 处理路径
        transformModel(relativeDistPath, indexJson)
        transformPhysics(relativeDistPath, indexJson)
        transformPose(relativeDistPath, indexJson)
        transformTextures(relativeDistPath, indexJson)
        transformMotions(relativeDistPath, indexJson)
        transformExpressions(relativeDistPath, indexJson)
        writeJson(indexJson, apiModelPath + i + ".json")
    }
    writeJson({id: modelId, name: modelPath, message: message}, apiModelPath + "model.json")
    return textureNum;
}