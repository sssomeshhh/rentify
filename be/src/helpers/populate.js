import {bcr} from "./imports.js";
import { Property, User } from "./schemas.js";

const evalPopulate = async () => {
    let sellerId;
    await User.create({
        firstName: 'Seller',
        lastName: 'User',
        email: 'seller.user@email.com',
        phoneNumber: '97531',
        password: await bcr.hash('Seller.User.97531', 10),
        role: 'seller'
    }).then((seller) => {
        sellerId = seller._id.toString();
    });
    await User.create({
        firstName: 'Buyer',
        lastName: 'User',
        email: 'buyer.user@email.com',
        phoneNumber: '86420',
        password: await bcr.hash('Buyer.User.86420', 10),
        role: 'buyer'
    });
    await Property.create({
        title: 'P1.Title',
        description: 'P1.Description',
        location: 'L.A',
        bedrooms: 1,
        bathrooms: 1,
        rent: 1000,
        seller: sellerId
    });
    await Property.create({
        title: 'P2.Title',
        description: 'P2.Description',
        location: 'L.B',
        bedrooms: 2,
        bathrooms: 2,
        rent: 2000,
        seller: sellerId
    });
    await Property.create({
        title: 'P3.Title',
        description: 'P3.Description',
        location: 'L.C',
        bedrooms: 3,
        bathrooms: 3,
        rent: 3000,
        seller: sellerId
    });
    await Property.create({
        title: 'P4.Title',
        description: 'P4.Description',
        location: 'L.D',
        bedrooms: 4,
        bathrooms: 4,
        rent: 4000,
        seller: sellerId
    });
    await Property.create({
        title: 'P5.Title',
        description: 'P5.Description',
        location: 'L.E',
        bedrooms: 5,
        bathrooms: 5,
        rent: 5000,
        seller: sellerId
    });
}

export { evalPopulate };
