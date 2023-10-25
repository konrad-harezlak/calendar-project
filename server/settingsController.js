const User = require('./userModel');
const bcrypt = require('bcrypt');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


async function saveData(req, res) {
    const userData = req.body;
    const { userName } = req.user;
    const user = await User.findOne({ userName });

    //upload pic
    upload.single('profilePicture')(req, res, async function (err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Błąd podczas przesyłania pliku' });
        }

        // Plik jest teraz dostępny w req.file

        // Tutaj możesz zapisać informacje o pliku w bazie danych MongoDB
        // Na przykład, możesz zapisać ścieżkę do pliku lub jego identyfikator w bazie danych
    });
    
    try {
        const passwordMatch = await bcrypt.compare(userData.password, user.password);
        if (!passwordMatch) {
            console.log('pass')
            console.log(userData.password + " --- " + user.password)
            return res.status(401).json({ message: 'Nieprawidłowe hasło' });
        }
    } catch (err) {
        console.log(err);
    }
    if (userData.firstName) user.firstName = userData.firstName;
    if (userData.lastName) user.lastName = userData.lastName;
    if (userData.position) user.position = userData.position;
    if (userData.experienceLevel) user.experienceLevel = userData.experienceLevel;
    if (userData.description) user.description = userData.description;
    if (userData.profilePicture) user.profilePicture = userData.profilePicture;
    if (userData.mewEmail) user.email = userData.newEmail;
    if (userData.password) {
        // Zaszyfruj nowe hasło, jeśli zostało przesłane
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        user.password = hashedPassword;
    }

    try {
        await user.save();

        const updatedUser = await User.findOne({ userName });
        res.status(200).json({ message: 'Dane użytkownika zostały zaktualizowane pomyślnie', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Wystąpił błąd serwera podczas zapisywania danych użytkownika' });
    }
}

module.exports = {
    saveData
};
