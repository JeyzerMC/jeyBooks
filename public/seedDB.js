var mongoose = require("mongoose"),
    Books = require("../models/bookModel");

var dataSeeder = [{
        name: "Harry Potter",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "http://prodimage.images-bn.com/pimages/9780545139700_p0_v4_s1200x630.jpg",
        price: "15",
        availability: "Available"
    },
    {
        name: "Eragon",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "https://upload.wikimedia.org/wikipedia/en/c/ce/Eragon_book_cover.png",
        price: "20",
        availability: "Sold out"
    },
    {
        name: "Sherlock",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "http://dyn4.media.titanbooks.com/products/4522/SH_THE%20WAR-1.jpg",
        price: "20",
        availability: "Available"
    },
    {
        name: "Dofus",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "http://www.mangagate.com/ressources/images/couverture/autre/dofus-volume-1.jpg",
        price: "15",
        availability: "Sold out"
    },
    {
        name: "Java",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "http://ecx.images-amazon.com/images/I/41cyVNDV8CL._SX370_BO1,204,203,200_.jpg",
        price: "50",
        availability: "Available"
    },
    {
        name: "Physics",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "http://www.saha.ac.in/theory/palashbaran.pal/books/partphys/cover.jpg",
        price: "60",
        availability: "Available"
    },
];


function seedDB() {
    console.log("Database seeder activated");

    Books.remove({}, function(err){
        if(err){
            console.log(err);
            return;
        }

        console.log("Reset phase: Database cleansed");

        dataSeeder.forEach(function(dummyData){
            Books.create(dummyData, function(err, dummyBook){
                if(err){
                    console.log(err);
                    return;
                }
                console.log("Dummy data added");
            });
        });
        
        console.log("Database seeding phase finished with no error");
    });

}


module.exports = seedDB;