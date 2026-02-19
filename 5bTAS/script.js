const tasSub = document.getElementById("tasSub")

tasSub.addEventListener('click', function() {
    localStorage.setItem('tas', document.getElementById("TASarea").value)
});