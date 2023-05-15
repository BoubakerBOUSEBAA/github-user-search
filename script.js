const champ = document.getElementById('champ');
const btn = document.getElementById('btn');
const output = document.getElementById('output');


btn.onclick = () => {
    fetch('https://api.github.com/users/' + champ.value)
    .then(response => response.json())
    .then(data => {
        // Supprimer la classe "hidden" pour afficher la div
        output.classList.remove('hidden');

        output.textContent = "";
        output.textContent = `Compte Github de ${data.name}`;
        
        const img = document.createElement('img');
        img.src = data.avatar_url;
        output.appendChild(img);
        output.innerHTML += `<br>Bio: ${data.bio}`;
        output.innerHTML += `<br>Portfolio: ${data.blog}`;
        output.innerHTML += `<br>Nombre de repos public: ${data.public_repos}`;
        output.innerHTML += `<br>Nombre de followers: ${data.followers}`;
        output.innerHTML += `<br>Nombre de following: ${data.following}`;

    })
    .catch(error => {
        output.textContent = "Erreur: " + error;
    })
}

// Activer la recherche lorsque la touche Entrée est enfoncée avec event.code

champ.addEventListener('keyup', (e) => {
    if (e.code === "Enter") {
        btn.click();
    }
})

