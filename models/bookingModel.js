const mongoose = require('mongoose');


// {
//     _id: ObjectId,
//     user : { type: ObjectId, ref: 'User' },
//     flight : { type: ObjectId, ref: 'Flight' }
// }

const BookingSchema = mongoose.Schema({
    user: { type: "ObjectId", ref: 'users' },
    flight: [{ type: "ObjectId", ref: 'flights' }]
})

const BookingModel = mongoose.model("booking", BookingSchema);

module.exports = {
    BookingModel,
}