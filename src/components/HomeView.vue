<script setup>
    import { ref, computed } from 'vue';
    import creationModal from './modal.vue';
    import CreationArticle from './article.vue';
    
    //Load content data could comming from a DB 
    import modalAllConfig from '../assets/content/modalConfig'
    import creationArticleContent from '../assets/content/articleContent';

    const articleContent = ref(creationArticleContent);

    const modalConfig = ref({
        display: "none",
        content: {
            title: "",
            creationDate: "",
            gitLink: ""}
    });

    //Object used to bind form contact content
    const messageContent = ref({
        firsname:"",
        lastname:"",
        object:"",
        message:"",
    });

    //Construct mail request with form user entries
    const emailMe = computed(()=>{
        const mailBody = encodeURIComponent(
            "Nom: " + messageContent.value.firsname + "\nPrénom: " + messageContent.value.lastname + "\nMessage:" + "\n" + messageContent.value.message);

        return `mailto:${import.meta.env.VITE_MAIL}?subject=${messageContent.value.object}&body=${mailBody}`;
    });

    //HTML element ID: underline property
    const isUnderline = ref({
        About: "none",
        Mescréations: "none",
        contacts: "none"
    });

    //Similar of a CSS :hover but for any HTML element target ID in isUnderline
    function changeUnderline(event) {
        const newState = isUnderline.value[event.target.id] == "none" ? "underline" : "none";
        isUnderline.value[event.target.id] = newState;
    };

    function onModalClickClose() {
        modalConfig.value.display = 'none';
    };

    function onCreationClick(creationName) {
        modalConfig.value = modalAllConfig[creationName];
        modalConfig.value.display = 'block';
    };
</script>
<template>
    <body>
        <div class="main">

            <nav>
                <div class="profil">
                    <img alt="profil" src="/pictures/photo.jpg"/>
                    <h1 id="Home">Raïf ASSANI</h1>
                </div>
                <ul>
                    <li><a href="#Home" aria-current="page">Home</a></li>
                    <li><a href="#About">A propos de moi</a></li>
                    <li><a href="#Mescréations">Mes créations</a></li>
                    <li><a href="#Contacts">Contacts</a></li>
                </ul>
            </nav>
        </div>
    </body>
    <main id="main">
    <Section class="page content">
        <creationModal @close-clicked="onModalClickClose" :modal-config=modalConfig />
        <header>
            <h1 id="About">Hello, je suis un developpeur web</h1>
            <p>
                A la base je suis un passionné de l'informatique, j'ai acquéris des connaissances que j'ai eu à developper au cour de mon parcours scolaire.
                Après j'ai fais une formation intitulé developpeur web.
                Je suis compétent en HTML, CSS, JavaScript, et j’ai une expérience pratique dans la création de sites web responsives et accessibles.
                Ce qui me caractérise de plus, c'est ma capacité à m'adapter à de nouveaux environnements et à apprendre de nouvelles choses et nouvelles technologies.
			    D'une nature ouverte, j'accorde une grande importance à la communication et aux  partages de connaissances.
            </p>
            <button>Dites Hey</button>
        </header>
        <section class="Presentation-image">
            <img alt="presentation image" src="/pictures/presentation.jpg" />
        </section>
        <section id="Mescréations" @mouseenter="changeUnderline" @mouseleave="changeUnderline" class="text-center col-flex-wrap-center">
            <h2>Mes créations</h2>
            <div class="row-flex-wrap-center space-around">
                <CreationArticle v-for="article in articleContent" 
                    :key="article.name" 
                    :article-content="article"
                    @creation-clicked="onCreationClick" />
            </div>
        </section>
        <section id="contact" @mouseenter="changeUnderline" @mouseleave="changeUnderline" class="text-center col-flex-wrap-center">
            <h1>Contacts</h1>
            <form :action="emailMe" method="post" enctype="application/x-www-form-urlencoded">
                <div class="row-flew-wrap-center">
                    <label>Nom :
                        <input required type="text" v-model="messageContent.firsname" id="firstname" placeholder="Votre nom...">
                    </label>
                    <label>Prénom :
                        <input required type="text" v-model="messageContent.lastname" id="lastname" placeholder="Votre prénom...">
                    </label>
                </div>  
                <label>Objet :
                    <input required type="text" v-model="messageContent.object" id="object" placeholder="objet du message">
                </label>
                <textarea required v-model="messageContent.message" id="message" placeholder="Votre message"></textarea>
                <button type="submit">Enoyer</button> 
            </form>
        </section>
    </Section>
    </main>
    <div class="scroll_to_top" id="scroll_to_top">
        <a href="#top"><img src="/icons/scrolltop.png" alt="Retourner en haut" /></a>
    </div>
    <footer>
        <div id="Contacts" class="colonne">
            <figure class="footer__icon">
                <a href="https://github.com/Fadil1007" target="_blank">
                <img src="/icons/github.png"
                    title="Vers mon github"
                    alt="Lien vers le GitHub de Raïf ASSANI">
                </a>
            </figure>
        </div>
        <div class="colonne">
            <figure class="footer__icon">
                <a href="tel:+33745520335" target="_blank">
                <img src="/icons/telephone.png"
                    title="Mon telephone"
                    alt="telephone  de Raïf ASSANI">
                </a>
            </figure>
        </div>
        <div class="colonne">
            <figure class="footer__icon">
                <a href="mailto:assfadil55@gmail.com" target="_blank">
                <img src="/icons/mail.png"
                    title="Mon mail"
                    alt="Adresse mail  de Raïf ASSANI">
                </a>
            </figure>
            <p><small>Dernière mise à jour le <time datetime="2024-01-10">10/01/2024</time></small></p>
        </div>
    </footer>
