const bcrypt = require('bcrypt');

async function checkPassword(plainPassword, hashedPassword) {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
}

const userProvidedPassword = 'user_password'; // This should come from the user's login attempt
const storedHashedPassword = '$2b$10$...';   // This should come from the database

checkPassword(userProvidedPassword, storedHashedPassword).then(isMatch => {
    if (isMatch) {
        console.log('Passwords match!');
    } else {
        console.log('Invalid password.');
    }
});


async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

const plainPassword = 'user_password';
hashPassword(plainPassword).then(hashed => {
    console.log('Hashed Password:', hashed);
});
