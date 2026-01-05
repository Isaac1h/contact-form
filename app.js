const messageList = document.getElementById("messages");

// Fonction pour charger et afficher les messages
function loadMessages() {
    fetch("http://127.0.0.1:3000/messages")
    .then(res => res.json())
    .then(messages => {
       messageList.innerHTML = ""; // On vide la liste avant d'ajouter
    
       messages.forEach(msg => {
            const li = document.createElement("li");
            li.style.marginBottom = "20px";
            li.innerHTML =  `
                <div id="msg-${msg.id}">
                    <strong>${msg.firstName} ${msg.lastName}</strong> (${msg.email})<br>
                    <em>${msg.queryType}</em> - ${msg.date}<br>
                    <p>${msg.message}</p>
                    <button onclick="editMessage(${msg.id}, '${msg.firstName}')" style="color: blue; cursor: pointer;">✏️ Modifier Prénom</button>
                    <button onclick="editMessage(${msg.id}, '${msg.lastName}')" style="color: blue; cursor: pointer;">✏️ Modifier Nom</button>
                    <button onclick="deleteMessage(${msg.id})" style="color: red; cursor: pointer; margin-left: 10px;">❌ Supprimer</button>
                </div>
                <hr>
            `;
            messageList.appendChild(li);
       });
    })
    .catch(err => console.error("Erreur lors de la récupération des messages", err));
}

// Fonction pour supprimer un message
function deleteMessage(id) {
    if (confirm("Voulez-vous vraiment supprimer ce message ?")) {
        fetch(`http://127.0.0.1:3000/messages/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(() => loadMessages()) // On recharge la liste après suppression
        .catch(err => console.error("Erreur suppression", err));
    }
}

// Fonction pour modifier le prénom (exemple simple via prompt)
function editMessage(id, currentFirstName) {
    const newName = prompt("Modifier le prénom :", currentFirstName);
    
    if (newName && newName !== currentFirstName) {
        fetch(`http://127.0.0.1:3000/messages/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName: newName })
        })
        .then(res => res.json())
        .then(() => loadMessages()) // On recharge la liste après modification
        .catch(err => console.error("Erreur modification", err));
    }
}

// Chargement initial
loadMessages();