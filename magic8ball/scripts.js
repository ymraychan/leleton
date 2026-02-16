function generateRandomResponse(neutral) {
    if (document.getElementById("ask").value) {
        if (neutral) {
            let _ = `It is certain
                It is decidedly so
                Without a doubt
                Yes definitely
                You may rely on it
                As I see it, yes
                Most likely
                Outlook good
                Yes
                Signs point to yes
                Reply hazy, try again
                Ask again later
                Better not tell you now
                Cannot predict now
                Concentrate and ask again
                Don't count on it
                My reply is no
                My sources say no
                Outlook not so good
                Very doubtful`;
            const array = _.split('\n').map(item => item.trim());
            const randomElement = array[Math.floor(Math.random() * array.length)];
            const hazyAnswers = [
                "Reply hazy, try again", 
                "Ask again later", 
                "Better not tell you now", 
                "Cannot predict now", 
                "Concentrate and ask again"
            ];

            if (hazyAnswers.includes(randomElement)) {
                document.getElementById("neutral").classList.remove("hidden");
                document.getElementById("normal").classList.add("hidden");
            } else {
                document.getElementById("neutral").classList.add("hidden");
                document.getElementById("normal").classList.remove("hidden");
            }
            document.getElementById("output").value = randomElement;
        }
        else {
            let _ = `It is certain
                It is decidedly so
                Without a doubt
                Yes definitely
                You may rely on it
                As I see it, yes
                Most likely
                Outlook good
                Yes
                Signs point to yes
                Don't count on it
                My reply is no
                My sources say no
                Outlook not so good
                Very doubtful`;
            const array = _.split('\n').map(item => item.trim());
            const randomElement = array[Math.floor(Math.random() * array.length)];
            document.getElementById("output").value = randomElement;
            document.getElementById("neutral").classList.add("hidden");
            document.getElementById("normal").classList.remove("hidden")
        }
    }
}