function setScoresBasedOnExperience (experience, length, gain, traffic, classPreference, classLevel) {
    if (!parseInt(length)) {
        // Suggest short trails for people with no experience
        if (experience === 1) {
            length = 1;
        }
        // Gradually increase trail length as experience increases
        if (experience === 2 || experience === 3) {
            length = 2;
        }
        if (experience === 4) {
            length = 3;
        }
    }
    if (!parseInt(gain)) {
        gain = experience;
    }
    if (!parseInt(traffic)) {
        // For first-timers, suggest popular peaks since the most beginner-friendly peaks are also the most popular (high traffic score)
        if (experience === 1) {
            traffic = 5;
        }
        if (experience === 2) {
            traffic = 4;
        }
    }
    if (classLevel > 1 && classPreference.length === 0) {
        let userClassLevelArr = [];
        for (let i = 1; i <= classLevel; i++) {
            userClassLevelArr.push(i);
        }
        // Less experienced users will be suggested peaks that have their lowest comfortable class level
        if (experience === 1 || experience === 2) {
            classPreference.push(Math.min(userClassLevelArr));
        }
        // More experienced users will be suggested peaks that have their highest comfortable class level, if it exists
        if (experience === 3 || experience === 4) {
            classLevel.push(Math.min(userClassLevelArr));
        }
    }
}

module.exports = {
    setScoresBasedOnExperience
}