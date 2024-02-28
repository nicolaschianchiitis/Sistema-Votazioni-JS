class Progetto{
    titolo;
    #nVoti;

    constructor(titolo, nVoti){
        this.titolo = titolo;
        this.#nVoti = nVoti;
    }

    get titolo(){
        return this.titolo;
    }

    /**
     * @param {string} titolo : titolo del progetto
     */
    set titolo(titolo){
        if (typeof(titolo) == "string"){
            this.titolo = titolo;
        }
    }

    get nVoti(){
        return this.#nVoti;
    }

    /**
     * @param {number} nVoti : numero (intero) dei voti
     */
    set nVoti(nVoti){
        this.#nVoti = nVoti;
    }

    toString(){
        return `${this.titolo} ---> Voti: ${this.#nVoti}`;
    }
}

class SistemaVotazioni{
    listaProgetti = []

    constructor(){
        this.listaProgetti = [];
    }

    /**
     * 
     * @param {string} nomeProgetto : nome progetto
     */
    vota(nomeProgetto){
        // Controllo che sia passata una stringa e non altro
        if (typeof(nomeProgetto) == "string"){
            // Controllo che ci sia il progetto: in caso, incremento nVoti
            for (let i = 0; i < this.listaProgetti.length; i++){
                let progetto = this.listaProgetti[i];
                if (progetto.titolo == nomeProgetto){
                    progetto.nVoti += 1;
                    break;
                }
            }
            this.#riordinaLista();
            this.#mostraListaAggiornata();
        }
    }

    #riordinaLista(){
        this.listaProgetti.sort(function(p1, p2){return p2.nVoti - p1.nVoti});
    }

    #mostraListaAggiornata(){
        const tagLista = document.getElementById("listaProgetti");
        let righe = tagLista.getElementsByTagName("li");
        while (righe.length > 0){
            tagLista.removeChild(righe[0]);
        }
        // Riaggiungi elementi alla lista
        for (let i = 0; i < this.listaProgetti.length; i++){
            let nuovaRiga = document.createElement("li");
            nuovaRiga.innerHTML = this.listaProgetti[i].toString();
            tagLista.appendChild(nuovaRiga);
        }
    }

    /**
     * 
     * @param {Progetto} progetto : progetto da aggiungere
     */
    aggiungiProgetto(progetto){
        if (progetto instanceof Progetto){
            // Se e' gia' nella lista, non aggiungo
            for (let i = 0; i < this.listaProgetti.length; i++){
                let prog = this.listaProgetti[i];
                if ((prog.titolo == progetto.titolo) && (prog.nVoti == progetto.nVoti)){
                    return;
                }
            }
            // Se non c'e', aggiungilo
            this.listaProgetti.push(progetto);
            // Aggiungiamolo alla lista nella pagina
            const tagLista = document.getElementById("listaProgetti");
            let rigaLista = document.createElement("li");
            rigaLista.innerHTML = `${progetto.titolo} ---> Voti: ${progetto.nVoti}`;
            tagLista.appendChild(rigaLista);
            // Aggiungiamo il bottone per votarlo
            const divBtn = document.getElementById("divBtn");
            let btnVoto = document.createElement("button");
            btnVoto.innerHTML = `Vota per "${progetto.titolo}"`;
            btnVoto.setAttribute("onclick", `sistemaVotazioni.vota("${progetto.titolo}")`);
            divBtn.appendChild(btnVoto);
            divBtn.innerHTML += "<br>";
        }
    }
}

let sistemaVotazioni = new SistemaVotazioni();
sistemaVotazioni.aggiungiProgetto(new Progetto("Intelligenza artificiale", 0));
sistemaVotazioni.aggiungiProgetto(new Progetto("Energia atomica", 0));
sistemaVotazioni.aggiungiProgetto(new Progetto("Sensibilizzazione sui monopoli tecnologici", 0));