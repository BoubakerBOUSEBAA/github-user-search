btn.onclick = () => {
    fetch('https://api.github.com/users/' + champ.value)

    .then(response => response.json())
    .then(data => {
        output.textContent = "";
        output.textContent = `Compte Github de ${data.name}`;
        
        const img = document.createElement('img');
        img.src = data.avatar_url;
        output.appendChild(img);
        output.innerHTML += `<br>Bio: ${data.bio}`;
        output.innerHTML += `<br>Nombre de repos: ${data.public_repos}`;
        output.innerHTML += `<br>Nombre de followers: ${data.followers}`;
        output.innerHTML += `<br>Nombre de following: ${data.following}`;

    })

    .catch(error => {
        output.textContent = "Erreur: " + error;
    })
}
