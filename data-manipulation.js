// to create a database -- we just assume the database exists
use food-reviews; 

// the new database is only created when a document is added to it
// to create a new collection, we just attempt to add to the collection as if it exists
// for example, to add a new review to the reviews collection (whether it exists or not), we just do:
db.reviews.insertOne({
    'title':'Tian Tian is the best chicken rice in Singapore',
    'food':'Chicken Rice',
    'cuisine':'chinese',
    'ratings': 9.5
})

db.reviews.insertOne({
    'title':'Best roti prata in Singapore',
    'food':'Roti Prata',
    'cuisine':'Indian',
    'ratings': 8.5
})

db.reviews.insertMany([
    {
        'title':'Kaya bread is overpriced',
        'food':'BreadTalk Kaya Bread',
        'cuisine':'chinese',
        'ratings':5.5
    },
    {
        'title':'Western food cheap and good',
        'food':'Colins Grills',
        'cuisine':'western',
        'ratings':7
    }
])

// UPDATE
db.reviews.updateOne({
    // first arg: select the document to be updated
    '_id': ObjectId('62b99fbd1f66babab3c7b06a')
},{
    // how to update the document (i.e, what fields to change)
    '$set':{
        'ratings':9.5
    }
})

// Update many at one go
db.reviews.updateMany({
    'cuisine':'chinese'
},{
    // $inc is for increment
    '$inc': {
        'ratings':0.5
    }
})

// DELETE
db.reviews.deleteOne({
    '_id':ObjectId('62b99fbd1f66babab3c7b06a')
})

// DELETE MANY
db.reviews.deleteMany({
    'cuisine':'chinese'
})

db.restaurants.insertOne({
    'name':'Tian Tian Chicken Rice',
    'tags':['hawker', 'cheap', 'chinese']
})

// how do add a new value to an array:
db.restaurants.updateOne({
    '_id':ObjectId('62b9a39d1f66babab3c7b06d')    
},{
    '$push':{
        'tags':'chicken'
    }
})

// remove a value from an array
db.restaurants.updateOne({
    '_id':ObjectId('62b9a39d1f66babab3c7b06d')
},{
    '$pull':{
        'tags':'cheap'
    } // remove the `cheap` from the tags array
})

// add in an embedded document
db.restaurants.updateOne({
    '_id':ObjectId('62b9a39d1f66babab3c7b06d'),    
},{
    '$push':{
        'menu':{
            '_id': ObjectId(), // ObjectId() will return a new random id
            'name':'White chicken thighs',
            'cost': 300
        }
    }
})

db.restaurants.updateOne({
    '_id':ObjectId('62b9a39d1f66babab3c7b06d')
},{
    '$push':{
        'menu': {
            '$each':[
                {
                    '_id': ObjectId(),
                    'name':'Braised eggs',
                    'cost':20
                },
                {
                    '_id':ObjectId(),
                    'name':'Char Siew',
                    'cost':300
                }
            ]
        }
    }
})

// change the cost of the charsiew to 500
db.restaurants.updateOne({
    '_id':ObjectId('62b9a39d1f66babab3c7b06d'), // <= select the main document
    'menu._id':ObjectId('62b9a65b1f66babab3c7b071')
},{
    '$set': {
        'menu.$.cost': 400 // the $ operator (positional operator) contains the index of the matched element
    }
})

// UPDATE MANY SUB-DOCUMENTS AT ONE GO
db.restaurants.updateOne({
    '_id':ObjectId('62b9a39d1f66babab3c7b06d'),
},{
    '$set':{
        'menu.$[m].cost':0
    }
},{
    'arrayFilters':[
        {
            'm.cost':{
                '$gte': 200
            }
        }
    ]
})