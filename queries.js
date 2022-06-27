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
db.listingsAndReviews.find({}, {
    'name': 1,
    'beds': 1
}).limit(3)

// find by criteria
// the find function -- the first arg is the critera. We can specify the critera to search by
// eg. find all the listings that have beds: 2
db.listingsAndReviews.find({
    'beds': 2
}, {
    'name': 1,
    'beds': 1
}).limit(10);

// find by multiple criteria
db.listingsAndReviews.find({
    'beds': 2,
    'bathrooms': 2
}, {
    'name': 1,
    'beds': 1,
    'bathrooms': 1
}).limit(10);

// find by nested key/value pairs
// eg. show all listings in 
db.listingsAndReviews.find({
    'address.country': 'Canada'
}, {
    'address.country': 1,
    'name': 1
}).limit(10)

// find by inequality (aka comparsion operators)
// eg. find all listing that have 3 or more beds
db.listingsAndReviews.find({
    'beds': {
        '$gte': 3
    }
}, {
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
}, {
    'name': 1,
    'beds': 1
}).limit(20)

// eg. find all listings in Canada that have between 3 to 6 beds and 2 bathrooms
// and limit to the first ten results
db.listingsAndReviews.find({
    'address.country': 'Canada',
    'bathrooms': 2,
    'beds': {
        '$gte': 3,
        '$lte': 6
    }
}, {
    'address.country': 1,
    'bathrooms': 1,
    'beds': 1
}).limit(10);

// Revision
db.listingsAndReviews.find({
    'property_type': 'House'
}, {
    'name': 1,
    'address': 1,
    'property_type': 1
}).limit(10)

// find all listing where the property type is house and shows the name, the host name and the property type
db.listingsAndReviews.find({
    'property_type': 'House'
}, {
    'name': 1,
    'host.host_name': 1,
    'property_type': 1
}).limit(10);

// find all listings where the property type is house, and the host is a superhost
// show the name, the host's name, the property type and the superhost status
db.listingsAndReviews.find({
    'property_type': 'House',
    'host.host_is_superhost': true
}, {
    'name': 1,
    'host.host_name': 1,
    'host.host_is_superhost': 1,
    'property_type': 1
})

// inequality or comparsion operators ($lte, $lt, $gt, $gte, $eq etc.)
// find all listings where the property_type is house and the house response rate is > 80
db.listingsAndReviews.find({
    'property_type': 'House',
    'host.host_response_rate': {
        '$gt': 80
    },
    'beds': {
        '$gte': 4,
        '$lte': 8
    }
}, {
    'name': 1,
    'property_type': 1,
    'host.host_response_rate': 1,
    'host.host_name': 1,
    'beds': 1
})

// LOGICAL OPERATORS
// and, or, xor, xand

// by default when we have multiple criteria is a `and`
// find all listings that have at least 3 beds and are in Singapore
db.listingsAndReviews.find({
    'address.country': 'Brazil',
    'beds': {
        '$gte': 3
    }
}, {
    'address.country': 1,
    'beds': 1,
    'name': 1
})

// find all listings that are in Brazil OR have at least three beds
db.listingsAndReviews.find({
    '$or': [
        // criteria 1
        {
            'address.country': 'Brazil'
        },
        // criteria 2
        {
            'beds': {
                '$gte': 5
            }
        }
    ]
}, {
    'name': 1,
    'address.country': 1,
    'beds': 1
});

// find all listings that have >=3 beds and are in Canada, or that >= 5 beds in Brazil, and the host have response_rate of at least 90
db.listingsAndReviews.find({
    '$or': [
        // first criteria
        {
            'beds': {
                '$gte': 3
            },
            'address.country': 'Canada'
        },
        // second criteria
        {
            'beds': {
                '$gte': 5,
            },
            'address.country': 'Brazil',
            'host.host_response_rate': {
                '$gte': 90
            }
        }
    ]
}, {
    'name': 1,
    'beds': 1,
    'host.host_response_rate': 1,
    'address.country': 1
})

// if we ever need to do an AND operator, we can use $and
db.listingsAndReviews.find({
    '$and': {
        '$or': [
            {

            },
            {

            }

        ],
        '$or': [
            {

            },
            {

            }

        ]
    }
})

// concise example
db.listingsAndReviews.find({
    '$and': [
        {
            'beds': {
                '$gte': 3,
                '$lte': 6
            }
        },
        {
            'address.country': 'Canada'
        }
    ]
}, {
    'name': 1,
    'beds': 1
}).limit(20)

// Search by the values in array

// Just do check if a single value in an array
// show listings that allows smoking
db.listingsAndReviews.find({
    'amenities':'Smoking allowed'
},{
    'name': 1,
    'amenities.$':1
})

// show all listings that have both Oven and Kitchen -- $all
// $[] - postional operator all --  $[] represent the indexes that matches the critera
db.listingsAndReviews.find({
    'amenities': {
        '$all': ['Oven', 'Kitchen']
    }
},{
    'name': 1   
})

// show all listings where it an array matches just ONE of the possible values
// use $in
db.listingsAndReviews.find({
    'amenities': {
        '$in':['Dog(s)', "Cat(s)", "Pets allowed", "Pets live on this property"]
    }
},{
    'name': 1,
    'amenities': 1
})

// show all listings where the array DOES NOT HAVE any of the listed values
db.listingsAndReviews.find({
    'amenities': {
        '$nin':['Dog(s)', "Cat(s)", "Pets allowed", "Pets live on this property"]
    }
},{
    'name': 1,
    'amenities': 1
})

