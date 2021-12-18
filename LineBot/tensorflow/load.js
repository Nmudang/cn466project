const tf = require('@tensorflow/tfjs');
const tfnode = require('@tensorflow/tfjs-node');
const path = require('path')
async function predict(data){
    try {
        const handler = tfnode.io.fileSystem(path.join(__dirname+'/trainedModel/my_model.json'));
        const model = await tf.loadLayersModel(handler);
        const predictClasses = model.predict(tf.tensor2d( [data]));
        // console.log(predictClasses.print())
        console.log((predictClasses.argMax(-1).dataSync()[0] === 0) ? 'yes' : 'no')
        return (predictClasses.argMax(-1).dataSync()[0] === 0) ? 'yes' : 'no'
    } catch(err) {
        console.log(err)
        return 'unpredictable '
    }
}
 
// console.log(predict([58.59,25.82]))
 module.exports = {
    predict
}
