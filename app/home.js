const person = {
    name: 'Mark AI',
    age: 29.10,
    status: 'Single',
}

console.log(person)
console.log(typeof person)
console.log(person.name);
console.log(person.age);
// Spread operator
const fullname = {
    ...person,
    address: {
        city: 'Xaysetha',
        village: 'Phonephanao',
        province: 'Vientiane'
    },
    hobbies: ['Cooking', 'Reading', 'Traveling'],
}
console.log(fullname)
console.log(fullname.status)
console.log(fullname.name + ', '+ fullname.hobbies[1])
console.log(fullname.address.village);
const { name, address, hobbies } = fullname
console.log(name, address, hobbies)
console.log(address.city)
console.log(hobbies[2])
const [cooking, reading, traveling] = hobbies
const {village, city, province } = address
console.log(village, city, province)
const arr = [...hobbies, 'Dancing', 'Singing', 'Football']
console.log(arr)
