const db = require("../models");
const order = db.orders;
const auto = db.auto;
const QRCode = require('qrcode')

exports.addOrder = (req, res) => {
    auto.update({
        rest: req.body.rest-1
    },
    {
        where:{
            id: req.body.autoId
        }
    })
    let code=String(req.userId)+String(req.body.autoId);
    let pathToSave='./dist/qr/'+code+'.png';
    QRCode.toFile(pathToSave, code);
    order.create({
        userId: req.userId,
        autoId: req.body.autoId,
        status: req.body.status,
        qrcode: pathToSave
        }).catch(err=> res.send(err));
        res.send({success:"Заказ успешно оформлен"})
};

exports.updateOrder = (req, res) => {
    let rest= req.body.rest+1;
    auto.update({
         rest: rest
    },
    {
        where:{
            id: req.body.autoId
                }
    })
    order.update(
        {
            status: req.body.status
        },
        {
            where: 
            {
                id: req.body.orderId
            }
        }
    ).catch(err=>resolve(err)).then(res.send({success:"Заказ успешно изменён"}));

}
// exports.deleteOrder = (req, res) => {
//     order.destroy(
//         {
//             where: 
//             {
//                 id: req.body.orderId
//             }
//         }
//     ).catch(err=>res.send(err)).then(res.send({success:"Заказ успешно удалён"}));

// }
