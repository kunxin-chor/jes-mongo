// show databases
show databases;

// set our current active database
use sample_airbnb;

// see all the collections in the current active database
show collections;

// QUERIES
// db.<name of collection>.find()
db.listingsAndReviews.find()

// limit the number of results
// ...limit to to the first ten results
db.listingsAndReviews.find().limit(10);

// projection: show only specified key/value pairs from the documents
// ... show only name and number of beds
db.listingsAndReviews.find({},{
    'name': 1,
    'beds': 1
}).limit(3)

// find by criteria
// the find function -- the first arg is the critera. We can specify the critera to search by
// eg. find all the listings that have beds: 2
db.listingsAndReviews.find({
    'beds': 2
},{
    'name': 1,
    'beds': 1
}).limit(10);

// find by multiple criteria
db.listingsAndReviews.find({
    'beds': 2,
    'bathrooms': 2
},{
    'name': 1,
    'beds': 1,
    'bathrooms': 1
}).limit(10);

// find by nested key/value pairs
// eg. show all listings in 
db.listingsAndReviews.find({
    'address.country':'Canada'
},{
    'address.country': 1,
    'name':1
}).limit(10)

// find by inequality (aka comparsion operators)
// eg. find all listing that have 3 or more beds
db.listingsAndReviews.find({
    'beds': {
        '$gte':3
    }
},{
    'name': 1,
    'beds': 1
}).limit(10);
// $lte : lesser than or equal
// $lt : lesser than
// $gt: greater than
// $gte: greater than or equal
// $eq: equal
// $ne: not equal

// eg. find listings that have between 3 to 6 beds
db.listingsAndReviews.find({
    'beds': {
        '$gte': 3,
        '$lte': 6
    }
},{
    'name': 1,
    'beds': 1
}).limit(20)

// eg. find all listings in Canada that have between 3 to 6 beds and 2 bathrooms
// and limit to the first ten results
db.listingsAndReviews.find({
    'address.country':'Canada',
    'bathrooms': 2,
    'beds': {
        '$gte': 3,
        '$lte': 6
    }
},{
    'address.country': 1,
    'bathrooms': 1,
    'beds': 1
}).limit(10);