fetch("http://127.0.0.1:3000/messages")
.then(res => res.json())
.then(messages=>{
   const ul = document.getElementById("messages");

   messages.forEach(msg => {
        const li = document.createElement("li");
        li.innerHTML =  `
            <strong class="form-label fw-light mb-2">${msg.firstName}</strong><br>
            <strong class="form-label fw-light mb-2">${msg.lastName}</strong><br>
            <strong class="form-label fw-light mb-2">${msg.email}</strong><br>
            <strong class="form-label fw-light mb-2">${msg.queryType}</strong><br>
            <strong class="form-label fw-light mb-2">${msg.message}</strong><br>
            <strong class="form-label fw-light mb-2">${msg.consent}</strong><br>
            <strong class="form-label fw-light mb-2">${msg.date}</strong><br><hr>
        `;
        ul.appendChild(li);
   });
})
.catch(err=>{console.error("error get messages",err);}
);