</template>

<script>

export default {
    
}
</script>
<style scoped>
.scroll_to_top {
    position: fixed;
    width: 25px;
    height: 25px;
    bottom: 50px;
    right: 30px;
}
.scroll_to_top img {
    width: 25px;
}
body {
    padding: 0 2%;
    margin: 0%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
nav {
  position: sticky;
  top: 0;
  background-color: #ffffff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
nav .profil {
    display: flex;
    align-items: center;
}
nav .profil img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin: 10%;
}
nav .profil h1 {
    margin-left: 10px;
    font-size: 15px;
    background: linear-gradient(to right, #0000ff, #ff009d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

nav ul {
    display: flex;
    list-style-type: none;
}
nav ul li {
    margin-left: 20px;
    cursor: pointer; 
    border-bottom: 1px solid #fff;
    border-radius: 50%;
}
nav ul li:hover {
    border-bottom-color: #000;
}
section {
    margin: 4%;

}
section header {
    margin-top: 5%;
    max-width: 80%;
}
section header h1 {
    margin: 0;
    text-transform: uppercase;
    font-family: 'oswald', sans-serif;
    font-size: 6vw;
    background: linear-gradient(to right, #0000ff, #ff0000);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
section header p {
    line-height: 40px;
    color: #818181;
}
section header button {
    background-color: inherit;
    border: none;
    outline: none;
    padding: 0;
    font-size: 15px;
    font-weight: bold;
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
}
section header button:hover {
    color: #ccc;
    border-bottom-color:  #000;
}
section .Presentation-image {
    margin-top: 4%;
    max-width: 200%;
    margin-left: 0px;
}
section .Presentation-image img {
    max-width: 100%;
    height: auto;
}
section .Presentation-image:hover {
    filter: brightness(50%);
    transition: filter 0.9s;
}

.space-around {
    width: 90%;
    justify-content: space-between;
}
section {
    border-top: 1px solid black;
}
form {
    display: flex;
    flex-direction: column;
    width: fit-content;
    border: 2px solid black;
    border-radius: 10px;
}
label {
    margin-left: 10px;
    font-weight: bold;
}
input {
    height: 1.5rem;
    width: 150px;
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    border: 1px solid black;
    border-radius: 5px;
}
button {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
}
.row-flex-wrap-center {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: normal;
}
.col-flex-wrap-center {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
}
.text-center {
    text-align: center;
}


@media screen and (max-width: 700px) {
  nav {
    justify-content: center;
  }
  nav ul {
    display: none;
  }
  section header {
    margin-top: 10%;
    max-width: 100%;
  }
  section .projets-section {
    margin-top: 15%;
  }
  section .projets-section h1 {
    font-size: 1.5em;
  }
  section .projets-section .projects .project {
    margin-right: 0;
    margin-bottom: 20px;
    max-width: 100%;
  } 
  footer {
    justify-content: flex-start;
  }
  footer .colonne {
    width: 80%;
  }
}
footer {
    margin-top: 5%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: #8395b1;
    color: white;
    padding: 10px;
}
footer .colonne p {
    font-size: 12px;
    color: #ccc;
    cursor: pointer;
}
footer .colonne p:hover {
    color: #fff;
}
.footer__icon {
    width: 50px;
    height: 50px;
    margin: 10px;}

.footer__icon img:hover {
    opacity: 0.5;
}
</style>
