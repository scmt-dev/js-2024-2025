const person = {
    name: "Mark AI",
    age: 29.10,
    hobbies: ["Cooking", "Singing"],
}

console.log(person)
console.log(typeof person)

const x = 1;
console.log(x)
console.log(typeof x)
console.log(person.name);
console.log(person.age);
console.log(person.hobbies[1]);

// spread operator
const mark = {
    ...person,
    hobbies: [...person.hobbies, "Dancing", 'Reading', 'Painting', 'Football'],
    status: "single",
    address: {
        village: 'Phonephanao',
        city: "Xaysettha",
        province: 'Vientiane',
        country: 'Laos'
    },
}
console.log(mark)
console.log(mark.address.village)

// destructuring
const { name, address, hobbies } = mark
console.log(hobbies)
console.log(name)
console.log(address)
console.log(address.village)
const { village, city } = address
console.log(village)
console.log(city)
const [c1, a1] = hobbies
console.log(c1, a1)
